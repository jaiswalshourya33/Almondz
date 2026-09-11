import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SERVICES, Service } from '../data/services';
import { CheckCircle2, Eye, X, Download, ChevronLeft, ChevronRight } from 'lucide-react';
import { PageHeroBanner } from '../components/PageHeroBanner';
import { downloadServiceBriefPdf } from '../lib/serviceBriefPdf';

const SERVICES_PER_PAGE = 6;

export const ServicesPage: React.FC = () => {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [downloadNotice, setDownloadNotice] = useState<{ title: string; ok: boolean } | null>(null);
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

  const handleDownloadBrochure = async (service: Service) => {
    let ok = true;
    try {
      await downloadServiceBriefPdf(service);
    } catch (err) {
      ok = false;
      // eslint-disable-next-line no-console
      console.error('Service brief PDF generation failed', err);
    }
    setDownloadNotice({ title: service.title, ok });
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
        <div className={`fixed bottom-8 right-8 z-50 text-white px-6 py-4 border shadow-2xl flex items-center gap-3 animate-fade-in rounded-md ${downloadNotice.ok ? 'bg-[#2B4A6D] border-[#3E4C60]' : 'bg-[#7A2E22] border-[#A5442F]'}`}>
          {downloadNotice.ok ? (
            <CheckCircle2 className="w-5 h-5 text-[#D6C489] shrink-0" />
          ) : (
            <X className="w-5 h-5 text-white shrink-0" />
          )}
          <div>
            <p className="text-xs font-mono font-bold">
              {downloadNotice.ok ? 'SERVICE BRIEF DOWNLOADED' : 'DOWNLOAD FAILED'}
            </p>
            <p className="text-xs text-white/80">
              {downloadNotice.ok
                ? `${downloadNotice.title} — PDF saved to your device.`
                : `Could not generate the ${downloadNotice.title} PDF. Please try again.`}
            </p>
          </div>
        </div>
      )}

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
                  className="bg-white border border-[#A49050]/30 rounded-md overflow-hidden shadow-sm hover:shadow-2xl hover:border-[#3E4C60] transition-all duration-500 flex flex-col justify-between group hover:-translate-y-1.5 scroll-mt-28"
                >
                  {/* Image & Overlay Banner */}
                  <div className="relative h-56 overflow-hidden bg-[#2B4A6D]">
                    <img 
                      src={service.image} 
                      alt={service.title}
                      className="w-full h-full object-cover transform scale-100 group-hover:scale-110 transition-transform duration-700 ease-out opacity-90 group-hover:opacity-100"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#2B4A6D] via-[#2B4A6D]/40 to-transparent opacity-80 group-hover:opacity-60 transition-opacity"></div>
                    
                    <div className="absolute top-4 left-4 z-10">
                      <span className="text-[10px] font-mono bg-[#2B4A6D]/80 backdrop-blur-md text-[#D6C489] border border-[#A49050]/40 px-3 py-1 rounded font-bold uppercase tracking-widest">
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
                    <p className="text-xs sm:text-sm text-black leading-relaxed font-normal">
                      {service.shortDesc}
                    </p>

                    {/* Actions */}
                    <div className="pt-4 border-t border-gray-100 flex items-center gap-3">
                      <button
                        onClick={() => setSelectedService(service)}
                        className="flex-1 bg-[#2B4A6D] hover:bg-[#3E4C60] hover:text-[#D6C489] text-white py-2.5 px-4 text-xs font-mono font-bold tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2 rounded-md shadow hover:shadow-md group-hover:bg-[#3E4C60] group-hover:text-[#D6C489]"
                      >
                        <Eye className="w-3.5 h-3.5 text-[#D6C489] transition-colors" />
                        <span>View Details</span>
                      </button>
                      <button
                        onClick={() => handleDownloadBrochure(service)}
                        className="p-2.5 bg-[#F1F3F5] hover:bg-[#A49050]/20 text-[#2B4A6D] border border-[#A49050]/30 transition-all duration-300 rounded-md hover:border-[#2B4A6D] cursor-pointer"
                        title="Download PDF Brief"
                        aria-label={`Download ${service.title} PDF brief`}
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
                <span className="text-xs text-[#2B4A6D]/70 font-medium">
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
        <div 
          key={selectedService.id} 
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedService(null);
          }}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-6 bg-[#2B4A6D]/75 backdrop-blur-sm animate-fade-in"
        >
          <div className="bg-white w-full max-w-4xl max-h-[70vh] sm:max-h-[74vh] md:max-h-[78vh] md:h-[72vh] rounded-2xl sm:rounded-3xl shadow-2xl relative flex flex-col md:flex-row overflow-hidden border border-[#A49050]/20">
            <button
              onClick={() => setSelectedService(null)}
              className="absolute top-2.5 right-2.5 sm:top-3.5 sm:right-3.5 z-20 p-1.5 sm:p-2 bg-black/45 hover:bg-black/70 text-white backdrop-blur-md rounded-full shadow-md transition-all cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
            </button>

            {/* Left: compact thumbnail banner on mobile, side panel on desktop */}
            <div className="service-modal-image-panel relative w-full h-24 sm:h-32 md:h-full md:w-[36%] shrink-0 overflow-hidden bg-[#2B4A6D]">
              <img
                src={selectedService.image}
                alt={selectedService.title}
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2B4A6D]/80 via-black/20 to-transparent md:bg-gradient-to-r md:from-transparent md:to-[#2B4A6D]/20"></div>
            </div>

            {/* Right: details content panel */}
            <div className="service-modal-content-panel flex-1 flex flex-col justify-between overflow-hidden min-h-0">
              {/* Header */}
              <div className="px-4 pt-3 pb-2 sm:px-6 sm:pt-4 sm:pb-2.5 border-b border-gray-100 shrink-0 bg-white">
                <span className="inline-flex w-fit items-center text-[9px] sm:text-[11px] font-mono font-bold text-[#A49050] bg-[#A49050]/10 border border-[#A49050]/30 px-2 py-0.5 rounded-full mb-1 sm:mb-1.5 uppercase tracking-wider">
                  AGICL Practice Division
                </span>
                <h3 className="text-base sm:text-xl md:text-2xl font-serif font-bold text-[#2B4A6D] leading-tight line-clamp-2 sm:line-clamp-none">
                  {selectedService.title}
                </h3>
              </div>

              {/* Scrollable Content */}
              <div className="px-4 py-2.5 sm:px-6 sm:py-3.5 overflow-y-auto space-y-2.5 sm:space-y-3.5 flex-1 min-h-0">
                {/* Section 1: Overview */}
                <div className="space-y-1">
                  <h4 className="text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-wider text-[#2B4A6D]/80 border-b border-gray-100 pb-0.5">
                    Overview
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-800 leading-relaxed font-normal">
                    {selectedService.description}
                  </p>
                </div>

                {/* Section 2: Key Deliverables */}
                <div className="space-y-1 pt-0.5">
                  <h4 className="text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-wider text-[#2B4A6D]/80 border-b border-gray-100 pb-0.5">
                    Key Deliverables
                  </h4>
                  <ul className="space-y-1 text-xs sm:text-sm">
                    {selectedService.deliverables.map((del, dIdx) => (
                      <li key={dIdx} className="flex items-start gap-2">
                        <span className="text-[#A49050] font-bold text-sm leading-none mt-0.5">•</span>
                        <span className="font-normal text-gray-800 leading-relaxed">{del}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Section 3: How We Deliver It */}
                <div className="space-y-1 pt-0.5">
                  <h4 className="text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-wider text-[#2B4A6D]/80 border-b border-gray-100 pb-0.5">
                    How We Deliver It
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-800 leading-relaxed bg-[#F8FAFC] p-2.5 sm:p-3 rounded-lg border border-gray-100 font-normal">
                    {selectedService.methodology}
                  </p>
                </div>
              </div>

              {/* Footer Buttons */}
              <div className="flex items-center justify-end gap-2 px-4 py-2 sm:px-6 sm:py-3 border-t border-gray-100 bg-[#F8FAFC] shrink-0">
                <button
                  onClick={() => setSelectedService(null)}
                  className="px-3 py-1.5 text-xs font-medium text-[#2B4A6D] hover:bg-gray-200/60 rounded-full transition-colors cursor-pointer"
                >
                  Close
                </button>
                <button
                  onClick={() => handleDownloadBrochure(selectedService)}
                  className="px-3.5 sm:px-4 py-1.5 sm:py-2 bg-[#2B4A6D] hover:bg-[#1E354F] text-white text-xs font-medium rounded-full shadow-sm hover:shadow transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-[#D6C489]" />
                  <span>Download PDF Brief</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
