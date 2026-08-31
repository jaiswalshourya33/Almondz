import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Check } from 'lucide-react';
import missionVisionHero from '../images/hero/mumbai-skyline.jpg';

const mapRange = (value: number, inMin: number, inMax: number, outMin: number, outMax: number) => {
  if (inMax === inMin) return outMax;
  const t = Math.min(Math.max((value - inMin) / (inMax - inMin), 0), 1);
  return outMin + t * (outMax - outMin);
};

// Reveal style for one inner card element: fades in and lifts up slightly,
// over the scroll-progress window [start, start + span]. Because this reads
// live scroll progress on every render, it plays forwards on scroll down and
// backwards on scroll up automatically — no separate "reverse" logic needed.
const revealStyle = (progress: number, start: number, span: number) => {
  const t = mapRange(progress, start, start + span, 0, 1);
  return { opacity: t, transform: `translateY(${(1 - t) * 14}px)` };
};

const MISSION_START = 0.3;
// Mission's own reveal (box + title + paragraph + 4 bullets) finishes at
// MISSION_START + 0.28 = 0.58. Vision doesn't start until VISION_START,
// leaving a scrolled-but-nothing-happens gap in between — so Vision only
// begins once Mission has fully completed, and scrolling back up through
// that same gap reverses Vision first, then Mission, in mirror order.
const VISION_START = 0.7;

const MISSION_BULLETS = [
  'Technically excellent & innovative solutions',
  'Covers Management, Engineering, Financial & Legal domains',
  'Serving infrastructure sectors with precision & integrity',
  'Client-first approach on every engagement',
];

const VISION_BULLETS = [
  'Premier domestic player in design, engineering & consulting of international standards',
  'Deliver extraordinary results for clients',
  'Build rewarding careers for our people',
  'Earn fair returns on value created',
];

export const MissionVision: React.FC = () => {
  const zoomSectionRef = useRef<HTMLElement | null>(null);
  const missionCardRef = useRef<HTMLDivElement | null>(null);
  const visionCardRef = useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = useState(0);
  const [cardHeight, setCardHeight] = useState<number | null>(null);
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

  // Both cards must match in height, and neither can clip its own content —
  // a fixed px/vh height can't satisfy both across every viewport, since the
  // actual text needs more room than a short viewport has to offer. Instead,
  // measure each card's real (unclipped) content height, size both to the
  // taller of the two, and cap that to whatever vertical space is actually
  // available (matching the top-24/bottom-8 wrapper below) — the rare case
  // where content still doesn't fit falls back to an internal scroll rather
  // than silently cutting text off.
  useLayoutEffect(() => {
    const measure = () => {
      const mission = missionCardRef.current;
      const vision = visionCardRef.current;
      if (!mission || !vision) return;
      const naturalHeight = Math.max(mission.scrollHeight, vision.scrollHeight);
      const availableHeight = window.innerHeight - 96 - 32;
      setCardHeight(Math.min(naturalHeight, availableHeight));
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  useEffect(() => {
    const zoomSection = zoomSectionRef.current;
    if (!zoomSection) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setProgress(1);
      return;
    }

    let frameId: number | null = null;

    const updateProgress = () => {
      frameId = null;
      const rect = zoomSection.getBoundingClientRect();
      const scrollableDistance = rect.height - window.innerHeight;
      if (scrollableDistance <= 0) {
        setProgress(1);
        return;
      }
      const scrolled = -rect.top;
      setProgress(Math.min(Math.max(scrolled / scrollableDistance, 0), 1));
    };

    const onScroll = () => {
      if (frameId === null) frameId = requestAnimationFrame(updateProgress);
    };

    updateProgress();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frameId !== null) cancelAnimationFrame(frameId);
    };
  }, []);

  // Phase 1 (0 → 0.30): image zooms in, cards stay hidden.
  // Phase 2 (0.30 → 0.58): Mission card box slides in, then its content
  //   (title, paragraph, bullets) reveals one piece at a time.
  // Phase 3 (0.70 → 0.98): once Mission has fully finished and the reader has
  //   kept scrolling past the gap, the Vision card plays the same sequence.
  // Scrolling back up runs this whole thing in reverse, since every value
  // below is a direct, live function of `progress`.
  const imageScale = 1 + mapRange(progress, 0, 1, 0, 0.22);

  const missionOpacity = mapRange(progress, MISSION_START, MISSION_START + 0.08, 0, 1);
  const missionTranslate = mapRange(progress, MISSION_START, MISSION_START + 0.08, -70, 0);
  const visionOpacity = mapRange(progress, VISION_START, VISION_START + 0.08, 0, 1);
  const visionTranslate = mapRange(progress, VISION_START, VISION_START + 0.08, 70, 0);

  return (
    <div className="about-dropdown-page flex flex-col min-h-screen bg-[#F1F3F5] pt-24">
      <section className="bg-[#53647D] text-white py-16 border-b border-[#A49050]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="about-dropdown-banner-copy flex flex-col gap-5 max-w-3xl">
            <span className="inline-flex w-fit items-center text-xs font-mono tracking-widest text-[#A49050] uppercase bg-[#A49050]/10 border border-[#A49050]/30 px-4 py-1.5 rounded-full">OUR PURPOSE</span>
            <h1 ref={heroHeadingRef} className="text-4xl sm:text-5xl font-serif font-bold">Mission, Vision & Core Values</h1>
            <div
              className="services-hero-line h-[3px] bg-[#A49050] rounded-full"
              style={{ width: heroLineWidth ? `${heroLineWidth}px` : '4rem' }}
            ></div>
            <p className="text-white/80 text-base leading-relaxed">
              Guiding principles that steer Almondz Global Infra-Consultant Limited toward sustainable engineering excellence and national progress.
            </p>
          </div>
        </div>
      </section>

      {/* Scroll-driven image zoom, then Mission (left) and Vision (right) cards
          slide in over the image one after the other, each card's own content
          (title → paragraph → bullets) revealing piece by piece. The section
          is 260vh tall so there's real scroll distance to drive the effect;
          the inner layer stays pinned (position: sticky) while that happens.
          Everything is a pure function of scroll progress, so scrolling up
          reverses the whole sequence — Vision hides first, then Mission. */}
      <section ref={zoomSectionRef} className="mission-vision-zoom-section relative" style={{ height: '260vh' }}>
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          <img
            src={missionVisionHero}
            alt="Smart city infrastructure aerial view"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ transform: `scale(${imageScale})`, transition: 'transform 60ms linear' }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#18253A]/50 via-[#18253A]/10 to-[#18253A]/60" />

          {/* Mission — left, vertically centered below the fixed navbar (top-24
              clears it); same fixed height as the Vision card so both match
              regardless of content length. */}
          <div
            className="absolute left-0 top-24 bottom-8 flex items-center w-full max-w-xl sm:max-w-2xl px-4 sm:px-8 lg:px-12"
            style={{ opacity: missionOpacity, transform: `translateX(${missionTranslate}px)` }}
          >
            <div
              ref={missionCardRef}
              className="mission-vision-card bg-white rounded-2xl shadow-xl p-5 sm:p-9 flex flex-col gap-3 overflow-y-auto"
              style={{ height: cardHeight ? `${cardHeight}px` : 'auto' }}
            >
              <h2 style={revealStyle(progress, MISSION_START + 0.1, 0.05)} className="text-2xl sm:text-3xl font-serif font-bold text-[#18253A]">Our Mission</h2>
              <p style={revealStyle(progress, MISSION_START + 0.13, 0.06)} className="text-xs sm:text-sm text-[#18253A]/70 leading-relaxed">
                To deliver excellence in infrastructure consultancy, engineering and technology through innovation, domain expertise and client-centric execution. Almondz creates long-term value with efficient, transparent and sustainable solutions across transportation, water, urban infrastructure, disaster resilience and digital transformation — building strong partnerships with governments, institutions and private enterprises, always to the highest standards of integrity, quality and operational excellence.
              </p>
              <ul className="flex flex-col gap-2 pt-3 mt-auto border-t border-gray-100">
                {MISSION_BULLETS.map((bullet, idx) => (
                  <li key={bullet} style={revealStyle(progress, MISSION_START + 0.17 + idx * 0.02, 0.05)} className="flex items-center gap-3 text-xs sm:text-sm text-[#18253A]/80">
                    <span className="w-5 h-5 rounded-full bg-[#D96B33] flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 text-white" strokeWidth={3} />
                    </span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Vision — right, vertically centered below the fixed navbar
              (top-24 clears it); same fixed height as the Mission card. */}
          <div
            className="absolute right-0 top-24 bottom-8 flex items-center justify-end w-full max-w-xl sm:max-w-2xl px-4 sm:px-8 lg:px-12 ml-auto"
            style={{ opacity: visionOpacity, transform: `translateX(${visionTranslate}px)` }}
          >
            <div
              ref={visionCardRef}
              className="mission-vision-card bg-white rounded-2xl shadow-xl p-5 sm:p-9 flex flex-col gap-3 overflow-y-auto"
              style={{ height: cardHeight ? `${cardHeight}px` : 'auto' }}
            >
              <h2 style={revealStyle(progress, VISION_START + 0.1, 0.05)} className="text-2xl sm:text-3xl font-serif font-bold text-[#18253A]">Our Vision</h2>
              <p style={revealStyle(progress, VISION_START + 0.13, 0.06)} className="text-xs sm:text-sm text-[#18253A]/70 leading-relaxed">
                To emerge as a globally respected, technology-driven infrastructure consultancy — enabling sustainable growth through innovative engineering, digital transformation and integrated advisory. Almondz envisions building resilient, future-ready infrastructure ecosystems that advance economic development, urban modernisation, environmental sustainability and quality of life across communities in India and beyond.
              </p>
              <ul className="flex flex-col gap-2 pt-3 mt-auto border-t border-gray-100">
                {VISION_BULLETS.map((bullet, idx) => (
                  <li key={bullet} style={revealStyle(progress, VISION_START + 0.17 + idx * 0.02, 0.05)} className="flex items-center gap-3 text-xs sm:text-sm text-[#18253A]/80">
                    <span className="w-5 h-5 rounded-full bg-[#D96B33] flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 text-white" strokeWidth={3} />
                    </span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
