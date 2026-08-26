import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, MapPin, ArrowRight } from 'lucide-react';

const OPEN_ROLES = [
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

export const CareersPage: React.FC = () => {
  const openingsSectionRef = useRef<HTMLElement | null>(null);
  const openingsCardsRef = useRef<HTMLDivElement | null>(null);

  // Same scroll-triggered reveal used on the About Overview page's
  // "Corporate Governance & Leadership" section: heading first, then the
  // cards below stagger in one by one — only once the card row itself
  // scrolls into view, not the moment the section's top edge appears.
  useEffect(() => {
    const openingsSection = openingsSectionRef.current;
    const openingsCards = openingsCardsRef.current;
    if (!openingsSection || !openingsCards || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          openingsSection.classList.add('is-visible');
          observer.unobserve(openingsCards);
        }
      },
      { threshold: 0.35 },
    );

    observer.observe(openingsCards);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="about-dropdown-page flex flex-col min-h-screen bg-[#fdf9ed] pt-24">
      <section className="bg-[#16283D] text-white py-16 border-b border-[#A49150]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="about-dropdown-banner-copy flex flex-col gap-4 max-w-3xl">
            <span className="text-xs font-mono tracking-widest text-[#F2834C] uppercase">JOIN OUR TEAM</span>
            <h1 className="text-4xl sm:text-5xl font-serif font-bold">Careers at Almondz Global Infra</h1>
            <p className="text-white/80 text-base leading-relaxed">
              Build your engineering and advisory career on projects that shape national connectivity and sustainable development.
            </p>
          </div>
        </div>
      </section>

      <section ref={openingsSectionRef} className="about-subnav-section py-20 bg-[#fdf9ed]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="about-subnav-header text-center mb-12">
            <span className="text-xs font-mono tracking-widest text-[#A49150] uppercase">CURRENT OPENINGS</span>
            <h2 className="text-3xl font-serif font-bold text-[#16283D] mt-1">Open Positions</h2>
          </div>

          <div ref={openingsCardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {OPEN_ROLES.map((role, idx) => (
              <div key={idx} className="about-subnav-card bg-white rounded-2xl border border-[#A49150]/20 shadow-sm hover:shadow-xl hover:border-[#F2834C]/50 hover:-translate-y-2 hover:scale-[1.03] transition-all duration-300 p-8 flex flex-col justify-between group">
                <div className="flex flex-col gap-4">
                  <div className="w-14 h-14 rounded-full bg-[#fdf9ed] border border-[#A49150]/20 flex items-center justify-center text-[#16283D] group-hover:text-[#F2834C] group-hover:border-[#F2834C]/40 transition-colors">
                    <Briefcase className="w-6 h-6" />
                  </div>
                  <div className="border-t border-[#A49150]/15" />
                  <span className="text-[10px] font-mono tracking-widest bg-[#F2834C]/10 text-[#F2834C] px-2.5 py-1 w-fit rounded-full">
                    {role.department}
                  </span>
                  <h3 className="text-xl font-serif font-bold text-[#16283D]">{role.title}</h3>
                  <div className="flex items-center gap-4 text-xs font-mono text-[#1c1c15]/60">
                    <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {role.location}</span>
                    <span>• {role.experience}</span>
                  </div>
                  <p className="text-xs text-[#1c1c15]/70 leading-relaxed">{role.description}</p>
                </div>

                <div className="pt-6 mt-6 border-t border-gray-100">
                  <Link
                    to="/contact"
                    state={{ formType: 'career', position: role.title }}
                    className="w-full bg-[#16283D] hover:bg-[#F2834C] text-white py-3.5 text-xs font-mono font-bold tracking-widest uppercase transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2 rounded-md"
                  >
                    <span>Apply Now</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
