import React, { useState, useMemo, useEffect, useLayoutEffect, useRef } from 'react';
import { MANAGEMENT_TEAM, ManagementMember } from '../data/management';
import { CountUpValue } from '../components/CountUpValue';
import {
  Users,
  Award,
  Mail,
  Briefcase,
  GraduationCap,
  CheckCircle2,
  Search,
  Filter,
  X,
  ShieldCheck,
  Building2,
  Compass,
  TrendingUp,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const MEMBERS_PER_PAGE = 6;

export const ManagementTeamPage: React.FC = () => {
  const [selectedDepartment, setSelectedDepartment] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeModalMember, setActiveModalMember] = useState<ManagementMember | null>(null);
  const highlightsSectionRef = useRef<HTMLElement | null>(null);
  const [highlightsStarted, setHighlightsStarted] = useState(false);
  const governanceBannerRef = useRef<HTMLDivElement | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const rosterSectionRef = useRef<HTMLElement | null>(null);
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
    if (!activeModalMember) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [activeModalMember]);

  // Governance banner: the image slides in from the right as soon as the
  // banner starts entering view, then the content card slides in from the
  // left once scroll has reached roughly the center of the image (50%
  // of the banner visible) — two thresholds on one observer.
  useEffect(() => {
    const banner = governanceBannerRef.current;
    if (!banner || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio >= 0.5) {
          banner.classList.add('is-centered');
        }
        if (entry.isIntersecting) {
          banner.classList.add('is-visible');
        }
        if (banner.classList.contains('is-visible') && banner.classList.contains('is-centered')) {
          observer.disconnect();
        }
      },
      { threshold: [0, 0.5] },
    );

    observer.observe(banner);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const highlightsSection = highlightsSectionRef.current;
    if (!highlightsSection) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setHighlightsStarted(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHighlightsStarted(true);
          observer.unobserve(highlightsSection);
        }
      },
      { threshold: 0.9 },
    );

    observer.observe(highlightsSection);
    return () => observer.disconnect();
  }, []);

  const departments =['All', 'Executive Leadership', 'Engineering & Technical', 'Financial Advisory', 'Project Management', 'Environmental & ESG'];

  const filteredMembers = useMemo(() => {
    return MANAGEMENT_TEAM.filter(member => {
      const matchesDept = selectedDepartment === 'All' || member.department === selectedDepartment;
      const matchesSearch = searchQuery.trim() === '' || 
        member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (member.competencies ?? []).some(c => c.toLowerCase().includes(searchQuery.toLowerCase())) ||
        member.qualification.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesDept && matchesSearch;
    });
  }, [selectedDepartment, searchQuery]);

  // Reset to page 1 whenever the filtered result set changes, so a filter
  // or search that shrinks the results can never leave the user stranded
  // on a page number that no longer exists.
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedDepartment, searchQuery]);

  const totalPages = Math.max(1, Math.ceil(filteredMembers.length / MEMBERS_PER_PAGE));
  // Defensive clamp: if totalPages ever shrinks below the current page for
  // any reason, fall back to the last valid page instead of rendering blank.
  const safePage = Math.min(currentPage, totalPages);
  const paginatedMembers = filteredMembers.slice(
    (safePage - 1) * MEMBERS_PER_PAGE,
    safePage * MEMBERS_PER_PAGE,
  );

  const goToPage = (page: number) => {
    const clamped = Math.min(Math.max(page, 1), totalPages);
    setCurrentPage(clamped);
    rosterSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="about-dropdown-page flex flex-col min-h-screen bg-[#fdf9ed] pt-24">
      {/* Header Banner */}
      <section className="bg-[#1E3A5F] text-white py-16 border-b border-[#A49150]/30 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-[#A49150]/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="about-dropdown-banner-copy flex flex-col gap-5 max-w-3xl">
            <span className="inline-flex w-fit items-center text-xs font-mono tracking-widest text-[#A49150] uppercase bg-[#A49150]/10 border border-[#A49150]/30 px-4 py-1.5 rounded-full">EXECUTIVE LEADERSHIP & GOVERNANCE</span>
            <h1 ref={heroHeadingRef} className="text-4xl sm:text-5xl font-serif font-bold tracking-tight">Management Team Members</h1>
            <div
              className="services-hero-line h-[3px] bg-[#A49150] rounded-full"
              style={{ width: heroLineWidth ? `${heroLineWidth}px` : '4rem' }}
            ></div>
            <p className="text-white/80 text-base sm:text-lg leading-relaxed">
              Decades of multidisciplinary engineering wisdom, financial acumen, and public sector stewardship driving Almondz Global Infra-Consultant Limited toward nation-building excellence.
            </p>
          </div>
        </div>
      </section>

      {/* Highlights Bar */}
      <section ref={highlightsSectionRef} className="bg-[#071A2D] text-white py-8 border-b border-[#A49150]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-white/10">
            <div className="p-3">
              <CountUpValue value="200+" start={highlightsStarted} className="text-3xl sm:text-4xl font-serif font-bold text-[#F2834C]" />
              <div className="text-xs font-mono text-white/70 mt-1 uppercase tracking-wider">Cumulative Experience (Years)</div>
            </div>
            <div className="p-3">
              <CountUpValue value="5" start={highlightsStarted} className="text-3xl sm:text-4xl font-serif font-bold text-white" />
              <div className="text-xs font-mono text-white/70 mt-1 uppercase tracking-wider">Core Specialist Divisions</div>
            </div>
            <div className="p-3">
              <CountUpValue value="100+" start={highlightsStarted} className="text-3xl sm:text-4xl font-serif font-bold text-[#A49150]" />
              <div className="text-xs font-mono text-white/70 mt-1 uppercase tracking-wider">Active Infrastructure Projects</div>
            </div>
            <div className="p-3">
              <CountUpValue value="100%" start={highlightsStarted} className="text-3xl sm:text-4xl font-serif font-bold text-[#F2834C]" />
              <div className="text-xs font-mono text-white/70 mt-1 uppercase tracking-wider">ISO Quality Governance</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Roster Section */}
      <section ref={rosterSectionRef} className="about-dropdown-content py-16 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Controls: Search & Department Tabs */}
          <div className="flex flex-col lg:flex-row gap-4 justify-between items-stretch lg:items-center mb-12 bg-white rounded-2xl border border-[#A49150]/15 shadow-sm p-3">
            {/* Department Filter Tabs */}
            <div className="flex flex-wrap gap-2">
              {departments.map((dept) => (
                <button
                  key={dept}
                  onClick={() => setSelectedDepartment(dept)}
                  className={`px-4 py-2 text-xs font-medium rounded-full transition-all duration-300 ${
                    selectedDepartment === dept
                      ? 'bg-[#F2834C] text-white shadow-md shadow-[#F2834C]/30 scale-[1.03]'
                      : 'bg-[#fdf9ed] text-[#16283D] hover:bg-[#16283D] hover:text-white'
                  }`}
                >
                  {dept}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative min-w-[260px]">
              <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, role, or skill..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-[#fdf9ed] border border-transparent rounded-full text-xs text-[#16283D] placeholder-gray-400 focus:outline-none focus:border-[#F2834C] focus:bg-white transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Members Grid */}
          {filteredMembers.length > 0 ? (
            <div key={safePage} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 animate-fade-in">
              {paginatedMembers.map((member) => (
                <button
                  type="button"
                  key={member.id}
                  onClick={() => setActiveModalMember(member)}
                  className="group bg-white rounded-2xl border border-[#A49150]/20 shadow-sm hover:shadow-xl hover:border-[#F2834C]/40 hover:-translate-y-1 transition-all duration-300 overflow-hidden text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F2834C]"
                >
                  {/* Photo */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#fdf9ed]">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <span className="absolute top-2.5 left-2.5 text-[9px] font-mono uppercase tracking-widest text-white bg-[#16283D]/85 backdrop-blur-sm px-2 py-0.5 rounded-full border border-white/10">
                      {member.department ?? 'Management'}
                    </span>
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#16283D]/85 to-transparent px-3 pb-2 pt-8 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-[9px] font-mono uppercase tracking-widest text-white/90">View Profile</span>
                    </div>
                  </div>

                  {/* Name & Title */}
                  <div className="p-3.5 flex flex-col gap-0.5">
                    <h3 className="text-base font-serif font-bold text-[#16283D] leading-snug group-hover:text-[#F2834C] transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-xs font-medium text-[#A49150]">{member.title}</p>

                    {(member.competencies?.length ?? 0) > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-2 pt-2 border-t border-gray-100">
                        {member.competencies!.slice(0, 3).map((comp, idx) => (
                          <span key={idx} className="text-[10px] font-medium bg-[#16283D] text-white px-2 py-1 rounded-full">
                            {comp}
                          </span>
                        ))}
                        {member.competencies!.length > 3 && (
                          <span className="text-[10px] font-medium text-[#A49150] px-1 py-1">
                            +{member.competencies!.length - 3}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          ) : null}

          {/* Pagination — only shown once there's more than one page */}
          {filteredMembers.length > 0 && totalPages > 1 && (
            <div className="flex items-center justify-end gap-2 mt-12">
              <button
                type="button"
                onClick={() => goToPage(safePage - 1)}
                disabled={safePage === 1}
                aria-label="Previous page"
                className="w-8 h-8 rounded-full bg-white border border-[#A49150]/20 shadow-sm flex items-center justify-center text-[#16283D] transition-all duration-300 hover:bg-[#1E3A5F] hover:text-white hover:border-[#1E3A5F] hover:shadow-lg hover:shadow-[#1E3A5F]/25 hover:-translate-y-0.5 disabled:opacity-40 disabled:pointer-events-none disabled:hover:translate-y-0"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((page) => (
                <button
                  type="button"
                  key={page}
                  onClick={() => goToPage(page)}
                  aria-label={`Go to page ${page}`}
                  aria-current={page === safePage ? 'page' : undefined}
                  className={`w-8 h-8 rounded-full text-xs font-semibold transition-all duration-300 ${
                    page === safePage
                      ? 'bg-[#1E3A5F] text-white shadow-md shadow-[#1E3A5F]/30'
                      : 'bg-white border border-[#A49150]/20 text-[#16283D] shadow-sm hover:bg-[#1E3A5F] hover:text-white hover:border-[#1E3A5F] hover:shadow-lg hover:shadow-[#1E3A5F]/25 hover:-translate-y-0.5'
                  }`}
                >
                  {page}
                </button>
              ))}

              <button
                type="button"
                onClick={() => goToPage(safePage + 1)}
                disabled={safePage === totalPages}
                aria-label="Next page"
                className="w-8 h-8 rounded-full bg-white border border-[#A49150]/20 shadow-sm flex items-center justify-center text-[#16283D] transition-all duration-300 hover:bg-[#1E3A5F] hover:text-white hover:border-[#1E3A5F] hover:shadow-lg hover:shadow-[#1E3A5F]/25 hover:-translate-y-0.5 disabled:opacity-40 disabled:pointer-events-none disabled:hover:translate-y-0"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {filteredMembers.length === 0 && (
            <div className="text-center py-20 bg-white border border-[#A49150]/30 p-8">
              <Users className="w-12 h-12 text-[#A49150] mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-serif font-bold text-[#16283D]">No management team members found</h3>
              <p className="text-xs text-gray-500 mt-1 max-w-md mx-auto">
                No team members match your current filter or search criteria. Try clearing search filters.
              </p>
              <button
                onClick={() => { setSelectedDepartment('All'); setSearchQuery(''); }}
                className="mt-4 px-4 py-2 bg-[#16283D] text-white text-xs font-mono hover:bg-[#F2834C] transition-colors"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Governance Philosophy Section */}
      <section className="py-20 bg-[#fdf9ed]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={governanceBannerRef} className="gov-banner relative rounded-3xl shadow-2xl overflow-hidden">
            {/* Full-width background image — its height now follows the
                card's own natural height (the card drives layout height as
                an in-flow element; the image fills it via absolute+h-full),
                instead of a fixed height guess. Slides in from the right as
                the banner enters view. */}
            <img
              src="https://almondzglobalinfra.com/media/product/1502232643_water.jpg"
              alt="Infrastructure governance in action"
              className="gov-banner__image absolute inset-0 w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#16283D]/15 via-transparent to-transparent" />

            {/* Floating content card — in normal flow (via margin, not
                absolute centering) so its natural height sets the banner's
                height, and the image above matches it exactly. Slides in
                from the left once scroll reaches the center of the image. */}
            <div className="relative m-5 sm:m-8 lg:m-10">
              <div className="gov-banner__card w-full max-w-2xl bg-white rounded-2xl shadow-2xl ring-1 ring-black/5 border-t-4 border-[#A49150] p-6 sm:p-8 flex flex-col gap-4">
              <div>
                <span className="text-xs font-mono tracking-widest text-[#F2834C] uppercase">EXECUTIVE GOVERNANCE</span>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#16283D] mt-2">Pillars of Management Leadership</h2>
                <p className="text-sm text-[#1c1c15]/70 mt-3 leading-relaxed">
                  Our executive leadership adheres to rigorous institutional protocols, ensuring total accountability, transparent governance, and technical excellence across all client mandates.
                </p>
              </div>

              <ul className="flex flex-col gap-3">
                <li className="flex items-start gap-3">
                  <span className="w-8 h-8 rounded-lg bg-[#F2834C]/10 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-4 h-4 text-[#F2834C]" />
                  </span>
                  <div>
                    <h3 className="text-sm font-semibold text-[#16283D]">Technical Rigor</h3>
                    <p className="text-xs text-[#1c1c15]/70 mt-0.5 leading-relaxed">
                      Zero compromise on engineering safety, structural load validations, and international ISO quality standards.
                    </p>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <span className="w-8 h-8 rounded-lg bg-[#A49150]/15 flex items-center justify-center shrink-0">
                    <TrendingUp className="w-4 h-4 text-[#A49150]" />
                  </span>
                  <div>
                    <h3 className="text-sm font-semibold text-[#16283D]">Fiscal Integrity</h3>
                    <p className="text-xs text-[#1c1c15]/70 mt-0.5 leading-relaxed">
                      Transparent transaction advisory, risk-mitigated PPP models, and prudent financial capital allocation.
                    </p>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <span className="w-8 h-8 rounded-lg bg-[#F2834C]/10 flex items-center justify-center shrink-0">
                    <Compass className="w-4 h-4 text-[#F2834C]" />
                  </span>
                  <div>
                    <h3 className="text-sm font-semibold text-[#16283D]">BIM & GIS Innovation</h3>
                    <p className="text-xs text-[#1c1c15]/70 mt-0.5 leading-relaxed">
                      Pioneering 3D digital twin modeling, automated pavement audits, and drone-based spatial mapping.
                    </p>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <span className="w-8 h-8 rounded-lg bg-[#A49150]/15 flex items-center justify-center shrink-0">
                    <Building2 className="w-4 h-4 text-[#A49150]" />
                  </span>
                  <div>
                    <h3 className="text-sm font-semibold text-[#16283D]">ESG & Stewardship</h3>
                    <p className="text-xs text-[#1c1c15]/70 mt-0.5 leading-relaxed">
                      Embedding environmental protection, carbon footprint auditing, and social safeguards into every master plan.
                    </p>
                  </div>
                </li>
              </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Profile Detail Modal — same panel + staggered content animation as
          the Leadership profile dialog (LeadershipPage.tsx). */}
      {activeModalMember && (
        <div
          className="fixed inset-0 z-50 overflow-y-auto bg-[#16283D]/70 backdrop-blur-sm p-4 sm:p-10 animate-fade-in"
          onClick={() => setActiveModalMember(null)}
        >
          <div className="min-h-full flex items-center justify-center">
          <div
            key={activeModalMember.id}
            className="leader-modal-panel w-full max-w-5xl bg-white rounded-3xl shadow-2xl relative flex flex-col sm:flex-row"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              onClick={() => setActiveModalMember(null)}
              className="absolute top-5 right-5 z-20 p-2.5 bg-white/95 hover:bg-white text-[#16283D] rounded-full shadow-lg transition-colors"
              aria-label="Close profile"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left: the member's own photo, filling the full card height */}
            <div className="relative w-full sm:w-[30%] h-48 sm:h-auto shrink-0 overflow-hidden bg-[#fdf9ed] rounded-t-3xl sm:rounded-t-none sm:rounded-l-3xl">
              <img
                src={activeModalMember.image}
                alt={activeModalMember.name}
                className="h-full w-full object-cover object-top"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Right: content — the card always grows to fit its content in
                full (no internal scrollbar); if a member's profile is too
                long for the viewport, the page behind the dialog scrolls
                instead, so every card looks the same and nothing is clipped. */}
            <div className="flex-1 flex flex-col">
              <div className="leader-modal-content-panel flex-1 p-6 sm:p-8 flex flex-col gap-4">
                <div>
                  <span className="inline-flex w-fit items-center text-[11px] font-mono uppercase tracking-widest text-[#F2834C] bg-[#F2834C]/10 border border-[#F2834C]/20 px-3 py-1.5 rounded-full mb-3">
                    {activeModalMember.department ?? 'Management'}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#16283D] leading-tight">
                    {activeModalMember.name}
                  </h2>
                  <p className="mt-1.5 text-sm font-semibold text-[#A49150]">{activeModalMember.title}</p>
                </div>

                {/* Qualification & Experience */}
                <div className="flex items-start gap-3 bg-[#fdf9ed] rounded-2xl p-4 border border-[#A49150]/15">
                  <div className="w-10 h-10 rounded-xl bg-[#F2834C]/10 flex items-center justify-center shrink-0">
                    <GraduationCap className="w-5 h-5 text-[#F2834C]" />
                  </div>
                  <div>
                    <p className="text-sm text-[#16283D]">{activeModalMember.qualification}</p>
                    <p className="text-xs font-semibold text-[#F2834C] mt-1">{activeModalMember.experienceYears}+ Years Experience</p>
                  </div>
                </div>

                {/* Professional Background */}
                <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
                  <div className="flex items-center gap-2.5 mb-2.5">
                    <div className="w-8 h-8 rounded-lg bg-[#16283D]/8 flex items-center justify-center">
                      <Briefcase className="w-4 h-4 text-[#16283D]" />
                    </div>
                    <h4 className="text-sm font-semibold text-[#16283D]">Professional Background</h4>
                  </div>
                  <p className="text-sm text-[#1c1c15]/70 leading-relaxed">{activeModalMember.bio}</p>
                </div>

                {/* Key Projects Supervised */}
                {(activeModalMember.keyProjects?.length ?? 0) > 0 && (
                  <div>
                    <div className="flex items-center gap-2.5 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-[#A49150]/15 flex items-center justify-center">
                        <Award className="w-4 h-4 text-[#A49150]" />
                      </div>
                      <h4 className="text-sm font-semibold text-[#16283D]">Key Projects Supervised</h4>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {activeModalMember.keyProjects!.map((proj, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 bg-[#fdf9ed] rounded-xl p-3 border border-[#A49150]/15">
                          <CheckCircle2 className="w-4 h-4 text-[#F2834C] shrink-0 mt-0.5" />
                          <span className="text-sm text-[#16283D]">{proj}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Footer Buttons */}
              <div className="flex items-center justify-between gap-3 px-6 sm:px-8 py-5 border-t border-gray-100 bg-[#fdf9ed]/50 shrink-0">
                <a
                  href={`mailto:${activeModalMember.email}`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#F2834C] hover:bg-[#d9723f] text-white text-sm font-semibold rounded-full shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5 active:translate-y-0"
                >
                  <Mail className="w-4 h-4" />
                  <span>Contact</span>
                </a>
                <button
                  onClick={() => setActiveModalMember(null)}
                  className="px-5 py-2.5 text-sm font-medium text-[#16283D] hover:bg-gray-100 rounded-full transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
          </div>
        </div>
      )}
    </div>
  );
};
