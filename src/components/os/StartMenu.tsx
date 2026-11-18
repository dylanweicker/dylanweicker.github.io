import { useEffect, useRef, type RefObject } from 'react';
import { apps } from '@/data/apps';
import { profile } from '@/data/profile';
import { useWindows } from '@/stores/windows';

interface Props {
  onClose: () => void;
  orbRef: RefObject<HTMLButtonElement | null>;
  onShutDown: () => void;
}

export function StartMenu({ onClose, orbRef, onShutDown }: Props) {
  const open = useWindows((s) => s.open);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ref.current?.querySelector<HTMLElement>('button, a')?.focus();
    const onPointerDown = (e: PointerEvent) => {
      const t = e.target as Node;
      if (!ref.current?.contains(t) && !orbRef.current?.contains(t)) onClose();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        onClose();
        orbRef.current?.focus();
      }
    };
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKey, true);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKey, true);
    };
  }, [onClose, orbRef]);

  return (
    <div ref={ref} id="start-menu" className="start-menu" role="menu" aria-label="Start menu">
      <ul className="start-menu__apps">
        {apps.filter((app) => !app.hidden).map((app) => (
          <li key={app.id}>
            <button
              type="button"
              role="menuitem"
              className="start-menu__app"
              onClick={() => {
                open(app.id);
                onClose();
              }}
            >
              <img src={app.icon} alt="" width={32} height={32} />
              {app.label ?? app.title}
            </button>
          </li>
        ))}
      </ul>

      <div className="start-menu__side">
        <div className="start-menu__user">
          <img className="start-menu__avatar" src="/dylan.webp" alt="" width={64} height={64} />
          <span className="start-menu__name">{profile.name}</span>
        </div>
        <a className="start-menu__link" role="menuitem" href={profile.links.github} target="_blank" rel="noopener">
          GitHub
        </a>
        <a className="start-menu__link" role="menuitem" href={profile.links.linkedin} target="_blank" rel="noopener">
          LinkedIn
        </a>
        <a className="start-menu__link" role="menuitem" href={`mailto:${profile.links.email}`}>
          Email me
        </a>
        <button
          type="button"
          role="menuitem"
          className="start-menu__power"
          onClick={() => {
            onClose();
            onShutDown();
          }}
        >
          <span className="start-menu__power-icon" aria-hidden="true">
            ⏻
          </span>
          Shut down
        </button>
      </div>
    </div>
  );
}
