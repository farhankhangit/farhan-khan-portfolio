import { MARQUEE } from '../content';

// The track holds the list twice and slides exactly -50%, so the second copy
// lands where the first started and the loop reads as continuous.
function Row({ hidden }) {
  return (
    <div className="marquee__row" aria-hidden={hidden || undefined}>
      {MARQUEE.map((item) => (
        <span key={item}>{item}</span>
      ))}
    </div>
  );
}

export default function Marquee() {
  return (
    <div className="marquee">
      <div className="marquee__track">
        <Row />
        <Row hidden />
      </div>
    </div>
  );
}
