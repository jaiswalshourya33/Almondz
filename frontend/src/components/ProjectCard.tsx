import React from 'react';
import { Link } from 'react-router-dom';
import { Project } from '../data/projects';
import { ArrowRight } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  onOpenDetails?: (project: Project) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onOpenDetails }) => {
  const statusBadgeStyles: Record<Project["status"], { bg: string; dot: string; text: string }> = {
    "Recently Awarded": {
      bg: "bg-amber-50 border-amber-200/80 text-[#8A7942]",
      dot: "bg-[#D6C489]",
      text: "Recently Awarded"
    },
    "Ongoing": {
      bg: "bg-blue-50 border-blue-200/80 text-[#18253A]",
      dot: "bg-blue-600",
      text: "Ongoing"
    },
    "Completed": {
      bg: "bg-emerald-50 border-emerald-200/80 text-emerald-800",
      dot: "bg-emerald-600",
      text: "Completed"
    }
  };

  const statusConfig = statusBadgeStyles[project.status] || statusBadgeStyles["Completed"];

  return (
    <div className="group project-card bg-white border border-gray-200/80 rounded-xl overflow-hidden flex flex-col justify-between shadow-[0_2px_10px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_20px_rgba(62,76,96,0.14)] hover:border-[#3E4C60] transition-all duration-300 hover:-translate-y-0.5">
      {/* Compact Top Image Banner */}
      <div className="relative h-32 sm:h-36 overflow-hidden bg-slate-100">
        <img 
          src={project.image} 
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          referrerPolicy="no-referrer"
          loading="lazy"
        />

        {/* Floating Status Pill */}
        <div className="absolute top-2 right-2 z-10">
          <span className={`inline-flex items-center gap-1 text-[8.5px] font-semibold px-2 py-0.5 rounded-full border shadow-xs backdrop-blur-md ${statusConfig.bg}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${statusConfig.dot} animate-pulse`} />
            <span>{statusConfig.text}</span>
          </span>
        </div>
      </div>

      {/* Card Content - Compact & Clean */}
      <div className="p-3 sm:p-3.5 flex flex-col justify-between flex-1 gap-2">
        {/* Category Pill Tag & Title */}
        <div>
          <span className="inline-flex items-center text-[8.5px] font-mono font-bold tracking-wider uppercase px-2 py-0.5 rounded-full bg-[#3E4C60] text-[#D6C489] border border-[#A49050]/55 shadow-2xs">
            {project.sector}
          </span>

          <h3 
            className="mt-1 text-[13px] sm:text-[14px] font-serif font-bold text-[#18253A] group-hover:text-[#3E4C60] transition-colors leading-snug line-clamp-2"
            title={project.title}
          >
            {project.title}
          </h3>
        </div>

        {/* Compact Metadata Specifications */}
        <div className="bg-[#F8F9FA] rounded-md p-2 border border-gray-100/90 flex flex-col gap-1.5">
          <div className="grid grid-cols-2 gap-2 pb-1.5 border-b border-gray-200/60">
            <div>
              <span className="text-[8px] font-mono text-gray-400 uppercase tracking-wider block mb-0.5 leading-none">Location</span>
              <p className="text-[11px] font-semibold text-[#18253A] leading-tight break-words">
                {project.location}
              </p>
            </div>
            <div className="border-l border-gray-200/60 pl-2">
              <span className="text-[8px] font-mono text-gray-400 uppercase tracking-wider block mb-0.5 leading-none">Client</span>
              <p className="text-[11px] font-semibold text-[#18253A] leading-tight break-words">
                {project.client}
              </p>
            </div>
          </div>

          <div>
            <span className="text-[8px] font-mono text-gray-400 uppercase tracking-wider block mb-0.5 leading-none">Role</span>
            <p className="text-[11px] font-semibold text-[#18253A] leading-tight break-words line-clamp-2" title={project.role}>
              {project.role}
            </p>
          </div>
        </div>

        {/* Compact View Details Action Button */}
        <div className="pt-0.5">
          {onOpenDetails ? (
            <button
              type="button"
              onClick={() => onOpenDetails(project)}
              className="w-full py-1.5 px-3 bg-[#18253A] hover:bg-[#3E4C60] hover:text-[#D6C489] text-white text-[10.5px] font-bold tracking-wider uppercase rounded-md transition-all duration-200 flex items-center justify-center gap-1 shadow-xs hover:shadow-sm cursor-pointer active:scale-[0.99]"
            >
              <span>View Details</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </button>
          ) : (
            <Link
              to="/projects"
              className="w-full py-1.5 px-3 bg-[#18253A] hover:bg-[#3E4C60] hover:text-[#D6C489] text-white text-[10.5px] font-bold tracking-wider uppercase rounded-md transition-all duration-200 flex items-center justify-center gap-1 shadow-xs hover:shadow-sm active:scale-[0.99]"
            >
              <span>View Details</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
