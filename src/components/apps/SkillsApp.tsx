import { profile } from "@/data/profile";
import { skillGroups } from "@/data/skills";

export function SkillsApp() {
  return (
    <div className="sysprops">
      <header className="sysprops__banner">
        <span className="sysprops__logo" aria-hidden="true">
          D
        </span>
        <div>
          <h3>DylanOS</h3>
        </div>
      </header>

      <section className="sysprops__section">
        <h4>System</h4>
        <dl className="sysprops__table">
          <dt>User:</dt>
          <dd>{profile.name}</dd>
          <dt>Role:</dt>
          <dd>
            {profile.role}, {profile.company}
          </dd>
          <dt>Location:</dt>
          <dd>{profile.location}</dd>
        </dl>
      </section>

      <section className="sysprops__section">
        <h4>Installed components</h4>
        {skillGroups.map((g) => (
          <div key={g.name} className="sysprops__group">
            <p className="sysprops__group-name">{g.name}</p>
            <ul className="sysprops__chips">
              {g.items.map((s) => (
                <li key={s} className="chip">
                  {s}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>
    </div>
  );
}
