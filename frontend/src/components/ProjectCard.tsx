import React from 'react';
import { Link } from 'react-router-dom';
import { Project } from '../data/projects';
import { ArrowRight } from 'lucide-react';

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
    <div className="group project-card bg-[#1E3A5F] border border-[#A49150]/30 rounded-2xl overflow-hidden flex flex-col justify-between shadow-lg hover:border-[#F2834C] transition-all duration-300">
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
          <span className="text-[10px] font-mono bg-[#1E3A5F]/90 text-[#A49150] border border-[#A49150]/50 px-2 py-0.5">
            {project.sector}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col gap-4 flex-1">
        <div>
          <span className="text-[10px] font-mono font-bold text-[#A49150] uppercase tracking-widest">
            {project.sector}
          </span>

          <h3 className="mt-1.5 text-lg font-serif text-white group-hover:text-[#A49150] transition-colors leading-snug">
            {project.title}
          </h3>
        </div>

        <div className="pt-4 border-t border-white/10 grid grid-cols-3 divide-x divide-white/10">
          <div className="pr-3">
            <p className="text-xs font-bold text-white truncate">{project.location}</p>
            <p className="text-[9px] font-mono text-white/45 uppercase tracking-wider mt-0.5">Location</p>
          </div>
          <div className="px-3">
            <p className="text-xs font-bold text-[#A49150] truncate">{project.client}</p>
            <p className="text-[9px] font-mono text-white/45 uppercase tracking-wider mt-0.5">Client</p>
          </div>
          <div className="pl-3">
            <p className="text-xs font-bold text-white truncate">{project.role}</p>
            <p className="text-[9px] font-mono text-white/45 uppercase tracking-wider mt-0.5">Role</p>
          </div>
        </div>

        <div className="pt-4 border-t border-white/10 flex items-end justify-between flex-1">
          <span className="text-[10px] font-mono text-white/50 uppercase tracking-wider">
            AGICL Delivered
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
