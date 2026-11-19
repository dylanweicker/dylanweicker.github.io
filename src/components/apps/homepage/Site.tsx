import { useState } from 'react';
import { inPlace } from '@/lib/links';
import { categories, SITE, type HomeCategory } from '@/data/homepage';
import { HOME, useSite } from './context';
import { CategoryPage, HomePage } from './pages';

/** The 2006 homepage itself: header, sidebar, page, footer. */
export function Site({ current }: { current?: HomeCategory }) {
  const { page, go, openApp } = useSite();
  const [secret, setSecret] = useState(false);

  return (
    <div className="hp">
      <div className="hp__wrap">
        <header className="hp__header">
          <p className="hp__title">
            <span className="gif-star" aria-hidden="true">
              ★
            </span>{' '}
            {SITE.name}{' '}
            <span className="gif-star" aria-hidden="true">
              ★
            </span>
          </p>
          <div className="hp__marquee" aria-hidden="true">
            <span>{SITE.marquee}</span>
          </div>
        </header>
        <div className="hp__rainbow" aria-hidden="true" />

        <div className="hp__body">
          <nav className="hp__sidebar" aria-labelledby="hp-sidebar-title">
            <p id="hp-sidebar-title" className="hp__sidebar-title">
              My Interests
            </p>
            <a
              className={`hp__navbtn${page === HOME ? ' is-on' : ''}`}
              href="/homepage/"
              aria-current={page === HOME ? 'page' : undefined}
              onClick={(e) => inPlace(e) && go(HOME)}
            >
              Home
            </a>
            {categories.map((c) => {
              const on = page === c.id;
              return (
                <div key={c.id} className="hp__navgroup">
                  <a
                    className={`hp__navbtn${on ? ' is-on' : ''}`}
                    href={`/homepage/${c.id}/`}
                    aria-current={on ? 'page' : undefined}
                    aria-expanded={on}
                    onClick={(e) => inPlace(e) && go(c.id)}
                  >
                    {c.label}
                  </a>
                  {on && (
                    <ul className="hp__subnav">
                      {c.sections.map((s) => (
                        <li key={s.id}>
                          <a
                            href={`#hp-${s.id}`}
                            onClick={(e) => {
                              e.preventDefault();
                              go(c.id, s.id);
                            }}
                          >
                            {s.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            })}
            {/* Easter egg: the hit counter is clickable */}
            <button type="button" className="hp__counter" onClick={() => setSecret((s) => !s)} aria-expanded={secret}>
              visitors
              <span className="hp__digits" aria-label="1337">
                {'0001337'.split('').map((d, i) => (
                  <span key={i}>{d}</span>
                ))}
              </span>
            </button>
            {secret && (
              <p className="hp__secret" role="status">
                You found a secret! Visitor number 1337, which makes you very elite.
              </p>
            )}
          </nav>

          {current ? <CategoryPage category={current} /> : <HomePage />}
        </div>

        <footer className="hp__footer">
          <p className="hp__footer-links">
            <button type="button" className="hp__link-btn" onClick={() => openApp('work')}>
              ← Back to my professional work
            </button>
            <span aria-hidden="true">|</span>
            <button type="button" className="hp__link-btn" onClick={() => openApp('contact')}>
              Say hi
            </button>
          </p>
          <p className="hp__copyright">
            © Dylan Weicker
            {/* Easter egg: a "hidden" link, the colour of the footer */}
            <button type="button" className="hp__hidden-link" onClick={() => openApp('cannon')}>
              (psst: want to play a game?)
            </button>
          </p>
        </footer>
      </div>
    </div>
  );
}
