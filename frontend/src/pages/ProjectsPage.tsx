import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PROJECTS, Project } from '../data/projects';
import { SECTORS } from '../data/sectors';
import { ProjectCard } from '../components/ProjectCard';
import { ProjectVideoModal } from '../components/ProjectVideoModal';
import { ProjectDetailsModal } from '../components/ProjectDetailsModal';
import { Search, Filter, ChevronLeft, ChevronRight } from 'lucide-react';

const PROJECTS_PER_PAGE = 6;

export const ProjectsPage: React.FC = () => {
  const { filter } = useParams<{ filter?: string }>();
  const [selectedStatus, setSelectedStatus] = useState<string>(
    filter === 'recently-awarded' ? 'Recently Awarded' :
    filter === 'ongoing' ? 'Ongoing' :
    filter === 'completed' ? 'Completed' : 'All'
  );
  const [selectedSector, setSelectedSector] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeVideo, setActiveVideo] = useState<{ url: string; title: string } | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const gridSectionRef = useRef<HTMLElement | null>(null);
  const heroHeadingRef = useRef<HTMLHeadingElement | null>(null);
  const [heroLineWidth, setHeroLineWidth] = useState<number | null>(null);

  useLayoutEffect(() => {
    const measure = () => {
      const heading = heroHeadingRef.current;
      if (!heading) return;
      const rects = heading.getClientRects();
      const lastRect = rects[rects.length - 1];
      if (lastRect) setHeroLineWidth(lastRect.width);
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  const filteredProjects = PROJECTS.filter((proj) => {
    const matchesStatus = selectedStatus === 'All' || proj.status === selectedStatus;
    const matchesSector = selectedSector === 'All' || proj.sector === selectedSector;
    const matchesSearch = proj.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          proj.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          proj.client.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSector && matchesSearch;
  });

  // Reset to page 1 whenever the filtered result set changes, so a filter
  // or search that shrinks the results can never leave the user stranded
  // on a page number that no longer exists.
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedStatus, selectedSector, searchQuery]);

  const totalPages = Math.max(1, Math.ceil(filteredProjects.length / PROJECTS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);
  const startIndex = (safePage - 1) * PROJECTS_PER_PAGE;
  const endIndex = Math.min(startIndex + PROJECTS_PER_PAGE, filteredProjects.length);
  const paginatedProjects = filteredProjects.slice(startIndex, endIndex);

  const goToPage = (page: number) => {
    const clamped = Math.min(Math.max(page, 1), totalPages);
    setCurrentPage(clamped);
    gridSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="dropdown-content-page flex flex-col min-h-screen bg-[#F1F3F5] pt-24">
      {/* Hero */}
      <section className="bg-[#53647D] text-white py-16 border-b border-[#A49050]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="dropdown-banner-copy flex flex-col gap-5 max-w-3xl">
            <span className="inline-flex w-fit items-center text-xs font-mono tracking-widest text-[#A49050] uppercase bg-[#A49050]/10 border border-[#A49050]/30 px-4 py-1.5 rounded-full">PORTFOLIO EXPLORER</span>
            <h1 ref={heroHeadingRef} className="text-4xl sm:text-5xl font-serif font-bold">Infrastructure Project Portfolio</h1>
            <div
              className="services-hero-line h-[3px] bg-[#A49050] rounded-full"
              style={{ width: heroLineWidth ? `${heroLineWidth}px` : '4rem' }}
            ></div>
            <p className="text-white/80 text-base leading-relaxed">
              Explore our extensive track record of completed, ongoing, and recently awarded national infrastructure assignments.
            </p>
          </div>
        </div>
      </section>

      {/* Filters & Search */}
      <section className="py-12 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Status Tabs */}
          <div className="flex flex-wrap gap-2">
             {['All', 'Recently Awarded', 'Ongoing', 'Completed'].map((status) => (
              <button
                key={status}
                onClick={() => setSelectedStatus(status)}
                className={`px-4 py-2.5 text-xs font-mono font-bold uppercase transition-all duration-300 rounded-md shadow-sm hover:shadow ${
                  selectedStatus === status 
                    ? 'bg-[#18253A] text-white border border-[#18253A] shadow-md -translate-y-0.5' 
                    : 'bg-[#F1F3F5] text-[#18253A] border border-[#A49050]/30 hover:border-[#D96B33] hover:bg-[#A49050]/10 hover:-translate-y-0.5 active:translate-y-0'
                }`}
              >
                {status}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search projects, client, location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#F1F3F5] border border-[#A49050]/30 pl-10 pr-4 py-2 text-xs text-[#18253A] placeholder-gray-500 focus:outline-none focus:border-[#D96B33] rounded-md"
            />
          </div>

        </div>
      </section>

      {/* Projects Grid */}
      <section ref={gridSectionRef} className="dropdown-scroll-content py-16 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredProjects.length === 0 ? (
            <div className="text-center py-20 bg-white border border-[#A49050]/30 rounded-lg">
              <h3 className="text-xl font-serif text-[#18253A]">No projects found matching your criteria.</h3>
              <p className="text-xs text-gray-500 mt-2">Try adjusting your filter or search query.</p>
              <button
                onClick={() => { setSelectedStatus('All'); setSelectedSector('All'); setSearchQuery(''); }}
                className="mt-6 bg-[#A49050] hover:bg-[#8A7942] text-white px-6 py-2.5 text-xs font-mono font-bold tracking-widest uppercase transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 rounded-md border border-[#A49050]/20"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {paginatedProjects.map((proj) => (
                  <ProjectCard
                    key={proj.id}
                    project={proj}
                    onOpenDetails={(project) => setSelectedProject(project)}
                  />
                ))}
              </div>

              {/* Cursor & Page-based Responsive Pagination — same styling/behavior as the Management Team page */}
              {totalPages > 1 && (
                <div className="mt-12 pt-6 border-t border-gray-300/80">
                  {/* Mobile Pagination View (< sm) */}
                  <div className="flex sm:hidden flex-col items-center gap-3 w-full">
                    <div className="flex items-center justify-between w-full gap-2">
                      <button
                        type="button"
                        onClick={() => goToPage(safePage - 1)}
                        disabled={safePage === 1}
                        className={`flex-1 py-2.5 px-3 text-xs font-semibold rounded-full flex items-center justify-center gap-1.5 border transition-all ${
                          safePage === 1
                            ? 'bg-gray-100 text-gray-300 border-gray-200 cursor-not-allowed'
                            : 'bg-white text-gray-800 border-gray-300 active:bg-gray-100 shadow-2xs cursor-pointer'
                        }`}
                        aria-label="Previous page"
                      >
                        <ChevronLeft className="w-4 h-4" />
                        <span>Previous</span>
                      </button>

                      <div className="flex items-center gap-1 px-1">
                        {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((page) => (
                          <button
                            key={page}
                            type="button"
                            onClick={() => goToPage(page)}
                            className={`w-8 h-8 text-xs font-semibold rounded-full flex items-center justify-center transition-all cursor-pointer ${
                              page === safePage
                                ? 'bg-gray-900 text-white shadow-xs'
                                : 'text-gray-700 bg-white border border-gray-200 active:bg-gray-100'
                            }`}
                          >
                            {page}
                          </button>
                        ))}
                      </div>

                      <button
                        type="button"
                        onClick={() => goToPage(safePage + 1)}
                        disabled={safePage === totalPages}
                        className={`flex-1 py-2.5 px-3 text-xs font-semibold rounded-full flex items-center justify-center gap-1.5 border transition-all ${
                          safePage === totalPages
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
                      Showing {startIndex + 1}–{endIndex} of {filteredProjects.length} projects
                    </span>
                  </div>

                  {/* Desktop / Tablet Pagination View (sm and above) */}
                  <div className="hidden sm:flex items-center justify-between w-full">
                    <span className="text-xs text-[#18253A]/70 font-medium">
                      Showing <strong className="text-gray-900">{startIndex + 1}–{endIndex}</strong> of <strong className="text-gray-900">{filteredProjects.length}</strong> projects • Page <strong className="text-gray-900">{safePage}</strong> of <strong className="text-gray-900">{totalPages}</strong>
                    </span>

                    <div className="inline-flex items-center gap-1.5 p-1 bg-white border border-gray-300 rounded-full shadow-2xs">
                      <button
                        type="button"
                        onClick={() => goToPage(safePage - 1)}
                        disabled={safePage === 1}
                        className={`px-3 py-1.5 text-xs font-semibold rounded-full flex items-center gap-1 transition-all ${
                          safePage === 1
                            ? 'text-gray-300 cursor-not-allowed'
                            : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100 cursor-pointer'
                        }`}
                        aria-label="Previous page"
                      >
                        <ChevronLeft className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Prev</span>
                      </button>

                      <div className="flex items-center gap-1 px-1">
                        {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((page) => (
                          <button
                            key={page}
                            type="button"
                            onClick={() => goToPage(page)}
                            aria-current={page === safePage ? 'page' : undefined}
                            className={`w-7 h-7 text-xs font-semibold rounded-full flex items-center justify-center transition-all cursor-pointer ${
                              page === safePage
                                ? 'bg-gray-900 text-white shadow-xs'
                                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                            }`}
                          >
                            {page}
                          </button>
                        ))}
                      </div>

                      <button
                        type="button"
                        onClick={() => goToPage(safePage + 1)}
                        disabled={safePage === totalPages}
                        className={`px-3 py-1.5 text-xs font-semibold rounded-full flex items-center gap-1 transition-all ${
                          safePage === totalPages
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
