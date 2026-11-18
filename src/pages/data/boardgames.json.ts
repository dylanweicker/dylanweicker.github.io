import type { APIRoute } from 'astro';
import { getBoardGames } from '@/lib/bgg';

// Published at build time as /data/boardgames.json; the Board Games section fetches it on demand.
export const GET: APIRoute = async () =>
  new Response(JSON.stringify(await getBoardGames()), { headers: { 'Content-Type': 'application/json' } });
