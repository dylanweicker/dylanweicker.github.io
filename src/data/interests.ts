/*
 * Note: the Hobbies app that shows this list is hidden from the desktop and Start menu
 * (`hidden` in src/data/apps.ts), though /hobbies/ still opens it. The list stays here as a
 * reference for Dylan's interests and the one-liners about each, for the Interests site and other copy.
 * The Interests site's home page sums it up as a paragraph (`homeIntro` in src/data/homepage.ts).
 */

export interface Interest {
  emoji: string;
  name: string;
  line: string;
}

/** The MSN-style status shown at the top of the Hobbies window */
export const hobbiesStatus = {
  displayName: 'Dylan ✨ (Busy GMing)',
  nowPlaying: 'Clean Bandit — Symphony (feat. Zara Larsson)',
  personalMessage: 'yes, and…',
};

export const interests: Interest[] = [
  { emoji: '🎲', name: 'Board Games', line: 'From casual to strategy and everything in between' },
  { emoji: '🐉', name: 'Tabletop RPGs', line: 'D&D and Pathfinder, as both GM and player' },
  { emoji: '🕵️', name: 'Social Deduction', line: 'Blood on the Clocktower, Secret Hitler, Werewolf' },
  {
    emoji: '🎮',
    name: 'Video Games',
    line: 'Dead by Daylight, Civ 6, Stardew Valley, and any game where you can build a house',
  },
  { emoji: '🎭', name: 'Improv', line: 'Every week. Yes, and…' },
  { emoji: '🧘', name: 'Yoga', line: 'Every week. Gotta align your chakras and stay flexy' },
  { emoji: '🎶', name: 'Pop Music', line: "I'm a Little Monster for life" },
  { emoji: '🎤', name: 'Karaoke', line: 'Bad, but enthusiastic' },
  { emoji: '💃', name: 'Dancing', line: 'Poorly, but passionately' },
  { emoji: '🍳', name: 'Cooking', line: 'I love to cook vegetarian food' },
  { emoji: '🐱', name: 'Cats', line: 'I have two little cuties' },
  { emoji: '📱', name: 'Internet Culture', line: 'Dank memes & TikTok' },
  // TODO(Dylan): final wording — original was "and any other radical communist ideologies"
  { emoji: '🌈', name: 'The Gay Agenda™', line: 'and any other radical communist ideologies' },
];
