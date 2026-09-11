import React from 'react';

/**
 * Bespoke, multi-tone SVG illustrated icons for the 6 Infrastructure Lifecycle Stages.
 * Designed with Almondz corporate color palette:
 * - Corporate Navy: #2B4A6D / #101A29
 * - Vibrant Orange Accent: #D96B33 / #E87A3E
 * - Gold / Bronze: #D6C489 / #A49050
 * - Soft Tones: #F1F3F5 / #E2E8F0
 */

// 01. Concept & Planning (Architectural drafting, master-planning compass & blueprint vision)
export const PlanningSvg: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="plan-grad-navy" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
        <stop stopColor="#2B4A6D" />
        <stop offset="1" stopColor="#172B44" />
      </linearGradient>
      <linearGradient id="plan-grad-orange" x1="12" y1="6" x2="36" y2="42" gradientUnits="userSpaceOnUse">
        <stop stopColor="#E87A3E" />
        <stop offset="1" stopColor="#D96B33" />
      </linearGradient>
      <linearGradient id="plan-grad-gold" x1="0" y1="0" x2="48" y2="0" gradientUnits="userSpaceOnUse">
        <stop stopColor="#D6C489" />
        <stop offset="1" stopColor="#A49050" />
      </linearGradient>
    </defs>
    
    {/* Blueprint Base Grid */}
    <rect x="4" y="6" width="40" height="36" rx="6" fill="#F0F4F8" stroke="#2B4A6D" strokeWidth="1.5" strokeOpacity="0.2" />
    <path d="M12 6v36M24 6v36M36 6v36" stroke="#2B4A6D" strokeWidth="1" strokeOpacity="0.1" strokeDasharray="2 2" />
    <path d="M4 15h40M4 24h40M4 33h40" stroke="#2B4A6D" strokeWidth="1" strokeOpacity="0.1" strokeDasharray="2 2" />
    
    {/* Master-Planning Radial Arc */}
    <path d="M14 36 A18 18 0 0 1 34 16" stroke="url(#plan-grad-orange)" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="3 3" />
    <circle cx="24" cy="24" r="16" stroke="#2B4A6D" strokeWidth="1.5" strokeOpacity="0.35" />

    {/* Drafting Compass Caliper Legs */}
    <path d="M24 8 L14 38" stroke="url(#plan-grad-navy)" strokeWidth="3" strokeLinecap="round" />
    <path d="M24 8 L34 38" stroke="url(#plan-grad-navy)" strokeWidth="3" strokeLinecap="round" />
    
    {/* Horizontal Compass Adjustment Spindle */}
    <path d="M17 26h14" stroke="url(#plan-grad-gold)" strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="24" cy="26" r="2.5" fill="#D6C489" stroke="#2B4A6D" strokeWidth="1" />

    {/* Top Compass Hinge Head */}
    <circle cx="24" cy="8" r="4.5" fill="url(#plan-grad-orange)" stroke="#2B4A6D" strokeWidth="1.5" />
    <circle cx="24" cy="8" r="1.75" fill="#FFFFFF" />

    {/* Target Vision Point at Bottom Right */}
    <circle cx="34" cy="38" r="3.5" fill="#D96B33" fillOpacity="0.2" />
    <circle cx="34" cy="38" r="1.5" fill="#D96B33" />
    <circle cx="14" cy="38" r="1.5" fill="#2B4A6D" />
  </svg>
);

// 02. Feasibility Studies (Techno-economic assessment dossier, diagnostic lens & validation check)
export const FeasibilitySvg: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="feas-grad-doc" x1="0" y1="0" x2="36" y2="44" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FFFFFF" />
        <stop offset="1" stopColor="#F1F4F8" />
      </linearGradient>
      <linearGradient id="feas-grad-lens" x1="20" y1="18" x2="42" y2="40" gradientUnits="userSpaceOnUse">
        <stop stopColor="#E87A3E" />
        <stop offset="1" stopColor="#C25A28" />
      </linearGradient>
      <linearGradient id="feas-grad-navy" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
        <stop stopColor="#2B4A6D" />
        <stop offset="1" stopColor="#172B44" />
      </linearGradient>
    </defs>

    {/* Analytical Document Sheet */}
    <rect x="6" y="5" width="28" height="38" rx="4" fill="url(#feas-grad-doc)" stroke="#2B4A6D" strokeWidth="2" />
    
    {/* Folded Corner */}
    <path d="M26 5v6a2 2 0 0 0 2 2h6" fill="#D6C489" fillOpacity="0.4" stroke="#2B4A6D" strokeWidth="1.5" />
    
    {/* Report Header & Data Rows */}
    <rect x="11" y="11" width="10" height="3" rx="1.5" fill="#2B4A6D" />
    <path d="M11 18h16M11 23h12M11 28h8" stroke="#2B4A6D" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.4" />

    {/* Mini Chart Bars inside Report */}
    <rect x="11" y="33" width="3" height="5" rx="1" fill="#D6C489" />
    <rect x="16" y="30" width="3" height="8" rx="1" fill="#2B4A6D" />
    <rect x="21" y="27" width="3" height="11" rx="1" fill="#D96B33" />

    {/* Feasibility Magnifying Inspection Glass */}
    <circle cx="31" cy="27" r="10.5" fill="#FFFFFF" fillOpacity="0.9" stroke="url(#feas-grad-lens)" strokeWidth="3" />
    <circle cx="31" cy="27" r="7.5" fill="#D96B33" fillOpacity="0.12" />
    
    {/* Validated Checkmark inside Lens */}
    <path d="M27.5 27.5l2.5 2.5 5-5.5" stroke="#D96B33" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

    {/* Magnifier Handle */}
    <path d="M38.5 34.5L44 40" stroke="url(#feas-grad-navy)" strokeWidth="4" strokeLinecap="round" />
    <path d="M38.5 34.5L44 40" stroke="url(#feas-grad-lens)" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

// 03. Detailed Engineering (Structural truss geometry, precision CAD gear & blueprint calipers)
export const EngineeringSvg: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="eng-grad-orange" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
        <stop stopColor="#E87A3E" />
        <stop offset="1" stopColor="#D96B33" />
      </linearGradient>
      <linearGradient id="eng-grad-navy" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
        <stop stopColor="#2B4A6D" />
        <stop offset="1" stopColor="#172B44" />
      </linearGradient>
      <linearGradient id="eng-grad-gold" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
        <stop stopColor="#D6C489" />
        <stop offset="1" stopColor="#A49050" />
      </linearGradient>
    </defs>

    {/* Structural Engineering Foundation Grid / Truss Base */}
    <path d="M4 39h40" stroke="#2B4A6D" strokeWidth="2.5" strokeLinecap="round" />
    
    {/* Precision Engineering Gear in Upper Right */}
    <g transform="translate(29, 9)">
      <circle cx="8" cy="8" r="6" fill="#F0F4F8" stroke="#2B4A6D" strokeWidth="2" />
      <circle cx="8" cy="8" r="2.5" fill="url(#eng-grad-orange)" />
      {/* Gear Teeth */}
      <path d="M8 0v3M8 13v3M0 8h3M13 8h3M2.5 2.5l2 2M11.5 11.5l2 2M13.5 2.5l-2 2M4.5 11.5l-2 2" stroke="#2B4A6D" strokeWidth="2" strokeLinecap="round" />
    </g>

    {/* Structural Bridge Truss Triangulation */}
    <path d="M6 39L16 19l10 20M16 19l10-10 10 30" stroke="url(#eng-grad-navy)" strokeWidth="2.25" strokeLinejoin="round" />
    <path d="M6 39h20M16 19h14" stroke="url(#eng-grad-gold)" strokeWidth="2" strokeDasharray="3 3" />

    {/* Precision CAD Caliper & Node Markers */}
    <circle cx="16" cy="19" r="3.5" fill="#D96B33" stroke="#FFFFFF" strokeWidth="1.5" />
    <circle cx="26" cy="9" r="3" fill="#D6C489" stroke="#2B4A6D" strokeWidth="1" />
    <circle cx="26" cy="39" r="2.5" fill="#2B4A6D" />
    <circle cx="36" cy="39" r="2.5" fill="#2B4A6D" />
    <circle cx="6" cy="39" r="2.5" fill="#2B4A6D" />
    
    {/* Measurement Dimension Lines */}
    <path d="M12 28h8" stroke="#D96B33" strokeWidth="1.75" strokeLinecap="round" />
  </svg>
);

// 04. Financial Advisory (Ascending capital pillars, investment trajectory curve & gold asset badge)
export const FinanceSvg: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="fin-grad-orange" x1="0" y1="0" x2="0" y2="48" gradientUnits="userSpaceOnUse">
        <stop stopColor="#E87A3E" />
        <stop offset="1" stopColor="#D96B33" />
      </linearGradient>
      <linearGradient id="fin-grad-navy" x1="0" y1="0" x2="0" y2="48" gradientUnits="userSpaceOnUse">
        <stop stopColor="#3A6394" />
        <stop offset="1" stopColor="#2B4A6D" />
      </linearGradient>
      <linearGradient id="fin-grad-gold" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
        <stop stopColor="#F5E4A8" />
        <stop offset="1" stopColor="#D6C489" />
      </linearGradient>
    </defs>

    {/* Base Horizon Line */}
    <path d="M4 41h40" stroke="#2B4A6D" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
    
    {/* Bar 1: Foundation Capital */}
    <rect x="6" y="27" width="7" height="14" rx="2" fill="url(#fin-grad-navy)" />
    <rect x="6" y="27" width="7" height="3" rx="1" fill="#D6C489" />

    {/* Bar 2: Growth Allocation */}
    <rect x="16" y="19" width="7" height="22" rx="2" fill="url(#fin-grad-navy)" />
    <rect x="16" y="19" width="7" height="3" rx="1" fill="#D6C489" />

    {/* Bar 3: Peak Transaction Portfolio */}
    <rect x="26" y="11" width="7" height="30" rx="2" fill="url(#fin-grad-orange)" />
    <rect x="26" y="11" width="7" height="3" rx="1" fill="#FFC299" />

    {/* Upward Growth Arrow Trajectory */}
    <path d="M7 25C13 21 21 16 35 7" stroke="#D96B33" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="3 3" />
    <path d="M29 6h7v7" stroke="#D96B33" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

    {/* Gold Sovereign Coin / Asset Node in Top Right */}
    <g transform="translate(32, 17)">
      <circle cx="8" cy="8" r="7.5" fill="url(#fin-grad-gold)" stroke="#A49050" strokeWidth="1.5" />
      <circle cx="8" cy="8" r="5" stroke="#A49050" strokeWidth="1" strokeDasharray="2 2" />
      <path d="M8 5v6M6 6.5h3.5a1.5 1.5 0 0 1 0 3H6" stroke="#2B4A6D" strokeWidth="1.5" strokeLinecap="round" />
    </g>
  </svg>
);

// 05. Project Management (Modern construction tower crane, architectural superstructure & site execution)
export const ManagementSvg: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="mgmt-grad-tower" x1="0" y1="0" x2="30" y2="48" gradientUnits="userSpaceOnUse">
        <stop stopColor="#2B4A6D" />
        <stop offset="1" stopColor="#15263B" />
      </linearGradient>
      <linearGradient id="mgmt-grad-crane" x1="0" y1="0" x2="48" y2="0" gradientUnits="userSpaceOnUse">
        <stop stopColor="#E87A3E" />
        <stop offset="1" stopColor="#D96B33" />
      </linearGradient>
      <linearGradient id="mgmt-grad-gold" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
        <stop stopColor="#D6C489" />
        <stop offset="1" stopColor="#A49050" />
      </linearGradient>
    </defs>

    {/* Ground Plane */}
    <path d="M4 42h40" stroke="#2B4A6D" strokeWidth="2" strokeLinecap="round" />

    {/* Main Architectural Superstructure Under Construction */}
    <rect x="6" y="16" width="16" height="26" rx="2" fill="url(#mgmt-grad-tower)" stroke="#2B4A6D" strokeWidth="1.5" />
    
    {/* Architectural Curtain Windows & Grid */}
    <rect x="9" y="20" width="4" height="4" rx="1" fill="#D6C489" fillOpacity="0.8" />
    <rect x="15" y="20" width="4" height="4" rx="1" fill="#FFFFFF" fillOpacity="0.7" />
    <rect x="9" y="26" width="4" height="4" rx="1" fill="#FFFFFF" fillOpacity="0.7" />
    <rect x="15" y="26" width="4" height="4" rx="1" fill="#D6C489" fillOpacity="0.8" />
    <rect x="9" y="32" width="4" height="4" rx="1" fill="#FFFFFF" fillOpacity="0.7" />
    <rect x="15" y="32" width="4" height="4" rx="1" fill="#FFFFFF" fillOpacity="0.7" />
    
    {/* Secondary Building Wing */}
    <rect x="22" y="24" width="8" height="18" rx="1.5" fill="#3B5D84" stroke="#2B4A6D" strokeWidth="1" />
    <rect x="24" y="27" width="4" height="3" rx="0.5" fill="#D6C489" fillOpacity="0.7" />
    <rect x="24" y="33" width="4" height="3" rx="0.5" fill="#FFFFFF" fillOpacity="0.6" />

    {/* Heavy-Duty Construction Tower Crane Mast */}
    <path d="M35 42V10" stroke="url(#mgmt-grad-crane)" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M33 14l4 4M37 14l-4 4M33 22l4 4M37 22l-4 4M33 30l4 4M37 30l-4 4M33 38l4 4M37 38l-4 4" stroke="#D96B33" strokeWidth="1.25" opacity="0.6" />

    {/* Crane Horizontal Jib & Counter-Jib */}
    <path d="M22 10h22" stroke="url(#mgmt-grad-crane)" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M35 5l-8 5M35 5l8 5" stroke="#D96B33" strokeWidth="1.5" />
    
    {/* Crane Operator Cabin */}
    <rect x="33" y="8" width="4" height="4" rx="1" fill="#2B4A6D" stroke="#D96B33" strokeWidth="1" />

    {/* Hoist Line & Suspended Structural Steel Girder */}
    <path d="M25 10v9" stroke="#2B4A6D" strokeWidth="1.5" strokeDasharray="2 2" />
    <rect x="20" y="19" width="10" height="3.5" rx="1" fill="url(#mgmt-grad-gold)" stroke="#2B4A6D" strokeWidth="1" />
    
    {/* Milestone Pulse Beacon */}
    <circle cx="35" cy="5" r="2.5" fill="#E87A3E" />
    <circle cx="35" cy="5" r="5" stroke="#E87A3E" strokeWidth="1" strokeOpacity="0.4" />
  </svg>
);

// 06. Commissioning & O&M (Certification seal, precision operational handover & quality checkmark)
export const CommissioningSvg: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="comm-grad-seal" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
        <stop stopColor="#35577D" />
        <stop offset="1" stopColor="#1F3652" />
      </linearGradient>
      <linearGradient id="comm-grad-orange" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
        <stop stopColor="#E87A3E" />
        <stop offset="1" stopColor="#D96B33" />
      </linearGradient>
      <linearGradient id="comm-grad-gold" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
        <stop stopColor="#F5E4A8" />
        <stop offset="1" stopColor="#D6C489" />
      </linearGradient>
    </defs>

    {/* Operational Turbine / Handover Sunburst Rays */}
    <g transform="translate(24, 20)">
      <circle cx="0" cy="0" r="16.5" stroke="#D6C489" strokeWidth="1.5" strokeDasharray="3 3" strokeOpacity="0.7" />
    </g>

    {/* Ceremonial Handover Ribbons at Base */}
    <path d="M19 32l-5 11 8-3.5 8 3.5-5-11" fill="url(#comm-grad-orange)" stroke="#2B4A6D" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M17 32l-3 8 5-2" fill="#C25A28" opacity="0.6" />

    {/* Central Commissioning Excellence Seal Body */}
    <circle cx="24" cy="20" r="14" fill="url(#comm-grad-seal)" stroke="#2B4A6D" strokeWidth="2" />
    <circle cx="24" cy="20" r="11" fill="#FFFFFF" stroke="url(#comm-grad-gold)" strokeWidth="2" />

    {/* Operational O&M Precision Handover Checkmark */}
    <path d="M18 20.5l4 4 8-8.5" stroke="url(#comm-grad-orange)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />

    {/* Top Accreditation Star / Spark */}
    <path d="M24 4.5l1.5 3 3.5.5-2.5 2.5.5 3.5-3-1.5-3 1.5.5-3.5-2.5-2.5 3.5-.5z" fill="url(#comm-grad-gold)" stroke="#A49050" strokeWidth="0.75" />
  </svg>
);
