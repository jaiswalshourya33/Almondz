import React, { useEffect } from 'react';
import { X, Play } from 'lucide-react';

interface ProjectVideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl?: string;
  title: string;
}

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

  // Convert watch URL to embed URL if necessary
  let embedUrl = videoUrl || "https://www.youtube.com/embed/dQw4w9WgXcQ";
  if (embedUrl.includes("watch?v=")) {
    embedUrl = embedUrl.replace("watch?v=", "embed/");
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in">
      <div 
        className="absolute inset-0" 
        onClick={onClose}
        aria-label="Close modal background"
      />
      
      <div className="relative w-full max-w-5xl bg-[#18253A] border border-[#A49050]/30 shadow-2xl overflow-hidden z-10">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#101A29]">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#D96B33] animate-pulse"></span>
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
          <iframe
            src={`${embedUrl}?autoplay=1`}
            title={title}
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
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
