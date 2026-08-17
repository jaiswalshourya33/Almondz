import React from 'react';
import { Target, Compass, ShieldAlert, CheckCircle2 } from 'lucide-react';

export const MissionVision: React.FC = () => {
  return (
    <div className="about-dropdown-page flex flex-col min-h-screen bg-[#fdf9ed] pt-24">
      <section className="bg-[#0D1B2A] text-white py-16 border-b border-[#A49150]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="about-dropdown-banner-copy flex flex-col gap-4 max-w-3xl">
            <span className="text-xs font-mono tracking-widest text-[#F2834C] uppercase">OUR PURPOSE</span>
            <h1 className="text-4xl sm:text-5xl font-serif font-bold">Mission, Vision & Core Values</h1>
            <p className="text-white/80 text-base leading-relaxed">
              Guiding principles that steer Almondz Global Infra-Consultant Limited toward sustainable engineering excellence and national progress.
            </p>
          </div>
        </div>
      </section>

      <section className="about-dropdown-content py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            
            <div className="bg-white border border-[#A49150]/30 p-10 shadow-sm flex flex-col gap-6">
              <div className="w-14 h-14 bg-[#0D1B2A] text-[#F2834C] flex items-center justify-center">
                <Target className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-serif font-bold text-[#0D1B2A]">Our Mission</h2>
              <p className="text-sm text-[#1c1c15]/80 leading-relaxed">
                To deliver world-class infrastructure consultancy, engineering design, and financial advisory solutions that ensure technical integrity, economic viability, and environmental sustainability across every project we undertake.
              </p>
              <ul className="flex flex-col gap-3 pt-4 border-t border-gray-100">
                <li className="flex items-center gap-3 text-xs text-[#1c1c15]/80">
                  <CheckCircle2 className="w-4 h-4 text-[#F2834C] shrink-0" />
                  <span>Uncompromising adherence to international engineering standards</span>
                </li>
                <li className="flex items-center gap-3 text-xs text-[#1c1c15]/80">
                  <CheckCircle2 className="w-4 h-4 text-[#F2834C] shrink-0" />
                  <span>Prudent financial modeling for optimal return on investment</span>
                </li>
                <li className="flex items-center gap-3 text-xs text-[#1c1c15]/80">
                  <CheckCircle2 className="w-4 h-4 text-[#F2834C] shrink-0" />
                  <span>Transparent project management and milestone certification</span>
                </li>
              </ul>
            </div>

            <div className="bg-white border border-[#A49150]/30 p-10 shadow-sm flex flex-col gap-6">
              <div className="w-14 h-14 bg-[#0D1B2A] text-[#F2834C] flex items-center justify-center">
                <Compass className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-serif font-bold text-[#0D1B2A]">Our Vision</h2>
              <p className="text-sm text-[#1c1c15]/80 leading-relaxed">
                To be the most trusted and preferred infrastructure consultancy partner in India and emerging global markets, recognized for pioneering smart urban solutions, high-speed transit corridors, and green energy ecosystems.
              </p>
              <ul className="flex flex-col gap-3 pt-4 border-t border-gray-100">
                <li className="flex items-center gap-3 text-xs text-[#1c1c15]/80">
                  <CheckCircle2 className="w-4 h-4 text-[#F2834C] shrink-0" />
                  <span>Pioneering sustainable and carbon-neutral infrastructure</span>
                </li>
                <li className="flex items-center gap-3 text-xs text-[#1c1c15]/80">
                  <CheckCircle2 className="w-4 h-4 text-[#F2834C] shrink-0" />
                  <span>Empowering regional economic development through robust connectivity</span>
                </li>
                <li className="flex items-center gap-3 text-xs text-[#1c1c15]/80">
                  <CheckCircle2 className="w-4 h-4 text-[#F2834C] shrink-0" />
                  <span>Cultivating a culture of continuous engineering innovation</span>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};
