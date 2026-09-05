import { useState } from 'react';

const SECTIONS = [
  ['#work', 'Work'],
  ['#services', 'Services'],
  ['#about', 'About'],
];

export default function Nav({ themeLabel, onToggleTheme }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="nav">
      <div className="nav__inner">
        <a className="nav__brand" href="#top">
          <span className="nav__mark">FK</span>
          <span className="nav__name">Farhan Khan</span>
        </a>

        <div className="nav__links">
          {SECTIONS.map(([href, label]) => (
            <a key={href} className="nav__link" href={href}>
              {label}
            </a>
          ))}

          <button type="button" className="nav__theme" onClick={onToggleTheme}>
            {themeLabel}
          </button>

          <a className="nav__cta" href="#contact">
            Hire me
          </a>

          <button
            type="button"
            className="nav__burger"
            aria-label="Menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="nav__menu">
          {[...SECTIONS, ['#contact', 'Contact']].map(([href, label]) => (
            <a key={href} href={href} onClick={closeMenu}>
              {label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
