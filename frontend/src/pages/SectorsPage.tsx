import React from 'react';
import { SECTORS } from '../data/sectors';
import { SectorCard } from '../components/SectorCard';

export const SectorsPage: React.FC = () => {
  return (
    <div className="dropdown-content-page flex flex-col min-h-screen bg-[#fdf9ed] pt-24">
      <section className="bg-[#0D1B2A] text-white py-16 border-b border-[#A49150]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="dropdown-banner-copy flex flex-col gap-4 max-w-3xl">
            <span className="text-xs font-mono tracking-widest text-[#F2834C] uppercase">INFRASTRUCTURE EXPERTISE</span>
            <h1 className="text-4xl sm:text-5xl font-serif font-bold">All Specialized Sectors ({String(SECTORS.length).padStart(3, '0')})</h1>
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
