import { useEffect, useRef } from 'react';

export type Power = 'on' | 'shutting-down' | 'off';

const SHUTDOWN_MS = 2200;

/** Start → Shut down: a goodbye screen (DESIGN.md §4.2 easter egg). */
export function ShutDown({ power, setPower }: { power: Power; setPower: (p: Power) => void }) {
  const wakeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (power !== 'shutting-down') return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const t = window.setTimeout(() => setPower('off'), reduce ? 0 : SHUTDOWN_MS);
    return () => window.clearTimeout(t);
  }, [power, setPower]);

  useEffect(() => {
    if (power === 'off') wakeRef.current?.focus();
  }, [power]);

  if (power === 'on') return null;

  return (
    <div className={`shutdown${power === 'off' ? ' is-off' : ''}`} role="dialog" aria-modal="true" aria-label="DylanOS">
      <span className="shutdown__orb" aria-hidden="true">
        D
      </span>
      {power === 'shutting-down' ? (
        <p className="shutdown__msg">Shutting down…</p>
      ) : (
        <>
          <p className="shutdown__msg">It's now safe to close this tab.</p>
          <button ref={wakeRef} type="button" className="gloss-btn" onClick={() => setPower('on')}>
            Turn DylanOS back on
          </button>
        </>
      )}
    </div>
  );
}
