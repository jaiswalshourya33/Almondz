import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { SECTORS } from '../data/sectors';
import { SERVICES } from '../data/services';
import { COMPANY_STATS, LIFECYCLE_STAGES } from '../data/company';
import { ServiceCard } from '../components/ServiceCard';
import { ProjectVideoModal } from '../components/ProjectVideoModal';
import { CountUpValue } from '../components/CountUpValue';
import { ArrowRight, ShieldCheck, Award, Building2, Compass, CheckCircle2, Play, ChevronRight, FileText, PenTool, TrendingUp } from 'lucide-react';
import indiaRoadsHero from '../images/hero/india-roads.jpg';
import mumbaiSkylineHero from '../images/hero/mumbai-skyline.jpg';
import windEnergyHero from '../images/hero/wind-energy.jpg';
import metroRailHero from '../images/hero/metro-rail.jpg';

// Headline figures for each sector, sourced directly from AGICL_Corporate_Profile.md
// (Section 4, "Notable Projects by Sector") and AGICL_Brochure_Final.md (Section 4,
// "Diverse Sector Presence & Service Capabilities") — one real, quoted figure per
// sector. Mining Sector, Environment Sector and IT Consulting are omitted here since
// neither reference document states a quantified figure for them.
const SECTOR_FIGURES = [
  { sector: "Roads, Bridges, Highways & Tunnels", value: "₹73,000 Cr+", label: "Delivered Project Portfolio" },
  { sector: "Urban Infrastructure", value: "18,200+ sq. km", label: "Urban Areas Planned Across 13+ Cities" },
  { sector: "Renewable Energy", value: "₹5,193 Cr", label: "Largest Renewable Energy Assignment (ASM)" },
  { sector: "Railways & Metro Rail", value: "₹10,500 Cr+", label: "Total Railways Project Value" },
  { sector: "Water & Irrigation", value: "₹16,019 Cr+", label: "Total Water Sector Project Value" },
  { sector: "Sewerage & Solid Waste", value: "8", label: "District WASH PMUs Established (Tripura)" },
  { sector: "Tourism Infrastructure", value: "₹1,863 Cr", label: "PPP Transaction Advisory — Heritage Development" }
];

// One icon per lifecycle stage, matched by index to LIFECYCLE_STAGES.
const LIFECYCLE_ICONS = [Compass, FileText, PenTool, TrendingUp, Building2, CheckCircle2];

export const Home: React.FC = () => {
  const [activeVideo, setActiveVideo] = useState<{ url: string; title: string } | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeSectorIndex, setActiveSectorIndex] = useState(0);
  const sectorCardRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const sectorTrackRef = useRef<HTMLDivElement | null>(null);
  const ctaSectionRef = useRef<HTMLElement | null>(null);
  const sectorFiguresSectionRef = useRef<HTMLDivElement | null>(null);
  const [sectorFiguresStarted, setSectorFiguresStarted] = useState(false);
  const lifecycleSectionRef = useRef<HTMLElement | null>(null);
  const lifecycleHeaderRef = useRef<HTMLDivElement | null>(null);
  const lifecycleTrackRef = useRef<HTMLDivElement | null>(null);
  const lifecycleNodeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cardElementRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [visibleCards, setVisibleCards] = useState<boolean[]>([]);
  const [segmentProgress, setSegmentProgress] = useState<number[]>([]);
  const [lifecycleConnectors, setLifecycleConnectors] = useState<
    { x1: number; y1: number; x2: number; y2: number; absY1: number; absY2: number }[]
  >([]);
  const connectorDetailsRef = useRef<
    { x1: number; y1: number; x2: number; y2: number; absY1: number; absY2: number }[]
  >([]);

  const backgroundImages = [
    {
      url: indiaRoadsHero,
      caption: "Highways & Expressways"
    },
    {
      url: mumbaiSkylineHero,
      caption: "Smart Cities & Urban Planning"
    },
    {
      url: windEnergyHero,
      caption: "Energy Grids & Power Infrastructure"
    },
    {
      url: metroRailHero,
      caption: "Mass Rapid Transit & Metros"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [backgroundImages.length]);

  useEffect(() => {
    const ctaSection = ctaSectionRef.current;
    if (!ctaSection || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          ctaSection.classList.add('is-visible');
          observer.unobserve(ctaSection);
        }
      },
      { threshold: 0.08 },
    );

    observer.observe(ctaSection);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const sectorFiguresSection = sectorFiguresSectionRef.current;
    if (!sectorFiguresSection) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setSectorFiguresStarted(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSectorFiguresStarted(true);
          observer.unobserve(sectorFiguresSection);
        }
      },
      { threshold: 0.9 },
    );

    observer.observe(sectorFiguresSection);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const lifecycleSection = lifecycleSectionRef.current;
    const lifecycleHeader = lifecycleHeaderRef.current;
    if (!lifecycleSection || !lifecycleHeader || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          lifecycleSection.classList.add('is-visible');
          observer.unobserve(lifecycleHeader);
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
    );

    observer.observe(lifecycleHeader);
    return () => observer.disconnect();
  }, []);

  const nodeCentersRef = useRef<{ x: number; y: number; absY: number }[]>([]);

  useLayoutEffect(() => {
    const computeLifecycleConnectors = () => {
      const track = lifecycleTrackRef.current;
      if (!track) return;
      const trackRect = track.getBoundingClientRect();
      const scrollY = window.scrollY;
      const trackAbsTop = trackRect.top + scrollY;

      const nodeCenters: { x: number; y: number; absY: number }[] = [];

      for (let i = 0; i < LIFECYCLE_STAGES.length; i++) {
        const card = cardElementRefs.current[i];
        if (card) {
          const nodeX = card.offsetLeft + 54;
          const nodeY = card.offsetTop;
          nodeCenters.push({
            x: nodeX,
            y: nodeY,
            absY: trackAbsTop + nodeY,
          });
        }
      }

      const segments: { x1: number; y1: number; x2: number; y2: number; absY1: number; absY2: number }[] = [];

      for (let i = 0; i < nodeCenters.length - 1; i++) {
        const a = nodeCenters[i];
        const b = nodeCenters[i + 1];
        segments.push({
          x1: a.x,
          y1: a.y,
          x2: b.x,
          y2: b.y,
          absY1: a.absY,
          absY2: b.absY,
        });
      }

      setLifecycleConnectors(segments);
      connectorDetailsRef.current = segments;
      nodeCentersRef.current = nodeCenters;
    };

    computeLifecycleConnectors();
    window.addEventListener('resize', computeLifecycleConnectors);
    return () => window.removeEventListener('resize', computeLifecycleConnectors);
  }, []);

  const targetSegmentProgress = useRef<number[]>([]);
  const currentSegmentProgress = useRef<number[]>([]);

  useEffect(() => {
    let animationFrameId: number;

    const updateScrollTargets = () => {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      const focalY = scrollY + viewportHeight * 0.65;

      const nodes = nodeCentersRef.current;
      const segments = connectorDetailsRef.current;

      if (nodes.length > 0) {
        const newVisibleCards = nodes.map((node, idx) => {
          if (idx === 0) {
            return focalY >= node.absY - 120;
          }
          return focalY >= node.absY - 30;
        });

        setVisibleCards((prev) => {
          const updated = [...prev];
          let changed = false;
          newVisibleCards.forEach((isVisible, idx) => {
            if (isVisible && !updated[idx]) {
              updated[idx] = true;
              changed = true;
            }
          });
          return changed ? updated : prev;
        });
      }

      if (segments.length > 0) {
        targetSegmentProgress.current = segments.map((seg) => {
          const startY = seg.absY1;
          const endY = seg.absY2;
          if (focalY <= startY) return 0;
          if (focalY >= endY) return 1;
          return (focalY - startY) / (endY - startY);
        });
      }
    };

    const tick = () => {
      const targets = targetSegmentProgress.current;
      if (targets.length > 0) {
        let changed = false;
        const current = [...(currentSegmentProgress.current.length ? currentSegmentProgress.current : targets.map(() => 0))];

        const next = targets.map((target, i) => {
          const curr = current[i] || 0;
          const diff = target - curr;
          if (Math.abs(diff) < 0.001) {
            return target;
          }
          changed = true;
          return curr + diff * 0.12;
        });

        if (changed) {
          currentSegmentProgress.current = next;
          setSegmentProgress(next);
        }
      }
      animationFrameId = requestAnimationFrame(tick);
    };

    updateScrollTargets();
    window.addEventListener('scroll', updateScrollTargets, { passive: true });
    window.addEventListener('resize', updateScrollTargets, { passive: true });
    animationFrameId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('scroll', updateScrollTargets);
      window.removeEventListener('resize', updateScrollTargets);
    };
  }, [lifecycleConnectors]);

  const handleOpenVideo = (url: string, title: string) => {
    setActiveVideo({ url, title });
  };

  const selectSector = (index: number) => {
    setActiveSectorIndex(index);
    // The active card's flex-basis grows over a 700ms CSS transition, so its
    // offsetWidth/offsetLeft are still mid-animation on the very next frame —
    // measuring them that early under-shoots the scroll target and leaves the
    // fully-expanded card partly off-screen. Wait for the transition to
    // finish (700ms) before reading geometry and scrolling.
    window.setTimeout(() => {
      sectorCardRefs.current[index]?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'nearest',
      });
    }, 720);
  };

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const interval = setInterval(() => {
      const nextIndex = (activeSectorIndex + 1) % SECTORS.length;
      setActiveSectorIndex(nextIndex);
      // Scroll only the horizontal card track, not the page, so the
      // auto-advance never fights the user scrolling the page down.
      // See the comment in selectSector: wait for the card's own
      // flex-basis transition to finish before measuring its final size.
      window.setTimeout(() => {
        const track = sectorTrackRef.current;
        const card = sectorCardRefs.current[nextIndex];
        if (!track || !card) return;
        const targetLeft = card.offsetLeft - (track.clientWidth - card.offsetWidth) / 2;
        track.scrollTo({
          left: Math.max(0, targetLeft),
          behavior: 'smooth',
        });
      }, 720);
    }, 2000);
    return () => clearInterval(interval);
  }, [activeSectorIndex]);

  return (
    <div className="flex flex-col min-h-screen bg-[#fdf9ed]">
      
      {/* HERO SECTION */}
      <section className="relative group min-h-[92vh] flex items-center justify-center bg-[#16283D] text-white overflow-hidden pt-24 pb-16">
        {/* Background Slideshow */}
        <div className="absolute inset-0 z-0">
          {backgroundImages.map((img, idx) => (
            <div
              key={idx}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                idx === currentImageIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
            >
              <img 
                src={img.url} 
                alt={img.caption}
                className="w-full h-full object-cover object-center transform scale-105 group-hover:scale-110 transition-transform duration-700 ease-out"
              />
            </div>
          ))}
          <div className="absolute inset-0 bg-gradient-to-r from-[#16283D]/70 via-[#16283D]/45 to-[#071A2D]/30 z-20"></div>

          {/* Slideshow indicators / caption badge */}
          <div className="absolute bottom-6 right-6 z-30 hidden sm:flex items-center gap-2 bg-black/40 backdrop-blur-md px-4 py-2 border border-white/20 rounded-md">
            <span className="text-[10px] font-mono text-[#F2834C] tracking-widest uppercase">FEATURING:</span>
            <span className="text-xs font-mono text-white">{backgroundImages[currentImageIndex].caption}</span>
            <div className="flex items-center gap-1.5 ml-3">
              {backgroundImages.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  onClick={() => setCurrentImageIndex(dotIdx)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    dotIdx === currentImageIndex ? 'bg-[#F2834C] w-4' : 'bg-white/50 hover:bg-white'
                  }`}
                  aria-label={`Slide ${dotIdx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="hero-entry lg:col-span-8 flex flex-col gap-6">
              <span className="text-xs sm:text-sm font-mono tracking-widest text-[#F2834C] uppercase">Infrastructure Advisory Services at Single Point</span>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-sans font-normal tracking-tight text-white/95 leading-[1.2]">
                Building Future Ready <span className="text-[#F2834C] font-serif italic font-medium">Infrastructure</span>, Building a Legacy.
              </h1>

              <p className="text-base sm:text-lg text-white/80 max-w-2xl leading-relaxed font-light mt-3">
                From concept to commissioning, Almondz Global Infra-Consultant Limited delivers world-class engineering design, techno-economic feasibility, independent engineering, and project management across highways, metros, smart cities, and energy grids.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-4">
                <Link
                  to="/projects"
                  className="bg-[#A49150] hover:bg-[#8b7b44] text-white px-8 py-4 text-xs font-mono font-bold tracking-widest uppercase transition-all duration-300 shadow-xl hover:shadow-[#A49150]/30 hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-3 rounded-md border border-[#A49150]/20"
                >
                  <span>EXPLORE PROJECTS</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  to="/services"
                  className="bg-white/15 hover:bg-white/25 text-white border border-white/30 px-8 py-4 text-xs font-mono font-bold tracking-widest uppercase transition-all duration-300 backdrop-blur-md rounded-md shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0"
                >
                  OUR SERVICES
                </Link>

                <button
                  onClick={() => handleOpenVideo("https://www.youtube.com/embed/dQw4w9WgXcQ", "Almondz Corporate Overview")}
                  className="group flex items-center gap-3 text-xs font-mono font-bold text-white hover:text-[#F2834C] transition-all px-4 py-2"
                >
                  <div className="w-10 h-10 rounded-full border border-[#F2834C]/60 group-hover:border-[#F2834C] flex items-center justify-center text-[#F2834C] bg-[#F2834C]/10 group-hover:bg-[#F2834C]/20 transition-all shadow-md group-hover:scale-105">
                    <Play className="w-4 h-4 fill-[#F2834C] ml-0.5" />
                  </div>
                  <span>WATCH SHOWCASE</span>
                </button>
              </div>
            </div>

            {/* Hero Quick Metrics Panel */}
            <div className="hero-summary-entry lg:col-span-4 bg-[#071A2D]/90 border border-[#A49150]/40 p-6 sm:p-8 backdrop-blur-md shadow-2xl flex flex-col gap-6">
              <div className="border-b border-white/10 pb-4">
                <span className="text-xs font-mono tracking-widest text-[#A49150]">AT A GLANCE</span>
                <h3 className="text-xl font-serif text-white mt-1">Institutional Excellence</h3>
              </div>

              <div className="grid grid-cols-2 gap-5">
                <div>
                  <div className="text-2xl font-serif font-bold text-[#F2834C]">₹500Cr+</div>
                  <div className="text-xs text-white/70 font-mono mt-1">Active Order Book</div>
                </div>
                <div>
                  <div className="text-2xl font-serif font-bold text-white">500+</div>
                  <div className="text-xs text-white/70 font-mono mt-1">Employees</div>
                </div>
                <div>
                  <div className="text-2xl font-serif font-bold text-[#A49150]">BBB-</div>
                  <div className="text-xs text-white/70 font-mono mt-1">CARE Rating</div>
                </div>
                <div>
                  <div className="text-2xl font-serif font-bold text-[#F2834C]">50+</div>
                  <div className="text-xs text-white/70 font-mono mt-1">Completed Projects</div>
                </div>
                <div>
                  <div className="text-2xl font-serif font-bold text-white">100+</div>
                  <div className="text-xs text-white/70 font-mono mt-1">Ongoing Engagements</div>
                </div>
                <div>
                  <div className="text-2xl font-serif font-bold text-[#A49150]">30+</div>
                  <div className="text-xs text-white/70 font-mono mt-1">Empanelments</div>
                </div>
              </div>

              <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs font-mono text-white/60">
                <span>PUBLIC LIMITED COMPANY</span>
                <span className="text-[#F2834C]">SUBSIDIARY OF AGSL (LISTED)</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* STATS TICKER BAR */}
      <section className="bg-[#071A2D] border-b border-[#A49150]/30 py-6 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {COMPANY_STATS.map((stat, idx) => (
              <div key={idx} className="flex flex-col items-center justify-center border-r last:border-0 border-white/10 px-4">
                <div className="text-2xl sm:text-3xl font-serif font-bold text-[#F2834C]">{stat.value}</div>
                <div className="text-xs font-mono text-white/70 mt-1 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
            <div className="flex flex-col items-center justify-center px-4">
              <div className="text-2xl sm:text-3xl font-serif font-bold text-white">ISO 9001</div>
              <div className="text-xs font-mono text-white/70 mt-1 uppercase tracking-wider">Certified Quality Standards</div>
            </div>
          </div>
        </div>
      </section>

      {/* ECOSYSTEM PARTNERS / ACCREDITATIONS */}
      <section className="py-12 bg-white border-b border-gray-200 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <span className="text-xs font-mono tracking-widest text-[#A49150] uppercase">TRACK RECORD BY SECTOR</span>
            <h2 className="text-2xl font-serif font-bold text-[#16283D] mt-1">Delivered Value Across India's Infrastructure Sectors</h2>
          </div>
        </div>
        <div ref={sectorFiguresSectionRef} className="partner-marquee" aria-label="Sector-wise delivered project figures">
          <div className="partner-marquee__track">
            {[...SECTOR_FIGURES, ...SECTOR_FIGURES].map((figure, idx) => (
              <div key={`${figure.sector}-${idx}`} className="partner-marquee__item partner-marquee__item--figure" aria-label={`${figure.sector}: ${figure.value} ${figure.label}`}>
                <span className="partner-marquee__figure-sector">{figure.sector}</span>
                <CountUpValue value={figure.value} start={sectorFiguresStarted} className="partner-marquee__figure-value" />
                <span className="partner-marquee__figure-label">{figure.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTORS GRID SECTION */}
      <section className="py-20 bg-[#fdf9ed]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs font-mono tracking-widest text-[#F2834C] uppercase">OUR DOMAINS</span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#16283D] mt-1">Specialized Infrastructure Sectors</h2>
            </div>
            <Link 
              to="/sectors" 
              className="mt-4 md:mt-0 inline-flex items-center gap-2 text-xs font-mono font-bold text-[#16283D] hover:text-[#F2834C] transition-colors uppercase tracking-wider"
            >
              <span>View All {SECTORS.length} Sectors</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div ref={sectorTrackRef} className="sector-showcase" aria-label="Specialized infrastructure sectors">
            {SECTORS.map((sector, index) => (
              <Link
                key={sector.id}
                ref={(element) => { sectorCardRefs.current[index] = element; }}
                to={`/sectors/${sector.slug}`}
                onClick={(event) => {
                  if (activeSectorIndex !== index) {
                    event.preventDefault();
                    selectSector(index);
                  }
                }}
                className={`sector-showcase__card group ${
                  activeSectorIndex === index ? 'is-active' : ''
                }`}
                aria-current={activeSectorIndex === index ? 'true' : undefined}
                aria-label={
                  activeSectorIndex === index
                    ? `Open ${sector.title} details`
                    : `Show ${sector.title}`
                }
              >
                <img
                  src={sector.image}
                  alt={sector.title}
                  className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071A2D] via-[#16283D]/40 to-[#16283D]/10" />

                <div className="relative flex h-full flex-col justify-between p-7 sm:p-10 lg:p-14">
                  <div className="flex items-start justify-between gap-6">
                    <span className="sector-showcase__tag bg-[#F2834C] px-3 py-1.5 text-[10px] font-mono tracking-widest text-white">
                      INFRASTRUCTURE SECTOR
                    </span>
                    <span className="text-4xl font-serif text-white/50 sm:text-6xl">{String(index + 1).padStart(2, '0')}</span>
                  </div>

                  <div className="sector-showcase__content max-w-3xl">
                    <h3 className="text-3xl font-serif leading-tight text-white sm:text-4xl lg:text-5xl">{sector.title}</h3>
                    <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/80 sm:text-base">{sector.shortDesc}</p>
                    <div className="mt-7 inline-flex items-center gap-2 text-xs font-mono font-bold tracking-wider text-[#F2834C]">
                      <span>EXPLORE EXPERTISE</span>
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-2" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CONCEPT TO COMMISSIONING LIFECYCLE */}
      <section ref={lifecycleSectionRef} className="lifecycle-showcase py-20 bg-[#1a2f45] text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div ref={lifecycleHeaderRef} className="lifecycle-showcase__header text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono tracking-widest text-[#F2834C] uppercase">END-TO-END CAPABILITY</span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white mt-1">From Concept to Commissioning</h2>
            <p className="text-white/70 text-sm mt-3 leading-relaxed">
              Our multidisciplinary engineering and financial advisory teams guide infrastructure assets seamlessly through every stage of their lifecycle.
            </p>
          </div>

          <div ref={lifecycleTrackRef} className="lifecycle-showcase__grid relative flex flex-col gap-16 max-w-xl mx-auto lg:max-w-6xl lg:gap-16">
            <svg className="absolute inset-0 hidden h-full w-full lg:block" style={{ zIndex: 0 }} aria-hidden="true">
              <defs>
                <filter id="line-super-glow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="4" result="blur1" />
                  <feGaussianBlur stdDeviation="9" result="blur2" />
                  <feMerge>
                    <feMergeNode in="blur2" />
                    <feMergeNode in="blur1" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Base inactive dashed line showing dim dashes */}
              {lifecycleConnectors.map((seg, i) => (
                <line
                  key={`base-${i}`}
                  x1={seg.x1}
                  y1={seg.y1}
                  x2={seg.x2}
                  y2={seg.y2}
                  stroke="rgba(164, 145, 80, 0.25)"
                  strokeWidth="2.5"
                  strokeDasharray="8 8"
                />
              ))}

              {/* Highlighted active dashed line that lights up dashes one after another as user scrolls */}
              {lifecycleConnectors.map((seg, i) => {
                const progress = segmentProgress[i] || 0;
                if (progress <= 0) return null;

                const activeX2 = seg.x1 + (seg.x2 - seg.x1) * progress;
                const activeY2 = seg.y1 + (seg.y2 - seg.y1) * progress;

                return (
                  <g key={`active-${i}`}>
                    {/* Vibrant Neon Glow on the dashed line */}
                    <line
                      x1={seg.x1}
                      y1={seg.y1}
                      x2={activeX2}
                      y2={activeY2}
                      stroke="#F2834C"
                      strokeWidth="7"
                      strokeOpacity="0.75"
                      strokeDasharray="8 8"
                      strokeLinecap="round"
                      filter="url(#line-super-glow)"
                    />
                    {/* Core bright dashes turning hot orange-white one by one */}
                    <line
                      x1={seg.x1}
                      y1={seg.y1}
                      x2={activeX2}
                      y2={activeY2}
                      stroke="#FFF2EB"
                      strokeWidth="3.5"
                      strokeDasharray="8 8"
                      strokeLinecap="round"
                    />
                    {/* Glowing tip indicator on current actively glowing dash */}
                    {progress > 0 && progress < 1 && (
                      <circle
                        cx={activeX2}
                        cy={activeY2}
                        r="4.5"
                        fill="#FFFFFF"
                        stroke="#F2834C"
                        strokeWidth="2.5"
                        style={{ filter: 'drop-shadow(0 0 10px #F2834C) drop-shadow(0 0 18px #F2834C)' }}
                      />
                    )}
                  </g>
                );
              })}
            </svg>
            {LIFECYCLE_STAGES.map((stage, idx) => {
              const isVisible = visibleCards[idx];
              const isNodeActive = isVisible || (idx > 0 && (segmentProgress[idx - 1] || 0) > 0.1);
              const StageIcon = LIFECYCLE_ICONS[idx];

              return (
                <div
                  key={idx}
                  ref={(element) => { cardElementRefs.current[idx] = element; }}
                  className={`lifecycle-showcase__card relative z-10 w-full bg-white rounded-2xl shadow-xl p-3 group transition-colors lg:w-[340px] ${
                    idx % 2 === 0 ? 'lg:self-start card-odd' : 'lg:self-end card-even'
                  } ${isVisible ? 'is-card-visible' : ''}`}
                >
                  <div
                    ref={(element) => { lifecycleNodeRefs.current[idx] = element; }}
                    className={`lifecycle-showcase__node text-lg font-mono font-bold ${
                      isNodeActive ? 'is-node-active' : ''
                    }`}
                  >
                    {stage.step}
                  </div>
                  <div className="rounded-xl bg-[#f8fafc] p-6 pt-8 flex flex-col gap-3">
                    <div className="w-10 h-10 rounded-full bg-white shadow-sm border border-black/5 flex items-center justify-center text-[#16283D]">
                      <StageIcon className="w-[18px] h-[18px]" />
                    </div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#F2834C]">{stage.category}</span>
                    <h3 className="text-xl font-serif font-bold text-[#16283D]">{stage.title}</h3>
                    <p className="text-xs text-gray-500 leading-relaxed">{stage.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FEATURED SERVICES */}
      <section
        className="service-scroll-section py-20"
        style={{
          backgroundImage: `linear-gradient(rgba(13, 27, 42, 0.55), rgba(13, 27, 42, 0.55)), url(${indiaRoadsHero})`,
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs font-mono tracking-widest text-[#F2834C] uppercase">PROFESSIONAL MASTERY</span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white mt-1">Consultancy & Engineering Services</h2>
            </div>
            <Link
              to="/services"
              className="mt-4 md:mt-0 inline-flex items-center gap-2 text-xs font-mono font-bold text-white hover:text-[#F2834C] transition-colors uppercase tracking-wider"
            >
              <span>Explore All Services</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="service-scroll-stack" aria-label="Consultancy and engineering services">
            {SERVICES.slice(0, 6).map((service, index) => (
              <div
                key={service.id}
                className="service-scroll-stage"
                style={{ zIndex: index + 1 }}
              >
                <div className="service-scroll-card-shell">
                  <ServiceCard service={service} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section ref={ctaSectionRef} className="cta-showcase py-16 text-white">
        <div className="cta-showcase__orb cta-showcase__orb--one" aria-hidden="true" />
        <div className="cta-showcase__orb cta-showcase__orb--two" aria-hidden="true" />
        <div className="cta-showcase__inner max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          <div className="cta-showcase__copy flex flex-col gap-2 max-w-2xl">
            <span className="cta-showcase__eyebrow text-xs font-mono tracking-widest uppercase opacity-90">PARTNER WITH ALMONDZ</span>
            <h2 className="cta-showcase__title text-3xl sm:text-4xl font-serif font-bold">Ready to Engineer Your Next Mega Infrastructure Project?</h2>
            <p className="cta-showcase__description text-sm opacity-90">Get in touch with our expert directors, structural engineers, and financial advisors today.</p>
          </div>
          <Link
            to="/contact"
            className="cta-showcase__button group shrink-0"
          >
            <span>CONTACT OUR EXPERTS</span>
          </Link>
        </div>
      </section>

      {/* VIDEO MODAL */}
      <ProjectVideoModal
        isOpen={!!activeVideo}
        onClose={() => setActiveVideo(null)}
        videoUrl={activeVideo?.url}
        title={activeVideo?.title || ""}
      />

    </div>
  );
};
