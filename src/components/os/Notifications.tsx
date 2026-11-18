import { useContext, useEffect, useState } from 'react';
import { useWindows, WindowStoreContext } from '@/stores/windows';

const TIP_KEY = 'dylanos-tip-seen';
const NUDGE_KEY = 'dylanos-nudge-seen';
const TIP_DELAY = 1500;
const TIP_LIFETIME = 25_000;
const NUDGE_DELAY = 30_000;
const NUDGE_LIFETIME = 20_000;

function once(storage: () => Storage, key: string): boolean {
  try {
    if (storage().getItem(key)) return false;
    storage().setItem(key, '1');
  } catch {
    // Storage blocked: show it anyway.
  }
  return true;
}

/** The welcome tip (first visit) and a "Dylan says hi" message (once per session), stacked above the tray. */
export function Notifications() {
  const open = useWindows((s) => s.open);
  const store = useContext(WindowStoreContext);
  const [tip, setTip] = useState(false);
  const [nudge, setNudge] = useState(false);

  useEffect(() => {
    const timers = [
      window.setTimeout(() => {
        if (once(() => localStorage, TIP_KEY)) setTip(true);
      }, TIP_DELAY),
      window.setTimeout(() => {
        // Skip it if they're already writing to Dylan.
        const contactOpen = store?.getState().wins.some((w) => w.app === 'contact');
        if (!contactOpen && once(() => sessionStorage, NUDGE_KEY)) setNudge(true);
      }, NUDGE_DELAY),
    ];
    return () => timers.forEach(window.clearTimeout);
  }, [store]);

  useEffect(() => {
    if (!tip) return;
    const t = window.setTimeout(() => setTip(false), TIP_LIFETIME);
    return () => window.clearTimeout(t);
  }, [tip]);

  useEffect(() => {
    if (!nudge) return;
    const t = window.setTimeout(() => setNudge(false), NUDGE_LIFETIME);
    return () => window.clearTimeout(t);
  }, [nudge]);

  return (
    <div className="notify-area" role="status" aria-live="polite">
      {nudge && (
        <div className="toast">
          <div className="toast__head">
            <img src="/icons/mail.webp" alt="" width={16} height={16} />
            <span>New message</span>
            <button type="button" className="toast__close" aria-label="Dismiss" onClick={() => setNudge(false)}>
              ×
            </button>
          </div>
          <button
            type="button"
            className="toast__body"
            onClick={() => {
              setNudge(false);
              open('contact');
            }}
          >
            <img className="toast__pic" src="/dylan.webp" alt="" width={44} height={44} />
            <span>
              <strong>Dylan says:</strong>
              Hey! 👋 Thanks for stopping by. Click here to send me a message!
            </span>
          </button>
        </div>
      )}
      {tip && (
        <div className="balloon">
          <button type="button" className="toast__close" aria-label="Dismiss tip" onClick={() => setTip(false)}>
            ×
          </button>
          <p className="balloon__title">
            <img src="/icons/sparkles.png" alt="" width={18} height={18} /> Welcome to DylanOS
          </p>
          <ul>
            <li>Double-click an icon to open it</li>
            <li>Drag across the desktop to select icons, then drag them around</li>
            <li>Right-click for more options</li>
          </ul>
          <p className="balloon__hint">Tip: poke the sun ☀️</p>
        </div>
      )}
    </div>
  );
}
