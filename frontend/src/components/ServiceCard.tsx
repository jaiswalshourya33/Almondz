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
      to={`/services?service=${service.slug}`}
      className="service-parallax-card group bg-white border border-[#A49150]/30 p-6 flex flex-col justify-between shadow-sm hover:shadow-xl hover:border-[#A49150] transition-all duration-500"
    >
      <div className="service-card__body flex flex-col gap-4">
        <div className="service-card__top flex justify-end items-start">
          <span className="text-[10px] font-mono font-bold tracking-widest text-[#16283D] uppercase">
            CONSULTANCY
          </span>
        </div>

        <h3 className="service-card__title text-lg font-serif text-[#16283D] group-hover:text-[#A49150] transition-colors leading-snug">
          {service.title}
        </h3>

        <p className="service-card__copy text-sm text-[#1c1c15] leading-relaxed">
          {service.shortDesc}
        </p>

        <div className="service-card__list pt-4 border-t border-[#A49150]/20">
          <span className="text-[10px] font-mono font-bold tracking-widest text-[#16283D] uppercase">Key deliverables</span>
          <ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
            {service.deliverables.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs text-[#1c1c15]">
                <CheckCircle2 className="mt-0.5 w-3.5 h-3.5 text-[#A49150] shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="service-card__methodology border-l-2 border-[#A49150] bg-[#fdf9ed] px-3 py-2.5">
          <span className="block text-[10px] font-mono font-bold tracking-widest text-[#16283D] uppercase">Delivery approach</span>
          <p className="mt-1 text-xs leading-relaxed text-[#1c1c15]">{service.methodology}</p>
        </div>
      </div>

      <div className="service-card__footer pt-6 mt-4 border-t border-gray-100 flex items-center justify-between">
        <span className="text-xs font-mono font-bold text-[#16283D] group-hover:text-[#A49150] transition-colors">
          VIEW CAPABILITIES
        </span>
        <ArrowRight className="w-4 h-4 text-[#A49150] group-hover:translate-x-1 transition-transform" />
      </div>
    </Link>
  );
};
