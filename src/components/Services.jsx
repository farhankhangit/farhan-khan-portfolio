import { SERVICES } from '../content';

export default function Services() {
  return (
    <section id="services" className="section">
      <div className="section__inner">
        <h2 className="section__title services__title">What I do</h2>

        <div className="services__grid">
          {SERVICES.map((service) => (
            <div className="service" key={service.num}>
              <span className="service__num">{service.num}</span>
              <h3 className="service__title">{service.title}</h3>
              <p className="service__desc">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
