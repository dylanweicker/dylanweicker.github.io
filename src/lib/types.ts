/** A case study serialized for the desktop island (Markdown body pre-rendered to HTML). */
export interface CaseStudy {
  slug: string;
  title: string;
  client?: string;
  year: string;
  role: string;
  stack: string[];
  summary: string;
  icon: string;
  tint?: [string, string];
  links: { live?: string; repo?: string; play?: string };
  opens?: string;
  html: string;
}

export interface SiteContent {
  work: CaseStudy[];
  projects: CaseStudy[];
}
