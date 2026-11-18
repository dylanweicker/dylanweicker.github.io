import { useEffect, useMemo, useRef, useState } from 'react';
import type { BoardGame, BoardGameCollection } from '@/lib/bgg';

/*
 * Dylan's board game collection, GameShelf-style: box-art tiles grouped by the sort key, with search,
 * sort and order, player-count / play-time / expansion filters, and a details popup.
 * Data: /data/boardgames.json (built from src/data/boardgames.json; see lib/bgg.ts), loaded on demand.
 */

type SortKey = 'name' | 'year' | 'rating' | 'time' | 'weight' | 'players';
type Status = 'loading' | 'ready' | 'empty' | 'error';

const SORTS: { key: SortKey; label: string }[] = [
  { key: 'name', label: 'Name' },
  { key: 'year', label: 'Year' },
  { key: 'rating', label: 'BGG rating' },
  { key: 'time', label: 'Play time' },
  { key: 'weight', label: 'Complexity' },
  { key: 'players', label: 'Max players' },
];

const PLAYER_FILTERS = ['any', '1', '2', '3', '4', '5', '6+'] as const;
const TIME_FILTERS = [
  { value: 'any', label: 'Any length' },
  { value: '30', label: '30 min or less' },
  { value: '60', label: '1 hour or less' },
  { value: '120', label: '2 hours or less' },
  { value: 'long', label: 'Over 2 hours' },
] as const;

const time = (g: BoardGame) => g.maxTime ?? g.minTime ?? null;

const sortValue = (g: BoardGame, key: SortKey): number | string | null => {
  switch (key) {
    case 'name':
      return g.name.replace(/^(the|a|an) /i, '').toLowerCase();
    case 'year':
      return g.year ?? null;
    case 'rating':
      return g.rating ?? null;
    case 'time':
      return time(g);
    case 'weight':
      return g.weight ?? null;
    case 'players':
      return g.maxPlayers ?? null;
  }
};

/** The heading a game is grouped under for the current sort. */
function groupOf(g: BoardGame, key: SortKey): string {
  const v = sortValue(g, key);
  if (v === null) return 'Unknown';
  switch (key) {
    case 'name': {
      const c = (v as string).charAt(0).toUpperCase();
      return /[A-Z]/.test(c) ? c : '#';
    }
    case 'year':
      return `${Math.floor((v as number) / 10) * 10}s`;
    case 'rating':
      return `${Math.floor(v as number)}+`;
    case 'time': {
      const t = v as number;
      return t <= 30 ? '30 min or less' : t <= 60 ? 'Up to 1 hour' : t <= 120 ? 'Up to 2 hours' : 'Over 2 hours';
    }
    case 'weight': {
      const w = v as number;
      return w < 1.8 ? 'Light' : w < 2.6 ? 'Medium-light' : w < 3.4 ? 'Medium' : 'Heavy';
    }
    case 'players':
      return `Up to ${v} players`;
  }
}

const fmtPlayers = (g: BoardGame) =>
  g.minPlayers && g.maxPlayers ? (g.minPlayers === g.maxPlayers ? `${g.minPlayers}` : `${g.minPlayers}–${g.maxPlayers}`) : '?';
const fmtTime = (g: BoardGame) =>
  g.minTime && g.maxTime && g.minTime !== g.maxTime ? `${g.minTime}–${g.maxTime} min` : time(g) ? `${time(g)} min` : '?';

export function BoardGameShelf() {
  const [data, setData] = useState<BoardGameCollection | null>(null);
  const [status, setStatus] = useState<Status>('loading');
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState<SortKey>('name');
  const [desc, setDesc] = useState(false);
  const [players, setPlayers] = useState<(typeof PLAYER_FILTERS)[number]>('any');
  const [length, setLength] = useState<(typeof TIME_FILTERS)[number]['value']>('any');
  const [expansions, setExpansions] = useState(false);
  const [open, setOpen] = useState<BoardGame | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch('/data/boardgames.json')
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(`HTTP ${r.status}`))))
      .then((d: BoardGameCollection | null) => {
        if (cancelled) return;
        setData(d);
        setStatus(d?.games.length ? 'ready' : 'empty');
      })
      .catch(() => !cancelled && setStatus('error'));
    return () => {
      cancelled = true;
    };
  }, []);

  const games = useMemo(() => data?.games ?? [], [data]);
  const baseCount = games.filter((g) => !g.expansion).length;

  const groups = useMemo(() => {
    const q = query.trim().toLowerCase();
    const n = players === '6+' ? 6 : Number(players);
    const list = games.filter((g) => {
      if (!expansions && g.expansion) return false;
      if (q && ![g.name, ...(g.designers ?? [])].some((t) => t.toLowerCase().includes(q))) return false;
      if (players !== 'any') {
        if (!g.minPlayers || !g.maxPlayers) return false;
        if (players === '6+' ? g.maxPlayers < 6 : g.minPlayers > n || g.maxPlayers < n) return false;
      }
      if (length !== 'any') {
        const t = time(g);
        if (t === null) return false;
        if (length === 'long' ? t <= 120 : t > Number(length)) return false;
      }
      return true;
    });
    list.sort((a, b) => {
      const x = sortValue(a, sort);
      const y = sortValue(b, sort);
      // Unknown values always sink to the bottom.
      if (x === null || y === null) return x === y ? 0 : x === null ? 1 : -1;
      const c = typeof x === 'number' && typeof y === 'number' ? x - y : String(x).localeCompare(String(y));
      return (desc ? -c : c) || a.name.localeCompare(b.name);
    });
    const out: { heading: string; games: BoardGame[] }[] = [];
    for (const g of list) {
      const heading = groupOf(g, sort);
      const last = out[out.length - 1];
      if (last?.heading === heading) last.games.push(g);
      else out.push({ heading, games: [g] });
    }
    return out;
  }, [games, query, sort, desc, players, length, expansions]);

  const shown = groups.reduce((n, g) => n + g.games.length, 0);
  const filtered = query || players !== 'any' || length !== 'any' || expansions;

  if (status === 'loading') return <p className="shelf__status">Loading games…</p>;
  if (status !== 'ready') return <p className="shelf__status">The game collection isn&apos;t available right now.</p>;

  return (
    <div className="shelf">
      <div className="shelf__toolbar">
        <p className="shelf__count">
          {baseCount} games{filtered && <small> · showing {shown}</small>}
        </p>
        <label className="shelf__field">
          Sort by
          <select aria-label="Sort by" value={sort} onChange={(e) => setSort(e.target.value as SortKey)}>
            {SORTS.map((s) => (
              <option key={s.key} value={s.key}>
                {s.label}
              </option>
            ))}
          </select>
        </label>
        <button type="button" className="shelf__order" aria-label={desc ? 'Descending' : 'Ascending'} onClick={() => setDesc((d) => !d)}>
          {sort === 'name' ? (desc ? 'Z–A' : 'A–Z') : desc ? 'High–Low' : 'Low–High'}
        </button>
        <label className="shelf__field">
          Players
          <select aria-label="Players" value={players} onChange={(e) => setPlayers(e.target.value as (typeof PLAYER_FILTERS)[number])}>
            {PLAYER_FILTERS.map((p) => (
              <option key={p} value={p}>
                {p === 'any' ? 'Any' : p}
              </option>
            ))}
          </select>
        </label>
        <label className="shelf__field">
          Length
          <select aria-label="Length" value={length} onChange={(e) => setLength(e.target.value as (typeof TIME_FILTERS)[number]['value'])}>
            {TIME_FILTERS.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </label>
        <label className="shelf__check">
          <input type="checkbox" checked={expansions} onChange={(e) => setExpansions(e.target.checked)} />
          Show expansions
        </label>
        <label className="shelf__search">
          <span className="sr-only">Search games or designers</span>
          <input type="search" placeholder="Search games or designers" value={query} onChange={(e) => setQuery(e.target.value)} />
        </label>
      </div>

      <div className="shelf__content">
        {groups.length === 0 && <p className="shelf__status">No games match. Try loosening the filters.</p>}
        {groups.map((group) => (
          <section key={group.heading} className="shelf__group" aria-label={`${group.heading}: ${group.games.length} games`}>
            <h3 className="shelf__heading">
              {group.heading} <small>({group.games.length})</small>
            </h3>
            <ul className="shelf__grid">
              {group.games.map((g) => (
                <li key={g.id}>
                  <button type="button" className="shelf__tile" onClick={() => setOpen(g)} title={g.name}>
                    {g.thumbnail ? <img src={g.thumbnail} alt="" loading="lazy" /> : <span className="shelf__noart" aria-hidden="true" />}
                    <span className="shelf__name">{g.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <p className="shelf__credit">
        Game info and images from{' '}
        <a href={`https://boardgamegeek.com/collection/user/${encodeURIComponent(data!.username)}?own=1`} target="_blank" rel="noopener">
          BoardGameGeek
        </a>
      </p>

      {open && <GameDetails game={open} onClose={() => setOpen(null)} />}
    </div>
  );
}

function GameDetails({ game: g, onClose }: { game: BoardGame; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const returnTo = useRef<Element | null>(null);

  useEffect(() => {
    returnTo.current = document.activeElement;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      // Close the popup, not the whole window.
      e.preventDefault();
      e.stopPropagation();
      onClose();
    };
    document.addEventListener('keydown', onKey, true);
    return () => {
      document.removeEventListener('keydown', onKey, true);
      (returnTo.current as HTMLElement | null)?.focus?.();
    };
  }, [onClose]);

  const facts: [string, string | null][] = [
    ['Players', fmtPlayers(g)],
    ['Best with', g.bestPlayers?.length ? g.bestPlayers.join(', ') : null],
    ['Play time', fmtTime(g)],
    ['Age', g.minAge ? `${g.minAge}+` : null],
    ['BGG rating', g.rating ? `${g.rating.toFixed(1)} / 10` : null],
    ['Complexity', g.weight ? `${g.weight.toFixed(1)} / 5` : null],
    ['Designer', g.designers?.length ? g.designers.join(', ') : null],
  ];

  return (
    <div className="shelf__backdrop" onClick={onClose}>
      <div
        className="shelf__popup"
        role="dialog"
        aria-modal="true"
        aria-labelledby="shelf-popup-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="shelf__popup-bar">
          <span id="shelf-popup-title">
            {g.name}
            {g.year ? ` (${g.year})` : ''}
          </span>
          <button ref={closeRef} type="button" aria-label="Close" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="shelf__popup-body">
          {(g.image || g.thumbnail) && <img className="shelf__popup-art" src={g.image ?? g.thumbnail!} alt={`${g.name} box art`} />}
          <div>
            {g.expansion && <p className="shelf__badge">Expansion</p>}
            <dl className="shelf__facts">
              {facts
                .filter(([, v]) => v)
                .map(([k, v]) => (
                  <div key={k}>
                    <dt>{k}</dt>
                    <dd>{v}</dd>
                  </div>
                ))}
            </dl>
            {g.mechanics && g.mechanics.length > 0 && (
              <p className="shelf__tags">
                <strong>Mechanics:</strong> {g.mechanics.slice(0, 8).join(', ')}
              </p>
            )}
            <p>
              <a href={`https://boardgamegeek.com/boardgame/${g.id}`} target="_blank" rel="noopener">
                View on BoardGameGeek ↗
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
