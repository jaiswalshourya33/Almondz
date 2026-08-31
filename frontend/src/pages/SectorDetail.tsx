import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { SECTORS } from '../data/sectors';
import { PROJECTS, Project } from '../data/projects';
import { ProjectCard } from '../components/ProjectCard';
import { ProjectVideoModal } from '../components/ProjectVideoModal';
import { ProjectDetailsModal } from '../components/ProjectDetailsModal';
import { ArrowLeft, CheckCircle2, Building2, ChevronRight, ChevronLeft, Mail, Phone, MapPin } from 'lucide-react';

export const SectorDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const sector = SECTORS.find((s) => s.slug === slug);
  const [activeVideo, setActiveVideo] = useState<{ url: string; title: string } | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const projectsSectionRef = useRef<HTMLElement | null>(null);

  const ITEMS_PER_PAGE = 6;

  if (!sector) {
    return (
      <div className="min-h-screen bg-[#F1F3F5] pt-32 pb-20 text-center">
        <h2 className="text-3xl font-serif text-[#18253A]">Sector Not Found</h2>
        <p className="text-sm text-[#18253A]/70 mt-2">The requested sector could not be located.</p>
        <Link to="/sectors" className="mt-6 inline-block bg-[#D96B33] hover:bg-[#C25A28] text-white px-6 py-3 text-xs font-mono font-bold tracking-widest uppercase shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 rounded-none border border-[#D96B33]/20">
          Back to Sectors
        </Link>
      </div>
    );
  }

  const relatedProjects = PROJECTS.filter((p) => p.sectorSlug === sector.slug || p.sector.toLowerCase().includes(sector.title.toLowerCase().substring(0, 6)));

  const statusOptions = ['All', 'Completed', 'Ongoing', 'Recently Awarded'] as const;

  const filteredProjects = relatedProjects.filter((proj) => {
    if (selectedStatus === 'All') return true;
    return proj.status === selectedStatus;
  });

  const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, filteredProjects.length);
  const displayedProjects = filteredProjects.slice(startIndex, endIndex);

  // Reset to page 1 when filter or sector changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedStatus, slug]);

  const scrollToProjects = () => {
    if (projectsSectionRef.current) {
      const headerOffset = 90; // offset for fixed navbar
      const elementPosition = projectsSectionRef.current.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: Math.max(0, offsetPosition),
        behavior: 'smooth'
      });
    }
  };

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages || page === currentPage) return;
    
    // Immediately scroll to the top of the Representative Projects section
    scrollToProjects();
    
    setCurrentPage(page);

    // Re-verify scroll after React render completes to avoid layout collapse jump
    setTimeout(() => {
      scrollToProjects();
    }, 60);
  };

  return (
    <div className="dropdown-content-page flex flex-col min-h-screen bg-[#F1F3F5] pt-24">
      {/* Hero Banner */}
      <section className="relative py-20 bg-[#18253A] text-white overflow-hidden border-b border-[#A49050]/30">
        <div className="absolute inset-0 z-0">
          <img 
            src={sector.image} 
            alt={sector.title}
            className="w-full h-full object-cover opacity-25"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#18253A] via-[#18253A]/90 to-[#101A29]/80"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/sectors" className="inline-flex items-center gap-2 text-xs font-mono text-[#D96B33] hover:underline mb-6">
            <ArrowLeft className="w-4 h-4" />
            <span>BACK TO ALL SECTORS</span>
          </Link>

          <div className="dropdown-banner-copy max-w-3xl flex flex-col gap-4">
            <span className="text-xs font-mono tracking-widest text-[#D96B33] uppercase">DOMAINS // EXPERTISE</span>
            <h1 className="text-4xl sm:text-5xl font-serif font-bold text-white leading-tight">{sector.title}</h1>
            <p className="text-white/80 text-base leading-relaxed">{sector.description}</p>
          </div>
        </div>
      </section>

      {/* Services & Scope of Work + Inquiry Sidebar (Classic 2022 Corporate Layout) */}
      <section className="dropdown-scroll-content py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Services & Capabilities (8 cols) */}
            <div className="group/services-card lg:col-span-8 bg-white border border-gray-200 p-8 sm:p-10 shadow-xs">
              <div>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#18253A]">
                  Services &amp; Scope of Work
                </h3>
                <div className="w-14 h-1 bg-[#D96B33] mt-2.5 mb-6 origin-left scale-x-0 transition-transform duration-700 ease-out delay-300 group-hover/services-card:scale-x-100"></div>

                <p className="text-sm text-gray-600 leading-relaxed mb-8">
                  Almondz Global Infra-Consultant Limited provides end-to-end consulting and advisory solutions across all stages of {sector.title.toLowerCase()} development. Our multidisciplinary engineering teams deliver technical rigor, statutory adherence, and value engineering for central, state, and private infrastructure authorities.
                </p>

                {/* Classic 2-column corporate capability listing with divider lines */}
                <div className="border-t border-gray-100">
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-1">
                    {sector.services.map((srv, idx) => (
                      <li 
                        key={idx} 
                        className="flex items-start gap-3 py-3.5 border-b border-gray-100 hover:border-[#A49050]/40 transition-colors group"
                      >
                        <ChevronRight className="w-4 h-4 text-[#D96B33] shrink-0 mt-0.5 group-hover:translate-x-0.5 transition-transform" />
                        <span className="text-sm font-medium text-gray-800 group-hover:text-[#18253A] leading-snug">
                          {srv}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-10 pt-6 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-gray-500 gap-2">
                  <span>Sector Domain: <strong className="text-gray-700 font-semibold">{sector.title}</strong></span>
                  <span>ISO 9001:2015 Certified Project Delivery</span>
                </div>
              </div>
            </div>

            {/* Right Column: Contact / Inquiry Panel (4 cols) */}
            <div className="group/consult-card lg:col-span-4 bg-white border border-gray-200 border-t-4 border-t-[#D96B33] p-6 sm:p-8 shadow-xs">
              <h4 className="text-xl font-serif font-bold text-[#18253A]">
                Need Sector Consultation?
              </h4>
              <div className="w-10 h-0.5 bg-[#D96B33] mt-2 mb-4 origin-left scale-x-0 transition-transform duration-700 ease-out delay-300 group-hover/consult-card:scale-x-100"></div>

              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-6">
                Speak directly with our senior infrastructure directors and domain experts regarding project feasibility, DPR preparation, or transaction advisory.
              </p>

              <div className="space-y-4 pt-4 border-t border-gray-100 text-xs text-gray-700 mb-8">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#F1F3F5] border border-[#A49050]/30 flex items-center justify-center shrink-0 text-[#D96B33]">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-400 uppercase font-semibold block">Email Inquiry</span>
                    <a href="mailto:info@almondz.com" className="font-medium text-[#18253A] hover:text-[#D96B33] transition-colors">
                      info@almondz.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#F1F3F5] border border-[#A49050]/30 flex items-center justify-center shrink-0 text-[#D96B33]">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-400 uppercase font-semibold block">Telephone</span>
                    <span className="font-medium text-[#18253A]">+91 11 4350 0100</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#F1F3F5] border border-[#A49050]/30 flex items-center justify-center shrink-0 text-[#D96B33]">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-400 uppercase font-semibold block">Corporate Office</span>
                    <span className="font-medium text-[#18253A]">New Delhi, India</span>
                  </div>
                </div>
              </div>

              <Link 
                to="/contact" 
                className="w-full bg-[#18253A] hover:bg-[#D96B33] text-white py-3.5 px-4 text-center text-xs font-bold uppercase tracking-wider transition-colors duration-200 shadow-xs rounded-none block text-center"
              >
                Contact Sector Lead &rarr;
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* Representative Projects - Full Width Section with Status Filters (6 Cards Max per Page) */}
      {relatedProjects.length > 0 && (
        <section ref={projectsSectionRef} className="py-16 bg-[#F1F3F5]/50 border-t border-[#A49050]/20 scroll-mt-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Header + Status Filters Row (Responsive Layout) */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 pb-4 border-b border-[#A49050]/20 gap-6">
              <div>
                <span className="text-xs font-bold text-[#D96B33] uppercase tracking-wider block mb-1">
                  Project Portfolio
                </span>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#18253A] leading-snug">
                  <span className="block">Representative Projects in</span>
                  <span className="block text-[#18253A]">{sector.title}</span>
                </h2>
                <p className="text-xs text-[#18253A]/65 mt-2 font-medium">
                  Showing {filteredProjects.length === 0 ? 0 : startIndex + 1}–{endIndex} of {filteredProjects.length} Key Infrastructure Assets
                </p>
              </div>

              {/* Status Filter Pills - Grey & White Corporate Theme */}
              <div className="shrink-0 max-w-full overflow-x-auto modal-scroll self-start lg:self-auto py-1">
                <div className="inline-flex items-center p-1 bg-white border border-gray-300 rounded-full shadow-2xs gap-1 flex-nowrap whitespace-nowrap">
                  {statusOptions.map((status) => {
                    const count = status === 'All'
                      ? relatedProjects.length
                      : relatedProjects.filter((p) => p.status === status).length;

                    if (count === 0 && status !== 'All') return null;

                    const isActive = selectedStatus === status;

                    return (
                      <button
                        key={status}
                        type="button"
                        onClick={() => setSelectedStatus(status)}
                        className={`px-3.5 py-1.5 text-[11px] font-semibold tracking-wide rounded-full transition-all duration-200 flex items-center gap-1.5 whitespace-nowrap cursor-pointer select-none shrink-0 ${
                          isActive
                            ? 'bg-gray-900 text-white shadow-xs'
                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/90'
                        }`}
                      >
                        <span>{status}</span>
                        <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono font-medium leading-none ${
                          isActive ? 'bg-white text-gray-900' : 'bg-gray-100 text-gray-600 border border-gray-200'
                        }`}>
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Empty State or 3-Column Responsive Grid (6 Cards per page) */}
            {filteredProjects.length === 0 ? (
              <div className="text-center py-16 bg-white border border-gray-200 rounded-sm">
                <p className="text-sm text-gray-600 font-medium">No projects found with status "{selectedStatus}".</p>
                <button
                  type="button"
                  onClick={() => setSelectedStatus('All')}
                  className="mt-4 px-4 py-2 bg-[#18253A] hover:bg-[#D96B33] text-white text-xs font-semibold uppercase tracking-wider transition-colors rounded-sm"
                >
                  View All Projects
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 min-h-[360px]">
                  {displayedProjects.map((proj) => (
                    <ProjectCard
                      key={proj.id}
                      project={proj}
                      onOpenDetails={(project) => setSelectedProject(project)}
                    />
                  ))}
                </div>

                {/* Cursor & Page-based Responsive Pagination */}
                {totalPages > 1 && (
                  <div className="mt-10 pt-6 border-t border-gray-300/80">
                    {/* Mobile Pagination View (< sm) */}
                    <div className="flex sm:hidden flex-col items-center gap-3 w-full">
                      <div className="flex items-center justify-between w-full gap-2">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            goToPage(currentPage - 1);
                          }}
                          disabled={currentPage === 1}
                          className={`flex-1 py-2.5 px-3 text-xs font-semibold rounded-full flex items-center justify-center gap-1.5 border transition-all ${
                            currentPage === 1
                              ? 'bg-gray-100 text-gray-300 border-gray-200 cursor-not-allowed'
                              : 'bg-white text-gray-800 border-gray-300 active:bg-gray-100 shadow-2xs cursor-pointer'
                          }`}
                          aria-label="Previous page"
                        >
                          <ChevronLeft className="w-4 h-4" />
                          <span>Previous</span>
                        </button>

                        <div className="flex items-center gap-1 px-1">
                          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                            <button
                              key={pageNum}
                              type="button"
                              onClick={() => goToPage(pageNum)}
                              className={`w-8 h-8 text-xs font-semibold rounded-full flex items-center justify-center transition-all cursor-pointer ${
                                currentPage === pageNum
                                  ? 'bg-gray-900 text-white shadow-xs'
                                  : 'text-gray-700 bg-white border border-gray-200 active:bg-gray-100'
                              }`}
                            >
                              {pageNum}
                            </button>
                          ))}
                        </div>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            goToPage(currentPage + 1);
                          }}
                          disabled={currentPage === totalPages}
                          className={`flex-1 py-2.5 px-3 text-xs font-semibold rounded-full flex items-center justify-center gap-1.5 border transition-all ${
                            currentPage === totalPages
                              ? 'bg-gray-100 text-gray-300 border-gray-200 cursor-not-allowed'
                              : 'bg-white text-gray-800 border-gray-300 active:bg-gray-100 shadow-2xs cursor-pointer'
                          }`}
                          aria-label="Next page"
                        >
                          <span>Next</span>
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>

                      <span className="text-[11px] text-gray-500 font-medium">
                        Showing {startIndex + 1}–{endIndex} of {filteredProjects.length} infrastructure assets
                      </span>
                    </div>

                    {/* Desktop / Tablet Pagination View (sm and above - preserved exactly as requested) */}
                    <div className="hidden sm:flex items-center justify-between w-full">
                      <span className="text-xs text-[#18253A]/70 font-medium">
                        Showing <strong className="text-gray-900">{startIndex + 1}–{endIndex}</strong> of <strong className="text-gray-900">{filteredProjects.length}</strong> assets • Page <strong className="text-gray-900">{currentPage}</strong> of <strong className="text-gray-900">{totalPages}</strong>
                      </span>

                      <div className="inline-flex items-center gap-1.5 p-1 bg-white border border-gray-300 rounded-full shadow-2xs">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            goToPage(currentPage - 1);
                          }}
                          disabled={currentPage === 1}
                          className={`px-3 py-1.5 text-xs font-semibold rounded-full flex items-center gap-1 transition-all ${
                            currentPage === 1
                              ? 'text-gray-300 cursor-not-allowed'
                              : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100 cursor-pointer'
                          }`}
                          aria-label="Previous page"
                        >
                          <ChevronLeft className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">Prev</span>
                        </button>

                        {/* Page Numbers */}
                        <div className="flex items-center gap-1 px-1">
                          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                            <button
                              key={pageNum}
                              type="button"
                              onClick={(e) => {
                                e.preventDefault();
                                goToPage(pageNum);
                              }}
                              className={`w-7 h-7 text-xs font-semibold rounded-full flex items-center justify-center transition-all cursor-pointer ${
                                currentPage === pageNum
                                  ? 'bg-gray-900 text-white shadow-xs'
                                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                              }`}
                            >
                              {pageNum}
                            </button>
                          ))}
                        </div>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            goToPage(currentPage + 1);
                          }}
                          disabled={currentPage === totalPages}
                          className={`px-3 py-1.5 text-xs font-semibold rounded-full flex items-center gap-1 transition-all ${
                            currentPage === totalPages
                              ? 'text-gray-300 cursor-not-allowed'
                              : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100 cursor-pointer'
                          }`}
                          aria-label="Next page"
                        >
                          <span className="hidden sm:inline">Next</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </section>
      )}

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
