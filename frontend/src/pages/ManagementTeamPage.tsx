import React, { useState, useMemo, useEffect, useLayoutEffect, useRef } from 'react';
import { MANAGEMENT_TEAM, ManagementMember } from '../data/management';
import { CountUpValue } from '../components/CountUpValue';
import { PageHeroBanner } from '../components/PageHeroBanner';
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
  const startIndex = (safePage - 1) * MEMBERS_PER_PAGE;
  const endIndex = Math.min(startIndex + MEMBERS_PER_PAGE, filteredMembers.length);
  const paginatedMembers = filteredMembers.slice(startIndex, endIndex);

  const goToPage = (page: number) => {
    const clamped = Math.min(Math.max(page, 1), totalPages);
    setCurrentPage(clamped);
    rosterSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="about-dropdown-page flex flex-col min-h-screen bg-[#F1F3F5] pt-24">
      {/* Header Banner with Clean Energy Infrastructure Background */}
      <PageHeroBanner
        line1="EXECUTIVE LEADERSHIP."
        line2="MANAGEMENT TEAM."
        description="Decades of multidisciplinary engineering wisdom, financial acumen, and public sector stewardship driving Almondz Global Infra-Consultant Limited toward nation-building excellence."
      />

      {/* Highlights Bar */}
      <section ref={highlightsSectionRef} className="bg-[#101A29] text-white py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center divide-y md:divide-y-0 md:divide-x divide-white/10">
            <div className="p-1.5">
              <CountUpValue value="200+" start={highlightsStarted} className="text-2xl sm:text-3xl font-serif font-bold text-[#D96B33]" />
              <div className="text-[11px] font-mono text-white/70 mt-0.5 uppercase tracking-wider">Cumulative Experience (Years)</div>
            </div>
            <div className="p-1.5">
              <CountUpValue value="5" start={highlightsStarted} className="text-2xl sm:text-3xl font-serif font-bold text-white" />
              <div className="text-[11px] font-mono text-white/70 mt-0.5 uppercase tracking-wider">Core Specialist Divisions</div>
            </div>
            <div className="p-1.5">
              <CountUpValue value="100+" start={highlightsStarted} className="text-2xl sm:text-3xl font-serif font-bold text-[#A49050]" />
              <div className="text-[11px] font-mono text-white/70 mt-0.5 uppercase tracking-wider">Active Infrastructure Projects</div>
            </div>
            <div className="p-1.5">
              <CountUpValue value="100%" start={highlightsStarted} className="text-2xl sm:text-3xl font-serif font-bold text-[#D96B33]" />
              <div className="text-[11px] font-mono text-white/70 mt-0.5 uppercase tracking-wider">ISO Quality Governance</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Roster Section */}
      <section ref={rosterSectionRef} className="about-dropdown-content pt-16 pb-8 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Controls: Search & Department Tabs */}
          <div className="flex flex-col lg:flex-row gap-4 justify-between items-stretch lg:items-center mb-12 bg-white rounded-2xl border border-[#A49050]/15 shadow-sm p-3">
            {/* Department Filter Tabs */}
            <div className="flex flex-wrap gap-1.5">
              {departments.map((dept) => (
                <button
                  key={dept}
                  onClick={() => setSelectedDepartment(dept)}
                  className={`px-2.5 py-1.5 text-[10px] font-mono font-bold uppercase whitespace-nowrap transition-all duration-300 rounded-md shadow-sm hover:shadow ${
                    selectedDepartment === dept
                      ? 'bg-[#18253A] text-white border border-[#18253A] shadow-md -translate-y-0.5'
                      : 'bg-[#F1F3F5] text-[#18253A] border border-[#A49050]/30 hover:border-[#D96B33] hover:bg-[#A49050]/10 hover:-translate-y-0.5 active:translate-y-0'
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
                className="w-full pl-10 pr-4 py-2.5 bg-[#F1F3F5] border border-transparent rounded-full text-xs text-[#18253A] placeholder-gray-400 focus:outline-none focus:border-[#D96B33] focus:bg-white transition-all"
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
                  className="group bg-white rounded-2xl border border-[#A49050]/20 shadow-sm hover:shadow-xl hover:border-[#D96B33]/40 hover:-translate-y-1 transition-all duration-300 overflow-hidden text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D96B33]"
                >
                  {/* Photo */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#F1F3F5]">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <span className="absolute top-2.5 left-2.5 text-[9px] font-mono uppercase tracking-widest text-white bg-[#18253A]/85 backdrop-blur-sm px-2 py-0.5 rounded-full border border-white/10">
                      {member.department ?? 'Management'}
                    </span>
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#18253A]/85 to-transparent px-3 pb-2 pt-8 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-[9px] font-mono uppercase tracking-widest text-white/90">View Profile</span>
                    </div>
                  </div>

                  {/* Name & Title */}
                  <div className="p-3.5 flex flex-col gap-0.5">
                    <h3 className="text-base font-serif font-bold text-[#18253A] leading-snug group-hover:text-[#D96B33] transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-xs font-medium text-[#A49050]">{member.title}</p>

                    {(member.competencies?.length ?? 0) > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-2 pt-2 border-t border-gray-100">
                        {member.competencies!.slice(0, 3).map((comp, idx) => (
                          <span key={idx} className="text-[10px] font-medium bg-[#18253A] text-white px-2 py-1 rounded-full">
                            {comp}
                          </span>
                        ))}
                        {member.competencies!.length > 3 && (
                          <span className="text-[10px] font-medium text-[#A49050] px-1 py-1">
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

          {/* Cursor & Page-based Responsive Pagination — same styling/behavior as the Sector Detail page */}
          {filteredMembers.length > 0 && totalPages > 1 && (
            <div className="mt-12 pt-6 border-t border-gray-300/80">
              {/* Mobile Pagination View (< sm) */}
              <div className="flex sm:hidden flex-col items-center gap-3 w-full">
                <div className="flex items-center justify-between w-full gap-2">
                  <button
                    type="button"
                    onClick={() => goToPage(safePage - 1)}
                    disabled={safePage === 1}
                    className={`flex-1 py-2.5 px-3 text-xs font-semibold rounded-full flex items-center justify-center gap-1.5 border transition-all ${
                      safePage === 1
                        ? 'bg-gray-100 text-gray-300 border-gray-200 cursor-not-allowed'
                        : 'bg-white text-gray-800 border-gray-300 active:bg-gray-100 shadow-2xs cursor-pointer'
                    }`}
                    aria-label="Previous page"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Previous</span>
                  </button>

                  <div className="flex items-center gap-1 px-1">
                    {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((page) => (
                      <button
                        key={page}
                        type="button"
                        onClick={() => goToPage(page)}
                        className={`w-8 h-8 text-xs font-semibold rounded-full flex items-center justify-center transition-all cursor-pointer ${
                          page === safePage
                            ? 'bg-gray-900 text-white shadow-xs'
                            : 'text-gray-700 bg-white border border-gray-200 active:bg-gray-100'
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => goToPage(safePage + 1)}
                    disabled={safePage === totalPages}
                    className={`flex-1 py-2.5 px-3 text-xs font-semibold rounded-full flex items-center justify-center gap-1.5 border transition-all ${
                      safePage === totalPages
                        ? 'bg-gray-100 text-gray-300 border-gray-200 cursor-not-allowed'
                        : 'bg-white text-gray-800 border-gray-300 active:bg-gray-100 shadow-2xs cursor-pointer'
                    }`}
                    aria-label="Next page"
                  >
                    <span>Next</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                <span className="text-[11px] text-gray-500 font-medium">
                  Showing {startIndex + 1}–{endIndex} of {filteredMembers.length} team members
                </span>
              </div>

              {/* Desktop / Tablet Pagination View (sm and above) */}
              <div className="hidden sm:flex items-center justify-between w-full">
                <span className="text-xs text-[#18253A]/70 font-medium">
                  Showing <strong className="text-gray-900">{startIndex + 1}–{endIndex}</strong> of <strong className="text-gray-900">{filteredMembers.length}</strong> team members • Page <strong className="text-gray-900">{safePage}</strong> of <strong className="text-gray-900">{totalPages}</strong>
                </span>

                <div className="inline-flex items-center gap-1.5 p-1 bg-white border border-gray-300 rounded-full shadow-2xs">
                  <button
                    type="button"
                    onClick={() => goToPage(safePage - 1)}
                    disabled={safePage === 1}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-full flex items-center gap-1 transition-all ${
                      safePage === 1
                        ? 'text-gray-300 cursor-not-allowed'
                        : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100 cursor-pointer'
                    }`}
                    aria-label="Previous page"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Prev</span>
                  </button>

                  <div className="flex items-center gap-1 px-1">
                    {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((page) => (
                      <button
                        key={page}
                        type="button"
                        onClick={() => goToPage(page)}
                        aria-current={page === safePage ? 'page' : undefined}
                        className={`w-7 h-7 text-xs font-semibold rounded-full flex items-center justify-center transition-all cursor-pointer ${
                          page === safePage
                            ? 'bg-gray-900 text-white shadow-xs'
                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => goToPage(safePage + 1)}
                    disabled={safePage === totalPages}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-full flex items-center gap-1 transition-all ${
                      safePage === totalPages
                        ? 'text-gray-300 cursor-not-allowed'
                        : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100 cursor-pointer'
                    }`}
                    aria-label="Next page"
                  >
                    <span className="hidden sm:inline">Next</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {filteredMembers.length === 0 && (
            <div className="text-center py-20 bg-white border border-[#A49050]/30 p-8">
              <Users className="w-12 h-12 text-[#A49050] mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-serif font-bold text-[#18253A]">No management team members found</h3>
              <p className="text-xs text-gray-500 mt-1 max-w-md mx-auto">
                No team members match your current filter or search criteria. Try clearing search filters.
              </p>
              <button
                onClick={() => { setSelectedDepartment('All'); setSearchQuery(''); }}
                className="mt-4 px-4 py-2 bg-[#18253A] text-white text-xs font-mono hover:bg-[#D96B33] transition-colors"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Governance Philosophy Section */}
      <section className="pt-8 pb-20 bg-[#F1F3F5]">
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
            <div className="absolute inset-0 bg-gradient-to-r from-[#18253A]/15 via-transparent to-transparent" />

            {/* Floating content card — in normal flow (via margin, not
                absolute centering) so its natural height sets the banner's
                height, and the image above matches it exactly. Slides in
                from the left once scroll reaches the center of the image. */}
            <div className="relative m-5 sm:m-8 lg:m-10">
              <div className="gov-banner__card w-full max-w-2xl bg-white rounded-2xl shadow-2xl ring-1 ring-black/5 border-t-4 border-[#A49050] p-6 sm:p-8 flex flex-col gap-4">
              <div>
                <span className="text-xs font-mono tracking-widest text-[#A49050] uppercase">EXECUTIVE GOVERNANCE</span>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#18253A] mt-2">Pillars of Management Leadership</h2>
                <p className="text-sm text-[#18253A]/70 mt-3 leading-relaxed">
                  Our executive leadership adheres to rigorous institutional protocols, ensuring total accountability, transparent governance, and technical excellence across all client mandates.
                </p>
              </div>

              <div className="flex flex-col gap-4">
                <div className="space-y-1.5">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#18253A] border-b border-gray-200 pb-1.5">
                    Technical Rigor
                  </h3>
                  <p className="text-xs text-[#18253A]/70 leading-relaxed">
                    Zero compromise on engineering safety, structural load validations, and international ISO quality standards.
                  </p>
                </div>

                <div className="space-y-1.5">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#18253A] border-b border-gray-200 pb-1.5">
                    Fiscal Integrity
                  </h3>
                  <p className="text-xs text-[#18253A]/70 leading-relaxed">
                    Transparent transaction advisory, risk-mitigated PPP models, and prudent financial capital allocation.
                  </p>
                </div>

                <div className="space-y-1.5">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#18253A] border-b border-gray-200 pb-1.5">
                    BIM & GIS Innovation
                  </h3>
                  <p className="text-xs text-[#18253A]/70 leading-relaxed">
                    Pioneering 3D digital twin modeling, automated pavement audits, and drone-based spatial mapping.
                  </p>
                </div>

                <div className="space-y-1.5">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#18253A] border-b border-gray-200 pb-1.5">
                    ESG & Stewardship
                  </h3>
                  <p className="text-xs text-[#18253A]/70 leading-relaxed">
                    Embedding environmental protection, carbon footprint auditing, and social safeguards into every master plan.
                  </p>
                </div>
              </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Profile Detail Modal — same panel + staggered content animation as
          the Leadership profile dialog (LeadershipPage.tsx). */}
      {activeModalMember && (
        <div
          className="fixed inset-0 z-50 overflow-y-auto bg-[#18253A]/70 backdrop-blur-sm p-4 sm:p-10 animate-fade-in"
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
              className="absolute top-5 right-5 z-20 p-2.5 bg-white/95 hover:bg-white text-[#18253A] rounded-full shadow-lg transition-colors"
              aria-label="Close profile"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left: the member's own photo, filling the full card height */}
            <div className="relative w-full sm:w-[30%] h-48 sm:h-auto shrink-0 overflow-hidden bg-[#F1F3F5] rounded-t-3xl sm:rounded-t-none sm:rounded-l-3xl">
              <img
                src={activeModalMember.image}
                alt={activeModalMember.name}
                className="h-full w-full object-contain"
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
                  <span className="inline-flex w-fit items-center text-[11px] font-mono uppercase tracking-widest text-[#D96B33] bg-[#D96B33]/10 border border-[#D96B33]/20 px-3 py-1.5 rounded-full mb-3">
                    {activeModalMember.department ?? 'Management'}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#18253A] leading-tight">
                    {activeModalMember.name}
                  </h2>
                  <p className="mt-1.5 text-sm font-semibold text-[#A49050]">{activeModalMember.title}</p>
                </div>

                {/* Qualification & Experience */}
                <div className="flex items-start gap-3 bg-[#F1F3F5] rounded-2xl p-4 border border-[#A49050]/15">
                  <div className="w-10 h-10 rounded-xl bg-[#D96B33]/10 flex items-center justify-center shrink-0">
                    <GraduationCap className="w-5 h-5 text-[#D96B33]" />
                  </div>
                  <div>
                    <p className="text-sm text-[#18253A]">{activeModalMember.qualification}</p>
                    <p className="text-xs font-semibold text-[#D96B33] mt-1">{activeModalMember.experienceYears}+ Years Experience</p>
                  </div>
                </div>

                {/* Professional Background */}
                <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
                  <div className="flex items-center gap-2.5 mb-2.5">
                    <div className="w-8 h-8 rounded-lg bg-[#18253A]/8 flex items-center justify-center">
                      <Briefcase className="w-4 h-4 text-[#18253A]" />
                    </div>
                    <h4 className="text-sm font-semibold text-[#18253A]">Professional Background</h4>
                  </div>
                  <p className="text-sm text-[#18253A]/70 leading-relaxed">{activeModalMember.bio}</p>
                </div>

                {/* Key Projects Supervised */}
                {(activeModalMember.keyProjects?.length ?? 0) > 0 && (
                  <div>
                    <div className="flex items-center gap-2.5 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-[#A49050]/15 flex items-center justify-center">
                        <Award className="w-4 h-4 text-[#A49050]" />
                      </div>
                      <h4 className="text-sm font-semibold text-[#18253A]">Key Projects Supervised</h4>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {activeModalMember.keyProjects!.map((proj, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 bg-[#F1F3F5] rounded-xl p-3 border border-[#A49050]/15">
                          <CheckCircle2 className="w-4 h-4 text-[#D96B33] shrink-0 mt-0.5" />
                          <span className="text-sm text-[#18253A]">{proj}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Footer Buttons */}
              <div className="flex items-center justify-between gap-3 px-6 sm:px-8 py-5 border-t border-gray-100 bg-[#F1F3F5]/50 shrink-0">
                <a
                  href={`mailto:${activeModalMember.email}`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#D96B33] hover:bg-[#C25A28] text-white text-sm font-semibold rounded-full shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5 active:translate-y-0"
                >
                  <Mail className="w-4 h-4" />
                  <span>Contact</span>
                </a>
                <button
                  onClick={() => setActiveModalMember(null)}
                  className="px-5 py-2.5 text-sm font-medium text-[#18253A] hover:bg-gray-100 rounded-full transition-colors"
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
