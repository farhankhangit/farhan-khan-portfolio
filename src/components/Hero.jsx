import { CONTACT_EMAIL, PROFILE } from '../content';

const AVAILABILITY_TEXT = 'Available for new projects';

export default function Hero({ showAvailability = true }) {
  return (
    <section id="top" className="section">
      <div className="hero__inner">
        <div className="hero__copy">
          {showAvailability && (
            <span className="hero__badge">
              <span className="hero__dot" />
              {AVAILABILITY_TEXT}
            </span>
          )}

          <h1 className="hero__title">
            I build fast, reliable websites that turn visitors into customers.
          </h1>

          <p className="hero__lead">
            7+ years turning design files into production Shopify, Magento and custom builds,
            from front-end through backend logic, integrations and tracking. One developer for
            the whole build.
          </p>

          <div className="hero__actions">
            <a className="btn-solid" href="#work">
              View selected work
            </a>
            <a className="btn-ghost" href={`mailto:${CONTACT_EMAIL}`}>
              Email Me
            </a>
          </div>
        </div>

        <div className="panel">
          <div className="panel__bar">
            <span className="panel__dot" />
            <span className="panel__dot" />
            <span className="panel__dot" />
            <span className="panel__path">~/profile</span>
          </div>
          <div className="panel__body">
            {PROFILE.map(([key, value]) => (
              <div className="panel__row" key={key}>
                <span className="panel__key">{key}</span>
                <span>{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
