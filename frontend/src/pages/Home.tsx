import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { SECTORS } from '../data/sectors';
import { SERVICES } from '../data/services';
import { LIFECYCLE_STAGES } from '../data/company';
import { ProjectVideoModal } from '../components/ProjectVideoModal';
import { CountUpValue } from '../components/CountUpValue';
import { ArrowRight, ShieldCheck, Award, Building2, Compass, CheckCircle2, Play, ChevronRight, FileText, PenTool, TrendingUp } from 'lucide-react';
import indiaRoadsHero from '../images/hero/india-roads.jpg';
import windEnergyHero from '../images/hero/wind-energy.jpg';
import metroRailHero from '../images/hero/metro-rail.jpg';

// Headline figures for each sector, sourced directly from AGICL_Corporate_Profile.md
// (Section 4, "Notable Projects by Sector") and AGICL_Brochure_Final.md (Section 4,
// "Diverse Sector Presence & Service Capabilities") — one real, quoted figure per
// sector. Mining Sector, Environment Sector and IT Consulting are omitted here since
// neither reference document states a quantified figure for them.
const SECTOR_FIGURES = [
  { sector: "Roads, Bridges, Highways & Tunnels", value: "₹73,000 Cr+", label: "Delivered Project Portfolio" },
  { sector: "Renewable Energy", value: "₹5,193 Cr", label: "Largest Renewable Energy Assignment (ASM)" },
  { sector: "Railways & Metro Rail", value: "₹10,500 Cr+", label: "Total Railways Project Value" },
  { sector: "Water & Irrigation", value: "₹16,019 Cr+", label: "Total Water Sector Project Value" },
  { sector: "Tourism Infrastructure", value: "₹1,863 Cr", label: "PPP Transaction Advisory — Heritage Development" }
];

// One icon per lifecycle stage, matched by index to LIFECYCLE_STAGES.
const LIFECYCLE_ICONS = [Compass, FileText, PenTool, TrendingUp, Building2, CheckCircle2];

// Terse one-word labels for the "Sectors We Serve" filter row, kept short so all
// ten chips sit on a single line; index-matched to SECTORS.
const SECTOR_FILTER_LABELS = [
  'Roads', 'Urban', 'Renewable', 'Railways', 'Water',
  'Sewerage', 'Tourism', 'Mining', 'Environment', 'IT',
];

// Terse labels for the "Services We Provide" filter row, kept short so all
// eleven chips sit on a single line; index-matched to SERVICES.
const SERVICE_FILTER_LABELS = [
  'Design', 'IE / AE', 'PMC', 'Safety', 'Pre-Bid', 'Advisory',
  'ASM', 'TEV', 'Survey / GIS', 'LIE', 'Due Diligence',
];

// The four ISO management-system certifications AGICL holds — sourced from
// AGICL_Corporate_Profile.md ("Certifications held") and AGICL_Brochure_Final.md.
// Shown as self-contained SVG seals in the stats bar (no external logo files).
const CERT_BADGES = [
  { code: "ISO 9001", year: "2015", label: "Quality Management", full: "ISO 9001:2015" },
  { code: "ISO 27001", year: "2022", label: "Information Security", full: "ISO/IEC 27001:2022" },
  { code: "ISO 45001", year: "2018", label: "Occupational Health & Safety", full: "ISO 45001:2018" },
  { code: "ISO 14001", year: "2015", label: "Environmental Management", full: "ISO 14001:2015" },
];

const CertSeal: React.FC<{ code: string; year: string; full: string }> = ({ code, year, full }) => (
  <svg viewBox="0 0 120 120" className="w-12 h-12 sm:w-14 sm:h-14" role="img" aria-label={`${full} certified`}>
    <circle cx="60" cy="60" r="54" fill="none" stroke="#A49050" strokeWidth="2" />
    <circle cx="60" cy="60" r="46" fill="none" stroke="#A49050" strokeWidth="1" strokeDasharray="2 4" opacity="0.7" />
    <text x="60" y="50" textAnchor="middle" fontFamily="'JetBrains Mono', monospace" fontSize="17" fontWeight="700" fill="#ffffff">{code}</text>
    <text x="60" y="70" textAnchor="middle" fontFamily="'JetBrains Mono', monospace" fontSize="13" fontWeight="700" fill="#D96B33">{year}</text>
    <text x="60" y="88" textAnchor="middle" fontFamily="'JetBrains Mono', monospace" fontSize="7" letterSpacing="2" fill="rgba(255,255,255,0.55)">CERTIFIED</text>
  </svg>
);

export const Home: React.FC = () => {
  const [activeVideo, setActiveVideo] = useState<{ url: string; title: string } | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeSectorIndex, setActiveSectorIndex] = useState(0);
  const sectorCardRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  // Timestamp of the last manual sector pick (card or filter chip). The
  // auto-advance carousel pauses for a short window after any interaction so a
  // filter selection isn't overridden a couple of seconds later.
  const sectorInteractionRef = useRef(0);
  // Same three, for the parallel "Services We Provide" showcase.
  const [activeServiceIndex, setActiveServiceIndex] = useState(0);
  const serviceCardRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const serviceTrackRef = useRef<HTMLDivElement | null>(null);
  const serviceInteractionRef = useRef(0);
  const sectorTrackRef = useRef<HTMLDivElement | null>(null);
  const ctaSectionRef = useRef<HTMLElement | null>(null);
  const brandStatementRef = useRef<HTMLElement | null>(null);
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
      url: "https://almondzglobalinfra.com/media/product/313788118_smartcity.jpg",
      caption: "Urban Infrastructure"
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
    const brandStatement = brandStatementRef.current;
    if (!brandStatement || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // Fire once the section has scrolled up so its centre sits in the upper
    // half of the viewport (rootMargin trims 45% off the bottom), then let it
    // replay whenever it leaves and re-enters view.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          brandStatement.classList.add('is-visible');
        } else {
          brandStatement.classList.remove('is-visible');
        }
      },
      { threshold: 0.2, rootMargin: '0px 0px -45% 0px' },
    );

    observer.observe(brandStatement);
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
    sectorInteractionRef.current = Date.now();
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

  // Filter-chip click: swap the active card (its flex-basis grows over the same
  // 700ms CSS transition — that is the "card animation") and re-centre only the
  // horizontal card track. Unlike selectSector it never calls scrollIntoView,
  // so the page — and the filter row — stay exactly where they are.
  const selectSectorFromFilter = (index: number) => {
    sectorInteractionRef.current = Date.now();
    setActiveSectorIndex(index);
    window.setTimeout(() => {
      const track = sectorTrackRef.current;
      const card = sectorCardRefs.current[index];
      if (!track || !card) return;
      const targetLeft = card.offsetLeft - (track.clientWidth - card.offsetWidth) / 2;
      track.scrollTo({ left: Math.max(0, targetLeft), behavior: 'smooth' });
    }, 720);
  };

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const interval = setInterval(() => {
      // Hold position for a while after the user picks a sector manually.
      if (Date.now() - sectorInteractionRef.current < 25000) return;
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

  // Service showcase — identical behaviour to the sector showcase above.
  const selectServiceFromFilter = (index: number) => {
    serviceInteractionRef.current = Date.now();
    setActiveServiceIndex(index);
    window.setTimeout(() => {
      const track = serviceTrackRef.current;
      const card = serviceCardRefs.current[index];
      if (!track || !card) return;
      const targetLeft = card.offsetLeft - (track.clientWidth - card.offsetWidth) / 2;
      track.scrollTo({ left: Math.max(0, targetLeft), behavior: 'smooth' });
    }, 720);
  };

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const interval = setInterval(() => {
      if (Date.now() - serviceInteractionRef.current < 25000) return;
      const nextIndex = (activeServiceIndex + 1) % SERVICES.length;
      setActiveServiceIndex(nextIndex);
      window.setTimeout(() => {
        const track = serviceTrackRef.current;
        const card = serviceCardRefs.current[nextIndex];
        if (!track || !card) return;
        const targetLeft = card.offsetLeft - (track.clientWidth - card.offsetWidth) / 2;
        track.scrollTo({ left: Math.max(0, targetLeft), behavior: 'smooth' });
      }, 720);
    }, 2000);
    return () => clearInterval(interval);
  }, [activeServiceIndex]);

  return (
    <div className="flex flex-col min-h-screen bg-[#F1F3F5]">
      
      {/* HERO SECTION */}
      <section className="relative group min-h-[92vh] flex items-center justify-center bg-[#18253A] text-white overflow-hidden pt-24 pb-16">
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
          <div className="absolute inset-0 bg-gradient-to-r from-[#18253A]/70 via-[#18253A]/45 to-[#101A29]/30 z-20"></div>

          {/* Slideshow indicators / caption badge */}
          <div className="absolute bottom-6 right-6 z-30 hidden sm:flex items-center gap-2 bg-black/40 backdrop-blur-md px-4 py-2 border border-white/20 rounded-md">
            <span className="text-[10px] font-mono text-[#D96B33] tracking-widest uppercase">FEATURING:</span>
            <span className="text-xs font-mono text-white">{backgroundImages[currentImageIndex].caption}</span>
            <div className="flex items-center gap-1.5 ml-3">
              {backgroundImages.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  onClick={() => setCurrentImageIndex(dotIdx)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    dotIdx === currentImageIndex ? 'bg-[#D96B33] w-4' : 'bg-white/50 hover:bg-white'
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
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-sans font-normal tracking-tight text-white/95 leading-[1.2]">
                Building Future Ready <span className="text-[#D96B33] font-serif italic font-medium">Infrastructure</span>, Building a Legacy.
              </h1>

              <p className="text-base sm:text-lg text-white/80 max-w-2xl leading-relaxed font-bold mt-3">
                From concept to commissioning, Almondz Global Infra-Consultant Limited delivers world-class engineering design, techno-economic feasibility, independent engineering, and project management across highways, metros, smart cities, and energy grids.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-4">
                <Link
                  to="/projects"
                  className="bg-[#A49050] hover:bg-[#8A7942] text-white px-8 py-4 text-xs font-mono font-bold tracking-widest uppercase transition-all duration-300 shadow-xl hover:shadow-[#A49050]/30 hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-3 rounded-md border border-[#A49050]/20"
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
                  className="group flex items-center gap-3 text-xs font-mono font-bold text-white hover:text-[#D96B33] transition-all px-4 py-2"
                >
                  <div className="w-10 h-10 rounded-full border border-[#D96B33]/60 group-hover:border-[#D96B33] flex items-center justify-center text-[#D96B33] bg-[#D96B33]/10 group-hover:bg-[#D96B33]/20 transition-all shadow-md group-hover:scale-105">
                    <Play className="w-4 h-4 fill-[#D96B33] ml-0.5" />
                  </div>
                  <span>WATCH SHOWCASE</span>
                </button>
              </div>
            </div>

            {/* Hero Quick Metrics Panel */}
            <div className="hero-summary-entry lg:col-span-4 bg-[#101A29]/90 border border-[#A49050]/40 p-6 sm:p-8 backdrop-blur-md shadow-2xl flex flex-col gap-6">
              <div className="border-b border-white/10 pb-4">
                <span className="text-xs font-mono tracking-widest text-[#A49050]">AT A GLANCE</span>
                <h3 className="text-xl font-serif text-white mt-1">Institutional Excellence</h3>
              </div>

              <div className="grid grid-cols-2 gap-5">
                <div>
                  <div className="text-2xl font-serif font-bold text-[#D96B33]">₹500Cr+</div>
                  <div className="text-xs text-white/70 font-mono mt-1">Active Order Book</div>
                </div>
                <div>
                  <div className="text-2xl font-serif font-bold text-white">500+</div>
                  <div className="text-xs text-white/70 font-mono mt-1">Employees</div>
                </div>
                <div>
                  <div className="text-2xl font-serif font-bold text-[#A49050]">7+</div>
                  <div className="text-xs text-white/70 font-mono mt-1">Sectors</div>
                </div>
                <div>
                  <div className="text-2xl font-serif font-bold text-[#D96B33]">100+</div>
                  <div className="text-xs text-white/70 font-mono mt-1">Completed Projects</div>
                </div>
                <div>
                  <div className="text-2xl font-serif font-bold text-white">200+</div>
                  <div className="text-xs text-white/70 font-mono mt-1">Ongoing Engagements</div>
                </div>
                <div>
                  <div className="text-2xl font-serif font-bold text-[#A49050]">80+</div>
                  <div className="text-xs text-white/70 font-mono mt-1">Empanelments</div>
                </div>
              </div>

              <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs font-mono text-white/60">
                <span>PUBLIC LIMITED COMPANY</span>
                <span className="text-[#D96B33]">SUBSIDIARY OF AGSL (LISTED)</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* STATS TICKER BAR */}
      <section className="bg-[#101A29] border-b border-[#A49050]/30 py-3 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {CERT_BADGES.map((cert, idx) => (
              <div key={cert.code} className={`flex flex-col items-center justify-center gap-1 px-4 ${idx === CERT_BADGES.length - 1 ? '' : 'border-r'} border-white/10`}>
                <CertSeal code={cert.code} year={cert.year} full={cert.full} />
                <div className="text-xs font-mono text-white/70 uppercase tracking-wider">{cert.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ECOSYSTEM PARTNERS / ACCREDITATIONS */}
      <section className="py-12 bg-white border-b border-gray-200 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <span className="text-xs font-mono tracking-widest text-[#A49050] uppercase">TRACK RECORD BY SECTOR</span>
            <h2 className="text-2xl font-serif font-bold text-[#18253A] mt-1">Delivered Value Across India's Infrastructure Sectors</h2>
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
      <section className="pt-20 pb-8 bg-[#F1F3F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <span className="text-xs font-mono tracking-widest text-[#D96B33] uppercase">OUR DOMAINS</span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#18253A] mt-1">Sectors We Serve</h2>

            <div
              className="mt-6 flex flex-nowrap items-center gap-1.5 sm:gap-2 overflow-x-auto"
              role="tablist"
              aria-label="Filter sectors"
            >
              {SECTORS.map((sector, index) => (
                <button
                  key={sector.id}
                  type="button"
                  role="tab"
                  aria-selected={activeSectorIndex === index}
                  onClick={() => selectSectorFromFilter(index)}
                  className={`shrink-0 whitespace-nowrap rounded-full border px-3 py-1.5 text-[11px] sm:text-xs font-mono font-bold uppercase tracking-wider transition-colors duration-200 ${
                    activeSectorIndex === index
                      ? 'bg-[#18253A] border-[#18253A] text-white'
                      : 'bg-white border-[#18253A]/15 text-[#18253A]/70 hover:bg-[#53647D] hover:border-[#53647D] hover:text-white'
                  }`}
                >
                  {SECTOR_FILTER_LABELS[index]}
                </button>
              ))}
            </div>
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
                <div className="absolute inset-0 bg-gradient-to-t from-[#101A29] via-[#18253A]/40 to-[#18253A]/10" />

                <div className="relative flex h-full flex-col justify-between p-7 sm:p-10 lg:p-14">
                  <div className="flex items-start justify-between gap-6">
                    <span className="sector-showcase__tag bg-[#D96B33] px-3 py-1.5 text-[10px] font-mono tracking-widest text-white">
                      INFRASTRUCTURE SECTOR
                    </span>
                    <span className="text-4xl font-serif text-white/50 sm:text-6xl">{String(index + 1).padStart(2, '0')}</span>
                  </div>

                  <div className="sector-showcase__content max-w-3xl">
                    <h3 className="text-3xl font-serif leading-tight text-white sm:text-4xl lg:text-5xl">{sector.title}</h3>
                    <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/80 sm:text-base">{sector.shortDesc}</p>
                    <div className="mt-7 inline-flex items-center gap-2 text-xs font-mono font-bold tracking-wider text-[#D96B33]">
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

      {/* BRAND STATEMENT */}
      <section ref={brandStatementRef} className="brand-statement bg-[#18253A] py-20 sm:py-28">
        <div className="brand-statement__inner max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="brand-statement__rule block h-[3px] w-full bg-white/60" aria-hidden="true" />
          <p className="py-14 sm:py-20 text-center font-sans font-normal tracking-tight text-white leading-[1.3] text-[2.5rem] sm:text-6xl lg:text-[4.25rem]">
            <span className="brand-statement__line block">We are <span className="font-medium italic text-[#D96B33]">Almondz</span>.</span>
            <span className="brand-statement__line block">We shape infrastructure,</span>
            <span className="brand-statement__line block">We build tomorrow.</span>
          </p>
          <span className="brand-statement__rule block h-[3px] w-full bg-white/60" aria-hidden="true" />
        </div>
      </section>

      {/* SERVICES GRID SECTION */}
      <section className="pt-16 pb-8 bg-[#F1F3F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <span className="text-xs font-mono tracking-widest text-[#D96B33] uppercase">WHAT WE DO</span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#18253A] mt-1">Services We Provide</h2>

            <div
              className="mt-6 flex flex-nowrap items-center gap-1.5 sm:gap-2 overflow-x-auto"
              role="tablist"
              aria-label="Filter services"
            >
              {SERVICES.map((service, index) => (
                <button
                  key={service.id}
                  type="button"
                  role="tab"
                  aria-selected={activeServiceIndex === index}
                  onClick={() => selectServiceFromFilter(index)}
                  className={`shrink-0 whitespace-nowrap rounded-full border px-3 py-1.5 text-[11px] sm:text-xs font-mono font-bold uppercase tracking-wider transition-colors duration-200 ${
                    activeServiceIndex === index
                      ? 'bg-[#18253A] border-[#18253A] text-white'
                      : 'bg-white border-[#18253A]/15 text-[#18253A]/70 hover:bg-[#53647D] hover:border-[#53647D] hover:text-white'
                  }`}
                >
                  {SERVICE_FILTER_LABELS[index]}
                </button>
              ))}
            </div>
          </div>

          <div ref={serviceTrackRef} className="sector-showcase service-showcase" aria-label="Consultancy and engineering services">
            {SERVICES.map((service, index) => (
              <Link
                key={service.id}
                ref={(element) => { serviceCardRefs.current[index] = element; }}
                to="/services"
                onClick={(event) => {
                  if (activeServiceIndex !== index) {
                    event.preventDefault();
                    selectServiceFromFilter(index);
                  }
                }}
                className={`sector-showcase__card group ${
                  activeServiceIndex === index ? 'is-active' : ''
                }`}
                aria-current={activeServiceIndex === index ? 'true' : undefined}
                aria-label={
                  activeServiceIndex === index
                    ? `Open ${service.title}`
                    : `Show ${service.title}`
                }
              >
                <img
                  src={service.image}
                  alt={service.title}
                  className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#101A29] via-[#18253A]/40 to-[#18253A]/10" />

                <div className="relative flex h-full flex-col justify-between p-7 sm:p-10 lg:p-14">
                  <div className="sector-showcase__tag flex items-start justify-end gap-6">
                    <span className="text-4xl font-serif text-white/50 sm:text-6xl">{String(index + 1).padStart(2, '0')}</span>
                  </div>

                  <div className="sector-showcase__content max-w-3xl">
                    <h3 className="text-xl font-serif font-medium leading-snug text-white sm:text-2xl lg:text-3xl">{service.title}</h3>
                    <div className="mt-5 inline-flex items-center gap-2 text-xs font-mono font-bold tracking-wider text-[#D96B33]">
                      <span>View Details</span>
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
      <section ref={lifecycleSectionRef} className="lifecycle-showcase py-20 bg-[#E1E5EA] text-[#18253A] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div ref={lifecycleHeaderRef} className="lifecycle-showcase__header text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono tracking-widest text-[#D96B33] uppercase">END-TO-END CAPABILITY</span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#18253A] mt-1">From Concept to Commissioning</h2>
            <p className="text-[#18253A]/70 text-sm mt-3 leading-relaxed">
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
                  stroke="rgba(164, 145, 80, 0.55)"
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
                      stroke="#D96B33"
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
                      stroke="#C25A28"
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
                        fill="#18253A"
                        stroke="#D96B33"
                        strokeWidth="2.5"
                        style={{ filter: 'drop-shadow(0 0 10px #D96B33) drop-shadow(0 0 18px #D96B33)' }}
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
                  className={`lifecycle-showcase__card relative z-10 w-full bg-white border border-[#18253A]/10 rounded-2xl shadow-lg p-3 group transition-colors lg:w-[340px] ${
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
                  <div className="rounded-xl bg-[#F8F9FA] p-6 pt-8 flex flex-col gap-3">
                    <div className="w-10 h-10 rounded-full bg-white shadow-sm border border-black/5 flex items-center justify-center text-[#18253A]">
                      <StageIcon className="w-[18px] h-[18px]" />
                    </div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#D96B33]">{stage.category}</span>
                    <h3 className="text-xl font-serif font-bold text-[#18253A]">{stage.title}</h3>
                    <p className="text-xs text-gray-500 leading-relaxed">{stage.description}</p>
                  </div>
                </div>
              );
            })}
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
            <p className="cta-showcase__description text-sm opacity-90">Get in touch with our experts.</p>
          </div>
          <Link
            to="/contact"
            className="cta-showcase__button group shrink-0"
          >
            <span>Contact Us</span>
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
