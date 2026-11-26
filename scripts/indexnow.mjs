// Tells Bing (and the other IndexNow engines) which pages exist or changed.
// Bing's index feeds ChatGPT search and Copilot, so new lever pages get found
// sooner. Run after a deploy, from a machine that can reach the live site:
//   npm run indexnow                  (every URL in the live sitemap)
//   npm run indexnow -- /silverdale/  (just these paths)
// The key file public/6f6cf4cf44f4978dd79e5be5c41507e4.txt must be live first; IndexNow checks it.
const SITE = 'https://mortgageswithjj.co.nz';
const KEY = '6f6cf4cf44f4978dd79e5be5c41507e4';

async function sitemapUrls() {
	const res = await fetch(`${SITE}/sitemap-0.xml`);
	if (!res.ok) throw new Error(`sitemap fetch failed: ${res.status}`);
	const xml = await res.text();
	return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
}

const args = process.argv.slice(2);
const urlList = args.length ? args.map((p) => new URL(p, SITE).href) : await sitemapUrls();

const res = await fetch('https://api.indexnow.org/indexnow', {
	method: 'POST',
	headers: { 'content-type': 'application/json; charset=utf-8' },
	body: JSON.stringify({ host: 'mortgageswithjj.co.nz', key: KEY, keyLocation: `${SITE}/${KEY}.txt`, urlList }),
});
console.log(`IndexNow: ${res.status} ${res.statusText} for ${urlList.length} URLs`);
if (res.status >= 400) process.exit(1);
