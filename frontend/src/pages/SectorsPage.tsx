import React, { useLayoutEffect, useRef, useState } from 'react';
import { SECTORS } from '../data/sectors';
import { SectorCard } from '../components/SectorCard';

export const SectorsPage: React.FC = () => {
  const heroHeadingRef = useRef<HTMLHeadingElement | null>(null);
  const [heroLineWidth, setHeroLineWidth] = useState<number | null>(null);

  useLayoutEffect(() => {
    const measure = () => {
      const heading = heroHeadingRef.current;
      if (!heading) return;
      const rects = heading.getClientRects();
      const lastRect = rects[rects.length - 1];
      if (lastRect) setHeroLineWidth(lastRect.width);
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  return (
    <div className="dropdown-content-page flex flex-col min-h-screen bg-[#fdf9ed] pt-24">
      <section className="bg-[#1E3A5F] text-white py-16 border-b border-[#A49150]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="dropdown-banner-copy flex flex-col gap-5 max-w-3xl">
            <span className="inline-flex w-fit items-center text-xs font-mono tracking-widest text-[#A49150] uppercase bg-[#A49150]/10 border border-[#A49150]/30 px-4 py-1.5 rounded-full">INFRASTRUCTURE EXPERTISE</span>
            <h1 ref={heroHeadingRef} className="text-4xl sm:text-5xl font-serif font-bold">All Specialized Sectors ({String(SECTORS.length).padStart(3, '0')})</h1>
            <div
              className="services-hero-line h-[3px] bg-[#A49150] rounded-full"
              style={{ width: heroLineWidth ? `${heroLineWidth}px` : '4rem' }}
            ></div>
            <p className="text-white/80 text-base leading-relaxed">
              Explore AGICL's specialised infrastructure consultancy domains.
            </p>
          </div>
        </div>
      </section>

      <section className="dropdown-scroll-content py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SECTORS.map((sector) => (
              <SectorCard key={sector.id} sector={sector} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
