import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { LEADERSHIP, Leader } from '../data/leadership';
import { X, Linkedin } from 'lucide-react';
import { PageHeroBanner } from '../components/PageHeroBanner';

// The board grouped by role: the Chairman sits alone in the first row, the
// Independent Directors share the second row, and the Whole-Time Directors
// fill the rows below — three to a row.
const CHAIRMAN = LEADERSHIP.filter((l) => /chairman/i.test(l.title));
const INDEPENDENT = LEADERSHIP.filter((l) => /independent\s+director/i.test(l.title));
const WHOLE_TIME = LEADERSHIP.filter((l) => /whole[\s-]?time\s+director/i.test(l.title));

interface CardProps {
  leader: Leader;
  order: number;
  onOpen: () => void;
}

const LeaderCard: React.FC<CardProps> = ({ leader, order, onOpen }) => (
  <button
    type="button"
    onClick={onOpen}
    style={{ ['--i' as string]: order }}
    className="leader-card relative w-[280px] shrink-0 bg-white rounded-2xl border border-[#A49050]/20 shadow-sm overflow-hidden text-left flex flex-col focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A49050]"
    aria-label={`Read ${leader.name}'s profile`}
  >
    <div className="aspect-[4/5] w-full overflow-hidden bg-[#F1F3F5]">
      <img
        src={leader.image}
        alt={leader.name}
        className="h-full w-full object-cover"
        referrerPolicy="no-referrer"
      />
    </div>
    <div className="p-5 flex flex-col gap-1.5">
      <h3 className="text-lg font-serif font-bold text-[#18253A] leading-snug">{leader.name}</h3>
      <p className="text-sm font-semibold text-[#A49050]">{leader.title}</p>
      <p className="text-xs italic text-[#18253A]/50">Experience: {leader.experience}</p>
    </div>
  </button>
);

const GroupHeading: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h2 className="text-center text-xs sm:text-sm font-mono font-bold tracking-widest text-[#A49050] uppercase mb-8">
    {children}
  </h2>
);

export const LeadershipPage: React.FC = () => {
  const [selectedLeader, setSelectedLeader] = useState<Leader | null>(null);
  const gridSectionRef = useRef<HTMLElement | null>(null);
  const heroHeadingRef = useRef<HTMLHeadingElement | null>(null);
  const [heroLineWidth, setHeroLineWidth] = useState<number | null>(null);

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
  }, []);

  useEffect(() => {
    const section = gridSectionRef.current;
    if (!section || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          section.classList.add('is-visible');
          observer.unobserve(section);
        }
      },
      { threshold: 0.05 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!selectedLeader) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedLeader(null);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [selectedLeader]);

  let order = 0;

  return (
    <div className="leadership-page flex flex-col min-h-screen bg-[#F1F3F5] pt-24">
      {/* Header Banner with Clean Energy Infrastructure Background */}
      <PageHeroBanner
        line1="VISIONARY STEWARDSHIP."
        line2="BOARD OF DIRECTORS."
        description="Decades of combined engineering wisdom, financial acumen, and public sector governance guiding Almondz Global Infra-Consultant Limited."
      />

      {/* Leadership grid — every director on one page, grouped by role */}
      <section ref={gridSectionRef} className="leadership-grid py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-20">

          {(CHAIRMAN.length > 0 || INDEPENDENT.length > 0) && (
            <div>
              <GroupHeading>Chairman &amp; Independent Directors</GroupHeading>
              <div className="flex flex-wrap justify-center gap-8">
                {[...CHAIRMAN, ...INDEPENDENT].map((leader) => (
                  <LeaderCard key={leader.name} leader={leader} order={order++} onOpen={() => setSelectedLeader(leader)} />
                ))}
              </div>
            </div>
          )}

          {WHOLE_TIME.length > 0 && (
            <div>
              <GroupHeading>Whole-Time Directors</GroupHeading>
              <div className="flex flex-wrap justify-center gap-8 max-w-[960px] mx-auto">
                {WHOLE_TIME.map((leader) => (
                  <LeaderCard key={leader.name} leader={leader} order={order++} onOpen={() => setSelectedLeader(leader)} />
                ))}
              </div>
            </div>
          )}

        </div>
      </section>

      {selectedLeader && (
        <div
          className="fixed inset-0 z-50 overflow-y-auto bg-[#18253A]/70 backdrop-blur-sm p-4 sm:p-8 animate-fade-in"
          role="dialog"
          aria-modal="true"
          aria-labelledby="leader-profile-title"
          onClick={() => setSelectedLeader(null)}
        >
          <div className="min-h-full flex items-center justify-center">
            <div
              key={selectedLeader.name}
              className="leader-modal-panel relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setSelectedLeader(null)}
                className="absolute top-4 right-4 z-20 p-2.5 bg-white/90 hover:bg-white text-[#18253A] rounded-full shadow-md transition-colors"
                aria-label="Close profile"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Left: content — sized to fit, no internal scrollbar */}
              <div className="leader-modal-content-panel flex-1 min-w-0 p-7 sm:p-9 flex flex-col gap-3.5">
                <h2 id="leader-profile-title" className="text-2xl sm:text-3xl font-serif font-bold text-[#18253A] leading-tight">
                  {selectedLeader.name}
                </h2>
                <p className="text-lg text-[#18253A]/70 -mt-1">{selectedLeader.title}</p>
                <a
                  href="https://www.linkedin.com/company/almondz-global-securities-limited/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex w-8 h-8 items-center justify-center rounded bg-[#0A66C2] text-white transition-transform hover:scale-110"
                  aria-label={`${selectedLeader.name} on LinkedIn`}
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <p className="text-[11px] font-mono tracking-widest text-[#A49050] uppercase">
                  Experience: {selectedLeader.experience}
                </p>
                <p className="text-[13px] sm:text-sm leading-[1.65] text-[#18253A]/75 border-t border-gray-100 pt-3.5">
                  {selectedLeader.bio}
                </p>
              </div>

              {/* Right: portrait */}
              <div className="w-full md:w-[40%] shrink-0 bg-[#F1F3F5] md:self-stretch">
                <img
                  src={selectedLeader.image}
                  alt={selectedLeader.name}
                  className="h-56 md:h-full w-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
