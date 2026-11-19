export type AppId =
  | 'about'
  | 'work'
  | 'projects'
  | 'skills'
  | 'resume'
  | 'hobbies'
  | 'homepage'
  | 'photos'
  | 'music'
  | 'contact'
  | 'cannon'
  | 'boardgames';

export interface AppDef {
  id: AppId;
  /** Window title and desktop label */
  title: string;
  /** Short label for the desktop icon, if different from the title */
  label?: string;
  icon: string;
  width: number;
  height: number;
  /**
   * Opens sized to the screen instead of to width/height: `height` is the share of the desktop's
   * height it fills, and `aspect` its width-to-height ratio (still capped to the desktop's width).
   */
  fit?: { height: number; aspect: number };
  /** Shown in the mobile dock */
  dock?: boolean;
  /** Left off the desktop and Start menu; only opened from inside other apps */
  hidden?: boolean;
  /** Page <title> and meta description for the pre-rendered route */
  description: string;
}

export const apps: AppDef[] = [
  {
    id: 'about',
    title: 'Welcome',
    icon: '/icons/hello.webp',
    width: 640,
    height: 787,
    dock: true,
    description: 'Dylan Weicker — CTO and full-stack developer in Vancouver building AI tools for researchers.',
  },
  {
    id: 'work',
    title: 'My Work',
    icon: '/icons/work.webp',
    width: 820,
    height: 580,
    dock: true,
    description: 'Case studies of full-stack products I have built at Qatalyst.',
  },
  {
    id: 'projects',
    title: 'Side Projects',
    icon: '/icons/hobby.webp',
    width: 820,
    height: 580,
    description: 'Websites I\'ve built for personal use.',
  },
  {
    id: 'skills',
    title: 'Skills',
    icon: '/icons/chip.webp',
    width: 560,
    height: 560,
    description: 'The languages, frameworks, AI tools and cloud platforms I work with.',
  },
  {
    id: 'resume',
    title: 'Résumé.pdf',
    label: 'Résumé',
    icon: '/icons/resume.webp',
    width: 680,
    height: 640,
    description: "My curriculum vitae.",
  },
  {
    id: 'hobbies',
    title: 'Hobbies & Interests',
    label: 'Hobbies',
    icon: '/icons/die.png',
    width: 440,
    height: 600,
    // Off the desktop for now; its list in src/data/interests.ts is kept as a reference.
    hidden: true,
    description: 'Hobbies and interests: board games, TTRPGs, improv, yoga, pop music, cats and more.',
  },
  {
    id: 'homepage',
    title: 'Interests',
    icon: '/icons/world.webp',
    width: 960,
    height: 680,
    fit: { height: 0.95, aspect: 1.4 },
    description: "My hobbies and interests, from Pathfinder to improv to cats.",
  },
  {
    id: 'photos',
    title: 'Photo Gallery',
    label: 'Photos',
    icon: '/icons/picture.png',
    width: 760,
    height: 540,
    dock: true,
    // Off the desktop until the albums exist (it's still an under-construction placeholder).
    hidden: true,
    description: 'Photos of the cats, travels and life.',
  },
  {
    id: 'music',
    title: 'Music',
    icon: '/icons/music.webp',
    width: 1240,
    height: 680,
    description: "What Dylan's listening to.",
  },
  {
    id: 'contact',
    title: 'New Message',
    label: 'Say Hi',
    icon: '/icons/mail.webp',
    width: 560,
    height: 480,
    dock: true,
    description: 'Get in touch with me.',
  },
  {
    id: 'boardgames',
    title: 'Game Shelf',
    icon: '/icons/pawn.png',
    width: 980,
    height: 700,
    hidden: true,
    description: "Dylan's board game collection: search, sort and filter by player count and length.",
  },
  {
    id: 'cannon',
    title: 'Cannon Dodger',
    icon: '/icons/penguin.png',
    width: 612,
    height: 760,
    hidden: true,
    description: 'Play Cannon Dodger, a little Unity arcade game about a penguin dodging ice cream.',
  },
];

export const appsById = Object.fromEntries(apps.map((a) => [a.id, a])) as Record<AppId, AppDef>;

export const isAppId = (value: string): value is AppId => value in appsById;
