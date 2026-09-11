import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Mail, Phone, MapPin } from 'lucide-react';
import type { Sector } from '../data/sectors';
import waterTreatmentBanner from '../images/water-treatment-banner.jpg';
import ctaRoadsHighways from '../images/cta-roads-highways.png';
import sectorRailways from '../images/sector-railways.jpg';
import ctaTourismInfra from '../images/cta-tourism-infrastructure.png';
import ctaMining from '../images/cta-mining.png';
import ctaRenewableEnergy from '../images/cta-renewable-energy.png';
import financialAdvisoryDesk from '../images/financial-advisory-desk.png';
import urbanCommandCentre from '../images/urban-command-centre.png';

// "Need Sector Consultation?" panoramic banner photo, matched per sector
const CONSULTATION_BANNERS: Record<string, string> = {
  'roads-highways': ctaRoadsHighways,
  'railways-metro': sectorRailways,
  'banking-finance': financialAdvisoryDesk,
  'urban-infrastructure': urbanCommandCentre,
  'water-irrigation': waterTreatmentBanner,
  'tourism-infrastructure': ctaTourismInfra,
  mining: ctaMining,
  'renewable-energy': ctaRenewableEnergy,
};

const BANNER_POSITIONS: Record<string, string> = {
  'roads-highways': 'center center',
  'railways-metro': 'center 30%',
  'banking-finance': 'center center',
  'urban-infrastructure': 'center center',
  'water-irrigation': 'center center',
  'tourism-infrastructure': 'center 40%',
  mining: 'center center',
  'renewable-energy': 'center 40%',
};

/* Sector "Services & Scope of Work" + "Need Sector Consultation?":
     Row 1 — compact scope copy (left) + sector photo stretched to equal height (right)
     Row 2 — panoramic background banner with floating consultation card (matching Image 1 / Management Leadership style) */

const useReveal = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-visible');
          observer.unobserve(el);
        }
      },
      { threshold: 0.18 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
};

const useBannerReveal = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio >= 0.35) {
          el.classList.add('is-centered');
        }
        if (entry.isIntersecting) {
          el.classList.add('is-visible');
        }
        if (el.classList.contains('is-visible') && el.classList.contains('is-centered')) {
          observer.disconnect();
        }
      },
      { threshold: [0, 0.35] },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
};

interface Props {
  sector: Sector;
}

export const SectorScopeShowcase: React.FC<Props> = ({ sector }) => {
  const row1Ref = useReveal();
  const row2Ref = useBannerReveal();

  return (
    <section className="sector-scope-section py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-10 lg:gap-14">

        {/* ROW 1 — Scope copy (left) + Sector photo with equal height and tight gap (right) */}
        <div ref={row1Ref} className="scope-row grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-stretch">
          <div className="scope-card lg:col-span-7 bg-white border border-[#A49050]/15 rounded-2xl p-6 sm:p-7 shadow-[0_8px_30px_rgba(13,27,42,0.06)] flex flex-col justify-between">
            <div>
              <h3 className="scope-reveal text-xl sm:text-2xl font-serif font-bold text-[#2B4A6D]" style={{ ['--i' as string]: 0 }}>
                Services &amp; Scope of Work
              </h3>
              <div className="scope-reveal w-12 h-0.5 bg-[#A49050] rounded-full mt-2 mb-4" style={{ ['--i' as string]: 1 }} />
              <p className="scope-reveal text-xs sm:text-[13.5px] text-black leading-relaxed mb-5 font-normal" style={{ ['--i' as string]: 2 }}>
                Almondz Global Infra-Consultant Limited provides end-to-end consulting and advisory
                solutions for {sector.title}. Our multidisciplinary engineering teams deliver
                technical rigor, statutory adherence, and value engineering for central, state, and
                private infrastructure authorities.
              </p>

              <div className="border-t border-[#A49050]/15">
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-0.5">
                  {sector.services.map((srv, idx) => (
                    <li
                      key={idx}
                      className="scope-bullet flex items-start gap-2.5 py-2.5 border-b border-[#A49050]/10 group"
                      style={{ ['--bullet-i' as string]: idx }}
                    >
                      <ChevronRight className="w-3.5 h-3.5 text-[#A49050] shrink-0 mt-0.5 transition-transform group-hover:translate-x-0.5" />
                      <span className="text-xs sm:text-[13px] font-medium text-black leading-snug group-hover:text-[#2B4A6D] transition-colors">
                        {srv}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div
              className="scope-reveal mt-5 pt-3.5 border-t border-[#A49050]/15 flex flex-col sm:flex-row sm:items-center justify-between text-[11px] text-gray-600 gap-1.5"
              style={{ ['--i' as string]: 4 }}
            >
              <span>
                Sector Domain: <strong className="text-black font-semibold">{sector.title}</strong>
              </span>
              <span>ISO 9001:2015 Certified Delivery</span>
            </div>
          </div>

          {/* The image column never drives the row height — it only matches the
             content card. Its <img> is absolutely positioned so it contributes
             no intrinsic height; the grid's items-stretch then sizes this box to
             the content card and object-cover crops the photo to fit. The
             min-height is only a floor for the stacked (mobile) layout. */}
          <div className="scope-media scope-media--fromright lg:col-span-5 relative rounded-2xl overflow-hidden shadow-[0_12px_36px_rgba(13,27,42,0.12)] min-h-[280px] sm:min-h-[320px]">
            <img
              src={sector.image}
              alt={sector.title}
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover"
              style={{ objectPosition: sector.imagePosition }}
            />
          </div>
        </div>

        {/* ROW 2 — Panoramic Banner with Embedded Consultation Content */}
        <div ref={row2Ref} className="gov-banner relative rounded-lg shadow-xl overflow-hidden min-h-[420px] flex items-center">
          {/* Full-width background image — dynamically matched per sector */}
          <img
            key={sector.slug}
            src={CONSULTATION_BANNERS[sector.slug] ?? sector.image ?? waterTreatmentBanner}
            alt={`${sector.title} — sector consultation`}
            className="gov-banner__image absolute inset-0 w-full h-full object-cover"
            style={{ objectPosition: BANNER_POSITIONS[sector.slug] || 'center center' }}
          />
          {/* Directional gradient overlay: keeps panoramic image visible on the left while providing crisp contrast for text on the right */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-[#101A29]/75 to-[#101A29]/95 sm:via-[#101A29]/65 sm:to-[#101A29]/92" />

          {/* Embedded content directly inside the banner */}
          <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 py-10 sm:py-14 flex justify-end">
            <div className="gov-banner__card gov-banner__card--right w-full max-w-2xl flex flex-col gap-5">
              <div>
                <span className="text-xs font-mono tracking-widest text-[#D6C489] uppercase font-bold">
                  EXECUTIVE CONSULTATION
                </span>
                <h4 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-white mt-1.5 leading-tight">
                  Need Sector Consultation?
                </h4>
                <p className="text-sm sm:text-[15px] text-white/90 mt-2.5 leading-relaxed font-light">
                  Speak directly with our senior infrastructure directors and domain experts regarding
                  project feasibility, DPR preparation, or transaction advisory.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/15">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-full bg-white/10 border border-white/20 flex items-center justify-center shrink-0 text-[#D6C489] shadow-sm backdrop-blur-sm">
                    <Mail className="w-4 h-4" strokeWidth={2} />
                  </div>
                  <div>
                    <span className="text-[10px] text-white/60 uppercase font-semibold tracking-wider block font-mono">
                      Email Inquiry
                    </span>
                    <a
                      href="mailto:delhi@almondz.com"
                      className="text-xs sm:text-[13px] font-medium text-white hover:text-[#D6C489] transition-colors"
                    >
                      delhi@almondz.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-full bg-white/10 border border-white/20 flex items-center justify-center shrink-0 text-[#D6C489] shadow-sm backdrop-blur-sm">
                    <Phone className="w-4 h-4" strokeWidth={2} />
                  </div>
                  <div>
                    <span className="text-[10px] text-white/60 uppercase font-semibold tracking-wider block font-mono">
                      Telephone
                    </span>
                    <span className="text-xs sm:text-[13px] font-medium text-white">+91 11 4350 0100</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-full bg-white/10 border border-white/20 flex items-center justify-center shrink-0 text-[#D6C489] shadow-sm backdrop-blur-sm">
                    <MapPin className="w-4 h-4" strokeWidth={2} />
                  </div>
                  <div>
                    <span className="text-[10px] text-white/60 uppercase font-semibold tracking-wider block font-mono">
                      Corporate Office
                    </span>
                    <span className="text-xs sm:text-[13px] font-medium text-white">New Delhi, India</span>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 bg-[#D96B33] hover:bg-[#C25A28] text-white py-3 px-6 text-xs font-mono font-bold tracking-widest uppercase transition-all duration-200 rounded-md shadow-lg w-fit"
                >
                  <span>Contact Us</span>
                  <span aria-hidden>&rarr;</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
