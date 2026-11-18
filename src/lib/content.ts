import { getCollection, type CollectionEntry } from 'astro:content';
import type { CaseStudy, SiteContent } from './types';

const toCaseStudy = (entry: CollectionEntry<'work' | 'projects'>): CaseStudy => ({
  slug: entry.id,
  ...entry.data,
  html: entry.rendered?.html ?? '',
});

const byOrder = (a: CollectionEntry<'work' | 'projects'>, b: CollectionEntry<'work' | 'projects'>) =>
  a.data.order - b.data.order;

export async function getSiteContent(): Promise<SiteContent> {
  const [work, projects] = await Promise.all([getCollection('work'), getCollection('projects')]);
  return {
    work: work.sort(byOrder).map(toCaseStudy),
    projects: projects.sort(byOrder).map(toCaseStudy),
  };
}
