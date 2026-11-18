export interface TimelineEntry {
  org: string;
  role: string;
  dates: string;
  note?: string;
  /** Bullet points shown under the note on the résumé */
  highlights?: string[];
}

export const timeline: TimelineEntry[] = [
  {
    org: 'Qatalyst Research Group',
    role: 'Chief Technology Officer',
    dates: '2020 – present',
    note: 'Technology lead for a research and evaluation consultancy, building its client platforms, internal systems and AI tools.',
    highlights: [
      "Architect and lead developer of Qatalyst's systems; set the firm's technical direction and directed junior developers on its AI tools.",
      'Built secure, role-based platforms for performance measurement, with configurable data collection, imports, live dashboards and reports to Excel, Word and PDF.',
      'Automated the retrieval, quality checks and versioning of Statistics Canada and administrative data, so each published figure traces to its source.',
      'Developed AI tools for survey coding, transcript analysis, literature reviews, community profiles, opportunity screening and proposal writing.',
      'Applied row-level security, encryption and Canadian data residency; led requirements sessions, training and ongoing support with clients.',
    ],
  },
  {
    org: 'Convertus',
    role: 'Full-Stack Web Developer',
    dates: '2018 – 2020',
    note: 'Developed and tested a platform that launched 1,400+ auto dealership websites.',
  },
  {
    org: 'Goss Gilroy Inc.',
    role: 'Full-Stack Web Developer',
    dates: '2018',
    note: 'Built responsive websites and a Word plug-in that automated proposal writing.',
  },
  {
    org: 'University of British Columbia',
    role: 'Teaching Assistant, Software Engineering',
    dates: '2017',
    note: 'Coached teams building full-stack TypeScript apps.',
  },
  {
    org: 'Mazdis Innovations',
    role: 'Full-Stack Web Developer',
    dates: '2016 – 2017',
    note: 'Built an Angular app for reserving bike parking.',
  },
  {
    org: 'Vision Critical',
    role: 'Software Engineer in Test',
    dates: '2015 – 2016',
    note: 'Wrote REST API test suites with over 90% coverage.',
  },
];

export const education = {
  school: 'University of British Columbia',
  degree: 'BSc, Computer Science',
  dates: '2013 – 2018',
};

export const certifications = [
  { name: 'Team Kanban Practitioner', issuer: 'Kanban University', year: '2020' },
  { name: 'TCPS 2: CORE, Research Ethics', issuer: 'Interagency Advisory Panel on Research Ethics', year: '2017' },
];

export const clearance = 'Reliability Status security clearance';
