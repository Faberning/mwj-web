import type { APIRoute } from 'astro';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import sharp from 'sharp';
import { ADVISER, BUSINESS, LICENSEE, SITE_NAME, SITE_URL } from '../consts';

// Contact file behind the "Save contact to phone" button on /card/. Built once at
// build time from consts.ts so it can never disagree with the site.
// The street address is left out on purpose: whether to show it is still an open
// question for JJ (directory checklist, Nov 2026).

// vCard text values escape \ , ; and newlines (RFC 6350 3.4).
const esc = (v: string) => v.replace(/\\/g, '\\\\').replace(/,/g, '\\,').replace(/;/g, '\\;').replace(/\n/g, '\\n');

// Lines longer than 75 octets are folded with CRLF + a space (RFC 6350 3.2).
function fold(line: string): string {
	if (line.length <= 75) return line;
	const parts = [line.slice(0, 75)];
	for (let i = 75; i < line.length; i += 74) parts.push(' ' + line.slice(i, i + 74));
	return parts.join('\r\n');
}

export const GET: APIRoute = async () => {
	const portrait = await readFile(join(process.cwd(), 'src/assets/images/jj-portrait.jpg'));
	const photo = (await sharp(portrait).resize(320, 320).jpeg({ quality: 78 }).toBuffer()).toString('base64');

	const [first, ...rest] = ADVISER.name.split(' ');
	const lines = [
		'BEGIN:VCARD',
		'VERSION:3.0',
		`N:${esc(rest.join(' '))};${esc(first)};;;`,
		`FN:${esc(ADVISER.name)}`,
		`ORG:${esc(SITE_NAME)}`,
		`TITLE:${esc(ADVISER.title)}`,
		`TEL;TYPE=CELL,VOICE:${BUSINESS.phoneE164}`,
		`EMAIL;TYPE=INTERNET,WORK:${BUSINESS.email}`,
		`URL:${SITE_URL}/`,
		`NOTE:${esc(`${ADVISER.name} (${ADVISER.fsp}), ${ADVISER.title} operating under ${LICENSEE.name} (${LICENSEE.fsp}).`)}`,
		`PHOTO;ENCODING=b;TYPE=JPEG:${photo}`,
		'END:VCARD',
	];
	return new Response(lines.map(fold).join('\r\n') + '\r\n', {
		headers: { 'Content-Type': 'text/vcard; charset=utf-8' },
	});
};
