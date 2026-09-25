import React, { useEffect, useState } from 'react';
import { X, FileText, FileWarning } from 'lucide-react';

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
 *
 * Before embedding, the file is probed: the host's SPA rewrite answers a missing
 * PDF with the app's HTML (and its 404 page), so anything that isn't served as a
 * PDF shows an "unavailable" notice instead of the site rendering inside the frame.
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
  const [status, setStatus] = useState<'checking' | 'ready' | 'missing'>('checking');

  useEffect(() => {
    if (!isOpen) return;
    const controller = new AbortController();
    setStatus('checking');
    fetch(file, { method: 'HEAD', signal: controller.signal })
      .then((res) => {
        const type = res.headers.get('content-type') ?? '';
        setStatus(res.ok && type.includes('pdf') ? 'ready' : 'missing');
      })
      .catch((err) => {
        if (err.name !== 'AbortError') setStatus('missing');
      });
    return () => controller.abort();
  }, [isOpen, file]);

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
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-2 sm:p-4">
      <div
        className="pdf-viewer-modal__backdrop absolute inset-0 bg-[#0B1220]/85 backdrop-blur-md"
        onClick={onClose}
        aria-label="Close viewer background"
      />

      <div className="pdf-viewer-modal__panel relative z-10 flex h-[calc(100dvh-1rem)] sm:h-[calc(100dvh-2rem)] w-full max-w-[860px] flex-col overflow-hidden rounded-2xl border border-[#2B4A6D]/20 bg-white shadow-2xl transition-all">
        {/* Header */}
        <div className="flex items-center justify-between gap-3 border-b border-[#2B4A6D]/20 bg-[#D3DEEA] px-4 py-2.5 sm:px-5 sm:py-3">
          <div className="flex min-w-0 items-center gap-2.5 sm:gap-3.5">
            <span className="flex h-7 w-7 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-lg border border-[#2B4A6D]/20 bg-white text-[#2B4A6D]">
              <FileText className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />
            </span>
            <div className="min-w-0">
              <h3 className="truncate font-serif text-sm font-bold leading-tight tracking-wide text-[#2B4A6D] sm:text-base md:text-lg">
                {kicker} — {title}
              </h3>
              {subtitle && (
                <p className="mt-0.5 text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.2em] text-[#2B4A6D]/55">
                  {subtitle} · View only
                </p>
              )}
            </div>
          </div>
          <button
            onClick={onClose}
            className="shrink-0 rounded-lg border border-[#2B4A6D]/15 bg-white p-1.5 sm:p-2 text-[#2B4A6D]/70 shadow-sm transition-all duration-300 hover:border-[#D96B33] hover:bg-[#D96B33] hover:text-white hover:shadow-lg cursor-pointer"
            aria-label="Close viewer"
          >
            <X className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
        </div>

        {/* Document */}
        <div
          className="relative min-h-0 flex-1 overflow-hidden bg-[#C9D5E3]"
          onContextMenu={(e) => e.preventDefault()}
        >
          {/* The native PDF viewer's scrollbar lives inside the iframe and can't be
              styled, so the frame is widened past the panel and the overflow clipped
              to push the scrollbar out of view. Wheel/touch scrolling still works. */}
          {status === 'ready' && (
            <iframe
              src={src}
              title={`${kicker} ${title}${subtitle ? ` (${subtitle})` : ''}`}
              className="absolute inset-y-0 left-0 h-full w-[calc(100%+20px)] max-w-none border-0"
            />
          )}
          {status === 'checking' && (
            <div className="flex h-full items-center justify-center">
              <span className="h-8 w-8 animate-spin rounded-full border-2 border-[#2B4A6D]/20 border-t-[#2B4A6D]" />
            </div>
          )}
          {status === 'missing' && (
            <div className="flex h-full flex-col items-center justify-center gap-3 px-6 text-center">
              <FileWarning className="h-10 w-10 text-[#D96B33]" />
              <p className="font-serif text-lg font-bold text-[#2B4A6D] sm:text-xl">Document not available</p>
              <p className="max-w-md text-sm text-[#2B4A6D]/70">
                This document is currently being updated and will be available here shortly.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-[#2B4A6D]/20 bg-[#D3DEEA] px-4 py-2 sm:px-5 sm:py-2.5 text-[9px] sm:text-[11px] font-mono uppercase tracking-[0.16em] text-[#2B4A6D]/60">
          <span className="truncate max-w-[55%]">Almondz Global Infra</span>
          <span className="text-[#2B4A6D] font-semibold truncate max-w-[45%] text-right">{footerNote}</span>
        </div>
      </div>
    </div>
  );
};
