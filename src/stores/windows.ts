import { createContext, useContext } from 'react';
import { useStore } from 'zustand';
import { createStore, type StoreApi } from 'zustand/vanilla';
import { appsById, type AppId } from '@/data/apps';
import type { Route } from '@/lib/routes';

const CASCADE_STEPS = 6;

export interface Win {
  app: AppId;
  slug?: string;
  /** null = centred by CSS (SSR-safe until the user drags it) */
  x: number | null;
  y: number | null;
  w: number;
  h: number;
  z: number;
  cascade: number;
  minimized: boolean;
  maximized: boolean;
  /** True once the user has resized it, so an app that opens fitted to the screen keeps the new size */
  resized: boolean;
}

/** How the URL should react to the last state change. */
export type NavIntent = 'push' | 'replace' | 'none';

export interface WindowState {
  /** Open windows in taskbar order; stacking order is `z`. */
  wins: Win[];
  zTop: number;
  nav: NavIntent;
  open: (app: AppId, slug?: string) => void;
  close: (app: AppId) => void;
  focus: (app: AppId) => void;
  minimize: (app: AppId) => void;
  minimizeAll: () => void;
  toggleMaximize: (app: AppId) => void;
  /** Maximize or restore, moving the window's restored position in the same update (Aero Snap). */
  setMaximized: (app: AppId, maximized: boolean, at?: Partial<Pick<Win, 'x' | 'y'>>) => void;
  setRect: (app: AppId, rect: Partial<Pick<Win, 'x' | 'y' | 'w' | 'h'>>) => void;
  setSlug: (app: AppId, slug?: string) => void;
  /** Sync to a URL (back/forward) without pushing history. */
  navigate: (route: Route) => void;
}

const makeWin = (app: AppId, slug: string | undefined, z: number, cascade: number, maximized = false): Win => {
  const def = appsById[app];
  return { app, slug, x: null, y: null, w: def.width, h: def.height, z, cascade, minimized: false, maximized, resized: false };
};

const prefersMaximized = () => typeof window !== 'undefined' && window.innerWidth < 1024;

export const topWindow = (wins: Win[]): Win | undefined =>
  wins.filter((w) => !w.minimized).reduce<Win | undefined>((top, w) => (!top || w.z > top.z ? w : top), undefined);

export function createWindowStore(initial: Route | null) {
  return createStore<WindowState>()((set, get) => {
    const update = (app: AppId, patch: Partial<Win>, nav: NavIntent) =>
      set((s) => ({ wins: s.wins.map((w) => (w.app === app ? { ...w, ...patch } : w)), nav }));

    // One atomic set: URL sync reads `nav` on every change, so it must never see a stale intent.
    const raise = (app: AppId, patch: Partial<Win>, nav: NavIntent) =>
      set((s) => {
        const z = s.zTop + 1;
        return {
          zTop: z,
          wins: s.wins.map((w) => (w.app === app ? { ...w, ...patch, z, minimized: false } : w)),
          nav,
        };
      });

    const openWith = (app: AppId, slug: string | undefined, nav: NavIntent, keepSlug: boolean) => {
      const { wins, zTop } = get();
      if (wins.some((w) => w.app === app)) {
        raise(app, keepSlug && slug === undefined ? {} : { slug }, nav);
        return;
      }
      const z = zTop + 1;
      set({
        wins: [...wins, makeWin(app, slug, z, wins.length % CASCADE_STEPS, prefersMaximized())],
        zTop: z,
        nav,
      });
    };

    return {
      wins: initial ? [makeWin(initial.app, initial.slug, 1, 0)] : [],
      zTop: 1,
      nav: 'none',

      open: (app, slug) => openWith(app, slug, 'push', true),
      navigate: ({ app, slug }) => openWith(app, slug, 'none', false),

      close: (app) => set((s) => ({ wins: s.wins.filter((w) => w.app !== app), nav: 'replace' })),

      focus: (app) => {
        const top = topWindow(get().wins);
        if (top?.app === app) return;
        raise(app, {}, 'replace');
      },

      minimize: (app) => update(app, { minimized: true }, 'replace'),

      minimizeAll: () => set((s) => ({ wins: s.wins.map((w) => ({ ...w, minimized: true })), nav: 'replace' })),

      toggleMaximize: (app) => {
        const win = get().wins.find((w) => w.app === app);
        if (win) raise(app, { maximized: !win.maximized }, 'none');
      },

      setMaximized: (app, maximized, at = {}) => raise(app, { ...at, maximized }, 'none'),

      setRect: (app, rect) =>
        update(app, rect.w !== undefined || rect.h !== undefined ? { ...rect, resized: true } : rect, 'none'),

      setSlug: (app, slug) => raise(app, { slug }, 'push'),
    };
  });
}

export type WindowStore = StoreApi<WindowState>;

export const WindowStoreContext = createContext<WindowStore | null>(null);

export function useWindows<T>(selector: (s: WindowState) => T): T {
  const store = useContext(WindowStoreContext);
  if (!store) throw new Error('useWindows must be used inside <Desktop>');
  return useStore(store, selector);
}
