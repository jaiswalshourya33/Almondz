import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Check } from 'lucide-react';
import missionVisionHero from '../images/hero/mumbai-skyline.jpg';
import missionVisionBanner from '../images/hero/mission-vision.jpg';
import { PageHeroBanner } from '../components/PageHeroBanner';

const clamp = (val: number, min = 0, max = 1) => Math.min(Math.max(val, min), max);

const lerp = (progress: number, start: number, end: number) => {
  if (end <= start) return progress >= start ? 1 : 0;
  return clamp((progress - start) / (end - start));
};

// Smooth reveal style driven directly by scroll progress
const scrollStagger = (progress: number, start: number, span: number, distanceY = 16) => {
  const t = lerp(progress, start, start + span);
  const eased = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
  return {
    opacity: t,
    transform: `translate3d(0, ${(1 - eased) * distanceY}px, 0)`,
    willChange: 'opacity, transform',
  };
};

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
  const [progress, setProgress] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);

  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);
  const rafIdRef = useRef<number | null>(null);

  useLayoutEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    checkDesktop();
    window.addEventListener('resize', checkDesktop, { passive: true });
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  useEffect(() => {
    if (!isDesktop) return;

    const zoomSection = zoomSectionRef.current;
    if (!zoomSection) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setProgress(1);
      return;
    }

    const updateTarget = () => {
      const rect = zoomSection.getBoundingClientRect();
      const windowH = window.innerHeight;
      const scrolled = windowH - rect.top;
      const totalDistance = rect.height;

      if (scrolled <= 0) {
        targetProgressRef.current = 0;
      } else {
        targetProgressRef.current = clamp(scrolled / totalDistance, 0, 1);
      }
    };

    // Inertial lerp loop for liquid-smooth 60-120fps motion on desktop
    const smoothLoop = () => {
      const diff = targetProgressRef.current - currentProgressRef.current;
      if (Math.abs(diff) > 0.0003) {
        currentProgressRef.current += diff * 0.12;
        setProgress(currentProgressRef.current);
      } else if (currentProgressRef.current !== targetProgressRef.current) {
        currentProgressRef.current = targetProgressRef.current;
        setProgress(currentProgressRef.current);
      }
      rafIdRef.current = requestAnimationFrame(smoothLoop);
    };

    updateTarget();
    currentProgressRef.current = targetProgressRef.current;
    setProgress(targetProgressRef.current);

    rafIdRef.current = requestAnimationFrame(smoothLoop);

    window.addEventListener('scroll', updateTarget, { passive: true });
    window.addEventListener('resize', updateTarget, { passive: true });

    return () => {
      window.removeEventListener('scroll', updateTarget);
      window.removeEventListener('resize', updateTarget);
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [isDesktop]);

  // Desktop Animation Timings
  const imageScale = 1 + lerp(progress, 0, 1) * 0.04;
  const desktopMissionOpacity = lerp(progress, 0.03, 0.13);
  const desktopMissionTranslateX = (1 - lerp(progress, 0.03, 0.13)) * -45;

  const desktopVisionOpacity = lerp(progress, 0.44, 0.54);
  const desktopVisionTranslateX = (1 - lerp(progress, 0.44, 0.54)) * 45;

  return (
    <div className="about-dropdown-page flex flex-col min-h-screen bg-[#F1F3F5] pt-24">
      {/* Header Banner */}
      <PageHeroBanner
        line1="OUR GUIDING PURPOSE."
        line2="MISSION & VISION."
        description="Guiding principles and enduring core values steering Almondz Global Infra-Consultant Limited toward sustainable engineering excellence and national progress."
        backgroundImage={missionVisionBanner}
      />

      {isDesktop ? (
        /* DESKTOP VIEW: Side-by-side with Sticky Scroll Stagger & Crystal Glassmorphism */
        <section ref={zoomSectionRef} className="mission-vision-zoom-section relative" style={{ height: '200vh' }}>
          <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
            {/* Full Panoramic City Background Image */}
            <img
              src={missionVisionHero}
              alt="Smart city infrastructure aerial view"
              className="absolute inset-0 w-full h-full object-cover object-[center_65%] pointer-events-none select-none"
              style={{
                transform: `scale(${imageScale}) translate3d(0, 0, 0)`,
                willChange: 'transform',
              }}
            />
            {/* Crystal Ambient Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#101F33]/55 via-[#101F33]/25 to-[#101F33]/60 pointer-events-none" />

            {/* Cards Container */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 pointer-events-none">
              <div className="grid grid-cols-2 gap-8 lg:gap-12 items-stretch">
                {/* OUR MISSION CARD */}
                <div
                  className="pointer-events-auto transition-transform"
                  style={{
                    opacity: desktopMissionOpacity,
                    transform: `translate3d(${desktopMissionTranslateX}px, 0, 0)`,
                    willChange: 'opacity, transform',
                  }}
                >
                  <div className="mission-vision-card relative overflow-hidden rounded-lg p-8 lg:p-10 flex flex-col gap-4 bg-white/[0.08] backdrop-blur-2xl border border-white/30 shadow-[inset_0_1px_1px_rgba(255,255,255,0.45),0_25px_60px_rgba(0,0,0,0.4)] transition-all duration-300">
                    <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-[#0B1526]/45 via-[#0B1526]/30 to-[#0B1526]/50" />

                    <div style={scrollStagger(progress, 0.05, 0.06)}>
                      <span className="text-xs font-mono tracking-widest text-[#FFA066] uppercase font-bold block mb-1">
                        OUR MISSION
                      </span>
                      <h2 className="text-2xl lg:text-3xl font-serif font-bold text-white tracking-tight">
                        Engineering Excellence with Integrity
                      </h2>
                    </div>

                    <div style={scrollStagger(progress, 0.10, 0.06)}>
                      <p className="text-xs lg:text-sm text-white/95 leading-relaxed font-normal">
                        To deliver excellence in infrastructure consultancy, engineering and technology through innovation, domain expertise and client-centric execution. Almondz creates long-term value with efficient, transparent and sustainable solutions across transportation, water, urban infrastructure, disaster resilience and digital transformation — building strong partnerships with governments, institutions and private enterprises, always to the highest standards of integrity, quality and operational excellence.
                      </p>
                    </div>

                    <ul className="flex flex-col gap-3 pt-4 mt-auto border-t border-white/20">
                      {MISSION_BULLETS.map((bullet, idx) => (
                        <li
                          key={bullet}
                          style={scrollStagger(progress, 0.14 + idx * 0.05, 0.05)}
                          className="flex items-start gap-2.5 text-xs lg:text-sm text-white/95 leading-relaxed"
                        >
                          <Check className="w-4 h-4 text-[#FFA066] shrink-0 mt-0.5" strokeWidth={2.5} />
                          <span className="font-normal">{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* OUR VISION CARD */}
                <div
                  className="pointer-events-auto transition-transform"
                  style={{
                    opacity: desktopVisionOpacity,
                    transform: `translate3d(${desktopVisionTranslateX}px, 0, 0)`,
                    willChange: 'opacity, transform',
                  }}
                >
                  <div className="mission-vision-card relative overflow-hidden rounded-lg p-8 lg:p-10 flex flex-col gap-4 bg-white/[0.08] backdrop-blur-2xl border border-white/30 shadow-[inset_0_1px_1px_rgba(255,255,255,0.45),0_25px_60px_rgba(0,0,0,0.4)] transition-all duration-300">
                    <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-[#0B1526]/45 via-[#0B1526]/30 to-[#0B1526]/50" />

                    <div style={scrollStagger(progress, 0.46, 0.06)}>
                      <span className="text-xs font-mono tracking-widest text-[#FFDF80] uppercase font-bold block mb-1">
                        OUR VISION
                      </span>
                      <h2 className="text-2xl lg:text-3xl font-serif font-bold text-white tracking-tight">
                        Global Benchmark in Nation-Building
                      </h2>
                    </div>

                    <div style={scrollStagger(progress, 0.50, 0.06)}>
                      <p className="text-xs lg:text-sm text-white/95 leading-relaxed font-normal">
                        To emerge as a globally respected, technology-driven infrastructure consultancy — enabling sustainable growth through innovative engineering, digital transformation and integrated advisory. Almondz envisions building resilient, future-ready infrastructure ecosystems that advance economic development, urban modernisation, environmental sustainability and quality of life across communities in India and beyond.
                      </p>
                    </div>

                    <ul className="flex flex-col gap-3 pt-4 mt-auto border-t border-white/20">
                      {VISION_BULLETS.map((bullet, idx) => (
                        <li
                          key={bullet}
                          style={scrollStagger(progress, 0.54 + idx * 0.05, 0.05)}
                          className="flex items-start gap-2.5 text-xs lg:text-sm text-white/95 leading-relaxed"
                        >
                          <Check className="w-4 h-4 text-[#FFDF80] shrink-0 mt-0.5" strokeWidth={2.5} />
                          <span className="font-normal">{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        /* MOBILE & TABLET VIEW: Natural Continuous Flow */
        <section className="relative py-12 sm:py-16 px-4 sm:px-6 overflow-hidden">
          {/* Panoramic City Background Image */}
          <img
            src={missionVisionHero}
            alt="Smart city infrastructure aerial view"
            className="absolute inset-0 w-full h-full object-cover object-[center_65%] pointer-events-none select-none"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#101F33]/55 via-[#101F33]/30 to-[#101F33]/60 pointer-events-none" />

          {/* Cards Stack */}
          <div className="relative z-10 w-full max-w-2xl mx-auto flex flex-col gap-8">
            {/* OUR MISSION CARD */}
            <div className="mission-vision-card relative overflow-hidden rounded-lg p-6 sm:p-8 flex flex-col gap-4 bg-white/[0.08] backdrop-blur-2xl border border-white/30 shadow-[inset_0_1px_1px_rgba(255,255,255,0.45),0_20px_50px_rgba(0,0,0,0.4)]">
              <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-[#0B1526]/50 via-[#0B1526]/35 to-[#0B1526]/55" />

              <div>
                <span className="text-xs font-mono tracking-widest text-[#FFA066] uppercase font-bold block mb-1">
                  OUR MISSION
                </span>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
                  Engineering Excellence with Integrity
                </h2>
              </div>

              <p className="text-xs sm:text-sm text-white/95 leading-relaxed font-normal">
                To deliver excellence in infrastructure consultancy, engineering and technology through innovation, domain expertise and client-centric execution. Almondz creates long-term value with efficient, transparent and sustainable solutions across transportation, water, urban infrastructure, disaster resilience and digital transformation — building strong partnerships with governments, institutions and private enterprises, always to the highest standards of integrity, quality and operational excellence.
              </p>

              <ul className="flex flex-col gap-3 pt-4 mt-auto border-t border-white/20">
                {MISSION_BULLETS.map((bullet) => (
                  <li
                    key={bullet}
                    className="flex items-start gap-2.5 text-xs sm:text-sm text-white/95 leading-relaxed"
                  >
                    <Check className="w-4 h-4 text-[#FFA066] shrink-0 mt-0.5" strokeWidth={2.5} />
                    <span className="font-normal">{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* OUR VISION CARD */}
            <div className="mission-vision-card relative overflow-hidden rounded-lg p-6 sm:p-8 flex flex-col gap-4 bg-white/[0.08] backdrop-blur-2xl border border-white/30 shadow-[inset_0_1px_1px_rgba(255,255,255,0.45),0_20px_50px_rgba(0,0,0,0.4)]">
              <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-[#0B1526]/45 via-[#0B1526]/30 to-[#0B1526]/50" />

              <div>
                <span className="text-xs font-mono tracking-widest text-[#FFDF80] uppercase font-bold block mb-1">
                  OUR VISION
                </span>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
                  Global Benchmark in Nation-Building
                </h2>
              </div>

              <p className="text-xs sm:text-sm text-white/95 leading-relaxed font-normal">
                To emerge as a globally respected, technology-driven infrastructure consultancy — enabling sustainable growth through innovative engineering, digital transformation and integrated advisory. Almondz envisions building resilient, future-ready infrastructure ecosystems that advance economic development, urban modernisation, environmental sustainability and quality of life across communities in India and beyond.
              </p>

              <ul className="flex flex-col gap-3 pt-4 mt-auto border-t border-white/20">
                {VISION_BULLETS.map((bullet) => (
                  <li
                    key={bullet}
                    className="flex items-start gap-2.5 text-xs sm:text-sm text-white/95 leading-relaxed"
                  >
                    <Check className="w-4 h-4 text-[#FFDF80] shrink-0 mt-0.5" strokeWidth={2.5} />
                    <span className="font-normal">{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
