import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import gsap from 'gsap';
import { FileText, Eye, ChevronLeft, ChevronRight, FileCheck2 } from 'lucide-react';
import type { AnnualReturnFiling } from '../data/corporateGovernance';

interface AnnualReturnSectionProps {
  annualReturns: AnnualReturnFiling[];
  onSelectFiling: (filing: AnnualReturnFiling) => void;
  returnsPerPage?: number;
}

export const AnnualReturnSection: React.FC<AnnualReturnSectionProps> = ({
  annualReturns,
  onSelectFiling,
  returnsPerPage = 5,
}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const rowsListRef = useRef<HTMLUListElement | null>(null);

  const totalPages = Math.max(1, Math.ceil(annualReturns.length / returnsPerPage));
  const activePage = Math.min(currentPage, totalPages - 1);
  const startIndex = activePage * returnsPerPage;
  const visibleFilings = annualReturns.slice(startIndex, startIndex + returnsPerPage);

  // Mirror the site-wide pagination contract (1-indexed page + goToPage) used on
  // the Management Team / Projects / Services pages so this control matches them.
  const safePage = activePage + 1;
  const endIndex = startIndex + visibleFilings.length;
  const goToPage = (page: number) => {
    const clamped = Math.min(Math.max(page, 1), totalPages);
    setCurrentPage(clamped - 1);
  };

  // GSAP stagger animation on page change
  useEffect(() => {
    if (!rowsListRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.gsap-return-row',
        { opacity: 0, y: 20, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.45,
          stagger: 0.08,
          ease: 'power3.out',
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [activePage]);

  if (!annualReturns.length) return null;

  return (
    <div ref={containerRef} className="w-full my-8">
      {/* Top Header Stat Bar */}
      <div className="flex items-center justify-between gap-4 mb-6 flex-wrap">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-[#A49050] bg-[#A49050]/10 border border-[#A49050]/25">
            <FileCheck2 className="w-3.5 h-3.5 text-[#A49050]" />
            {annualReturns.length} Statutory Filings
          </span>
        </div>

        <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#18253A]/50">
          Showing {startIndex + 1}&ndash;{startIndex + visibleFilings.length} of {annualReturns.length}
        </span>
      </div>

      {/* Filings List with Framer Motion AnimatePresence */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activePage}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          <ul ref={rowsListRef} className="flex flex-col gap-4">
            {visibleFilings.map((filing, i) => (
              <motion.li
                key={`${filing.period}-${filing.form}-${i}`}
                whileHover={{ scale: 1.01, x: 4 }}
                whileTap={{ scale: 0.995 }}
                transition={{ type: 'spring', stiffness: 400, damping: 28 }}
                className="gsap-return-row group relative flex items-center justify-between gap-4 sm:gap-6 bg-gradient-to-r from-white via-[#FCFAF5] to-[#FAF5EB] border border-[#A49050]/25 rounded-2xl px-5 sm:px-8 py-5 shadow-[0_4px_20px_-4px_rgba(164,144,80,0.1)] hover:shadow-[0_12px_32px_-6px_rgba(164,144,80,0.22)] hover:border-[#A49050]/50 transition-all duration-300 overflow-hidden"
              >
                <div className="flex items-center gap-4 sm:gap-6 min-w-0 flex-1">
                  {/* PDF Document Badge Avatar */}
                  <div className="shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br from-[#FAF6EE] to-[#F3ECD8] border border-[#A49050]/35 flex items-center justify-center text-[#A49050] shadow-sm group-hover:scale-105 group-hover:border-[#A49050]/60 transition-transform duration-300">
                    <FileText className="w-6 h-6 text-[#A49050]" />
                  </div>

                  {/* Title & Metadata */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-3 flex-wrap">
                      <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#18253A] group-hover:text-[#A49050] transition-colors leading-tight">
                        {filing.period}
                      </h3>

                      <span className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold tracking-wider uppercase text-[#8A7942] bg-[#FAF6EE] border border-[#D6C489]/70 rounded-full px-3 py-1 shadow-2xs">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#A49050]" />
                        Form {filing.form}
                      </span>
                    </div>

                    <p className="text-[11px] sm:text-xs text-[#18253A]/55 mt-1 font-mono uppercase tracking-wider flex items-center gap-2">
                      <span>Registrar of Companies Filing</span>
                      <span className="w-1 h-1 rounded-full bg-[#A49050]/40" />
                      <span>Section 92 Disclosure</span>
                    </p>
                  </div>
                </div>

                {/* View Action Button */}
                <motion.button
                  type="button"
                  onClick={() => onSelectFiling(filing)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="shrink-0 inline-flex items-center gap-2.5 bg-gradient-to-r from-[#18253A] to-[#2C3E50] hover:from-[#A49050] hover:to-[#8C7A3E] text-white px-5 sm:px-7 py-3.5 text-xs font-mono font-bold tracking-widest uppercase rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
                  aria-label={`View Annual Return ${filing.period} (Form ${filing.form})`}
                >
                  <Eye className="w-4 h-4 text-[#C5A85A] group-hover:text-white transition-colors" />
                  <span>View</span>
                </motion.button>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </AnimatePresence>

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
              Showing {startIndex + 1}&ndash;{endIndex} of {annualReturns.length} filings
            </span>
          </div>

          {/* Desktop / Tablet Pagination View (sm and above) */}
          <div className="hidden sm:flex items-center justify-between w-full">
            <span className="text-xs text-[#18253A]/70 font-medium">
              Showing <strong className="text-gray-900">{startIndex + 1}&ndash;{endIndex}</strong> of <strong className="text-gray-900">{annualReturns.length}</strong> filings • Page <strong className="text-gray-900">{safePage}</strong> of <strong className="text-gray-900">{totalPages}</strong>
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
  );
};
