import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Mail, Phone, MapPin } from 'lucide-react';
import type { Sector } from '../data/sectors';
import waterTreatmentBanner from '../images/water-treatment-banner.jpg';

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
              <h3 className="scope-reveal text-xl sm:text-2xl font-serif font-bold text-[#18253A]" style={{ ['--i' as string]: 0 }}>
                Services &amp; Scope of Work
              </h3>
              <div className="scope-reveal w-12 h-0.5 bg-[#A49050] rounded-full mt-2 mb-4" style={{ ['--i' as string]: 1 }} />
              <p className="scope-reveal text-xs sm:text-[13.5px] text-[#18253A]/75 leading-relaxed mb-5" style={{ ['--i' as string]: 2 }}>
                Almondz Global Infra-Consultant Limited provides end-to-end consulting and advisory
                solutions across all stages of {sector.title.toLowerCase()} development. Our
                multidisciplinary engineering teams deliver technical rigor, statutory adherence, and
                value engineering for central, state, and private infrastructure authorities.
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
                      <span className="text-xs sm:text-[13px] font-medium text-[#18253A]/85 leading-snug group-hover:text-[#18253A] transition-colors">
                        {srv}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div
              className="scope-reveal mt-5 pt-3.5 border-t border-[#A49050]/15 flex flex-col sm:flex-row sm:items-center justify-between text-[11px] text-[#18253A]/55 gap-1.5"
              style={{ ['--i' as string]: 4 }}
            >
              <span>
                Sector Domain: <strong className="text-[#18253A]/80 font-semibold">{sector.title}</strong>
              </span>
              <span>ISO 9001:2015 Certified Delivery</span>
            </div>
          </div>

          <div className="scope-media scope-media--fromright lg:col-span-5 rounded-2xl overflow-hidden shadow-[0_12px_36px_rgba(13,27,42,0.12)] flex min-h-[280px] sm:min-h-[320px]">
            <img
              src={sector.image}
              alt={sector.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* ROW 2 — Panoramic Banner with Floating White Consultation Card (Image 1 Style) */}
        <div ref={row2Ref} className="gov-banner relative rounded-3xl shadow-2xl overflow-hidden">
          {/* Full-width background image */}
          <img
            src={waterTreatmentBanner}
            alt="Infrastructure facilities and water treatment plant"
            className="gov-banner__image absolute inset-0 w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-[#18253A]/25 via-transparent to-transparent" />

          {/* Floating content card on the right */}
          <div className="relative m-4 sm:m-6 lg:m-8 flex justify-end">
            <div className="gov-banner__card gov-banner__card--right w-full max-w-2xl bg-white rounded-2xl shadow-2xl ring-1 ring-black/5 border-t-4 border-[#A49050] p-6 sm:p-8 flex flex-col gap-4">
              <div>
                <span className="text-xs font-mono tracking-widest text-[#A49050] uppercase">
                  EXECUTIVE CONSULTATION
                </span>
                <h4 className="text-2xl sm:text-3xl font-serif font-bold text-[#18253A] mt-2">
                  Need Sector Consultation?
                </h4>
                <p className="text-sm text-[#18253A]/70 mt-3 leading-relaxed">
                  Speak directly with our senior infrastructure directors and domain experts regarding
                  project feasibility, DPR preparation, or transaction advisory.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[#A49050]/15">
                <div className="flex items-start gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-white border border-[#A49050]/35 flex items-center justify-center shrink-0 text-[#A49050] shadow-sm">
                    <Mail className="w-4 h-4" strokeWidth={2} />
                  </div>
                  <div>
                    <span className="text-[9px] text-[#18253A]/45 uppercase font-semibold tracking-wide block">
                      Email Inquiry
                    </span>
                    <a
                      href="mailto:info@almondz.com"
                      className="text-xs font-medium text-[#18253A] hover:text-[#A49050] transition-colors"
                    >
                      info@almondz.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-white border border-[#A49050]/35 flex items-center justify-center shrink-0 text-[#A49050] shadow-sm">
                    <Phone className="w-4 h-4" strokeWidth={2} />
                  </div>
                  <div>
                    <span className="text-[9px] text-[#18253A]/45 uppercase font-semibold tracking-wide block">
                      Telephone
                    </span>
                    <span className="text-xs font-medium text-[#18253A]">+91 11 4350 0100</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-white border border-[#A49050]/35 flex items-center justify-center shrink-0 text-[#A49050] shadow-sm">
                    <MapPin className="w-4 h-4" strokeWidth={2} />
                  </div>
                  <div>
                    <span className="text-[9px] text-[#18253A]/45 uppercase font-semibold tracking-wide block">
                      Corporate Office
                    </span>
                    <span className="text-xs font-medium text-[#18253A]">New Delhi, India</span>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 bg-[#18253A] hover:bg-[#3E4C60] hover:text-[#D6C489] text-white py-3 px-6 text-xs font-bold uppercase tracking-wider transition-all duration-200 rounded-lg shadow-md w-fit"
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
