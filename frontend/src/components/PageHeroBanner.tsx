import React, { useEffect, useRef } from 'react';
import cleanEnergyHero from '../images/hero/clean-energy-infra.jpg';

export interface PageHeroBannerProps {
  line1: string;
  line2: string;
  description: string;
  /** Optional section-specific background image; falls back to the shared clean-energy panorama. */
  backgroundImage?: string;
}

export const PageHeroBanner: React.FC<PageHeroBannerProps> = ({
  line1,
  line2,
  description,
  backgroundImage,
}) => {
  const heroStatementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = heroStatementRef.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.classList.add('is-visible');
      return;
    }

    // Replay the reveal whenever the banner content changes (e.g. switching
    // sectors from the dropdown, which swaps these props without remounting):
    // clear the class and force a reflow so re-adding it restarts the animation.
    el.classList.remove('is-visible');
    void el.offsetWidth;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-visible');
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [line1, line2, description]);

  return (
    <section
      ref={heroStatementRef}
      className="projects-hero-statement relative -mt-24 min-h-[480px] sm:min-h-[560px] flex items-center justify-center pt-44 pb-20 sm:pt-52 sm:pb-28 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#2B4A6D]"
    >
      {/* Panoramic Infrastructure Background Image with Balanced Dark Film */}
      <div className="absolute inset-0 z-0">
        <img
          src={backgroundImage ?? cleanEnergyHero}
          alt={line1}
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B1523]/80 via-[#1B3553]/65 to-[#0B1523]/90 backdrop-brightness-[0.9]"></div>
      </div>

      {/* Floating Text Directly Over Image */}
      <div className="relative z-10 w-full max-w-4xl mx-auto text-center flex flex-col items-center">
        {/* Top decorative accent pill */}
        <span className="brand-statement__rule block h-[2.5px] w-24 sm:w-32 bg-[#D6C489] mb-5 sm:mb-7 rounded-full shadow-sm" aria-hidden="true" />

        {/* Main Content with Staggered Reveal Animation */}
        <div className="space-y-3 sm:space-y-4">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-sans font-bold tracking-tight leading-tight">
            <span className="brand-statement__line block text-white drop-shadow-md">{line1}</span>
            <span className="brand-statement__line block text-[#D6C489] drop-shadow-md">{line2}</span>
          </h1>

          <p className="brand-statement__line text-sm sm:text-base lg:text-lg text-white/90 max-w-2xl mx-auto leading-relaxed font-normal pt-2 drop-shadow-sm">
            {description}
          </p>
        </div>
      </div>

      {/* Ultra-Smooth Fading Gradient Overlay Merging Hero into Page */}
      <div 
        className="absolute inset-x-0 bottom-0 h-28 sm:h-40 bg-gradient-to-b from-transparent via-[#F1F3F5]/60 to-[#F1F3F5] pointer-events-none z-[5]" 
        aria-hidden="true"
      />
    </section>
  );
};
