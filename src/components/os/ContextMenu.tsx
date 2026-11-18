import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

export type MenuItem =
  | { separator: true }
  | {
      separator?: false;
      label: string;
      onSelect: () => void;
      disabled?: boolean;
      /** Renders as a checkable item with a ✓ */
      checked?: boolean;
      /** The default action, shown in bold (Open) */
      primary?: boolean;
      shortcut?: string;
    };

interface Props {
  x: number;
  y: number;
  items: MenuItem[];
  label: string;
  onClose: (restoreFocus?: boolean) => void;
}

const enabledItems = (root: HTMLElement | null) =>
  Array.from(root?.querySelectorAll<HTMLButtonElement>('[role^="menuitem"]:not(:disabled)') ?? []);

export function ContextMenu({ x, y, items, label, onClose }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ left: x, top: y });

  // Keep the menu on screen, flipping left/up near the edges like a real OS menu.
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const { offsetWidth: w, offsetHeight: h } = el;
    const left = x + w > window.innerWidth - 4 ? Math.max(4, x - w) : x;
    const top = y + h > window.innerHeight - 4 ? Math.max(4, y - h) : y;
    setPos({ left, top });
  }, [x, y]);

  useEffect(() => {
    enabledItems(ref.current)[0]?.focus();
    const onPointerDown = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) onClose(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        e.stopPropagation();
        onClose(true);
      } else if (e.key === 'Tab') {
        e.preventDefault();
        onClose(true);
      } else if (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'Home' || e.key === 'End') {
        e.preventDefault();
        const list = enabledItems(ref.current);
        const i = list.indexOf(document.activeElement as HTMLButtonElement);
        const next =
          e.key === 'Home' ? 0
          : e.key === 'End' ? list.length - 1
          : e.key === 'ArrowDown' ? (i + 1) % list.length
          : (i - 1 + list.length) % list.length;
        list[next]?.focus();
      }
    };
    const close = () => onClose(false);
    document.addEventListener('pointerdown', onPointerDown, true);
    document.addEventListener('keydown', onKey, true);
    window.addEventListener('resize', close);
    window.addEventListener('blur', close);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown, true);
      document.removeEventListener('keydown', onKey, true);
      window.removeEventListener('resize', close);
      window.removeEventListener('blur', close);
    };
  }, [onClose]);

  return createPortal(
    <div
      ref={ref}
      className="ctx-menu"
      role="menu"
      aria-label={label}
      style={pos}
      onContextMenu={(e) => e.preventDefault()}
    >
      {items.map((item, i) =>
        item.separator ? (
          <div key={i} className="ctx-menu__sep" role="separator" />
        ) : (
          <button
            key={item.label}
            type="button"
            role={item.checked === undefined ? 'menuitem' : 'menuitemcheckbox'}
            aria-checked={item.checked}
            className={`ctx-menu__item${item.primary ? ' is-primary' : ''}`}
            disabled={item.disabled}
            onClick={() => {
              onClose(true);
              item.onSelect();
            }}
          >
            <span className="ctx-menu__check" aria-hidden="true">
              {item.checked ? '✓' : ''}
            </span>
            <span className="ctx-menu__label">{item.label}</span>
            {item.shortcut && <span className="ctx-menu__shortcut">{item.shortcut}</span>}
          </button>
        ),
      )}
    </div>,
    document.body,
  );
}
