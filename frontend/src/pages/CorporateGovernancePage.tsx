import React, { useEffect, useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FileText, ArrowRight, Eye, ChevronLeft, ChevronRight, UserMinus, LogOut } from 'lucide-react';
import { CORPORATE_GOVERNANCE, type AnnualReturnFiling } from '../data/corporateGovernance';
import { PageHeroBanner } from '../components/PageHeroBanner';
import corporateGovernanceHero from '../images/hero/corporate-governance.jpg';
import { PdfViewerModal } from '../components/PdfViewerModal';
import { CommitteeComposition } from '../components/CommitteeComposition';
import { AnnualReturnSection } from '../components/AnnualReturnSection';
import { DirectorResignationsSection } from '../components/DirectorResignationsSection';
import { GeneralMeetingNoticesSection } from '../components/GeneralMeetingNoticesSection';
import { PolicyDocumentsSection } from '../components/PolicyDocumentsSection';
import { revealSectionOnScroll } from '../lib/revealOnScroll';

/** Annual Return filings shown per page in the paginated list. */
const RETURNS_PER_PAGE = 5;

export const CorporateGovernancePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const item = CORPORATE_GOVERNANCE.find((c) => c.slug === slug);

  const sectionRef = useRef<HTMLElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  const [activePdf, setActivePdf] = useState<{
    file: string;
    title: string;
    subtitle?: string;
    kicker?: string;
  } | null>(null);

  // Reset transient state when navigating between governance pages.
  useEffect(() => {
    setActivePdf(null);
  }, [slug]);

  // Scroll-triggered reveal
  useEffect(() => {
    return revealSectionOnScroll(
      sectionRef.current,
      [headerRef.current, contentRef.current],
      { threshold: 0.2 },
    );
  }, [slug]);

  if (!item) {
    return (
      <div className="min-h-screen bg-[#F1F3F5] pt-32 pb-20 text-center">
        <h2 className="text-3xl font-serif text-[#2B4A6D]">Page Not Found</h2>
        <p className="text-sm text-[#2B4A6D]/70 mt-2">The requested corporate governance page could not be located.</p>
        <Link
          to="/"
          className="mt-6 inline-block bg-[#2B4A6D] hover:bg-[#3E4C60] text-white px-6 py-3 text-xs font-mono font-bold tracking-widest uppercase shadow-md hover:shadow-lg transition-all duration-300 rounded-md"
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

  return (
    <div className="about-dropdown-page flex flex-col min-h-screen bg-[#F1F3F5] pt-24">
      <PageHeroBanner
        line1="CORPORATE GOVERNANCE."
        line2={item.heroLine}
        description="Statutory disclosures and corporate governance records of Almondz Global Infra-Consultant Limited."
        backgroundImage={corporateGovernanceHero}
      />

      <section ref={sectionRef} className="about-subnav-section py-10 sm:py-16 lg:py-20 bg-[#F1F3F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={headerRef} className="about-subnav-header text-center mb-8 sm:mb-12 lg:mb-14">
            <span className="text-xs font-mono tracking-widest text-[#A49050] uppercase">{item.eyebrow}</span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#2B4A6D] mt-1">{item.navLabel}</h2>
            {item.intro && (
              <p className="text-xs sm:text-sm text-[#2B4A6D]/70 leading-relaxed max-w-3xl mx-auto mt-3 sm:mt-4">{item.intro}</p>
            )}
          </div>

          <div ref={contentRef} className="w-full">
            {/* --- Composition of Committees --- */}
            {committees.length > 0 && (
              <CommitteeComposition committees={committees} />
            )}

            {/* --- Annual Return filings --- */}
            {annualReturns.length > 0 && (
              <AnnualReturnSection
                annualReturns={annualReturns}
                onSelectFiling={(filing) =>
                  setActivePdf({
                    file: filing.file,
                    title: filing.period,
                    subtitle: `Form ${filing.form}`,
                    kicker: 'Annual Return',
                  })
                }
              />
            )}

            {/* --- Resignation of Director --- */}
            {directorResignations.length > 0 && (
              <DirectorResignationsSection directorResignations={directorResignations} />
            )}

            {/* --- General Meeting Notices --- */}
            {generalMeetings.length > 0 && (
              <GeneralMeetingNoticesSection
                generalMeetings={generalMeetings}
                onSelectNotice={(file, title, category) =>
                  setActivePdf({
                    file,
                    title,
                    subtitle: category,
                    kicker: 'Meeting Notice',
                  })
                }
              />
            )}

            {/* --- Policy Documents --- */}
            {documents.length > 0 && (
              <PolicyDocumentsSection
                documents={documents}
                onSelectPolicy={(file, title) =>
                  setActivePdf({
                    file,
                    title,
                    subtitle: 'Board Policy Document',
                    kicker: 'Policy',
                  })
                }
              />
            )}

            {/* --- Empty State --- */}
            {documents.length === 0 &&
              committees.length === 0 &&
              annualReturns.length === 0 &&
              directorResignations.length === 0 &&
              generalMeetings.length === 0 && (
                <p className="text-center text-sm text-[#2B4A6D]/70 leading-relaxed">
                  Content for this page is being added.
                </p>
              )}
          </div>
        </div>
      </section>

      {/* Universal Document Reader Modal */}
      {activePdf && (
        <PdfViewerModal
          isOpen={true}
          onClose={() => setActivePdf(null)}
          file={activePdf.file}
          title={activePdf.title}
          subtitle={activePdf.subtitle}
          kicker={activePdf.kicker}
        />
      )}
    </div>
  );
};
