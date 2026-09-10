import React, { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import gsap from 'gsap';
import { UserMinus, LogOut, Calendar, ShieldAlert } from 'lucide-react';
import type { DirectorResignationYear } from '../data/corporateGovernance';

interface DirectorResignationsSectionProps {
  directorResignations: DirectorResignationYear[];
}

/** Extract initials from a full name, omitting honorifics (Mr./Mrs./Ms./Dr.) */
const initialsOf = (full: string): string => {
  const parts = full.replace(/^(Mr|Mrs|Ms|Dr)\.?\s+/i, '').trim().split(/\s+/);
  const first = parts[0]?.[0] ?? '';
  const last = parts.length > 1 ? parts[parts.length - 1][0] : '';
  return (first + last).toUpperCase();
};

export const DirectorResignationsSection: React.FC<DirectorResignationsSectionProps> = ({
  directorResignations,
}) => {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  // GSAP animation for timeline reveal
  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.gsap-timeline-year-block',
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: 'power3.out',
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [directorResignations]);

  if (!directorResignations.length) return null;

  const totalDirectors = directorResignations.reduce((acc, y) => acc + y.directors.length, 0);

  return (
    <div ref={sectionRef} className="w-full my-12">
      {/* Section Header */}
      <div className="flex items-center gap-4 mb-10 pb-4 border-b border-[#A49050]/20">
        <div className="shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br from-[#FAF6EE] to-[#F3ECD8] border border-[#A49050]/35 flex items-center justify-center text-[#A49050] shadow-sm">
          <UserMinus className="w-6 h-6 text-[#A49050]" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#18253A] leading-tight">
              Resignation of Directors
            </h3>
            <span className="hidden sm:inline-flex items-center gap-1.5 text-[10px] font-mono font-bold tracking-[0.18em] uppercase text-[#8A7942] bg-[#FAF6EE] border border-[#D6C489]/70 rounded-full px-3 py-1 shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#A49050]" />
              Official Records
            </span>
          </div>
          <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-[#18253A]/50 mt-1 flex items-center gap-2">
            <span>{directorResignations.length} Financial Years</span>
            <span className="w-1 h-1 rounded-full bg-[#A49050]/40" />
            <span>{totalDirectors} {totalDirectors === 1 ? 'Director' : 'Directors'} Resigned</span>
          </p>
        </div>
      </div>

      {/* Timeline Grid */}
      <div className="relative pl-4 sm:pl-8">
        {/* Vertical Timeline Track Line */}
        <div className="absolute left-[15px] sm:left-[31px] top-4 bottom-4 w-0.5 bg-gradient-to-b from-[#A49050]/60 via-[#A49050]/30 to-transparent rounded-full" />

        <div className="flex flex-col gap-10">
          {directorResignations.map((yearBlock) => (
            <div key={yearBlock.period} className="gsap-timeline-year-block relative pl-8 sm:pl-12">
              {/* Animated Glowing Node */}
              <div className="absolute left-[-4px] sm:left-[12px] top-2 w-5 h-5 rounded-full bg-[#FAF6EE] border-2 border-[#A49050] shadow-[0_0_12px_rgba(164,144,80,0.4)] flex items-center justify-center z-10">
                <div className="w-2 h-2 rounded-full bg-[#A49050]" />
              </div>

              {/* Year Header Card */}
              <div className="relative bg-gradient-to-r from-white via-[#FCFAF5] to-[#FAF5EB] border border-[#A49050]/30 rounded-2xl p-4 sm:p-5 shadow-[0_4px_16px_rgba(164,144,80,0.08)] mb-4 flex items-center justify-between gap-4 flex-wrap">
                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-[#A49050]" />
                  <h4 className="text-xl sm:text-2xl font-serif font-bold text-[#18253A]">
                    Financial Year {yearBlock.period}
                  </h4>
                </div>

                <span className="text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-[#A49050] bg-[#A49050]/15 border border-[#A49050]/30 rounded-full px-3 py-1">
                  {yearBlock.directors.length} {yearBlock.directors.length === 1 ? 'Director' : 'Directors'}
                </span>
              </div>

              {/* Directors List */}
              <div className="grid grid-cols-1 gap-3">
                {yearBlock.directors.map((name, j) => (
                  <motion.div
                    key={`${name}-${j}`}
                    whileHover={{ scale: 1.01, x: 4 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                    className="group relative flex items-center justify-between gap-4 bg-white/90 border border-[#A49050]/20 rounded-2xl p-4 sm:px-6 shadow-sm hover:border-[#A49050]/45 hover:shadow-md hover:bg-white transition-all duration-300"
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      {/* Step Index Number */}
                      <span className="shrink-0 text-xs font-mono font-bold text-[#A49050]/70 tracking-wider">
                        {String(j + 1).padStart(2, '0')}
                      </span>

                      {/* Initials Avatar */}
                      <div className="shrink-0 w-11 h-11 rounded-2xl bg-gradient-to-br from-[#FAF6EE] to-[#F3ECD8] border border-[#A49050]/35 flex items-center justify-center font-bold text-xs text-[#A49050] shadow-xs group-hover:scale-105 transition-transform duration-300">
                        {initialsOf(name)}
                      </div>

                      {/* Director Name */}
                      <div className="min-w-0">
                        <h5 className="text-base sm:text-lg font-serif font-bold text-[#18253A] group-hover:text-[#A49050] transition-colors truncate">
                          {name}
                        </h5>
                        <p className="text-[10px] font-mono uppercase tracking-wider text-[#18253A]/45">
                          Board of Directors Resignation
                        </p>
                      </div>
                    </div>

                    {/* Status Badge */}
                    <div className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#A49050]/10 border border-[#A49050]/25 text-[#A49050] text-[10px] font-mono font-bold tracking-widest uppercase">
                      <LogOut className="w-3.5 h-3.5 text-[#A49050]" />
                      <span>Resigned</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
