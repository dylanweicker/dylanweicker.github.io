import { useEffect, useMemo, useRef, useState } from 'react';
import { blockText, categories, categoryById, SITE, type Photo } from '@/data/homepage';
import { useWindows } from '@/stores/windows';
import { HOME, SiteContext, type SiteNav } from './context';
import { Lightbox } from './Lightbox';
import { Site } from './Site';

/*
 * The Interests app: "Dylan's World", a 2006 personal homepage, inside a 2007-era browser (back/forward
 * orbs, address bar, tab, command bar, status bar). No real browser branding.
 */

const fileFor = (id: string) => (id === HOME ? 'index.html' : (categoryById(id)?.file ?? 'index.html'));

export function HomepageApp({ slug }: { slug?: string }) {
  const setSlug = useWindows((s) => s.setSlug);
  const openApp = useWindows((s) => s.open);
  const page = slug && categoryById(slug) ? slug : HOME;

  // The browser's own back/forward history (separate from the site's URL history).
  const [history, setHistory] = useState({ stack: [page], index: 0 });
  const [anchor, setAnchor] = useState<string | null>(null);
  const [paused, setPaused] = useState(false);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [notFound, setNotFound] = useState(false);
  const [lightbox, setLightbox] = useState<{ photos: Photo[]; index: number } | null>(null);
  const pageRef = useRef<HTMLDivElement>(null);

  // Keep our stack in step when the page changes from outside (deep link, browser back button).
  useEffect(() => {
    setHistory((h) => (h.stack[h.index] === page ? h : { stack: [...h.stack.slice(0, h.index + 1), page], index: h.index + 1 }));
  }, [page]);

  // Scroll to the top, or to a section, whenever the page or anchor changes; flash "loading".
  useEffect(() => {
    const el = pageRef.current;
    if (!el) return;
    const target = anchor ? el.querySelector<HTMLElement>(`#hp-${anchor}`) : null;
    // Measured against the page area (offsetTop would be relative to the window body).
    const top = target ? el.scrollTop + target.getBoundingClientRect().top - el.getBoundingClientRect().top - 10 : 0;
    el.scrollTo({ top });
    setLoading(true);
    const t = window.setTimeout(() => setLoading(false), 350);
    return () => window.clearTimeout(t);
  }, [page, anchor]);

  const go = (id: string, section: string | null = null) => {
    setNotFound(false);
    if (id === page && section && section === anchor) {
      pageRef.current?.querySelector<HTMLElement>(`#hp-${section}`)?.scrollIntoView({ block: 'start' });
      return;
    }
    setAnchor(section);
    if (id === page) return;
    setHistory((h) => ({ stack: [...h.stack.slice(0, h.index + 1), id], index: h.index + 1 }));
    setSlug('homepage', id === HOME ? undefined : id);
  };

  const step = (delta: -1 | 1) => {
    const index = history.index + delta;
    if (index < 0 || index >= history.stack.length) return;
    setHistory((h) => ({ ...h, index }));
    setAnchor(null);
    const id = history.stack[index];
    setSlug('homepage', id === HOME ? undefined : id);
  };

  // The search box finds a page or section and jumps to it.
  const search = (e: { preventDefault(): void }) => {
    e.preventDefault();
    const q = query.trim().toLowerCase();
    if (!q) return;
    for (const c of categories) {
      if ([c.label, c.tagline].some((t) => t.toLowerCase().includes(q))) return go(c.id);
      for (const s of c.sections) {
        const text = [s.title, ...s.blocks.flatMap(blockText)];
        if (text.some((t) => t.toLowerCase().includes(q))) return go(c.id, s.id);
      }
    }
    setNotFound(true);
  };

  const nav = useMemo<SiteNav>(
    () => ({ page, go, openApp, showPhotos: (photos, index) => setLightbox({ photos, index }) }),
    [page, anchor, openApp],
  );

  const current = categoryById(page);
  const title = current ? `${current.label} · ${SITE.name}` : SITE.name;
  const url = `${SITE.host}${fileFor(page)}${anchor ? `#${anchor}` : ''}`;

  return (
    <div className="ie">
      <div className="ie__navbar">
        <div className="ie__orbs">
          <button type="button" className="ie__orb ie__orb--back" aria-label="Back" disabled={history.index === 0} onClick={() => step(-1)}>
            <svg viewBox="0 0 16 16" aria-hidden="true">
              <path d="M9.5 3 4.5 8l5 5M5 8h8" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            type="button"
            className="ie__orb ie__orb--fwd"
            aria-label="Forward"
            disabled={history.index >= history.stack.length - 1}
            onClick={() => step(1)}
          >
            <svg viewBox="0 0 16 16" aria-hidden="true">
              <path d="M6.5 3l5 5-5 5M11 8H3" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
        <label className="ie__address">
          <span className="sr-only">Address</span>
          <span className="ie__favicon" aria-hidden="true">
            ✦
          </span>
          <input value={url} readOnly />
          <button type="button" className="ie__addr-btn" aria-label="Refresh" title="Refresh" onClick={() => go(page)}>
            <svg viewBox="0 0 16 16" aria-hidden="true">
              <path d="M13 8a5 5 0 1 1-1.5-3.6M13 2.5v3h-3" fill="none" stroke="#2a8a2a" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>
          <button
            type="button"
            className="ie__addr-btn"
            aria-label={paused ? 'Resume animations' : 'Stop animations'}
            title={paused ? 'Resume animations' : 'Stop (pauses the animations)'}
            aria-pressed={paused}
            onClick={() => setPaused((p) => !p)}
          >
            <svg viewBox="0 0 16 16" aria-hidden="true">
              <path d="M4 4l8 8M12 4l-8 8" stroke="#c42b1c" strokeWidth="2.2" strokeLinecap="round" />
            </svg>
          </button>
        </label>
        <form className="ie__search" role="search" onSubmit={search}>
          <label className="sr-only" htmlFor="ie-search">
            Search this site
          </label>
          <input
            id="ie-search"
            type="search"
            placeholder="Search this site"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setNotFound(false);
            }}
          />
          <button type="submit" aria-label="Search">
            <svg viewBox="0 0 16 16" aria-hidden="true">
              <circle cx="6.5" cy="6.5" r="4.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
              <path d="M10 10l4.5 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </form>
      </div>

      <div className="ie__tabbar">
        <span className="ie__favs" aria-hidden="true">
          <span>☆</span>
          <span>✚</span>
        </span>
        <div className="ie__tab" aria-current="page">
          <span className="ie__tab-icon" aria-hidden="true">
            ✦
          </span>
          <span className="ie__tab-title">{title}</span>
        </div>
        <span className="ie__newtab" aria-hidden="true" />
        <div className="ie__commands">
          <button type="button" className="ie__cmd" onClick={() => go(HOME)}>
            <svg viewBox="0 0 16 16" aria-hidden="true">
              <path d="M2 8 8 2.5 14 8M4 7v6.5h3V10h2v3.5h3V7" fill="#f2c94c" stroke="#6b4c0c" strokeWidth="1" strokeLinejoin="round" />
            </svg>
            Home
          </button>
          <span className="ie__cmd ie__cmd--fake" aria-hidden="true">
            Page ▾
          </span>
          <span className="ie__cmd ie__cmd--fake" aria-hidden="true">
            Tools ▾
          </span>
        </div>
      </div>

      <div ref={pageRef} className={`ie__page${paused ? ' is-paused' : ''}`}>
        <SiteContext.Provider value={nav}>
          <Site current={current} />
        </SiteContext.Provider>
      </div>

      <div className="ie__status" aria-live="polite">
        <span className="ie__status-msg">{notFound ? `No results for "${query.trim()}"` : loading ? 'Opening page…' : 'Done'}</span>
        <span className="ie__status-zone">Internet</span>
        <span className="ie__status-zoom">100%</span>
      </div>

      {lightbox && (
        <Lightbox
          photos={lightbox.photos}
          index={lightbox.index}
          onIndex={(index) => setLightbox((l) => (l ? { ...l, index } : l))}
          onClose={() => setLightbox(null)}
        />
      )}
    </div>
  );
}
