import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { FileText, ArrowRight, ShieldCheck, Eye } from 'lucide-react';
import type { GovernanceDocument } from '../data/corporateGovernance';

interface PolicyDocumentsSectionProps {
  documents: GovernanceDocument[];
  onSelectPolicy?: (file: string, title: string) => void;
}

export const PolicyDocumentsSection: React.FC<PolicyDocumentsSectionProps> = ({
  documents,
  onSelectPolicy,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.gsap-policy-card',
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.1,
          ease: 'power2.out',
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [documents]);

  if (!documents.length) return null;

  return (
    <div ref={containerRef} className="w-full my-3 sm:my-6">
      {/* Container Card */}
      <div className="bg-white rounded-2xl border border-[#2B4A6D]/15 p-4 sm:p-6 lg:p-8 shadow-[0_8px_30px_-8px_rgba(43,74,109,0.06)] w-full">
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 sm:pb-5 border-b border-[#2B4A6D]/10">
          <div>
            <span className="text-[10px] sm:text-[11px] font-mono font-semibold uppercase tracking-wider text-[#A49050] block mb-1">
              Compliance & Governance
            </span>
            <h3 className="text-lg sm:text-2xl lg:text-3xl font-serif font-bold text-[#2B4A6D] tracking-tight">
              Board-Approved Policy Documents
            </h3>
          </div>

          <span className="self-start sm:self-auto inline-flex items-center text-[10px] sm:text-[11px] font-mono text-[#2B4A6D]/60 bg-[#F1F3F5] px-2.5 py-1 rounded-md uppercase tracking-wider">
            {documents.length} Published Policies
          </span>
        </div>

        {/* Policy Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 mt-6">
          {documents.map((doc, idx) => (
            <div
              key={doc.file}
              className="gsap-policy-card rounded-xl border border-[#2B4A6D]/15 bg-[#FCFAF7]/40 p-5 sm:p-6 flex flex-col justify-between hover:border-[#D96B33]/50 hover:bg-white hover:shadow-md transition-all duration-300 group"
            >
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between gap-2">
                  <div className="w-10 h-10 rounded-lg bg-[#F1F3F5] border border-[#2B4A6D]/15 flex items-center justify-center text-[#2B4A6D] group-hover:text-[#D96B33] group-hover:border-[#D96B33]/30 transition-colors">
                    <FileText className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono font-semibold text-[#A49050] uppercase tracking-wider">
                    Policy #{String(idx + 1).padStart(2, '0')}
                  </span>
                </div>

                <h4 className="text-base sm:text-lg font-serif font-bold text-[#2B4A6D] group-hover:text-[#D96B33] transition-colors leading-snug">
                  {doc.title}
                </h4>

                <p className="text-xs text-[#2B4A6D]/70 leading-relaxed font-sans">
                  {doc.summary}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-[#2B4A6D]/10">
                {onSelectPolicy ? (
                  <button
                    type="button"
                    onClick={() => onSelectPolicy(doc.file, doc.title)}
                    className="w-full bg-[#2B4A6D] hover:bg-[#D96B33] text-white py-2.5 px-4 text-xs font-mono font-bold tracking-wider uppercase transition-colors shadow-2xs flex items-center justify-center gap-2 rounded-lg cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View Policy</span>
                  </button>
                ) : (
                  <a
                    href={doc.file}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-[#2B4A6D] hover:bg-[#D96B33] text-white py-2.5 px-4 text-xs font-mono font-bold tracking-wider uppercase transition-colors shadow-2xs flex items-center justify-center gap-2 rounded-lg cursor-pointer"
                  >
                    <span>View Policy</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
