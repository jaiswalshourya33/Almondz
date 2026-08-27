import React, { useEffect } from 'react';
import { Project } from '../data/projects';
import { X, MapPin, Building2, Play } from 'lucide-react';

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
    "Recently Awarded": "bg-[#c85a24] text-white",
    "Ongoing": "bg-[#16283D] text-white",
    "Completed": "bg-emerald-800 text-white"
  };

  // Clean location display avoiding duplicates like "Gujarat, India (India)"
  const cleanLocation = project.coordinates && project.coordinates !== 'India' && project.coordinates !== project.location
    ? `${project.location} (${project.coordinates})`
    : project.location;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 animate-fade-in">
      <div className="absolute inset-0" onClick={onClose} aria-label="Close background overlay" />

      <div className="relative w-full max-w-4xl max-h-[92vh] bg-white border border-gray-300 shadow-2xl overflow-hidden z-10 rounded-sm flex flex-col">
        
        {/* Window Titlebar */}
        <div className="sticky top-0 z-20 bg-[#16283D] text-white px-5 py-3 flex items-center justify-between border-b border-gray-700 select-none">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 bg-[#F2834C] inline-block"></span>
            <span className="text-xs font-bold tracking-wider uppercase text-white">
              Project Details
            </span>
            <span className="text-white/30 hidden sm:inline">•</span>
            <span className="text-xs text-[#A49150] font-medium hidden sm:inline">
              {project.sector}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-sm uppercase tracking-wider ${statusColors[project.status]}`}>
              {project.status}
            </span>
            <button
              onClick={onClose}
              className="p-1 text-white/80 hover:text-white hover:bg-white/10 transition-colors rounded-sm"
              aria-label="Close dialog"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body with Hidden Scrollbar (Scroll Effect Preserved) */}
        <div 
          className="p-6 sm:p-8 space-y-6 overflow-y-auto modal-scroll bg-white flex-1"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          
          {/* Project Title & Context Header */}
          <div>
            <span className="text-xs font-semibold text-[#F2834C] uppercase tracking-wider block mb-1">
              {project.sector}
            </span>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#16283D] leading-snug">
              {project.title}
            </h2>
            <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs text-gray-600 mt-2.5 font-medium">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#16283D] shrink-0" />
                <span>{cleanLocation}</span>
              </span>
              <span className="text-gray-300 hidden sm:inline">•</span>
              <span className="flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-[#16283D] shrink-0" />
                <span>Client: <strong className="text-gray-900">{project.client}</strong></span>
              </span>
            </div>
          </div>

          {/* Upper Section: Photo + Specifications Table (Equal Height) */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-2 items-stretch">
            
            {/* Left: Photograph with Scale Hover Animation */}
            <div className="md:col-span-5 flex flex-col h-full">
              <div className="group border border-gray-300 hover:border-[#16283D]/40 rounded-sm overflow-hidden bg-gray-100 shadow-sm flex-1 flex flex-col min-h-[240px] transition-colors duration-300">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover flex-1 transition-transform duration-500 ease-out group-hover:scale-108"
                  referrerPolicy="no-referrer"
                />
              </div>

              {project.youtubeUrl && (
                <button
                  onClick={() => onOpenVideo(project.youtubeUrl || "", project.title)}
                  className="mt-2.5 shrink-0 w-full flex items-center justify-center gap-2 bg-[#16283D] hover:bg-[#F2834C] text-white text-xs font-medium py-2.5 px-4 rounded-sm transition-colors shadow-sm"
                >
                  <Play className="w-3.5 h-3.5 fill-current text-[#F2834C]" />
                  <span>Watch Project Video</span>
                </button>
              )}
            </div>

            {/* Right: Clean Specifications Table */}
            <div className="md:col-span-7 flex flex-col h-full">
              <div className="border border-gray-200 rounded-sm overflow-hidden bg-white shadow-sm h-full flex flex-col">
                <div className="bg-gray-100 px-3.5 py-2.5 text-xs font-bold text-[#16283D] uppercase tracking-wider border-b border-gray-200 shrink-0">
                  Project Specifications
                </div>
                <table className="w-full text-xs text-left border-collapse flex-1 h-full">
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <th className="w-2/5 py-2.5 px-3.5 bg-gray-50/80 font-semibold text-gray-600 border-r border-gray-200 align-middle">
                        Client / Authority
                      </th>
                      <td className="py-2.5 px-3.5 text-gray-900 font-medium align-middle">
                        {project.client}
                      </td>
                    </tr>
                    <tr>
                      <th className="py-2.5 px-3.5 bg-gray-50/80 font-semibold text-gray-600 border-r border-gray-200 align-middle">
                        Project Sector
                      </th>
                      <td className="py-2.5 px-3.5 text-gray-900 font-medium align-middle">
                        {project.sector}
                      </td>
                    </tr>
                    <tr>
                      <th className="py-2.5 px-3.5 bg-gray-50/80 font-semibold text-gray-600 border-r border-gray-200 align-middle">
                        Assigned Role
                      </th>
                      <td className="py-2.5 px-3.5 text-gray-900 font-medium align-middle">
                        {project.role}
                      </td>
                    </tr>
                    <tr>
                      <th className="py-2.5 px-3.5 bg-gray-50/80 font-semibold text-gray-600 border-r border-gray-200 align-middle">
                        Location
                      </th>
                      <td className="py-2.5 px-3.5 text-gray-900 font-medium align-middle">
                        {cleanLocation}
                      </td>
                    </tr>
                    <tr>
                      <th className="py-2.5 px-3.5 bg-gray-50/80 font-semibold text-gray-600 border-r border-gray-200 align-middle">
                        Current Status
                      </th>
                      <td className="py-2.5 px-3.5 align-middle">
                        <span className={`inline-block px-2 py-0.5 text-[10px] font-semibold rounded-sm uppercase tracking-wider ${statusColors[project.status]}`}>
                          {project.status}
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <th className="py-2.5 px-3.5 bg-gray-50/80 font-semibold text-gray-600 border-r border-gray-200 align-middle">
                        Quality Standard
                      </th>
                      <td className="py-2.5 px-3.5 text-gray-800 font-medium align-middle">
                        ISO 9001:2015 Compliant
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

          </div>

          {/* Section 1: Project Overview (Clean Editorial Typography) */}
          <div className="space-y-2 pt-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#16283D] border-b border-gray-200 pb-1.5">
              Project Overview
            </h3>
            <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Section 2: Scope of Services (Natural Bullet List) */}
          <div className="space-y-2 pt-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#16283D] border-b border-gray-200 pb-1.5">
              Scope of Services
            </h3>
            <ul className="space-y-1.5 text-xs text-gray-700">
              {project.servicesProvided.map((service, sIdx) => (
                <li key={sIdx} className="flex items-start gap-2">
                  <span className="text-[#F2834C] font-bold text-sm leading-none mt-0.5">•</span>
                  <span className="font-medium text-gray-800 leading-relaxed">{service}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Section 3: Key Highlights & Impact (Clean Editorial Callout) */}
          <div className="space-y-2 pt-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#16283D] border-b border-gray-200 pb-1.5">
              Key Highlights & Impact
            </h3>
            <p className="text-xs sm:text-sm text-gray-700 leading-relaxed bg-[#fdf9ed] border-l-3 border-[#F2834C] p-3.5 rounded-xs">
              {project.impact}
            </p>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 bg-gray-100 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-[11px] text-gray-600 font-medium">
            Almondz Global Infra-Consultant Limited (AGICL) • Corporate Project Record
          </span>
          <div className="flex items-center gap-2">
            {project.youtubeUrl && (
              <button
                onClick={() => onOpenVideo(project.youtubeUrl || "", project.title)}
                className="px-3.5 py-1.5 border border-gray-300 hover:border-gray-400 bg-white text-gray-800 text-xs font-medium rounded-sm transition-colors flex items-center gap-1.5 shadow-sm"
              >
                <Play className="w-3 h-3 fill-current text-[#F2834C]" />
                <span>Video</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="px-5 py-1.5 bg-[#16283D] hover:bg-[#0f1d2d] text-white text-xs font-semibold tracking-wider uppercase transition-colors rounded-sm shadow-sm"
            >
              Close
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
