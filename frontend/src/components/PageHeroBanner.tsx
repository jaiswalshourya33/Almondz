import React, { useEffect, useRef } from 'react';
import cleanEnergyHero from '../images/hero/clean-energy-infra.jpg';

export interface PageHeroBannerProps {
  line1: string;
  line2: string;
  description: string;
}

export const PageHeroBanner: React.FC<PageHeroBannerProps> = ({
  line1,
  line2,
  description,
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
      className="projects-hero-statement relative -mt-24 min-h-[520px] sm:min-h-[600px] flex items-center justify-center pt-48 pb-16 sm:pt-56 sm:pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#18253A]"
    >
      {/* Panoramic Infrastructure Background Image with Balanced Dark Film */}
      <div className="absolute inset-0 z-0">
        <img
          src={cleanEnergyHero}
          alt={line1}
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#101A29]/75 via-[#18253A]/55 to-[#101A29]/80 backdrop-brightness-[0.9]"></div>
      </div>

      {/* Floating Text Directly Over Image */}
      <div className="relative z-10 w-full max-w-4xl mx-auto text-center flex flex-col items-center">
        {/* Top decorative accent rule */}
        <span className="brand-statement__rule block h-[2.5px] w-28 sm:w-36 bg-[#D6C489] mb-6 sm:mb-8 rounded-full shadow-sm" aria-hidden="true" />

        {/* Main Content with Staggered Image 4 Animation */}
        <div className="space-y-3 sm:space-y-4">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-sans font-bold tracking-tight leading-tight">
            <span className="brand-statement__line block text-white drop-shadow-md">{line1}</span>
            <span className="brand-statement__line block text-[#D6C489] drop-shadow-md">{line2}</span>
          </h1>

          <p className="brand-statement__line text-sm sm:text-base lg:text-lg text-white/90 max-w-2xl mx-auto leading-relaxed font-normal pt-2 drop-shadow-sm">
            {description}
          </p>
        </div>

        {/* Bottom decorative accent rule */}
        <span className="brand-statement__rule block h-[2.5px] w-28 sm:w-36 bg-[#D6C489] mt-6 sm:mt-8 rounded-full shadow-sm" aria-hidden="true" />
      </div>
    </section>
  );
};
