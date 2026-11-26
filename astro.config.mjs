// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
	site: 'https://mortgageswithjj.co.nz',
	output: 'static',
	trailingSlash: 'always',
	// /card/ is the QR business card: noindex, so keep it out of the sitemap too.
	integrations: [sitemap({ filter: (page) => !page.endsWith('/card/') })],
	build: {
		// Every page shares one small CSS file — inlining it removes an
		// external render-blocking request on the critical path (FCP/LCP).
		inlineStylesheets: 'always',
	},
});
