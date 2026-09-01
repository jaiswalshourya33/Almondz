import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { SERVICES } from '../data/services';

/* "Services We Provide" — Accenture "Client spotlight" style:
     Left  — a single large preview image for the currently focused service,
             with a short blurb overlaid at the bottom.
     Right — every service name listed compactly in one unified section without scrolling. */

export const ServicesShowcase: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const revealRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = revealRef.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.classList.add('is-visible');
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-visible');
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const activeService = SERVICES[activeIndex];

  return (
    <section className="pt-16 pb-12 bg-[#F1F3F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <span className="text-xs font-mono tracking-widest text-[#A49050] uppercase">WHAT WE DO</span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#18253A] mt-1">Services We Provide</h2>
        </div>

        <div
          ref={revealRef}
          className="services-spotlight grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-6 lg:gap-8 items-stretch"
        >
          {/* LEFT — preview image of the currently focused service */}
          <Link
            to={`/services?service=${activeService.slug}`}
            className="services-spotlight__media group relative block overflow-hidden rounded-2xl shadow-[0_14px_36px_rgba(13,27,42,0.18)] ring-1 ring-[#18253A]/10 min-h-[380px] h-full"
            aria-label={`Open ${activeService.title}`}
          >
            {SERVICES.map((service, index) => (
              <img
                key={service.id}
                src={service.image}
                alt={service.title}
                referrerPolicy="no-referrer"
                aria-hidden={index !== activeIndex}
                className={`absolute inset-0 h-full w-full object-cover object-center transition-[opacity,transform] duration-500 ease-out group-hover:scale-105 ${
                  index === activeIndex ? 'opacity-100' : 'opacity-0'
                }`}
              />
            ))}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B1420] via-[#0B1420]/45 to-transparent" />

            {/* Large watermark index */}
            <span className="absolute right-5 top-4 select-none font-serif text-5xl text-white/20 sm:text-6xl">
              {String(activeIndex + 1).padStart(2, '0')}
            </span>

            {/* Bottom content overlay */}
            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
              <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[#D6C489]">
                AGICL Practice Division
              </span>
              <h3 className="mt-1.5 text-xl font-serif font-bold leading-snug text-white sm:text-2xl">
                {activeService.title}
              </h3>
              <p className="mt-1.5 max-w-xl text-xs leading-relaxed text-white/80 sm:text-sm line-clamp-2 sm:line-clamp-3">
                {activeService.shortDesc}
              </p>
              <span className="mt-3.5 inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#D6C489] group-hover:text-white transition-colors">
                View Details
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1.5" />
              </span>
            </div>
          </Link>

          {/* RIGHT — full list of service names fitted compactly into one section */}
          <ul className="services-spotlight__list flex flex-col justify-between border-y border-[#18253A]/10 divide-y divide-[#18253A]/10 lg:border-none lg:divide-y-0 lg:gap-1.5">
            {SERVICES.map((service, index) => {
              const isActive = index === activeIndex;
              return (
                <li key={service.id}>
                  <Link
                    to={`/services?service=${service.slug}`}
                    onMouseEnter={() => setActiveIndex(index)}
                    onFocus={() => setActiveIndex(index)}
                    onTouchStart={() => setActiveIndex(index)}
                    aria-current={isActive ? 'true' : undefined}
                    className={`group flex items-center gap-3.5 py-2 px-3 transition-all duration-200 lg:rounded-xl ${
                      isActive
                        ? 'lg:bg-white lg:shadow-sm border border-[#A49050]/25'
                        : 'border border-transparent lg:hover:bg-white/60'
                    }`}
                  >
                    <span
                      className={`shrink-0 font-mono text-xs font-bold tabular-nums transition-colors ${
                        isActive ? 'text-[#A49050]' : 'text-[#18253A]/40'
                      }`}
                    >
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span
                      className={`flex-1 font-serif leading-snug truncate transition-colors ${
                        isActive
                          ? 'text-sm sm:text-base font-bold text-[#18253A]'
                          : 'text-sm sm:text-base font-medium text-[#18253A]/70 group-hover:text-[#18253A]'
                      }`}
                    >
                      {service.title}
                    </span>
                    <ArrowRight
                      className={`h-4 w-4 shrink-0 transition-all duration-200 ${
                        isActive
                          ? 'translate-x-0 text-[#A49050] opacity-100'
                          : '-translate-x-1 text-[#18253A]/30 opacity-0 group-hover:translate-x-0 group-hover:opacity-100'
                      }`}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
};
