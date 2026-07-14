const JSON_HEADERS = { 'content-type': 'application/json' };

function isValidEmail(value) {
	return typeof value === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

/**
 * STUB — validates and logs the submission (visible via `wrangler tail`) but does
 * not send email or persist anywhere yet. Real delivery needs either a Cloudflare
 * `_mailchannels` DNS TXT record on the zone or a third-party email API key set via
 * `wrangler secret put`, and durable storage (D1/KV) — neither is provisioned yet.
 * Wire that up before launch; until then, submissions only reach server logs.
 */
async function handleContactSubmit(request) {
	let body;
	try {
		body = await request.json();
	} catch {
		return Response.json({ ok: false, error: 'Invalid request body.' }, { status: 400, headers: JSON_HEADERS });
	}

	const { name, email, phone, message, consent, website } = body ?? {};

	// Honeypot — a real visitor never fills this hidden field.
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

	console.log(
		JSON.stringify({
			event: 'contact_form_submission',
			submitted_at: new Date().toISOString(),
			source: 'contact',
			name,
			email,
			phone: phone || null,
			message,
		})
	);

	// Fast 2xx — the frontend doesn't wait on email delivery once that's wired up.
	return Response.json({ ok: true }, { status: 200, headers: JSON_HEADERS });
}

/**
 * STUB — same caveat as handleContactSubmit: validates and logs only. The PDF
 * download itself works today (served as a static asset); what's stubbed is the
 * "notify JJ of the lead" side, pending real email/storage wiring.
 */
async function handleGuideRequest(request) {
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

	console.log(
		JSON.stringify({
			event: 'guide_request',
			submitted_at: new Date().toISOString(),
			source: 'first-home-buyer-guide',
			email,
		})
	);

	return Response.json({ ok: true }, { status: 200, headers: JSON_HEADERS });
}

export default {
	async fetch(request, env) {
		const url = new URL(request.url);

		if (request.method === 'POST' && url.pathname === '/api/contact') {
			return handleContactSubmit(request);
		}
		if (request.method === 'POST' && url.pathname === '/api/guide-request') {
			return handleGuideRequest(request);
		}

		// Serve the built static assets directly. Never re-fetch this Worker's own
		// custom domain here (e.g. via `fetch('https://mortgageswithjj.co.nz'+...)`)
		// — that would recurse back into this Worker instead of hitting the asset store.
		return env.ASSETS.fetch(request);
	},
};
