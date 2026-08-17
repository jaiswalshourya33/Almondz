import React from 'react';
import { LEADERSHIP } from '../data/leadership';
import { Mail } from 'lucide-react';

export const LeadershipPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[#fdf9ed] pt-24">
      {/* Header Banner */}
      <section className="bg-[#0D1B2A] text-white py-16 border-b border-[#A49150]/30 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-[#F2834C]/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col gap-4 max-w-3xl">
            <div className="inline-flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#F2834C]"></span>
              <span className="text-xs font-mono tracking-widest text-[#F2834C] uppercase">STEWARDSHIP</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-serif font-bold tracking-tight">Board of Directors & Leadership Team</h1>
            <p className="text-white/80 text-base leading-relaxed">
              Decades of combined engineering wisdom, financial acumen, and public sector stewardship guiding Almondz Global Infra-Consultant Limited.
            </p>
          </div>
        </div>
      </section>

      {/* Leadership Roster Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {LEADERSHIP.map((leader, idx) => (
              <div 
                key={idx} 
                className="bg-white border border-[#A49150]/30 overflow-hidden shadow-sm hover:shadow-md hover:border-[#F2834C] transition-all duration-300 flex flex-col sm:flex-row group"
              >
                {/* Image Container with fixed ratio & dark navy frame so photos never stretch, crop awkwardly, or overflow */}
                <div className="sm:w-2/5 shrink-0 relative bg-[#0D1B2A] min-h-[260px] sm:min-h-[300px] max-h-[360px] flex items-center justify-center overflow-hidden">
                  <img 
                    src={leader.image} 
                    alt={leader.name}
                    className="w-full h-full object-contain p-2 sm:p-3 group-hover:scale-105 transition-transform duration-500 max-h-[340px]"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 bg-[#0D1B2A]/90 backdrop-blur-sm border border-[#A49150]/30 text-[#F2834C] text-[10px] font-mono px-2.5 py-1 uppercase tracking-wider">
                    {leader.category}
                  </div>
                </div>

                {/* Details Container */}
                <div className="sm:w-3/5 p-6 sm:p-7 flex flex-col justify-between bg-white">
                  <div className="flex flex-col gap-2">
                    <h3 className="text-xl font-serif font-bold text-[#0D1B2A] group-hover:text-[#F2834C] transition-colors">{leader.name}</h3>
                    <div className="text-xs font-mono font-bold text-[#F2834C]">{leader.title}</div>
                    <p className="text-xs text-[#1c1c15]/80 leading-relaxed mt-2">
                      {leader.bio}
                    </p>
                  </div>

                  <div className="pt-5 mt-5 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-[11px] font-mono text-[#A49150]">ALMONDZ LEADERSHIP</span>
                    <a 
                      href="mailto:contact@almondzglobalinfra.com" 
                      className="w-8 h-8 bg-[#0D1B2A] text-white flex items-center justify-center hover:bg-[#F2834C] transition-colors shrink-0" 
                      aria-label={`Email ${leader.name}`}
                    >
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
