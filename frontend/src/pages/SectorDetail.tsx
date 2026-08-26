import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { SECTORS } from '../data/sectors';
import { PROJECTS, Project } from '../data/projects';
import { ProjectCard } from '../components/ProjectCard';
import { ProjectVideoModal } from '../components/ProjectVideoModal';
import { ProjectDetailsModal } from '../components/ProjectDetailsModal';
import { ArrowLeft, CheckCircle2, Building2, ChevronRight } from 'lucide-react';

export const SectorDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const sector = SECTORS.find((s) => s.slug === slug);
  const [activeVideo, setActiveVideo] = useState<{ url: string; title: string } | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  if (!sector) {
    return (
      <div className="min-h-screen bg-[#fdf9ed] pt-32 pb-20 text-center">
        <h2 className="text-3xl font-serif text-[#16283D]">Sector Not Found</h2>
        <p className="text-sm text-[#1c1c15]/70 mt-2">The requested sector could not be located.</p>
        <Link to="/sectors" className="mt-6 inline-block bg-[#F2834C] hover:bg-[#d9723f] text-white px-6 py-3 text-xs font-mono font-bold tracking-widest uppercase shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 rounded-none border border-[#F2834C]/20">
          Back to Sectors
        </Link>
      </div>
    );
  }

  const relatedProjects = PROJECTS.filter((p) => p.sectorSlug === sector.slug || p.sector.toLowerCase().includes(sector.title.toLowerCase().substring(0, 6)));

  return (
    <div className="dropdown-content-page flex flex-col min-h-screen bg-[#fdf9ed] pt-24">
      {/* Hero Banner */}
      <section className="relative py-20 bg-[#16283D] text-white overflow-hidden border-b border-[#A49150]/30">
        <div className="absolute inset-0 z-0">
          <img 
            src={sector.image} 
            alt={sector.title}
            className="w-full h-full object-cover opacity-25"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#16283D] via-[#16283D]/90 to-[#071A2D]/80"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/sectors" className="inline-flex items-center gap-2 text-xs font-mono text-[#F2834C] hover:underline mb-6">
            <ArrowLeft className="w-4 h-4" />
            <span>BACK TO ALL SECTORS</span>
          </Link>

          <div className="dropdown-banner-copy max-w-3xl flex flex-col gap-4">
            <span className="text-xs font-mono tracking-widest text-[#F2834C] uppercase">DOMAINS // EXPERTISE</span>
            <h1 className="text-4xl sm:text-5xl font-serif font-bold text-white leading-tight">{sector.title}</h1>
            <p className="text-white/80 text-base leading-relaxed">{sector.description}</p>
          </div>
        </div>
      </section>

      {/* Services & Metrics */}
      <section className="dropdown-scroll-content py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Services Offered */}
            <div className="lg:col-span-8 flex flex-col gap-8">
              <div className="bg-white border border-[#A49150]/30 p-8 shadow-sm">
                <h3 className="text-2xl font-serif font-bold text-[#16283D] mb-6">Core Services & Capabilities</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {sector.services.map((srv, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-4 bg-[#fdf9ed] border border-[#A49150]/20">
                      <CheckCircle2 className="w-5 h-5 text-[#F2834C] shrink-0 mt-0.5" />
                      <span className="text-sm font-medium text-[#16283D]">{srv}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Related Projects */}
              {relatedProjects.length > 0 && (
                <div className="flex flex-col gap-6">
                  <h3 className="text-2xl font-serif font-bold text-[#16283D]">Representative Projects in {sector.title}</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {relatedProjects.map((proj) => (
                      <ProjectCard
                        key={proj.id}
                        project={proj}
                        onOpenDetails={(project) => setSelectedProject(project)}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar Metrics */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              {sector.metrics.length > 0 && <div className="bg-[#16283D] text-white border border-[#A49150]/40 p-6 shadow-xl">
                <span className="text-xs font-mono tracking-widest text-[#F2834C]">SECTOR IMPACT</span>
                <h4 className="text-xl font-serif font-bold mt-1 mb-6">Key Metrics</h4>
                <div className="flex flex-col gap-5">
                  {sector.metrics.map((metric, idx) => (
                    <div key={idx} className="border-b border-white/10 pb-4 last:border-0">
                      <div className="text-3xl font-serif font-bold text-[#F2834C]">{metric.value}</div>
                      <div className="text-xs font-mono text-white/70 mt-1">{metric.label}</div>
                    </div>
                  ))}
                </div>
              </div>}

              <div className="bg-white border border-[#A49150]/30 p-6 shadow-sm flex flex-col gap-4">
                <h4 className="text-lg font-serif font-bold text-[#16283D]">Need Sector Consultation?</h4>
                <p className="text-xs text-[#1c1c15]/70 leading-relaxed">Speak with our principal engineering directors regarding your infrastructure requirement.</p>
                <Link to="/contact" className="bg-[#F2834C] hover:bg-[#d9723f] text-white py-3.5 text-center text-xs font-mono font-bold tracking-widest uppercase transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 rounded-none border border-[#F2834C]/20">
                  Contact Sector Lead
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Video Modal */}
      <ProjectVideoModal
        isOpen={!!activeVideo}
        onClose={() => setActiveVideo(null)}
        videoUrl={activeVideo?.url}
        title={activeVideo?.title || ""}
      />

      {/* Project Details Modal */}
      <ProjectDetailsModal
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        project={selectedProject}
        onOpenVideo={(url, title) => setActiveVideo({ url, title })}
      />
    </div>
  );
};
