import { EmailMessage } from 'cloudflare:email';
import { createMimeMessage } from 'mimetext/browser';

const JSON_HEADERS = { 'content-type': 'application/json' };
const FROM_ADDRESS = 'leads@mortgageswithjj.co.nz';
const NOTIFY_ADDRESS = 'freddieberning1@gmail.com';

function isValidEmail(value) {
	return typeof value === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

// Strips CR/LF so user input can never inject extra headers into the subject line.
function headerSafe(value) {
	return String(value).replace(/[\r\n]+/g, ' ').trim();
}

async function sendNotification(env, { subject, lines }) {
	const msg = createMimeMessage();
	msg.setSender({ name: 'Mortgages with JJ — Website', addr: FROM_ADDRESS });
	msg.setRecipient(NOTIFY_ADDRESS);
	msg.setSubject(headerSafe(subject));
	msg.addMessage({
		contentType: 'text/plain',
		data: lines.join('\n'),
	});

	const message = new EmailMessage(FROM_ADDRESS, NOTIFY_ADDRESS, msg.asRaw());
	await env.SEND_EMAIL.send(message);
}

/**
 * Validates, honeypot-checks, and emails the lead to freddieberning1@gmail.com via
 * the Cloudflare Email Routing send_email binding — no third-party API, no secrets.
 */
async function handleContactSubmit(request, env) {
	let body;
	try {
		body = await request.json();
	} catch {
		return Response.json({ ok: false, error: 'Invalid request body.' }, { status: 400, headers: JSON_HEADERS });
	}

	const { name, email, phone, message, consent, website } = body ?? {};

	// Honeypot — a real visitor never fills this hidden field. Swallow silently, no email.
	if (website) {
		return Response.json({ ok: true }, { status: 200, headers: JSON_HEADERS });
	}

	if (!name || typeof name !== 'string' || !name.trim()) {
		return Response.json({ ok: false, error: 'Name is required.' }, { status: 422, headers: JSON_HEADERS });
	}
	if (!isValidEmail(email)) {
		return Response.json({ ok: false, error: 'A valid email is required.' }, { status: 422, headers: JSON_HEADERS });
	}
	if (!message || typeof message !== 'string' || !message.trim()) {
		return Response.json({ ok: false, error: 'Message is required.' }, { status: 422, headers: JSON_HEADERS });
	}
	if (!consent) {
		return Response.json({ ok: false, error: 'Consent is required.' }, { status: 422, headers: JSON_HEADERS });
	}

	try {
		await sendNotification(env, {
			subject: `New contact form lead — ${name}`,
			lines: [
				'New submission from the mortgageswithjj.co.nz contact form.',
				'',
				`Name: ${name}`,
				`Email: ${email}`,
				`Phone: ${phone || '(not provided)'}`,
				`Submitted: ${new Date().toISOString()}`,
				'',
				'Message:',
				message,
			],
		});
	} catch (err) {
		console.log(JSON.stringify({ event: 'contact_form_send_failed', error: String(err) }));
		return Response.json(
			{ ok: false, error: 'Could not send right now — please try again or call directly.' },
			{ status: 502, headers: JSON_HEADERS }
		);
	}

	// Fast 2xx once the email is away — the frontend just needs the outcome.
	return Response.json({ ok: true }, { status: 200, headers: JSON_HEADERS });
}

/**
 * Validates, honeypot-checks, and emails JJ that a guide was requested. The PDF itself
 * is never emailed — the binding can only send to verified destinations, and the guide
 * stays an instant download from the site (unchanged).
 */
async function handleGuideRequest(request, env) {
	let body;
	try {
		body = await request.json();
	} catch {
		return Response.json({ ok: false, error: 'Invalid request body.' }, { status: 400, headers: JSON_HEADERS });
	}

	const { email, website } = body ?? {};

	if (website) {
		return Response.json({ ok: true }, { status: 200, headers: JSON_HEADERS });
	}
	if (!isValidEmail(email)) {
		return Response.json({ ok: false, error: 'A valid email is required.' }, { status: 422, headers: JSON_HEADERS });
	}

	try {
		await sendNotification(env, {
			subject: `First Home Buyer Guide requested — ${email}`,
			lines: [
				'Someone requested the First Home Buyer Guide on mortgageswithjj.co.nz.',
				'',
				`Email: ${email}`,
				`Submitted: ${new Date().toISOString()}`,
				'',
				'The guide was downloaded instantly on their end — this is a notification only.',
			],
		});
	} catch (err) {
		console.log(JSON.stringify({ event: 'guide_request_send_failed', error: String(err) }));
		// Don't block the download over a notification failure — the lead still gets
		// their guide; only JJ's notification is at risk, and that's logged above.
	}

	return Response.json({ ok: true }, { status: 200, headers: JSON_HEADERS });
}

// Keep-latest 301s for the 3 duplicate blog URLs — old→new pairs from
// MWJ_URL_Migration_Map.md / the live post-sitemap.xml, not guessed.
const BLOG_REDIRECTS = {
	'/how-do-mortgage-brokers-get-paid-nz/': '/how-do-mortgage-brokers-get-paid-nz-2/',
	'/can-you-use-kiwisaver-and-gifted-deposit-together-first-home/':
		'/can-you-use-kiwisaver-and-gifted-deposit-together-first-home-2/',
	'/what-is-fixed-floating-split-which-better-2026/':
		'/what-is-a-fixed-and-floating-split-and-which-is-better-in-2026/',
};

export default {
	async fetch(request, env) {
		const url = new URL(request.url);

		const redirectTarget = BLOG_REDIRECTS[url.pathname];
		if (redirectTarget) {
			return Response.redirect(new URL(redirectTarget, url.origin), 301);
		}

		if (request.method === 'POST' && url.pathname === '/api/contact') {
			return handleContactSubmit(request, env);
		}
		if (request.method === 'POST' && url.pathname === '/api/guide-request') {
			return handleGuideRequest(request, env);
		}

		// Serve the built static assets directly. Never re-fetch this Worker's own
		// custom domain here (e.g. via `fetch('https://mortgageswithjj.co.nz'+...)`)
		// — that would recurse back into this Worker instead of hitting the asset store.
		return env.ASSETS.fetch(request);
	},
};
