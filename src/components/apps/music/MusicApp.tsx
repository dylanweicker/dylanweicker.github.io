import { useEffect, useMemo, useRef, useState, type CSSProperties, type PointerEvent as ReactPointerEvent, type ReactNode } from 'react';
import { tracks } from '@/data/music';
import { loadYouTubeApi, PlayerState, videoUrl, type YTPlayer } from '@/lib/youtube';
import { CoverGrid } from './CoverViews';
import { Cover, dragX, fmt, totalTime } from './shared';
import { DEFAULT_WIDTHS, TrackTable, type Sort, type SortKey } from './TrackTable';

type Status = 'loading' | 'ready' | 'error';
type Repeat = 'off' | 'all' | 'one';
type Display = 'details' | 'tiles';

const PREFS_KEY = 'dylanos-music-view';
const DISPLAYS: { id: Display; label: string; icon: ReactNode }[] = [
  {
    id: 'details',
    label: 'Details',
    icon: <path d="M2 3h12M2 7h12M2 11h12" stroke="currentColor" strokeWidth="1.8" />,
  },
  {
    id: 'tiles',
    label: 'Tiles',
    icon: <path d="M2 2h5v5H2zM9 2h5v5H9zM2 9h5v5H2zM9 9h5v5H9z" fill="currentColor" />,
  },
];

// The now-playing pane starts wide enough for a 356×200 player: the album cover at YouTube's minimum height.
const PANES = { side: { initial: 150, min: 120, max: 280 }, now: { initial: 372, min: 232, max: 520 } };

const clamp = (n: number, lo: number, hi: number) => Math.min(Math.max(n, lo), hi);

/** A shuffled play order over every track, starting with `first`. */
function shuffledFrom(first: number): number[] {
  const rest = tracks.map((_, i) => i).filter((i) => i !== first);
  for (let i = rest.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [rest[i], rest[j]] = [rest[j], rest[i]];
  }
  return [first, ...rest];
}

/** Music, styled like iTunes 8 (2008), playing official audio through YouTube's embedded player. */
export function MusicApp() {
  const stageRef = useRef<HTMLDivElement>(null);
  const player = useRef<YTPlayer | null>(null);
  const [status, setStatus] = useState<Status>('loading');
  const [selected, setSelected] = useState(0);
  const [current, setCurrent] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [started, setStarted] = useState(false);
  const [time, setTime] = useState({ position: 0, duration: tracks[0].duration });
  const [volume, setVolume] = useState(80);
  const [shuffleOrder, setShuffleOrder] = useState<number[] | null>(null);
  const [repeat, setRepeat] = useState<Repeat>('off');
  const [display, setDisplay] = useState<Display>('details');
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState<Sort | null>(null);
  const [widths, setWidths] = useState(DEFAULT_WIDTHS);
  const [panes, setPanes] = useState({ side: PANES.side.initial, now: PANES.now.initial });

  // Remember the chosen display (per visitor; read after mount so the server render matches).
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(PREFS_KEY) ?? '{}') as { display?: Display };
      if (DISPLAYS.some((d) => d.id === saved.display)) setDisplay(saved.display!);
    } catch {
      // storage blocked or old format
    }
  }, []);
  const chooseDisplay = (d: Display) => {
    setDisplay(d);
    try {
      localStorage.setItem(PREFS_KEY, JSON.stringify({ display: d }));
    } catch {
      // storage blocked
    }
  };

  /** The songs in view: search filter, then column sort. Playback follows this order (like iTunes). */
  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = tracks.map((_, i) => i);
    if (q) {
      list = list.filter((i) => {
        const t = tracks[i];
        return [t.title, t.artist, t.album, t.genre].some((f) => f.toLowerCase().includes(q));
      });
    }
    if (sort) {
      list.sort((a, b) => {
        const x = tracks[a][sort.key];
        const y = tracks[b][sort.key];
        const c = typeof x === 'number' && typeof y === 'number' ? x - y : String(x).localeCompare(String(y), undefined, { sensitivity: 'base' });
        return c * sort.dir || a - b;
      });
    }
    return list;
  }, [query, sort]);

  const order = useMemo(() => {
    if (!shuffleOrder) return rows;
    const inView = new Set(rows);
    return shuffleOrder.filter((i) => inView.has(i));
  }, [rows, shuffleOrder]);

  const nextOf = (from: number, list: number[], wrap: boolean): number | null => {
    const at = list.indexOf(from);
    if (at === -1) return list[0] ?? null;
    if (at < list.length - 1) return list[at + 1];
    return wrap ? (list[0] ?? null) : null;
  };

  // Latest values for the player's event callbacks, which are bound once.
  const live = useRef({ current, repeat, order });
  live.current = { current, repeat, order };

  const load = (index: number) => {
    const p = player.current;
    if (!p) return;
    setCurrent(index);
    setSelected(index);
    setStarted(true);
    setTime({ position: 0, duration: tracks[index].duration });
    p.loadVideoById(tracks[index].youtubeId);
  };
  const loadRef = useRef(load);
  loadRef.current = load;

  useEffect(() => {
    let cancelled = false;
    const host = stageRef.current;
    if (!host) return;
    // The API replaces the element it is given, so hand it a child we own.
    const target = document.createElement('div');
    host.appendChild(target);
    loadYouTubeApi()
      .then((YT) => {
        if (cancelled) return;
        player.current = new YT.Player(target, {
          host: 'https://www.youtube-nocookie.com',
          videoId: tracks[0].youtubeId,
          width: '100%',
          height: '100%',
          playerVars: { playsinline: 1, rel: 0 },
          events: {
            onReady: (e) => {
              if (cancelled) return;
              e.target.setVolume(80);
              setStatus('ready');
            },
            onStateChange: (e) => {
              setPlaying(e.data === PlayerState.PLAYING || e.data === PlayerState.BUFFERING);
              if (e.data === PlayerState.PLAYING) setStarted(true);
              if (e.data !== PlayerState.ENDED) return;
              const { current: cur, repeat: rep, order: list } = live.current;
              if (rep === 'one') {
                e.target.seekTo(0, true);
                e.target.playVideo();
                return;
              }
              const next = nextOf(cur, list, rep === 'all');
              if (next !== null) loadRef.current(next);
            },
            // 101/150: the uploader blocked embedding; skip ahead rather than stall.
            onError: () => {
              const { current: cur, order: list } = live.current;
              const next = nextOf(cur, list, false);
              if (next !== null) loadRef.current(next);
            },
          },
        });
      })
      .catch(() => !cancelled && setStatus('error'));
    return () => {
      cancelled = true;
      player.current?.destroy();
      player.current = null;
      host.replaceChildren();
    };
  }, []);

  // Update the LCD while playing.
  useEffect(() => {
    if (!playing) return;
    const id = window.setInterval(() => {
      const p = player.current;
      if (p) setTime({ position: p.getCurrentTime(), duration: p.getDuration() || tracks[live.current.current].duration });
    }, 250);
    return () => window.clearInterval(id);
  }, [playing]);

  const playPause = () => {
    const p = player.current;
    if (!p) return;
    if (selected !== current || !started) return load(selected);
    if (playing) p.pauseVideo();
    else p.playVideo();
  };

  const previous = () => {
    const p = player.current;
    if (!p) return;
    const at = order.indexOf(current);
    if (time.position > 3 || at <= 0) {
      p.seekTo(0, true);
      setTime((t) => ({ ...t, position: 0 }));
    } else load(order[at - 1]);
  };

  const onSort = (key: SortKey) =>
    setSort((s) => (s?.key === key ? { key, dir: s.dir === 1 ? -1 : 1 } : { key, dir: 1 }));

  const paneDrag = (pane: 'side' | 'now', sign: 1 | -1) => (e: ReactPointerEvent<HTMLElement>) => {
    const start = panes[pane];
    dragX(e, (dx) => setPanes((p) => ({ ...p, [pane]: clamp(start + sign * dx, PANES[pane].min, PANES[pane].max) })));
  };

  const track = tracks[current];
  const disabled = status !== 'ready';
  const next = nextOf(current, order, repeat === 'all');
  const upNext: number[] = [];
  for (let n = next, guard = 0; n !== null && guard < 5 && n !== current; guard++) {
    upNext.push(n);
    n = nextOf(n, order, repeat === 'all');
  }
  const viewTotal = rows.reduce((sum, i) => sum + tracks[i].duration, 0);
  const handlers = { selected, current, started, playing, onSelect: setSelected, onPlay: (i: number) => !disabled && load(i) };

  return (
    <div className="itunes" style={{ '--side': `${panes.side}px`, '--now': `${panes.now}px` } as CSSProperties}>
      <div className="itunes__toolbar">
        <div className="itunes__transport">
          <button type="button" className="itunes__btn" aria-label="Previous" disabled={disabled} onClick={previous}>
            <svg viewBox="0 0 20 12" aria-hidden="true">
              <path d="M10 0v12L2 6zM19 0v12l-8-6z" />
            </svg>
          </button>
          <button
            type="button"
            className="itunes__btn itunes__btn--play"
            aria-label={playing ? 'Pause' : 'Play'}
            disabled={disabled}
            onClick={playPause}
          >
            <svg viewBox="0 0 14 14" aria-hidden="true">
              {playing ? <path d="M2 1h3.5v12H2zM8.5 1H12v12H8.5z" /> : <path d="M3 1l10 6-10 6z" />}
            </svg>
          </button>
          <button
            type="button"
            className="itunes__btn"
            aria-label="Next"
            disabled={disabled || next === null}
            onClick={() => next !== null && load(next)}
          >
            <svg viewBox="0 0 20 12" aria-hidden="true">
              <path d="M1 0v12l8-6zM10 0v12l8-6z" />
            </svg>
          </button>
          <label className="itunes__volume">
            <span className="sr-only">Volume</span>
            <svg viewBox="0 0 12 12" aria-hidden="true">
              <path d="M1 4h2l3-3v10L3 8H1z" fill="currentColor" />
            </svg>
            <input
              type="range"
              min={0}
              max={100}
              value={volume}
              disabled={disabled}
              onChange={(e) => {
                const v = Number(e.target.value);
                setVolume(v);
                player.current?.setVolume(v);
              }}
            />
            <svg viewBox="0 0 16 12" aria-hidden="true">
              <path d="M1 4h2l3-3v10L3 8H1z" fill="currentColor" />
              <path d="M8.5 3.5a3.5 3.5 0 0 1 0 5M10.5 1.5a6 6 0 0 1 0 9" fill="none" stroke="currentColor" strokeWidth="1.2" />
            </svg>
          </label>
        </div>

        <div className="itunes__lcd" aria-live="polite">
          {status === 'error' ? (
            <p className="itunes__lcd-line">Couldn't reach YouTube</p>
          ) : status === 'loading' ? (
            <p className="itunes__lcd-line">Connecting…</p>
          ) : started ? (
            <>
              <p className="itunes__lcd-line itunes__lcd-title">{track.title}</p>
              <p className="itunes__lcd-line">
                {track.artist} — {track.album}
              </p>
              <div className="itunes__lcd-progress">
                <span>{fmt(time.position)}</span>
                <input
                  type="range"
                  className="itunes__scrub"
                  aria-label="Seek"
                  min={0}
                  max={Math.max(1, Math.round(time.duration))}
                  step={1}
                  value={Math.round(time.position)}
                  onChange={(e) => {
                    const s = Number(e.target.value);
                    setTime((t) => ({ ...t, position: s }));
                    player.current?.seekTo(s, true);
                  }}
                  style={{ '--fill': `${(time.position / Math.max(1, time.duration)) * 100}%` } as CSSProperties}
                />
                <span>-{fmt(time.duration - time.position)}</span>
              </div>
            </>
          ) : (
            <p className="itunes__lcd-idle" aria-hidden="true">
              ♪
            </p>
          )}
        </div>

        <div className="itunes__toolbar-right">
          <div className="itunes__views" role="group" aria-label="Display">
            {DISPLAYS.map((d) => (
              <button
                key={d.id}
                type="button"
                className={`itunes__view${display === d.id ? ' is-on' : ''}`}
                aria-pressed={display === d.id}
                aria-label={d.label}
                title={d.label}
                onClick={() => chooseDisplay(d.id)}
              >
                <svg viewBox="0 0 16 16" aria-hidden="true">
                  {d.icon}
                </svg>
              </button>
            ))}
          </div>
          <label className="itunes__search">
            <svg viewBox="0 0 16 16" aria-hidden="true">
              <circle cx="6.5" cy="6.5" r="4.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
              <path d="M10 10l4.5 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <span className="sr-only">Search music</span>
            <input
              type="search"
              placeholder="Search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Escape' && query && (e.stopPropagation(), setQuery(''))}
            />
          </label>
        </div>
      </div>

      <div className="itunes__body">
        <nav className="itunes__source" aria-label="Library">
          <p className="itunes__source-heading">Library</p>
          <p className="itunes__source-item is-selected">
            <span aria-hidden="true">♫</span> Music
          </p>
        </nav>
        <div className="itunes__split itunes__split--side" aria-hidden="true" onPointerDown={paneDrag('side', 1)} />

        <div className={`itunes__content itunes__content--${display}`}>
          {display === 'tiles' ? (
            <div className="itunes__list">
              <CoverGrid rows={rows} {...handlers} />
            </div>
          ) : (
            <div className="itunes__list">
              <TrackTable
                rows={rows}
                sort={sort}
                onSort={onSort}
                widths={widths}
                onResize={(key, w) => setWidths((ws) => ({ ...ws, [key]: w }))}
                {...handlers}
              />
            </div>
          )}
        </div>

        <div className="itunes__split itunes__split--now" aria-hidden="true" onPointerDown={paneDrag('now', -1)} />
        <aside className="itunes__now" aria-label="Now playing">
          {/* YouTube's player must stay visible and at least 200×200; Art Tracks show the album cover. */}
          <div ref={stageRef} className="itunes__video" />
          {status === 'error' && (
            <p className="itunes__fallback">
              The YouTube player didn't load.{' '}
              <a href={videoUrl(track.youtubeId)} target="_blank" rel="noopener">
                Listen on YouTube
              </a>
            </p>
          )}
          <div className="itunes__now-info">
            <p className="itunes__now-label">{started ? 'Now Playing' : 'Selected'}</p>
            <p className="itunes__now-title">{tracks[started ? current : selected].title}</p>
            <p className="itunes__now-meta">
              {tracks[started ? current : selected].artist} · {tracks[started ? current : selected].album}
            </p>
          </div>
          {upNext.length > 0 && started && (
            <div className="itunes__upnext">
              <p className="itunes__now-label">Up Next{shuffleOrder ? ' (shuffled)' : ''}</p>
              <ol>
                {upNext.map((i) => (
                  <li key={i}>
                    <button type="button" onDoubleClick={() => load(i)} onClick={() => setSelected(i)} title="Double-click to play">
                      <Cover track={tracks[i]} className="itunes__upnext-cover" />
                      <span>
                        <strong>{tracks[i].title}</strong>
                        <small>{tracks[i].artist}</small>
                      </span>
                    </button>
                  </li>
                ))}
              </ol>
            </div>
          )}
        </aside>
      </div>

      <footer className="itunes__status">
        <div className="itunes__modes">
          <button
            type="button"
            className={`itunes__mode${shuffleOrder ? ' is-on' : ''}`}
            aria-pressed={Boolean(shuffleOrder)}
            aria-label="Shuffle"
            title="Shuffle"
            onClick={() => setShuffleOrder((o) => (o ? null : shuffledFrom(current)))}
          >
            <svg viewBox="0 0 20 14" aria-hidden="true">
              <path d="M1 3h4l8 8h4M1 11h4l2-2M11 5l2-2h4M15 1l2 2-2 2M15 9l2 2-2 2" fill="none" stroke="currentColor" strokeWidth="1.6" />
            </svg>
          </button>
          <button
            type="button"
            className={`itunes__mode${repeat !== 'off' ? ' is-on' : ''}`}
            aria-label={`Repeat: ${repeat}`}
            title={`Repeat: ${repeat}`}
            onClick={() => setRepeat((r) => (r === 'off' ? 'all' : r === 'all' ? 'one' : 'off'))}
          >
            <svg viewBox="0 0 20 14" aria-hidden="true">
              <path d="M4 5V4a2 2 0 0 1 2-2h9l-2-1.5M16 9v1a2 2 0 0 1-2 2H5l2 1.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
            </svg>
            {repeat === 'one' && <span className="itunes__mode-one">1</span>}
          </button>
        </div>
        <span>
          {rows.length} {rows.length === 1 ? 'song' : 'songs'}, {totalTime(viewTotal)} total time
          <span className="itunes__status-src"> · plays from YouTube</span>
        </span>
      </footer>
    </div>
  );
}
