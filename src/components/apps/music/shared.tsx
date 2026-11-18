import type { PointerEvent as ReactPointerEvent } from 'react';
import { coverUrl, type Track } from '@/data/music';

export const fmt = (seconds: number) => {
  const s = Math.max(0, Math.round(seconds));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
};

/** iTunes-style total: "1 hour, 3 minutes" */
export const totalTime = (seconds: number) => {
  const h = Math.floor(seconds / 3600);
  const m = Math.round((seconds % 3600) / 60);
  const mins = `${m} minute${m === 1 ? '' : 's'}`;
  return h ? `${h} hour${h === 1 ? '' : 's'}, ${mins}` : mins;
};

/** Album artwork, cropped out of the Art Track thumbnail. */
export function Cover({ track, className = '' }: { track: Track; className?: string }) {
  return <span className={`cover ${className}`} style={{ backgroundImage: `url(${coverUrl(track)})` }} aria-hidden="true" />;
}

/** Horizontal drag helper for splitters and column resizers. */
export function dragX(e: ReactPointerEvent<HTMLElement>, onMove: (dx: number) => void) {
  e.preventDefault();
  e.stopPropagation();
  const target = e.currentTarget;
  const start = e.clientX;
  target.setPointerCapture(e.pointerId);
  const move = (ev: PointerEvent) => onMove(ev.clientX - start);
  const up = () => {
    target.removeEventListener('pointermove', move);
    target.removeEventListener('pointerup', up);
    target.removeEventListener('pointercancel', up);
  };
  target.addEventListener('pointermove', move);
  target.addEventListener('pointerup', up);
  target.addEventListener('pointercancel', up);
}

export interface RowHandlers {
  selected: number;
  current: number;
  /** Something has been loaded into the player */
  started: boolean;
  playing: boolean;
  onSelect: (index: number) => void;
  onPlay: (index: number) => void;
}
