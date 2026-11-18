import { useEffect, useRef } from 'react';
import type { Photo } from '@/data/homepage';

interface Props {
  photos: Photo[];
  index: number;
  onIndex: (index: number) => void;
  onClose: () => void;
}

/** A 2006-style popup photo viewer. Esc closes it without closing the desktop window. */
export function Lightbox({ photos, index, onIndex, onClose }: Props) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const returnTo = useRef<Element | null>(null);
  const photo = photos[index];
  const many = photos.length > 1;
  const step = (d: number) => onIndex((index + d + photos.length) % photos.length);

  useEffect(() => {
    returnTo.current = document.activeElement;
    closeRef.current?.focus();
    return () => (returnTo.current as HTMLElement | null)?.focus?.();
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        e.stopPropagation();
        onClose();
      } else if (many && e.key === 'ArrowRight') step(1);
      else if (many && e.key === 'ArrowLeft') step(-1);
    };
    document.addEventListener('keydown', onKey, true);
    return () => document.removeEventListener('keydown', onKey, true);
  });

  return (
    <div className="hp-lightbox" onClick={onClose}>
      <div className="hp-lightbox__win" role="dialog" aria-modal="true" aria-label={photo.caption ?? 'Photo'} onClick={(e) => e.stopPropagation()}>
        <div className="hp-lightbox__bar">
          <span>
            {photo.caption ?? 'Photo'}
            {many && ` (${index + 1} of ${photos.length})`}
          </span>
          <button ref={closeRef} type="button" aria-label="Close" onClick={onClose}>
            ×
          </button>
        </div>
        <img className="hp-lightbox__img" src={photo.src} alt={photo.caption ?? ''} />
        {many && (
          <p className="hp-lightbox__nav">
            <button type="button" className="hp__applink" onClick={() => step(-1)}>
              « Prev
            </button>
            <button type="button" className="hp__applink" onClick={() => step(1)}>
              Next »
            </button>
          </p>
        )}
      </div>
    </div>
  );
}
