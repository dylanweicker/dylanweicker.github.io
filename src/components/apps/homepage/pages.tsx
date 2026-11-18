import { useState } from 'react';
import { homeIntro, type HomeCategory } from '@/data/homepage';
import { BlockView, ExploreGrid } from './blocks';

export function HomePage() {
  const [meow, setMeow] = useState(false);

  return (
    <main className="hp__main">
      <section className="hp__box">
        <h1 className="hp__h1">{homeIntro.heading}</h1>
        {homeIntro.body.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </section>

      <div className="hp__passion" role="img" aria-label="Web design is my passion">
        <span className="hp__passion-1">web design is</span>
        <span className="hp__passion-2">my</span>
        <span className="hp__passion-3">
          PASS-
          <br />
          ION
        </span>
        <button
          type="button"
          className="hp__passion-catbtn"
          aria-label="Pet the cat"
          onClick={() => {
            setMeow(true);
            window.setTimeout(() => setMeow(false), 1600);
          }}
        >
          <img className="hp__passion-cat" src="/homepage/ugly-cat.svg" alt="" width={120} height={110} />
        </button>
        {meow && (
          <span className="hp__meow" aria-live="polite">
            meow?!
          </span>
        )}
      </div>

      <section className="hp__box">
        <h2 className="hp__h2">~ Explore ~</h2>
        <ExploreGrid />
      </section>
    </main>
  );
}

export function CategoryPage({ category }: { category: HomeCategory }) {
  return (
    <main className="hp__main">
      <h1 className="hp__h1">{category.label}</h1>
      <p className="hp__intro">{category.intro}</p>
      {category.sections.map((s) => (
        <section key={s.id} id={`hp-${s.id}`} className="hp__box hp__interest">
          <h2 className="hp__h2">{s.title}</h2>
          {s.blocks.map((b, i) => (
            <BlockView key={i} block={b} />
          ))}
          <p className="hp__top">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                (e.currentTarget.closest('.ie__page') as HTMLElement | null)?.scrollTo({ top: 0 });
              }}
            >
              ^ back to top ^
            </a>
          </p>
        </section>
      ))}
    </main>
  );
}
