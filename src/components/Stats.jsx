import { STATS } from '../content';

export default function Stats() {
  return (
    <section className="section">
      <div className="shell">
        <div className="stats__grid">
          {STATS.map(([value, label]) => (
            <div className="stat" key={label}>
              <span className="stat__value">{value}</span>
              <span className="stat__label">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
