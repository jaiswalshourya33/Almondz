import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import gsap from 'gsap';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';
import type { Committee } from '../data/corporateGovernance';

interface CommitteeCompositionProps {
  committees: Committee[];
  initialActiveIndex?: number;
}

const isLeadRole = (role: string): boolean => /chair|presiding|head/i.test(role);

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
        { opacity: 0, y: 12 },
        {
          opacity: 1,
          y: 0,
          duration: 0.35,
          stagger: 0.05,
          ease: 'power2.out',
        }
      );
      gsap.fromTo(
        '.gsap-dossier-header',
        { opacity: 0, y: -8 },
        { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }
      );
    }, detailPanelRef);

    return () => ctx.revert();
  }, [activeIndex]);

  return (
    <div className="w-full my-6">
      <div className="grid gap-8 lg:grid-cols-[310px_1fr] items-start">
        {/* Left Committee Selector Sidebar */}
        <div
          role="tablist"
          aria-label="Board and Management Committees"
          className="flex lg:flex-col gap-2.5 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 snap-x no-scrollbar"
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
                className={`group relative text-left rounded-xl p-4 transition-all duration-200 snap-start shrink-0 lg:shrink min-w-[250px] lg:min-w-0 border cursor-pointer ${
                  isActive
                    ? 'bg-white border-[#A49050]/50 shadow-[0_8px_24px_-6px_rgba(43,74,109,0.12)]'
                    : 'bg-white/70 hover:bg-white border-[#2B4A6D]/10 hover:border-[#A49050]/30 shadow-xs'
                }`}
              >
                {/* Active Left Indicator Bar */}
                {isActive && (
                  <motion.div
                    layoutId="activeCommitteeBar"
                    className="absolute left-0 top-3 bottom-3 w-1 bg-[#A49050] rounded-r-full"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}

                <div className="pl-1">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span
                      className={`text-[10px] font-mono font-semibold uppercase tracking-wider ${
                        isActive ? 'text-[#A49050]' : 'text-[#2B4A6D]/50'
                      }`}
                    >
                      {committee.type || 'Governance Committee'}
                    </span>
                    <span className="text-[11px] font-mono text-[#2B4A6D]/50 font-medium tabular-nums">
                      {committee.members.length} {committee.members.length === 1 ? 'Member' : 'Members'}
                    </span>
                  </div>

                  <h4
                    className={`font-serif text-[15px] sm:text-base font-bold leading-snug transition-colors ${
                      isActive ? 'text-[#2B4A6D]' : 'text-[#2B4A6D]/85 group-hover:text-[#2B4A6D]'
                    }`}
                  >
                    {committee.name}
                  </h4>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Detail Dossier */}
        <div ref={detailPanelRef} className="relative min-w-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="bg-white rounded-2xl border border-[#2B4A6D]/15 p-6 sm:p-8 lg:p-9 shadow-[0_12px_36px_-10px_rgba(43,74,109,0.08)]"
            >
              {/* Dossier Header */}
              <div className="gsap-dossier-header pb-6 border-b border-[#2B4A6D]/10">
                <div className="flex items-center justify-between gap-4 flex-wrap mb-2">
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-mono font-semibold uppercase tracking-wider text-[#A49050]">
                    <ShieldCheck className="w-4 h-4 text-[#A49050]" />
                    {currentCommittee.type || 'Statutory Committee'}
                  </span>

                  <span className="text-[11px] font-mono text-[#2B4A6D]/50 uppercase tracking-wider">
                    Constitution & Composition
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#2B4A6D] tracking-tight">
                  {currentCommittee.name}
                </h3>

                {currentCommittee.mandate && (
                  <p className="mt-3 text-xs sm:text-[13px] text-[#2B4A6D]/75 leading-relaxed font-sans max-w-3xl">
                    {currentCommittee.mandate}
                  </p>
                )}
              </div>

              {/* Committee Members Disclosure — Institutional Table (Desktop & Tablet) */}
              <div className="mt-6">
                <div className="hidden sm:block overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-[#2B4A6D]/15 text-[11px] font-mono uppercase tracking-wider text-[#2B4A6D]/60 bg-[#F8FAFC]">
                        <th className="py-3 px-4 w-12 text-center font-semibold">#</th>
                        <th className="py-3 px-4 font-semibold">Member Name</th>
                        <th className="py-3 px-4 font-semibold">Category / Designation</th>
                        <th className="py-3 px-4 w-48 font-semibold text-right">Committee Role</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#2B4A6D]/10 text-sm">
                      {currentCommittee.members.map((member, idx) => {
                        const isLead = isLeadRole(member.role);

                        return (
                          <tr
                            key={`${member.name}-${idx}`}
                            className={`gsap-dossier-row group transition-colors duration-150 ${
                              isLead ? 'bg-[#FCFAF5]/80 hover:bg-[#FAF6EE]' : 'hover:bg-[#F8FAFC]'
                            }`}
                          >
                            <td className="py-4 px-4 text-center font-mono text-xs font-semibold text-[#2B4A6D]/50 tabular-nums">
                              {String(idx + 1).padStart(2, '0')}
                            </td>
                            <td className="py-4 px-4">
                              <span className="font-serif font-bold text-[#2B4A6D] text-[15px] sm:text-base">
                                {member.name}
                              </span>
                            </td>
                            <td className="py-4 px-4">
                              <span className="text-xs sm:text-[13px] text-[#2B4A6D]/75 font-sans">
                                {member.category || 'Executive'}
                              </span>
                            </td>
                            <td className="py-4 px-4 text-right">
                              {isLead ? (
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#FAF4E6] text-[#8C7A3E] border border-[#A49050]/30 text-xs font-mono font-bold uppercase tracking-wider shadow-2xs">
                                  <span className="w-1.5 h-1.5 rounded-full bg-[#A49050]" />
                                  {member.role}
                                </span>
                              ) : (
                                <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-[#F1F3F5] text-[#2B4A6D]/80 text-xs font-mono font-medium uppercase tracking-wider">
                                  {member.role}
                                </span>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* Mobile Responsive Roster Cards (< sm) */}
                <div className="sm:hidden flex flex-col gap-3">
                  {currentCommittee.members.map((member, idx) => {
                    const isLead = isLeadRole(member.role);

                    return (
                      <div
                        key={`${member.name}-${idx}`}
                        className={`gsap-dossier-row p-4 rounded-xl border transition-all ${
                          isLead
                            ? 'bg-[#FAF6EE]/90 border-[#A49050]/40 shadow-xs'
                            : 'bg-white border-[#2B4A6D]/15 shadow-2xs'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <span className="font-serif font-bold text-[#2B4A6D] text-base leading-snug">
                            {member.name}
                          </span>
                          {isLead ? (
                            <span className="shrink-0 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-[#FAF4E6] text-[#8C7A3E] border border-[#A49050]/30 text-[10px] font-mono font-bold uppercase tracking-wider">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#A49050]" />
                              {member.role}
                            </span>
                          ) : (
                            <span className="shrink-0 inline-flex items-center px-2 py-0.5 rounded-md bg-[#F1F3F5] text-[#2B4A6D]/80 text-[10px] font-mono font-medium uppercase tracking-wider">
                              {member.role}
                            </span>
                          )}
                        </div>

                        <div className="pt-2 border-t border-[#2B4A6D]/10 flex items-center justify-between text-xs">
                          <span className="text-[#2B4A6D]/50 font-mono text-[11px] uppercase tracking-wider">
                            Designation
                          </span>
                          <span className="text-[#2B4A6D]/80 font-sans font-medium text-right">
                            {member.category || 'Executive'}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Statutory Footnote */}
              <div className="mt-8 pt-4 border-t border-[#2B4A6D]/10 flex items-center gap-2 text-[11px] font-mono text-[#2B4A6D]/55">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#A49050] shrink-0" />
                <span>
                  The committee constitution complies with the Companies Act, 2013 and applicable corporate governance regulations.
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
