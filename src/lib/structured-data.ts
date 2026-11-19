import { profile } from '@/data/profile';
import { skillGroups } from '@/data/skills';
import { education } from '@/data/timeline';

/** Skill groups that describe Dylan's expertise (the rest are tools and integrations). */
const EXPERTISE = ['Languages', 'Frontend', 'Backend & Data', 'AI'];

/**
 * schema.org JSON-LD for every page: Dylan as a Person and the site as his WebSite, so search
 * and answer engines can say who he is without parsing the desktop. The home page is also his
 * ProfilePage. Built from src/data, so it stays in step with the Welcome window and résumé.
 */
export function structuredData(site: URL, isHome: boolean) {
  const home = new URL('/', site).href;
  const [city, region] = profile.location.split(',').map((s) => s.trim());
  const person = {
    '@type': 'Person',
    '@id': `${home}#dylan`,
    name: profile.name,
    url: home,
    image: new URL('/dylan.webp', site).href,
    jobTitle: profile.role,
    description: profile.tagline,
    worksFor: { '@type': 'Organization', name: profile.company, url: 'https://qatalyst.ca/' },
    address: { '@type': 'PostalAddress', addressLocality: city, addressRegion: region, addressCountry: 'CA' },
    alumniOf: { '@type': 'CollegeOrUniversity', name: education.school },
    knowsAbout: skillGroups.filter((g) => EXPERTISE.includes(g.name)).flatMap((g) => g.items),
    sameAs: [profile.links.github, profile.links.linkedin],
  };
  const website = { '@type': 'WebSite', '@id': `${home}#site`, url: home, name: profile.name, author: { '@id': person['@id'] } };
  const graph: object[] = [person, website];
  if (isHome) graph.push({ '@type': 'ProfilePage', url: home, mainEntity: { '@id': person['@id'] }, isPartOf: { '@id': website['@id'] } });
  // "<" escaped so the JSON can never close its <script> tag early
  return JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replace(/</g, '\\u003c');
}
