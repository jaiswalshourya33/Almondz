import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SERVICES, Service } from '../data/services';
import { CheckCircle2, Eye, X, Download, ChevronLeft, ChevronRight } from 'lucide-react';
import { PageHeroBanner } from '../components/PageHeroBanner';

const SERVICES_PER_PAGE = 6;

export const ServicesPage: React.FC = () => {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [downloadNotice, setDownloadNotice] = useState<string | null>(null);
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

  const handleDownloadBrochure = (title: string) => {
    setDownloadNotice(title);
    setTimeout(() => {
      setDownloadNotice(null);
    }, 3500);
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
    return () => {
      document.body.style.overflow = previousOverflow;
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

      {/* Download Toast Notification */}
      {downloadNotice && (
        <div className="fixed bottom-8 right-8 z-50 bg-[#18253A] text-white px-6 py-4 border border-[#3E4C60] shadow-2xl flex items-center gap-3 animate-fade-in rounded-md">
          <CheckCircle2 className="w-5 h-5 text-[#D6C489]" />
          <div>
            <p className="text-xs font-mono font-bold">SERVICE BROCHURE DOWNLOADED</p>
            <p className="text-xs text-white/80">{downloadNotice} documentation PDF saved.</p>
          </div>
        </div>
      )}

      {/* SERVICES SHOWCASE SECTION */}
      <section ref={divisionsSectionRef} className="dropdown-scroll-content py-20 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="mb-12">
            <span className="text-xs font-mono tracking-widest text-[#A49050] uppercase">CORE CAPABILITIES</span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#18253A] mt-1">Our Professional Divisions</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {paginatedServices.map((service, index) => {
              const divisionNum = startIndex + index + 1;
              return (
                <div
                  key={service.id}
                  id={`service-card-${service.slug}`}
                  className="bg-white border border-[#A49050]/30 rounded-md overflow-hidden shadow-sm hover:shadow-2xl hover:border-[#3E4C60] transition-all duration-500 flex flex-col justify-between group hover:-translate-y-1.5 scroll-mt-28"
                >
                  {/* Image & Overlay Banner */}
                  <div className="relative h-56 overflow-hidden bg-[#18253A]">
                    <img 
                      src={service.image} 
                      alt={service.title}
                      className="w-full h-full object-cover transform scale-100 group-hover:scale-110 transition-transform duration-700 ease-out opacity-90 group-hover:opacity-100"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#18253A] via-[#18253A]/40 to-transparent opacity-80 group-hover:opacity-60 transition-opacity"></div>
                    
                    <div className="absolute top-4 left-4 z-10">
                      <span className="text-[10px] font-mono bg-[#18253A]/80 backdrop-blur-md text-[#D6C489] border border-[#A49050]/40 px-3 py-1 rounded font-bold uppercase tracking-widest">
                        Division #{divisionNum < 10 ? `0${divisionNum}` : divisionNum}
                      </span>
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 z-10">
                      <h3 className="text-xl font-serif font-bold text-white group-hover:text-[#D6C489] transition-colors leading-snug">
                        {service.title}
                      </h3>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 flex flex-col flex-1 justify-between gap-6">
                    <p className="text-xs sm:text-sm text-[#18253A]/75 leading-relaxed font-light">
                      {service.shortDesc}
                    </p>

                    {/* Actions */}
                    <div className="pt-4 border-t border-gray-100 flex items-center gap-3">
                      <button
                        onClick={() => setSelectedService(service)}
                        className="flex-1 bg-[#18253A] hover:bg-[#3E4C60] hover:text-[#D6C489] text-white py-2.5 px-4 text-xs font-mono font-bold tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2 rounded-md shadow hover:shadow-md group-hover:bg-[#3E4C60] group-hover:text-[#D6C489]"
                      >
                        <Eye className="w-3.5 h-3.5 text-[#D6C489] transition-colors" />
                        <span>View Details</span>
                      </button>
                      <button
                        onClick={() => handleDownloadBrochure(service.title)}
                        className="p-2.5 bg-[#F1F3F5] hover:bg-[#A49050]/20 text-[#18253A] border border-[#A49050]/30 transition-all duration-300 rounded-md hover:border-[#18253A]"
                        title="Download PDF Brief"
                        aria-label="Download PDF Brief"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
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
                  Showing {startIndex + 1}–{endIndex} of {SERVICES.length} divisions
                </span>
              </div>

              {/* Desktop / Tablet Pagination View (sm and above) */}
              <div className="hidden sm:flex items-center justify-between w-full">
                <span className="text-xs text-[#18253A]/70 font-medium">
                  Showing <strong className="text-gray-900">{startIndex + 1}–{endIndex}</strong> of <strong className="text-gray-900">{SERVICES.length}</strong> divisions • Page <strong className="text-gray-900">{safePage}</strong> of <strong className="text-gray-900">{totalPages}</strong>
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

        </div>
      </section>

      {/* DETAILED SERVICE MODAL */}
      {selectedService && (
        <div key={selectedService.id} className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#18253A]/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-white w-full max-w-6xl md:h-[85vh] max-h-[92vh] rounded-3xl shadow-2xl relative flex flex-col md:flex-row overflow-hidden">
            <button
              onClick={() => setSelectedService(null)}
              className="absolute top-5 right-5 z-20 p-2.5 bg-white/95 hover:bg-white text-[#18253A] rounded-full shadow-lg transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left: thumbnail image, slides in from the left on open */}
            <div className="service-modal-image-panel relative w-full h-56 md:h-full md:w-[42%] shrink-0 overflow-hidden">
              <img
                src={selectedService.image}
                alt={selectedService.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#18253A]/60 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-[#18253A]/15"></div>
            </div>

            {/* Right: details content, slides in from the right on open */}
            <div className="service-modal-content-panel flex-1 flex flex-col justify-between overflow-hidden">
              {/* Header */}
              <div className="px-6 pt-6 pb-3 sm:px-8 sm:pt-8 sm:pb-3.5 border-b border-gray-100 shrink-0">
                <span className="inline-flex w-fit items-center text-xs font-medium text-[#A49050] bg-[#A49050]/10 border border-[#A49050]/30 px-3 py-1 rounded-full mb-2">
                  AGICL Practice Division
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#18253A]">
                  {selectedService.title}
                </h3>
              </div>

              {/* Scrollable Content */}
              <div className="px-6 py-4 sm:px-8 sm:py-5 overflow-y-auto space-y-5 flex-1">
                {/* Section 1: Overview */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#18253A] border-b border-gray-200 pb-1.5">
                    Overview
                  </h4>
                  <p className="text-sm text-[#18253A]/75 leading-relaxed">
                    {selectedService.description}
                  </p>
                </div>

                {/* Section 2: Key Deliverables */}
                <div className="space-y-2 pt-1">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#18253A] border-b border-gray-200 pb-1.5">
                    Key Deliverables
                  </h4>
                  <ul className="space-y-1.5 text-xs">
                    {selectedService.deliverables.map((del, dIdx) => (
                      <li key={dIdx} className="flex items-start gap-2">
                        <span className="text-[#A49050] font-bold text-sm leading-none mt-0.5">•</span>
                        <span className="font-medium text-[#18253A]/90 leading-relaxed">{del}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Section 3: How We Deliver It */}
                <div className="space-y-2 pt-1">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#18253A] border-b border-gray-200 pb-1.5">
                    How We Deliver It
                  </h4>
                  <p className="text-sm text-[#18253A]/75 leading-relaxed bg-[#F1F3F5] p-3.5 rounded-sm">
                    {selectedService.methodology}
                  </p>
                </div>
              </div>

              {/* Footer Buttons */}
              <div className="flex items-center justify-end gap-3 px-6 sm:px-10 py-5 border-t border-gray-100 bg-[#F1F3F5]/50 shrink-0">
                <button
                  onClick={() => setSelectedService(null)}
                  className="px-5 py-2.5 text-sm font-medium text-[#18253A] hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
                >
                  Close
                </button>
                <button
                  onClick={() => handleDownloadBrochure(selectedService.title)}
                  className="px-6 py-2.5 bg-[#3E4C60] hover:bg-[#18253A] text-white hover:text-[#D6C489] text-sm font-medium rounded-full shadow-md hover:shadow-lg transition-all flex items-center gap-2 border border-[#A49050]/30 cursor-pointer"
                >
                  <Download className="w-4 h-4 text-[#D6C489]" />
                  <span>Download Service Brief</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
