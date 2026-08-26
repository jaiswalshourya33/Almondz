import React, { useEffect, useRef, useState } from 'react';
import { LEADERSHIP, Leader } from '../data/leadership';
import { Mail, X } from 'lucide-react';

export const LeadershipPage: React.FC = () => {
  const [selectedLeader, setSelectedLeader] = useState<Leader | null>(null);
  const rosterSectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const rosterSection = rosterSectionRef.current;
    if (!rosterSection || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          rosterSection.classList.add('is-visible');
          observer.unobserve(rosterSection);
        }
      },
      { threshold: 0.08 },
    );

    observer.observe(rosterSection);
    return () => observer.disconnect();
  }, []);

  const moveCardToPointer = (event: React.PointerEvent<HTMLButtonElement>) => {
    if (event.pointerType === 'touch') return;

    const card = event.currentTarget.closest<HTMLElement>('.leadership-profile-card');
    if (!card) return;

    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    card.style.setProperty('--leader-tilt-x', `${y * -7}deg`);
    card.style.setProperty('--leader-tilt-y', `${x * 7}deg`);
    card.style.setProperty('--leader-shift-x', `${x * 9}px`);
    card.style.setProperty('--leader-shift-y', `${y * 9}px`);
  };

  const resetCardPosition = (event: React.PointerEvent<HTMLButtonElement>) => {
    const card = event.currentTarget.closest<HTMLElement>('.leadership-profile-card');
    if (!card) return;
    card.style.setProperty('--leader-tilt-x', '0deg');
    card.style.setProperty('--leader-tilt-y', '0deg');
    card.style.setProperty('--leader-shift-x', '0px');
    card.style.setProperty('--leader-shift-y', '0px');
  };

  return (
    <div className="leadership-page flex flex-col min-h-screen bg-[#fdf9ed] pt-24">
      {/* Header Banner */}
      <section className="bg-[#0D1B2A] text-white py-16 border-b border-[#A49150]/30 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-[#F2834C]/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="leadership-banner-copy flex flex-col gap-4 max-w-3xl">
            <div className="inline-flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#F2834C]"></span>
              <span className="text-xs font-mono tracking-widest text-[#F2834C] uppercase">STEWARDSHIP</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-serif font-bold tracking-tight">Board of Directors & Leadership Team</h1>
            <p className="text-white/80 text-base leading-relaxed">
              Decades of combined engineering wisdom, financial acumen, and public sector stewardship guiding Almondz Global Infra-Consultant Limited.
            </p>
          </div>
        </div>
      </section>

      {/* Leadership Roster Section */}
      <section ref={rosterSectionRef} className="leadership-roster py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {LEADERSHIP.map((leader, idx) => (
              <article
                key={idx} 
                className="leadership-profile-card bg-[#0D1B2A] border border-[#A49150]/30 overflow-hidden shadow-lg flex flex-col"
              >
                <div className="px-6 pt-6 text-center">
                  <span className="inline-flex border border-[#A49150]/30 px-3 py-1 text-[10px] font-mono uppercase tracking-wider text-[#F2834C]">
                    {leader.category}
                  </span>
                  <h3 className="mt-5 text-2xl font-serif font-bold leading-tight text-white">{leader.name}</h3>
                  <p className="mt-1 text-xs font-mono font-bold text-[#F2834C]">{leader.title}</p>
                  <p className="mt-1 text-[10px] font-mono uppercase tracking-widest text-white/50">Experience: {leader.experience}</p>
                </div>

                <button
                  type="button"
                  className="leadership-profile-photo relative mt-5 block h-[330px] w-full overflow-hidden bg-[#071A2D] text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F2834C]"
                  onClick={() => setSelectedLeader(leader)}
                  onPointerMove={moveCardToPointer}
                  onPointerLeave={resetCardPosition}
                  aria-label={`Read ${leader.name}'s profile`}
                >
                  <img 
                    src={leader.image} 
                    alt={leader.name}
                    className="h-full w-full object-contain p-3"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0D1B2A] via-[#0D1B2A]/30 to-transparent px-5 pb-5 pt-12">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-white/80">Click photo to read profile</span>
                  </div>
                </button>

                <div className="flex items-center justify-between border-t border-white/10 px-6 py-4">
                  <span className="text-[10px] font-mono tracking-wider text-[#A49150]">ALMONDZ LEADERSHIP</span>
                  <a 
                    href="mailto:contact@almondzglobalinfra.com" 
                    className="flex h-8 w-8 items-center justify-center bg-white/10 text-white transition-colors hover:bg-[#F2834C]" 
                    aria-label={`Email ${leader.name}`}
                  >
                    <Mail className="w-3.5 h-3.5" />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {selectedLeader && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#071A2D]/80 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="leader-profile-title"
          onClick={() => setSelectedLeader(null)}
        >
          <div
            className="max-h-[85vh] w-full max-w-2xl overflow-y-auto bg-white p-6 shadow-2xl sm:p-8"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-6 border-b border-[#A49150]/25 pb-5">
              <div>
                <span className="text-[10px] font-mono tracking-widest text-[#F2834C]">{selectedLeader.category}</span>
                <h2 id="leader-profile-title" className="mt-2 text-2xl font-serif font-bold text-[#0D1B2A]">{selectedLeader.name}</h2>
                <p className="mt-1 text-xs font-mono font-bold text-[#F2834C]">{selectedLeader.title}</p>
                <p className="mt-1 text-[10px] font-mono uppercase tracking-widest text-[#1c1c15]/50">Experience: {selectedLeader.experience}</p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedLeader(null)}
                className="flex h-9 w-9 shrink-0 items-center justify-center border border-[#A49150]/30 text-[#0D1B2A] transition-colors hover:border-[#F2834C] hover:text-[#F2834C]"
                aria-label="Close profile"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <p className="mt-6 text-sm leading-relaxed text-[#1c1c15]/80">{selectedLeader.bio}</p>
          </div>
        </div>
      )}
    </div>
  );
};
