import React from 'react';
import { Link } from 'react-router-dom';
import { Project } from '../data/projects';
import { ArrowRight } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  onOpenDetails?: (project: Project) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onOpenDetails }) => {
  const isLongTitle = project.title.length > 85;

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

  const handleOpenDetails = () => {
    if (onOpenDetails) {
      onOpenDetails(project);
    }
  };

  return (
    <div className="group project-card bg-white border border-gray-200/80 rounded-xl overflow-hidden flex flex-col justify-between shadow-[0_2px_10px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_20px_rgba(62,76,96,0.14)] hover:border-[#3E4C60] transition-all duration-300 hover:-translate-y-0.5">
      {/* Prominent Top Image Banner - Large Photo Size */}
      <div 
        onClick={handleOpenDetails}
        className="relative h-52 sm:h-56 overflow-hidden bg-slate-100 cursor-pointer"
      >
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          style={project.imagePosition ? { objectPosition: project.imagePosition } : undefined}
          referrerPolicy="no-referrer"
          loading="lazy"
        />

        {/* Floating Status Pill */}
        <div className="absolute top-2.5 right-2.5 z-10">
          <span className={`inline-flex items-center gap-1 text-[8.5px] font-semibold px-2 py-0.5 rounded-full border shadow-xs backdrop-blur-md ${statusConfig.bg}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${statusConfig.dot} animate-pulse`} />
            <span>{statusConfig.text}</span>
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4 sm:p-5 flex flex-col justify-between flex-1 gap-3 min-h-[140px]">
        {/* Category Pill Tag & Capped Title */}
        <div>
          <span className="inline-flex items-center text-[8.5px] font-mono font-bold tracking-wider uppercase px-2 py-0.5 rounded-full bg-[#3E4C60] text-[#D6C489] border border-[#A49050]/55 shadow-2xs">
            {project.sector}
          </span>

          <h3
            className="mt-2.5 text-xs sm:text-[13px] font-serif font-medium text-[#18253A] group-hover:text-[#3E4C60] transition-colors leading-snug line-clamp-3"
            title={project.title}
          >
            {project.title}
          </h3>

          {isLongTitle && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleOpenDetails();
              }}
              className="mt-1.5 text-[11px] font-semibold text-[#D96B33] hover:text-[#B85420] hover:underline cursor-pointer inline-flex items-center"
            >
              Show more
            </button>
          )}
        </div>

        {/* Compact View Details Action Button */}
        <div className="pt-3 mt-auto">
          {onOpenDetails ? (
            <button
              type="button"
              onClick={handleOpenDetails}
              className="w-full py-2 px-3 bg-[#18253A] hover:bg-[#3E4C60] hover:text-[#D6C489] text-white text-[10.5px] font-bold tracking-wider uppercase rounded-md transition-all duration-200 flex items-center justify-center gap-1 shadow-xs hover:shadow-sm cursor-pointer active:scale-[0.99]"
            >
              <span>View Details</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </button>
          ) : (
            <Link
              to="/projects"
              className="w-full py-2 px-3 bg-[#18253A] hover:bg-[#3E4C60] hover:text-[#D6C489] text-white text-[10.5px] font-bold tracking-wider uppercase rounded-md transition-all duration-200 flex items-center justify-center gap-1 shadow-xs hover:shadow-sm active:scale-[0.99]"
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
