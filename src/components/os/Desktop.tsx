import { useContext, useEffect, useState } from 'react';
import { apps, appsById } from '@/data/apps';
import { profile } from '@/data/profile';
import { appHref, inPlace } from '@/lib/links';
import { parsePath, pathFor } from '@/lib/routes';
import type { SiteContent } from '@/lib/types';
import { createWindowStore, topWindow, useWindows, WindowStoreContext, type Win } from '@/stores/windows';
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

/** The page's one <h1> (for screen readers, crawlers and AI readers): what the focused window shows. */
function headingFor(win: Win | undefined, content: SiteContent) {
  if (!win) return `${profile.name} — DylanOS desktop`;
  if (win.app === 'about') return `${profile.name} — ${profile.role}, ${profile.company}`;
  const app = appsById[win.app];
  const item = (win.app === 'work' || win.app === 'projects') && win.slug ? content[win.app].find((i) => i.slug === win.slug) : undefined;
  return item ? `${item.title} — ${app.title} — ${profile.name}` : `${app.title} — ${profile.name}`;
}

function Shell() {
  const store = useContext(WindowStoreContext)!;
  const content = useContext(ContentContext);
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
        <h1 className="sr-only">{headingFor(top, content)}</h1>
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
            <a key={app.id} className="desk-icon" href={appHref(app.id)} onClick={(e) => inPlace(e) && open(app.id)}>
              <img src={app.icon} alt="" width={40} height={40} />
              <span className="desk-icon__label">{app.label ?? app.title}</span>
            </a>
          ))}
      </nav>

      <ShutDown power={power} setPower={setPower} />
    </>
  );
}
