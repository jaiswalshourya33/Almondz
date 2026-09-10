import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { CERTIFICATIONS, Certification } from '../data/certifications';
import {
  Award,
  Eye,
  X,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { PageHeroBanner } from '../components/PageHeroBanner';

// Authentic, verified official institutional client & partner logos
import nhaiLogo from '../images/partners/nhai.jpg';
import morthLogo from '../images/partners/morth.svg';
import worldBankLogo from '../images/partners/world-bank.svg';
import adbLogo from '../images/partners/adb.svg';
import nitiAayogLogo from '../images/partners/niti-aayog.svg';
import ddaLogo from '../images/partners/dda.png';
import mmrdaLogo from '../images/partners/mmrda.png';

const CERTS_PER_PAGE = 6;

// 100% Genuine Verified Institutional Client Logos
const AUTHENTIC_CLIENT_LOGOS = [
  { id: 'nhai', name: 'National Highways Authority of India (NHAI)', logo: nhaiLogo },
  { id: 'morth', name: 'Ministry of Road Transport & Highways (MoRTH)', logo: morthLogo },
  { id: 'worldbank', name: 'World Bank Group', logo: worldBankLogo },
  { id: 'adb', name: 'Asian Development Bank (ADB)', logo: adbLogo },
  { id: 'nitiaayog', name: 'NITI Aayog (Government of India)', logo: nitiAayogLogo },
  { id: 'dda', name: 'Delhi Development Authority (DDA)', logo: ddaLogo },
  { id: 'mmrda', name: 'Mumbai Metropolitan Region Development Authority (MMRDA)', logo: mmrdaLogo },
];

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

  // Single Row of Authentic Client Logos duplicated for seamless infinite loop
  const marqueeLogos = [
    ...AUTHENTIC_CLIENT_LOGOS,
    ...AUTHENTIC_CLIENT_LOGOS,
    ...AUTHENTIC_CLIENT_LOGOS,
    ...AUTHENTIC_CLIENT_LOGOS,
  ];

  return (
    <div className="about-dropdown-page flex flex-col min-h-screen bg-[#F1F3F5] pt-24">
      {/* Header Banner with Clean Energy Infrastructure Background */}
      <PageHeroBanner
        line1="QUALITY ASSURANCE."
        line2="ACCREDITATIONS & EMPANELMENTS."
        description="Rigorous quality management systems, international ISO accreditations, and premier institutional empanelments backing every infrastructure consultancy deliverable."
      />

      {/* CERTIFICATIONS SECTION */}
      <section ref={certsSectionRef} className="about-dropdown-content pt-20 pb-10 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <span className="text-xs font-mono tracking-widest text-[#D96B33] uppercase">ISO & COMPLIANCE</span>
            <h2 className="text-3xl font-serif font-bold text-[#2B4A6D] mt-1">Accredited Quality Standards</h2>
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
                  <h3 className="text-lg font-serif font-bold text-[#2B4A6D] group-hover:text-[#D96B33] transition-colors leading-snug">{cert.title}</h3>
                </div>

                <div className="pt-6 mt-6 border-t border-gray-100">
                  <button
                    onClick={() => setSelectedCert(cert)}
                    className="w-full bg-[#2B4A6D] hover:bg-[#1E2D44] text-white py-2.5 px-4 text-xs font-mono font-bold tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2 rounded-md shadow hover:shadow-md cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5 text-[#D96B33]" />
                    <span>View Certificate</span>
                  </button>
                </div>
              </div>
            ))}
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
                  Showing {startIndex + 1}–{endIndex} of {CERTIFICATIONS.length} certificates
                </span>
              </div>

              {/* Desktop / Tablet Pagination View (sm and above) */}
              <div className="hidden sm:flex items-center justify-between w-full">
                <span className="text-xs text-[#2B4A6D]/70 font-medium">
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

      {/* INSTITUTIONAL EMPANELMENTS & CLIENTS MARQUEE (PURE VERIFIED LOGOS ONLY - SINGLE ROW) */}
      <section className="pt-10 pb-20 bg-[#2B4A6D]/5 border-t border-[#A49050]/20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={empanelmentsHeaderRef} className="empanelments-header text-center max-w-3xl mx-auto mb-10">
            <span className="text-xs font-mono tracking-widest text-[#D96B33] uppercase">GOVERNMENT & MULTILATERAL RECOGNITION</span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#2B4A6D] mt-1">
              Empanelled with Premier Authorities & Financial Institutions
            </h2>
            <p className="text-xs sm:text-sm text-[#2B4A6D]/70 mt-3 leading-relaxed">
              Almondz Global Infra-Consultant Limited (AGICL) is officially empanelled as an Independent Engineer, Technical Consultant, and Transaction Advisor across India and international multilateral agencies.
            </p>
          </div>
        </div>

        {/* Ultra-Smooth Single-Row Continuous Running Marquee (Pure Authentic Logos Only) with Edge Blurs */}
        <div className="client-logo-marquee relative w-full overflow-hidden py-3">
          {/* Subtle Edge Blur & Gradient Fade Overlays on both ends (constrained to marquee only) */}
          <div className="absolute inset-y-0 left-0 w-16 sm:w-28 bg-gradient-to-r from-[#F1F3F5] via-[#F1F3F5]/80 to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-16 sm:w-28 bg-gradient-to-l from-[#F1F3F5] via-[#F1F3F5]/80 to-transparent z-10 pointer-events-none" />

          {/* Running Track (Single Continuous Infinite Scrolling Row) */}
          <div className="client-logo-marquee__track flex flex-row flex-nowrap items-center">
            {marqueeLogos.map((client, idx) => (
              <div
                key={`single-${client.id}-${idx}`}
                className="h-14 sm:h-16 w-36 sm:w-44 shrink-0 bg-white border border-[#A49050]/20 hover:border-[#D96B33] rounded-xl px-4 py-2 shadow-[0_2px_8px_rgba(0,0,0,0.03)] hover:shadow-[0_6px_16px_rgba(43, 74, 109,0.1)] flex items-center justify-center transition-all duration-300 hover:scale-105 group cursor-default"
                title={client.name}
              >
                <img
                  src={client.logo}
                  alt={client.name}
                  className="max-h-7 sm:max-h-8 max-w-[75%] w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CERTIFICATE VIEW MODAL */}
      {selectedCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-white border border-[#A49050] w-full max-w-3xl max-h-[90vh] overflow-y-auto p-8 shadow-2xl relative rounded-md flex flex-col gap-6">
            <button
              onClick={() => setSelectedCert(null)}
              className="absolute top-4 right-4 p-2 text-gray-500 hover:text-[#2B4A6D] bg-gray-100 hover:bg-gray-200 transition-colors rounded-md cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 border-b border-[#A49050]/20 pb-4">
              <div className="w-10 h-10 bg-[#2B4A6D] text-[#D96B33] flex items-center justify-center rounded-md">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-[#D96B33] tracking-widest uppercase">OFFICIAL ACCREDITATION CERTIFICATE</span>
                <h3 className="text-xl font-serif font-bold text-[#2B4A6D]">{selectedCert.title}</h3>
              </div>
            </div>

            {/* Original Certificate Image Preview Box */}
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
                className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-[#2B4A6D] text-xs font-mono font-bold tracking-wider uppercase transition-colors rounded-md cursor-pointer"
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
