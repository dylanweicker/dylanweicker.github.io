import { useState } from 'react';
import { appsById, isAppId, type AppId } from '@/data/apps';
import type { CaseStudy } from '@/lib/types';
import { useWindows } from '@/stores/windows';
import { useSiteContent } from '../os/content';

interface Props {
  app: 'work' | 'projects';
  slug?: string;
}

const SIDEBAR: AppId[] = ['work', 'projects', 'resume', 'skills'];

/** An icon that is already a tile is shown as is; the rest sit on a glossy tile in their tint. */
function Thumb({ item, size }: { item: CaseStudy; size: number }) {
  if (!item.tint) return <img className="thumb-tile" src={item.icon} alt="" width={size} height={size} />;
  return (
    <span
      className="thumb"
      style={{ width: size, height: size, background: `linear-gradient(160deg, ${item.tint[0]}, ${item.tint[1]})` }}
    >
      <img src={item.icon} alt="" width={size * 0.62} height={size * 0.62} />
    </span>
  );
}

export function ExplorerApp({ app, slug }: Props) {
  const content = useSiteContent();
  const items = content[app];
  const setSlug = useWindows((s) => s.setSlug);
  const open = useWindows((s) => s.open);
  const [hovered, setHovered] = useState<CaseStudy | null>(null);

  const current = slug ? items.find((i) => i.slug === slug) : undefined;
  const folder = appsById[app];
  const details = current ?? hovered;

  return (
    <div className="explorer">
      <div className="explorer__bar">
        <button
          type="button"
          className="nav-orb"
          aria-label="Back"
          disabled={!current}
          onClick={() => setSlug(app, undefined)}
        >
          ‹
        </button>
        <nav className="explorer__address" aria-label="Location">
          <img src="/icons/folder.png" alt="" width={16} height={16} />
          <span>DylanOS</span>
          <span aria-hidden="true">▸</span>
          {current ? (
            <button type="button" className="crumb" onClick={() => setSlug(app, undefined)}>
              {folder.title}
            </button>
          ) : (
            <span aria-current="page">{folder.title}</span>
          )}
          {current && (
            <>
              <span aria-hidden="true">▸</span>
              <span aria-current="page">{current.title}</span>
            </>
          )}
        </nav>
      </div>

      <div className="explorer__main">
        <aside className="explorer__side" aria-label="Favourite links">
          <p className="explorer__side-title">Favourite Links</p>
          {SIDEBAR.map((id) => (
            <button
              key={id}
              type="button"
              className={`explorer__link${id === app ? ' is-current' : ''}`}
              onClick={() => (id === app ? setSlug(app, undefined) : open(id))}
            >
              <img src={appsById[id].icon} alt="" width={18} height={18} />
              {appsById[id].label ?? appsById[id].title}
            </button>
          ))}
        </aside>

        <div className="explorer__content">
          {current ? (
            <article className="case">
              <header className="case__head">
                <Thumb item={current} size={84} />
                <div>
                  <h3 className="case__title">{current.title}</h3>
                  <p className="case__meta">
                    {[current.client, current.year, current.role].filter(Boolean).join(' · ')}
                  </p>
                  <p className="case__summary">{current.summary}</p>
                  <div className="case__links">
                    {current.opens && isAppId(current.opens) ? (
                      <button type="button" className="gloss-btn gloss-btn--green" onClick={() => open(current.opens as AppId)}>
                        ▶ Play it
                      </button>
                    ) : (
                      current.links.play && (
                        <a className="gloss-btn gloss-btn--green" href={current.links.play} target="_blank" rel="noopener">
                          ▶ Play it
                        </a>
                      )
                    )}
                    {current.links.live && (
                      <a className="gloss-btn" href={current.links.live} target="_blank" rel="noopener">
                        Visit site
                      </a>
                    )}
                    {current.links.repo && (
                      <a className="gloss-btn gloss-btn--light" href={current.links.repo} target="_blank" rel="noopener">
                        Source
                      </a>
                    )}
                  </div>
                </div>
              </header>
              <ul className="case__stack" aria-label="Tech stack">
                {current.stack.map((s) => (
                  <li key={s} className="chip">
                    {s}
                  </li>
                ))}
              </ul>
              <div className="prose-aero" dangerouslySetInnerHTML={{ __html: current.html }} />
            </article>
          ) : (
            <ul className="explorer__grid">
              {items.map((item) => (
                <li key={item.slug}>
                  <a
                    className="file"
                    href={`/${app}/${item.slug}/`}
                    onClick={(e) => {
                      e.preventDefault();
                      setSlug(app, item.slug);
                    }}
                    onMouseEnter={() => setHovered(item)}
                    onFocus={() => setHovered(item)}
                  >
                    <Thumb item={item} size={96} />
                    <span className="file__name">{item.title}</span>
                    <span className="file__sub">{[item.client, item.year].filter(Boolean).join(' · ')}</span>
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <footer className="explorer__details" aria-live="polite">
        {details ? (
          <>
            <Thumb item={details} size={40} />
            <div>
              <strong>{details.title}</strong>
              <span>{details.stack.slice(0, 5).join(' · ')}</span>
            </div>
          </>
        ) : (
          <span>
            {items.length} items · hover over one for details
          </span>
        )}
      </footer>
    </div>
  );
}
