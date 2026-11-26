import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
	schema: z.object({
		title: z.string(),
		seoTitle: z.string().optional(),
		description: z.string(),
		pubDate: z.coerce.date(),
		// Set when a post is substantially refreshed; feeds dateModified and the sitemap.
		updatedDate: z.coerce.date().optional(),
		author: z.string(),
		slug: z.string(),
	}),
});

export const collections = { blog };
