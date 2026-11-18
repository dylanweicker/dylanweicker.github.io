export const profile = {
  name: 'Dylan Weicker',
  role: 'Chief Technology Officer',
  company: 'Qatalyst Research Group',
  location: 'Vancouver, BC',
  /** The Welcome hero's line under role · company · location, so it doesn't repeat them */
  tagline: 'A full-stack web developer building tools for researchers and consultants.',
  bio: [
    'I work at Qatalyst Research Group, a Canadian consulting firm that conducts research and evaluation for governments and non-profits. I develop our internal software, including AI tools for proposal writing and data analysis, as well as survey platforms, dashboards, and other web solutions for our clients. I mainly work with Next.js, TypeScript and PostgreSQL.',
    "Outside of work, you'll find me performing improv, playing board games (especially Blood on the Clocktower), running a Pathfinder campaign, doing yoga, hanging out with my cats, or travelling the world.",
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
