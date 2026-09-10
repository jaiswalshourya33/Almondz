import React, { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import gsap from 'gsap';
import { FileText, Calendar, Eye, Sparkles, Building2 } from 'lucide-react';
import type { GeneralMeetingCategory } from '../data/corporateGovernance';

interface GeneralMeetingNoticesSectionProps {
  generalMeetings: GeneralMeetingCategory[];
  onSelectNotice?: (file: string, title: string) => void;
}

export const GeneralMeetingNoticesSection: React.FC<GeneralMeetingNoticesSectionProps> = ({
  generalMeetings,
  onSelectNotice,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.gsap-gm-category-block',
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: 'power3.out',
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [generalMeetings]);

  if (!generalMeetings.length) return null;

  return (
    <div ref={containerRef} className="w-full my-12 flex flex-col gap-16">
      {generalMeetings.map((group) => (
        <div key={group.category} className="gsap-gm-category-block">
          {/* Category Header */}
          <div className="flex items-center gap-4 mb-8 pb-4 border-b border-[#A49050]/20">
            <div className="shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br from-[#FAF6EE] to-[#F3ECD8] border border-[#A49050]/35 flex items-center justify-center font-mono font-bold text-sm text-[#A49050] shadow-sm">
              {group.abbr}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#18253A] leading-tight">
                  {group.category}
                </h3>
                <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-[#A49050] bg-[#A49050]/12 border border-[#A49050]/30 rounded-full px-3 py-1">
                  <Building2 className="w-3 h-3 text-[#A49050]" />
                  Shareholder Disclosures
                </span>
              </div>
              <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-[#18253A]/50 mt-1">
                {group.years.length} Financial {group.years.length === 1 ? 'Year' : 'Years'} on Record
              </p>
            </div>
          </div>

          {/* Years Timeline */}
          <div className="relative pl-4 sm:pl-8">
            {/* Vertical Rail Line */}
            <div className="absolute left-[15px] sm:left-[31px] top-4 bottom-4 w-0.5 bg-gradient-to-b from-[#A49050]/60 via-[#A49050]/30 to-transparent rounded-full" />

            <div className="flex flex-col gap-10">
              {group.years.map((year) => (
                <div key={year.period} className="relative pl-8 sm:pl-12">
                  {/* Glowing Node */}
                  <div className="absolute left-[-4px] sm:left-[12px] top-2 w-5 h-5 rounded-full bg-[#FAF6EE] border-2 border-[#A49050] shadow-[0_0_12px_rgba(164,144,80,0.4)] flex items-center justify-center z-10">
                    <div className="w-2 h-2 rounded-full bg-[#A49050]" />
                  </div>

                  {/* Year Header Card */}
                  <div className="relative bg-gradient-to-r from-white via-[#FCFAF5] to-[#FAF5EB] border border-[#A49050]/30 rounded-2xl p-4 sm:p-5 shadow-[0_4px_16px_rgba(164,144,80,0.08)] mb-4 flex items-center justify-between gap-4 flex-wrap">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-4 h-4 text-[#A49050]" />
                      <h4 className="text-xl sm:text-2xl font-serif font-bold text-[#18253A]">
                        {year.period}
                      </h4>
                    </div>

                    <span className="text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-[#A49050] bg-[#A49050]/15 border border-[#A49050]/30 rounded-full px-3 py-1">
                      {year.notices.length} {year.notices.length === 1 ? 'Notice' : 'Notices'}
                    </span>
                  </div>

                  {/* Notices List */}
                  <div className="grid grid-cols-1 gap-3">
                    {year.notices.map((notice, j) => (
                      <motion.div
                        key={`${notice.label}-${j}`}
                        whileHover={{ scale: 1.01, x: 4 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                        className="group relative flex items-center justify-between gap-4 bg-white/90 border border-[#A49050]/20 rounded-2xl p-4 sm:px-6 shadow-sm hover:border-[#A49050]/45 hover:shadow-md hover:bg-white transition-all duration-300"
                      >
                        <div className="flex items-center gap-4 min-w-0">
                          <span className="shrink-0 text-xs font-mono font-bold text-[#A49050]/70 tracking-wider">
                            {String(j + 1).padStart(2, '0')}
                          </span>

                          <div className="shrink-0 w-10 h-10 rounded-2xl bg-gradient-to-br from-[#FAF6EE] to-[#F3ECD8] border border-[#A49050]/35 flex items-center justify-center text-[#A49050] shadow-xs group-hover:scale-105 transition-transform duration-300">
                            <FileText className="w-5 h-5 text-[#A49050]" />
                          </div>

                          <div className="min-w-0">
                            <h5 className="text-base sm:text-lg font-serif font-bold text-[#18253A] group-hover:text-[#A49050] transition-colors truncate">
                              {notice.label}
                            </h5>
                            <p className="text-[10px] font-mono uppercase tracking-wider text-[#18253A]/45">
                              Companies Act Statutory Meeting Notice
                            </p>
                          </div>
                        </div>

                        {/* View Button */}
                        {onSelectNotice && (
                          <motion.button
                            type="button"
                            onClick={() => onSelectNotice(notice.file, notice.label)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="shrink-0 inline-flex items-center gap-2 bg-gradient-to-r from-[#18253A] to-[#2C3E50] hover:from-[#A49050] hover:to-[#8C7A3E] text-white px-4 sm:px-5 py-2.5 text-[11px] font-mono font-bold tracking-widest uppercase rounded-xl shadow-xs transition-all duration-300"
                          >
                            <Eye className="w-3.5 h-3.5 text-[#C5A85A] group-hover:text-white transition-colors" />
                            <span>View</span>
                          </motion.button>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
