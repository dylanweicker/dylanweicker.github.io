import type { APIRoute } from 'astro';
import { apps } from '@/data/apps';
import { categories } from '@/data/homepage';
import { getSiteContent } from '@/lib/content';

/*
 * Every page worth indexing, so crawlers find them without clicking through the desktop
 * (most of its navigation is buttons, not links). Built from the same data as the pages.
 * Left out: /about/ (the same Welcome window as /), and hidden apps (src/data/apps.ts), which
 * are placeholders or repeat another page (/boardgames/ is /shelf/ inside the desktop).
 */
export const GET: APIRoute = async ({ site }) => {
  const content = await getSiteContent();
  const paths = [
    '/',
    ...apps.filter((a) => !a.hidden && a.id !== 'about').map((a) => `/${a.id}/`),
    ...(['work', 'projects'] as const).flatMap((app) => content[app].map((item) => `/${app}/${item.slug}/`)),
    ...categories.map((c) => `/homepage/${c.id}/`),
    '/cv/',
    '/shelf/',
  ];
  const urls = paths.map((p) => `  <url><loc>${new URL(p, site)}</loc></url>`).join('\n');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
