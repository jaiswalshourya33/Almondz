import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface ProjectVideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl?: string;
  title: string;
}

// Pulls the 11-character YouTube video ID out of any link shape editors might
// paste in (watch?v=, youtu.be/, embed/, shorts/, with or without extra query
// params like &t= / &list= / ?si=), then rebuilds a clean embed URL. Building
// the embed src by naive string-replace (e.g. "watch?v=" -> "embed/") leaves
// the original "&t=…"/"&list=…" params glued on with an "&" instead of a "?",
// and youtu.be links aren't matched at all — both silently fail to load or
// autoplay for the viewer, which is the "every project video is broken" bug.
const getYouTubeEmbedUrl = (url?: string): string | null => {
  if (!url) return null;

  const idMatch = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
  );
  if (idMatch) {
    return `https://www.youtube.com/embed/${idMatch[1]}`;
  }

  // Already a bare embed URL (or an unrecognised host) — use as-is rather
  // than silently swapping in an unrelated placeholder video.
  return url;
};

export const ProjectVideoModal: React.FC<ProjectVideoModalProps> = ({
  isOpen,
  onClose,
  videoUrl,
  title,
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

  const embedUrl = getYouTubeEmbedUrl(videoUrl);
  const separator = embedUrl?.includes('?') ? '&' : '?';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in">
      <div 
        className="absolute inset-0" 
        onClick={onClose}
        aria-label="Close modal background"
      />
      
      <div className="relative w-full max-w-5xl bg-[#2B4A6D] border border-[#A49050]/30 shadow-2xl overflow-hidden z-10">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#101A29]">
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-mono tracking-widest text-[#D6C489] uppercase font-bold px-2 py-0.5 border border-[#A49050]/40 rounded-xs bg-white/5">
              VIDEO
            </span>
            <h3 className="text-white font-serif text-lg tracking-wide">{title} — Project Showcase</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-white/70 hover:text-white bg-white/5 hover:bg-[#D96B33] transition-all duration-300 shadow hover:shadow-lg rounded-none border border-white/10 hover:border-[#D96B33]"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Frame */}
        <div className="relative aspect-video w-full bg-black">
          {embedUrl ? (
            <iframe
              src={`${embedUrl}${separator}autoplay=1`}
              title={title}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-white/60 text-sm font-mono">
              Video unavailable for this project.
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="px-6 py-4 bg-[#101A29] text-xs font-mono text-white/60 flex items-center justify-between border-t border-white/10">
          <span>ALMONDZ GLOBAL INFRASTRUCTURE CONSULTANCY</span>
          <span className="text-[#D96B33]">CINEMATIC CASE STUDY</span>
        </div>
      </div>
    </div>
  );
};
