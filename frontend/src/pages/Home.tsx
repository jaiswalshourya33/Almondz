import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SECTORS } from '../data/sectors';
import { SERVICES } from '../data/services';
import { PROJECTS, Project } from '../data/projects';
import { COMPANY_STATS, LIFECYCLE_STAGES } from '../data/company';
import { ServiceCard } from '../components/ServiceCard';
import { ProjectCard } from '../components/ProjectCard';
import { ProjectVideoModal } from '../components/ProjectVideoModal';
import { ProjectDetailsModal } from '../components/ProjectDetailsModal';
import { ArrowRight, ShieldCheck, Award, Building2, Compass, CheckCircle2, Play, ChevronRight, FileText } from 'lucide-react';
import nhaiLogo from '../images/partners/nhai.jpg';
import morthLogo from '../images/partners/morth.svg';
import worldBankLogo from '../images/partners/world-bank.svg';
import adbLogo from '../images/partners/adb.svg';
import ddaLogo from '../images/partners/dda.png';
import mmrdaLogo from '../images/partners/mmrda.png';
import nitiAayogLogo from '../images/partners/niti-aayog.svg';

const PARTNER_LOGOS = [
  { name: 'NHAI', logo: nhaiLogo },
  { name: 'MoRTH', logo: morthLogo },
  { name: 'World Bank', logo: worldBankLogo },
  { name: 'Asian Development Bank', logo: adbLogo },
  { name: 'Delhi Development Authority', logo: ddaLogo },
  { name: 'MMRDA', logo: mmrdaLogo },
  { name: 'NITI Aayog', logo: nitiAayogLogo }
];

export const Home: React.FC = () => {
  const [activeVideo, setActiveVideo] = useState<{ url: string; title: string } | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const backgroundImages = [
    {
      url: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=2000&q=85",
      caption: "Highways & Expressways"
    },
    {
      url: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=2000&q=85",
      caption: "Mass Rapid Transit & Metros"
    },
    {
      url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2000&q=85",
      caption: "Smart Cities & Urban Planning"
    },
    {
      url: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=2000&q=85",
      caption: "Energy Grids & Power Infrastructure"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [backgroundImages.length]);

  const handleOpenVideo = (url: string, title: string) => {
    setActiveVideo({ url, title });
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#fdf9ed]">
      
      {/* HERO SECTION */}
      <section className="relative group min-h-[92vh] flex items-center justify-center bg-[#0D1B2A] text-white overflow-hidden pt-24 pb-16">
        {/* Background Slideshow */}
        <div className="absolute inset-0 z-0">
          {backgroundImages.map((img, idx) => (
            <div
              key={idx}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                idx === currentImageIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
            >
              <img 
                src={img.url} 
                alt={img.caption}
                className="w-full h-full object-cover transform scale-105 group-hover:scale-110 transition-transform duration-700 ease-out"
                referrerPolicy="no-referrer"
              />
            </div>
          ))}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0D1B2A]/70 via-[#0D1B2A]/45 to-[#071A2D]/30 z-20"></div>
          <div className="absolute inset-0 bg-[radial-gradient(#A49150_1px,transparent_1px)] [background-size:32px_32px] opacity-10 z-20"></div>

          {/* Slideshow indicators / caption badge */}
          <div className="absolute bottom-6 right-6 z-30 hidden sm:flex items-center gap-2 bg-black/40 backdrop-blur-md px-4 py-2 border border-white/20 rounded-md">
            <span className="text-[10px] font-mono text-[#F2834C] tracking-widest uppercase">FEATURING:</span>
            <span className="text-xs font-mono text-white">{backgroundImages[currentImageIndex].caption}</span>
            <div className="flex items-center gap-1.5 ml-3">
              {backgroundImages.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  onClick={() => setCurrentImageIndex(dotIdx)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    dotIdx === currentImageIndex ? 'bg-[#F2834C] w-4' : 'bg-white/50 hover:bg-white'
                  }`}
                  aria-label={`Slide ${dotIdx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-8 flex flex-col gap-6">
              <div className="inline-flex items-center gap-2 bg-[#F2834C]/20 border border-[#F2834C]/50 px-3.5 py-1.5 w-fit">
                <span className="w-2 h-2 rounded-full bg-[#F2834C] animate-ping"></span>
                <span className="text-xs font-mono tracking-widest text-[#F2834C] uppercase">ISO 9001:2015 CERTIFIED INFRASTRUCTURE CONSULTANT</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-sans font-normal tracking-tight text-white/95 leading-[1.2]">
                Engineering the <span className="text-[#F2834C] font-serif italic font-medium">Infrastructure</span> That Moves India Forward.
              </h1>

              <p className="text-base sm:text-lg text-white/80 max-w-2xl leading-relaxed font-light mt-3">
                From concept to commissioning, Almondz Global Infra-Consultant Limited delivers world-class engineering design, techno-economic feasibility, independent engineering, and project management across highways, metros, smart cities, and energy grids.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-4">
                <Link
                  to="/projects"
                  className="bg-[#F2834C] hover:bg-[#d9723f] text-white px-8 py-4 text-xs font-mono font-bold tracking-widest uppercase transition-all duration-300 shadow-xl hover:shadow-[#F2834C]/30 hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-3 rounded-md border border-[#F2834C]/20"
                >
                  <span>EXPLORE PROJECTS</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  to="/services"
                  className="bg-white/15 hover:bg-white/25 text-white border border-white/30 px-8 py-4 text-xs font-mono font-bold tracking-widest uppercase transition-all duration-300 backdrop-blur-md rounded-md shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0"
                >
                  OUR SERVICES
                </Link>

                <button
                  onClick={() => handleOpenVideo("https://www.youtube.com/embed/dQw4w9WgXcQ", "Almondz Corporate Overview")}
                  className="group flex items-center gap-3 text-xs font-mono font-bold text-white hover:text-[#F2834C] transition-all px-4 py-2"
                >
                  <div className="w-10 h-10 rounded-full border border-[#F2834C]/60 group-hover:border-[#F2834C] flex items-center justify-center text-[#F2834C] bg-[#F2834C]/10 group-hover:bg-[#F2834C]/20 transition-all shadow-md group-hover:scale-105">
                    <Play className="w-4 h-4 fill-[#F2834C] ml-0.5" />
                  </div>
                  <span>WATCH SHOWCASE</span>
                </button>
              </div>
            </div>

            {/* Hero Quick Metrics Panel */}
            <div className="lg:col-span-4 bg-[#071A2D]/90 border border-[#A49150]/40 p-6 sm:p-8 backdrop-blur-md shadow-2xl flex flex-col gap-6">
              <div className="border-b border-white/10 pb-4">
                <span className="text-xs font-mono tracking-widest text-[#A49150]">AT A GLANCE</span>
                <h3 className="text-xl font-serif text-white mt-1">Institutional Excellence</h3>
              </div>

              <div className="grid grid-cols-1 gap-5">
                <div>
                  <div className="text-3xl font-serif font-bold text-[#F2834C]">50+</div>
                  <div className="text-xs text-white/70 font-mono mt-1">Completed Infrastructure Projects</div>
                </div>
                <div>
                  <div className="text-3xl font-serif font-bold text-white">100+</div>
                  <div className="text-xs text-white/70 font-mono mt-1">Ongoing Engagements & Audits</div>
                </div>
                <div>
                  <div className="text-3xl font-serif font-bold text-[#A49150]">30+</div>
                  <div className="text-xs text-white/70 font-mono mt-1">Government Empanelments & Accreditations</div>
                </div>
              </div>

              <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs font-mono text-white/60">
                <span>PUBLIC LIMITED</span>
                <span className="text-[#F2834C]">BSE / NSE LISTED</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* STATS TICKER BAR */}
      <section className="bg-[#071A2D] border-b border-[#A49150]/30 py-6 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {COMPANY_STATS.map((stat, idx) => (
              <div key={idx} className="flex flex-col items-center justify-center border-r last:border-0 border-white/10 px-4">
                <div className="text-2xl sm:text-3xl font-serif font-bold text-[#F2834C]">{stat.value}</div>
                <div className="text-xs font-mono text-white/70 mt-1 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
            <div className="flex flex-col items-center justify-center px-4">
              <div className="text-2xl sm:text-3xl font-serif font-bold text-white">ISO 9001</div>
              <div className="text-xs font-mono text-white/70 mt-1 uppercase tracking-wider">Certified Quality Standards</div>
            </div>
          </div>
        </div>
      </section>

      {/* ECOSYSTEM PARTNERS / ACCREDITATIONS */}
      <section className="py-12 bg-white border-b border-gray-200 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <span className="text-xs font-mono tracking-widest text-[#A49150] uppercase">TRUSTED INSTITUTIONAL PARTNER</span>
            <h2 className="text-2xl font-serif font-bold text-[#0D1B2A] mt-1">Empanelled With Premier Government Bodies & Multilateral Agencies</h2>
          </div>
        </div>
        <div className="partner-marquee" aria-label="Trusted institutional partners">
          <div className="partner-marquee__track">
            {[...PARTNER_LOGOS, ...PARTNER_LOGOS].map((partner, idx) => (
              <div key={`${partner.name}-${idx}`} className="partner-marquee__item" aria-label={partner.name}>
                <img src={partner.logo} alt={partner.name} className="partner-marquee__logo" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTORS GRID SECTION */}
      <section className="py-20 bg-[#fdf9ed]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs font-mono tracking-widest text-[#F2834C] uppercase">OUR DOMAINS</span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0D1B2A] mt-1">Specialized Infrastructure Sectors</h2>
            </div>
            <Link 
              to="/sectors" 
              className="mt-4 md:mt-0 inline-flex items-center gap-2 text-xs font-mono font-bold text-[#0D1B2A] hover:text-[#F2834C] transition-colors uppercase tracking-wider"
            >
              <span>View All {SECTORS.length} Sectors</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="sector-stack" aria-label="Specialized infrastructure sectors">
            {SECTORS.map((sector, index) => (
              <div
                key={sector.id}
                className="sector-stack__stage"
                style={{ zIndex: index + 1 }}
              >
                <Link
                  to={`/sectors/${sector.slug}`}
                  className="sector-stack__card group"
                >
                  <img
                    src={sector.image}
                    alt={sector.title}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#071A2D] via-[#0D1B2A]/40 to-[#0D1B2A]/10" />

                  <div className="relative flex h-full flex-col justify-between p-7 sm:p-10 lg:p-14">
                    <div className="flex items-start justify-between gap-6">
                      <span className="bg-[#F2834C] px-3 py-1.5 text-[10px] font-mono tracking-widest text-white">
                        INFRASTRUCTURE SECTOR
                      </span>
                      <span className="text-4xl font-serif text-white/50 sm:text-6xl">{String(index + 1).padStart(2, '0')}</span>
                    </div>

                    <div className="max-w-3xl">
                      <h3 className="text-3xl font-serif leading-tight text-white sm:text-4xl lg:text-5xl">{sector.title}</h3>
                      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/80 sm:text-base">{sector.shortDesc}</p>
                      <div className="mt-7 inline-flex items-center gap-2 text-xs font-mono font-bold tracking-wider text-[#F2834C]">
                        <span>EXPLORE EXPERTISE</span>
                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-2" />
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONCEPT TO COMMISSIONING LIFECYCLE */}
      <section className="py-20 bg-[#0D1B2A] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#A49150_1px,transparent_1px)] [background-size:24px_24px] opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono tracking-widest text-[#F2834C] uppercase">END-TO-END CAPABILITY</span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white mt-1">From Concept to Commissioning</h2>
            <p className="text-white/70 text-sm mt-3 leading-relaxed">
              Our multidisciplinary engineering and financial advisory teams guide infrastructure assets seamlessly through every stage of their lifecycle.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {LIFECYCLE_STAGES.map((stage, idx) => (
              <div key={idx} className="bg-[#071A2D] border border-[#A49150]/30 p-8 flex flex-col gap-4 relative group hover:border-[#F2834C] transition-colors">
                <div className="text-3xl font-mono font-bold text-[#F2834C]">{stage.step}</div>
                <h3 className="text-xl font-serif text-white">{stage.title}</h3>
                <p className="text-xs text-white/70 leading-relaxed">{stage.description}</p>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#F2834C] to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED SERVICES */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs font-mono tracking-widest text-[#A49150] uppercase">PROFESSIONAL MASTERY</span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0D1B2A] mt-1">Consultancy & Engineering Services</h2>
            </div>
            <Link 
              to="/services" 
              className="mt-4 md:mt-0 inline-flex items-center gap-2 text-xs font-mono font-bold text-[#0D1B2A] hover:text-[#F2834C] transition-colors uppercase tracking-wider"
            >
              <span>Explore All Services</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.slice(0, 6).map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PROJECTS WITH VIDEO MODAL */}
      <section className="py-20 bg-[#0D1B2A] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs font-mono tracking-widest text-[#F2834C] uppercase">PORTFOLIO SPOTLIGHT</span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white mt-1">Featured Infrastructure Projects</h2>
            </div>
            <Link 
              to="/projects" 
              className="mt-4 md:mt-0 inline-flex items-center gap-2 text-xs font-mono font-bold text-[#F2834C] hover:underline uppercase tracking-wider"
            >
              <span>View Project Explorer</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PROJECTS.slice(0, 3).map((project) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                onOpenVideo={handleOpenVideo} 
                onOpenDetails={(project) => setSelectedProject(project)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="py-16 bg-[#F2834C] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          <div className="flex flex-col gap-2 max-w-2xl">
            <span className="text-xs font-mono tracking-widest uppercase opacity-90">PARTNER WITH ALMONDZ</span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold">Ready to Engineer Your Next Mega Infrastructure Project?</h2>
            <p className="text-sm opacity-90">Get in touch with our expert directors, structural engineers, and financial advisors today.</p>
          </div>
          <Link
            to="/contact"
            className="bg-[#0D1B2A] hover:bg-[#071A2D] text-white px-8 py-4 text-xs font-mono font-bold tracking-widest uppercase transition-all shadow-xl rounded-none shrink-0"
          >
            CONTACT OUR EXPERTS
          </Link>
        </div>
      </section>

      {/* VIDEO MODAL */}
      <ProjectVideoModal
        isOpen={!!activeVideo}
        onClose={() => setActiveVideo(null)}
        videoUrl={activeVideo?.url}
        title={activeVideo?.title || ""}
      />

      {/* PROJECT DETAILS MODAL */}
      <ProjectDetailsModal
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        project={selectedProject}
        onOpenVideo={handleOpenVideo}
      />

    </div>
  );
};
