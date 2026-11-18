import { useCallback, useEffect, useRef, useState } from 'react';
import { appsById } from '@/data/apps';
import { topWindow, useWindows } from '@/stores/windows';
import { StartMenu } from './StartMenu';

function Clock() {
  // Rendered client-side only so the server HTML doesn't bake in a build-time clock.
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const id = window.setInterval(() => setNow(new Date()), 15_000);
    return () => window.clearInterval(id);
  }, []);
  if (!now) return <div className="tray__clock" />;
  return (
    <time className="tray__clock" dateTime={now.toISOString()}>
      {now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}
      <br />
      {now.toLocaleDateString([], { month: 'short', day: 'numeric' })}
    </time>
  );
}

export function Taskbar({ onShutDown }: { onShutDown: () => void }) {
  const wins = useWindows((s) => s.wins);
  const focus = useWindows((s) => s.focus);
  const minimize = useWindows((s) => s.minimize);
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const orbRef = useRef<HTMLButtonElement>(null);
  const active = topWindow(wins)?.app;

  return (
    <>
      <nav className="taskbar" aria-label="Taskbar">
        <button
          ref={orbRef}
          type="button"
          className="start-orb"
          aria-label="Start"
          aria-expanded={menuOpen}
          aria-controls="start-menu"
          onClick={() => setMenuOpen((o) => !o)}
        >
          <span className="start-orb__inner" aria-hidden="true">
            D
          </span>
        </button>

        <ul className="task-list">
          {wins.map((w) => {
            const def = appsById[w.app];
            const isActive = w.app === active;
            return (
              <li key={w.app} style={{ display: 'contents' }}>
                <button
                  type="button"
                  className={`task-btn${isActive ? ' is-active' : ''}`}
                  aria-pressed={isActive}
                  title={def.title}
                  onClick={() => (isActive ? minimize(w.app) : focus(w.app))}
                >
                  <img src={def.icon} alt="" width={20} height={20} />
                  <span>{def.title}</span>
                </button>
              </li>
            );
          })}
        </ul>

        <div className="tray">
          <span title="Always sunny on DylanOS" aria-hidden="true">
            ☀️
          </span>
          <Clock />
        </div>
      </nav>
      {menuOpen && <StartMenu onClose={closeMenu} orbRef={orbRef} onShutDown={onShutDown} />}
    </>
  );
}
