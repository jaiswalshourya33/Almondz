/**
 * Scroll-triggered section reveal.
 *
 * Adds `is-visible` to `section` as soon as any of `targets` scrolls into
 * view. Pass the heading block as the first target so the section reveals off
 * its *own* position — otherwise a tall content block further down the page
 * gates the reveal, and the heading sits invisible in a blank gap until the
 * user scrolls well past it (especially on mobile, where card rows stack
 * tall). Extra targets act as a fallback for deep-link / fast scrolls that
 * skip the heading.
 *
 * No-op under `prefers-reduced-motion: reduce` (the matching `opacity: 0`
 * rules live inside a `prefers-reduced-motion: no-preference` media query, so
 * the content is already visible). Returns a cleanup function.
 */
export function revealSectionOnScroll(
  section: HTMLElement | null,
  targets: Array<Element | null>,
  options: { threshold?: number; onReveal?: () => void } = {},
): () => void {
  const { threshold = 0.4, onReveal } = options;

  if (!section || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return () => {};
  }

  const els = targets.filter((t): t is Element => t != null);
  if (els.length === 0) return () => {};

  const observer = new IntersectionObserver(
    (entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        section.classList.add('is-visible');
        onReveal?.();
        observer.disconnect();
      }
    },
    { threshold },
  );

  els.forEach((el) => observer.observe(el));
  return () => observer.disconnect();
}
