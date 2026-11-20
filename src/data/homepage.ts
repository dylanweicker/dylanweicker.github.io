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
  /** hideCaptions: no text under the thumbnails; captions still give the alt text and the photo viewer's title */
  | { type: 'gallery'; albums: Album[]; empty: string; hideCaptions?: boolean }
  | { type: 'table'; heading?: [string, string]; rows: [string, string][] }
  | { type: 'list'; title?: string; ordered?: boolean; items: string[] }
  /** Box art from public/homepage/games/bgg-<bggId>.webp (downloaded by scripts/build-scene-assets.py) */
  | { type: 'boardGames'; games: { bggId: number; name: string }[] }
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
  /** Shown on the page's box in the home page's explore grid (not on the page itself) */
  tagline: string;
  /** Fake file name shown in the address bar */
  file: string;
  intro: string;
  sections: HomeSection[];
}

export const SITE = {
  name: "Dylan's World",
  host: 'http://www.dylansworld.home/',
  marquee: '✦ hobbies & interests ✦ games · performance · travel · cats · pop culture · yoga ✦ thanks for stopping by ✦',
};

export const homeIntro = {
  heading: 'A few of my favourite things',
  body: [
    "I built my first website when I was eight, after teaching myself HTML through Neopets in 2003. I've been making websites ever since, and eventually turned it into my career.",
    "Outside of programming, I spend a lot of time playing games, performing improv, travelling and pursuing whatever else has caught my interest.",
  ],
};

const pending = (text: string): Block => ({ type: 'construction', text });

/** A Travel page box: "2024 · Japan", the stops along the way, then its photos (one album per stop,
 * from art/homepage/travel/<id>/). Id e.g. 'japan-2024'. */
const trip = (place: string, year: number, stops: string[] = [], albums: Album[] = []): HomeSection => ({
  id: `${place.toLowerCase().replace(/[^a-z]+/g, '-')}-${year}`,
  title: `${year} · ${place}`,
  blocks: [
    ...(stops.length ? [{ type: 'text', paragraphs: [stops.join(' · ')] } satisfies Block] : []),
    { type: 'gallery', albums, empty: `photos from ${place} coming soon` },
  ],
});

/** /homepage/travel/<dir>/<name>-1.webp, -2, ... (name as lowercase letters, so "Xi'an" -> xian), one per caption. */
const photos = (dir: string, name: string, captions: string[]): Photo[] =>
  captions.map((caption, i) => ({
    src: `/homepage/travel/${dir}/${name.toLowerCase().replace(/[^a-z]+/g, '')}-${i + 1}.webp`,
    caption,
  }));

/** Cats page photos: /homepage/cats/<name>-1.webp, -2, ... one per caption (sources in art/homepage/cats/). */
const catPhotos = (name: string, captions: string[]): Photo[] =>
  captions.map((caption, i) => ({ src: `/homepage/cats/${name}-${i + 1}.webp`, caption }));

/** A Cats page section's photos as one untitled gallery, captions hidden under the thumbnails. */
const catGallery = (name: string, captions: string[]): Block => ({
  type: 'gallery',
  albums: [{ photos: catPhotos(name, captions) }],
  empty: 'photos coming soon',
  hideCaptions: true,
});

/** One stop's album, titled with the stop. A one-place trip uses an untitled album: { photos: photos(...) }. */
const stop = (dir: string, title: string, captions: string[]): Album => ({ title, photos: photos(dir, title, captions) });

export const categories: HomeCategory[] = [
  {
    id: 'games',
    label: 'Games',
    tagline: 'Board games, social deduction, TTRPGs, Steam.',
    file: 'games.html',
    intro: 'I spend a lot of my free time playing board games, video games and tabletop RPGs. I\'ve been the game master for many Pathfinder campaigns for years.',
    sections: [
      {
        id: 'tabletop-roleplaying',
        title: 'Tabletop Roleplaying',
        blocks: [
          {
            type: 'text',
            paragraphs: [
              'In a tabletop roleplaying game like Dungeons & Dragons or Pathfinder, each player plays one character, and the game master plays the world and everyone else in it. The GM sets the scene, the players say what they do, and the dice decide how it goes.',
              'Running a game also scratches every itch I have: storytelling, improv, systems design, and doing far too many voices.',
              "I've run and played several campaigns over the years: Curse of Strahd, Curse of the Crimson Throne, Kingmaker, and a bunch of homebrews.",
              "Right now I'm running Abomination Vaults, a Pathfinder dungeon crawl beneath a haunted lighthouse, every other week. I built a companion site for my players, with their characters, session logs, quests and an in-game calendar.:",
            ],
          },
          {
            type: 'gallery',
            albums: [
              {
                photos: [
                  { src: '/homepage/games/abomination-vaults/session-1.webp', caption: 'The Unholy Burial Vault' },
                  { src: '/homepage/games/abomination-vaults/session-2.webp', caption: "The Trapmaster's Gauntlet" },
                  { src: '/homepage/games/abomination-vaults/session-3.webp', caption: 'The Exiled Prince' },
                  { src: '/homepage/games/abomination-vaults/session-5.webp', caption: 'Behind the Rune Door' },
                  { src: '/homepage/games/abomination-vaults/session-6.webp', caption: 'Dragonslayer' },
                  { src: '/homepage/games/abomination-vaults/session-8.webp', caption: 'Corpselights' },
                ],
              },
            ],
            empty: 'session scenes coming soon',
          },
          { type: 'actions', actions: [{ label: 'See the Abomination Vaults site', href: 'https://abominationvaults.dylanweicker.ca/' }] },
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
              'My favourite is Blood on the Clocktower. I love to use deduction and social reads to sus out who\'s lying, or use my convincing charm and control the narrative to lead evil to a victory.',
              'I own well over a hundred board games, so many that I\'ve run out of shelf space to put them all.',
            ],
          },
          {
            type: 'boardGames',
            games: [
              { bggId: 240980, name: 'Blood on the Clocktower' },
              { bggId: 237182, name: 'Root' },
              { bggId: 420033, name: 'Vantage' },
              { bggId: 173346, name: '7 Wonders Duel' },
              { bggId: 295947, name: 'Cascadia' },
              { bggId: 254640, name: 'Just One' },
            ],
          },
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
              "My taste in games varies from survival horror, grand strategy, RPG, to anything where I can live the fantasy of being a homeowner. ",
            ],
          },
          {
            type: 'steam',
            games: [
              { appId: 381210, name: 'Dead by Daylight', note: 'Surviving the trials, one terrified sprint at a time.' },
              { appId: 289070, name: 'Sid Meier’s Civilization VI', note: '"One more turn" has cost me a lot of sleep.' },
              { appId: 2707930, name: 'Palia', note: 'Cozy village life, and yes, I can build a house.' },
              { appId: 435150, name: 'Divinity: Original Sin 2', note: 'Turn-based chaos, where every fight ends with something on fire.' },
              { appId: 413150, name: 'Stardew Valley', note: 'Quiet seasons on the farm.' },
              { appId: 640820, name: 'Pathfinder: Kingmaker', note: 'Pathfinder, with someone else as the GM for once.' },
            ],
          },
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
    intro: "I've always had an interest in acting.",
    sections: [
      {
        id: 'improv',
        title: 'Improv',
        blocks: [
          { type: 'text', paragraphs: ['I\'m an avid improviser, and perform almost every week with a local improv troupe.'] },
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
            paragraphs: ["In high school, I wrote a play for our class and performed in several products, including Little Shop of Horrors, Therac-25, The Real Inspector Hound, and Macbeth."],
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
    intro: 'Here are some of the places I\'ve travelled to over the years.',
    // Newest first. Each trip is one box titled with the place and year, listing the stops.
    sections: [
      trip('Ontario', 2026, ['Toronto', 'Niagara', 'Stratford']),
      trip('Montreal', 2026),
      trip('Kelowna', 2026),
      trip('China', 2025, ['Beijing', "Xi'an", 'Chengdu', 'Chongqing', 'Zhangjiajie', 'Shanghai'], [
        // Captions stay one line on the narrowest (130px) tile: 20 characters at most ("Super Nintendo World" fits).
        stop('china-2025', 'Beijing', ['Big Air Shougang', 'Shougang sunset', 'Red Chamber park']),
        stop('china-2025', "Xi'an", ['Terracotta Army', 'Pagoda light show', "Xi'an City Wall"]),
        stop('china-2025', 'Chengdu', ['Giant Panda Base', 'Tianfu Art Park', 'Hotpot']),
        stop('china-2025', 'Chongqing', ['Raffles rooftop', 'Night skyline', 'Near Fuling']),
        stop('china-2025', 'Zhangjiajie', ['Wulingyuan', 'Tianmen Mountain', '72 Qilou at night']),
        stop('china-2025', 'Shanghai', ['Huangpu at dusk', 'Yu Garden', 'Waibaidu Bridge']),
        stop('china-2025', 'Shanghai Disneyland', ['Adventure Isle', 'Zootopia', 'Castle at night']),
      ]),
      trip('Japan', 2024, ['Tokyo', 'Hakone', 'Osaka', 'Nara', 'Kyoto', 'Hiroshima'], [
        stop('japan-2024', 'Tokyo', ['Kabukicho', 'teamLab', 'WB Studio Tour']),
        stop('japan-2024', 'Hakone', ['Lake Ashi', 'Owakudani', 'Open-Air Museum']),
        stop('japan-2024', 'Osaka', ['Osaka Castle', 'Super Nintendo World', 'Universal Studios']),
        stop('japan-2024', 'Nara', ['Todai-ji', 'Nara deer', 'Isuien Garden']),
        stop('japan-2024', 'Kyoto', ['Imperial Palace', 'Kyoto canal', 'Railway Museum']),
        stop('japan-2024', 'Hiroshima', ['Floating torii', 'Miyajima', 'Orizuru Tower']),
      ]),
      trip('Mexico', 2023, ['Puerto Vallarta', 'Mexico City']),
      trip('San Francisco', 2022),
      trip('Egypt', 2021, ['Cairo', 'Alexandria', 'Luxor', 'Aswan', 'Hurghada'], [
        stop('egypt-2021', 'Cairo', ['Camels at Giza', 'Great Pyramid', 'Cairo Citadel']),
        stop('egypt-2021', 'Alexandria', ["Pompey's Pillar", 'Alexander the Great', 'Mediterranean']),
        stop('egypt-2021', 'Luxor', ['Balloons at dawn', 'Hatshepsut Temple', 'Karnak']),
        stop('egypt-2021', 'Aswan', ['Abu Simbel', 'Philae Temple', 'Kiosk of Trajan']),
        stop('egypt-2021', 'Hurghada', ['Quad biking', 'Camel ride', 'Red Sea']),
      ]),
      trip('Cuba', 2019, ['Havana', 'Las Terrazas', 'Viñales', 'Matanzas', 'Trinidad', 'Cienfuegos']),
      trip('Beijing', 2018, [], [{ photos: photos('beijing-2018', 'Beijing', ['Great Wall', 'Forbidden City', "Bird's Nest", 'Beihai Park', 'Beijing Zoo', 'Cat café']) }]),
      trip('Montreal', 2018),
      trip('New York', 2018),
      trip('Joffre Lake', 2017, [], [{ photos: photos('joffre-lake-2017', 'Joffre Lake', ['Lake day', 'Hula hooping', 'Cottage life']) }]),
      trip('Europe', 2013, ['Paris', 'Brussels', 'Amsterdam']),
      trip('Europe', 2011, ['London', 'Paris', 'Rome'], [
        stop('europe-2011', 'London', ['Platform 9¾', 'Big Ben', 'Tower Bridge']),
        stop('europe-2011', 'Paris', ['Eiffel Tower', 'Notre-Dame', 'Versailles']),
        stop('europe-2011', 'Rome', ['Colosseum', 'Trevi Fountain', "St. Peter's"]),
      ]),
    ],
  },
  {
    id: 'cats',
    label: 'Cats',
    tagline: "Pebble and Milo, my biological children.",
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
              { title: 'Pebble', subtitle: 'Queen of the Castle', text: 'Never leaves my side', photo: '/homepage/cats/pebble-card.webp', facts: [] },
              { title: 'Milo', subtitle: 'Dirty Rascal', text: 'Loves to be walked on a leash', photo: '/homepage/cats/milo-card.webp', facts: [] },
            ],
          },
        ],
      },
      {
        id: 'pebble',
        title: 'Pebble',
        blocks: [catGallery('pebble', ['Couch queen', 'Party animal', 'Close-up', 'Supervising', 'Stuffie pile', 'Shark attack'])],
      },
      {
        id: 'milo',
        title: 'Milo',
        blocks: [catGallery('milo', ['Tiny Milo', 'Toy time', 'Cone of shame', 'Nap time', 'If I fits, I sits', 'Desk nap'])],
      },
      {
        id: 'milos-adventures',
        title: "Milo's Adventures",
        blocks: [catGallery('walk', ['Out for a walk', 'Ready to go', 'Grass break', 'Sky gazing', 'Rock inspection', 'On patrol'])],
      },
      {
        id: 'together',
        title: 'Together',
        blocks: [
          catGallery('together', [
            'Side by side', 'Bedtime', 'Headboard climber',
            'Bird watching', 'Window seat', 'Upstairs, downstairs',
            'Top bunk', 'Royal court', 'Matching caves',
          ]),
        ],
      },
    ],
  },
  {
    id: 'pop-culture',
    label: 'Pop Culture',
    tagline: 'Pop music and local drag shows.',
    file: 'pop-culture.html',
    intro: "The music I can't stop talking about, and the culture that comes with it.",
    sections: [
      {
        id: 'pop',
        title: 'Pop Music',
        blocks: [
          {
            type: 'text',
            paragraphs: [
              "I'm a little monster for life. I've been a Lady Gaga fan since The Fame, and she's still one of my favourite artists. I also listen to a lot of Chappell Roan, MARINA, Kesha and dance-pop from the late 2000s and early 2010s.",
            ],
          },
          {
            // Covers from Apple's iTunes catalogue, saved to art/homepage/pop-music/
            type: 'gallery',
            albums: [
              {
                photos: [
                  { src: '/homepage/pop-music/born-this-way.webp', caption: 'Born This Way · Lady Gaga' },
                  { src: '/homepage/pop-music/electra-heart.webp', caption: 'Electra Heart · MARINA' },
                  { src: '/homepage/pop-music/artpop.webp', caption: 'ARTPOP · Lady Gaga' },
                  { src: '/homepage/pop-music/midwest-princess.webp', caption: 'The Rise and Fall of a Midwest Princess · Chappell Roan' },
                  { src: '/homepage/pop-music/mayhem.webp', caption: 'MAYHEM · Lady Gaga' },
                  { src: '/homepage/pop-music/animal.webp', caption: 'Animal · Kesha' },
                ],
              },
            ],
            empty: 'album covers coming soon',
          },
          { type: 'actions', actions: [{ label: 'Open Music', app: 'music' }] },
        ],
      },
      {
        id: 'drag',
        title: 'Local Drag Shows',
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
    case 'boardGames':
      return b.games.map((g) => g.name);
    default:
      return [];
  }
}

/** '/homepage/x/y.webp' -> '/homepage/x/y-thumb.webp' (made by scripts/build-scene-assets.py) */
export const thumbOf = (src: string) => src.replace(/\.webp$/, '-thumb.webp');
