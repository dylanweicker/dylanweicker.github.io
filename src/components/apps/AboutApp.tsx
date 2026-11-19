import type { AppId } from '@/data/apps';
import { appsById } from '@/data/apps';
import { profile } from '@/data/profile';
import { appHref, inPlace } from '@/lib/links';
import { useWindows } from '@/stores/windows';

const TILES: AppId[] = ['work', 'projects', 'skills', 'homepage', 'resume', 'contact'];

export function AboutApp() {
  const open = useWindows((s) => s.open);

  return (
    <div className="welcome">
      <header className="welcome__hero">
        <img className="welcome__avatar" src="/dylan.webp" alt="Photo of Dylan" width={112} height={112} />
        <div>
          <h3 className="welcome__hello">Hi, I'm Dylan!</h3>
          <p className="welcome__role">
            {profile.role} · {profile.company} · {profile.location}
          </p>
          <p className="welcome__tagline">{profile.tagline}</p>
          <div className="welcome__actions">
            <a className="gloss-btn" href={appHref('work')} onClick={(e) => inPlace(e) && open('work')}>
              See my work
            </a>
            <a className="gloss-btn gloss-btn--green" href={appHref('resume')} onClick={(e) => inPlace(e) && open('resume')}>
              Résumé
            </a>
            <a className="gloss-btn gloss-btn--pink" href={appHref('contact')} onClick={(e) => inPlace(e) && open('contact')}>
              Say hi
            </a>
          </div>
        </div>
      </header>

      <div className="welcome__body">
        {profile.bio.map((p) => (
          <p key={p}>{p}</p>
        ))}

        <h4 className="welcome__section">Get started with DylanOS</h4>
        <ul className="welcome__tiles">
          {TILES.map((id) => {
            const app = appsById[id];
            return (
              <li key={id}>
                <a className="tile" href={appHref(id)} onClick={(e) => inPlace(e) && open(id)}>
                  <img src={app.icon} alt="" width={40} height={40} />
                  <span>
                    <strong>{app.label ?? app.title}</strong>
                    <small>{app.description}</small>
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
