import React from 'react';
import { Link } from 'react-router-dom';
import { EMPANELMENT_GROUPS, CLIENTS } from '../data/empanelments';
import { ShieldCheck, Users, Building2 } from 'lucide-react';

const TOTAL_EMPANELMENTS = EMPANELMENT_GROUPS.reduce((sum, group) => sum + group.items.length, 0);

export const ClientsPartnersPage: React.FC = () => {
  return (
    <div className="about-dropdown-page flex flex-col min-h-screen bg-[#fdf9ed] pt-24">
      {/* Hero Header */}
      <section className="bg-[#0D1B2A] text-white py-16 sm:py-20 border-b border-[#A49150]/30 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-[#F2834C]/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="about-dropdown-banner-copy flex flex-col gap-4 max-w-3xl">
            <span className="text-xs font-mono tracking-widest text-[#F2834C] uppercase">INSTITUTIONAL TRUST</span>
            <h1 className="text-4xl sm:text-5xl font-serif font-bold tracking-tight">Empanelments & Clients</h1>
            <p className="text-white/80 text-base leading-relaxed">
              AGICL is empanelled with premier central and state government bodies, national and multilateral institutions, and scheduled banks — and has delivered consultancy assignments for clients spanning central and state government departments, development authorities, PSUs, financial institutions, EPC contractors and private developers.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl">
            <div className="border border-[#A49150]/30 bg-white/5 px-4 py-4">
              <p className="text-2xl font-serif font-bold text-[#F2834C]">{TOTAL_EMPANELMENTS}+</p>
              <p className="text-[10px] font-mono uppercase tracking-widest text-white/60 mt-1">Empanelments</p>
            </div>
            <div className="border border-[#A49150]/30 bg-white/5 px-4 py-4">
              <p className="text-2xl font-serif font-bold text-[#F2834C]">{CLIENTS.length}+</p>
              <p className="text-[10px] font-mono uppercase tracking-widest text-white/60 mt-1">Clients Served</p>
            </div>
            <div className="border border-[#A49150]/30 bg-white/5 px-4 py-4">
              <p className="text-2xl font-serif font-bold text-[#F2834C]">3</p>
              <p className="text-[10px] font-mono uppercase tracking-widest text-white/60 mt-1">Empanelment Categories</p>
            </div>
            <div className="border border-[#A49150]/30 bg-white/5 px-4 py-4">
              <p className="text-2xl font-serif font-bold text-[#F2834C]">25</p>
              <p className="text-[10px] font-mono uppercase tracking-widest text-white/60 mt-1">States Covered</p>
            </div>
          </div>
        </div>
      </section>

      {/* EMPANELMENTS SECTION */}
      <section className="about-dropdown-content py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono tracking-widest text-[#F2834C] uppercase">GOVERNMENT & INSTITUTIONAL RECOGNITION</span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0D1B2A] mt-2">Our Empanelments</h2>
            <p className="text-xs sm:text-sm text-[#1c1c15]/70 mt-3 leading-relaxed">
              AGICL is officially empanelled as an independent engineer, technical advisor, transaction advisor and design consultant across the following categories of institutions.
            </p>
          </div>

          <div className="flex flex-col gap-12">
            {EMPANELMENT_GROUPS.map((group, gIdx) => (
              <div key={gIdx} className="bg-white border border-[#A49150]/30 rounded-md shadow-sm overflow-hidden">
                <div className="flex items-start gap-4 px-6 py-6 border-b border-[#A49150]/20 bg-[#0D1B2A]/5">
                  <div className="w-10 h-10 bg-[#F2834C]/10 text-[#F2834C] flex items-center justify-center rounded-md shrink-0">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-serif font-bold text-[#0D1B2A]">{group.category}</h3>
                    <p className="text-xs text-[#1c1c15]/70 mt-1 leading-relaxed">{group.description}</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3 px-6 py-6">
                  {group.items.map((item, iIdx) => (
                    <div key={iIdx} className="flex items-start gap-2">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#F2834C] mt-0.5 shrink-0" />
                      <span className="text-xs sm:text-[13px] text-[#1c1c15]/85 leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CLIENTS SECTION */}
      <section className="py-20 bg-[#0D1B2A]/5 border-t border-[#A49150]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono tracking-widest text-[#F2834C] uppercase">OUR CLIENT PORTFOLIO</span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0D1B2A] mt-2 flex items-center justify-center gap-3">
              <Users className="w-7 h-7 text-[#F2834C]" />
              Trusted By {CLIENTS.length}+ Organizations
            </h2>
            <p className="text-xs sm:text-sm text-[#1c1c15]/70 mt-3 leading-relaxed">
              Central and state government departments, development authorities, PSUs, national and multilateral financial institutions, EPC contractors and private developers.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-2.5">
            {CLIENTS.map((client, idx) => (
              <span
                key={idx}
                className="bg-white border border-[#A49150]/30 text-[#0D1B2A] text-xs px-3.5 py-2 rounded-full hover:border-[#F2834C] hover:text-[#F2834C] transition-colors"
              >
                {client}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#0D1B2A] text-white text-center">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center gap-5">
          <span className="text-xs font-mono tracking-widest text-[#F2834C] uppercase">QUALITY ASSURANCE</span>
          <h3 className="text-2xl font-serif font-bold">See our ISO certifications and accreditations</h3>
          <Link
            to="/about/certifications"
            className="inline-flex items-center gap-2 bg-[#F2834C] hover:bg-[#e07539] text-white px-6 py-3 text-xs font-mono font-bold tracking-wider uppercase transition-colors rounded-md"
          >
            View Certifications
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ClientsPartnersPage;
