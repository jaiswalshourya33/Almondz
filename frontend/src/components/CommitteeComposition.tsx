import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import gsap from 'gsap';
import type { Committee } from '../data/corporateGovernance';

interface CommitteeCompositionProps {
  committees: Committee[];
  initialActiveIndex?: number;
}

export const CommitteeComposition: React.FC<CommitteeCompositionProps> = ({
  committees,
  initialActiveIndex = 0,
}) => {
  const [activeIndex, setActiveIndex] = useState(initialActiveIndex);
  const detailPanelRef = useRef<HTMLDivElement | null>(null);

  // Sync state if initialActiveIndex changes externally
  useEffect(() => {
    setActiveIndex(initialActiveIndex);
  }, [initialActiveIndex]);

  const currentCommittee = committees[activeIndex] || committees[0];
  if (!committees.length || !currentCommittee) return null;

  // Run GSAP entrance animation when tab changes
  useEffect(() => {
    if (!detailPanelRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.gsap-dossier-row',
        { opacity: 0, y: 10 },
        {
          opacity: 1,
          y: 0,
          duration: 0.3,
          stagger: 0.05,
          ease: 'power2.out',
        }
      );
      gsap.fromTo(
        '.gsap-dossier-header',
        { opacity: 0, y: -6 },
        { opacity: 1, y: 0, duration: 0.25, ease: 'power2.out' }
      );
    }, detailPanelRef);

    return () => ctx.revert();
  }, [activeIndex]);

  return (
    <div className="w-full my-4 sm:my-6">
      <div className="grid gap-6 lg:gap-8 lg:grid-cols-[290px_1fr] items-start">
        {/* Left Committee Selector Tabs: Adaptive grid on mobile/tablet, vertical stack on desktop */}
        <div
          role="tablist"
          aria-label="Committees"
          className="grid grid-cols-1 sm:grid-cols-2 lg:flex lg:flex-col gap-2.5 w-full"
        >
          {committees.map((committee, i) => {
            const isActive = i === activeIndex;

            return (
              <button
                key={committee.name}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveIndex(i)}
                className={`relative text-left rounded-xl p-3.5 sm:p-4 lg:p-5 transition-all duration-200 border cursor-pointer w-full ${
                  isActive
                    ? 'bg-[#2B4A6D] text-white border-[#2B4A6D] shadow-md'
                    : 'bg-white text-[#2B4A6D] border-[#2B4A6D]/15 hover:border-[#A49050]/40 hover:bg-[#F8FAFC] shadow-2xs'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span
                    className={`text-[10px] sm:text-[11px] font-mono uppercase tracking-wider font-semibold ${
                      isActive ? 'text-[#D6C489]' : 'text-[#A49050]'
                    }`}
                  >
                    Committee {String(i + 1).padStart(2, '0')}
                  </span>
                  <span
                    className={`text-[10px] sm:text-[11px] font-mono tabular-nums ${
                      isActive ? 'text-white/70' : 'text-[#2B4A6D]/50'
                    }`}
                  >
                    {committee.members.length} {committee.members.length === 1 ? 'Member' : 'Members'}
                  </span>
                </div>

                <h4
                  className={`font-serif text-sm sm:text-base font-bold leading-snug transition-colors ${
                    isActive ? 'text-white' : 'text-[#2B4A6D]'
                  }`}
                >
                  {committee.name}
                </h4>
              </button>
            );
          })}
        </div>

        {/* Right Detail Panel */}
        <div ref={detailPanelRef} className="relative min-w-0 w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="bg-white rounded-2xl border border-[#2B4A6D]/15 p-4 sm:p-6 lg:p-8 shadow-[0_8px_30px_-8px_rgba(43,74,109,0.06)] w-full"
            >
              {/* Header */}
              <div className="gsap-dossier-header pb-4 sm:pb-5 border-b border-[#2B4A6D]/10">
                <span className="text-[10px] sm:text-[11px] font-mono font-semibold uppercase tracking-wider text-[#A49050] block mb-1">
                  Composition of Committee
                </span>

                <h3 className="text-xl sm:text-2xl lg:text-3xl font-serif font-bold text-[#2B4A6D] tracking-tight leading-tight">
                  {currentCommittee.name}
                </h3>
              </div>

              {/* Committee Members Table (Desktop & Tablet: >= sm) */}
              <div className="mt-4 sm:mt-6">
                <div className="hidden sm:block overflow-x-auto w-full">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-[#2B4A6D]/15 text-[11px] font-mono uppercase tracking-wider text-[#2B4A6D]/60 bg-[#F8FAFC]">
                        <th className="py-3 px-3 sm:px-4 w-12 text-center font-semibold">#</th>
                        <th className="py-3 px-3 sm:px-4 font-semibold">Name of the Member</th>
                        <th className="py-3 px-3 sm:px-4 w-48 text-right font-semibold">Designation / Role</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#2B4A6D]/10 text-sm">
                      {currentCommittee.members.map((member, idx) => (
                        <tr
                          key={`${member.name}-${idx}`}
                          className="gsap-dossier-row transition-colors duration-150 hover:bg-[#F8FAFC]"
                        >
                          <td className="py-3.5 sm:py-4 px-3 sm:px-4 text-center font-mono text-xs font-semibold text-[#2B4A6D]/50 tabular-nums">
                            {String(idx + 1).padStart(2, '0')}
                          </td>
                          <td className="py-3.5 sm:py-4 px-3 sm:px-4">
                            <span className="font-serif font-bold text-[#2B4A6D] text-sm sm:text-[15px] lg:text-base">
                              {member.name}
                            </span>
                          </td>
                          <td className="py-3.5 sm:py-4 px-3 sm:px-4 text-right">
                            <span className="inline-flex items-center px-2.5 sm:px-3 py-1 rounded-md bg-[#F1F3F5] text-[#2B4A6D] text-xs font-mono font-semibold whitespace-nowrap">
                              {member.role}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile Responsive List (< sm) */}
                <div className="sm:hidden flex flex-col gap-2.5 w-full">
                  {currentCommittee.members.map((member, idx) => (
                    <div
                      key={`${member.name}-${idx}`}
                      className="gsap-dossier-row p-3.5 rounded-xl border border-[#2B4A6D]/15 bg-[#FCFAF7]/50 shadow-2xs"
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <span className="font-serif font-bold text-[#2B4A6D] text-[15px] leading-snug">
                          {member.name}
                        </span>
                        <span className="shrink-0 text-xs font-mono font-semibold text-[#A49050] tabular-nums">
                          #{String(idx + 1).padStart(2, '0')}
                        </span>
                      </div>

                      <div className="pt-2 border-t border-[#2B4A6D]/10 flex items-center justify-between gap-2 flex-wrap text-xs">
                        <span className="text-[#2B4A6D]/50 font-mono text-[10px] uppercase tracking-wider">
                          Designation
                        </span>
                        <span className="font-mono font-semibold text-[#2B4A6D] bg-[#F1F3F5] px-2.5 py-0.5 rounded text-[11px]">
                          {member.role}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
