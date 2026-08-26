import React, { useEffect, useRef, useState } from 'react';

interface CountUpValueProps {
  value: string;
  start: boolean;
  duration?: number;
  className?: string;
}

const NUMBER_PATTERN = /[\d,]+/;

// Animates the first number found inside `value` from 0 up to its real figure,
// preserving whatever prefix/suffix surrounds it (₹, "Cr+", "sq. km", etc.).
// Every instance shares the same fixed `duration`, so a small figure (e.g. "8")
// and a large one (e.g. "73,000") both start and finish together regardless of
// magnitude, driven by the single `start` flag flipping true.
export const CountUpValue: React.FC<CountUpValueProps> = ({ value, start, duration = 900, className }) => {
  const match = value.match(NUMBER_PATTERN);
  const targetNumber = match ? parseInt(match[0].replace(/,/g, ''), 10) : null;
  const [display, setDisplay] = useState(() => (targetNumber === null ? value : value.replace(NUMBER_PATTERN, '0')));
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!start || targetNumber === null || hasAnimated.current) return;
    hasAnimated.current = true;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplay(value);
      return;
    }

    let frameId: number;
    const startTime = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(targetNumber * eased).toLocaleString('en-US');
      setDisplay(value.replace(NUMBER_PATTERN, current));

      if (progress < 1) {
        frameId = requestAnimationFrame(tick);
      }
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [start, targetNumber, value, duration]);

  return <span className={className}>{display}</span>;
};
