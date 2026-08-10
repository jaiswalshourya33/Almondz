import React from 'react';
import { LEADERSHIP } from '../data/leadership';
import { Award, Mail } from 'lucide-react';

export const LeadershipPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[#fdf9ed] pt-24">
      <section className="bg-[#0D1B2A] text-white py-16 border-b border-[#A49150]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 max-w-3xl">
            <span className="text-xs font-mono tracking-widest text-[#F2834C] uppercase">STEWARDSHIP</span>
            <h1 className="text-4xl sm:text-5xl font-serif font-bold">Board of Directors & Leadership Team</h1>
            <p className="text-white/80 text-base leading-relaxed">
              Decades of combined engineering wisdom, financial acumen, and public sector stewardship guiding Almondz Global Infra-Consultant Limited.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {LEADERSHIP.map((leader, idx) => (
              <div key={idx} className="bg-white border border-[#A49150]/30 overflow-hidden shadow-sm flex flex-col sm:flex-row group">
                <div className="sm:w-1/2 relative aspect-[4/5] sm:aspect-auto">
                  <img 
                    src={leader.image} 
                    alt={leader.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4 bg-[#0D1B2A] text-white text-[10px] font-mono px-2.5 py-1">
                    {leader.category}
                  </div>
                </div>

                <div className="sm:w-1/2 p-6 sm:p-8 flex flex-col justify-between">
                  <div className="flex flex-col gap-2">
                    <h3 className="text-xl font-serif font-bold text-[#0D1B2A]">{leader.name}</h3>
                    <div className="text-xs font-mono font-bold text-[#F2834C]">{leader.title}</div>
                    <p className="text-xs text-[#1c1c15]/70 leading-relaxed mt-2">{leader.bio}</p>
                  </div>

                  <div className="pt-6 mt-6 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-[11px] font-mono text-[#A49150]">ALMONDZ LEADERSHIP</span>
                    <a href="mailto:contact@almondzglobalinfra.com" className="w-8 h-8 bg-[#0D1B2A] text-white flex items-center justify-center hover:bg-[#F2834C] transition-colors" aria-label="Email leader">
                      <Mail className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
