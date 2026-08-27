import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { LEADERSHIP, Leader } from '../data/leadership';
import { Mail, X, ChevronLeft, ChevronRight } from 'lucide-react';

export const LeadershipPage: React.FC = () => {
  const [selectedLeader, setSelectedLeader] = useState<Leader | null>(null);
  const rosterSectionRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
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

  useEffect(() => {
    if (!selectedLeader) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [selectedLeader]);

  const slideRoster = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>('.leadership-profile-card');
    const step = card ? card.getBoundingClientRect().width + 24 : 300;
    track.scrollBy({ left: step * direction, behavior: 'smooth' });
  };

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
      <section className="bg-[#1E3A5F] text-white py-16 border-b border-[#A49150]/30 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-[#A49150]/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="leadership-banner-copy flex flex-col gap-5 max-w-3xl">
            <span className="inline-flex w-fit items-center text-xs font-mono tracking-widest text-[#A49150] uppercase bg-[#A49150]/10 border border-[#A49150]/30 px-4 py-1.5 rounded-full">STEWARDSHIP</span>
            <h1 ref={heroHeadingRef} className="text-4xl sm:text-5xl font-serif font-bold tracking-tight">Board of Directors & Leadership Team</h1>
            <div
              className="services-hero-line h-[3px] bg-[#A49150] rounded-full"
              style={{ width: heroLineWidth ? `${heroLineWidth}px` : '4rem' }}
            ></div>
            <p className="text-white/80 text-base leading-relaxed">
              Decades of combined engineering wisdom, financial acumen, and public sector stewardship guiding Almondz Global Infra-Consultant Limited.
            </p>
          </div>
        </div>
      </section>

      {/* Leadership Roster Section — horizontal slideshow */}
      <section ref={rosterSectionRef} className="leadership-roster py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            <button
              type="button"
              onClick={() => slideRoster(-1)}
              aria-label="Previous leader"
              className="hidden sm:flex absolute -left-5 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white border border-[#A49150]/30 shadow-lg items-center justify-center text-[#16283D] hover:bg-[#16283D] hover:text-white transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div
              ref={trackRef}
              className="leadership-roster-track flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2"
            >
              {LEADERSHIP.map((leader, idx) => (
                <article
                  key={idx}
                  className="leadership-profile-card group/card relative snap-start shrink-0 w-[260px] sm:w-[280px] bg-white rounded-2xl border border-[#A49150]/20 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col"
                >
                  <button
                    type="button"
                    className="leadership-profile-photo group/photo relative block aspect-[4/5] w-full overflow-hidden bg-[#fdf9ed] text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F2834C]"
                    onClick={() => setSelectedLeader(leader)}
                    onPointerMove={moveCardToPointer}
                    onPointerLeave={resetCardPosition}
                    aria-label={`Read ${leader.name}'s profile`}
                  >
                    <img
                      src={leader.image}
                      alt={leader.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover/photo:scale-105"
                      referrerPolicy="no-referrer"
                    />
                  </button>

                  <div className="p-5 flex flex-col gap-1.5">
                    <span className="inline-flex w-fit items-center text-[10px] font-mono uppercase tracking-widest text-[#F2834C] bg-[#F2834C]/10 border border-[#F2834C]/20 px-2.5 py-1 rounded-full mb-1">
                      {leader.category}
                    </span>
                    <h3 className="text-lg font-serif font-bold text-[#16283D] leading-snug">{leader.name}</h3>
                    <p className="text-sm font-medium text-[#A49150]">{leader.title}</p>
                    <p className="text-[11px] text-[#1c1c15]/50 mt-1">Experience: {leader.experience}</p>
                  </div>

                  {/* Hover overlay: rises to cover the entire card */}
                  <button
                    type="button"
                    onClick={() => setSelectedLeader(leader)}
                    aria-label={`Read ${leader.name}'s profile`}
                    className="leadership-card-hover-overlay absolute inset-0 z-20 flex flex-col justify-center gap-2 bg-[#fdf9ed] p-6 text-left opacity-0 translate-y-8 pointer-events-none transition-all duration-500 ease-out group-hover/card:opacity-100 group-hover/card:translate-y-0 group-hover/card:pointer-events-auto"
                  >
                    <span className="inline-flex w-fit items-center text-[10px] font-mono uppercase tracking-widest text-[#F2834C] bg-[#F2834C]/10 border border-[#F2834C]/20 px-2.5 py-1 rounded-full mb-1">
                      {leader.category}
                    </span>
                    <h3 className="text-xl font-serif font-bold text-[#16283D] leading-snug">{leader.name}</h3>
                    <p className="text-sm font-medium text-[#A49150]">{leader.title}</p>
                    <p className="text-[11px] text-[#1c1c15]/50">Experience: {leader.experience}</p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-[#16283D] font-bold">
                      View Profile
                      <span aria-hidden="true">&rarr;</span>
                    </span>
                  </button>
                </article>
              ))}
            </div>

            <button
              type="button"
              onClick={() => slideRoster(1)}
              aria-label="Next leader"
              className="hidden sm:flex absolute -right-5 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white border border-[#A49150]/30 shadow-lg items-center justify-center text-[#16283D] hover:bg-[#16283D] hover:text-white transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {selectedLeader && (
        <div
          className="fixed inset-0 z-50 overflow-y-auto bg-[#16283D]/70 backdrop-blur-sm p-4 sm:p-10 animate-fade-in"
          role="dialog"
          aria-modal="true"
          aria-labelledby="leader-profile-title"
          onClick={() => setSelectedLeader(null)}
        >
          <div className="min-h-full flex items-center justify-center">
          <div
            key={selectedLeader.name}
            className="leader-modal-panel w-full max-w-5xl bg-white rounded-3xl shadow-2xl relative flex flex-col sm:flex-row"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedLeader(null)}
              className="absolute top-5 right-5 z-20 p-2.5 bg-white/95 hover:bg-white text-[#16283D] rounded-full shadow-lg transition-colors"
              aria-label="Close profile"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left: the leader's photo, filling the full card height */}
            <div className="relative w-full sm:w-[30%] h-48 sm:h-auto shrink-0 overflow-hidden bg-[#fdf9ed] rounded-t-3xl sm:rounded-t-none sm:rounded-l-3xl">
              <img
                src={selectedLeader.image}
                alt={selectedLeader.name}
                className="h-full w-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Right: content — the card always grows to fit in full (no
                internal scrollbar); the page behind scrolls instead if a
                profile is too long for the viewport. */}
            <div className="leader-modal-content-panel flex-1 p-6 sm:p-8 flex flex-col gap-3">
              <div>
                <span className="inline-flex w-fit items-center text-[11px] font-mono uppercase tracking-widest text-[#F2834C] bg-[#F2834C]/10 border border-[#F2834C]/20 px-3 py-1.5 rounded-full mb-2.5">
                  {selectedLeader.category}
                </span>
                <h2 id="leader-profile-title" className="text-2xl font-serif font-bold text-[#16283D] leading-tight">
                  {selectedLeader.name}
                </h2>
                <p className="mt-1 text-sm font-semibold text-[#A49150]">{selectedLeader.title}</p>
                <p className="mt-0.5 text-xs text-[#1c1c15]/50">Experience: {selectedLeader.experience}</p>
              </div>

              <p className="text-[13px] sm:text-sm leading-[1.6] text-[#1c1c15]/75 border-t border-gray-100 pt-3">
                {selectedLeader.bio}
              </p>

              <div className="mt-auto pt-3 border-t border-gray-100 flex items-center justify-between">
                <span className="text-[10px] font-mono tracking-wider text-[#A49150] uppercase">Almondz Leadership</span>
                <a
                  href="mailto:contact@almondzglobalinfra.com"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-[#fdf9ed] border border-[#A49150]/20 text-[#16283D] transition-colors hover:bg-[#16283D] hover:text-white"
                  aria-label={`Email ${selectedLeader.name}`}
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
          </div>
        </div>
      )}
    </div>
  );
};
