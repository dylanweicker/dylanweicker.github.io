import { tracks } from '@/data/music';
import { Cover, type RowHandlers } from './shared';

interface Props extends RowHandlers {
  rows: number[];
}

/** Tiles display: album artwork, song name in bold, artist below. */
export function CoverGrid({ rows, selected, current, started, playing, onSelect, onPlay }: Props) {
  if (!rows.length) return <p className="itunes__no-results">No songs match your search.</p>;
  return (
    <ul className="itunes__grid" aria-label="Songs">
      {rows.map((i) => {
        const t = tracks[i];
        return (
          <li key={t.youtubeId}>
            <button
              type="button"
              className={`itunes__tile${i === selected ? ' is-selected' : ''}`}
              aria-pressed={i === selected}
              onClick={() => onSelect(i)}
              onDoubleClick={() => onPlay(i)}
              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), onPlay(i))}
            >
              <Cover track={t} className="itunes__tile-cover" />
              <span className="itunes__tile-title">
                {i === current && started && <span aria-hidden="true">{playing ? '🔊 ' : '🔈 '}</span>}
                {t.title}
              </span>
              <span className="itunes__tile-artist">{t.artist}</span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
