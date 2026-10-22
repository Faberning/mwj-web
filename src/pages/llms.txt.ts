import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { ADVISER, AREAS, BUSINESS, LICENSEE, SERVICES, SITE_NAME, SITE_URL, STATS } from '../consts';

// Plain-text summary for AI assistants (llmstxt.org), built from consts.ts so it
// can never disagree with the pages or the schema.
export const GET: APIRoute = async () => {
	const posts = (await getCollection('blog')).sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime());
	const lines = [
		`# ${SITE_NAME}`,
		'',
		`> ${ADVISER.name} (${ADVISER.fsp}) is a ${ADVISER.title} based in ${BUSINESS.address.suburb} on Auckland's Hibiscus Coast, operating under the Financial Advice Provider licence of ${LICENSEE.name} (${LICENSEE.fsp}). He helps first home buyers, refinancers, property investors and new build clients, comparing ${STATS.lendersCompared}+ bank and non-bank lenders.`,
		'',
		`Contact: ${BUSINESS.phoneDisplay}, ${BUSINESS.email}, ${BUSINESS.address.street}, ${BUSINESS.address.suburb} ${BUSINESS.address.postcode}.`,
		'Content on this site is general information only and is not personalised financial advice.',
		'',
		'## Key pages',
		`- [About JJ](${SITE_URL}/about/)`,
		`- [Contact](${SITE_URL}/contact/)`,
		`- [First Home Buyer Guide](${SITE_URL}/first-home-buyer-guide/)`,
		`- [Mortgage calculator](${SITE_URL}/mortgage-calculator/)`,
		`- [Important information (disclosure)](${SITE_URL}/important-information/)`,
		'',
		'## Services',
		...SERVICES.map((s) => `- [${s.name}](${SITE_URL}/services/${s.slug}/): ${s.metaDescription}`),
		'',
		'## Areas',
		...AREAS.map((a) => `- [${a.name}](${SITE_URL}/${a.slug}/): ${a.metaDescription}`),
		'',
		'## Guides',
		...posts.map((p) => `- [${p.data.title}](${SITE_URL}/${p.data.slug}/): ${p.data.description}`),
		'',
	];
	return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
