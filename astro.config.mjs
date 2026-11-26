// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { readdirSync, readFileSync } from 'node:fs';

// Give every sitemap URL a <lastmod> so search engines (Bing feeds ChatGPT
// search) know when to recrawl. Blog posts use their pubDate (or updatedDate
// if a post has one); every other page uses the build date.
const BUILD_DATE = new Date().toISOString();
const postDates = {};
for (const file of readdirSync('./src/content/blog')) {
	if (!file.endsWith('.md')) continue;
	const fm = readFileSync(`./src/content/blog/${file}`, 'utf8').split('---')[1] ?? '';
	const field = (name) => fm.match(new RegExp(`^${name}:\\s*"?([^"\\n]+)"?`, 'm'))?.[1]?.trim();
	const slug = field('slug') ?? file.replace(/\.md$/, '');
	const date = field('updatedDate') ?? field('pubDate');
	if (date && !Number.isNaN(Date.parse(date))) postDates[`/${slug}/`] = new Date(date).toISOString();
}

// https://astro.build/config
export default defineConfig({
	site: 'https://mortgageswithjj.co.nz',
	output: 'static',
	trailingSlash: 'always',
	// /card/ is the QR business card: noindex, so keep it out of the sitemap too.
	integrations: [
		sitemap({
			filter: (page) => !page.endsWith('/card/'),
			serialize(item) {
				const path = new URL(item.url).pathname;
				return { ...item, lastmod: postDates[path] ?? BUILD_DATE };
			},
		}),
	],
	build: {
		// Every page shares one small CSS file — inlining it removes an
		// external render-blocking request on the critical path (FCP/LCP).
		inlineStylesheets: 'always',
	},
});
