// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
	site: 'https://mortgageswithjj.co.nz',
	output: 'static',
	trailingSlash: 'always',
	integrations: [sitemap()],
	build: {
		// Every page shares one small CSS file — inlining it removes an
		// external render-blocking request on the critical path (FCP/LCP).
		inlineStylesheets: 'always',
	},
});
