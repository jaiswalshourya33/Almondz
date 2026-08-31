import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { CERTIFICATIONS, EMPANELMENTS, Certification } from '../data/certifications';
import { Award, ShieldCheck, Eye, X, Building2, ChevronLeft, ChevronRight } from 'lucide-react';

const CERTS_PER_PAGE = 6;

export const CertificationsPage: React.FC = () => {
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const certsSectionRef = useRef<HTMLElement | null>(null);
  const empanelmentsHeaderRef = useRef<HTMLDivElement | null>(null);
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

  useEffect(() => {
    const header = empanelmentsHeaderRef.current;
    if (!header || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          header.classList.add('is-visible');
          observer.unobserve(header);
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(header);
    return () => observer.disconnect();
  }, []);

  const totalPages = Math.max(1, Math.ceil(CERTIFICATIONS.length / CERTS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);
  const startIndex = (safePage - 1) * CERTS_PER_PAGE;
  const endIndex = Math.min(startIndex + CERTS_PER_PAGE, CERTIFICATIONS.length);
  const paginatedCerts = CERTIFICATIONS.slice(startIndex, endIndex);

  const goToPage = (page: number) => {
    const clamped = Math.min(Math.max(page, 1), totalPages);
    setCurrentPage(clamped);
    certsSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="about-dropdown-page flex flex-col min-h-screen bg-[#F1F3F5] pt-24">
      {/* Hero Header */}
      <section className="bg-[#53647D] text-white py-16 sm:py-20 border-b border-[#A49050]/30 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="about-dropdown-banner-copy flex flex-col gap-5 max-w-3xl">
            <span className="inline-flex w-fit items-center text-xs font-mono tracking-widest text-[#A49050] uppercase bg-[#A49050]/10 border border-[#A49050]/30 px-4 py-1.5 rounded-full">QUALITY ASSURANCE & ACCREDITATIONS</span>
            <h1 ref={heroHeadingRef} className="text-4xl sm:text-5xl font-serif font-bold tracking-tight">Certifications & Institutional Empanelments</h1>
            <div
              className="services-hero-line h-[3px] bg-[#A49050] rounded-full"
              style={{ width: heroLineWidth ? `${heroLineWidth}px` : '4rem' }}
            ></div>
            <p className="text-white/80 text-base leading-relaxed">
              Rigorous quality management systems, international ISO accreditations, and premier institutional empanelments backing every infrastructure consultancy deliverable.
            </p>
          </div>
        </div>
      </section>

      {/* CERTIFICATIONS SECTION */}
      <section ref={certsSectionRef} className="about-dropdown-content pt-20 pb-10 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 pb-6 border-b border-[#A49050]/20">
            <span className="text-xs font-mono tracking-widest text-[#D96B33] uppercase">ISO & COMPLIANCE</span>
            <h2 className="text-3xl font-serif font-bold text-[#18253A] mt-1">Accredited Quality Standards</h2>
          </div>

          <div key={safePage} className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-fade-in">
            {paginatedCerts.map((cert, idx) => (
              <div
                key={idx}
                className="bg-white border border-[#A49050]/30 p-6 shadow-sm flex flex-col justify-between hover:border-[#D96B33] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group rounded-md"
              >
                <div className="flex flex-col gap-4">
                  <div className="w-full aspect-[4/3] bg-[#F1F3F5] border border-[#A49050]/20 rounded-md overflow-hidden flex items-center justify-center">
                    <img
                      src={cert.image}
                      alt={cert.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <h3 className="text-lg font-serif font-bold text-[#18253A] group-hover:text-[#D96B33] transition-colors leading-snug">{cert.title}</h3>
                </div>

                <div className="pt-6 mt-6 border-t border-gray-100">
                  <button
                    onClick={() => setSelectedCert(cert)}
                    className="w-full bg-[#18253A] hover:bg-[#1E2D44] text-white py-2.5 px-4 text-xs font-mono font-bold tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2 rounded-md shadow hover:shadow-md"
                  >
                    <Eye className="w-3.5 h-3.5 text-[#D96B33]" />
                    <span>View Certificate</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Cursor & Page-based Responsive Pagination — same styling/behavior as the Sector Detail page */}
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
                  Showing {startIndex + 1}–{endIndex} of {CERTIFICATIONS.length} certificates
                </span>
              </div>

              {/* Desktop / Tablet Pagination View (sm and above) */}
              <div className="hidden sm:flex items-center justify-between w-full">
                <span className="text-xs text-[#18253A]/70 font-medium">
                  Showing <strong className="text-gray-900">{startIndex + 1}–{endIndex}</strong> of <strong className="text-gray-900">{CERTIFICATIONS.length}</strong> certificates • Page <strong className="text-gray-900">{safePage}</strong> of <strong className="text-gray-900">{totalPages}</strong>
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

      {/* INSTITUTIONAL EMPANELMENTS SECTION */}
      <section className="pt-10 pb-20 bg-[#18253A]/5 border-t border-[#A49050]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={empanelmentsHeaderRef} className="empanelments-header text-center max-w-3xl mx-auto mb-10">
            <span className="text-xs font-mono tracking-widest text-[#D96B33] uppercase">GOVERNMENT & MULTILATERAL RECOGNITION</span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#18253A] mt-2">Institutional Empanelments</h2>
            <p className="text-xs sm:text-sm text-[#18253A]/70 mt-3 leading-relaxed">
              Almondz Global Infra-Consultant Limited is officially empanelled as an independent engineer, technical advisor, and design consultant with premier national and international authorities — spanning central government bodies, state governments and development authorities, and national scheduled banks.
            </p>
          </div>

          {/* Same auto-scrolling marquee technique as the landing page's
              sector-figures section (index.css .partner-marquee), just with
              a wider card-shaped item instead of a plain stat tile. Pauses
              on hover; the list is duplicated so the loop is seamless. */}
          <div className="partner-marquee" aria-label="Institutional empanelments">
            <div className="partner-marquee__track">
              {[...EMPANELMENTS, ...EMPANELMENTS].map((emp, idx) => (
                <div
                  key={`${emp.name}-${idx}`}
                  className="partner-marquee__item partner-marquee__item--empanelment group"
                >
                  <div className="flex items-start gap-4">
                    {emp.logo ? (
                      <div className="w-14 h-14 bg-white border border-[#A49050]/20 rounded-xl shadow-sm shrink-0 flex items-center justify-center p-2 group-hover:border-[#D96B33]/40 group-hover:shadow-md transition-all duration-300">
                        <img
                          src={emp.logo}
                          alt={`${emp.name} logo`}
                          className="max-w-full max-h-full object-contain"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    ) : (
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#D96B33]/15 to-[#D96B33]/5 text-[#D96B33] flex items-center justify-center shrink-0 group-hover:from-[#D96B33] group-hover:to-[#C25A28] group-hover:text-white transition-all duration-300 shadow-sm group-hover:shadow-md">
                        <Building2 className="w-6 h-6" />
                      </div>
                    )}
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <h4 className="text-base font-serif font-bold text-[#18253A]">{emp.name}</h4>
                        <ShieldCheck className="w-4 h-4 text-[#D96B33]" />
                      </div>
                      <p className="text-xs text-[#18253A]/70 mt-2 leading-relaxed">{emp.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CERTIFICATE VIEW MODAL */}
      {selectedCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-white border border-[#A49050] w-full max-w-3xl max-h-[90vh] overflow-y-auto p-8 shadow-2xl relative rounded-md flex flex-col gap-6">
            <button
              onClick={() => setSelectedCert(null)}
              className="absolute top-4 right-4 p-2 text-gray-500 hover:text-[#18253A] bg-gray-100 hover:bg-gray-200 transition-colors rounded-md"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 border-b border-[#A49050]/20 pb-4">
              <div className="w-10 h-10 bg-[#18253A] text-[#D96B33] flex items-center justify-center rounded-md">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-[#D96B33] tracking-widest uppercase">OFFICIAL ACCREDITATION CERTIFICATE</span>
                <h3 className="text-xl font-serif font-bold text-[#18253A]">{selectedCert.title}</h3>
              </div>
            </div>

            {/* Original Certificate Image — a fixed-height preview box (not tied to
                the image's own resolution) so every certificate previews at the
                same, standard size. object-contain scales the image down (or up)
                to fit fully within the box with no cropping; shrink-0 stops the
                flex-column modal from squeezing this box smaller than h-[65vh]. */}
            <div className="bg-[#F1F3F5] border border-[#A49050]/30 rounded-md overflow-hidden flex items-center justify-center shrink-0 h-[65vh]">
              <img
                src={selectedCert.image}
                alt={selectedCert.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain"
              />
            </div>

            <div className="flex items-center justify-end pt-4 border-t border-gray-100">
              <button
                onClick={() => setSelectedCert(null)}
                className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-[#18253A] text-xs font-mono font-bold tracking-wider uppercase transition-colors rounded-md"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
