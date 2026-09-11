import React from 'react';
import { Link } from 'react-router-dom';
import { Project } from '../data/projects';
import { ArrowUpRight } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
}

const STATUS_DOT: Record<Project['status'], string> = {
  'Recently Awarded': 'bg-[#D96B33]',
  Ongoing: 'bg-[#2B4A6D]',
  Completed: 'bg-emerald-700',
};

// Photo-led project card: the site photograph fills the card and the project
// details sit on a navy fade that is solid only along the bottom edge (which
// also covers the GPS/map stamps some site photos carry there).
export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => (
  <Link
    to={`/project/${project.id}`}
    className="group project-card relative block overflow-hidden bg-[#0B1523] aspect-[4/5] shadow-[0_1px_3px_rgba(2,6,23,0.08)] hover:shadow-[0_20px_44px_rgba(2,6,23,0.24)] transition-shadow duration-500"
  >
    <img
      src={project.image}
      alt={project.title}
      className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
      style={project.imagePosition ? { objectPosition: project.imagePosition } : undefined}
      referrerPolicy="no-referrer"
      loading="lazy"
    />
    <div
      className="absolute inset-0 bg-gradient-to-t from-[#07101C] from-22% via-[#07101C]/60 via-50% to-[#07101C]/0 to-80%"
      aria-hidden="true"
    />

    <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 bg-white/95 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#020617]">
      <span className={`h-1.5 w-1.5 ${STATUS_DOT[project.status] ?? STATUS_DOT.Completed}`} aria-hidden="true" />
      {project.status}
    </span>

    <div className="absolute inset-x-0 bottom-0 p-5">
      <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#D6C489]">{project.sector}</p>
      <h3 className="mt-2 text-[14px] leading-[20px] font-semibold text-white line-clamp-3" title={project.title}>
        {project.title}
      </h3>
      <div className="mt-3.5 flex items-center justify-between gap-4 border-t border-white/20 pt-3.5">
        <p className="min-w-0 text-[12px] leading-[18px]">
          <span className="block truncate text-white/85">{project.client}</span>
          <span className="block truncate text-white/55">{project.location}</span>
        </p>
        <span
          className="flex h-9 w-9 shrink-0 items-center justify-center border border-white/30 text-white transition-colors duration-300 group-hover:border-[#D96B33] group-hover:bg-[#D96B33]"
          aria-hidden="true"
        >
          <ArrowUpRight className="h-3.5 w-3.5" />
        </span>
      </div>
    </div>

    <span className="absolute bottom-0 left-0 h-[3px] w-0 bg-[#D96B33] transition-all duration-500 group-hover:w-full" aria-hidden="true" />
  </Link>
);
