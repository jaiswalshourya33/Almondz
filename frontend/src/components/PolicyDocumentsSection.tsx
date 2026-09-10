import React, { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import gsap from 'gsap';
import { FileText, ArrowRight, ShieldCheck } from 'lucide-react';
import type { GovernanceDocument } from '../data/corporateGovernance';

interface PolicyDocumentsSectionProps {
  documents: GovernanceDocument[];
}

export const PolicyDocumentsSection: React.FC<PolicyDocumentsSectionProps> = ({ documents }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.gsap-policy-card',
        { opacity: 0, y: 24, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          stagger: 0.12,
          ease: 'power3.out',
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [documents]);

  if (!documents.length) return null;

  return (
    <div ref={containerRef} className="w-full my-12">
      {/* Section Header */}
      <div className="flex items-center gap-4 mb-8 pb-4 border-b border-[#A49050]/20">
        <div className="shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br from-[#FAF6EE] to-[#F3ECD8] border border-[#A49050]/35 flex items-center justify-center text-[#A49050] shadow-sm">
          <ShieldCheck className="w-6 h-6 text-[#A49050]" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#2B4A6D] leading-tight">
              Board-Approved Policies
            </h3>
            <span className="hidden sm:inline-flex items-center gap-1.5 text-[10px] font-mono font-bold tracking-[0.18em] uppercase text-[#8A7942] bg-[#FAF6EE] border border-[#D6C489]/70 rounded-full px-3 py-1 shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#A49050]" />
              Compliance
            </span>
          </div>
          <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-[#2B4A6D]/50 mt-1">
            {documents.length} Published Policy Documents
          </p>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        {documents.map((doc) => (
          <motion.div
            key={doc.file}
            whileHover={{ scale: 1.02, y: -6 }}
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
            className="gsap-policy-card group relative bg-gradient-to-b from-white via-[#FCFAF5] to-[#FAF5EB] rounded-3xl border border-[#A49050]/25 p-7 sm:p-8 flex flex-col justify-between shadow-[0_4px_20px_-4px_rgba(164,144,80,0.12)] hover:shadow-[0_20px_40px_-10px_rgba(164,144,80,0.25)] hover:border-[#A49050]/50 transition-all duration-300 overflow-hidden"
          >
            {/* Ambient Corner Glow */}
            <div className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-bl from-[#A49050]/15 via-transparent to-transparent rounded-full blur-2xl pointer-events-none group-hover:scale-125 transition-transform duration-500" />

            <div className="relative flex flex-col gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#FAF6EE] to-[#F3ECD8] border border-[#A49050]/35 flex items-center justify-center text-[#A49050] shadow-sm group-hover:scale-105 group-hover:border-[#A49050]/60 transition-transform duration-300">
                <FileText className="w-7 h-7 text-[#A49050]" />
              </div>

              <div className="h-[2px] w-12 bg-gradient-to-r from-[#A49050] to-[#C5A85A] rounded-full" />

              <h4 className="text-xl font-serif font-bold text-[#2B4A6D] group-hover:text-[#A49050] transition-colors leading-snug">
                {doc.title}
              </h4>

              <p className="text-xs text-[#2B4A6D]/70 leading-relaxed font-sans">
                {doc.summary}
              </p>
            </div>

            <div className="relative pt-6 mt-6 border-t border-[#A49050]/15">
              <a
                href={doc.file}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-gradient-to-r from-[#2B4A6D] to-[#2C3E50] hover:from-[#A49050] hover:to-[#8C7A3E] text-white py-3.5 text-xs font-mono font-bold tracking-widest uppercase transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2 rounded-xl"
              >
                <span>View Policy PDF</span>
                <ArrowRight className="w-4 h-4 text-[#C5A85A] group-hover:text-white transition-colors" />
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
