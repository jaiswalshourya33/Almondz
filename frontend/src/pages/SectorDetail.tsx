import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { SECTORS } from '../data/sectors';
import { PROJECTS, Project } from '../data/projects';
import { ProjectVideoModal } from '../components/ProjectVideoModal';
import { ProjectDetailsModal } from '../components/ProjectDetailsModal';
import { SectorScopeShowcase } from '../components/SectorScopeShowcase';
import { PageHeroBanner } from '../components/PageHeroBanner';

export const SectorDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const sector = SECTORS.find((s) => s.slug === slug);
  const [activeVideo, setActiveVideo] = useState<{ url: string; title: string } | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const heroHeadingRef = useRef<HTMLHeadingElement | null>(null);
  const [heroLineWidth, setHeroLineWidth] = useState<number | null>(null);
  const projectsTrackRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const measure = () => {
      const heading = heroHeadingRef.current;
      if (!heading) return;
      const rects = heading.getClientRects();
      const lastRect = rects[rects.length - 1];
      if (lastRect) setHeroLineWidth(lastRect.width);
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [slug]);

  if (!sector) {
    return (
      <div className="min-h-screen bg-[#F1F3F5] pt-32 pb-20 text-center">
        <h2 className="text-3xl font-serif text-[#18253A]">Sector Not Found</h2>
        <p className="text-sm text-[#18253A]/70 mt-2">The requested sector could not be located.</p>
        <Link to="/sectors" className="mt-6 inline-block bg-[#18253A] hover:bg-[#3E4C60] text-white px-6 py-3 text-xs font-mono font-bold tracking-widest uppercase shadow-md hover:shadow-lg transition-all duration-300 rounded-md">
          Back to Sectors
        </Link>
      </div>
    );
  }

  const relatedProjects = PROJECTS.filter((p) => p.sectorSlug === sector.slug || p.sector.toLowerCase().includes(sector.title.toLowerCase().substring(0, 6)));

  const statusOptions = ['All', 'Completed', 'Ongoing', 'Recently Awarded'] as const;

  const filteredProjects = relatedProjects.filter((proj) => {
    if (selectedStatus === 'All') return true;
    return proj.status === selectedStatus;
  });

  const scrollProjects = (direction: 'left' | 'right') => {
    if (!projectsTrackRef.current) return;
    const scrollAmount = 350;
    projectsTrackRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  // Automatic side-scrolling animation along X-axis to reveal all projects
  useEffect(() => {
    const track = projectsTrackRef.current;
    if (!track || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let isHovered = false;
    let isUserInteracting = false;
    let interactionTimer: number;

    const onMouseEnter = () => { isHovered = true; };
    const onMouseLeave = () => { isHovered = false; };
    const onTouchStart = () => {
      isUserInteracting = true;
      clearTimeout(interactionTimer);
      interactionTimer = window.setTimeout(() => { isUserInteracting = false; }, 8000);
    };

    track.addEventListener('mouseenter', onMouseEnter);
    track.addEventListener('mouseleave', onMouseLeave);
    track.addEventListener('touchstart', onTouchStart, { passive: true });

    const interval = setInterval(() => {
      if (isHovered || isUserInteracting || !track) return;
      const maxScroll = track.scrollWidth - track.clientWidth;
      if (maxScroll <= 5) return;

      if (track.scrollLeft >= maxScroll - 8) {
        track.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        track.scrollBy({ left: 190, behavior: 'smooth' });
      }
    }, 2800);

    return () => {
      clearInterval(interval);
      clearTimeout(interactionTimer);
      track.removeEventListener('mouseenter', onMouseEnter);
      track.removeEventListener('mouseleave', onMouseLeave);
      track.removeEventListener('touchstart', onTouchStart);
    };
  }, [filteredProjects]);

  return (
    <div className="dropdown-content-page flex flex-col min-h-screen bg-[#F1F3F5] pt-24">
      {/* Header Banner with Clean Energy Infrastructure Background */}
      <PageHeroBanner
        line1="SECTOR DOMAIN & EXPERTISE."
        line2={`${sector.title.toUpperCase()}.`}
        description={sector.description}
      />

      {/* Services & Scope of Work + Consultation — scroll story with sliding imagery */}
      <SectorScopeShowcase sector={sector} />

      {/* Representative Projects - horizontal-scrolling strip of compact thumbnails */}
      {relatedProjects.length > 0 && (
        <section className="py-16 bg-[#F1F3F5]/50 scroll-mt-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Header + Status Filters Row & Left/Right Controls */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 pb-4 gap-6">
              <div>
                <span className="text-xs font-bold text-[#A49050] uppercase tracking-wider block mb-1">
                  Project Portfolio
                </span>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#18253A] leading-snug">
                  <span className="block">Representative Projects in</span>
                  <span className="block text-[#18253A]">{sector.title}</span>
                </h2>
                <p className="text-xs text-[#18253A]/65 mt-2 font-medium">
                  {filteredProjects.length} Key Infrastructure {filteredProjects.length === 1 ? 'Asset' : 'Assets'} — scroll sideways to explore
                </p>
              </div>

              {/* Status Filter Pills + Nav Controls */}
              <div className="flex items-center gap-3 self-start lg:self-auto flex-wrap">
                <div className="shrink-0 max-w-full overflow-x-auto modal-scroll py-1">
                  <div className="inline-flex items-center p-1 bg-white border border-gray-300 rounded-full shadow-2xs gap-1 flex-nowrap whitespace-nowrap">
                    {statusOptions.map((status) => {
                      const count = status === 'All'
                        ? relatedProjects.length
                        : relatedProjects.filter((p) => p.status === status).length;

                      if (count === 0 && status !== 'All') return null;

                      const isActive = selectedStatus === status;

                      return (
                        <button
                          key={status}
                          type="button"
                          onClick={() => setSelectedStatus(status)}
                          className={`px-3.5 py-1.5 text-[11px] font-semibold tracking-wide rounded-full transition-all duration-200 flex items-center gap-1.5 whitespace-nowrap cursor-pointer select-none shrink-0 ${
                            isActive
                              ? 'bg-gray-900 text-white shadow-xs'
                              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/90'
                          }`}
                        >
                          <span>{status}</span>
                          <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono font-medium leading-none ${
                            isActive ? 'bg-white text-gray-900' : 'bg-gray-100 text-gray-600 border border-gray-200'
                          }`}>
                            {count}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Left / Right Nav Arrows */}
                <div className="hidden sm:flex items-center gap-1.5 pl-1">
                  <button
                    type="button"
                    onClick={() => scrollProjects('left')}
                    className="w-8 h-8 rounded-full bg-white border border-gray-300 hover:border-[#18253A] hover:bg-[#18253A] hover:text-white flex items-center justify-center text-gray-700 transition-all duration-200 shadow-2xs cursor-pointer focus:outline-none"
                    aria-label="Previous Projects"
                    title="Scroll left"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => scrollProjects('right')}
                    className="w-8 h-8 rounded-full bg-white border border-gray-300 hover:border-[#18253A] hover:bg-[#18253A] hover:text-white flex items-center justify-center text-gray-700 transition-all duration-200 shadow-2xs cursor-pointer focus:outline-none"
                    aria-label="Next Projects"
                    title="Scroll right"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Empty State or Horizontal Scrolling Strip */}
            {filteredProjects.length === 0 ? (
              <div className="text-center py-16 bg-white border border-gray-200 rounded-sm">
                <p className="text-sm text-gray-600 font-medium">No projects found with status "{selectedStatus}".</p>
                <button
                  type="button"
                  onClick={() => setSelectedStatus('All')}
                  className="mt-4 px-4 py-2 bg-[#18253A] hover:bg-[#3E4C60] text-white text-xs font-semibold uppercase tracking-wider transition-colors rounded-sm"
                >
                  View All Projects
                </button>
              </div>
            ) : (
              <div
                ref={projectsTrackRef}
                className="flex gap-3.5 overflow-x-auto modal-scroll pb-4 snap-x scroll-smooth cursor-grab active:cursor-grabbing"
              >
                {filteredProjects.map((proj) => (
                  <button
                    key={proj.id}
                    type="button"
                    onClick={() => setSelectedProject(proj)}
                    className="group shrink-0 snap-start w-[168px] sm:w-[176px] flex flex-col bg-white border border-[#A49050]/15 rounded-lg overflow-hidden shadow-[0_2px_10px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_20px_rgba(62,76,96,0.16)] hover:border-[#3E4C60] hover:-translate-y-0.5 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A49050]"
                    aria-label={`View details for ${proj.title}`}
                  >
                    <div className="relative aspect-[3/2] overflow-hidden bg-slate-100">
                      <img
                        src={proj.image}
                        alt={proj.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                        referrerPolicy="no-referrer"
                        loading="lazy"
                      />
                    </div>
                    <div className="flex-1 flex items-center justify-center px-2.5 py-2.5">
                      <h3
                        className="text-[11px] font-semibold text-center text-[#18253A] leading-snug line-clamp-2 group-hover:text-[#3E4C60] transition-colors"
                        title={proj.title}
                      >
                        {proj.title}
                      </h3>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

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
