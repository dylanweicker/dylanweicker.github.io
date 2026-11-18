import { useEffect, useState } from 'react';
import { categories, thumbOf, type Action, type Block, type Card } from '@/data/homepage';
import type { BoardGame, BoardGameCollection } from '@/lib/bgg';
import { useSite } from './context';

/** One renderer per block type (see Block in data/homepage.ts). */
export function BlockView({ block }: { block: Block }) {
  switch (block.type) {
    case 'text':
      return (
        <>
          {block.paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </>
      );
    case 'feature':
      return <Feature block={block} />;
    case 'cards':
      return <Cards cards={block.cards} />;
    case 'gallery':
      return <Gallery block={block} />;
    case 'table':
      return (
        <table className="hp-table">
          {block.heading && (
            <thead>
              <tr>
                <th scope="col">{block.heading[0]}</th>
                <th scope="col">{block.heading[1]}</th>
              </tr>
            </thead>
          )}
          <tbody>
            {block.rows.map(([k, v]) => (
              <tr key={k}>
                <th scope="row">{k}</th>
                <td>{v}</td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    case 'list': {
      const List = block.ordered ? 'ol' : 'ul';
      return (
        <>
          {block.title && <p className="hp-list__title">{block.title}</p>}
          <List className="hp-list">
            {block.items.map((it) => (
              <li key={it}>{it}</li>
            ))}
          </List>
        </>
      );
    }
    case 'shelfPicks':
      return <ShelfPicks count={block.count} />;
    case 'steam':
      return (
        <ul className="hp-steam">
          {block.games.map((g) => (
            <li key={g.appId}>
              <a href={`https://store.steampowered.com/app/${g.appId}/`} target="_blank" rel="noopener">
                <img src={`/homepage/games/steam-${g.appId}.jpg`} alt="" loading="lazy" width={460} height={215} />
                <strong>{g.name}</strong>
              </a>
              <span>{g.note}</span>
            </li>
          ))}
        </ul>
      );
    case 'construction':
      return <Construction text={block.text} />;
    case 'actions':
      return <Actions actions={block.actions} />;
  }
}

export function Construction({ text }: { text: string }) {
  return (
    <p className="hp__construction">
      <span className="hp__construction-label">UNDER CONSTRUCTION: {text}</span>
    </p>
  );
}

function Actions({ actions }: { actions: Action[] }) {
  const { openApp } = useSite();
  return (
    <p className="hp__links-row">
      {actions.map((a) =>
        a.app ? (
          <button key={a.label} type="button" className="hp__applink" onClick={() => openApp(a.app!)}>
            » {a.label}
          </button>
        ) : (
          <a key={a.label} className="hp__applink" href={a.href} target="_blank" rel="noopener">
            » {a.label}
          </a>
        ),
      )}
    </p>
  );
}

function Feature({ block }: { block: Extract<Block, { type: 'feature' }> }) {
  const { showPhotos } = useSite();
  return (
    <div className={`hp-feature${block.image ? '' : ' hp-feature--noimg'}`}>
      {block.image && (
        <button type="button" className="hp-photo hp-feature__img" onClick={() => showPhotos([{ src: block.image!, caption: block.title }], 0)}>
          <img src={thumbOf(block.image)} alt="" loading="lazy" />
        </button>
      )}
      <div>
        {block.label && <p className="hp-feature__label">{block.label}</p>}
        <p className="hp-feature__title">{block.title}</p>
        {block.subtitle && <p className="hp-feature__subtitle">{block.subtitle}</p>}
        {block.paragraphs.map((p) => (
          <p key={p}>{p}</p>
        ))}
        {block.actions && <Actions actions={block.actions} />}
      </div>
    </div>
  );
}

function Cards({ cards }: { cards: Card[] }) {
  return (
    <ul className="hp-cards">
      {cards.map((c) => (
        <CardView key={c.title} card={c} />
      ))}
    </ul>
  );
}

function CardView({ card: c }: { card: Card }) {
  const { page, go, showPhotos } = useSite();
  const [spoiler, setSpoiler] = useState(false);
  const title = c.jumpTo ? (
    <button type="button" className="hp-card__jump" onClick={() => go(page, c.jumpTo!)}>
      {c.title} »
    </button>
  ) : (
    c.title
  );
  return (
    <li className={`hp-card${c.featured ? ' hp-card--featured' : ''}`}>
      {c.photo && (
        <button type="button" className="hp-photo hp-card__photo" onClick={() => showPhotos([{ src: c.photo!, caption: c.title }], 0)}>
          <img src={thumbOf(c.photo)} alt="" loading="lazy" />
        </button>
      )}
      <div className="hp-card__body">
        <p className="hp-card__title">{title}</p>
        {c.subtitle && <p className="hp-card__subtitle">{c.subtitle}</p>}
        {c.meta && c.meta.length > 0 && (
          <p className="hp-card__meta">
            {c.meta.map((m) => (
              <span key={m}>{m}</span>
            ))}
          </p>
        )}
        {c.text && <p>{c.text}</p>}
        {c.facts && c.facts.length > 0 && (
          <dl className="hp-card__facts">
            {c.facts.map(([k, v]) => (
              <div key={k}>
                <dt>{k}:</dt> <dd>{v}</dd>
              </div>
            ))}
          </dl>
        )}
        {c.spoiler && (
          <p className="hp-card__spoiler">
            <button type="button" className="hp__link-btn" aria-expanded={spoiler} onClick={() => setSpoiler((s) => !s)}>
              {spoiler ? 'Hide spoilers' : 'Spoilers! (click to show)'}
            </button>
            {spoiler && <span>{c.spoiler}</span>}
          </p>
        )}
        {c.actions && <Actions actions={c.actions} />}
      </div>
    </li>
  );
}

function Gallery({ block }: { block: Extract<Block, { type: 'gallery' }> }) {
  const { showPhotos } = useSite();
  const albums = block.albums.filter((a) => a.photos.length > 0);
  if (albums.length === 0) return <Construction text={block.empty} />;
  return (
    <>
      {albums.map((a, ai) => (
        <div key={a.title ?? ai} className="hp-album">
          {a.title && (
            <p className="hp-album__title">
              {a.title}
              {a.meta && <small> · {a.meta}</small>}
            </p>
          )}
          {a.text && <p>{a.text}</p>}
          <ul className="hp-photos">
            {a.photos.map((p, i) => (
              <li key={p.src}>
                <button type="button" className="hp-photo" onClick={() => showPhotos(a.photos, i)}>
                  <img src={thumbOf(p.src)} alt={p.caption ?? ''} loading="lazy" />
                  {p.caption && <span>{p.caption}</span>}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </>
  );
}

/** A few random box covers from the Game Shelf data (picked after mount so the server HTML stays stable). */
function ShelfPicks({ count }: { count: number }) {
  const { openApp } = useSite();
  const [picks, setPicks] = useState<BoardGame[] | null>(null);
  useEffect(() => {
    let cancelled = false;
    fetch('/data/boardgames.json')
      .then((r) => (r.ok ? r.json() : null))
      .then((d: BoardGameCollection | null) => {
        if (cancelled || !d) return;
        const pool = d.games.filter((g) => !g.expansion && g.thumbnail);
        for (let i = pool.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [pool[i], pool[j]] = [pool[j], pool[i]];
        }
        setPicks(pool.slice(0, count));
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [count]);
  if (!picks?.length) return null;
  return (
    <ul className="hp-picks">
      {picks.map((g) => (
        <li key={g.id}>
          <button type="button" className="hp-photo" title={g.name} onClick={() => openApp('boardgames')}>
            <img src={g.thumbnail!} alt="" loading="lazy" />
            <span>{g.name}</span>
          </button>
        </li>
      ))}
    </ul>
  );
}

/** Home page: one bevelled box per page, with its tagline. */
export function ExploreGrid() {
  const { go } = useSite();
  return (
    <ul className="hp-explore">
      {categories.map((c) => (
        <li key={c.id}>
          <button type="button" className="hp-explore__btn" onClick={() => go(c.id)}>
            <strong>{c.label}</strong>
            <span>{c.tagline}</span>
          </button>
        </li>
      ))}
    </ul>
  );
}
