import { tracks } from '@/data/music';
import { dragX, fmt, type RowHandlers } from './shared';

export type SortKey = 'title' | 'duration' | 'artist' | 'album' | 'genre';
export interface Sort {
  key: SortKey;
  dir: 1 | -1;
}

export const COLUMNS: { key: SortKey; label: string; numeric?: boolean; hideNarrow?: boolean }[] = [
  { key: 'title', label: 'Name' },
  { key: 'duration', label: 'Time', numeric: true },
  { key: 'artist', label: 'Artist' },
  { key: 'album', label: 'Album', hideNarrow: true },
  { key: 'genre', label: 'Genre', hideNarrow: true },
];

export const DEFAULT_WIDTHS: Record<SortKey, number> = { title: 220, duration: 50, artist: 120, album: 170, genre: 70 };
const MIN_WIDTH = 40;
const ICON_WIDTH = 24;

interface Props extends RowHandlers {
  rows: number[];
  sort: Sort | null;
  onSort: (key: SortKey) => void;
  widths: Record<SortKey, number>;
  onResize: (key: SortKey, width: number) => void;
}

export function TrackTable({ rows, sort, onSort, widths, onResize, selected, current, started, playing, onSelect, onPlay }: Props) {
  const minWidth = ICON_WIDTH + COLUMNS.reduce((sum, c) => sum + widths[c.key], 0);

  return (
    <table className="itunes__tracks" style={{ minWidth }}>
      <colgroup>
        <col style={{ width: ICON_WIDTH }} />
        {COLUMNS.map((c, n) => (
          // The last column has no fixed width, so it absorbs any spare space.
          <col
            key={c.key}
            className={c.hideNarrow ? 'itunes__narrow-hide' : undefined}
            style={n < COLUMNS.length - 1 ? { width: widths[c.key] } : undefined}
          />
        ))}
      </colgroup>
      <thead>
        <tr>
          <th scope="col">
            <span className="sr-only">Playing</span>
          </th>
          {COLUMNS.map((c, n) => {
            const active = sort?.key === c.key;
            const resizable = n < COLUMNS.length - 1;
            return (
              <th
                key={c.key}
                scope="col"
                className={`${active ? 'is-sorted' : ''} ${c.hideNarrow ? 'itunes__narrow-hide' : ''}`}
                aria-sort={active ? (sort!.dir === 1 ? 'ascending' : 'descending') : 'none'}
              >
                <button type="button" className="itunes__sort" onClick={() => onSort(c.key)}>
                  {c.label}
                  {active && <span aria-hidden="true">{sort!.dir === 1 ? '▲' : '▼'}</span>}
                </button>
                {resizable && (
                <span
                  className="itunes__col-resize"
                  role="separator"
                  aria-orientation="vertical"
                  aria-label={`Resize ${c.label} column`}
                  onClick={(e) => e.stopPropagation()}
                  onPointerDown={(e) => {
                    const start = widths[c.key];
                    dragX(e, (dx) => onResize(c.key, Math.max(MIN_WIDTH, start + dx)));
                  }}
                  onDoubleClick={() => onResize(c.key, DEFAULT_WIDTHS[c.key])}
                />
                )}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {rows.map((i, pos) => {
          const t = tracks[i];
          return (
            <tr
              key={t.youtubeId}
              className={i === selected ? 'is-selected' : undefined}
              tabIndex={0}
              aria-selected={i === selected}
              onClick={() => onSelect(i)}
              onDoubleClick={() => onPlay(i)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') onPlay(i);
                if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
                  e.preventDefault();
                  const nextPos = pos + (e.key === 'ArrowDown' ? 1 : -1);
                  if (nextPos < 0 || nextPos >= rows.length) return;
                  onSelect(rows[nextPos]);
                  const row = (e.key === 'ArrowDown' ? e.currentTarget.nextElementSibling : e.currentTarget.previousElementSibling) as HTMLElement | null;
                  row?.focus();
                }
              }}
            >
              <td className="itunes__col-icon" aria-hidden="true">
                {i === current && started ? (playing ? '🔊' : '🔈') : ''}
              </td>
              <td>{t.title}</td>
              <td className="itunes__num">{fmt(t.duration)}</td>
              <td>{t.artist}</td>
              <td className="itunes__narrow-hide">{t.album}</td>
              <td className="itunes__narrow-hide">{t.genre}</td>
            </tr>
          );
        })}
        {rows.length === 0 && (
          <tr className="itunes__empty">
            <td colSpan={COLUMNS.length + 1}>No songs match your search.</td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
