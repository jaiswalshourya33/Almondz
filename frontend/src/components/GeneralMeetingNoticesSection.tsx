import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import gsap from 'gsap';
import { Eye, FileText } from 'lucide-react';
import type { GeneralMeetingCategory } from '../data/corporateGovernance';

interface GeneralMeetingNoticesSectionProps {
  generalMeetings: GeneralMeetingCategory[];
  onSelectNotice: (file: string, title: string, category?: string) => void;
}

export const GeneralMeetingNoticesSection: React.FC<GeneralMeetingNoticesSectionProps> = ({
  generalMeetings,
  onSelectNotice,
}) => {
  const [activeCategoryIdx, setActiveCategoryIdx] = useState(0);
  const [selectedYear, setSelectedYear] = useState<string>('all');
  const containerRef = useRef<HTMLDivElement | null>(null);
  const tableRef = useRef<HTMLDivElement | null>(null);

  const currentCategory = generalMeetings[activeCategoryIdx] || generalMeetings[0];

  // Reset year filter when category switches
  useEffect(() => {
    setSelectedYear('all');
  }, [activeCategoryIdx]);

  if (!generalMeetings.length || !currentCategory) return null;

  // Flatten notices under current category with year metadata
  const allNotices = currentCategory.years.flatMap((yearBlock, yIdx) =>
    yearBlock.notices.map((notice, nIdx) => ({
      ...notice,
      period: yearBlock.period,
      yearIndex: yIdx,
      noticeIndex: nIdx,
    }))
  );

  const filteredNotices =
    selectedYear === 'all'
      ? allNotices
      : allNotices.filter((n) => n.period === selectedYear);

  // GSAP stagger animation
  useEffect(() => {
    if (!tableRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.gsap-notice-row',
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
  }, [activeCategoryIdx, selectedYear]);

  return (
    <div ref={containerRef} className="w-full my-3 sm:my-6">
      {/* Category Tabs */}
      <div className="flex items-center gap-2 mb-4 overflow-x-auto scrollbar-none">
        {generalMeetings.map((cat, idx) => {
          const isActive = idx === activeCategoryIdx;
          const totalCategoryNotices = cat.years.reduce((acc, y) => acc + y.notices.length, 0);

          return (
            <button
              key={cat.category}
              type="button"
              onClick={() => setActiveCategoryIdx(idx)}
              className={`shrink-0 px-4 py-2.5 rounded-xl font-serif text-sm sm:text-base font-bold transition-all cursor-pointer border ${
                isActive
                  ? 'bg-[#2B4A6D] text-white border-[#2B4A6D] shadow-md'
                  : 'bg-white text-[#2B4A6D] border-[#2B4A6D]/15 hover:bg-[#F8FAFC]'
              }`}
            >
              <span>{cat.category}</span>
              <span
                className={`ml-2 text-xs font-mono font-semibold px-2 py-0.5 rounded-md ${
                  isActive ? 'bg-white/20 text-white' : 'bg-[#F1F3F5] text-[#2B4A6D]/70'
                }`}
              >
                {totalCategoryNotices}
              </span>
            </button>
          );
        })}
      </div>

      {/* Container Card */}
      <div className="bg-white rounded-2xl border border-[#2B4A6D]/15 p-4 sm:p-6 lg:p-8 shadow-[0_8px_30px_-8px_rgba(43,74,109,0.06)] w-full">
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 sm:pb-5 border-b border-[#2B4A6D]/10">
          <div>
            <span className="text-[10px] sm:text-[11px] font-mono font-semibold uppercase tracking-wider text-[#A49050] block mb-1">
              General Meeting Disclosures &bull; {currentCategory.abbr}
            </span>
            <h3 className="text-lg sm:text-2xl lg:text-3xl font-serif font-bold text-[#2B4A6D] tracking-tight">
              {currentCategory.category} Notices
            </h3>
          </div>

          <span className="self-start sm:self-auto inline-flex items-center text-[10px] sm:text-[11px] font-mono text-[#2B4A6D]/60 bg-[#F1F3F5] px-2.5 py-1 rounded-md uppercase tracking-wider">
            Showing {filteredNotices.length} of {allNotices.length} Notices
          </span>
        </div>

        {/* Year Filter Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto py-3.5 border-b border-[#2B4A6D]/10 scrollbar-none">
          <button
            type="button"
            onClick={() => setSelectedYear('all')}
            className={`shrink-0 px-3.5 py-1.5 rounded-lg text-xs font-mono font-semibold uppercase tracking-wider transition-all cursor-pointer ${
              selectedYear === 'all'
                ? 'bg-[#2B4A6D] text-white shadow-xs'
                : 'bg-white text-[#2B4A6D] border border-[#2B4A6D]/15 hover:bg-[#F8FAFC]'
            }`}
          >
            All Years ({allNotices.length})
          </button>

          {currentCategory.years.map((yearBlock) => {
            const isSelected = selectedYear === yearBlock.period;
            return (
              <button
                key={yearBlock.period}
                type="button"
                onClick={() => setSelectedYear(yearBlock.period)}
                className={`shrink-0 px-3.5 py-1.5 rounded-lg text-xs font-mono font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#2B4A6D] text-white shadow-xs'
                    : 'bg-white text-[#2B4A6D] border border-[#2B4A6D]/15 hover:bg-[#F8FAFC]'
                }`}
              >
                {yearBlock.period} ({yearBlock.notices.length})
              </button>
            );
          })}
        </div>

        {/* Content with AnimatePresence */}
        <div ref={tableRef} className="mt-4 sm:mt-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeCategoryIdx}-${selectedYear}`}
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
                      <th className="py-3.5 px-4 font-semibold">Notice Title</th>
                      <th className="py-3.5 px-4 w-36 font-semibold">Financial Year</th>
                      <th className="py-3.5 px-4 font-semibold">Statutory Classification</th>
                      <th className="py-3.5 px-4 w-32 text-right font-semibold">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#2B4A6D]/10 text-sm">
                    {filteredNotices.map((notice, i) => (
                      <tr
                        key={`${notice.label}-${notice.period}-${i}`}
                        className="gsap-notice-row transition-colors duration-150 hover:bg-[#F8FAFC]"
                      >
                        <td className="py-4 px-4 text-center font-mono text-xs font-semibold text-[#2B4A6D]/50 tabular-nums">
                          {String(i + 1).padStart(2, '0')}
                        </td>
                        <td className="py-4 px-4">
                          <span className="font-serif font-bold text-[#2B4A6D] text-base">
                            {notice.label}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <span className="font-serif font-semibold text-[#2B4A6D]">
                            {notice.period}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <span className="text-xs sm:text-[13px] text-[#2B4A6D]/70 font-sans">
                            Section 101 Notice of General Meeting under Companies Act, 2013
                          </span>
                        </td>
                        <td className="py-4 px-4 text-right">
                          <button
                            type="button"
                            onClick={() => onSelectNotice(notice.file, notice.label, currentCategory.category)}
                            className="inline-flex items-center gap-1.5 bg-[#2B4A6D] hover:bg-[#D96B33] text-white px-3.5 py-2 text-xs font-mono font-bold tracking-wider uppercase rounded-lg transition-colors shadow-2xs cursor-pointer"
                            aria-label={`View ${notice.label}`}
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>View</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile & Small Tablet Cards (< md: < 768px) */}
              <div className="md:hidden flex flex-col gap-3 w-full">
                {filteredNotices.map((notice, i) => (
                  <div
                    key={`${notice.label}-${notice.period}-${i}`}
                    className="gsap-notice-row p-3.5 sm:p-4 rounded-xl border border-[#2B4A6D]/15 bg-[#FCFAF7]/50 shadow-2xs hover:border-[#D96B33]/40 transition-colors"
                  >
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-[#A49050] tabular-nums">
                          #{String(i + 1).padStart(2, '0')}
                        </span>
                        <span className="inline-flex items-center px-2 py-0.5 rounded bg-[#F1F3F5] text-[#2B4A6D] text-[11px] font-mono font-semibold">
                          {notice.period}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => onSelectNotice(notice.file, notice.label, currentCategory.category)}
                        className="shrink-0 inline-flex items-center gap-1.5 bg-[#2B4A6D] active:bg-[#D96B33] text-white px-3.5 py-1.5 text-xs font-mono font-bold tracking-wider uppercase rounded-lg transition-colors shadow-2xs cursor-pointer"
                        aria-label={`View ${notice.label}`}
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>View</span>
                      </button>
                    </div>

                    <h4 className="font-serif font-bold text-[#2B4A6D] text-base sm:text-lg mb-1">
                      {notice.label}
                    </h4>

                    <p className="text-[11px] text-[#2B4A6D]/60 font-sans pt-2 border-t border-[#2B4A6D]/10">
                      {currentCategory.category} &bull; Section 101 Notice
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
