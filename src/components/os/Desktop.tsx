import { useContext, useEffect, useState } from 'react';
import { apps, appsById } from '@/data/apps';
import { parsePath, pathFor } from '@/lib/routes';
import type { SiteContent } from '@/lib/types';
import { createWindowStore, topWindow, useWindows, WindowStoreContext } from '@/stores/windows';
import { AppView } from '../apps/AppView';
import { ContentContext } from './content';
import { DesktopIcons } from './DesktopIcons';
import { markHydrated } from './hydration';
import { Notifications } from './Notifications';
import { ShutDown, type Power } from './ShutDown';
import { Taskbar } from './Taskbar';
import { Wallpaper } from './Wallpaper';
import { Window } from './Window';

interface Props {
  /** The pre-rendered route, e.g. "/work/qatalink/" */
  initialPath: string;
  content: SiteContent;
}

export default function Desktop({ initialPath, content }: Props) {
  const [store] = useState(() => createWindowStore(parsePath(initialPath)));
  return (
    <WindowStoreContext.Provider value={store}>
      <ContentContext.Provider value={content}>
        <Shell />
      </ContentContext.Provider>
    </WindowStoreContext.Provider>
  );
}

function titleFor(app: keyof typeof appsById | undefined) {
  return app ? `${appsById[app].title} · Dylan Weicker` : 'Dylan Weicker';
}

function Shell() {
  const store = useContext(WindowStoreContext)!;
  const wins = useWindows((s) => s.wins);
  const open = useWindows((s) => s.open);
  const top = topWindow(wins);
  const [power, setPower] = useState<Power>('on');

  useEffect(markHydrated, []);

  // Keep the address bar and document title in step with the focused window (DESIGN.md §4.3).
  useEffect(
    () =>
      store.subscribe((s, prev) => {
        const t = topWindow(s.wins);
        if (t?.app !== topWindow(prev.wins)?.app) document.title = titleFor(t?.app);
        if (s.nav === 'none') return;
        const path = t ? pathFor(t) : '/';
        if (path === location.pathname) return;
        if (s.nav === 'push') history.pushState(null, '', path);
        else history.replaceState(null, '', path);
      }),
    [store],
  );

  useEffect(() => {
    const onPop = () => {
      const route = parsePath(location.pathname);
      if (route) store.getState().navigate(route);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape' || e.defaultPrevented) return;
      const t = topWindow(store.getState().wins);
      if (t) store.getState().close(t.app);
    };
    window.addEventListener('popstate', onPop);
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('popstate', onPop);
      window.removeEventListener('keydown', onKey);
    };
  }, [store]);

  return (
    <>
      <Wallpaper />
      <main id="desktop" className="desktop">
        <h1 className="sr-only">Dylan Weicker — DylanOS desktop</h1>
        <DesktopIcons />

        {wins.map((w) => (
          <Window key={w.app} win={w} focused={w === top}>
            <AppView win={w} />
          </Window>
        ))}
      </main>

      <Taskbar onShutDown={() => setPower('shutting-down')} />
      <Notifications />

      <nav className="dock" aria-label="Dock">
        {apps
          .filter((a) => a.dock && !a.hidden)
          .map((app) => (
            <button key={app.id} type="button" className="desk-icon" onClick={() => open(app.id)}>
              <img src={app.icon} alt="" width={40} height={40} />
              {app.label ?? app.title}
            </button>
          ))}
      </nav>

      <ShutDown power={power} setPower={setPower} />
    </>
  );
}
