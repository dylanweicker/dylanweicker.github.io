import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent as ReactKeyboardEvent,
  type PointerEvent as ReactPointerEvent,
} from 'react';
import { appsById } from '@/data/apps';
import { appHref } from '@/lib/links';
import {
  boundsOf,
  CELL_H,
  CELL_W,
  hasSavedDesktop,
  PAD,
  useDesktop,
  type DeskItem,
} from '@/stores/desktop';
import { useWindows } from '@/stores/windows';
import { ContextMenu, type MenuItem } from './ContextMenu';

type Menu =
  | { kind: 'icon'; x: number; y: number; id: string }
  | { kind: 'desktop'; x: number; y: number; cell: { col: number; row: number } };

interface Rect {
  x: number;
  y: number;
  w: number;
  h: number;
}

const DRAG_THRESHOLD = 5;

/** On phones the desktop is a fixed launcher grid: tap to open, no dragging or menus. */
const isPhone = () => window.matchMedia('(max-width: 767px)').matches;

async function toggleFullscreen() {
  try {
    if (document.fullscreenElement) await document.exitFullscreen();
    else await document.documentElement.requestFullscreen();
  } catch {
    // Not allowed (e.g. inside an iframe); nothing to do.
  }
}

export function DesktopIcons() {
  const items = useDesktop((s) => s.items);
  const selected = useDesktop((s) => s.selected);
  const clipboard = useDesktop((s) => s.clipboard);
  const openApp = useWindows((s) => s.open);
  const minimizeAll = useWindows((s) => s.minimizeAll);

  const layerRef = useRef<HTMLUListElement>(null);
  const lastPointer = useRef('mouse');
  const menuReturnFocus = useRef<HTMLElement | null>(null);
  const [drag, setDrag] = useState<{ ids: string[]; dx: number; dy: number } | null>(null);
  const [marquee, setMarquee] = useState<Rect | null>(null);
  const [menu, setMenu] = useState<Menu | null>(null);

  const bounds = () => boundsOf(layerRef.current);
  const open = (item: DeskItem) => openApp(item.app);

  // Saved layouts load after hydration (so the server HTML matches); a first visit is arranged to fit the screen.
  useEffect(() => {
    const saved = hasSavedDesktop();
    void Promise.resolve(useDesktop.persist.rehydrate()).then(() => {
      if (!saved) useDesktop.getState().arrange(boundsOf(layerRef.current));
    });
  }, []);

  // Drag-select rectangle and the desktop right-click menu both start on the wallpaper.
  useEffect(() => {
    const onPointerDown = (e: PointerEvent) => {
      const t = e.target as HTMLElement;
      if (e.button !== 0 || !t.closest('.wallpaper') || t.closest('button') || isPhone()) return;
      const layer = layerRef.current;
      if (!layer) return;
      e.preventDefault();
      (document.activeElement as HTMLElement | null)?.blur?.();
      const origin = layer.getBoundingClientRect();
      const sx = e.clientX - origin.left;
      const sy = e.clientY - origin.top;
      const store = useDesktop.getState();
      const additive = e.ctrlKey || e.metaKey || e.shiftKey;
      const base = additive ? store.selected : [];
      if (!additive) store.select([]);
      const boxes = Array.from(layer.querySelectorAll<HTMLElement>('[data-desk-id]')).map((el) => {
        const b = el.getBoundingClientRect();
        return { id: el.dataset.deskId!, l: b.left - origin.left, t: b.top - origin.top, r: b.right - origin.left, b: b.bottom - origin.top };
      });
      let active = false;

      const move = (ev: PointerEvent) => {
        const x = ev.clientX - origin.left;
        const y = ev.clientY - origin.top;
        if (!active && Math.hypot(x - sx, y - sy) < DRAG_THRESHOLD) return;
        active = true;
        const box = { x: Math.min(sx, x), y: Math.min(sy, y), w: Math.abs(x - sx), h: Math.abs(y - sy) };
        setMarquee(box);
        const hit = boxes
          .filter((b) => b.l < box.x + box.w && b.r > box.x && b.t < box.y + box.h && b.b > box.y)
          .map((b) => b.id);
        useDesktop.getState().select([...new Set([...base, ...hit])]);
      };
      const up = () => {
        window.removeEventListener('pointermove', move);
        window.removeEventListener('pointerup', up);
        window.removeEventListener('pointercancel', up);
        setMarquee(null);
      };
      window.addEventListener('pointermove', move);
      window.addEventListener('pointerup', up);
      window.addEventListener('pointercancel', up);
    };

    const onContextMenu = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (!t.closest('.wallpaper') || isPhone()) return;
      const layer = layerRef.current;
      if (!layer) return;
      e.preventDefault();
      const origin = layer.getBoundingClientRect();
      const b = boundsOf(layer);
      const cell = {
        col: Math.min(b.cols - 1, Math.max(0, Math.floor((e.clientX - origin.left - PAD) / CELL_W))),
        row: Math.min(b.rows - 1, Math.max(0, Math.floor((e.clientY - origin.top - PAD) / CELL_H))),
      };
      useDesktop.getState().select([]);
      menuReturnFocus.current = null;
      setMenu({ kind: 'desktop', x: e.clientX, y: e.clientY, cell });
    };

    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('contextmenu', onContextMenu);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('contextmenu', onContextMenu);
    };
  }, []);

  /** Mouse: click selects, drag moves the selection. Ctrl toggles, Shift adds. */
  const onIconPointerDown = (e: ReactPointerEvent<HTMLAnchorElement>, item: DeskItem) => {
    lastPointer.current = e.pointerType;
    if (e.button !== 0 || e.pointerType === 'touch' || isPhone()) return;
    const store = useDesktop.getState();
    if (e.ctrlKey || e.metaKey) {
      store.toggle(item.id);
      return;
    }
    const wasSelected = store.selected.includes(item.id);
    if (e.shiftKey) store.select([...new Set([...store.selected, item.id])]);
    else if (!wasSelected) store.select([item.id]);

    const ids = useDesktop.getState().selected;
    const movable = useDesktop.getState().items.filter((it) => ids.includes(it.id) && !it.locked).map((it) => it.id);
    const target = e.currentTarget;
    target.setPointerCapture(e.pointerId);
    const { clientX: sx, clientY: sy } = e;
    let dx = 0;
    let dy = 0;
    let dragging = false;

    const move = (ev: PointerEvent) => {
      dx = ev.clientX - sx;
      dy = ev.clientY - sy;
      if (!dragging && Math.hypot(dx, dy) < DRAG_THRESHOLD) return;
      dragging = true;
      if (movable.length) setDrag({ ids: movable, dx, dy });
    };
    const up = () => {
      target.removeEventListener('pointermove', move);
      target.removeEventListener('pointerup', up);
      target.removeEventListener('pointercancel', up);
      if (dragging && movable.length) {
        useDesktop.getState().drop(movable, Math.round(dx / CELL_W), Math.round(dy / CELL_H), bounds());
      } else if (!dragging && wasSelected && !e.shiftKey) {
        useDesktop.getState().select([item.id]);
      }
      setDrag(null);
    };
    target.addEventListener('pointermove', move);
    target.addEventListener('pointerup', up);
    target.addEventListener('pointercancel', up);
  };

  const showIconMenu = (item: DeskItem, x: number, y: number, el: HTMLElement) => {
    const store = useDesktop.getState();
    if (!store.selected.includes(item.id)) store.select([item.id]);
    menuReturnFocus.current = el;
    setMenu({ kind: 'icon', x, y, id: item.id });
  };

  const onIconKeyDown = (e: ReactKeyboardEvent<HTMLAnchorElement>, item: DeskItem) => {
    const store = useDesktop.getState();
    const targets = store.selected.includes(item.id) ? store.selected : [item.id];
    const mod = e.ctrlKey || e.metaKey;
    if (e.key === 'Enter') {
      e.preventDefault();
      open(item);
    } else if (e.key === ' ') {
      e.preventDefault();
      if (mod) store.toggle(item.id);
      else store.select([item.id]);
    } else if (e.key === 'Delete') {
      e.preventDefault();
      store.remove(targets);
    } else if (mod && e.key.toLowerCase() === 'c') {
      e.preventDefault();
      store.copy(targets);
    } else if (mod && e.key.toLowerCase() === 'v') {
      e.preventDefault();
      store.paste(bounds());
    } else if (mod && e.key.toLowerCase() === 'a') {
      e.preventDefault();
      store.select(store.items.map((it) => it.id));
    } else if (e.key === 'ContextMenu' || (e.shiftKey && e.key === 'F10')) {
      e.preventDefault();
      const r = e.currentTarget.getBoundingClientRect();
      showIconMenu(item, r.left + r.width / 2, r.top + r.height / 2, e.currentTarget);
    }
  };

  const closeMenu = useCallback((restoreFocus?: boolean) => {
    setMenu(null);
    if (restoreFocus) menuReturnFocus.current?.focus();
  }, []);

  const menuItems = (m: Menu): MenuItem[] => {
    const store = useDesktop.getState();
    if (m.kind === 'icon') {
      const item = store.items.find((it) => it.id === m.id);
      if (!item) return [];
      const ids = store.selected.includes(item.id) ? store.selected : [item.id];
      const targets = store.items.filter((it) => ids.includes(it.id));
      return [
        { label: 'Open', primary: true, onSelect: () => targets.forEach(open) },
        { separator: true },
        { label: 'Copy', shortcut: 'Ctrl+C', onSelect: () => store.copy(ids) },
        {
          label: 'Delete',
          shortcut: 'Del',
          disabled: !targets.some((t) => t.copy),
          onSelect: () => store.remove(ids),
        },
        { separator: true },
        { label: 'Lock position', checked: item.locked, onSelect: () => store.toggleLock(item.id) },
      ];
    }
    return [
      {
        label: 'Paste',
        shortcut: 'Ctrl+V',
        disabled: !clipboard.length,
        onSelect: () => store.paste(bounds(), m.cell),
      },
      { separator: true },
      { label: 'Arrange icons', onSelect: () => store.arrange(bounds()) },
      { label: 'Sort by name', onSelect: () => store.arrange(bounds(), 'name') },
      { label: 'Reset desktop', onSelect: () => store.reset(bounds()) },
      { separator: true },
      { label: 'Show desktop', onSelect: minimizeAll },
      { label: 'Refresh', shortcut: 'F5', onSelect: () => window.location.reload() },
      { label: 'Full screen', checked: Boolean(document.fullscreenElement), onSelect: () => void toggleFullscreen() },
    ];
  };

  return (
    <>
      <p id="desk-help" className="sr-only">
        Double-click or press Enter to open. Right-click or press Shift+F10 for options.
      </p>
      <ul
        ref={layerRef}
        className="icon-grid"
        role="listbox"
        aria-multiselectable="true"
        aria-label="Desktop"
        aria-describedby="desk-help"
      >
        {items.map((item) => {
          const isSelected = selected.includes(item.id);
          const isDragging = drag?.ids.includes(item.id) ?? false;
          const style = {
            '--col': item.col,
            '--row': item.row,
            transform: isDragging ? `translate(${drag!.dx}px, ${drag!.dy}px)` : undefined,
          } as CSSProperties;
          return (
            <li key={item.id} role="none" className="desk-item" style={style}>
              {/* A link so crawlers can reach each app's page; clicks are handled here, never navigated. */}
              <a
                href={appHref(item.app)}
                draggable={false}
                role="option"
                aria-selected={isSelected}
                data-desk-id={item.id}
                className={`desk-icon${isSelected ? ' is-selected' : ''}${isDragging ? ' is-dragging' : ''}`}
                onPointerDown={(e) => onIconPointerDown(e, item)}
                onClick={(e) => {
                  // Touch and phones open on tap; mice open on double-click; keyboard is handled in onKeyDown.
                  e.preventDefault();
                  if (e.detail === 0) return;
                  if (lastPointer.current === 'touch' || isPhone()) open(item);
                }}
                onDoubleClick={() => open(item)}
                onKeyDown={(e) => onIconKeyDown(e, item)}
                onFocus={() => {
                  if (!useDesktop.getState().selected.includes(item.id)) useDesktop.getState().select([item.id]);
                }}
                onContextMenu={(e) => {
                  if (isPhone()) return;
                  e.preventDefault();
                  showIconMenu(item, e.clientX, e.clientY, e.currentTarget);
                }}
              >
                <img src={appsById[item.app].icon} alt="" width={52} height={52} draggable={false} />
                {item.locked && (
                  <span className="desk-icon__lock" aria-label="locked">
                    🔒
                  </span>
                )}
                <span className="desk-icon__label">{item.name}</span>
              </a>
            </li>
          );
        })}
      </ul>
      {marquee && (
        <div
          className="marquee"
          style={{ left: marquee.x, top: marquee.y, width: marquee.w, height: marquee.h }}
          aria-hidden="true"
        />
      )}
      {menu && (
        <ContextMenu
          x={menu.x}
          y={menu.y}
          label={menu.kind === 'icon' ? 'Icon options' : 'Desktop options'}
          items={menuItems(menu)}
          onClose={closeMenu}
        />
      )}
    </>
  );
}
