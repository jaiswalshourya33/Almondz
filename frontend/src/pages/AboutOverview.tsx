import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { COMPANY_STATS } from '../data/company';
import { ShieldCheck, Award, Building2, ArrowRight, CheckCircle2 } from 'lucide-react';
import heritageImage from '../images/about-heritage.jpg';

export const AboutOverview: React.FC = () => {
  const imageCardRef = useRef<HTMLDivElement>(null);

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
      <section className="bg-[#0D1B2A] text-white py-16 border-b border-[#A49150]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="about-banner-copy flex flex-col gap-4 max-w-3xl">
            <span className="text-xs font-mono tracking-widest text-[#F2834C] uppercase">ABOUT ALMONDZ GLOBAL INFRA</span>
            <h1 className="text-4xl sm:text-5xl font-serif font-bold">Engineering Excellence & Institutional Trust</h1>
            <p className="text-white/80 text-base leading-relaxed">
              Almondz Global Infra-Consultant Limited is an ISO 9001:2015 certified public limited consultancy powerhouse dedicated to shaping resilient national infrastructure.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="about-heritage-copy lg:col-span-6 flex flex-col gap-6">
              <span className="text-xs font-mono tracking-widest text-[#F2834C] uppercase">OUR HERITAGE</span>
              <h2 className="text-3xl font-serif font-bold text-[#0D1B2A]">A Legacy of Precision, Integrity, and Nation-Building</h2>
              <p className="text-sm text-[#1c1c15]/80 leading-relaxed">
                Founded with a vision to bridge the gap between complex engineering design and robust financial viability, Almondz has successfully delivered over 50+ major infrastructure projects and maintains more than 100+ active engagements across India and abroad.
              </p>
              <p className="text-sm text-[#1c1c15]/80 leading-relaxed">
                Our multidisciplinary teams comprise seasoned civil engineers, geotechnical experts, urban planners, financial analysts, and environmental scientists who work in synergy to deliver turnkey consultancy from concept to commissioning.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#A49150]/30">
                <div>
                  <div className="text-2xl font-serif font-bold text-[#0D1B2A]">ISO 9001:2015</div>
                  <div className="text-xs font-mono text-[#1c1c15]/60 mt-1">Certified Quality System</div>
                </div>
                <div>
                  <div className="text-2xl font-serif font-bold text-[#F2834C]">30+ Empanelments</div>
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
                  className="w-full h-[450px] object-cover border-4 border-[#0D1B2A] shadow-2xl"
                />
                <div className="absolute -bottom-6 -left-6 bg-[#0D1B2A] text-white p-6 border border-[#A49150]/40 shadow-xl max-w-xs">
                  <div className="text-xl font-serif font-bold text-[#F2834C]">100% Commitment</div>
                  <div className="text-xs text-white/70 font-mono mt-1">Rigorous adherence to international safety and environmental benchmarks.</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SUB-NAVIGATION CARDS */}
      <section className="py-16 bg-white border-t border-[#A49150]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-mono tracking-widest text-[#A49150] uppercase">EXPLORE FURTHER</span>
            <h2 className="text-3xl font-serif font-bold text-[#0D1B2A] mt-1">Corporate Governance & Leadership</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link to="/about/mission-vision" className="p-8 bg-[#fdf9ed] border border-[#A49150]/30 hover:border-[#F2834C] transition-colors group">
              <h3 className="text-xl font-serif text-[#0D1B2A] group-hover:text-[#F2834C] transition-colors">Mission & Vision</h3>
              <p className="text-xs text-[#1c1c15]/70 mt-2 leading-relaxed">Our core pillars of sustainable engineering, innovation, and ethical infrastructure stewardship.</p>
              <div className="mt-4 flex items-center gap-2 text-xs font-mono font-bold text-[#F2834C]">
                <span>Read More</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>

            <Link to="/about/leadership" className="p-8 bg-[#fdf9ed] border border-[#A49150]/30 hover:border-[#F2834C] transition-colors group">
              <h3 className="text-xl font-serif text-[#0D1B2A] group-hover:text-[#F2834C] transition-colors">Leadership & Board</h3>
              <p className="text-xs text-[#1c1c15]/70 mt-2 leading-relaxed">Meet our Board of Directors, managing directors, and technical practice leaders.</p>
              <div className="mt-4 flex items-center gap-2 text-xs font-mono font-bold text-[#F2834C]">
                <span>Meet the Team</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>

            <Link to="/about/certifications" className="p-8 bg-[#fdf9ed] border border-[#A49150]/30 hover:border-[#F2834C] transition-colors group">
              <h3 className="text-xl font-serif text-[#0D1B2A] group-hover:text-[#F2834C] transition-colors">Certifications & Empanelments</h3>
              <p className="text-xs text-[#1c1c15]/70 mt-2 leading-relaxed">View our ISO accreditations and official empanelments with NHAI, MoRTH, and World Bank.</p>
              <div className="mt-4 flex items-center gap-2 text-xs font-mono font-bold text-[#F2834C]">
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
