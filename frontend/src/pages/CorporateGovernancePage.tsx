import React, { useEffect, useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FileText, ArrowRight, Eye, ChevronLeft, ChevronRight, UserMinus, LogOut } from 'lucide-react';
import { CORPORATE_GOVERNANCE, type AnnualReturnFiling } from '../data/corporateGovernance';
import { PageHeroBanner } from '../components/PageHeroBanner';
import { PdfViewerModal } from '../components/PdfViewerModal';
import { revealSectionOnScroll } from '../lib/revealOnScroll';

/** Annual Return filings shown per page in the paginated list. */
const RETURNS_PER_PAGE = 5;

/** Initials from a full name, ignoring the honorific (Mr./Mrs./Ms./Dr.). */
const initialsOf = (full: string): string => {
  const parts = full.replace(/^(Mr|Mrs|Ms|Dr)\.?\s+/i, '').trim().split(/\s+/);
  const first = parts[0]?.[0] ?? '';
  const last = parts.length > 1 ? parts[parts.length - 1][0] : '';
  return (first + last).toUpperCase();
};

const isLeadRole = (role: string): boolean => /chair|presiding/i.test(role);

export const CorporateGovernancePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const item = CORPORATE_GOVERNANCE.find((c) => c.slug === slug);

  const sectionRef = useRef<HTMLElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<HTMLDivElement | null>(null);
  const stackRef = useRef<HTMLDivElement | null>(null);

  // Annual Return: paginated, view-only list.
  const [returnsPage, setReturnsPage] = useState(0);
  const [activeReturn, setActiveReturn] = useState<AnnualReturnFiling | null>(null);

  // Reset transient state when navigating between governance pages.
  useEffect(() => {
    setReturnsPage(0);
    setActiveReturn(null);
  }, [slug]);

  // Scroll-triggered reveal. Keyed off the heading block's own position so it
  // fades/rises in as it reaches the viewport — the content below (committee
  // stack, annual-return list, policy cards) sits directly beneath it and
  // follows via its own animation delays. The content refs are passed as a
  // fallback for deep-link scrolls that skip past the heading.
  useEffect(() => {
    return revealSectionOnScroll(
      sectionRef.current,
      [headerRef.current, stackRef.current, cardsRef.current],
      { threshold: 0.4, onReveal: () => stackRef.current?.classList.add('is-visible') },
    );
  }, [slug]);

  // Governance timelines (director resignations, general-meeting notices):
  // reveal each year block on its own as it scrolls into view, so the list
  // builds up one-by-one rather than all at once with the section. Rows
  // within a year then stagger via their --j index (CSS). No-op under
  // prefers-reduced-motion: the hidden state only exists inside that media
  // query, so blocks are already visible.
  useEffect(() => {
    const root = sectionRef.current;
    if (!root || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const blocks = root.querySelectorAll<HTMLElement>('.gov-timeline-year');
    if (blocks.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2, rootMargin: '0px 0px -12% 0px' },
    );

    blocks.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [slug]);

  if (!item) {
    return (
      <div className="min-h-screen bg-[#F1F3F5] pt-32 pb-20 text-center">
        <h2 className="text-3xl font-serif text-[#18253A]">Page Not Found</h2>
        <p className="text-sm text-[#18253A]/70 mt-2">The requested corporate governance page could not be located.</p>
        <Link
          to="/"
          className="mt-6 inline-block bg-[#18253A] hover:bg-[#3E4C60] text-white px-6 py-3 text-xs font-mono font-bold tracking-widest uppercase shadow-md hover:shadow-lg transition-all duration-300 rounded-md"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  const documents = item.documents ?? [];
  const committees = item.committees ?? [];
  const annualReturns = item.annualReturns ?? [];
  const directorResignations = item.directorResignations ?? [];
  const generalMeetings = item.generalMeetings ?? [];

  const returnsPageCount = Math.max(1, Math.ceil(annualReturns.length / RETURNS_PER_PAGE));
  const currentReturnsPage = Math.min(returnsPage, returnsPageCount - 1);
  const returnsStart = currentReturnsPage * RETURNS_PER_PAGE;
  const visibleReturns = annualReturns.slice(returnsStart, returnsStart + RETURNS_PER_PAGE);

  return (
    <div className="about-dropdown-page flex flex-col min-h-screen bg-[#F1F3F5] pt-24">
      <PageHeroBanner
        line1="CORPORATE GOVERNANCE."
        line2={item.heroLine}
        description="Statutory disclosures and corporate governance records of Almondz Global Infra-Consultant Limited."
      />

      <section ref={sectionRef} className="about-subnav-section py-20 bg-[#F1F3F5]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={headerRef} className="about-subnav-header text-center mb-14">
            <span className="text-xs font-mono tracking-widest text-[#A49050] uppercase">{item.eyebrow}</span>
            <h2 className="text-3xl font-serif font-bold text-[#18253A] mt-1">{item.navLabel}</h2>
            {item.intro && (
              <p className="text-sm text-[#18253A]/70 leading-relaxed max-w-3xl mx-auto mt-4">{item.intro}</p>
            )}
          </div>

          {/* --- Composition of Committees --- */}
          {committees.length > 0 && (
            <div ref={stackRef} className="committee-stack flex flex-col gap-8">
              {committees.map((committee, i) => (
                <article
                  key={committee.name}
                  style={{ ['--i' as string]: i }}
                  className="committee-card bg-white border border-[#A49050]/20 rounded-2xl shadow-[0_2px_14px_rgba(24,37,58,0.06)] overflow-hidden"
                >
                  <header className="flex items-center gap-4 px-6 sm:px-8 py-5 bg-[#18253A]">
                    <span className="text-[11px] font-mono font-bold tracking-[0.25em] text-[#D6C489]">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="h-4 w-px bg-white/20" />
                    <h3 className="text-base sm:text-lg font-serif font-bold text-white leading-tight">
                      {committee.name}
                    </h3>
                    <span className="ml-auto shrink-0 text-[10px] font-mono tracking-widest text-white/45 uppercase">
                      {committee.members.length} {committee.members.length === 1 ? 'Member' : 'Members'}
                    </span>
                  </header>

                  <ul className="divide-y divide-[#A49050]/15">
                    {committee.members.map((member) => {
                      const lead = isLeadRole(member.role);
                      return (
                        <li
                          key={`${member.name}-${member.role}`}
                          className="flex items-center gap-4 px-6 sm:px-8 py-4 hover:bg-[#F1F3F5]/70 transition-colors"
                        >
                          <span
                            className={`w-9 h-9 rounded-full flex items-center justify-center text-[11px] font-bold tracking-wide shrink-0 ${
                              lead
                                ? 'bg-[#18253A] text-[#D6C489] border border-[#18253A]'
                                : 'bg-[#F1F3F5] text-[#18253A] border border-[#A49050]/25'
                            }`}
                            aria-hidden="true"
                          >
                            {initialsOf(member.name)}
                          </span>
                          <span className="min-w-0 flex-1 text-sm sm:text-[15px] font-medium text-[#18253A]">
                            {member.name}
                          </span>
                          <span
                            className={`shrink-0 text-right text-[11px] sm:text-xs font-mono tracking-wide ${
                              lead ? 'text-[#D96B33] font-bold uppercase' : 'text-[#18253A]/55'
                            }`}
                          >
                            {member.role}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </article>
              ))}
            </div>
          )}

          {/* --- Annual Return filings (paginated, view-only) --- */}
          {annualReturns.length > 0 && (
            <div ref={cardsRef} className="annual-return-list">
              <div className="flex items-baseline justify-between gap-4 mb-5">
                <span className="text-[11px] font-mono uppercase tracking-[0.22em] text-[#18253A]/45">
                  {annualReturns.length} Filings
                </span>
                <span className="text-[11px] font-mono uppercase tracking-[0.22em] text-[#18253A]/45">
                  {returnsStart + 1}&ndash;{returnsStart + visibleReturns.length} of {annualReturns.length}
                </span>
              </div>

              <ul className="flex flex-col gap-4">
                {visibleReturns.map((filing, i) => (
                  <li
                    key={filing.file}
                    style={{ ['--i' as string]: i }}
                    className="annual-return-row group flex items-center gap-4 sm:gap-6 bg-white border border-[#A49050]/20 rounded-xl px-4 sm:px-7 py-4 sm:py-5 shadow-[0_2px_14px_rgba(24,37,58,0.06)] hover:shadow-xl hover:border-[#D96B33]/50 hover:-translate-y-0.5 transition-all duration-300"
                  >
                    <span className="shrink-0 w-11 h-11 rounded-lg bg-[#F1F3F5] border border-[#A49050]/20 flex items-center justify-center text-[#18253A] group-hover:text-[#D96B33] group-hover:border-[#D96B33]/40 transition-colors">
                      <FileText className="w-5 h-5" />
                    </span>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-3 flex-wrap">
                        <h3 className="text-lg sm:text-xl font-serif font-bold text-[#18253A] leading-tight">
                          {filing.period}
                        </h3>
                        <span className="text-[10px] font-mono font-bold tracking-[0.18em] uppercase text-[#A49050] bg-[#A49050]/10 border border-[#A49050]/25 rounded-full px-2.5 py-1">
                          Form {filing.form}
                        </span>
                      </div>
                      <p className="text-[11px] sm:text-xs text-[#18253A]/55 mt-1 font-mono uppercase tracking-wide">
                        Registrar of Companies Filing
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setActiveReturn(filing)}
                      className="shrink-0 inline-flex items-center gap-2 bg-[#18253A] hover:bg-[#D96B33] text-white px-4 sm:px-6 py-3 text-[11px] font-mono font-bold tracking-widest uppercase rounded-md shadow-md hover:shadow-lg transition-all duration-300"
                      aria-label={`View Annual Return ${filing.period} (Form ${filing.form})`}
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View</span>
                    </button>
                  </li>
                ))}
              </ul>

              {returnsPageCount > 1 && (
                <nav className="flex items-center justify-center gap-2 mt-10" aria-label="Annual Return pages">
                  <button
                    type="button"
                    onClick={() => setReturnsPage((p) => Math.max(0, p - 1))}
                    disabled={currentReturnsPage === 0}
                    className="w-9 h-9 rounded-md border border-[#A49050]/25 bg-white flex items-center justify-center text-[#18253A]/70 hover:border-[#D96B33]/50 hover:text-[#D96B33] disabled:opacity-40 disabled:pointer-events-none transition-colors"
                    aria-label="Previous page"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  {Array.from({ length: returnsPageCount }).map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setReturnsPage(i)}
                      aria-current={i === currentReturnsPage ? 'page' : undefined}
                      className={`w-9 h-9 rounded-md text-xs font-mono font-bold transition-colors ${
                        i === currentReturnsPage
                          ? 'bg-[#18253A] text-white shadow-md'
                          : 'bg-white border border-[#A49050]/25 text-[#18253A]/70 hover:border-[#D96B33]/50 hover:text-[#D96B33]'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}

                  <button
                    type="button"
                    onClick={() => setReturnsPage((p) => Math.min(returnsPageCount - 1, p + 1))}
                    disabled={currentReturnsPage === returnsPageCount - 1}
                    className="w-9 h-9 rounded-md border border-[#A49050]/25 bg-white flex items-center justify-center text-[#18253A]/70 hover:border-[#D96B33]/50 hover:text-[#D96B33] disabled:opacity-40 disabled:pointer-events-none transition-colors"
                    aria-label="Next page"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </nav>
              )}
            </div>
          )}

          {/* --- Resignation of Director — editorial timeline --- */}
          {directorResignations.length > 0 && (
            <div ref={cardsRef} className="director-resignations">
              <div className="flex items-center gap-4 mb-12">
                <span className="shrink-0 w-11 h-11 rounded-xl bg-[#18253A] flex items-center justify-center text-[#D6C489]">
                  <UserMinus className="w-5 h-5" />
                </span>
                <div>
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#18253A] leading-tight">
                    Resignation of Director
                  </h3>
                  <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-[#18253A]/45 mt-1">
                    {directorResignations.length} Financial{' '}
                    {directorResignations.length === 1 ? 'Year' : 'Years'} on Record
                  </p>
                </div>
              </div>

              <div className="relative">
                {/* vertical rail */}
                <span
                  aria-hidden="true"
                  className="absolute left-[9px] top-2 bottom-2 w-px bg-gradient-to-b from-[#A49050]/60 via-[#A49050]/25 to-transparent"
                />

                <div className="flex flex-col gap-12">
                  {directorResignations.map((year) => (
                    <div key={year.period} className="gov-timeline-year relative pl-10 sm:pl-14">
                      {/* timeline node */}
                      <span
                        aria-hidden="true"
                        className="absolute left-[3px] top-1 w-3.5 h-3.5 rounded-full bg-[#18253A] ring-4 ring-[#F1F3F5] shadow-[0_0_0_1px_rgba(164,144,80,0.5)]"
                      />

                      {/* year heading */}
                      <div className="flex items-baseline justify-between gap-4 border-b border-[#A49050]/25 pb-3 mb-3">
                        <h4 className="text-2xl sm:text-[30px] font-serif font-bold text-[#18253A] leading-none">
                          {year.period}
                        </h4>
                        <span className="shrink-0 text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.22em] text-[#A49050]">
                          {year.directors.length}{' '}
                          {year.directors.length === 1 ? 'Director' : 'Directors'}
                        </span>
                      </div>

                      {/* directors */}
                      <ul className="flex flex-col">
                        {year.directors.map((name, j) => (
                          <li
                            key={name}
                            style={{ ['--j' as string]: j }}
                            className="gov-timeline-row group/row flex items-center gap-4 sm:gap-6 py-3.5 border-b border-[#A49050]/15 last:border-b-0"
                          >
                            <span className="shrink-0 w-6 text-[11px] font-mono font-bold tracking-wider text-[#A49050]/70 tabular-nums">
                              {String(j + 1).padStart(2, '0')}
                            </span>
                            <span
                              className="shrink-0 w-9 h-9 rounded-full border border-[#A49050]/30 bg-white flex items-center justify-center text-[11px] font-bold text-[#18253A] group-hover/row:border-[#D96B33]/45 group-hover/row:text-[#D96B33] transition-colors"
                              aria-hidden="true"
                            >
                              {initialsOf(name)}
                            </span>
                            <span className="min-w-0 flex-1 text-[15px] sm:text-base font-serif text-[#18253A]">
                              {name}
                            </span>
                            <span className="shrink-0 inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-[0.18em] text-[#18253A]/40">
                              <LogOut className="w-3 h-3" aria-hidden="true" />
                              Resigned
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* --- General Meeting Notices — editorial timeline, by category --- */}
          {generalMeetings.length > 0 && (
            <div ref={cardsRef} className="general-meetings flex flex-col gap-20">
              {generalMeetings.map((group) => (
                <div key={group.category} className="gm-category">
                  <div className="flex items-center gap-4 mb-12">
                    <span className="shrink-0 w-11 h-11 rounded-xl bg-[#18253A] flex items-center justify-center text-[11px] font-mono font-bold tracking-[0.15em] text-[#D6C489]">
                      {group.abbr}
                    </span>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#18253A] leading-tight">
                        {group.category}
                      </h3>
                      <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-[#18253A]/45 mt-1">
                        {group.years.length} Financial{' '}
                        {group.years.length === 1 ? 'Year' : 'Years'} on Record
                      </p>
                    </div>
                  </div>

                  <div className="relative">
                    {/* vertical rail */}
                    <span
                      aria-hidden="true"
                      className="absolute left-[9px] top-2 bottom-2 w-px bg-gradient-to-b from-[#A49050]/60 via-[#A49050]/25 to-transparent"
                    />

                    <div className="flex flex-col gap-12">
                      {group.years.map((year) => (
                        <div key={year.period} className="gov-timeline-year relative pl-10 sm:pl-14">
                          {/* timeline node */}
                          <span
                            aria-hidden="true"
                            className="absolute left-[3px] top-1 w-3.5 h-3.5 rounded-full bg-[#18253A] ring-4 ring-[#F1F3F5] shadow-[0_0_0_1px_rgba(164,144,80,0.5)]"
                          />

                          {/* year heading */}
                          <div className="flex items-baseline justify-between gap-4 border-b border-[#A49050]/25 pb-3 mb-3">
                            <h4 className="text-2xl sm:text-[30px] font-serif font-bold text-[#18253A] leading-none">
                              {year.period}
                            </h4>
                            <span className="shrink-0 text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.22em] text-[#A49050]">
                              {year.notices.length} {year.notices.length === 1 ? 'Notice' : 'Notices'}
                            </span>
                          </div>

                          {/* notices */}
                          <ul className="flex flex-col">
                            {year.notices.map((notice, j) => (
                              <li
                                key={notice.label}
                                style={{ ['--j' as string]: j }}
                                className="gov-timeline-row group/row flex items-center gap-4 sm:gap-6 py-3.5 border-b border-[#A49050]/15 last:border-b-0"
                              >
                                <span className="shrink-0 w-6 text-[11px] font-mono font-bold tracking-wider text-[#A49050]/70 tabular-nums">
                                  {String(j + 1).padStart(2, '0')}
                                </span>
                                <span
                                  className="shrink-0 w-9 h-9 rounded-full border border-[#A49050]/30 bg-white flex items-center justify-center text-[#18253A] group-hover/row:border-[#D96B33]/45 group-hover/row:text-[#D96B33] transition-colors"
                                  aria-hidden="true"
                                >
                                  <FileText className="w-4 h-4" />
                                </span>
                                <span className="min-w-0 flex-1 text-[15px] sm:text-base font-serif text-[#18253A]">
                                  {notice.label}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* --- Policy documents --- */}
          {documents.length > 0 && (
            <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {documents.map((doc) => (
                <div
                  key={doc.file}
                  className="about-subnav-card bg-white rounded-2xl border border-[#A49050]/20 shadow-sm hover:shadow-xl hover:border-[#D96B33]/50 hover:-translate-y-2 hover:scale-[1.03] transition-all duration-300 p-8 flex flex-col justify-between group"
                >
                  <div className="flex flex-col gap-4">
                    <div className="w-14 h-14 rounded-full bg-[#F1F3F5] border border-[#A49050]/20 flex items-center justify-center text-[#18253A] group-hover:text-[#D96B33] group-hover:border-[#D96B33]/40 transition-colors">
                      <FileText className="w-6 h-6" />
                    </div>
                    <div className="border-t border-[#A49050]/15" />
                    <h3 className="text-xl font-serif font-bold text-[#18253A]">{doc.title}</h3>
                    <p className="text-xs text-[#18253A]/70 leading-relaxed">{doc.summary}</p>
                  </div>

                  <div className="pt-6 mt-6 border-t border-gray-100">
                    <a
                      href={doc.file}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-[#18253A] hover:bg-[#D96B33] text-white py-3.5 text-xs font-mono font-bold tracking-widest uppercase transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2 rounded-md"
                    >
                      <span>View Policy</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* --- Not yet populated --- */}
          {documents.length === 0 &&
            committees.length === 0 &&
            annualReturns.length === 0 &&
            directorResignations.length === 0 &&
            generalMeetings.length === 0 && (
              <p className="text-center text-sm text-[#18253A]/70 leading-relaxed">
                Content for this page is being added.
              </p>
            )}
        </div>
      </section>

      <PdfViewerModal
        isOpen={activeReturn !== null}
        onClose={() => setActiveReturn(null)}
        file={activeReturn?.file ?? ''}
        title={activeReturn?.period ?? ''}
        subtitle={activeReturn ? `Form ${activeReturn.form}` : undefined}
      />
    </div>
  );
};
