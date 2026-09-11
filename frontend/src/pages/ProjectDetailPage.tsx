import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ChevronRight, MapPin, Play } from 'lucide-react';
import { Project } from '../data/projects';
import { ALL_ARCHED_PROJECTS } from '../data/archedVaultProjects';
import { ProjectVideoModal } from '../components/ProjectVideoModal';
import { ExpandableProjectTitle } from '../components/ExpandableProjectTitle';

// The data keeps internal source notes ("per Arched vault", "Arched vault
// record") for traceability; they are stripped here so visitors never see them.
const displayCost = (cost?: string) => {
  if (!cost || /not disclosed/i.test(cost)) return undefined;
  return cost.replace(/\s*\(Total Project Cost, per Arched vault\)/i, '').trim();
};

const displayImpact = (impact: string) =>
  impact.replace(/Arched vault record;\s*(\w)/gi, (_, first: string) => first.toUpperCase()).trim();

const STATUS_STYLES: Record<Project['status'], { text: string; bg: string }> = {
  'Recently Awarded': { text: 'text-[#B85420]', bg: 'bg-[#B85420]' },
  Ongoing: { text: 'text-[#2B4A6D]', bg: 'bg-[#2B4A6D]' },
  Completed: { text: 'text-emerald-800', bg: 'bg-emerald-800' },
};

const BODY_TEXT = 'text-[14px] sm:text-[15px] leading-relaxed text-gray-700 text-justify [hyphens:auto] [text-justify:inter-word]';

const SectionHeading: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h2 className="text-[17px] sm:text-[18px] leading-[26px] font-semibold text-[#020617] mb-3">{children}</h2>
);

const SidebarTitle: React.FC<{ children: React.ReactNode; dark?: boolean }> = ({ children, dark }) => (
  <h2
    className={`px-4 sm:px-5 py-3 text-[11px] leading-4 font-medium uppercase tracking-[0.08em] ${
      dark ? 'bg-[#18253A] text-white border-b-2 border-[#A49050]' : 'text-[#020617] border-b border-gray-200'
    }`}
  >
    {children}
  </h2>
);

export const ProjectDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [activePhoto, setActivePhoto] = useState<string | null>(null);
  const [videoOpen, setVideoOpen] = useState(false);

  const index = ALL_ARCHED_PROJECTS.findIndex((p) => p.id === id);
  const project = index >= 0 ? ALL_ARCHED_PROJECTS[index] : undefined;

  if (!project) {
    return (
      <div className="min-h-screen bg-[#F1F3F5] pt-36 pb-24 px-4 text-center">
        <h1 className="text-xl font-medium text-[#020617]">Project Not Found</h1>
        <p className="mt-2 text-sm text-gray-600">The project you are looking for is not available.</p>
        <Link
          to="/projects"
          className="mt-6 inline-flex items-center gap-2 bg-[#18253A] hover:bg-[#2B4A6D] text-white px-5 py-2.5 text-xs font-medium uppercase tracking-[0.08em] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> All Projects
        </Link>
      </div>
    );
  }

  const total = ALL_ARCHED_PROJECTS.length;
  const prevProject = ALL_ARCHED_PROJECTS[(index - 1 + total) % total];
  const nextProject = ALL_ARCHED_PROJECTS[(index + 1) % total];
  const related = ALL_ARCHED_PROJECTS.filter(
    (p) => p.sectorSlug === project.sectorSlug && p.id !== project.id,
  ).slice(0, 3);

  // Main photo first, then the site photographs — each shown once.
  const photos = Array.from(
    new Set([project.detailImage ?? project.image, ...(project.gallery ?? [])].filter(Boolean)),
  ).slice(0, 4);
  const mainPhoto = activePhoto ?? photos[0];
  const mainPhotoStyle =
    mainPhoto === project.image && project.imagePosition ? { objectPosition: project.imagePosition } : undefined;

  const location =
    project.coordinates && project.coordinates !== 'India' && project.coordinates !== project.location
      ? `${project.location} (${project.coordinates})`
      : project.location;

  const status = STATUS_STYLES[project.status] ?? STATUS_STYLES.Completed;

  const facts: [string, string | undefined][] = [
    ['Client / Authority', project.client],
    ['Role of AGICL', project.role],
    ['Sector', project.sector],
    ['Location', location],
    ['Project Cost', displayCost(project.totalCost)],
    ['Total Length', project.totalLength],
    ['Physical Progress', project.physicalProgress],
    ['Financial Progress', project.financialProgress],
    ['Authority / Independent Engineer', project.authorityEngineer],
    ['Contractor', project.contractor],
    ['Date of COD', project.commercialOperationDate],
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#FAF9F5] pt-24 text-[#020617]">
      {/* Header bar */}
      <section className="bg-[#18253A] border-b border-[#A49050]/20 text-white py-6 sm:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-[11px] sm:text-[12px] text-gray-400">
            <Link to="/projects" className="hover:text-white transition-colors flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" /> All Projects
            </Link>
            <ChevronRight className="w-3 h-3 text-gray-600" />
            <span className="text-gray-300 truncate max-w-[220px] sm:max-w-none">{project.sector}</span>
          </nav>
          <p className="mt-3 text-[20px] sm:text-[24px] leading-tight font-medium text-white">{project.sector}</p>
          <div className="mt-3.5 h-[2px] w-10 bg-[#D96B33]" aria-hidden="true" />
        </div>
      </section>

      {/* Body */}
      <section className="py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          <article className="lg:col-span-8 min-w-0">
            {/* Title block */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] sm:text-[12px] leading-4 font-semibold uppercase tracking-[0.08em] mb-3.5 sm:mb-4">
              <span className={`inline-flex items-center gap-1.5 ${status.text}`}>
                <span className={`w-1.5 h-1.5 ${status.bg}`} aria-hidden="true" />
                {project.status}
              </span>
            </div>
            <ExpandableProjectTitle title={project.title} as="h1" />
            <p className="mt-4 mb-7 sm:mb-8 flex flex-wrap items-center gap-x-3 gap-y-2 text-[13px] sm:text-[14px] leading-6 text-gray-600">
              <span className="inline-flex items-center gap-1.5 font-medium text-gray-700">
                <MapPin className="w-4 h-4 text-[#D96B33] shrink-0" /> {location}
              </span>
              <span className="hidden sm:inline text-gray-300" aria-hidden="true">|</span>
              <span>Client: <span className="text-[#020617] font-medium">{project.client}</span></span>
            </p>

            {/* Photograph */}
            <figure className="bg-white border border-gray-200 p-1.5 sm:p-2 shadow-xs rounded-lg overflow-hidden">
              <div className="aspect-[16/10] sm:aspect-[16/9] max-h-[500px] overflow-hidden bg-gray-100 rounded">
                <img
                  src={mainPhoto}
                  alt={project.title}
                  className="w-full h-full object-cover object-center"
                  style={mainPhotoStyle}
                  referrerPolicy="no-referrer"
                />
              </div>
            </figure>
            {photos.length > 1 && (
              <div className="mt-2.5 grid grid-cols-4 gap-2">
                {photos.map((src, i) => (
                  <button
                    key={src}
                    type="button"
                    onClick={() => setActivePhoto(src)}
                    className={`aspect-[3/2] overflow-hidden bg-gray-100 border-2 transition-colors cursor-pointer ${
                      src === mainPhoto ? 'border-[#A49050]' : 'border-transparent hover:border-gray-400'
                    }`}
                    aria-label={`Show site photograph ${i + 1}`}
                  >
                    <img src={src} alt="" className="w-full h-full object-cover" loading="lazy" referrerPolicy="no-referrer" />
                  </button>
                ))}
              </div>
            )}

            <section className="mt-10 sm:mt-12">
              <SectionHeading>Project Overview</SectionHeading>
              <p className={BODY_TEXT}>{project.description}</p>
            </section>

            {project.servicesProvided.length > 0 && (
              <section className="mt-10 sm:mt-12">
                <SectionHeading>Scope of Services</SectionHeading>
                <ol className="mt-2 space-y-1">
                  {project.servicesProvided.map((service, i) => (
                    <li key={i} className="flex gap-3 sm:gap-4 py-3 border-b border-gray-200 last:border-b-0">
                      <span className="shrink-0 w-6 text-[13px] sm:text-[14px] leading-[24px] font-semibold text-[#A49050] tabular-nums">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className={BODY_TEXT}>{service}</span>
                    </li>
                  ))}
                </ol>
              </section>
            )}

            {project.impact && (
              <section className="mt-10 sm:mt-12">
                <SectionHeading>Key Highlights</SectionHeading>
                <p className={BODY_TEXT}>
                  {displayImpact(project.impact)}
                </p>
              </section>
            )}
          </article>

          {/* Sidebar */}
          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-28 space-y-5">
              <div className="bg-white border border-gray-200">
                <SidebarTitle dark>Project at a Glance</SidebarTitle>
                <dl className="divide-y divide-gray-100">
                  {facts
                    .filter((fact): fact is [string, string] => Boolean(fact[1]))
                    .map(([label, value]) => (
                      <div key={label} className="px-4 sm:px-5 py-2.5">
                        <dt className="text-[10.5px] leading-4 uppercase tracking-[0.06em] text-gray-500">{label}</dt>
                        <dd className="mt-0.5 text-[13px] leading-5 text-[#020617]">{value}</dd>
                      </div>
                    ))}
                  <div className="px-4 sm:px-5 py-2.5">
                    <dt className="text-[10.5px] leading-4 uppercase tracking-[0.06em] text-gray-500">Status</dt>
                    <dd className={`mt-0.5 inline-flex items-center gap-1.5 text-[13px] leading-5 font-medium ${status.text}`}>
                      <span className={`w-1.5 h-1.5 ${status.bg}`} aria-hidden="true" />
                      {project.status}
                    </dd>
                  </div>
                </dl>
              </div>

              {project.youtubeUrl && (
                <button
                  type="button"
                  onClick={() => setVideoOpen(true)}
                  className="w-full flex items-center justify-center gap-2 bg-white border border-gray-200 hover:border-[#18253A] text-[#020617] px-4 py-2.5 text-[12px] font-medium transition-colors cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5 fill-current text-[#D96B33]" /> Watch Project Video
                </button>
              )}

              <div className="bg-[#18253A] text-white p-4 sm:p-5">
                <p className="text-[14px] leading-[21px] font-medium">Discuss a similar assignment</p>
                <p className="mt-1 text-[12.5px] leading-5 text-white/70">
                  Speak with our team about consultancy for your next infrastructure project.
                </p>
                <Link
                  to="/contact"
                  className="mt-3.5 inline-flex items-center gap-1.5 bg-[#D96B33] hover:bg-[#B85420] px-4 py-2 text-[12px] font-medium transition-colors"
                >
                  Contact Us <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {related.length > 0 && (
                <div className="bg-white border border-gray-200">
                  <SidebarTitle>More in this Sector</SidebarTitle>
                  <ul className="divide-y divide-gray-100">
                    {related.map((p) => (
                      <li key={p.id}>
                        <Link to={`/project/${p.id}`} className="group flex gap-3 px-4 sm:px-5 py-3">
                          <img
                            src={p.image}
                            alt=""
                            className="w-16 h-12 shrink-0 object-cover bg-gray-100"
                            loading="lazy"
                            referrerPolicy="no-referrer"
                          />
                          <span className="text-[12.5px] leading-[18px] text-gray-700 group-hover:text-[#020617] line-clamp-3">
                            {p.title}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </aside>
        </div>
      </section>

      {/* Previous / next project */}
      <nav aria-label="More projects" className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-3 items-stretch divide-y sm:divide-y-0 sm:divide-x divide-gray-200">
          <Link to={`/project/${prevProject.id}`} className="group flex items-center gap-3 py-4 sm:py-5 sm:pr-6 min-w-0">
            <ArrowLeft className="w-4 h-4 shrink-0 text-[#A49050] group-hover:-translate-x-1 transition-transform" />
            <span className="min-w-0">
              <span className="block text-[10.5px] leading-4 uppercase tracking-[0.06em] text-gray-500">Previous Project</span>
              <span className="block mt-0.5 text-[13px] leading-5 text-[#020617] truncate">{prevProject.title}</span>
            </span>
          </Link>
          <Link
            to="/projects"
            className="flex items-center justify-center py-4 sm:py-5 text-[12px] font-medium uppercase tracking-[0.08em] text-[#020617] hover:text-[#D96B33] transition-colors"
          >
            All Projects
          </Link>
          <Link to={`/project/${nextProject.id}`} className="group flex items-center justify-end gap-3 py-4 sm:py-5 sm:pl-6 min-w-0 text-right">
            <span className="min-w-0">
              <span className="block text-[10.5px] leading-4 uppercase tracking-[0.06em] text-gray-500">Next Project</span>
              <span className="block mt-0.5 text-[13px] leading-5 text-[#020617] truncate">{nextProject.title}</span>
            </span>
            <ArrowRight className="w-4 h-4 shrink-0 text-[#A49050] group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </nav>

      <ProjectVideoModal
        isOpen={videoOpen}
        onClose={() => setVideoOpen(false)}
        videoUrl={project.youtubeUrl}
        title={project.title}
      />
    </div>
  );
};
