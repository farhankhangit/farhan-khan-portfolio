import { PROJECTS } from '../content';

function Project({ project }) {
  const media = (
    <div className="project__shot">
      <img src={project.image} alt={project.alt} loading="lazy" />
    </div>
  );

  const body = (
    <div className="project__body">
      <span className="eyebrow">{project.eyebrow}</span>
      <h3 className="project__title">{project.title}</h3>
      <p className="project__desc">{project.description}</p>

      <div className="project__tags">
        {project.tags.map((tag) => (
          <span className="tag" key={tag}>
            {tag}
          </span>
        ))}
      </div>

      <div className="project__links">
        <a className="link-rule" href={project.href} target="_blank" rel="noopener">
          Visit live site ↗
        </a>
        <span className="project__source">Source: private client repo</span>
      </div>
    </div>
  );

  const mediaLeft = project.mediaSide === 'left';

  return (
    <article className={`project project--media-${mediaLeft ? 'left' : 'right'}`}>
      {mediaLeft ? media : body}
      {mediaLeft ? body : media}
    </article>
  );
}

export default function Work() {
  return (
    <section id="work" className="section">
      <div className="section__inner">
        <div className="work__head">
          <h2 className="section__title">Selected work</h2>
          <span className="eyebrow">
            {String(PROJECTS.length).padStart(2, '0')} projects
          </span>
        </div>

        <div className="work__list">
          {PROJECTS.map((project) => (
            <Project key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
