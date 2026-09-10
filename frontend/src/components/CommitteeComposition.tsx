import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import gsap from 'gsap';
import { ShieldCheck, UserCheck, Users, ChevronRight, Award } from 'lucide-react';
import type { Committee } from '../data/corporateGovernance';

interface CommitteeCompositionProps {
  committees: Committee[];
  initialActiveIndex?: number;
}

/** Extract initials from a full name, omitting honorifics (Mr./Mrs./Ms./Dr.) */
const initialsOf = (full: string): string => {
  const parts = full.replace(/^(Mr|Mrs|Ms|Dr)\.?\s+/i, '').trim().split(/\s+/);
  const first = parts[0]?.[0] ?? '';
  const last = parts.length > 1 ? parts[parts.length - 1][0] : '';
  return (first + last).toUpperCase();
};

const isLeadRole = (role: string): boolean => /chair|presiding|head/i.test(role);

export const CommitteeComposition: React.FC<CommitteeCompositionProps> = ({
  committees,
  initialActiveIndex = 0,
}) => {
  const [activeIndex, setActiveIndex] = useState(initialActiveIndex);
  const detailPanelRef = useRef<HTMLDivElement | null>(null);
  const membersListRef = useRef<HTMLUListElement | null>(null);

  // Sync state if initialActiveIndex changes externally
  useEffect(() => {
    setActiveIndex(initialActiveIndex);
  }, [initialActiveIndex]);

  const currentCommittee = committees[activeIndex] || committees[0];
  if (!committees.length || !currentCommittee) return null;

  // Run GSAP entrance animation when tab changes
  useEffect(() => {
    if (!membersListRef.current) return;
    const ctx = gsap.context(() => {
      // Animate members stagger
      gsap.fromTo(
        '.gsap-member-card',
        { opacity: 0, y: 16, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.45,
          stagger: 0.08,
          ease: 'power3.out',
        }
      );
      // Animate header title badge glow
      gsap.fromTo(
        '.gsap-committee-title',
        { opacity: 0, x: -12 },
        { opacity: 1, x: 0, duration: 0.4, ease: 'power2.out' }
      );
    }, detailPanelRef);

    return () => ctx.revert();
  }, [activeIndex]);

  return (
    <div className="w-full my-8">
      <div className="grid gap-6 lg:gap-8 lg:grid-cols-[320px_1fr] items-start">
        {/* Left Master Navigation Rail (Light Palette) */}
        <div
          role="tablist"
          aria-label="Board and management committees"
          className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 snap-x no-scrollbar"
        >
          {committees.map((committee, i) => {
            const isActive = i === activeIndex;
            const leadCount = committee.members.filter((m) => isLeadRole(m.role)).length;

            return (
              <motion.button
                key={committee.name}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveIndex(i)}
                whileHover={{ scale: 1.015, x: 4 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                className={`relative text-left rounded-2xl p-4 lg:p-5 transition-all duration-300 snap-start shrink-0 lg:shrink min-w-[240px] lg:min-w-0 border ${
                  isActive
                    ? 'border-[#A49050]/40 shadow-[0_12px_32px_-8px_rgba(164,144,80,0.22),0_4px_12px_rgba(164,144,80,0.08)] text-[#2A4C72]'
                    : 'bg-white/80 backdrop-blur-sm border-[#A49050]/20 hover:border-[#A49050]/40 hover:bg-white hover:shadow-md text-[#2A4C72]/80'
                }`}
              >
                {/* Active Light Background Pill with Framer Motion layoutId */}
                {isActive && (
                  <motion.div
                    layoutId="activeCommitteeTabBg"
                    className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#FFFDF9] via-[#FAF4E6] to-[#F5ECE0] border border-[#A49050]/40 shadow-inner z-0 pointer-events-none"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}

                <div className="relative z-10 flex flex-col justify-between h-full">
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`text-[11px] font-mono font-bold tracking-[0.25em] ${
                        isActive ? 'text-[#A49050]' : 'text-[#A49050]/70'
                      }`}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>

                  <h4
                    className={`mt-2 font-serif font-bold text-base lg:text-[17px] leading-snug transition-colors ${
                      isActive ? 'text-[#2A4C72]' : 'text-[#2A4C72]/90'
                    }`}
                  >
                    {committee.name}
                  </h4>

                  <div className="mt-3 flex items-center justify-between pt-2.5 border-t border-[#A49050]/15">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[#2A4C72]/60 flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-[#A49050]" />
                      {committee.members.length} {committee.members.length === 1 ? 'Member' : 'Members'}
                    </span>

                    {leadCount > 0 && (
                      <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-[#A49050] bg-[#A49050]/10 px-2 py-0.5 rounded-md">
                        Chaired
                      </span>
                    )}
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Right Detail Panel (Lighter Shades Luxury Canvas) */}
        <div ref={detailPanelRef} className="relative min-w-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="relative bg-gradient-to-b from-white via-[#FCFAF5] to-[#FAF5EB] rounded-3xl border border-[#A49050]/25 p-6 sm:p-8 lg:p-9 shadow-[0_20px_50px_-15px_rgba(164,144,80,0.16),0_8px_20px_rgba(0,0,0,0.02)] overflow-hidden"
            >
              {/* Subtle luxury backdrop shimmer pattern */}
              <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-bl from-[#A49050]/10 via-[#A49050]/5 to-transparent rounded-full blur-3xl pointer-events-none" />

              {/* Panel Header */}
              <div className="relative pb-6 border-b border-[#A49050]/20">
                <div className="flex items-center justify-between gap-4 flex-wrap">
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-[0.25em] uppercase text-[#A49050] bg-[#A49050]/10 border border-[#A49050]/25">
                    Committee {String(activeIndex + 1).padStart(2, '0')} of{' '}
                    {String(committees.length).padStart(2, '0')}
                  </span>

                  <span className="text-[11px] font-mono text-[#2A4C72]/50 tracking-wider flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-[#A49050]" />
                    Statutory Board Governance
                  </span>
                </div>

                <h3 className="gsap-committee-title mt-3 text-2xl sm:text-3xl font-serif font-bold text-[#2A4C72] tracking-tight">
                  {currentCommittee.name}
                </h3>

                {/* Animated Accent Line */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  className="mt-3 h-[3px] w-20 bg-gradient-to-r from-[#A49050] via-[#C5A85A] to-[#8C7A3E] rounded-full origin-left"
                />
              </div>

              {/* Committee Members List */}
              <div className="mt-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-mono uppercase tracking-[0.2em] font-semibold text-[#2A4C72]/50">
                    Committee Members ({currentCommittee.members.length})
                  </span>
                </div>

                <ul ref={membersListRef} className="grid grid-cols-1 gap-3.5">
                  {currentCommittee.members.map((member, i) => {
                    const isLead = isLeadRole(member.role);

                    return (
                      <motion.li
                        key={`${member.name}-${i}`}
                        whileHover={{ scale: 1.01, x: 6 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                        className={`gsap-member-card group relative flex items-center justify-between gap-4 p-4 sm:p-5 rounded-2xl border transition-all duration-300 ${
                          isLead
                            ? 'bg-gradient-to-r from-[#FFFDF8] via-[#FAF4E6] to-[#F5ECE0] border-[#A49050]/35 shadow-[0_4px_16px_rgba(164,144,80,0.1)]'
                            : 'bg-white/90 border-[#A49050]/20 hover:border-[#A49050]/30 hover:bg-[#FFFDF9] hover:shadow-md'
                        }`}
                      >
                        <div className="flex items-center gap-4 min-w-0">
                          {/* Avatar Circle with Initials */}
                          <div
                            className={`shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-sm tracking-wider shadow-sm transition-transform duration-300 group-hover:scale-105 ${
                              isLead
                                ? 'bg-gradient-to-br from-[#FAF6EE] to-[#F3ECD8] text-[#A49050] border border-[#A49050]/40 shadow-[0_4px_12px_rgba(164,144,80,0.15)]'
                                : 'bg-gradient-to-br from-[#F8FAFC] to-[#F1F3F5] text-[#2A4C72] border border-[#A49050]/25'
                            }`}
                          >
                            {initialsOf(member.name)}
                          </div>

                          {/* Name and Role */}
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2">
                              <h5 className="text-base sm:text-[17px] font-serif font-bold text-[#2A4C72] group-hover:text-[#A49050] transition-colors truncate">
                                {member.name}
                              </h5>
                            </div>

                            <div className="mt-1 flex items-center gap-2 flex-wrap">
                              <span
                                className={`text-[11px] font-mono font-semibold uppercase tracking-[0.16em] ${
                                  isLead ? 'text-[#A49050]' : 'text-[#2A4C72]/60'
                                }`}
                              >
                                {member.role}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Right Lead Badge or Icon */}
                        {isLead ? (
                          <div className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#A49050]/20 to-[#C5A85A]/15 border border-[#A49050]/35 text-[#A49050] text-[10px] font-mono font-bold tracking-widest uppercase shadow-xs">
                            <Award className="w-3.5 h-3.5 text-[#A49050]" />
                            <span>Lead</span>
                          </div>
                        ) : (
                          <div className="shrink-0 text-[#2A4C72]/30 group-hover:text-[#A49050]/60 transition-colors">
                            <UserCheck className="w-4 h-4" />
                          </div>
                        )}
                      </motion.li>
                    );
                  })}
                </ul>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
