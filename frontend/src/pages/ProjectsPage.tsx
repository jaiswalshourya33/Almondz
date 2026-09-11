import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Project } from '../data/projects';
import { ALL_ARCHED_PROJECTS } from '../data/archedVaultProjects';
import { SECTORS } from '../data/sectors';
import { ProjectCard } from '../components/ProjectCard';
import { Search, Filter, ChevronLeft, ChevronRight, X } from 'lucide-react';
import cleanEnergyHero from '../images/hero/projects.jpg';

const PROJECTS_PER_PAGE = 6;

// The Projects page shows ONLY the 26 projects reconciled 1:1 against the Arched
// Vault → Technical section (see ALL_ARCHED_PROJECTS).
const ALL_PROJECTS: Project[] = ALL_ARCHED_PROJECTS;

export const ProjectsPage: React.FC = () => {
  const { filter } = useParams<{ filter?: string }>();
  const [selectedStatus, setSelectedStatus] = useState<string>(
    filter === 'recently-awarded' ? 'Recently Awarded' :
    filter === 'ongoing' ? 'Ongoing' :
    filter === 'completed' ? 'Completed' : 'All'
  );
  const [selectedSector, setSelectedSector] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const gridSectionRef = useRef<HTMLElement | null>(null);
  const heroStatementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const heroStatement = heroStatementRef.current;
    if (!heroStatement) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      heroStatement.classList.add('is-visible');
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          heroStatement.classList.add('is-visible');
        } else {
          heroStatement.classList.remove('is-visible');
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(heroStatement);
    return () => observer.disconnect();
  }, []);

  const filteredProjects = ALL_PROJECTS.filter((proj) => {
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
      {/* Hero Banner with Clean Energy Infrastructure Background & Direct Overlay Text (Image 4 Animation) */}
      <section 
        ref={heroStatementRef}
        className="projects-hero-statement relative -mt-24 min-h-[480px] sm:min-h-[560px] flex items-center justify-center pt-44 pb-20 sm:pt-52 sm:pb-28 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#2B4A6D]"
      >
        {/* Panoramic Infrastructure Background Image with Balanced Dark Film */}
        <div className="absolute inset-0 z-0">
          <img 
            src={cleanEnergyHero} 
            alt="Infrastructure Projects" 
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B1523]/80 via-[#1B3553]/65 to-[#0B1523]/90 backdrop-brightness-[0.9]"></div>
        </div>

        {/* Floating Text Directly Over Image */}
        <div className="relative z-10 w-full max-w-4xl mx-auto text-center flex flex-col items-center">
          {/* Top decorative accent pill */}
          <span className="brand-statement__rule block h-[2.5px] w-24 sm:w-32 bg-[#D6C489] mb-5 sm:mb-7 rounded-full shadow-sm" aria-hidden="true" />

          {/* Main Content with Staggered Animation */}
          <div className="space-y-3 sm:space-y-4">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-sans font-bold tracking-tight leading-tight">
              <span className="brand-statement__line block text-white drop-shadow-md">IDEAS THAT CONNECT.</span>
              <span className="brand-statement__line block text-[#D6C489] drop-shadow-md">PROJECTS THAT TRANSFORM.</span>
            </h1>

            <p className="brand-statement__line text-sm sm:text-base lg:text-lg text-white/90 max-w-2xl mx-auto leading-relaxed font-normal pt-2 drop-shadow-sm">
              Explore the projects where expertise, innovation and infrastructure come together to create lasting impact.
            </p>
          </div>
        </div>

        {/* Very subtle, slim bottom edge dissolve */}
        <div 
          className="absolute inset-x-0 bottom-0 h-6 sm:h-8 bg-gradient-to-b from-transparent to-[#F1F3F5] pointer-events-none z-[5]" 
          aria-hidden="true"
        />
      </section>

      {/* Filters & Search */}
      <section className="pt-6 sm:pt-8 pb-3 sm:pb-4 bg-[#F1F3F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6">
          
          {/* Status Tabs */}
          <div className="flex flex-wrap gap-2">
             {['All', 'Ongoing', 'Completed'].map((status) => (
              <button
                key={status}
                onClick={() => setSelectedStatus(status)}
                className={`px-4 py-2 text-xs font-mono font-bold uppercase transition-all duration-300 rounded-md shadow-xs hover:shadow-sm ${
                  selectedStatus === status 
                    ? 'bg-[#2B4A6D] text-white border border-[#2B4A6D] shadow-sm -translate-y-0.5' 
                    : 'bg-[#F1F3F5] text-[#2B4A6D] border border-[#A49050]/30 hover:border-[#D96B33] hover:bg-[#A49050]/10 hover:-translate-y-0.5 active:translate-y-0'
                }`}
              >
                {status}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-80 lg:w-96">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#2B4A6D]/60 pointer-events-none" />
            <input
              type="text"
              placeholder="Search projects, client, location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-gray-300 hover:border-[#A49050]/60 focus:border-[#D96B33] pl-10 pr-9 py-2.5 sm:py-3 text-[13px] sm:text-[14px] leading-5 text-[#020617] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#D96B33]/15 rounded-lg shadow-xs transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 text-gray-400 hover:text-gray-700 transition-colors cursor-pointer"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

        </div>
      </section>

      {/* Projects Grid */}
      <section ref={gridSectionRef} className="dropdown-scroll-content pt-2 sm:pt-3 pb-12 sm:pb-16 scroll-mt-24 bg-[#F1F3F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredProjects.length === 0 ? (
            <div className="text-center py-20 bg-white border border-[#A49050]/30 rounded-lg">
              <h3 className="text-xl font-serif text-[#2B4A6D]">No projects found matching your criteria.</h3>
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                {paginatedProjects.map((proj) => (
                  <ProjectCard key={proj.id} project={proj} />
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
                    <span className="text-xs text-[#2B4A6D]/70 font-medium">
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
    </div>
  );
};
