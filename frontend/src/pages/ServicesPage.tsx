import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SERVICES, Service } from '../data/services';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { PageHeroBanner } from '../components/PageHeroBanner';

const SERVICES_PER_PAGE = 6;

export const ServicesPage: React.FC = () => {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const heroHeadingRef = useRef<HTMLHeadingElement | null>(null);
  const divisionsSectionRef = useRef<HTMLElement | null>(null);
  const [heroLineWidth, setHeroLineWidth] = useState<number | null>(null);

  // The accent line under the hero heading should reach exactly as far as
  // the last rendered line of that heading text — measure the heading's own
  // wrapped line boxes (not just its container width) so it tracks the
  // actual glyph width at any viewport size, and re-measure on resize.
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

  const totalPages = Math.max(1, Math.ceil(SERVICES.length / SERVICES_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);
  const startIndex = (safePage - 1) * SERVICES_PER_PAGE;
  const endIndex = Math.min(startIndex + SERVICES_PER_PAGE, SERVICES.length);
  const paginatedServices = SERVICES.slice(startIndex, endIndex);

  const goToPage = (page: number) => {
    const clamped = Math.min(Math.max(page, 1), totalPages);
    setCurrentPage(clamped);
    divisionsSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Navbar dropdown / homepage cards link here with ?service=<slug> instead of
  // a separate per-service page — scroll to that card and open its dialog.
  useEffect(() => {
    const slug = searchParams.get('service');
    if (!slug) return;
    const targetIndex = SERVICES.findIndex((srv) => srv.slug === slug);
    if (targetIndex === -1) return;
    const targetPage = Math.floor(targetIndex / SERVICES_PER_PAGE) + 1;
    setCurrentPage(targetPage);
    const target = SERVICES[targetIndex];
    setTimeout(() => {
      const cardEl = document.getElementById(`service-card-${slug}`);
      cardEl?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setSelectedService(target);
    }, 60);
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.delete('service');
      return next;
    }, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  useEffect(() => {
    if (!selectedService) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedService(null);
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedService]);

  return (
    <div className="dropdown-content-page flex flex-col min-h-screen bg-[#F1F3F5] pt-24">
      {/* Header Banner with Clean Energy Infrastructure Background */}
      <PageHeroBanner
        line1="PROFESSIONAL MASTERY."
        line2="END-TO-END SOLUTIONS."
        description="From techno-economic feasibility and independent lender engineering to detailed design and real-time execution oversight across national infrastructure."
      />

      {/* SERVICES SHOWCASE SECTION */}
      <section ref={divisionsSectionRef} className="dropdown-scroll-content py-20 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="mb-12">
            <span className="text-xs font-mono tracking-widest text-[#A49050] uppercase">CORE CAPABILITIES</span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#2B4A6D] mt-1">Our Professional Divisions</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {paginatedServices.map((service, index) => {
              const divisionNum = startIndex + index + 1;
              return (
                <div
                  key={service.id}
                  id={`service-card-${service.slug}`}
                  onClick={() => setSelectedService(service)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setSelectedService(service);
                    }
                  }}
                  className="bg-white border border-[#A49050]/30 rounded-lg overflow-hidden shadow-sm hover:shadow-xl hover:border-[#D96B33]/60 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 scroll-mt-28 cursor-pointer select-none"
                >
                  {/* Image & Overlay Banner */}
                  <div className="relative h-56 overflow-hidden bg-[#2B4A6D]">
                    <img 
                      src={service.image} 
                      alt={service.title}
                      className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-500 ease-out opacity-90 group-hover:opacity-100"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#101F31]/90 via-[#2B4A6D]/35 to-transparent opacity-85 group-hover:opacity-65 transition-opacity"></div>
                    
                    <div className="absolute top-4 left-4 z-10">
                      <span className="text-[10px] font-mono bg-[#1E3654]/90 backdrop-blur-md text-[#D6C489] border border-[#A49050]/40 px-2.5 py-1 rounded-sm font-bold uppercase tracking-widest">
                        Division #{divisionNum < 10 ? `0${divisionNum}` : divisionNum}
                      </span>
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 z-10">
                      <h3 className="text-xl font-serif font-bold text-white group-hover:text-[#D96B33] transition-colors leading-snug">
                        {service.title}
                      </h3>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 flex flex-col flex-1 justify-between gap-4">
                    <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-normal">
                      {service.shortDesc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Cursor & Page-based Responsive Pagination */}
          {totalPages > 1 && (
            <div className="mt-12 pt-6 border-t border-gray-300/80">
              {/* Mobile Pagination View (< sm) */}
              <div className="flex sm:hidden flex-col items-center gap-3 w-full">
                <div className="flex items-center justify-between w-full gap-2">
                  <button
                    type="button"
                    onClick={() => goToPage(safePage - 1)}
                    disabled={safePage === 1}
                    className={`flex-1 py-2.5 px-3 text-xs font-semibold rounded-md flex items-center justify-center gap-1.5 border transition-all ${
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
                        className={`w-8 h-8 text-xs font-semibold rounded-md flex items-center justify-center transition-all cursor-pointer ${
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
                    className={`flex-1 py-2.5 px-3 text-xs font-semibold rounded-md flex items-center justify-center gap-1.5 border transition-all ${
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
                  Showing {startIndex + 1}–{endIndex} of {SERVICES.length} divisions
                </span>
              </div>

              {/* Desktop / Tablet Pagination View (sm and above) */}
              <div className="hidden sm:flex items-center justify-between w-full">
                <span className="text-xs text-[#2B4A6D]/70 font-medium">
                  Showing <strong className="text-gray-900">{startIndex + 1}–{endIndex}</strong> of <strong className="text-gray-900">{SERVICES.length}</strong> divisions • Page <strong className="text-gray-900">{safePage}</strong> of <strong className="text-gray-900">{totalPages}</strong>
                </span>

                <div className="inline-flex items-center gap-1.5 p-1 bg-white border border-gray-300 rounded-lg shadow-2xs">
                  <button
                    type="button"
                    onClick={() => goToPage(safePage - 1)}
                    disabled={safePage === 1}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-md flex items-center gap-1 transition-all ${
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
                        className={`w-7 h-7 text-xs font-semibold rounded-md flex items-center justify-center transition-all cursor-pointer ${
                          page === safePage
                            ? 'bg-gray-900 text-white shadow-xs'
                            : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
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
                    className={`px-3 py-1.5 text-xs font-semibold rounded-md flex items-center gap-1 transition-all ${
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

        </div>
      </section>

      {/* DETAILED SERVICE MODAL */}
      {selectedService && (
        <div 
          key={selectedService.id} 
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedService(null);
          }}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-6 bg-[#101F31]/80 backdrop-blur-md animate-fade-in"
        >
          <div className="bg-white w-full max-w-4xl max-h-[82vh] md:max-h-[80vh] md:h-[72vh] rounded-lg shadow-2xl relative flex flex-col md:flex-row overflow-hidden border border-[#A49050]/30">
            {/* Top-Right Close Cross Button */}
            <button
              onClick={() => setSelectedService(null)}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 z-30 p-2 bg-[#1E3654]/90 hover:bg-[#D96B33] text-white backdrop-blur-md rounded-md shadow-lg transition-all duration-200 cursor-pointer hover:scale-105 active:scale-95"
              aria-label="Close modal"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Left: compact thumbnail banner on mobile, side panel on desktop */}
            <div className="service-modal-image-panel relative w-full h-32 sm:h-40 md:h-full md:w-[38%] shrink-0 overflow-hidden bg-[#1E3654]">
              <img
                src={selectedService.image}
                alt={selectedService.title}
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#101F31]/85 via-black/20 to-transparent md:bg-gradient-to-r md:from-transparent md:to-[#101F31]/30"></div>
            </div>

            {/* Right: details content panel */}
            <div className="service-modal-content-panel flex-1 flex flex-col justify-between overflow-hidden min-h-0">
              {/* Header */}
              <div className="px-5 pt-4 pb-3 sm:px-7 sm:pt-6 sm:pb-3.5 border-b border-gray-100 shrink-0 bg-white pr-14">
                <span className="inline-flex w-fit items-center text-[10px] sm:text-[11px] font-mono font-bold text-[#D96B33] bg-[#D96B33]/10 border border-[#D96B33]/30 px-2.5 py-0.5 rounded-sm mb-1.5 uppercase tracking-wider">
                  AGICL Practice Division
                </span>
                <h3 className="text-lg sm:text-2xl md:text-3xl font-serif font-bold text-[#2B4A6D] leading-tight">
                  {selectedService.title}
                </h3>
              </div>

              {/* Scrollable Content (Scrollbar completely hidden, smooth scroll preserved) */}
              <div 
                className="px-5 py-4 sm:px-7 sm:py-5 overflow-y-auto space-y-4 flex-1 min-h-0 no-scrollbar scrollbar-none"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {/* Section 1: Overview */}
                <div className="space-y-1.5">
                  <h4 className="text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-wider text-[#2B4A6D]/80 border-b border-gray-100 pb-1">
                    Overview
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-800 leading-relaxed font-normal">
                    {selectedService.description}
                  </p>
                </div>

                {/* Section 2: Key Deliverables */}
                <div className="space-y-1.5 pt-1">
                  <h4 className="text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-wider text-[#2B4A6D]/80 border-b border-gray-100 pb-1">
                    Key Deliverables
                  </h4>
                  <ul className="space-y-2 text-xs sm:text-sm">
                    {selectedService.deliverables.map((del, dIdx) => (
                      <li key={dIdx} className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 bg-[#D96B33] mt-2 shrink-0 rounded-xs" />
                        <span className="font-normal text-gray-800 leading-relaxed">{del}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Section 3: How We Deliver It */}
                <div className="space-y-1.5 pt-1">
                  <h4 className="text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-wider text-[#2B4A6D]/80 border-b border-gray-100 pb-1">
                    How We Deliver It
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-800 leading-relaxed bg-[#F8FAFC] p-3 sm:p-4 rounded-lg border border-gray-100 font-normal">
                    {selectedService.methodology}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
