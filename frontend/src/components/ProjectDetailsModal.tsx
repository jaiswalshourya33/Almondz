import React, { useEffect } from 'react';
import { Project } from '../data/projects';
import { X, MapPin, Building2, CheckCircle2, Play, Download, ShieldCheck, Sparkles, FileText } from 'lucide-react';

interface ProjectDetailsModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenVideo: (url: string, title: string) => void;
}

export const ProjectDetailsModal: React.FC<ProjectDetailsModalProps> = ({
  project,
  isOpen,
  onClose,
  onOpenVideo,
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

  if (!isOpen || !project) return null;

  const statusColors = {
    "Recently Awarded": "bg-[#F2834C] text-white",
    "Ongoing": "bg-[#1E3A5F] text-white",
    "Completed": "bg-emerald-700 text-white"
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="absolute inset-0" onClick={onClose} aria-label="Close background overlay" />

      <div className="relative w-full max-w-4xl max-h-[90vh] bg-white border border-[#A49150]/40 shadow-2xl overflow-y-auto z-10 rounded-lg flex flex-col">
        
        {/* Modal Header Bar */}
        <div className="sticky top-0 z-20 bg-[#0D1B2A] text-white px-6 py-4 flex items-center justify-between border-b border-[#A49150]/30 shadow-md">
          <div className="flex items-center gap-3">
            <span className={`text-[10px] font-mono tracking-wider px-2.5 py-1 uppercase ${statusColors[project.status]}`}>
              {project.status}
            </span>
            <span className="text-xs font-mono text-[#F2834C] uppercase tracking-widest hidden sm:inline">
              // {project.sector}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-white/70 hover:text-white bg-white/10 hover:bg-[#F2834C] transition-all duration-300 rounded-md"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Hero Image & Video Hover/Trigger Area */}
        <div className="relative h-72 sm:h-80 bg-black overflow-group group">
          <img 
            src={project.image} 
            alt={project.title}
            className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D1B2A] via-[#0D1B2A]/40 to-transparent"></div>

          {/* Video Play Overlay */}
          {project.youtubeUrl && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/50 transition-colors">
              <button
                onClick={() => onOpenVideo(project.youtubeUrl || "", project.title)}
                className="group/btn flex items-center gap-3 bg-[#0D1B2A]/90 hover:bg-[#F2834C] text-white px-6 py-3.5 border border-[#A49150]/40 transition-all duration-300 shadow-2xl rounded-md transform hover:scale-105"
              >
                <div className="w-10 h-10 rounded-full bg-[#F2834C] group-hover/btn:bg-white text-white group-hover/btn:text-[#0D1B2A] flex items-center justify-center transition-colors">
                  <Play className="w-4 h-4 fill-current ml-0.5" />
                </div>
                <div className="text-left">
                  <span className="text-[10px] font-mono tracking-widest text-[#F2834C] group-hover/btn:text-white uppercase block">CINEMATIC PREVIEW</span>
                  <span className="text-xs font-mono font-bold">Watch Project Video</span>
                </div>
              </button>
            </div>
          )}

          <div className="absolute bottom-6 left-6 right-6">
            <div className="flex items-center gap-2 text-xs font-mono text-[#F2834C] mb-1">
              <MapPin className="w-3.5 h-3.5" />
              <span>{project.location} ({project.coordinates})</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white drop-shadow-md">
              {project.title}
            </h2>
          </div>
        </div>

        {/* Detailed Body Content */}
        <div className="p-6 sm:p-8 space-y-8 bg-[#fdf9ed]/50">
          
          {/* Metadata Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-md border border-[#A49150]/20 shadow-sm">
              <span className="text-[10px] font-mono text-gray-500 uppercase block mb-1">Client / Authority</span>
              <span className="text-xs font-bold text-[#0D1B2A] font-serif">{project.client}</span>
            </div>
            <div className="bg-white p-4 rounded-md border border-[#A49150]/20 shadow-sm">
              <span className="text-[10px] font-mono text-gray-500 uppercase block mb-1">Assigned Role</span>
              <span className="text-xs font-bold text-[#0D1B2A] font-serif">{project.role}</span>
            </div>
            <div className="bg-white p-4 rounded-md border border-[#A49150]/20 shadow-sm">
              <span className="text-[10px] font-mono text-gray-500 uppercase block mb-1">Project Sector</span>
              <span className="text-xs font-bold text-[#0D1B2A] font-serif">{project.sector}</span>
            </div>
          </div>

          {/* Description & Executive Summary */}
          <div className="bg-white p-6 rounded-lg border border-[#A49150]/30 shadow-sm space-y-4">
            <h3 className="text-xs font-mono font-bold text-[#F2834C] uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#F2834C]" />
              Collaborative Executive Overview
            </h3>
            <p className="text-sm sm:text-base text-[#1c1c15]/85 leading-relaxed font-light">
              {project.description}
            </p>
          </div>

          {/* Quantifiable Impact */}
          <div className="bg-[#0D1B2A] text-white p-6 sm:p-8 rounded-lg border border-[#A49150]/40 shadow-md space-y-3">
            <h3 className="text-xs font-mono font-bold text-[#F2834C] uppercase tracking-wider flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#F2834C]" />
              Strategic Economic & Social Impact
            </h3>
            <p className="text-sm sm:text-base text-white/90 leading-relaxed font-light">
              {project.impact}
            </p>
          </div>

          {/* Services Provided */}
          <div className="space-y-4">
            <h3 className="text-xs font-mono font-bold text-[#0D1B2A] uppercase tracking-wider flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#F2834C]" />
              Engineering Services & Deliverables Provided
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {project.servicesProvided.map((service, sIdx) => (
                <div key={sIdx} className="flex items-start gap-3 bg-white p-3.5 rounded-md border border-[#A49150]/20 shadow-sm">
                  <CheckCircle2 className="w-4 h-4 text-[#F2834C] shrink-0 mt-0.5" />
                  <span className="text-xs font-medium text-[#0D1B2A]">{service}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-6 bg-white border-t border-gray-200 flex items-center justify-between">
          <span className="text-[11px] font-mono text-gray-500">
            ISO 9001:2015 Audited Infrastructure Asset
          </span>
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-[#0D1B2A] hover:bg-[#F2834C] text-white text-xs font-mono font-bold tracking-wider uppercase transition-colors rounded-md shadow"
          >
            Close Dossier
          </button>
        </div>

      </div>
    </div>
  );
};
