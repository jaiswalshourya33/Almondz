import React from 'react';
import { ECOSYSTEM_PARTNERS } from '../data/company';
import { EMPANELMENTS } from '../data/certifications';
import { Building2, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const ClientsPartnersPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[#fdf9ed] pt-24">
      <section className="bg-[#0D1B2A] text-white py-16 border-b border-[#A49150]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 max-w-3xl">
            <span className="text-xs font-mono tracking-widest text-[#F2834C] uppercase">INSTITUTIONAL TRUST</span>
            <h1 className="text-4xl sm:text-5xl font-serif font-bold">Clients & Strategic Empanelments</h1>
            <p className="text-white/80 text-base leading-relaxed">
              Partnering with central ministries, state infrastructure corporations, municipal authorities, and multilateral financial institutions.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-mono tracking-widest text-[#A49150] uppercase">OFFICIAL ACCREDITATIONS</span>
            <h2 className="text-3xl font-serif font-bold text-[#0D1B2A] mt-1">Empanelled Agencies & Public Sector Partners</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {EMPANELMENTS.map((emp, idx) => (
              <div key={idx} className="bg-white border border-[#A49150]/30 p-6 shadow-sm flex flex-col gap-3 hover:border-[#F2834C] transition-colors">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 bg-[#0D1B2A] text-white flex items-center justify-center font-mono font-bold text-sm">
                    {emp.name.substring(0, 3)}
                  </div>
                  <span className="text-[10px] font-mono bg-[#F2834C]/10 text-[#F2834C] px-2 py-0.5">VERIFIED</span>
                </div>
                <h3 className="text-lg font-serif font-bold text-[#0D1B2A]">{emp.name}</h3>
                <p className="text-xs text-[#1c1c15]/70 leading-relaxed">{emp.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
