import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const caseStudy = z.object({
  title: z.string(),
  client: z.string().optional(),
  year: z.string(),
  role: z.string(),
  stack: z.array(z.string()),
  summary: z.string(),
  /** Path to an icon in /public/icons, used as the thumbnail until screenshots exist */
  icon: z.string(),
  /**
   * Two CSS colours for a glossy tile drawn behind the icon. Leave it out when the icon is
   * already drawn as its own tile (the generated .webp icons), so it isn't a tile on a tile.
   */
  tint: z.tuple([z.string(), z.string()]).optional(),
  links: z
    .object({
      live: z.url().optional(),
      repo: z.url().optional(),
      play: z.string().optional(),
    })
    .default({}),
  /** A DylanOS app that the "Play it" button opens instead of a new tab */
  opens: z.string().optional(),
  order: z.number(),
});

export const collections = {
  work: defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/content/work' }),
    schema: caseStudy,
  }),
  projects: defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
    schema: caseStudy,
  }),
};
