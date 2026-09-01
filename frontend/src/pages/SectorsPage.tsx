import React from 'react';
import { SECTORS } from '../data/sectors';
import { SectorCard } from '../components/SectorCard';
import { PageHeroBanner } from '../components/PageHeroBanner';

export const SectorsPage: React.FC = () => {
  return (
    <div className="dropdown-content-page flex flex-col min-h-screen bg-[#F1F3F5] pt-24">
      {/* Header Banner with Clean Energy Infrastructure Background */}
      <PageHeroBanner
        line1="INFRASTRUCTURE EXPERTISE."
        line2="SPECIALIZED SECTORS."
        description={`Explore AGICL's comprehensive consultancy and engineering domains across ${SECTORS.length} specialized infrastructure sectors nationwide.`}
      />

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
