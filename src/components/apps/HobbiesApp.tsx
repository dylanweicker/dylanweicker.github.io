import { hobbiesStatus, interests } from '@/data/interests';
import { useWindows } from '@/stores/windows';

/** Hobbies and interests, styled like a Windows Live Messenger profile. */
export function HobbiesApp() {
  const open = useWindows((s) => s.open);
  return (
    <div className="msn">
      <header className="msn__head">
        <img className="msn__pic" src="/dylan.webp" alt="" width={72} height={72} />
        <div className="msn__who">
          <p className="msn__name">
            <span className="msn__status" aria-label="Online" /> {hobbiesStatus.displayName}
          </p>
          <p className="msn__pm">&lt;{hobbiesStatus.personalMessage}&gt;</p>
          <button type="button" className="msn__np" onClick={() => open('music')}>
            ♪ Now playing: {hobbiesStatus.nowPlaying}
          </button>
        </div>
      </header>

      <div className="msn__list">
        <p className="msn__group">
          ▾ Interests ({interests.length})
        </p>
        <ul>
          {interests.map((i) => (
            <li key={i.name} className="msn__item">
              <span className="msn__emoji" aria-hidden="true">
                {i.emoji}
              </span>
              <span>
                <strong>{i.name}</strong>
                <small>{i.line}</small>
              </span>
            </li>
          ))}
        </ul>
      </div>

      <footer className="msn__foot">
        <button type="button" className="gloss-btn" onClick={() => open('homepage')}>
          Read more about each one
        </button>
        <button type="button" className="gloss-btn gloss-btn--green" onClick={() => open('contact')}>
          Send Dylan a message
        </button>
      </footer>
    </div>
  );
}
