export interface SkillGroup {
  name: string;
  items: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    name: 'Languages',
    items: ['TypeScript', 'JavaScript', 'Python', 'PHP', 'SQL', 'C#', 'Java'],
  },
  {
    name: 'Frontend',
    items: ['React', 'Next.js', 'Vue / Nuxt', 'Vuetify', 'Tailwind CSS', 'shadcn/ui', 'Recharts', 'Chart.js'],
  },
  {
    name: 'Backend & Data',
    items: [
      'Node.js',
      'FastAPI',
      'PostgreSQL',
      'Supabase',
      'MySQL',
      'Firebase',
      'REST APIs',
      'Statistics Canada data (WDS, RTRA)',
    ],
  },
  {
    name: 'AI',
    items: [
      'Claude / Anthropic SDK',
      'OpenAI & Azure OpenAI',
      'RAG & pgvector',
      'Fine-tuning',
      'LLM pipelines & agents',
      'Claude Code plugins & skills',
      'Langfuse',
    ],
  },
  {
    name: 'Cloud & DevOps',
    items: ['Azure', 'Vercel', 'Railway', 'Firebase Hosting', 'Docker', 'GitHub Actions'],
  },
  {
    name: 'Integrations',
    items: ['Microsoft 365, Teams & SharePoint (Graph API)', 'QuickBooks Online', 'SurveyMonkey & SurveyMonkey Apply'],
  },
  { name: 'Testing', items: ['Vitest', 'Playwright'] },
  { name: 'Games & Fun', items: ['Unity / C#', 'Phaser', 'Three.js'] },
];
