import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { COMPANY_STATS } from '../data/company';
import { ShieldCheck, Award, Building2, ArrowRight } from 'lucide-react';
import heritageImage from '../images/about-heritage.jpg';

export const AboutOverview: React.FC = () => {
  const imageCardRef = useRef<HTMLDivElement>(null);
  const heritageSectionRef = useRef<HTMLElement | null>(null);
  const subNavSectionRef = useRef<HTMLElement | null>(null);
  const subNavCardsRef = useRef<HTMLDivElement | null>(null);

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
    const subNavSection = subNavSectionRef.current;
    const subNavCards = subNavCardsRef.current;
    if (!subNavSection || !subNavCards || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // Watch the card row itself (not the whole section, which also
    // includes the heading) so the reveal fires right when the cards
    // reach the viewport, not the moment the section's top edge peeks in.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          subNavSection.classList.add('is-visible');
          observer.unobserve(subNavCards);
        }
      },
      { threshold: 0.35 },
    );

    observer.observe(subNavCards);
    return () => observer.disconnect();
  }, []);

  const handleImagePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'touch' || !imageCardRef.current) return;

    const bounds = event.currentTarget.getBoundingClientRect();
    const pointerX = (event.clientX - bounds.left) / bounds.width - 0.5;
    const pointerY = (event.clientY - bounds.top) / bounds.height - 0.5;

    imageCardRef.current.style.setProperty('--about-tilt-x', `${pointerY * -7}deg`);
    imageCardRef.current.style.setProperty('--about-tilt-y', `${pointerX * 7}deg`);
    imageCardRef.current.style.setProperty('--about-shift-x', `${pointerX * 10}px`);
    imageCardRef.current.style.setProperty('--about-shift-y', `${pointerY * 10}px`);
  };

  const resetImageCard = () => {
    if (!imageCardRef.current) return;
    imageCardRef.current.style.setProperty('--about-tilt-x', '0deg');
    imageCardRef.current.style.setProperty('--about-tilt-y', '0deg');
    imageCardRef.current.style.setProperty('--about-shift-x', '0px');
    imageCardRef.current.style.setProperty('--about-shift-y', '0px');
  };

  return (
    <div className="about-overview-page flex flex-col min-h-screen bg-[#fdf9ed] pt-24">
      {/* Header Banner */}
      <section className="bg-[#16283D] text-white py-16 border-b border-[#A49150]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="about-banner-copy flex flex-col gap-4 max-w-3xl">
            <span className="text-xs font-mono tracking-widest text-[#F2834C] uppercase">ABOUT ALMONDZ GLOBAL INFRA</span>
            <h1 className="text-4xl sm:text-5xl font-serif font-bold">Engineering Excellence & Institutional Trust</h1>
            <p className="text-white/80 text-base leading-relaxed">
              Almondz Global Infra Consultant Limited (AGICL) is a premier infrastructure consultancy and Public Limited Company, a subsidiary of the publicly listed Almondz Global Securities Limited (AGSL). The firm holds ISO 9001:2015, ISO/IEC 27001:2022, ISO 45001:2018, ISO 14001:2015, and CMMI Level 3 certifications, with an NABL-accredited laboratory certified to ISO/IEC 17025:2017 standards.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section ref={heritageSectionRef} className="about-heritage-section py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="about-heritage-copy lg:col-span-6 flex flex-col gap-6">
              <span className="text-xs font-mono tracking-widest text-[#F2834C] uppercase">OUR HERITAGE</span>
              <h2 className="text-3xl font-serif font-bold text-[#16283D]">A Legacy of Precision, Integrity, and Nation-Building</h2>
              <p className="text-sm text-[#1c1c15]/80 leading-relaxed">
                Founded in 2013, Almondz Global Infra Consultant Limited has over a decade of experience in infrastructure consultancy, backed by the larger Almondz Group's legacy since 1994. AGICL has successfully delivered over 50+ major infrastructure projects and maintains more than 100+ active engagements across India and abroad.
              </p>
              <p className="text-sm text-[#1c1c15]/80 leading-relaxed">
                Our multidisciplinary teams comprise seasoned civil engineers, geotechnical experts, urban planners, financial analysts, and environmental scientists who work in synergy to deliver turnkey consultancy from concept to commissioning.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-[#A49150]/30">
                <div>
                  <div className="text-xl font-serif font-bold text-[#16283D]">₹500Cr+</div>
                  <div className="text-xs font-mono text-[#1c1c15]/60 mt-1">Active Order Book</div>
                </div>
                <div>
                  <div className="text-xl font-serif font-bold text-[#F2834C]">500+</div>
                  <div className="text-xs font-mono text-[#1c1c15]/60 mt-1">Employees</div>
                </div>
                <div>
                  <div className="text-xl font-serif font-bold text-[#16283D]">BBB-</div>
                  <div className="text-xs font-mono text-[#1c1c15]/60 mt-1">CARE Rating</div>
                </div>
                <div>
                  <div className="text-xl font-serif font-bold text-[#16283D]">ISO 9001:2015</div>
                  <div className="text-xs font-mono text-[#1c1c15]/60 mt-1">Certified Quality System</div>
                </div>
                <div>
                  <div className="text-xl font-serif font-bold text-[#16283D]">CMMI Level 3</div>
                  <div className="text-xs font-mono text-[#1c1c15]/60 mt-1">Process Maturity</div>
                </div>
                <div>
                  <div className="text-xl font-serif font-bold text-[#F2834C]">30+ Empanelments</div>
                  <div className="text-xs font-mono text-[#1c1c15]/60 mt-1">Government & Multilateral</div>
                </div>
              </div>
            </div>

            <div className="about-image-entry lg:col-span-6">
              <div
                ref={imageCardRef}
                className="about-image-card relative"
                onPointerMove={handleImagePointerMove}
                onPointerLeave={resetImageCard}
              >
                <img
                  src={heritageImage}
                  alt="Metro infrastructure project"
                  className="w-full h-[450px] object-cover shadow-2xl"
                />
                <div className="absolute -bottom-6 -left-6 bg-[#16283D] text-white p-6 border border-[#A49150]/40 shadow-xl max-w-xs">
                  <div className="text-xl font-serif font-bold text-[#F2834C]">100% Commitment</div>
                  <div className="text-xs text-white/70 font-mono mt-1">Rigorous adherence to international safety and environmental benchmarks.</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SUB-NAVIGATION CARDS */}
      <section ref={subNavSectionRef} className="about-subnav-section py-16 bg-white border-t border-[#A49150]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="about-subnav-header text-center mb-12">
            <span className="text-xs font-mono tracking-widest text-[#A49150] uppercase">EXPLORE FURTHER</span>
            <h2 className="text-3xl font-serif font-bold text-[#16283D] mt-1">Corporate Governance & Leadership</h2>
          </div>

          <div ref={subNavCardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link to="/about/mission-vision" className="about-subnav-card p-8 bg-white rounded-2xl border border-[#A49150]/20 shadow-sm hover:shadow-xl hover:border-[#F2834C]/50 hover:-translate-y-2 hover:scale-[1.03] transition-all duration-300 group">
              <div className="w-14 h-14 rounded-full bg-[#fdf9ed] border border-[#A49150]/20 flex items-center justify-center text-[#16283D] group-hover:text-[#F2834C] group-hover:border-[#F2834C]/40 transition-colors">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div className="border-t border-[#A49150]/15 mt-6 mb-6" />
              <h3 className="text-xl font-serif font-bold text-[#16283D] group-hover:text-[#F2834C] transition-colors">Mission & Vision</h3>
              <p className="text-xs text-[#1c1c15]/70 mt-2 leading-relaxed">Our core pillars of sustainable engineering, innovation, and ethical infrastructure stewardship.</p>
              <div className="mt-6 flex items-center gap-2 text-xs font-mono font-bold text-[#F2834C]">
                <span>Read More</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>

            <Link to="/about/leadership" className="about-subnav-card p-8 bg-white rounded-2xl border border-[#A49150]/20 shadow-sm hover:shadow-xl hover:border-[#F2834C]/50 hover:-translate-y-2 hover:scale-[1.03] transition-all duration-300 group">
              <div className="w-14 h-14 rounded-full bg-[#fdf9ed] border border-[#A49150]/20 flex items-center justify-center text-[#16283D] group-hover:text-[#F2834C] group-hover:border-[#F2834C]/40 transition-colors">
                <Building2 className="w-6 h-6" />
              </div>
              <div className="border-t border-[#A49150]/15 mt-6 mb-6" />
              <h3 className="text-xl font-serif font-bold text-[#16283D] group-hover:text-[#F2834C] transition-colors">Leadership & Board</h3>
              <p className="text-xs text-[#1c1c15]/70 mt-2 leading-relaxed">Meet our Board of Directors, managing directors, and technical practice leaders.</p>
              <div className="mt-6 flex items-center gap-2 text-xs font-mono font-bold text-[#F2834C]">
                <span>Meet the Team</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>

            <Link to="/about/certifications" className="about-subnav-card p-8 bg-white rounded-2xl border border-[#A49150]/20 shadow-sm hover:shadow-xl hover:border-[#F2834C]/50 hover:-translate-y-2 hover:scale-[1.03] transition-all duration-300 group">
              <div className="w-14 h-14 rounded-full bg-[#fdf9ed] border border-[#A49150]/20 flex items-center justify-center text-[#16283D] group-hover:text-[#F2834C] group-hover:border-[#F2834C]/40 transition-colors">
                <Award className="w-6 h-6" />
              </div>
              <div className="border-t border-[#A49150]/15 mt-6 mb-6" />
              <h3 className="text-xl font-serif font-bold text-[#16283D] group-hover:text-[#F2834C] transition-colors">Certifications & Empanelments</h3>
              <p className="text-xs text-[#1c1c15]/70 mt-2 leading-relaxed">View our ISO accreditations and official empanelments with NHAI, MoRTH, and World Bank.</p>
              <div className="mt-6 flex items-center gap-2 text-xs font-mono font-bold text-[#F2834C]">
                <span>View Credentials</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};
