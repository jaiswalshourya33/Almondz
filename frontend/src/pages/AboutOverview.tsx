import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { COMPANY_STATS } from '../data/company';
import { ShieldCheck, Award, ArrowRight, Target, Users, TrendingUp, Leaf } from 'lucide-react';
import heritageImage from '../images/about-heritage.jpg';
import strengthsImage from '../images/hero/wind-energy.jpg';
import { GroupCompaniesGraphic } from '../components/GroupCompaniesGraphic';
import { PageHeroBanner } from '../components/PageHeroBanner';

// "Why Almondz" strength pillars — icon + label + one-line note, matched to the
// six-pillar reference layout. Icons stay on the site's copper accent so the
// block reads as part of the Slate & Copper theme.
const STRENGTH_PILLARS = [
  { icon: Target, title: 'Integrated Approach', desc: 'Seamless continuity across all stages' },
  { icon: Award, title: 'Quality & Compliance', desc: 'Adherence to global standards and best practices' },
  { icon: Users, title: 'Multidisciplinary Expertise', desc: '400+ professionals across diverse domains' },
  { icon: TrendingUp, title: 'Value Optimization', desc: 'Solutions that balance quality, cost and time' },
  { icon: Leaf, title: 'Sustainability Focus', desc: 'Environmentally responsible and future-ready solutions' },
  { icon: ShieldCheck, title: 'Trust & Transparency', desc: 'Strong governance and ethical practices' },
];

export const AboutOverview: React.FC = () => {
  const imageCardRef = useRef<HTMLDivElement>(null);
  const heritageSectionRef = useRef<HTMLElement | null>(null);
  const strengthsSectionRef = useRef<HTMLElement | null>(null);
  const subNavSectionRef = useRef<HTMLElement | null>(null);
  const subNavCardsRef = useRef<HTMLDivElement | null>(null);
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
    const heritageSection = heritageSectionRef.current;
    if (!heritageSection || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          heritageSection.classList.add('is-visible');
          observer.unobserve(heritageSection);
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(heritageSection);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const strengthsSection = strengthsSectionRef.current;
    if (!strengthsSection || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          strengthsSection.classList.add('is-visible');
          observer.unobserve(strengthsSection);
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(strengthsSection);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const subNavSection = subNavSectionRef.current;
    const subNavCards = subNavCardsRef.current;
    if (!subNavSection || !subNavCards || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // Watch the card row itself (not the whole section, which also
    // includes the heading) so the reveal fires right when the cards
    // reach the viewport, not the moment the section's top edge peeks in.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          subNavSection.classList.add('is-visible');
          observer.unobserve(subNavCards);
        }
      },
      { threshold: 0.35 },
    );

    observer.observe(subNavCards);
    return () => observer.disconnect();
  }, []);

  const handleImagePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'touch' || !imageCardRef.current) return;

    const bounds = event.currentTarget.getBoundingClientRect();
    const pointerX = (event.clientX - bounds.left) / bounds.width - 0.5;
    const pointerY = (event.clientY - bounds.top) / bounds.height - 0.5;

    imageCardRef.current.style.setProperty('--about-tilt-x', `${pointerY * -7}deg`);
    imageCardRef.current.style.setProperty('--about-tilt-y', `${pointerX * 7}deg`);
    imageCardRef.current.style.setProperty('--about-shift-x', `${pointerX * 10}px`);
    imageCardRef.current.style.setProperty('--about-shift-y', `${pointerY * 10}px`);
  };

  const resetImageCard = () => {
    if (!imageCardRef.current) return;
    imageCardRef.current.style.setProperty('--about-tilt-x', '0deg');
    imageCardRef.current.style.setProperty('--about-tilt-y', '0deg');
    imageCardRef.current.style.setProperty('--about-shift-x', '0px');
    imageCardRef.current.style.setProperty('--about-shift-y', '0px');
  };

  return (
    <div className="about-overview-page flex flex-col min-h-screen bg-[#F1F3F5] pt-24">
      {/* Header Banner with Clean Energy Infrastructure Background */}
      <PageHeroBanner
        line1="ENGINEERING EXCELLENCE."
        line2="INSTITUTIONAL TRUST."
        description="Almondz Global Infra Consultant Limited (AGICL) is a premier infrastructure consultancy delivering end-to-end engineering, advisory, and sustainable nation-building solutions."
      />

      {/* Main Content */}
      <section ref={heritageSectionRef} className="about-heritage-section py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="about-heritage-copy lg:col-span-6 flex flex-col gap-6">
              <span className="text-xs font-mono tracking-widest text-[#D96B33] uppercase">OUR HERITAGE</span>
              <h2 className="text-3xl font-serif font-bold text-[#18253A]">A Legacy of Precision, Integrity, and Nation-Building</h2>
              <p className="text-sm text-[#18253A]/80 leading-relaxed">
                Founded in 2013, Almondz Global Infra Consultant Limited has over a decade of experience in infrastructure consultancy, backed by the larger Almondz Group's legacy since 1994. AGICL has successfully delivered over 50+ major infrastructure projects and maintains more than 100+ active engagements across India and abroad.
              </p>
              <p className="text-sm text-[#18253A]/80 leading-relaxed">
                Our multidisciplinary teams comprise seasoned civil engineers, geotechnical experts, urban planners, financial analysts, and environmental scientists who work in synergy to deliver turnkey consultancy from concept to commissioning.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-[#A49050]/30">
                <div>
                  <div className="text-xl font-serif font-bold text-[#18253A]">₹500Cr+</div>
                  <div className="text-xs font-mono text-[#18253A]/60 mt-1">Active Order Book</div>
                </div>
                <div>
                  <div className="text-xl font-serif font-bold text-[#D96B33]">500+</div>
                  <div className="text-xs font-mono text-[#18253A]/60 mt-1">Employees</div>
                </div>
                <div>
                  <div className="text-xl font-serif font-bold text-[#18253A]">7+</div>
                  <div className="text-xs font-mono text-[#18253A]/60 mt-1">Sectors</div>
                </div>
                <div>
                  <div className="text-xl font-serif font-bold text-[#18253A]">100+</div>
                  <div className="text-xs font-mono text-[#18253A]/60 mt-1">Completed Projects</div>
                </div>
                <div>
                  <div className="text-xl font-serif font-bold text-[#18253A]">200+</div>
                  <div className="text-xs font-mono text-[#18253A]/60 mt-1">Ongoing Engagements</div>
                </div>
                <div>
                  <div className="text-xl font-serif font-bold text-[#D96B33]">80+</div>
                  <div className="text-xs font-mono text-[#18253A]/60 mt-1">Empanelments</div>
                </div>
              </div>
            </div>

            <div className="about-image-entry lg:col-span-6">
              <div
                ref={imageCardRef}
                className="about-image-card relative"
                onPointerMove={handleImagePointerMove}
                onPointerLeave={resetImageCard}
              >
                <img
                  src={heritageImage}
                  alt="Metro infrastructure project"
                  className="w-full h-[450px] object-cover shadow-2xl"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* WHY ALMONDZ — STRENGTHS SHOWCASE */}
      <section ref={strengthsSectionRef} className="strengths-showcase py-20 bg-[#F1F3F5]">
        <div className="strengths-showcase__inner max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="strengths-showcase__media" aria-hidden="true">
            <img
              src={strengthsImage}
              alt="Renewable energy infrastructure — wind, hydro and solar"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="strengths-showcase__content">
            <span className="strengths-showcase__eyebrow block text-xs font-mono tracking-widest text-[#A49050] uppercase">Why Almondz</span>
            <h2 className="strengths-showcase__title text-3xl font-serif font-bold text-[#18253A] mt-1">Our Core Strengths</h2>

            <div className="strengths-grid">
              {STRENGTH_PILLARS.map((pillar) => (
                <div key={pillar.title} className="strength-item">
                  <h3 className="strength-item__title">{pillar.title}</h3>
                  <p className="strength-item__desc">{pillar.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* GROUP COMPANIES — ANIMATED GRAPHIC */}
      <GroupCompaniesGraphic />

      {/* SUB-NAVIGATION CARDS */}
      <section ref={subNavSectionRef} className="about-subnav-section pt-6 pb-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="about-subnav-header text-center mb-12">
            <span className="text-sm font-mono tracking-widest text-[#A49050] uppercase">EXPLORE FURTHER</span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#18253A] mt-2">Corporate Governance & Leadership</h2>
          </div>

          <div ref={subNavCardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link to="/about/mission-vision" className="about-subnav-card p-8 bg-white rounded-2xl border border-[#A49050]/20 shadow-sm hover:shadow-xl hover:border-[#D96B33]/50 hover:-translate-y-2 hover:scale-[1.03] transition-all duration-300 group">
              <h3 className="text-xl font-serif font-bold text-[#18253A] group-hover:text-[#D96B33] transition-colors">Mission & Vision</h3>
              <p className="text-xs text-[#18253A]/70 mt-2 leading-relaxed">Our core pillars of sustainable engineering, innovation, and ethical infrastructure stewardship.</p>
              <div className="mt-6 flex items-center gap-2 text-xs font-mono font-bold text-[#D96B33]">
                <span>Read More</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>

            <Link to="/about/leadership" className="about-subnav-card p-8 bg-white rounded-2xl border border-[#A49050]/20 shadow-sm hover:shadow-xl hover:border-[#D96B33]/50 hover:-translate-y-2 hover:scale-[1.03] transition-all duration-300 group">
              <h3 className="text-xl font-serif font-bold text-[#18253A] group-hover:text-[#D96B33] transition-colors">Leadership & Board</h3>
              <p className="text-xs text-[#18253A]/70 mt-2 leading-relaxed">Meet our Board of Directors, managing directors, and technical practice leaders.</p>
              <div className="mt-6 flex items-center gap-2 text-xs font-mono font-bold text-[#D96B33]">
                <span>Meet the Team</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>

            <Link to="/about/certifications" className="about-subnav-card p-8 bg-white rounded-2xl border border-[#A49050]/20 shadow-sm hover:shadow-xl hover:border-[#D96B33]/50 hover:-translate-y-2 hover:scale-[1.03] transition-all duration-300 group">
              <h3 className="text-xl font-serif font-bold text-[#18253A] group-hover:text-[#D96B33] transition-colors">Certifications & Empanelments</h3>
              <p className="text-xs text-[#18253A]/70 mt-2 leading-relaxed">View our ISO accreditations and official empanelments with NHAI, MoRTH, and World Bank.</p>
              <div className="mt-6 flex items-center gap-2 text-xs font-mono font-bold text-[#D96B33]">
                <span>View Credentials</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};
