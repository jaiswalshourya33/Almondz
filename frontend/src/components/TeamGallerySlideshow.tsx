import React, { useCallback, useEffect, useRef, useState } from 'react';
import photo01 from '../images/gallery/conclave-2025-01.jpg';
import photo02 from '../images/gallery/conclave-2025-02.jpg';
import photo03 from '../images/gallery/conclave-2025-03.jpg';
import photo04 from '../images/gallery/conclave-2025-04.jpg';

interface GalleryPhoto {
  src: string;
  alt: string;
  // Vertical crop positions (CSS object-position). The frame trims part of each
  // 3:2 photo; these decide how that trim splits between the space above the
  // Almondz logo and the floor below people's feet. `focus` is for the 5:3
  // phone/tablet frame (~10% trimmed), `focusLg` for the 2:1 desktop frame
  // (~25% trimmed), where the logo is kept just inside the top edge.
  focus: string;
  focusLg: string;
}

const PHOTOS: GalleryPhoto[] = [
  { src: photo01, alt: 'Almondz colleagues felicitated on stage at Almondz Conclave 2025', focus: '50% 50%', focusLg: '50% 40%' },
  { src: photo02, alt: 'Almondz colleagues at the Conclave 2025 photo wall', focus: '50% 30%', focusLg: '50% 14%' },
  { src: photo03, alt: 'Almondz colleagues standing together at the Conclave 2025 backdrop', focus: '50% 85%', focusLg: '50% 22%' },
  { src: photo04, alt: 'Almondz colleagues at the Conclave 2025 backdrop', focus: '50% 20%', focusLg: '50% 15%' },
];

const INTERVAL_MS = 3000;
const SWIPE_THRESHOLD_PX = 40;

export const TeamGallerySlideshow: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const apply = () => setReducedMotion(mq.matches);
    apply();
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, []);

  const goTo = useCallback((next: number) => {
    setIndex((next + PHOTOS.length) % PHOTOS.length);
  }, []);

  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  // Auto-advance. Restarts whenever the photo changes or the pause state flips,
  // so a manual nav gives the viewer a fresh full interval on the new photo.
  useEffect(() => {
    if (paused || reducedMotion) return;
    const id = window.setTimeout(() => setIndex((i) => (i + 1) % PHOTOS.length), INTERVAL_MS);
    return () => window.clearTimeout(id);
  }, [index, paused, reducedMotion]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); next(); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); prev(); }
  };

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (dx <= -SWIPE_THRESHOLD_PX) next();
    if (dx >= SWIPE_THRESHOLD_PX) prev();
  };

  return (
    // Footer-coloured band: heading above the photos, a short strip below so
    // they don't sit directly on the footer content.
    <div className="bg-[#2B4A6D] pb-4 sm:pb-5 mb-5 sm:mb-8 border-b border-[#A49050]/40 shadow-xs">
      <div className="px-4 sm:px-6 lg:px-8 pt-7 sm:pt-10 pb-5 sm:pb-6 text-center max-w-4xl mx-auto">
        <span className="text-[10px] sm:text-xs font-mono font-bold tracking-widest text-[#D6C489] uppercase block mb-1">
          ORGANISATIONAL HIGHLIGHTS
        </span>
        <h2 className="text-lg sm:text-2xl lg:text-3xl font-serif font-semibold tracking-tight text-white leading-snug">
          Annual Conclave
        </h2>
        <span aria-hidden="true" className="block w-10 h-[2px] bg-[#A49050] mx-auto mt-2.5 sm:mt-3" />
      </div>

      <section
        aria-label="Photographs from Almondz Conclave 2025"
        aria-roledescription="carousel"
        tabIndex={0}
        onKeyDown={onKeyDown}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
        // 5:3 on phones and tablets keeps the logo and full figures in view;
        // desktop drops to 2:1 so the band doesn't run far past the screen.
        // A gold rule closes the band at the bottom.
        className="relative w-full aspect-[5/3] lg:aspect-[2/1] overflow-hidden bg-[#0E1826] border-b-[3px] border-[#A49050] select-none outline-none"
      >
        {PHOTOS.map((photo, i) => (
          <img
            key={photo.src}
            src={photo.src}
            alt={photo.alt}
            aria-hidden={i !== index}
            loading={i === 0 ? 'eager' : 'lazy'}
            decoding="async"
            draggable={false}
            style={{ '--focus': photo.focus, '--focus-lg': photo.focusLg } as React.CSSProperties}
            className={`absolute inset-0 w-full h-full object-cover [object-position:var(--focus)] lg:[object-position:var(--focus-lg)] transition-opacity duration-700 ease-out ${
              i === index ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}

        {/* Soft shade at the foot so the indicators stay legible on bright floors */}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/35 to-transparent pointer-events-none" />

        <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2">
          {PHOTOS.map((photo, i) => (
            <button
              key={photo.src}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Show photograph ${i + 1}`}
              aria-current={i === index}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i === index ? 'w-8 bg-[#A49050]' : 'w-1.5 bg-white/60 hover:bg-white'
              }`}
            />
          ))}
        </div>
      </section>
    </div>
  );
};
