import { createContext, useContext } from 'react';
import type { AppId } from '@/data/apps';
import type { Photo } from '@/data/homepage';

export const HOME = 'home';

/** What the site's pages can do: navigate within the site, open DylanOS apps, show photos large. */
export interface SiteNav {
  page: string;
  go: (page: string, section?: string | null) => void;
  openApp: (app: AppId) => void;
  showPhotos: (photos: Photo[], index: number) => void;
}

export const SiteContext = createContext<SiteNav | null>(null);

export function useSite(): SiteNav {
  const ctx = useContext(SiteContext);
  if (!ctx) throw new Error('useSite must be used inside the Interests site');
  return ctx;
}
