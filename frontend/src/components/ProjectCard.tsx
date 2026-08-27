import React from 'react';
import { Link } from 'react-router-dom';
import { Project } from '../data/projects';
import { MapPin, ArrowRight } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  onOpenDetails?: (project: Project) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onOpenDetails }) => {
  const statusColors = {
    "Recently Awarded": "bg-[#F2834C] text-white",
    "Ongoing": "bg-[#1E3A5F] text-white",
    "Completed": "bg-emerald-700 text-white"
  };

  return (
    <div className="group project-card bg-[#16283D] border border-[#A49150]/30 overflow-hidden flex flex-col justify-between shadow-lg hover:border-[#F2834C] transition-all duration-300">
      {/* Image & Header */}
      <div className="relative aspect-[16/10] overflow-hidden bg-[#0e1b2b] border-b border-[#A49150]/25">
        <img 
          src={project.image} 
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />

        {/* Badges */}
        <div className="absolute top-3.5 left-3.5 right-3.5 flex justify-between items-center z-10">
          <span className={`text-[10px] font-mono tracking-wider px-2.5 py-1 uppercase shadow-sm ${statusColors[project.status]}`}>
            {project.status}
          </span>
          <span className="text-[10px] font-mono bg-[#16283D]/90 text-[#A49150] border border-[#A49150]/50 px-2 py-0.5">
            {project.sector}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col gap-4 flex-1 justify-between">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-1.5 text-xs text-[#A49150] font-mono">
            <MapPin className="w-3.5 h-3.5" />
            <span>{project.location}</span>
          </div>

          <h3 className="text-lg font-serif text-white group-hover:text-[#F2834C] transition-colors leading-snug">
            {project.title}
          </h3>

          <p className="text-xs text-white/85 line-clamp-2 leading-relaxed font-normal">
            {project.description}
          </p>
        </div>

        <div className="pt-4 border-t border-white/10 flex items-center justify-between">
          <span className="text-[11px] font-mono text-white/70 truncate max-w-[180px]">
            {project.client}
          </span>
          {onOpenDetails ? (
            <button
              onClick={() => onOpenDetails(project)}
              className="text-xs font-mono font-bold text-[#F2834C] flex items-center gap-1 hover:underline cursor-pointer"
            >
              <span>DETAILS</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <Link
              to={`/projects`}
              className="text-xs font-mono font-bold text-[#F2834C] flex items-center gap-1 hover:underline"
            >
              <span>DETAILS</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
