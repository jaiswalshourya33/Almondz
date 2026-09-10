import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import slide01 from '../images/gallery/team-offsite-01.png';
import slide02 from '../images/gallery/team-offsite-02.png';
import slide03 from '../images/gallery/team-offsite-03.png';
import slide04 from '../images/gallery/team-offsite-04.png';

interface GallerySlide {
  src: string;
  caption: string;
  sub: string;
}

const SLIDES: GallerySlide[] = [
  {
    src: slide01,
    caption: 'One Firm, One Team',
    sub: 'The Almondz Global Infra collective at the annual offsite',
  },
  {
    src: slide02,
    caption: 'Building the Next Milestone',
    sub: 'Engineering and advisory leadership, together',
  },
  {
    src: slide04,
    caption: 'Celebrating the Journey',
    sub: 'Marking a hundred crore to a thousand — and beyond',
  },
  {
    src: slide03,
    caption: 'Rooted in People',
    sub: 'The specialists behind every independent engineering mandate',
  },
];

const INTERVAL_MS = 5500;

export const TeamGallerySlideshow: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const regionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const apply = () => setReducedMotion(mq.matches);
    apply();
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, []);

  const goTo = useCallback((next: number) => {
    setIndex((prev) => (next + SLIDES.length) % SLIDES.length);
  }, []);

  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  // Auto-advance. Restarts whenever the slide changes or the pause state flips,
  // so a manual nav gives the viewer a fresh full interval on the new photo.
  useEffect(() => {
    if (paused || reducedMotion) return;
    const id = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % SLIDES.length);
    }, INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [index, paused, reducedMotion]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); next(); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); prev(); }
  };

  return (
    <section
      aria-label="Life at Almondz Global Infra"
      className="relative w-full bg-[#0E1826] overflow-hidden select-none"
    >
      <style>{`
        @keyframes tg-kenburns {
          0%   { transform: scale(1.04) translate3d(0, 0, 0); }
          100% { transform: scale(1.13) translate3d(-1.5%, -1.5%, 0); }
        }
        @keyframes tg-progress {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
        @keyframes tg-caption-in {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Section heading */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 pb-8 text-center">
        <span className="text-[10px] sm:text-[11px] font-mono font-bold tracking-[0.3em] uppercase text-[#A49050]">
          Life At The Firm
        </span>
        <h2 className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-white">
          The People Behind Almondz Global Infra
        </h2>
        <p className="mt-3 text-xs sm:text-sm text-white/60 font-light max-w-2xl mx-auto leading-relaxed">
          A single, closely-knit team of engineers and advisors — captured at our
          annual gathering.
        </p>
      </div>

      {/* Full-bleed slideshow stage */}
      <div
        ref={regionRef}
        tabIndex={0}
        role="group"
        aria-roledescription="carousel"
        onKeyDown={onKeyDown}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
        className="group relative w-full h-[58vh] min-h-[380px] max-h-[760px] sm:h-[70vh] outline-none"
      >
        {/* Slides */}
        {SLIDES.map((slide, i) => {
          const active = i === index;
          return (
            <div
              key={slide.src}
              aria-hidden={!active}
              className="absolute inset-0 transition-opacity duration-[1100ms] ease-in-out will-change-[opacity]"
              style={{ opacity: active ? 1 : 0 }}
            >
              <img
                src={slide.src}
                alt={`${slide.caption} — ${slide.sub}`}
                className="w-full h-full object-cover"
                style={
                  active && !reducedMotion
                    ? { animation: `tg-kenburns ${INTERVAL_MS + 1600}ms linear both` }
                    : { transform: 'scale(1.04)' }
                }
                loading={i === 0 ? 'eager' : 'lazy'}
                draggable={false}
              />
            </div>
          );
        })}

        {/* Cinematic gradient wash for legibility */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#0E1826] via-[#0E1826]/25 to-transparent" />
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-[#0E1826]/55 via-transparent to-[#0E1826]/25" />

        {/* Top progress bar */}
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-white/10 z-20">
          <div
            key={`${index}-${paused}-${reducedMotion}`}
            className="h-full bg-[#A49050] origin-left"
            style={{
              transform: reducedMotion ? 'scaleX(1)' : undefined,
              animation: reducedMotion
                ? undefined
                : `tg-progress ${INTERVAL_MS}ms linear both`,
              animationPlayState: paused ? 'paused' : 'running',
            }}
          />
        </div>

        {/* Caption */}
        <div className="absolute left-0 bottom-0 z-20 w-full px-6 sm:px-10 lg:px-16 pb-16 sm:pb-20">
          <div className="max-w-7xl mx-auto">
            <div key={index} style={{ animation: 'tg-caption-in 700ms cubic-bezier(0.22, 1, 0.36, 1) both' }}>
              <span className="inline-block text-[10px] font-mono font-bold tracking-[0.28em] uppercase text-[#A49050] mb-2">
                {String(index + 1).padStart(2, '0')} / {String(SLIDES.length).padStart(2, '0')}
              </span>
              <h3 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-bold text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.55)]">
                {SLIDES[index].caption}
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-white/75 font-light max-w-xl">
                {SLIDES[index].sub}
              </p>
            </div>
          </div>
        </div>

        {/* Prev / Next controls */}
        <button
          type="button"
          onClick={prev}
          aria-label="Previous photo"
          className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-[#A49050] text-white border border-white/20 backdrop-blur-sm transition-all duration-300 opacity-0 group-hover:opacity-100 focus-visible:opacity-100 hover:scale-105"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          type="button"
          onClick={next}
          aria-label="Next photo"
          className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-[#A49050] text-white border border-white/20 backdrop-blur-sm transition-all duration-300 opacity-0 group-hover:opacity-100 focus-visible:opacity-100 hover:scale-105"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Dot indicators */}
        <div className="absolute right-6 sm:right-10 lg:right-16 bottom-16 sm:bottom-20 z-30 flex items-center gap-2.5">
          {SLIDES.map((slide, i) => (
            <button
              key={slide.src}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Go to photo ${i + 1}`}
              aria-current={i === index}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i === index ? 'w-8 bg-[#A49050]' : 'w-1.5 bg-white/40 hover:bg-white/70'
              }`}
            />
          ))}
        </div>
      </div>

      <div className="h-16 sm:h-20" />
    </section>
  );
};
