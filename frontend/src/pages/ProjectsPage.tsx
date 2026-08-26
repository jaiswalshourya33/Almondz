import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { PROJECTS, Project } from '../data/projects';
import { SECTORS } from '../data/sectors';
import { ProjectCard } from '../components/ProjectCard';
import { ProjectVideoModal } from '../components/ProjectVideoModal';
import { ProjectDetailsModal } from '../components/ProjectDetailsModal';
import { Search, Filter } from 'lucide-react';

export const ProjectsPage: React.FC = () => {
  const { filter } = useParams<{ filter?: string }>();
  const [selectedStatus, setSelectedStatus] = useState<string>(
    filter === 'recently-awarded' ? 'Recently Awarded' :
    filter === 'ongoing' ? 'Ongoing' :
    filter === 'completed' ? 'Completed' : 'All'
  );
  const [selectedSector, setSelectedSector] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeVideo, setActiveVideo] = useState<{ url: string; title: string } | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = PROJECTS.filter((proj) => {
    const matchesStatus = selectedStatus === 'All' || proj.status === selectedStatus;
    const matchesSector = selectedSector === 'All' || proj.sector === selectedSector;
    const matchesSearch = proj.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          proj.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          proj.client.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSector && matchesSearch;
  });

  return (
    <div className="dropdown-content-page flex flex-col min-h-screen bg-[#fdf9ed] pt-24">
      {/* Hero */}
      <section className="bg-[#16283D] text-white py-16 border-b border-[#A49150]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="dropdown-banner-copy flex flex-col gap-4 max-w-3xl">
            <span className="text-xs font-mono tracking-widest text-[#F2834C] uppercase">PORTFOLIO EXPLORER</span>
            <h1 className="text-4xl sm:text-5xl font-serif font-bold">Infrastructure Project Portfolio</h1>
            <p className="text-white/80 text-base leading-relaxed">
              Explore our extensive track record of completed, ongoing, and recently awarded national infrastructure assignments.
            </p>
          </div>
        </div>
      </section>

      {/* Filters & Search */}
      <section className="py-12 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Status Tabs */}
          <div className="flex flex-wrap gap-2">
             {['All', 'Recently Awarded', 'Ongoing', 'Completed'].map((status) => (
              <button
                key={status}
                onClick={() => setSelectedStatus(status)}
                className={`px-4 py-2.5 text-xs font-mono font-bold uppercase transition-all duration-300 rounded-md shadow-sm hover:shadow ${
                  selectedStatus === status 
                    ? 'bg-[#16283D] text-white border border-[#16283D] shadow-md -translate-y-0.5' 
                    : 'bg-[#fdf9ed] text-[#16283D] border border-[#A49150]/30 hover:border-[#F2834C] hover:bg-[#A49150]/10 hover:-translate-y-0.5 active:translate-y-0'
                }`}
              >
                {status}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search projects, client, location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#fdf9ed] border border-[#A49150]/30 pl-10 pr-4 py-2 text-xs text-[#16283D] placeholder-gray-500 focus:outline-none focus:border-[#F2834C] rounded-md"
            />
          </div>

        </div>
      </section>

      {/* Projects Grid */}
      <section className="dropdown-scroll-content py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredProjects.length === 0 ? (
            <div className="text-center py-20 bg-white border border-[#A49150]/30 rounded-lg">
              <h3 className="text-xl font-serif text-[#16283D]">No projects found matching your criteria.</h3>
              <p className="text-xs text-gray-500 mt-2">Try adjusting your filter or search query.</p>
              <button 
                onClick={() => { setSelectedStatus('All'); setSelectedSector('All'); setSearchQuery(''); }}
                className="mt-6 bg-[#F2834C] hover:bg-[#d9723f] text-white px-6 py-2.5 text-xs font-mono font-bold tracking-widest uppercase transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 rounded-md border border-[#F2834C]/20"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((proj) => (
                <ProjectCard
                  key={proj.id}
                  project={proj}
                  onOpenDetails={(project) => setSelectedProject(project)}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Video Modal */}
      <ProjectVideoModal
        isOpen={!!activeVideo}
        onClose={() => setActiveVideo(null)}
        videoUrl={activeVideo?.url}
        title={activeVideo?.title || ""}
      />

      {/* Project Details Modal */}
      <ProjectDetailsModal
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        project={selectedProject}
        onOpenVideo={(url, title) => setActiveVideo({ url, title })}
      />
    </div>
  );
};
