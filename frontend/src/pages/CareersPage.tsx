import React, { useState } from 'react';
import { Briefcase, MapPin, ArrowRight, CheckCircle2 } from 'lucide-react';

export const CareersPage: React.FC = () => {
  const [appliedRole, setAppliedRole] = useState<string | null>(null);

  const openRoles = [
    {
      title: "Senior Highway & Tunnel Design Engineer",
      location: "New Delhi / Remote",
      experience: "8-12 Years",
      department: "Highways & Tunnels",
      description: "Looking for seasoned civil engineers with expertise in IRC guidelines, alignment design, and tunnel safety systems."
    },
    {
      title: "Project Finance & PPP Transaction Analyst",
      location: "Mumbai / New Delhi",
      experience: "5-8 Years",
      department: "Financial Consultancy",
      description: "Expertise in financial modeling, concession agreement drafting, and TEV studies for mega infrastructure assets."
    },
    {
      title: "Resident Independent Engineer (LE)",
      location: "Various Sites Across India",
      experience: "10+ Years",
      department: "Project Management Consultancy (PMC)",
      description: "Supervising highway construction execution, material testing compliance, and milestone certifications on site."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#fdf9ed] pt-24">
      <section className="bg-[#0D1B2A] text-white py-16 border-b border-[#A49150]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 max-w-3xl">
            <span className="text-xs font-mono tracking-widest text-[#F2834C] uppercase">JOIN OUR TEAM</span>
            <h1 className="text-4xl sm:text-5xl font-serif font-bold">Careers at Almondz Global Infra</h1>
            <p className="text-white/80 text-base leading-relaxed">
              Build your engineering and advisory career on projects that shape national connectivity and sustainable development.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-mono tracking-widest text-[#A49150] uppercase">CURRENT OPENINGS</span>
            <h2 className="text-3xl font-serif font-bold text-[#0D1B2A] mt-1">Open Positions</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {openRoles.map((role, idx) => (
              <div key={idx} className="bg-white border border-[#A49150]/30 p-8 shadow-sm flex flex-col justify-between">
                <div className="flex flex-col gap-3">
                  <span className="text-[10px] font-mono tracking-widest bg-[#F2834C]/10 text-[#F2834C] px-2.5 py-1 w-fit">
                    {role.department}
                  </span>
                  <h3 className="text-xl font-serif font-bold text-[#0D1B2A]">{role.title}</h3>
                  <div className="flex items-center gap-4 text-xs font-mono text-[#1c1c15]/60">
                    <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {role.location}</span>
                    <span>• {role.experience}</span>
                  </div>
                  <p className="text-xs text-[#1c1c15]/70 leading-relaxed mt-2">{role.description}</p>
                </div>

                <div className="pt-6 mt-6 border-t border-gray-100">
                  <button
                    onClick={() => setAppliedRole(role.title)}
                    className="w-full bg-[#0D1B2A] hover:bg-[#F2834C] text-white py-3.5 text-xs font-mono font-bold tracking-widest uppercase transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 rounded-none border border-[#0D1B2A]/20"
                  >
                    APPLY NOW
                  </button>
                </div>
              </div>
            ))}
          </div>

          {appliedRole && (
            <div className="mt-12 bg-[#0D1B2A] text-white p-8 border border-[#A49150] text-center max-w-xl mx-auto shadow-2xl">
              <h3 className="text-xl font-serif font-bold text-[#F2834C]">Application Received for {appliedRole}</h3>
              <p className="text-xs text-white/80 mt-2">Thank you for your interest. Our HR team will review your credentials and contact you shortly.</p>
              <button 
                onClick={() => setAppliedRole(null)} 
                className="mt-6 px-6 py-2.5 bg-white/10 hover:bg-white/25 text-xs font-mono font-bold tracking-widest uppercase transition-all duration-300 shadow hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 border border-white/20"
              >
                Close
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
