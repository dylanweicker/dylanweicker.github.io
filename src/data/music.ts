export interface Track {
  /** YouTube video ID (youtube.com/watch?v=<id>) */
  youtubeId: string;
  title: string;
  artist: string;
  album: string;
  genre: string;
  /** Length in seconds */
  duration: number;
}

// Each track is the official audio ("Art Track") from the artist's YouTube Music "Topic" channel:
// the song itself over its album cover. YouTube's embedded player plays full songs for everyone
// and handles licensing. Find IDs by searching music.youtube.com → Songs → Share.
export const tracks: Track[] = [
  { youtubeId: '-SttFgyRNCI', title: 'Symphony (feat. Zara Larsson)', artist: 'Clean Bandit', album: 'What Is Love? (Deluxe Edition)', genre: 'Dance', duration: 213 },
  { youtubeId: 'Lur-rvf6A1c', title: 'Clarity (feat. Foxes)', artist: 'Zedd', album: 'Clarity', genre: 'Dance', duration: 272 },
  { youtubeId: 'Q2-TlwRRppE', title: 'Sweet Nothing (feat. Florence Welch)', artist: 'Calvin Harris', album: '18 Months', genre: 'Dance', duration: 213 },
  { youtubeId: 't0yemidZdjg', title: 'The Edge of Glory', artist: 'Lady Gaga', album: 'Born This Way (Special Edition)', genre: 'Pop', duration: 321 },
  { youtubeId: 'spKRdILp-sE', title: 'Primadonna', artist: 'MARINA', album: 'Electra Heart', genre: 'Pop', duration: 222 },
  { youtubeId: 'y0VAozNZN3Q', title: 'Heroes (we could be) (feat. Tove Lo)', artist: 'Alesso', album: 'Forever', genre: 'Dance', duration: 211 },
  { youtubeId: 'rccXm7qcXEs', title: 'Teenage Dream', artist: 'Katy Perry', album: 'Teenage Dream', genre: 'Pop', duration: 228 },
  { youtubeId: 'Gp-V1PqVQXs', title: 'Your Love Is My Drug', artist: 'Kesha', album: 'Animal (Expanded Edition)', genre: 'Pop', duration: 188 },
  { youtubeId: 'bNQ1DsUyf_w', title: 'Rather Be (feat. Jess Glynne)', artist: 'Clean Bandit', album: 'New Eyes', genre: 'Dance', duration: 228 },
  { youtubeId: 'ACNwMzZejQQ', title: "Just Dance (feat. Colby O'Donis)", artist: 'Lady Gaga', album: 'The Fame', genre: 'Pop', duration: 242 },
  { youtubeId: 't31xgKtLjwo', title: 'no tears left to cry', artist: 'Ariana Grande', album: 'Sweetener', genre: 'Pop', duration: 206 },
  { youtubeId: 'JHI7bkxOBEA', title: 'Anything Could Happen', artist: 'Ellie Goulding', album: 'Halcyon (Deluxe Version)', genre: 'Pop', duration: 287 },
  { youtubeId: 'BHTCCrGCeIY', title: 'Summerboy', artist: 'Lady Gaga', album: 'The Fame', genre: 'Pop', duration: 254 },
  { youtubeId: 'l5rJMWGTwVM', title: 'Call Me Maybe', artist: 'Carly Rae Jepsen', album: 'Kiss', genre: 'Pop', duration: 194 },
  { youtubeId: 'e3atZ1OXfHU', title: 'I Need Your Love (feat. Ellie Goulding)', artist: 'Calvin Harris', album: 'Halcyon Nights', genre: 'Dance', duration: 236 },
  { youtubeId: 'I81ahmnaXBA', title: 'Prime', artist: 'Allie X', album: 'Common Culture', genre: 'Pop', duration: 254 },
  { youtubeId: '3y1mgC8ndHM', title: 'Radioactive', artist: 'MARINA', album: 'Electra Heart', genre: 'Pop', duration: 227 },
  { youtubeId: 'qw8LODwSh30', title: 'Walking On Air', artist: 'Katy Perry', album: 'PRISM (Deluxe)', genre: 'Dance', duration: 223 },
  { youtubeId: 'UUpuyzPJeWA', title: 'We Found Love (feat. Calvin Harris)', artist: 'Rihanna', album: 'Talk That Talk', genre: 'Dance', duration: 216 },
  { youtubeId: 'wYx18ngL_Ss', title: 'Applause', artist: 'Lady Gaga', album: 'Applause', genre: 'Pop', duration: 213 },
  { youtubeId: 'kXTLR1sYUIo', title: 'Run Away With Me', artist: 'Carly Rae Jepsen', album: 'E·mo·tion (Deluxe Expanded Edition)', genre: 'Pop', duration: 252 },
];

/** Album cover from the video thumbnail. Art Tracks centre a square cover in a 16:9 frame;
 *  `.cover` crops it back out with `background-size: 177.78% auto`. */
export const coverUrl = (t: Track) => `https://i.ytimg.com/vi/${t.youtubeId}/hqdefault.jpg`;
