import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { apps, appsById, type AppId } from '@/data/apps';

/** Desktop icon grid (DESIGN.md §4.2): icons snap to cells so they never overlap. */
export const CELL_W = 96;
export const CELL_H = 104;
export const PAD = 12;
const DEFAULT_ROWS = 7;
const STORAGE_KEY = 'dylanos-desktop';

export interface DeskItem {
  id: string;
  app: AppId;
  name: string;
  col: number;
  row: number;
  locked: boolean;
  /** Copies can be deleted; originals can't. */
  copy: boolean;
}

export interface Bounds {
  cols: number;
  rows: number;
}

interface Clip {
  app: AppId;
  name: string;
}

interface DesktopState {
  items: DeskItem[];
  selected: string[];
  clipboard: Clip[];
  select: (ids: string[]) => void;
  toggle: (id: string) => void;
  drop: (ids: string[], dCol: number, dRow: number, bounds: Bounds) => void;
  copy: (ids: string[]) => void;
  paste: (bounds: Bounds, at?: { col: number; row: number }) => void;
  remove: (ids: string[]) => void;
  toggleLock: (id: string) => void;
  arrange: (bounds: Bounds, by?: 'default' | 'name') => void;
  reset: (bounds: Bounds) => void;
}

const key = (col: number, row: number) => `${col}:${row}`;
const clamp = (n: number, lo: number, hi: number) => Math.min(Math.max(n, lo), hi);

/** Nearest unoccupied cell to `target` (column-major scan outward), or the target if the grid is full. */
function nearestFree(target: { col: number; row: number }, taken: Set<string>, b: Bounds) {
  let best: { col: number; row: number } | null = null;
  let bestDist = Infinity;
  for (let col = 0; col < b.cols; col++) {
    for (let row = 0; row < b.rows; row++) {
      if (taken.has(key(col, row))) continue;
      const d = (col - target.col) ** 2 + (row - target.row) ** 2;
      if (d < bestDist) {
        bestDist = d;
        best = { col, row };
      }
    }
  }
  return best ?? target;
}

/** Lay items out top-to-bottom, left-to-right. */
function layout(items: DeskItem[], rows: number): DeskItem[] {
  return items.map((it, i) => ({ ...it, col: Math.floor(i / rows), row: i % rows }));
}

const originals = (): DeskItem[] =>
  apps.filter((a) => !a.hidden).map((a) => ({ id: a.id, app: a.id, name: a.label ?? a.title, col: 0, row: 0, locked: false, copy: false }));

export const defaultItems = (rows = DEFAULT_ROWS) => layout(originals(), rows);

/** "My Work (3)" → "My Work" */
const baseName = (name: string) => name.replace(/ \(\d+\)$/, '');

function copyName(base: string, existing: DeskItem[]) {
  let n = 1;
  for (const it of existing) {
    const m = it.name.match(/^(.*) \((\d+)\)$/);
    if (m && m[1] === base) n = Math.max(n, Number(m[2]));
  }
  return `${base} (${n + 1})`;
}

const newId = (app: AppId) => `${app}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;

export const useDesktop = create<DesktopState>()(
  persist(
    (set, get) => ({
      items: defaultItems(),
      selected: [],
      clipboard: [],

      select: (ids) => set({ selected: ids }),
      toggle: (id) =>
        set((s) => ({ selected: s.selected.includes(id) ? s.selected.filter((x) => x !== id) : [...s.selected, id] })),

      drop: (ids, dCol, dRow, bounds) =>
        set((s) => {
          const moving = s.items.filter((it) => ids.includes(it.id) && !it.locked);
          const taken = new Set(s.items.filter((it) => !moving.includes(it)).map((it) => key(it.col, it.row)));
          const placed = new Map<string, { col: number; row: number }>();
          for (const it of moving) {
            const target = {
              col: clamp(it.col + dCol, 0, bounds.cols - 1),
              row: clamp(it.row + dRow, 0, bounds.rows - 1),
            };
            const cell = taken.has(key(target.col, target.row)) ? nearestFree(target, taken, bounds) : target;
            taken.add(key(cell.col, cell.row));
            placed.set(it.id, cell);
          }
          return { items: s.items.map((it) => (placed.has(it.id) ? { ...it, ...placed.get(it.id)! } : it)) };
        }),

      copy: (ids) =>
        set((s) => ({
          clipboard: s.items.filter((it) => ids.includes(it.id)).map((it) => ({ app: it.app, name: baseName(it.name) })),
        })),

      paste: (bounds, at) => {
        const { clipboard, items } = get();
        if (!clipboard.length) return;
        const taken = new Set(items.map((it) => key(it.col, it.row)));
        const created: DeskItem[] = [];
        let target = at ?? { col: 0, row: 0 };
        for (const clip of clipboard) {
          const cell = taken.has(key(target.col, target.row)) ? nearestFree(target, taken, bounds) : target;
          taken.add(key(cell.col, cell.row));
          const item: DeskItem = {
            id: newId(clip.app),
            app: clip.app,
            name: copyName(clip.name, [...items, ...created]),
            ...cell,
            locked: false,
            copy: true,
          };
          created.push(item);
          target = { col: cell.col, row: cell.row + 1 };
        }
        set({ items: [...items, ...created], selected: created.map((c) => c.id) });
      },

      remove: (ids) =>
        set((s) => {
          const gone = s.items.filter((it) => ids.includes(it.id) && it.copy);
          if (!gone.length) return {};
          return {
            items: s.items.filter((it) => !gone.includes(it)),
            selected: s.selected.filter((id) => !gone.some((g) => g.id === id)),
          };
        }),

      toggleLock: (id) =>
        set((s) => ({ items: s.items.map((it) => (it.id === id ? { ...it, locked: !it.locked } : it)) })),

      arrange: (bounds, by = 'default') =>
        set((s) => {
          const order = apps.map((a) => a.id);
          const sorted = [...s.items].sort((a, b) =>
            by === 'name'
              ? a.name.localeCompare(b.name)
              : order.indexOf(a.app) - order.indexOf(b.app) || Number(a.copy) - Number(b.copy) || a.name.localeCompare(b.name),
          );
          return { items: layout(sorted, bounds.rows) };
        }),

      reset: (bounds) => set({ items: defaultItems(bounds.rows), selected: [], clipboard: [] }),
    }),
    {
      name: STORAGE_KEY,
      version: 1,
      storage: createJSONStorage(() => localStorage),
      // Rehydrated manually after mount so server and first client render match.
      skipHydration: true,
      partialize: (s) => ({ items: s.items }),
      merge: (persisted, current) => {
        const p = (persisted ?? {}) as Partial<Pick<DesktopState, 'items'>>;
        const valid = (it: DeskItem) => it.app in appsById && !appsById[it.app].hidden;
        // Standard icons always take the app's current name; only copies keep a stored one.
        const items = (p.items ?? current.items)
          .filter(valid)
          .map((it) => (it.copy ? it : { ...it, name: appsById[it.app].label ?? appsById[it.app].title }));
        // Apps added since the visitor's last visit get a free cell.
        const taken = new Set(items.map((it) => key(it.col, it.row)));
        for (const orig of originals()) {
          if (items.some((it) => it.id === orig.id)) continue;
          const cell = nearestFree({ col: 0, row: 0 }, taken, { cols: 12, rows: DEFAULT_ROWS });
          taken.add(key(cell.col, cell.row));
          items.push({ ...orig, ...cell });
        }
        return { ...current, items };
      },
    },
  ),
);

export const hasSavedDesktop = () => {
  try {
    return localStorage.getItem(STORAGE_KEY) !== null;
  } catch {
    return false;
  }
};

/** How many grid cells fit in the desktop surface element. */
export function boundsOf(el: HTMLElement | null): Bounds {
  const w = el?.clientWidth ?? 1024;
  const h = el?.clientHeight ?? 720;
  return { cols: Math.max(1, Math.floor((w - PAD) / CELL_W)), rows: Math.max(1, Math.floor((h - PAD) / CELL_H)) };
}
