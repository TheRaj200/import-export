import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Scrolls to top whenever the pathname changes (new route)
export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // If navigating to an in-page hash, let the browser handle it
    if (hash) return;
    // Jump instantly to top on route change
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [pathname, hash]);

  return null;
}
