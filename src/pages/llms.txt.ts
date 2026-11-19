import type { APIRoute } from 'astro';
import { llmsTxt } from '@/lib/llms';

/** A Markdown summary of Dylan and every page on the site, for AI tools (see src/lib/llms.ts). */
export const GET: APIRoute = async ({ site }) =>
  new Response(await llmsTxt(site!), { headers: { 'Content-Type': 'text/markdown; charset=utf-8' } });
