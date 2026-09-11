import React, { useEffect } from 'react';
import { X, FileText } from 'lucide-react';

interface PdfViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  /** Path to the PDF served from /public */
  file: string;
  /** Main heading, e.g. "2024–2025" */
  title: string;
  /** Mono sub-label, e.g. "Form MGT-7" */
  subtitle?: string;
  /** Text shown before the title in the header, e.g. "Annual Return" */
  kicker?: string;
  /** Mono note shown on the right of the footer */
  footerNote?: string;
}

/**
 * View-only PDF reader. The document is embedded with the native PDF toolbar
 * suppressed (`#toolbar=0`), so there is no in-frame download or print control,
 * and the modal itself offers no download link — the filing can be read, not saved.
 */
export const PdfViewerModal: React.FC<PdfViewerModalProps> = ({
  isOpen,
  onClose,
  file,
  title,
  subtitle,
  kicker = 'Annual Return',
  footerNote = 'Registrar of Companies Filing',
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const src = `${file}#toolbar=0&navpanes=0&statusbar=0&view=FitH`;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6 md:p-8">
      <div
        className="pdf-viewer-modal__backdrop absolute inset-0 bg-[#0B1220]/85 backdrop-blur-md"
        onClick={onClose}
        aria-label="Close viewer background"
      />

      <div className="pdf-viewer-modal__panel relative z-10 flex h-[78vh] sm:h-[84vh] md:h-[88vh] w-full max-w-[92vw] sm:max-w-2xl md:max-w-4xl lg:max-w-5xl flex-col overflow-hidden rounded-2xl border border-[#A49050]/35 bg-[#2B4A6D] shadow-2xl transition-all">
        {/* Header */}
        <div className="flex items-center justify-between gap-3 border-b border-white/10 bg-[#101A29] px-4 py-3 sm:px-6 sm:py-4">
          <div className="flex min-w-0 items-center gap-2.5 sm:gap-3.5">
            <span className="flex h-7 w-7 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-lg border border-[#D6C489]/25 bg-white/5 text-[#D6C489]">
              <FileText className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />
            </span>
            <div className="min-w-0">
              <h3 className="truncate font-serif text-sm font-bold leading-tight tracking-wide text-white sm:text-base md:text-lg">
                {kicker} — {title}
              </h3>
              {subtitle && (
                <p className="mt-0.5 text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.2em] text-white/50">
                  {subtitle} · View only
                </p>
              )}
            </div>
          </div>
          <button
            onClick={onClose}
            className="shrink-0 rounded-lg border border-white/10 bg-white/5 p-1.5 sm:p-2 text-white/70 shadow transition-all duration-300 hover:border-[#D96B33] hover:bg-[#D96B33] hover:text-white hover:shadow-lg cursor-pointer"
            aria-label="Close viewer"
          >
            <X className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
        </div>

        {/* Document */}
        <div
          className="relative flex-1 bg-[#5B6470]"
          onContextMenu={(e) => e.preventDefault()}
        >
          <iframe
            src={src}
            title={`${kicker} ${title}${subtitle ? ` (${subtitle})` : ''}`}
            className="h-full w-full border-0"
          />
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-white/10 bg-[#101A29] px-4 py-2.5 sm:px-6 sm:py-3 text-[9px] sm:text-xs font-mono uppercase tracking-[0.16em] text-white/55">
          <span className="truncate max-w-[55%]">Almondz Global Infra</span>
          <span className="text-[#D6C489] truncate max-w-[45%] text-right">{footerNote}</span>
        </div>
      </div>
    </div>
  );
};
