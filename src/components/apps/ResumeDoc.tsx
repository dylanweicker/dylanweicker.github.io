import { profile } from '@/data/profile';
import { skillGroups } from '@/data/skills';
import { certifications, clearance, education, timeline } from '@/data/timeline';
import type { CaseStudy } from '@/lib/types';

function WorkList({ items }: { items: CaseStudy[] }) {
  return (
    <ul className="resume__list">
      {items.map((w) => (
        <li key={w.slug}>
          <strong>{w.title}</strong>
          {w.client && w.client !== profile.company && <> · {w.client}</>} · {w.year}
          <br />
          {w.summary}
        </li>
      ))}
    </ul>
  );
}

/** The résumé itself. Pure markup, so it renders both in the window and on the printable /cv/ page. */
export function ResumeDoc({ work }: { work: CaseStudy[] }) {
  const internal = work.filter((w) => w.client === profile.company);
  const client = work.filter((w) => w.client !== profile.company);
  return (
    <article className="resume">
      <header className="resume__head">
        <h3>{profile.name}</h3>
        <p>
          {profile.role} · {profile.location}
        </p>
        <p className="resume__contact">
          <a href={`mailto:${profile.links.email}`}>{profile.links.email}</a> ·{' '}
          <a href={profile.links.github}>github.com/dylanweicker</a> · <a href={profile.links.linkedin}>LinkedIn</a>
        </p>
      </header>

      <section>
        <h4>Profile</h4>
        <p>{profile.summary}</p>
      </section>

      <section>
        <h4>Experience</h4>
        <ul className="resume__list">
          {timeline.map((t) => (
            <li key={t.org + t.role}>
              <strong>{t.role}</strong> · {t.org} <span className="resume__dates">{t.dates}</span>
              {t.note && (
                <>
                  <br />
                  {t.note}
                </>
              )}
              {t.highlights && (
                <ul className="resume__sublist">
                  {t.highlights.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h4>Client solutions</h4>
        <WorkList items={client} />
      </section>

      <section>
        <h4>Qatalyst platforms &amp; AI tools</h4>
        <WorkList items={internal} />
      </section>

      <section>
        <h4>Skills</h4>
        <ul className="resume__list resume__list--tight">
          {skillGroups.map((g) => (
            <li key={g.name}>
              <strong>{g.name}:</strong> {g.items.join(', ')}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h4>Education</h4>
        <p>
          <strong>{education.degree}</strong> · {education.school}{' '}
          <span className="resume__dates">{education.dates}</span>
        </p>
      </section>

      <section>
        <h4>Certifications &amp; clearance</h4>
        <ul className="resume__list resume__list--tight">
          {certifications.map((c) => (
            <li key={c.name}>
              <strong>{c.name}</strong> · {c.issuer} <span className="resume__dates">{c.year}</span>
            </li>
          ))}
          <li>
            <strong>{clearance}</strong>
          </li>
        </ul>
      </section>
    </article>
  );
}
