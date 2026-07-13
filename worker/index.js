export default {
	async fetch(request, env) {
		// Serve the built static assets directly. Never re-fetch this Worker's own
		// custom domain here (e.g. via `fetch('https://mortgageswithjj.co.nz'+...)`)
		// — that would recurse back into this Worker instead of hitting the asset store.
		return env.ASSETS.fetch(request);
	},
};
