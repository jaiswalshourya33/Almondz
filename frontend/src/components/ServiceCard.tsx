import React from 'react';
import { Link } from 'react-router-dom';
import { Service } from '../data/services';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

interface ServiceCardProps {
  service: Service;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  return (
    <Link 
      to={`/services/${service.slug}`}
      className="group bg-white border border-[#A49150]/30 p-6 flex flex-col justify-between shadow-sm hover:shadow-xl hover:border-[#F2834C] transition-all duration-300"
    >
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-start">
          <div className="w-10 h-10 bg-[#0D1B2A] text-white flex items-center justify-center font-mono text-sm font-bold group-hover:bg-[#F2834C] transition-colors">
            AZ
          </div>
          <span className="text-[10px] font-mono tracking-widest text-[#A49150] uppercase">
            CONSULTANCY
          </span>
        </div>

        <h3 className="text-lg font-serif text-[#0D1B2A] group-hover:text-[#F2834C] transition-colors leading-snug">
          {service.title}
        </h3>

        <p className="text-xs text-[#1c1c15]/70 line-clamp-3 leading-relaxed">
          {service.shortDesc}
        </p>

        <ul className="flex flex-col gap-1.5 pt-2 border-t border-[#A49150]/20">
          {service.deliverables.slice(0, 2).map((item, idx) => (
            <li key={idx} className="flex items-center gap-2 text-xs text-[#1c1c15]/80">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#F2834C] shrink-0" />
              <span className="line-clamp-1">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="pt-6 mt-4 border-t border-gray-100 flex items-center justify-between">
        <span className="text-xs font-mono font-bold text-[#0D1B2A] group-hover:text-[#F2834C] transition-colors">
          VIEW CAPABILITIES
        </span>
        <ArrowRight className="w-4 h-4 text-[#F2834C] group-hover:translate-x-1 transition-transform" />
      </div>
    </Link>
  );
};
