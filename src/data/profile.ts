export const profile = {
  name: 'Dylan Weicker',
  role: 'Chief Technology Officer',
  company: 'Qatalyst Research Group',
  location: 'Vancouver, BC',
  /** The Welcome hero's line under role · company · location, so it doesn't repeat them */
  tagline: 'A full-stack developer building AI tools for researchers.',
  bio: [
    'Qatalyst does research and evaluation for governments and non-profits, and I build the software behind it, such as AI tools that help our consultants write proposals and analyze the data they collect, as well as survey, reporting and dashboard platforms for our clients and internal staff. Most of it is built using Next.js, TypeScript, Postgres and LLMs.',
    "Off the clock you'll find me performing improv, playing board games & Blood on the Clocktower, running a Pathfinder campaign, doing yoga, and hanging out with my cats.",
  ],
  /** The résumé's profile paragraph: the bio above, in a résumé's register */
  summary:
    "I am a chief technology officer and full-stack developer with over ten years of software-development experience building web applications and data systems. Since joining Qatalyst in 2020, I have built data collection, performance measurement and reporting platforms for clients such as the Canadian Race Relations Foundation, go2HR, Pharmacists Manitoba, the Chefs' Table Society of BC, Northwestern Polytechnic and the Tourism Industry Association of Canada, along with internal platforms and AI tools that Qatalyst's consultants use every day. My AI tools are designed for research settings with de-identification of sensitive data, and citations that trace each finding to its source.",
  links: {
    email: 'dylanweicker@gmail.com',
    github: 'https://github.com/dylanweicker',
    linkedin: 'https://www.linkedin.com/in/dylan-weicker-3b9809111',
  },
} as const;
