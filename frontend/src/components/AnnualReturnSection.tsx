import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import gsap from 'gsap';
import { Eye, ChevronLeft, ChevronRight, FileText } from 'lucide-react';
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
  const tableRef = useRef<HTMLDivElement | null>(null);

  const totalPages = Math.max(1, Math.ceil(annualReturns.length / returnsPerPage));
  const activePage = Math.min(currentPage, totalPages - 1);
  const startIndex = activePage * returnsPerPage;
  const visibleFilings = annualReturns.slice(startIndex, startIndex + returnsPerPage);

  const safePage = activePage + 1;
  const endIndex = startIndex + visibleFilings.length;
  const goToPage = (page: number) => {
    const clamped = Math.min(Math.max(page, 1), totalPages);
    setCurrentPage(clamped - 1);
  };

  // GSAP stagger animation on page change
  useEffect(() => {
    if (!tableRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.gsap-return-row',
        { opacity: 0, y: 10 },
        {
          opacity: 1,
          y: 0,
          duration: 0.3,
          stagger: 0.05,
          ease: 'power2.out',
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [activePage]);

  if (!annualReturns.length) return null;

  return (
    <div ref={containerRef} className="w-full my-3 sm:my-6">
      {/* Container Card */}
      <div className="bg-white rounded-2xl border border-[#2B4A6D]/15 p-4 sm:p-6 lg:p-8 shadow-[0_8px_30px_-8px_rgba(43,74,109,0.06)] w-full">
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 sm:pb-5 border-b border-[#2B4A6D]/10">
          <div>
            <span className="text-[10px] sm:text-[11px] font-mono font-semibold uppercase tracking-wider text-[#A49050] block mb-1">
              Statutory Register
            </span>
            <h3 className="text-lg sm:text-2xl lg:text-3xl font-serif font-bold text-[#2B4A6D] tracking-tight">
              Annual Return Filings
            </h3>
          </div>

          <span className="self-start sm:self-auto inline-flex items-center text-[10px] sm:text-[11px] font-mono text-[#2B4A6D]/60 bg-[#F1F3F5] px-2.5 py-1 rounded-md uppercase tracking-wider">
            Showing {startIndex + 1}&ndash;{endIndex} of {annualReturns.length} Filings
          </span>
        </div>

        {/* Content with AnimatePresence */}
        <div ref={tableRef} className="mt-4 sm:mt-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activePage}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            >
              {/* Desktop & Tablet Table (>= md: 768px+) */}
              <div className="hidden md:block overflow-x-auto w-full">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-[#2B4A6D]/15 text-[11px] font-mono uppercase tracking-wider text-[#2B4A6D]/60 bg-[#F8FAFC]">
                      <th className="py-3.5 px-4 w-12 text-center font-semibold">#</th>
                      <th className="py-3.5 px-4 font-semibold">Financial Year</th>
                      <th className="py-3.5 px-4 w-32 font-semibold">Form</th>
                      <th className="py-3.5 px-4 font-semibold">Statutory Description</th>
                      <th className="py-3.5 px-4 w-32 text-right font-semibold">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#2B4A6D]/10 text-sm">
                    {visibleFilings.map((filing, i) => {
                      const absoluteIndex = startIndex + i + 1;

                      return (
                        <tr
                          key={`${filing.period}-${filing.form}-${i}`}
                          className="gsap-return-row transition-colors duration-150 hover:bg-[#F8FAFC]"
                        >
                          <td className="py-4 px-4 text-center font-mono text-xs font-semibold text-[#2B4A6D]/50 tabular-nums">
                            {String(absoluteIndex).padStart(2, '0')}
                          </td>
                          <td className="py-4 px-4">
                            <span className="font-serif font-bold text-[#2B4A6D] text-base">
                              {filing.period}
                            </span>
                          </td>
                          <td className="py-4 px-4">
                            <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-[#F1F3F5] text-[#2B4A6D] text-xs font-mono font-semibold">
                              Form {filing.form}
                            </span>
                          </td>
                          <td className="py-4 px-4">
                            <span className="text-xs sm:text-[13px] text-[#2B4A6D]/70 font-sans">
                              Registrar of Companies Filing under Section 92
                            </span>
                          </td>
                          <td className="py-4 px-4 text-right">
                            <button
                              type="button"
                              onClick={() => onSelectFiling(filing)}
                              className="inline-flex items-center gap-1.5 bg-[#2B4A6D] hover:bg-[#D96B33] text-white px-3.5 py-2 text-xs font-mono font-bold tracking-wider uppercase rounded-lg transition-colors shadow-2xs cursor-pointer"
                              aria-label={`View Annual Return ${filing.period} Form ${filing.form}`}
                            >
                              <Eye className="w-3.5 h-3.5" />
                              <span>View</span>
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Mobile & Small Tablet Cards (< md: < 768px) */}
              <div className="md:hidden flex flex-col gap-3 w-full">
                {visibleFilings.map((filing, i) => {
                  const absoluteIndex = startIndex + i + 1;

                  return (
                    <div
                      key={`${filing.period}-${filing.form}-${i}`}
                      className="gsap-return-row p-3.5 sm:p-4 rounded-xl border border-[#2B4A6D]/15 bg-[#FCFAF7]/50 shadow-2xs hover:border-[#D96B33]/40 transition-colors"
                    >
                      <div className="flex items-center justify-between gap-3 mb-2.5">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono font-bold text-[#A49050] tabular-nums">
                            #{String(absoluteIndex).padStart(2, '0')}
                          </span>
                          <span className="inline-flex items-center px-2 py-0.5 rounded bg-[#F1F3F5] text-[#2B4A6D] text-[11px] font-mono font-semibold">
                            Form {filing.form}
                          </span>
                        </div>

                        <button
                          type="button"
                          onClick={() => onSelectFiling(filing)}
                          className="shrink-0 inline-flex items-center gap-1.5 bg-[#2B4A6D] active:bg-[#D96B33] text-white px-3.5 py-1.5 text-xs font-mono font-bold tracking-wider uppercase rounded-lg transition-colors shadow-2xs cursor-pointer"
                          aria-label={`View Annual Return ${filing.period} Form ${filing.form}`}
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>View</span>
                        </button>
                      </div>

                      <div className="flex items-baseline justify-between gap-2 pt-2 border-t border-[#2B4A6D]/10">
                        <h4 className="font-serif font-bold text-[#2B4A6D] text-base sm:text-lg">
                          FY {filing.period}
                        </h4>
                        <span className="text-[11px] text-[#2B4A6D]/60 font-sans truncate">
                          ROC Section 92 Filing
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-6 pt-5 border-t border-[#2B4A6D]/10">
            {/* Mobile / Small Tablet Pagination (< sm) */}
            <div className="flex sm:hidden items-center justify-between gap-2 w-full">
              <button
                type="button"
                onClick={() => goToPage(safePage - 1)}
                disabled={safePage === 1}
                className={`flex-1 py-2.5 px-3 text-xs font-semibold rounded-lg flex items-center justify-center gap-1 border transition-all ${
                  safePage === 1
                    ? 'bg-gray-100 text-gray-300 border-gray-200 cursor-not-allowed'
                    : 'bg-white text-[#2B4A6D] border-[#2B4A6D]/20 active:bg-gray-100 cursor-pointer'
                }`}
                aria-label="Previous page"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Prev</span>
              </button>

              <span className="text-xs font-mono text-[#2B4A6D]/70 font-semibold px-3 py-1.5 bg-[#F1F3F5] rounded-md">
                {safePage} / {totalPages}
              </span>

              <button
                type="button"
                onClick={() => goToPage(safePage + 1)}
                disabled={safePage === totalPages}
                className={`flex-1 py-2.5 px-3 text-xs font-semibold rounded-lg flex items-center justify-center gap-1 border transition-all ${
                  safePage === totalPages
                    ? 'bg-gray-100 text-gray-300 border-gray-200 cursor-not-allowed'
                    : 'bg-white text-[#2B4A6D] border-[#2B4A6D]/20 active:bg-gray-100 cursor-pointer'
                }`}
                aria-label="Next page"
              >
                <span>Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Desktop / Tablet Pagination (>= sm) */}
            <div className="hidden sm:flex items-center justify-between w-full">
              <span className="text-xs text-[#2B4A6D]/70 font-medium">
                Showing <strong className="text-[#2B4A6D]">{startIndex + 1}&ndash;{endIndex}</strong> of <strong className="text-[#2B4A6D]">{annualReturns.length}</strong> filings
              </span>

              <div className="inline-flex items-center gap-1.5 p-1 bg-white border border-[#2B4A6D]/20 rounded-xl shadow-2xs">
                <button
                  type="button"
                  onClick={() => goToPage(safePage - 1)}
                  disabled={safePage === 1}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg flex items-center gap-1 transition-all ${
                    safePage === 1
                      ? 'text-gray-300 cursor-not-allowed'
                      : 'text-[#2B4A6D] hover:text-[#D96B33] hover:bg-gray-50 cursor-pointer'
                  }`}
                  aria-label="Previous page"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>Prev</span>
                </button>

                <div className="flex items-center gap-1 px-1">
                  {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((page) => (
                    <button
                      key={page}
                      type="button"
                      onClick={() => goToPage(page)}
                      aria-current={page === safePage ? 'page' : undefined}
                      className={`w-7 h-7 text-xs font-semibold rounded-lg flex items-center justify-center transition-all cursor-pointer ${
                        page === safePage
                          ? 'bg-[#2B4A6D] text-white shadow-xs'
                          : 'text-[#2B4A6D]/70 hover:text-[#2B4A6D] hover:bg-gray-100'
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
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg flex items-center gap-1 transition-all ${
                    safePage === totalPages
                      ? 'text-gray-300 cursor-not-allowed'
                      : 'text-[#2B4A6D] hover:text-[#D96B33] hover:bg-gray-50 cursor-pointer'
                  }`}
                  aria-label="Next page"
                >
                  <span>Next</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
