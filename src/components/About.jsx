import { ABOUT_LEAD, ROLES } from '../content';

export default function About() {
  return (
    <section id="about" className="section">
      <div className="about__inner">
        <div className="eyebrow">About</div>

        <div className="about__body">
          <p className="about__lead">{ABOUT_LEAD}</p>

          <div className="about__roles">
            {ROLES.map((role) => (
              <div className="role" key={role.title}>
                <div className="role__head">
                  <h3 className="role__title">{role.title}</h3>
                  <span className="role__dates">{role.dates}</span>
                </div>
                <ul className="role__points">
                  {role.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
