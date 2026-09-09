import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const ScrollToTop = () => {
  const { pathname } = useLocation();

  // Jump to the top instantly (not smooth) and synchronously — before the newly
  // mounted page runs its effects — so every page's scroll-triggered entrance
  // animations start from a clean, top-of-page state on every visit. A smooth
  // scroll leaves the window parked at the previous page's position for ~1s,
  // during which the new page's IntersectionObservers fire prematurely and the
  // animations look "already played" on repeat visits.
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};
