import React from 'react';

/**
 * Bespoke, multi-tone SVG illustrated icons for the 10 Consultancy Services.
 * Optimized for compact UI displays (Mega Menu dropdowns, mobile navigation, cards).
 * Palette:
 * - Brand Accent: #D96B33 (Vibrant Terracotta / Orange)
 * - Gold / Sand: #A49050 / #D6C489
 * - Slate / White: #FFFFFF / #94A3B8 / #38BDF8
 */

export interface ServiceIconProps {
  className?: string;
}

// 1. Survey, Investigation & Geospatial Mapping
export const SurveyInvestigationIcon: React.FC<ServiceIconProps> = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Tripod Legs */}
    <path d="M12 9L7 21M12 9L17 21M12 9V20" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M9 16H15" stroke="#D6C489" strokeWidth="1.5" strokeLinecap="round" />
    {/* Theodolite Instrument Head */}
    <rect x="9.5" y="5.5" width="5" height="3.5" rx="1" fill="#D96B33" stroke="#FFFFFF" strokeWidth="1.2" />
    {/* Optical Sight / Scope */}
    <path d="M8 7H16" stroke="#D96B33" strokeWidth="1.75" strokeLinecap="round" />
    {/* GPS Satellite Beam Spark */}
    <circle cx="12" cy="3" r="1.25" fill="#D6C489" />
  </svg>
);

// 2. Feasibility Study
export const FeasibilityStudyIcon: React.FC<ServiceIconProps> = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Report Dossier */}
    <rect x="5" y="4" width="14" height="17" rx="2" stroke="#FFFFFF" strokeWidth="1.5" />
    <path d="M8.5 8H15.5M8.5 12H12.5" stroke="#D6C489" strokeWidth="1.5" strokeLinecap="round" />
    {/* Magnifying Glass Lens */}
    <circle cx="14.5" cy="14.5" r="3.5" fill="#1E3654" stroke="#D96B33" strokeWidth="1.5" />
    <path d="M17 17L20 20" stroke="#D96B33" strokeWidth="1.75" strokeLinecap="round" />
    {/* Viability Checkmark inside Lens */}
    <path d="M13 14.5L14.2 15.7L16.2 13.5" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// 3. Pre-Bid Engineering
export const PreBidEngineeringIcon: React.FC<ServiceIconProps> = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Blueprint Sheet */}
    <path d="M4 5C4 4.4 4.4 4 5 4H19C19.6 4 20 4.4 20 5V18C20 18.6 19.6 19 19 19H7C5.3 19 4 17.7 4 16V5Z" stroke="#FFFFFF" strokeWidth="1.5" />
    {/* Drafting Compass Caliper */}
    <path d="M12 7L9 15M12 7L15 15M10.5 12H13.5" stroke="#D96B33" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="12" cy="7" r="1.25" fill="#D6C489" />
    {/* Cost Tag Indicator */}
    <path d="M4 16C4 17.7 5.3 19 7 19H19" stroke="#D6C489" strokeWidth="1.5" />
  </svg>
);

// 4. Design
export const DesignIcon: React.FC<ServiceIconProps> = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Drafting Triangle / Ruler */}
    <path d="M4 20L20 20L4 4V20Z" stroke="#FFFFFF" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M8 17L14 17L8 11V17Z" stroke="#D6C489" strokeWidth="1.5" strokeLinejoin="round" />
    {/* Precision Stylus / Pen */}
    <path d="M14 6L18 10M17 3L21 7L13 15L9 16L10 12L17 3Z" fill="#D96B33" fillOpacity="0.3" stroke="#D96B33" strokeWidth="1.4" strokeLinejoin="round" />
  </svg>
);

// 5. Detailed Project Report (DPR)
export const DprPreparationIcon: React.FC<ServiceIconProps> = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Multi-layered Report Stack */}
    <path d="M7 4H19V18H7V4Z" stroke="#FFFFFF" strokeWidth="1.5" />
    <path d="M4 7H7V21H16" stroke="#D6C489" strokeWidth="1.5" strokeLinecap="round" />
    {/* Bar Chart inside DPR */}
    <path d="M10 14V15.5M13 11V15.5M16 8.5V15.5" stroke="#D96B33" strokeWidth="1.75" strokeLinecap="round" />
    {/* Bookmark / Ribbon */}
    <path d="M14 4V7L16 5.5L18 7V4" fill="#D96B33" stroke="#D96B33" strokeWidth="0.8" />
  </svg>
);

// 6. Transaction Advisory
export const TransactionAdvisoryIcon: React.FC<ServiceIconProps> = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Financial Growth Trajectory */}
    <path d="M4 19H20" stroke="#D6C489" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M5 15L10 10L14 13L19 7" stroke="#FFFFFF" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    {/* Target Growth Arrow */}
    <path d="M15 7H19V11" stroke="#D96B33" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    {/* PPP Investment Node */}
    <circle cx="10" cy="10" r="1.5" fill="#D96B33" />
    <circle cx="14" cy="13" r="1.5" fill="#D96B33" />
  </svg>
);

// 7. Risk Assurance
export const RiskAssuranceIcon: React.FC<ServiceIconProps> = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Shield Frame */}
    <path d="M12 3L4 6.5V11.5C4 16.5 7.4 20.7 12 22C16.6 20.7 20 16.5 20 11.5V6.5L12 3Z" stroke="#FFFFFF" strokeWidth="1.5" strokeLinejoin="round" />
    {/* Assurance Checkmark */}
    <path d="M8.5 12L11 14.5L15.5 9.5" stroke="#D96B33" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    {/* Core Guard Accent */}
    <circle cx="12" cy="12" r="6" stroke="#D6C489" strokeWidth="1" strokeDasharray="2 2" />
  </svg>
);

// 8. Project Management Consultancy (PMC)
export const PmcIcon: React.FC<ServiceIconProps> = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Engineer Safety Helmet */}
    <path d="M5 14C5 9.5 8 7 12 7C16 7 19 9.5 19 14H5Z" fill="#D96B33" fillOpacity="0.3" stroke="#D96B33" strokeWidth="1.5" />
    <path d="M3.5 14H20.5" stroke="#FFFFFF" strokeWidth="1.75" strokeLinecap="round" />
    {/* Hardhat Ridge */}
    <path d="M12 7V5M12 7V14" stroke="#D6C489" strokeWidth="1.5" strokeLinecap="round" />
    {/* Delivery Milestone Gantt Ticks */}
    <path d="M7 18H17M9 21H15" stroke="#D6C489" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

// 9. Supervision (Authority / Independent Engineer)
export const SupervisionIcon: React.FC<ServiceIconProps> = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Construction Crane Mast */}
    <path d="M7 21V5M7 5H19L21 8H7M7 8H19" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    {/* Crane Counterweight */}
    <rect x="4" y="5" width="3" height="3" fill="#D96B33" stroke="#D96B33" strokeWidth="1" />
    {/* Inspection Hoist Cable & Hook */}
    <path d="M15 8V14M15 14L13.5 15.5C13.5 16.3 14.2 17 15 17C15.8 17 16.5 16.3 16.5 15.5" stroke="#D96B33" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M4 21H10" stroke="#D6C489" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

// 10. O&M Services
export const OmServicesIcon: React.FC<ServiceIconProps> = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Circular Lifecycle Gear */}
    <circle cx="12" cy="12" r="3.5" stroke="#D6C489" strokeWidth="1.5" />
    {/* Maintenance Wrench Silhouette */}
    <path d="M19 5L15.5 8.5M19 5C19.8 4.2 21 4.2 21.8 5C22.6 5.8 22.6 7 21.8 7.8L19.5 10.1L16.7 7.3L19 5Z" fill="#D96B33" stroke="#D96B33" strokeWidth="1" />
    {/* Continuous Lifecycle Loop Arrows */}
    <path d="M12 4C7.6 4 4 7.6 4 12C4 14.2 4.9 16.2 6.3 17.7M12 20C16.4 20 20 16.4 20 12" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="3 2" />
    <path d="M5 19L6.5 17.5L5 16" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/**
 * Helper to get the bespoke SVG icon for any service by slug or ID
 */
export const getServiceIcon = (slugOrId: string, className = "w-4 h-4"): React.ReactElement => {
  switch (slugOrId) {
    case 'survey-investigation-testing':
      return <SurveyInvestigationIcon className={className} />;
    case 'feasibility-studies':
      return <FeasibilityStudyIcon className={className} />;
    case 'pre-bid-engineering':
      return <PreBidEngineeringIcon className={className} />;
    case 'design':
      return <DesignIcon className={className} />;
    case 'dpr-preparation':
      return <DprPreparationIcon className={className} />;
    case 'transaction-advisory-financial':
      return <TransactionAdvisoryIcon className={className} />;
    case 'assurance-services':
      return <RiskAssuranceIcon className={className} />;
    case 'pmc':
      return <PmcIcon className={className} />;
    case 'authority-independent-engineer':
      return <SupervisionIcon className={className} />;
    case 'om-services':
      return <OmServicesIcon className={className} />;
    default:
      return <PreBidEngineeringIcon className={className} />;
  }
};
