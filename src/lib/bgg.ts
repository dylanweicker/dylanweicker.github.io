// Dylan's BoardGameGeek collection, resolved once at build time and baked into the page, so visitors
// never call BGG.
//
//  1. Live: BGG's XML API needs an approved application token (boardgamegeek.com/using_the_xml_api).
//     With BGG_TOKEN set (a GitHub Actions secret), every build fetches the current collection.
//  2. Snapshot: otherwise src/data/boardgames.json is used. Refresh it with
//     `python scripts/import-gameshelf.py` (full details and box art) or, from a BGG CSV export,
//     `python scripts/import-bgg-csv.py path/to/collection.csv` (names and numbers only).
// The result is published as /data/boardgames.json (src/pages/data/boardgames.json.ts) and loaded by
// the Board Games section only when it's opened, so it doesn't weigh down every page.
// With neither, the section shows an "under construction" sign.

import snapshot from '@/data/boardgames.json';

export interface BoardGame {
  id: string;
  name: string;
  year?: number | null;
  thumbnail?: string | null;
  image?: string | null;
  expansion?: boolean;
  minPlayers?: number | null;
  maxPlayers?: number | null;
  bestPlayers?: string[];
  minTime?: number | null;
  maxTime?: number | null;
  minAge?: number | null;
  /** BGG average rating, out of 10 */
  rating?: number | null;
  /** BGG complexity, 1 (light) to 5 (heavy) */
  weight?: number | null;
  plays?: number;
  designers?: string[];
  mechanics?: string[];
  categories?: string[];
}

export interface BoardGameCollection {
  username: string;
  games: BoardGame[];
}

const API = 'https://boardgamegeek.com/xmlapi2/collection';
const RETRIES = 6;

const decode = (s: string) =>
  s
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&');

const tag = (xml: string, name: string) => xml.match(new RegExp(`<${name}[^>]*>([\\s\\S]*?)</${name}>`))?.[1]?.trim();

const byName = (a: BoardGame, b: BoardGame) => a.name.localeCompare(b.name, undefined, { sensitivity: 'base' });

function parse(xml: string): BoardGame[] {
  const games: BoardGame[] = [];
  for (const m of xml.matchAll(/<item\b[^>]*objectid="(\d+)"[^>]*>([\s\S]*?)<\/item>/g)) {
    const [, id, body] = m;
    const name = tag(body, 'name');
    if (!name) continue;
    const thumb = tag(body, 'thumbnail');
    const year = tag(body, 'yearpublished');
    games.push({
      id,
      name: decode(name),
      year: year ? Number(year) : null,
      thumbnail: thumb ? (thumb.startsWith('//') ? `https:${thumb}` : thumb) : null,
      plays: Number(tag(body, 'numplays') ?? 0),
    });
  }
  return games.sort(byName);
}

async function fetchLive(username: string, token: string): Promise<BoardGame[] | null> {
  const url = `${API}?username=${encodeURIComponent(username)}&own=1&excludesubtype=boardgameexpansion`;
  for (let attempt = 0; attempt < RETRIES; attempt++) {
    const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
    // BGG queues collection requests and answers 202 until the export is ready.
    if (res.status === 202) {
      await new Promise((r) => setTimeout(r, 2500 * (attempt + 1)));
      continue;
    }
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const xml = await res.text();
    if (xml.includes('<errors>')) throw new Error(tag(xml, 'message') ?? 'BGG error');
    return parse(xml);
  }
  throw new Error('collection still queued after retries');
}

// Build-time environment (CI secrets aren't always exposed through import.meta.env).
const env = (globalThis as { process?: { env: Record<string, string | undefined> } }).process?.env ?? {};

let cached: Promise<BoardGameCollection | null> | null = null;

/** Owned base games (no expansions), sorted by name; null when there's nothing to show. */
export function getBoardGames(): Promise<BoardGameCollection | null> {
  cached ??= (async () => {
    const username = import.meta.env.BGG_USERNAME ?? env.BGG_USERNAME ?? snapshot.username;
    const token = import.meta.env.BGG_TOKEN ?? env.BGG_TOKEN;
    if (token) {
      try {
        const games = await fetchLive(username, token);
        if (games?.length) return { username, games };
      } catch (err) {
        console.warn(`[bgg] live fetch failed, using snapshot: ${(err as Error).message}`);
      }
    }
    const games = [...(snapshot.games as BoardGame[])].sort(byName);
    return games.length ? { username: snapshot.username, games } : null;
  })();
  return cached;
}
