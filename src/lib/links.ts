import type { MouseEvent } from 'react';
import type { AppId } from '@/data/apps';
import { HOME, pathFor } from './routes';

/*
 * DylanOS opens things in windows, but its icons, tiles and menus are real <a href> links
 * so crawlers and AI readers can follow them to each window's pre-rendered page.
 */

/** The page for an app's window ("/" for the Welcome window, the home page). */
export const appHref = (app: AppId) => (app === HOME.app ? '/' : pathFor({ app }));

/**
 * For a link that opens inside DylanOS: true (and the browser's navigation cancelled) for a
 * plain left click. Ctrl/⌘/Shift/Alt clicks return false, so they keep their new-tab behaviour.
 */
export function inPlace(e: MouseEvent): boolean {
  if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return false;
  e.preventDefault();
  return true;
}
