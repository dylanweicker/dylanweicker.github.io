import type { APIRoute } from 'astro';
import { llmsFullTxt } from '@/lib/llms';

/** The whole site's text as one Markdown file, for AI tools (see src/lib/llms.ts). */
export const GET: APIRoute = async ({ site }) =>
  new Response(await llmsFullTxt(site!), { headers: { 'Content-Type': 'text/markdown; charset=utf-8' } });
