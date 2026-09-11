import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import gsap from 'gsap';
import { LogOut, UserMinus } from 'lucide-react';
import type { DirectorResignationYear } from '../data/corporateGovernance';

interface DirectorResignationsSectionProps {
  directorResignations: DirectorResignationYear[];
}

interface FlattenedDirector {
  name: string;
  period: string;
  yearIndex: number;
}

export const DirectorResignationsSection: React.FC<DirectorResignationsSectionProps> = ({
  directorResignations,
}) => {
  const [selectedYear, setSelectedYear] = useState<string>('all');
  const containerRef = useRef<HTMLDivElement | null>(null);
  const tableRef = useRef<HTMLDivElement | null>(null);

  // Flatten directors list with financial year metadata
  const allDirectors: FlattenedDirector[] = directorResignations.flatMap((yearBlock, yIdx) =>
    yearBlock.directors.map((name) => ({
      name,
      period: yearBlock.period,
      yearIndex: yIdx,
    }))
  );

  const filteredDirectors =
    selectedYear === 'all'
      ? allDirectors
      : allDirectors.filter((d) => d.period === selectedYear);

  // GSAP stagger animation on filter change
  useEffect(() => {
    if (!tableRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.gsap-resignation-row',
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
  }, [selectedYear]);

  if (!directorResignations.length) return null;

  return (
    <div ref={containerRef} className="w-full my-3 sm:my-6">
      {/* Container Card */}
      <div className="bg-white rounded-2xl border border-[#2B4A6D]/15 p-3.5 sm:p-5 md:p-6 lg:p-8 shadow-[0_8px_30px_-8px_rgba(43,74,109,0.06)] w-full">
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-3.5 sm:pb-5 border-b border-[#2B4A6D]/10">
          <div>
            <span className="text-[10px] sm:text-[11px] font-mono font-semibold uppercase tracking-wider text-[#A49050] block mb-0.5 sm:mb-1">
              Investor Disclosures
            </span>
            <h3 className="text-lg sm:text-2xl lg:text-3xl font-serif font-bold text-[#2B4A6D] tracking-tight">
              Resignation of Directors
            </h3>
          </div>

          <span className="self-start sm:self-auto inline-flex items-center text-[10px] sm:text-[11px] font-mono text-[#2B4A6D]/60 bg-[#F1F3F5] px-2.5 py-1 rounded-md uppercase tracking-wider">
            Showing {filteredDirectors.length} of {allDirectors.length} Records
          </span>
        </div>

        {/* Year Filter Navigation Tabs */}
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto py-3 border-b border-[#2B4A6D]/10 scrollbar-none -mx-1 px-1">
          <button
            type="button"
            onClick={() => setSelectedYear('all')}
            className={`shrink-0 px-3 sm:px-3.5 py-1.5 rounded-lg text-[11px] sm:text-xs font-mono font-semibold uppercase tracking-wider transition-all cursor-pointer ${
              selectedYear === 'all'
                ? 'bg-[#2B4A6D] text-white shadow-xs'
                : 'bg-white text-[#2B4A6D] border border-[#2B4A6D]/15 hover:bg-[#F8FAFC]'
            }`}
          >
            All Years ({allDirectors.length})
          </button>

          {directorResignations.map((yearBlock) => {
            const isSelected = selectedYear === yearBlock.period;
            return (
              <button
                key={yearBlock.period}
                type="button"
                onClick={() => setSelectedYear(yearBlock.period)}
                className={`shrink-0 px-3 sm:px-3.5 py-1.5 rounded-lg text-[11px] sm:text-xs font-mono font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#2B4A6D] text-white shadow-xs'
                    : 'bg-white text-[#2B4A6D] border border-[#2B4A6D]/15 hover:bg-[#F8FAFC]'
                }`}
              >
                FY {yearBlock.period} ({yearBlock.directors.length})
              </button>
            );
          })}
        </div>

        {/* Content with AnimatePresence */}
        <div ref={tableRef} className="mt-4 sm:mt-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedYear}
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
                      <th className="py-3.5 px-4 font-semibold">Name of the Director</th>
                      <th className="py-3.5 px-4 w-36 font-semibold">Financial Year</th>
                      <th className="py-3.5 px-4 font-semibold">Statutory Particulars</th>
                      <th className="py-3.5 px-4 w-32 text-right font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#2B4A6D]/10 text-sm">
                    {filteredDirectors.map((director, i) => (
                      <tr
                        key={`${director.name}-${director.period}-${i}`}
                        className="gsap-resignation-row transition-colors duration-150 hover:bg-[#F8FAFC]"
                      >
                        <td className="py-4 px-4 text-center font-mono text-xs font-semibold text-[#2B4A6D]/50 tabular-nums">
                          {String(i + 1).padStart(2, '0')}
                        </td>
                        <td className="py-4 px-4">
                          <span className="font-serif font-bold text-[#2B4A6D] text-base">
                            {director.name}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <span className="font-serif font-semibold text-[#2B4A6D]">
                            {director.period}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <span className="text-xs sm:text-[13px] text-[#2B4A6D]/70 font-sans">
                            Cessation of Directorship under Section 168 of Companies Act, 2013
                          </span>
                        </td>
                        <td className="py-4 px-4 text-right">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#F1F3F5] text-[#2B4A6D] text-xs font-mono font-semibold whitespace-nowrap">
                            <LogOut className="w-3 h-3 text-[#A49050]" />
                            <span>Resigned</span>
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile & Small Tablet Cards (< md: < 768px) */}
              <div className="md:hidden flex flex-col gap-2.5 sm:gap-3 w-full">
                {filteredDirectors.map((director, i) => (
                  <div
                    key={`${director.name}-${director.period}-${i}`}
                    className="gsap-resignation-row p-3.5 sm:p-4 rounded-xl border border-[#2B4A6D]/15 bg-[#FCFAF7]/50 shadow-2xs hover:border-[#D96B33]/40 transition-colors"
                  >
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-[#A49050] tabular-nums">
                          #{String(i + 1).padStart(2, '0')}
                        </span>
                        <span className="inline-flex items-center px-2 py-0.5 rounded bg-[#F1F3F5] text-[#2B4A6D] text-[11px] font-mono font-semibold">
                          FY {director.period}
                        </span>
                      </div>

                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded bg-[#F1F3F5] text-[#2B4A6D] text-[11px] font-mono font-semibold">
                        <LogOut className="w-3 h-3 text-[#A49050]" />
                        <span>Resigned</span>
                      </span>
                    </div>

                    <h4 className="font-serif font-bold text-[#2B4A6D] text-base sm:text-lg mb-1">
                      {director.name}
                    </h4>

                    <p className="text-[11px] text-[#2B4A6D]/60 font-sans pt-2 border-t border-[#2B4A6D]/10">
                      Cessation of Directorship under Companies Act, 2013
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
