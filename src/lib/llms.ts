import { getCollection, type CollectionEntry } from 'astro:content';
import { apps, appsById, type AppId } from '@/data/apps';
import { categories, homeIntro, type Block } from '@/data/homepage';
import { profile } from '@/data/profile';
import { skillGroups } from '@/data/skills';
import { certifications, clearance, education, timeline } from '@/data/timeline';
import { appHref } from './links';

/*
 * /llms.txt and /llms-full.txt: the site as plain Markdown for AI tools (https://llmstxt.org).
 * DylanOS is an interactive desktop, so readers that don't run it, or only extract one window,
 * get everything here instead. Built from the same data as the pages.
 */

type Entry = CollectionEntry<'work' | 'projects'>;

async function caseStudies() {
  const byOrder = (a: Entry, b: Entry) => a.data.order - b.data.order;
  const [work, projects] = await Promise.all([getCollection('work'), getCollection('projects')]);
  return { work: work.sort(byOrder), projects: projects.sort(byOrder) };
}

const intro = (site: URL) =>
  [
    `# ${profile.name}`,
    `> ${profile.role} at ${profile.company} in ${profile.location}. ${profile.tagline}`,
    ...profile.bio,
    `This site, DylanOS, is an interactive desktop. Each of its windows is also a pre-rendered page, listed below, and the whole site's text is in one file at ${new URL('/llms-full.txt', site)}.`,
  ].join('\n\n');

const link = (site: URL, title: string, path: string, note?: string) =>
  `- [${title}](${new URL(path, site)})${note ? `: ${note}` : ''}`;

const appLink = (site: URL, id: AppId, note = appsById[id].description) =>
  link(site, appsById[id].label ?? appsById[id].title, appHref(id), note);

const elsewhere = () =>
  [
    '## Elsewhere',
    `- [GitHub](${profile.links.github})`,
    `- [LinkedIn](${profile.links.linkedin})`,
    `- Email: ${profile.links.email}`,
  ].join('\n');

export async function llmsTxt(site: URL): Promise<string> {
  const { work, projects } = await caseStudies();
  const visible = apps.filter((a) => !a.hidden && a.id !== 'work' && a.id !== 'projects' && a.id !== 'homepage');
  return [
    intro(site),
    ['## About Dylan', ...visible.map((a) => appLink(site, a.id)), link(site, 'Printable résumé', '/cv/', 'The résumé as a plain page.')].join('\n'),
    ['## Work at Qatalyst (case studies)', appLink(site, 'work'), ...work.map((e) => link(site, e.data.title, `/work/${e.id}/`, e.data.summary))].join('\n'),
    ['## Side projects', appLink(site, 'projects'), ...projects.map((e) => link(site, e.data.title, `/projects/${e.id}/`, e.data.summary))].join('\n'),
    [
      '## Interests',
      appLink(site, 'homepage'),
      ...categories.map((c) => link(site, c.label, `/homepage/${c.id}/`, c.tagline)),
      link(site, 'Game Shelf', '/shelf/', 'My board game collection.'),
    ].join('\n'),
    elsewhere(),
  ].join('\n\n') + '\n';
}

/** A case study's Markdown body, with its headings pushed down under the study's own heading. */
const demote = (md: string, by: number) => md.replace(/^(#{1,5}) /gm, (_, h: string) => `${'#'.repeat(Math.min(h.length + by, 6))} `);

function caseStudy(site: URL, e: Entry, app: 'work' | 'projects') {
  const d = e.data;
  const links = [
    d.links.live && `[live site](${d.links.live})`,
    d.links.repo && `[source](${d.links.repo})`,
  ].filter(Boolean);
  return [
    `### ${d.title}`,
    [d.client, d.year, d.role].filter(Boolean).join(' · '),
    d.summary,
    `Stack: ${d.stack.join(', ')}`,
    `Page: ${new URL(`/${app}/${e.id}/`, site)}${links.length ? ` · ${links.join(' · ')}` : ''}`,
    demote(e.body ?? '', 2).trim(),
  ]
    .filter(Boolean)
    .join('\n\n');
}

/** An Interests block as Markdown (photos and "coming soon" signs are left out). */
function block(site: URL, b: Block): string {
  switch (b.type) {
    case 'text':
      return b.paragraphs.join('\n\n');
    case 'feature':
      return [`**${b.title}**${b.subtitle ? ` (${b.subtitle})` : ''}`, ...b.paragraphs].join('\n\n');
    case 'cards':
      return b.cards.map((c) => `- **${c.title}**${c.subtitle ? ` (${c.subtitle})` : ''}${c.text ? `: ${c.text}` : ''}`).join('\n');
    case 'list':
      return [b.title && `${b.title}:`, ...b.items.map((i) => `- ${i}`)].filter(Boolean).join('\n');
    case 'table':
      return b.rows.map(([k, v]) => `- ${k}: ${v}`).join('\n');
    case 'steam':
      return b.games.map((g) => `- ${g.name}: ${g.note}`).join('\n');
    case 'boardGames':
      return b.games.map((g) => `- ${g.name}`).join('\n');
    case 'actions':
      return b.actions
        .map((a) => (a.href ? `[${a.label}](${a.href})` : a.app ? `[${a.label}](${new URL(appHref(a.app), site)})` : ''))
        .filter(Boolean)
        .join(' · ');
    default:
      return '';
  }
}

export async function llmsFullTxt(site: URL): Promise<string> {
  const { work, projects } = await caseStudies();
  const parts = [
    intro(site),
    ['## Profile', profile.summary].join('\n\n'),
    [
      '## Experience',
      ...timeline.map((t) =>
        [`### ${t.role}, ${t.org} (${t.dates})`, t.note, ...(t.highlights?.map((h) => `- ${h}`) ?? [])].filter(Boolean).join('\n'),
      ),
    ].join('\n\n'),
    [
      '## Education and certifications',
      `- ${education.degree}, ${education.school} (${education.dates})`,
      ...certifications.map((c) => `- ${c.name}, ${c.issuer} (${c.year})`),
      `- ${clearance}`,
    ].join('\n'),
    ['## Skills', ...skillGroups.map((g) => `- ${g.name}: ${g.items.join(', ')}`)].join('\n'),
    ['## Work at Qatalyst (case studies)', ...work.map((e) => caseStudy(site, e, 'work'))].join('\n\n'),
    ['## Side projects', ...projects.map((e) => caseStudy(site, e, 'projects'))].join('\n\n'),
    [
      '## Interests',
      `### ${homeIntro.heading}`,
      ...homeIntro.body,
      ...categories.map((c) =>
        [
          `### ${c.label}`,
          `Page: ${new URL(`/homepage/${c.id}/`, site)}`,
          c.intro,
          ...c.sections.map((s) => [`#### ${s.title}`, ...s.blocks.map((b) => block(site, b))].filter(Boolean).join('\n\n')),
        ].join('\n\n'),
      ),
    ].join('\n\n'),
    elsewhere(),
  ];
  return parts.join('\n\n') + '\n';
}
