import React from 'react';
import { Link } from 'react-router-dom';
import { Sector } from '../data/sectors';
import { ArrowRight } from 'lucide-react';

interface SectorCardProps {
  sector: Sector;
}

export const SectorCard: React.FC<SectorCardProps> = ({ sector }) => {
  return (
    <Link 
      to={`/sectors/${sector.slug}`}
      className="group relative bg-[#0D1B2A] border border-[#A49150]/20 overflow-hidden flex flex-col justify-between h-[380px] shadow-lg hover:border-[#F2834C] transition-all duration-300"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={sector.image} 
          alt={sector.title}
          className="w-full h-full object-cover opacity-85 group-hover:scale-105 group-hover:opacity-95 transition-all duration-700"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D1B2A] via-[#0D1B2A]/40 to-transparent"></div>
      </div>

      {/* Top Tag */}
      <div className="relative z-10 p-6 flex justify-between items-start">
        <span className="text-[10px] font-mono tracking-widest uppercase bg-[#F2834C] text-white px-2.5 py-1">
          INFRASTRUCTURE SECTOR
        </span>
      </div>

      {/* Content */}
      <div className="relative z-10 p-6 flex flex-col gap-3">
        <h3 className="text-xl font-serif text-white group-hover:text-[#F2834C] transition-colors leading-tight">
          {sector.title}
        </h3>
        <p className="text-xs text-white/70 line-clamp-2 leading-relaxed">
          {sector.shortDesc}
        </p>
        
        <div className="pt-2 flex items-center gap-2 text-xs font-mono font-bold text-[#F2834C] group-hover:translate-x-1 transition-transform">
          <span>EXPLORE EXPERTISE</span>
          <ArrowRight className="w-4 h-4" />
        </div>
      </div>
    </Link>
  );
};
