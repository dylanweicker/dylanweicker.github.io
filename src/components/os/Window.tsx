import { useEffect, useRef, type CSSProperties, type PointerEvent as ReactPointerEvent, type ReactNode } from 'react';
import { appsById } from '@/data/apps';
import { useWindows, type Win } from '@/stores/windows';
import { isHydrated } from './hydration';

const CASCADE_PX = 28;
const MIN_W = 320;
const MIN_H = 220;
/** Aero Snap: releasing a drag with the pointer this close to the top edge maximizes the window. */
const SNAP_PX = 8;
/** A maximized window only comes loose once the pointer has moved this far. */
const UNSNAP_PX = 6;

/** Every side but the top (the title bar drags), plus the two bottom corners. */
const RESIZE_EDGES = ['w', 'e', 's', 'sw', 'se'] as const;
type ResizeEdge = (typeof RESIZE_EDGES)[number];

const clamp = (n: number, lo: number, hi: number) => Math.min(Math.max(n, lo), hi);
const isMobile = () => window.matchMedia('(max-width: 767px)').matches;

interface Props {
  win: Win;
  focused: boolean;
  children: ReactNode;
}

/** Tracks a pointer drag on `target`, calling `onMove` with the delta and `onEnd` once released. */
function trackPointer(
  e: ReactPointerEvent<HTMLElement>,
  onMove: (dx: number, dy: number) => void,
  onEnd: () => void,
) {
  const target = e.currentTarget;
  const { clientX: sx, clientY: sy, pointerId } = e;
  target.setPointerCapture(pointerId);
  const move = (ev: PointerEvent) => onMove(ev.clientX - sx, ev.clientY - sy);
  const up = () => {
    target.removeEventListener('pointermove', move);
    target.removeEventListener('pointerup', up);
    target.removeEventListener('pointercancel', up);
    onEnd();
  };
  target.addEventListener('pointermove', move);
  target.addEventListener('pointerup', up);
  target.addEventListener('pointercancel', up);
}

export function Window({ win, focused, children }: Props) {
  const def = appsById[win.app];
  const focus = useWindows((s) => s.focus);
  const close = useWindows((s) => s.close);
  const minimize = useWindows((s) => s.minimize);
  const toggleMaximize = useWindows((s) => s.toggleMaximize);
  const setMaximized = useWindows((s) => s.setMaximized);
  const setRect = useWindows((s) => s.setRect);
  const ref = useRef<HTMLElement>(null);
  const titleId = `win-title-${win.app}`;

  // Move keyboard focus into windows opened after page load (not the one rendered on arrival).
  const shouldAutoFocus = useRef(isHydrated());
  useEffect(() => {
    if (!focused || !shouldAutoFocus.current) {
      shouldAutoFocus.current = true;
      return;
    }
    if (ref.current && !ref.current.contains(document.activeElement)) ref.current.focus({ preventScroll: true });
  }, [focused, win.minimized]);

  /**
   * Drag by the title bar, Windows 7 style: dragging to the top edge shows a glass preview and
   * maximizes on release; dragging a maximized window restores it under the pointer.
   */
  const startDrag = (e: ReactPointerEvent<HTMLElement>) => {
    if (e.button !== 0 || (e.target as HTMLElement).closest('button')) return;
    const el = ref.current;
    if (!el || isMobile()) return;
    const parent = el.offsetParent as HTMLElement;
    const box = parent.getBoundingClientRect();
    const grabX = e.clientX - box.left;
    const grabY = e.clientY - box.top;
    let maximized = win.maximized;
    let ox = el.offsetLeft;
    let oy = el.offsetTop;
    let x = ox;
    let y = oy;
    /** Where Restore should put the window if this drag ends in a snap */
    const home = { x: ox, y: oy };
    let moved = false;
    let preview: HTMLDivElement | null = null;

    const showPreview = (on: boolean) => {
      if (on && !preview) {
        preview = document.createElement('div');
        preview.className = 'snap-preview';
        preview.style.zIndex = getComputedStyle(el).zIndex; // same layer, placed just below the window
        parent.insertBefore(preview, el);
      } else if (!on && preview) {
        preview.remove();
        preview = null;
      }
    };

    trackPointer(
      e,
      (dx, dy) => {
        if (maximized) {
          if (Math.hypot(dx, dy) < UNSNAP_PX) return;
          // Come loose at the restored size, keeping the same point of the title bar under the pointer.
          const fit = !win.resized ? def.fit : undefined;
          const w = Math.min(fit ? parent.clientHeight * fit.height * fit.aspect : win.w, parent.clientWidth - 16);
          const left = clamp(grabX + dx - (grabX / el.offsetWidth) * w, 0, parent.clientWidth - w);
          const top = Math.max(0, dy);
          maximized = false;
          setMaximized(win.app, false, { x: left, y: top });
          home.x = left;
          home.y = top;
          ox = left - dx;
          oy = top - dy;
        }
        moved = true;
        x = clamp(ox + dx, 100 - el.offsetWidth, parent.clientWidth - 100);
        y = clamp(oy + dy, 0, parent.clientHeight - 34);
        el.style.left = `${x}px`;
        el.style.top = `${y}px`;
        showPreview(grabY + dy <= SNAP_PX);
      },
      () => {
        if (preview) {
          showPreview(false);
          // Restore later puts the window back where this drag started.
          el.style.left = `${home.x}px`;
          el.style.top = `${home.y}px`;
          setMaximized(win.app, true, home);
        } else if (moved) {
          setRect(win.app, { x, y });
        }
      },
    );
  };

  /** Resize from an edge or bottom corner: `w`/`e` move the left/right edge, `s` the bottom. */
  const startResize = (e: ReactPointerEvent<HTMLElement>, edges: ResizeEdge) => {
    const el = ref.current;
    if (!el || e.button !== 0) return;
    e.stopPropagation();
    const parent = el.offsetParent as HTMLElement;
    const ox = el.offsetLeft;
    const oy = el.offsetTop;
    const ow = el.offsetWidth;
    const oh = el.offsetHeight;
    let x = ox;
    let w = ow;
    let h = oh;
    el.style.left = `${ox}px`;
    el.style.top = `${oy}px`;
    trackPointer(
      e,
      (dx, dy) => {
        if (edges.includes('e')) w = clamp(ow + dx, MIN_W, parent.clientWidth - ox);
        if (edges.includes('w')) {
          x = clamp(ox + dx, 0, ox + ow - MIN_W);
          w = ow + ox - x;
        }
        if (edges.includes('s')) h = clamp(oh + dy, MIN_H, parent.clientHeight - oy);
        el.style.left = `${x}px`;
        el.style.width = `${w}px`;
        el.style.height = `${h}px`;
      },
      () => setRect(win.app, { x, y: oy, w, h }),
    );
  };

  // Apps with `fit` open sized to the screen (in CSS, so the server render matches) until resized.
  // They nearly fill the desktop, so they're centred rather than cascaded.
  const fit = !win.resized ? def.fit : undefined;
  const offset = fit ? 0 : win.cascade * CASCADE_PX;
  const fitHeight = fit && `(100vh - var(--taskbar-h)) * ${fit.height}`;
  const width = fit ? `min(${fitHeight} * ${fit.aspect}, 100% - 16px)` : `min(${win.w}px, 100% - 16px)`;
  const height = fit ? `calc(${fitHeight})` : `min(${win.h}px, 100% - 16px)`;
  const style = {
    '--z': win.z,
    width,
    height,
    left: win.x ?? `max(8px, calc((100% - ${width}) / 2 + ${offset}px))`,
    top: win.y ?? `max(8px, calc((100% - ${height}) / 2 - 12px + ${offset}px))`,
  } as CSSProperties;

  const classes = ['win', focused && 'is-focused', win.maximized && 'is-maximized'].filter(Boolean).join(' ');

  return (
    <section
      ref={ref}
      className={classes}
      style={style}
      hidden={win.minimized}
      role="dialog"
      aria-labelledby={titleId}
      tabIndex={-1}
      onPointerDownCapture={() => focus(win.app)}
      onFocusCapture={() => focus(win.app)}
    >
      <header
        className="win__titlebar"
        onPointerDown={startDrag}
        onDoubleClick={(e) => {
          if (!(e.target as HTMLElement).closest('button') && !isMobile()) toggleMaximize(win.app);
        }}
      >
        <button type="button" className="win__back" aria-label={`Close ${def.title}`} onClick={() => close(win.app)}>
          ‹
        </button>
        <img className="win__icon" src={def.icon} alt="" width={18} height={18} />
        <h2 id={titleId} className="win__title">
          {def.title}
        </h2>
        <div className="win__controls">
          <button type="button" className="win__btn" aria-label="Minimize" onClick={() => minimize(win.app)}>
            <svg viewBox="0 0 10 10" aria-hidden="true">
              <rect x="1" y="7" width="8" height="2" fill="currentColor" />
            </svg>
          </button>
          <button
            type="button"
            className="win__btn"
            aria-label={win.maximized ? 'Restore' : 'Maximize'}
            onClick={() => toggleMaximize(win.app)}
          >
            <svg viewBox="0 0 10 10" aria-hidden="true">
              {win.maximized ? (
                <path d="M3 1h6v6H7V3H3zM1 3h6v6H1z" fill="none" stroke="currentColor" strokeWidth="1.5" />
              ) : (
                <rect x="1" y="1" width="8" height="8" fill="none" stroke="currentColor" strokeWidth="2" />
              )}
            </svg>
          </button>
          <button
            type="button"
            className="win__btn win__btn--close"
            aria-label={`Close ${def.title}`}
            onClick={() => close(win.app)}
          >
            <svg viewBox="0 0 10 10" aria-hidden="true">
              <path d="M1.5 1.5l7 7m0-7l-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </header>
      <div className="win__body">{children}</div>
      {RESIZE_EDGES.map((edges) => (
        <div
          key={edges}
          className={`win__resize win__resize--${edges}`}
          aria-hidden="true"
          onPointerDown={(e) => startResize(e, edges)}
        />
      ))}
    </section>
  );
}
