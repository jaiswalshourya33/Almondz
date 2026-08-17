import React from 'react';
import { Link } from 'react-router-dom';
import { Project } from '../data/projects';
import { MapPin, Play, ArrowRight } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  onOpenVideo?: (url: string, title: string) => void;
  onOpenDetails?: (project: Project) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onOpenVideo, onOpenDetails }) => {
  const videoUrl = project.youtubeUrl || 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
  const statusColors = {
    "Recently Awarded": "bg-[#F2834C] text-white",
    "Ongoing": "bg-[#1E3A5F] text-white",
    "Completed": "bg-emerald-700 text-white"
  };

  return (
    <div className="group bg-[#0D1B2A] border border-[#A49150]/30 overflow-hidden flex flex-col justify-between shadow-lg hover:border-[#F2834C] transition-all duration-300">
      {/* Image & Header */}
      <div className="relative aspect-[16/10] overflow-hidden bg-black">
        <img 
          src={project.image} 
          alt={project.title}
          className="w-full h-full object-cover opacity-95 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D1B2A] via-transparent to-transparent"></div>

        {/* Badges */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10">
          <span className={`text-[10px] font-mono tracking-wider px-2.5 py-1 uppercase shadow ${statusColors[project.status]}`}>
            {project.status}
          </span>
          <span className="text-[10px] font-mono bg-black/60 backdrop-blur-md text-[#A49150] border border-[#A49150]/40 px-2 py-0.5">
            {project.sector}
          </span>
        </div>

        {/* A direct YouTube link, revealed only while the project image is hovered. */}
        <a
            href={videoUrl}
            target="_blank"
            rel="noreferrer"
            className="absolute inset-0 z-10 flex items-center justify-center bg-black/35 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            aria-label={`Play YouTube video for ${project.title}`}
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#F2834C] text-white shadow-xl transition-transform duration-300 group-hover:scale-110">
              <Play className="ml-0.5 h-6 w-6 fill-white" />
            </div>
          </a>
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

          <p className="text-xs text-white/70 line-clamp-2 leading-relaxed">
            {project.description}
          </p>
        </div>

        <div className="pt-4 border-t border-white/10 flex items-center justify-between">
          <span className="text-[11px] font-mono text-white/50 truncate max-w-[180px]">
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
