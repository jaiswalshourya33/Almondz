import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { COMPANY_STATS } from '../data/company';
import { ShieldCheck, Award, ArrowRight, Target, Users, TrendingUp, Leaf } from 'lucide-react';
import heritageImage from '../images/about-heritage.jpg';
import strengthsImage from '../images/hero/wind-energy.jpg';
import aboutOverviewHero from '../images/hero/about-overview.jpg';
import { GroupCompaniesGraphic } from '../components/GroupCompaniesGraphic';
import { PageHeroBanner } from '../components/PageHeroBanner';
import { revealSectionOnScroll } from '../lib/revealOnScroll';

// "Why Almondz" strength pillars — icon + label + one-line note, matched to the
// six-pillar reference layout. Icons stay on the site's copper accent so the
// block reads as part of the Slate & Copper theme.
const STRENGTH_PILLARS = [
  { icon: Target, title: 'Integrated Approach', desc: 'Seamless continuity across all stages' },
  { icon: Award, title: 'Quality & Compliance', desc: 'Adherence to global standards and best practices' },
  { icon: Users, title: 'Multidisciplinary Expertise', desc: '400+ professionals across diverse domains' },
  { icon: TrendingUp, title: 'Value Optimization', desc: 'Solutions that balance quality, cost and time' },
  { icon: Leaf, title: 'Sustainability Focus', desc: 'Environmentally responsible and future-ready solutions' },
  { icon: ShieldCheck, title: 'Trust & Transparency', desc: 'Strong governance and ethical practices' },
];

export const AboutOverview: React.FC = () => {
  const heritageSectionRef = useRef<HTMLElement | null>(null);
  const strengthsSectionRef = useRef<HTMLElement | null>(null);
  const subNavSectionRef = useRef<HTMLElement | null>(null);
  const subNavHeaderRef = useRef<HTMLDivElement | null>(null);
  const subNavCardsRef = useRef<HTMLDivElement | null>(null);
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

  useEffect(() => {
    const heritageSection = heritageSectionRef.current;
    if (!heritageSection || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          heritageSection.classList.add('is-visible');
          observer.unobserve(heritageSection);
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(heritageSection);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const strengthsSection = strengthsSectionRef.current;
    if (!strengthsSection || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          strengthsSection.classList.add('is-visible');
          observer.unobserve(strengthsSection);
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(strengthsSection);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // Key the reveal off the heading's own position — watching only the card
    // row let the heading sit invisible in a blank gap until the (tall, on
    // mobile) row scrolled into view. The card row is kept as a fallback.
    return revealSectionOnScroll(
      subNavSectionRef.current,
      [subNavHeaderRef.current, subNavCardsRef.current],
      { threshold: 0.55 },
    );
  }, []);

  return (
    <div className="about-overview-page flex flex-col min-h-screen bg-[#F1F3F5] pt-24">
      {/* Header Banner */}
      <PageHeroBanner
        line1="ENGINEERING EXCELLENCE."
        line2="INSTITUTIONAL TRUST."
        description="Almondz Global Infra Consultant Limited (AGICL) is a premier infrastructure consultancy delivering end-to-end engineering, advisory, and sustainable nation-building solutions."
        backgroundImage={aboutOverviewHero}
      />

      {/* Main Content — Legacy Institutional Architectural Monograph */}
      <section ref={heritageSectionRef} className="about-heritage-section py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Unified Monolithic Institutional Plate */}
          <div className="bg-white border border-[#1E3654]/15 rounded-lg shadow-sm overflow-hidden flex flex-col">
            
            {/* Top Architectural Masthead Bar */}
            <div className="bg-[#1E3654] px-5 sm:px-7 py-2.5 border-b border-white/10 flex flex-wrap items-center justify-between gap-2.5 text-white shrink-0">
              <div className="flex items-center gap-2">
                <span className="text-[10px] sm:text-[11px] font-mono tracking-widest text-[#D6C489] uppercase font-bold">
                  ALMONDZ GLOBAL INFRA CONSULTANT LIMITED
                </span>
              </div>
              <div className="text-[10px] sm:text-[11px] font-mono tracking-wider text-white/70 uppercase">
                HISTORIC FOUNDATION 1994 / AGICL EST. 2013
              </div>
            </div>

            {/* Split Layout: Narrative & Ledger (Left) vs Architectural Viewport (Right) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
              
              {/* Left Column: Formal Narrative & Ledger (Pure Light Corporate Canvas) */}
              <div className="lg:col-span-7 p-6 sm:p-8 lg:p-9 flex flex-col justify-between bg-white">
                <div>
                  <span className="text-[11px] font-mono tracking-widest text-[#D96B33] uppercase font-bold block mb-2">
                    OVERVIEW & HERITAGE
                  </span>
                  
                  <h2 className="text-xl sm:text-2xl lg:text-[26px] font-serif font-bold text-[#1E3654] leading-[1.25] tracking-tight">
                    A Legacy of Precision, Integrity, and Nation-Building
                  </h2>
                  
                  <div className="space-y-3.5 text-xs sm:text-[13px] text-[#1E3654]/85 leading-relaxed text-justify mt-4 font-normal">
                    <p>
                      Founded in 2013, Almondz Global Infra Consultant Limited (AGICL) brings over a decade of specialized infrastructure consulting experience, anchored in the larger Almondz Group’s institutional legacy dating back to 1994. AGICL has successfully steered 50+ major national infrastructure projects and currently manages over 100+ active engagements across India and abroad.
                    </p>
                    <p>
                      Our multidisciplinary practice unites senior civil engineers, structural analysts, geotechnical specialists, urban transit planners, financial modelers, and environmental scientists, providing comprehensive lifecycle consultancy from project concept and detailed engineering through independent authority supervision.
                    </p>
                  </div>
                </div>

                {/* Structured Institutional Ledger Matrix */}
                <div className="mt-7 pt-6 border-t border-[#1E3654]/15">
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-5">
                    <div className="border-l-2 border-[#1E3654] pl-3">
                      <div className="text-lg sm:text-xl font-serif font-bold text-[#1E3654]">₹500Cr+</div>
                      <div className="text-[10px] font-mono tracking-wider text-[#1E3654]/60 uppercase mt-0.5">Active Order Book</div>
                    </div>
                    <div className="border-l-2 border-[#D96B33] pl-3">
                      <div className="text-lg sm:text-xl font-serif font-bold text-[#D96B33]">500+</div>
                      <div className="text-[10px] font-mono tracking-wider text-[#1E3654]/60 uppercase mt-0.5">Workforce</div>
                    </div>
                    <div className="border-l-2 border-[#1E3654] pl-3">
                      <div className="text-lg sm:text-xl font-serif font-bold text-[#1E3654]">8+</div>
                      <div className="text-[10px] font-mono tracking-wider text-[#1E3654]/60 uppercase mt-0.5">Core Sectors</div>
                    </div>
                    <div className="border-l-2 border-[#1E3654] pl-3">
                      <div className="text-lg sm:text-xl font-serif font-bold text-[#1E3654]">100+</div>
                      <div className="text-[10px] font-mono tracking-wider text-[#1E3654]/60 uppercase mt-0.5">Completed Projects</div>
                    </div>
                    <div className="border-l-2 border-[#1E3654] pl-3">
                      <div className="text-lg sm:text-xl font-serif font-bold text-[#1E3654]">200+</div>
                      <div className="text-[10px] font-mono tracking-wider text-[#1E3654]/60 uppercase mt-0.5">Active Engagements</div>
                    </div>
                    <div className="border-l-2 border-[#D96B33] pl-3">
                      <div className="text-lg sm:text-xl font-serif font-bold text-[#D96B33]">80+</div>
                      <div className="text-[10px] font-mono tracking-wider text-[#1E3654]/60 uppercase mt-0.5">Empanelments</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Sleek Proportional Architectural Media Viewport (+50px height) */}
              <div className="lg:col-span-5 border-t lg:border-t-0 lg:border-l border-[#1E3654]/15 bg-[#1E3654] flex flex-col justify-between">
                <div className="relative flex-1 min-h-[250px] sm:min-h-[290px] max-h-[390px] overflow-hidden bg-[#101F31]">
                  <img
                    src={heritageImage}
                    alt="Mass Rapid Transit & Elevated Viaducts infrastructure project"
                    className="w-full h-full object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1E3654]/80 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Solid Formal Architectural Caption Footer */}
                <div className="p-4 sm:p-5 bg-[#1E3654] text-white border-t border-white/10 shrink-0">
                  <span className="text-[9px] font-mono tracking-widest text-[#D6C489] uppercase font-bold block mb-1">
                    INFRASTRUCTURE SHOWCASE
                  </span>
                  <h4 className="text-sm sm:text-base font-serif font-bold text-white leading-snug">
                    Mass Rapid Transit & Elevated Viaducts
                  </h4>
                  <p className="text-[11px] sm:text-xs text-white/75 mt-1 leading-relaxed font-normal">
                    Turnkey project management, detailed engineering design & independent authority supervision across key urban corridors.
                  </p>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* WHY ALMONDZ — STRENGTHS SHOWCASE */}
      <section ref={strengthsSectionRef} className="strengths-showcase py-10 sm:py-14 bg-[#F1F3F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="strengths-showcase__inner">
            <div className="strengths-showcase__media" aria-hidden="true">
              <img
                src={strengthsImage}
                alt="Renewable energy infrastructure — wind, hydro and solar"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="strengths-showcase__content">
              <span className="strengths-showcase__eyebrow block text-xs font-mono tracking-widest text-[#A49050] uppercase font-bold">Why Almondz</span>
              <h2 className="strengths-showcase__title text-2xl sm:text-3xl font-serif font-bold text-[#1E3654] mt-1">Our Core Strengths</h2>

              <div className="strengths-grid">
                {STRENGTH_PILLARS.map((pillar) => (
                  <div key={pillar.title} className="strength-item">
                    <h3 className="strength-item__title">{pillar.title}</h3>
                    <p className="strength-item__desc">{pillar.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GROUP COMPANIES — ANIMATED GRAPHIC */}
      <GroupCompaniesGraphic />

      {/* SUB-NAVIGATION — CONSOLIDATED GOVERNANCE DIRECTORY PLATE */}
      <section ref={subNavSectionRef} className="about-subnav-section pt-4 pb-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={subNavHeaderRef} className="about-subnav-header text-center mb-8">
            <span className="text-xs font-mono tracking-widest text-[#A49050] uppercase font-bold">INSTITUTIONAL DIRECTORY</span>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#1E3654] mt-1.5">Corporate Governance & Leadership</h2>
          </div>

          {/* Single Consolidated 3-Column Governance Directory Plate */}
          <div ref={subNavCardsRef} className="bg-white border border-[#1E3654]/20 rounded-lg shadow-sm overflow-hidden grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#1E3654]/15">
            <Link 
              to="/about/mission-vision" 
              className="p-6 sm:p-7 flex flex-col justify-between hover:bg-[#F8FAFC] transition-colors duration-200 group"
            >
              <div>
                <span className="text-[9px] font-mono uppercase tracking-widest text-[#A49050] font-bold block mb-1.5">SECTION 01</span>
                <h3 className="text-base sm:text-lg font-serif font-bold text-[#1E3654] group-hover:text-[#D96B33] transition-colors">Mission & Vision</h3>
                <p className="text-xs text-[#1E3654]/75 mt-2 leading-relaxed font-normal">
                  Our strategic pillars of sustainable engineering, technological innovation, and ethical infrastructure stewardship.
                </p>
              </div>
              <div className="mt-6 flex items-center gap-2 text-xs font-mono font-bold text-[#D96B33] group-hover:translate-x-1 transition-transform">
                <span>Read Mission</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>

            <Link 
              to="/about/leadership" 
              className="p-6 sm:p-7 flex flex-col justify-between hover:bg-[#F8FAFC] transition-colors duration-200 group"
            >
              <div>
                <span className="text-[9px] font-mono uppercase tracking-widest text-[#A49050] font-bold block mb-1.5">SECTION 02</span>
                <h3 className="text-base sm:text-lg font-serif font-bold text-[#1E3654] group-hover:text-[#D96B33] transition-colors">Leadership & Board</h3>
                <p className="text-xs text-[#1E3654]/75 mt-2 leading-relaxed font-normal">
                  Executive profiles of our Board of Directors, managing directors, and senior technical practice leaders.
                </p>
              </div>
              <div className="mt-6 flex items-center gap-2 text-xs font-mono font-bold text-[#D96B33] group-hover:translate-x-1 transition-transform">
                <span>Meet the Board</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>

            <Link 
              to="/about/certifications" 
              className="p-6 sm:p-7 flex flex-col justify-between hover:bg-[#F8FAFC] transition-colors duration-200 group"
            >
              <div>
                <span className="text-[9px] font-mono uppercase tracking-widest text-[#A49050] font-bold block mb-1.5">SECTION 03</span>
                <h3 className="text-base sm:text-lg font-serif font-bold text-[#1E3654] group-hover:text-[#D96B33] transition-colors">Certifications & Empanelments</h3>
                <p className="text-xs text-[#1E3654]/75 mt-2 leading-relaxed font-normal">
                  National accreditation records, ISO certifications, and official empanelments with NHAI, MoRTH, and World Bank.
                </p>
              </div>
              <div className="mt-6 flex items-center gap-2 text-xs font-mono font-bold text-[#D96B33] group-hover:translate-x-1 transition-transform">
                <span>View Credentials</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};
