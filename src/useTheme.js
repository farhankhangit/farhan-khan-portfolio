import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = 'fkn-portfolio-theme';
const DEFAULT_THEME = 'dark';

// index.html stamps data-theme on <html> before first paint, so read it back
// here rather than re-deriving it and risking a flash of the wrong theme.
function initialTheme() {
  const stamped = document.documentElement.getAttribute('data-theme');
  if (stamped === 'light' || stamped === 'dark') return stamped;
  try {
    return localStorage.getItem(STORAGE_KEY) || DEFAULT_THEME;
  } catch (err) {
    return DEFAULT_THEME;
  }
}

export default function useTheme() {
  const [theme, setTheme] = useState(initialTheme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch (err) {
      // Private mode or blocked storage: the theme still applies for this visit.
    }
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((current) => (current === 'dark' ? 'light' : 'dark'));
  }, []);

  return {
    theme,
    toggleTheme,
    themeLabel: theme === 'dark' ? 'Light' : 'Dark',
  };
}
