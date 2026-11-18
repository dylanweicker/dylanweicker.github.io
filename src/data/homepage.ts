import type { AppId } from './apps';

/*
 * "Dylan's World": the hobbies & interests section (the Interests app), presented as a 2006-style personal
 * homepage in a retro browser. Six pages, each made of sections, each section a list of typed blocks.
 * Written in Dylan's own voice. Anything still missing shows an "under construction" sign until it's
 * filled in here.
 *
 * Photos: put originals in art/homepage/<page>/…, run `python scripts/build-scene-assets.py`, then reference
 * the published file, e.g. '/homepage/travel/japan/kyoto-1.webp' (a '-thumb.webp' twin is made automatically).
 */

export interface Action {
  label: string;
  /** Opens a DylanOS app */
  app?: AppId;
  /** Opens a link in a new tab */
  href?: string;
}

export interface Photo {
  src: string;
  caption?: string;
}

export interface Card {
  title: string;
  subtitle?: string;
  /** Small labels under the title, e.g. system and role */
  meta?: string[];
  text?: string;
  photo?: string;
  /** Hidden behind a "Spoilers!" toggle */
  spoiler?: string;
  /** Label/value pairs, e.g. a cat's favourite spot */
  facts?: [string, string][];
  /** Shown larger, spanning the row */
  featured?: boolean;
  /** Clicking the card jumps to this section on the same page */
  jumpTo?: string;
  actions?: Action[];
}

export interface Album {
  title?: string;
  meta?: string;
  text?: string;
  photos: Photo[];
}

export type Block =
  | { type: 'text'; paragraphs: string[] }
  | { type: 'feature'; label?: string; title: string; subtitle?: string; image?: string; paragraphs: string[]; actions?: Action[] }
  | { type: 'cards'; cards: Card[] }
  | { type: 'gallery'; albums: Album[]; empty: string }
  | { type: 'table'; heading?: [string, string]; rows: [string, string][] }
  | { type: 'list'; title?: string; ordered?: boolean; items: string[] }
  | { type: 'shelfPicks'; count: number }
  | { type: 'steam'; games: { appId: number; name: string; note: string }[] }
  | { type: 'construction'; text: string }
  | { type: 'actions'; actions: Action[] };

export interface HomeSection {
  /** Anchor id, unique across the site */
  id: string;
  title: string;
  blocks: Block[];
}

export interface HomeCategory {
  id: string;
  label: string;
  tagline: string;
  /** Fake file name shown in the address bar */
  file: string;
  intro: string;
  sections: HomeSection[];
}

export const SITE = {
  name: "Dylan's World",
  host: 'http://www.dylansworld.home/',
  marquee: '✦ hobbies & interests ✦ games · performance · travel · cats · pop music · yoga ✦ thanks for stopping by ✦',
};

export const homeIntro = {
  heading: 'A few of my favourite things',
  body: [
    "I'm a software developer by day, a gamer by night, and a gay theatre nerd at all times.",
    "I started teaching myself HTML while playing Neopets in 2003, and built my first website when I was eight. Ever since then I've wanted to be a web developer. But outside of web-development, I have a lot of other hobbies.",
    "I love games of all sorts, from heavy strategy board games to light party games. My favourite is Blood on the CLocktower, a hidden-role social deduction game. I also play D&D and Pathfinder, and run a bi-weekly Pathfinder 2e campaign. I also have play a lot of PC games on Steam.",
    "I've also always had an interest in acting. I had an agent and was in commercials when I was just three years old. In highschool, I wrote a play for our class to perform, was cast in Little Shop of Horrors, and played the lead role in three plays, including Shakespeare's Macbeth. Now I'm an avid improviser, and I perform every week with a local improv troupe.",
    "Click around to learn more about my hobbies and interests."
  ],
};

const pending = (text: string): Block => ({ type: 'construction', text });

export const categories: HomeCategory[] = [
  {
    id: 'games',
    label: 'Games',
    tagline: 'All sorts. Board games, roleplaying, social deduction, video games.',
    file: 'games.html',
    intro: 'Games are my favourite way to spend time with people. A game night with friends is my idea of a perfect evening.',
    sections: [
      {
        id: 'gm-screen',
        title: 'Behind the GM Screen',
        blocks: [
          {
            type: 'feature',
            label: 'Now running',
            title: 'Abomination Vaults',
            subtitle: 'Pathfinder 2e · Game Master',
            paragraphs: [
              "A dungeon crawl beneath a haunted lighthouse, and the campaign I'm running right now. GMing scratches every itch I have: storytelling, improv, systems design, and doing far too many voices.",
              'My players have a companion website I built, with characters, session logs, quests and an in-game calendar.',
            ],
            actions: [{ label: 'See the Abomination Vaults site', href: 'https://abominationvaults.dylanweicker.ca/' }],
          },
          {
            type: 'text',
            paragraphs: [
              "I've been on both sides of the screen. As a GM I love building worlds; as a player, my only job is to roll dice and make questionable decisions.",
            ],
          },
          {
            type: 'list',
            title: 'Other campaigns',
            items: [
              'Kingmaker (Pathfinder, GM): exploring, settling and ruling the Stolen Lands',
              'Curse of the Crimson Throne (Pathfinder, GM): intrigue, plague and a very bad queen',
              'Curse of Strahd (D&D 5e, player): gothic horror in Barovia',
              'Waterdeep: Dragon Heist (D&D 5e, player): a city-wide treasure hunt',
              'Homebrew campaigns (GM): worlds and stories of my own',
            ],
          },
        ],
      },
      {
        id: 'board-games',
        title: 'Board Games',
        blocks: [
          {
            type: 'text',
            paragraphs: [
              "I'll happily play anything, from a quick party game to a strategy epic that eats the whole afternoon. If there's a game night, I'm in.",
              'My favourite is Blood on the Clocktower. Give me a table full of people who might be lying, and every game becomes a shared puzzle of claims, counter-claims and one very convincing Demon.',
              'My shelf passed a hundred games a while ago. A few, picked at random:',
            ],
          },
          { type: 'shelfPicks', count: 6 },
          { type: 'actions', actions: [{ label: 'Pick a game from my shelf', href: 'https://games.dylanweicker.ca/' }] },
        ],
      },
      {
        id: 'video-games',
        title: 'Video Games',
        blocks: [
          {
            type: 'text',
            paragraphs: [
              "My library is all over the map, and my real weakness is any game with a build mode. Give me one and I'll lose an evening to floor plans and wallpaper.",
            ],
          },
          {
            type: 'steam',
            games: [
              { appId: 381210, name: 'Dead by Daylight', note: 'Surviving the trials, one terrified sprint at a time.' },
              { appId: 289070, name: 'Sid Meier’s Civilization VI', note: '"One more turn" has cost me a lot of sleep.' },
              { appId: 413150, name: 'Stardew Valley', note: 'Quiet seasons on the farm.' },
              { appId: 435150, name: 'Divinity: Original Sin 2', note: 'Turn-based chaos, where every fight ends with something on fire.' },
            ],
          },
          pending('more favourites coming soon'),
          { type: 'actions', actions: [{ label: 'See my Steam profile', href: 'https://steamcommunity.com/id/nifflr/' }] },
        ],
      },
    ],
  },
  {
    id: 'performance',
    label: 'Performance',
    tagline: "Improv, theatre, themed parties. Any excuse to put on a character.",
    file: 'performance.html',
    intro: "I'm a performer at heart, whether that's on a stage, at a theme party, or at the karaoke mic.",
    sections: [
      {
        id: 'improv',
        title: 'Improv',
        blocks: [
          { type: 'text', paragraphs: ['Every week. Yes, and…'] },
          {
            type: 'gallery',
            albums: [
              {
                photos: [
                  { src: '/homepage/improv/improv-1.webp', caption: '' },
                  { src: '/homepage/improv/improv-2.webp', caption: '' },
                  { src: '/homepage/improv/improv-3.webp', caption: '' },
                  { src: '/homepage/improv/improv-4.webp', caption: '' },
                ],
              },
            ],
            empty: 'improv photos coming soon',
          },
        ],
      },
      {
        id: 'theatre',
        title: 'My Theatrical Career™',
        blocks: [
          {
            type: 'text',
            paragraphs: ['I spent years in amateur theatre and was in three plays, including the lead in Macbeth.'],
          },
          {
            type: 'cards',
            cards: [
              {
                title: 'Macbeth',
                subtitle: 'Macbeth (the lead)',
                meta: ['William Shakespeare', 'Amateur theatre'],
                text: 'The ambition, the murder, the descent into madness. I had a great time.',
                featured: true,
              },
            ],
          },
          pending('the other two productions and photos coming soon'),
        ],
      },
      {
        id: 'theme-parties',
        title: 'Theme Parties & Costumes',
        blocks: [
          { type: 'text', paragraphs: ['Any excuse to dress up. Give me a theme and I will commit to the costume.'] },
          { type: 'gallery', albums: [], empty: 'party photos coming soon' },
        ],
      },
    ],
  },
  {
    id: 'travel',
    label: 'Travel',
    tagline: "Places I've been, things I've seen.",
    file: 'travel.html',
    intro: 'I love exploring a new city: wandering its neighbourhoods, finding the good food, and getting a little lost on purpose.',
    sections: [
      {
        id: 'trips',
        title: 'Trips',
        blocks: [
          {
            type: 'cards',
            cards: [
              { title: 'Japan', meta: ['Tokyo', 'Kyoto', 'Osaka', 'Hiroshima'], jumpTo: 'japan' },
              { title: 'China', meta: ['Beijing', "Xi'an", 'Chengdu', 'Chongqing', 'Shanghai'], jumpTo: 'china' },
              { title: 'Mexico', jumpTo: 'mexico' },
              { title: 'United States', meta: ['New York', 'San Francisco'], jumpTo: 'usa' },
              { title: 'Canada', meta: ['Montreal'], jumpTo: 'canada' },
            ],
          },
        ],
      },
      {
        id: 'japan',
        title: 'Japan',
        blocks: [{ type: 'gallery', albums: [], empty: 'Tokyo, Kyoto, Osaka and Hiroshima photos coming soon' }],
      },
      {
        id: 'china',
        title: 'China',
        blocks: [{ type: 'gallery', albums: [], empty: "Beijing, Xi'an, Chengdu, Chongqing and Shanghai photos coming soon" }],
      },
      {
        id: 'mexico',
        title: 'Mexico',
        blocks: [{ type: 'gallery', albums: [], empty: 'Mexico photos coming soon' }],
      },
      {
        id: 'usa',
        title: 'United States',
        blocks: [{ type: 'gallery', albums: [], empty: 'New York and San Francisco photos coming soon' }],
      },
      {
        id: 'canada',
        title: 'Canada',
        blocks: [{ type: 'gallery', albums: [], empty: 'Montreal photos coming soon' }],
      },
    ],
  },
  {
    id: 'cats',
    label: 'Cats',
    tagline: "My biological children (don't question it).",
    file: 'cats.html',
    intro: 'I have two little fur babies, Pebble and Milo.',
    sections: [
      {
        id: 'kids',
        title: 'Meet the Kids',
        blocks: [
          {
            type: 'cards',
            cards: [
              { title: 'Pebble', subtitle: 'Queen of the Castle', text: 'Never leaves my side', facts: [] },
              { title: 'Milo', subtitle: 'Dirty Rascal', text: 'Loves to be walked on a leash', facts: [] },
            ],
          },
          pending('photos, favourite spots, toys and weird habits coming soon'),
        ],
      },
      {
        id: 'milos-adventures',
        title: "Milo's Adventures",
        blocks: [{ type: 'gallery', albums: [], empty: "photos from Milo's walks coming soon" }],
      },
      {
        id: 'together',
        title: 'Together',
        blocks: [{ type: 'gallery', albums: [], empty: 'photos of the two of them coming soon' }],
      },
    ],
  },
  {
    id: 'pop-music',
    label: 'Pop Music',
    tagline: 'Pop divas, pride, and world domination.',
    file: 'pop-music.html',
    intro: "The music I can't stop talking about, and the culture that comes with it.",
    sections: [
      {
        id: 'born-this-way',
        title: 'Born This Way',
        blocks: [
          {
            type: 'feature',
            label: 'Little Monster for life',
            title: 'Lady Gaga',
            paragraphs: [
              "Little Monsters are Lady Gaga fans, and I'm a lifelong one. Pop music is one of my favourite things to talk about, so consider yourself warned.",
            ],
            actions: [{ label: 'Open Music', app: 'music' }],
          },
          pending('my ranked favourite Gaga albums and songs coming soon'),
        ],
      },
      {
        id: 'pop-hall-of-fame',
        title: 'Pop Hall of Fame',
        blocks: [
          {
            type: 'text',
            paragraphs: ['My current rotation lives in the Music app: Gaga, Carly Rae Jepsen, MARINA, Katy Perry, Clean Bandit and more.'],
          },
          pending('the full hall of fame (with strong opinions) coming soon'),
        ],
      },
      {
        id: 'drag',
        title: 'Supporting Local Royalty',
        blocks: [
          { type: 'text', paragraphs: ['Drag is one of my favourite art forms, and I try to catch shows whenever I can.'] },
          { type: 'gallery', albums: [], empty: 'photos from drag shows coming soon' },
        ],
      },
    ],
  },
  {
    id: 'yoga',
    label: 'Yoga',
    tagline: 'Bending over backwards, recreationally.',
    file: 'yoga.html',
    intro: 'Gotta align your chakras and stay flexy.',
    sections: [
      {
        id: 'practice',
        title: 'My Practice',
        blocks: [
          {
            type: 'text',
            paragraphs: [
              'I go to yoga every week. After a few days at a keyboard, an hour of stretching and breathing resets everything, and I regularly discover muscles I did not know existed.',
            ],
          },
        ],
      },
    ],
  },
];

export const categoryById = (id: string) => categories.find((c) => c.id === id);

export const categoryOfSection = (sectionId: string) => categories.find((c) => c.sections.some((s) => s.id === sectionId));

/** Every piece of text in a block, for the browser's search box. */
export function blockText(b: Block): string[] {
  switch (b.type) {
    case 'text':
      return b.paragraphs;
    case 'feature':
      return [b.title, b.subtitle ?? '', b.label ?? '', ...b.paragraphs];
    case 'cards':
      return b.cards.flatMap((c) => [c.title, c.subtitle ?? '', c.text ?? '', ...(c.meta ?? []), ...(c.facts ?? []).flat()]);
    case 'gallery':
      return b.albums.flatMap((a) => [a.title ?? '', a.meta ?? '', a.text ?? '', ...a.photos.map((p) => p.caption ?? '')]);
    case 'table':
      return b.rows.flat();
    case 'list':
      return [b.title ?? '', ...b.items];
    case 'steam':
      return b.games.flatMap((g) => [g.name, g.note]);
    default:
      return [];
  }
}

/** '/homepage/x/y.webp' -> '/homepage/x/y-thumb.webp' (made by scripts/build-scene-assets.py) */
export const thumbOf = (src: string) => src.replace(/\.webp$/, '-thumb.webp');
