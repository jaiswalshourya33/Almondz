import React from 'react';

/**
 * Bespoke, multi-tone SVG illustrated icons for the 8 Specialized Infrastructure Domains.
 * Optimized for compact UI displays (e.g. Mega Menu dropdowns, mobile navigation, cards).
 * Palette:
 * - Brand Accent: #D96B33 (Vibrant Terracotta / Orange)
 * - Gold / Sand: #A49050 / #D6C489
 * - Slate / White: #FFFFFF / #94A3B8 / #38BDF8
 */

export interface SectorIconProps {
  className?: string;
}

// 1. Roads, Bridges, Highways & Tunnels
export const RoadsHighwaysIcon: React.FC<SectorIconProps> = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Bridge Arch / Flyover Top */}
    <path d="M3 8C7 5 17 5 21 8" stroke="#D96B33" strokeWidth="1.75" strokeLinecap="round" />
    <path d="M7 7.5V11M17 7.5V11" stroke="#D6C489" strokeWidth="1.5" strokeLinecap="round" />
    {/* Road Surface Perspective */}
    <path d="M4 20L8 10H16L20 20" stroke="#FFFFFF" strokeWidth="1.75" strokeLinejoin="round" />
    {/* Dashed Center Road Line */}
    <path d="M12 11V13M12 16V19" stroke="#D96B33" strokeWidth="1.75" strokeLinecap="round" />
  </svg>
);

// 2. Railways & Metro Rail
export const RailwaysMetroIcon: React.FC<SectorIconProps> = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Train Body Frame */}
    <rect x="5" y="4" width="14" height="13" rx="3.5" stroke="#FFFFFF" strokeWidth="1.75" />
    {/* Windshield */}
    <path d="M7.5 7.5H16.5V10.5H7.5Z" fill="#D96B33" fillOpacity="0.3" stroke="#D96B33" strokeWidth="1.5" />
    {/* Dual Headlights */}
    <circle cx="8" cy="14" r="1.25" fill="#D6C489" />
    <circle cx="16" cy="14" r="1.25" fill="#D6C489" />
    {/* Overhead Pantograph */}
    <path d="M9 4L12 2L15 4" stroke="#D96B33" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    {/* Metro Tracks */}
    <path d="M6 21L8 18M18 21L16 18M9 20H15" stroke="#D6C489" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

// 3. Banking & Finance
export const BankingFinanceIcon: React.FC<SectorIconProps> = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Institution Pediment Roof */}
    <path d="M3 8.5L12 3.5L21 8.5H3Z" fill="#D96B33" fillOpacity="0.25" stroke="#D96B33" strokeWidth="1.5" strokeLinejoin="round" />
    {/* Columns */}
    <path d="M6 9.5V16.5M10 9.5V16.5M14 9.5V16.5M18 9.5V16.5" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
    {/* Foundation Base */}
    <path d="M2.5 17.5H21.5M4 20.5H20" stroke="#D6C489" strokeWidth="1.5" strokeLinecap="round" />
    {/* Upward Growth Arrow Badge */}
    <circle cx="17.5" cy="6.5" r="3.5" fill="#1E3654" stroke="#D6C489" strokeWidth="1" />
    <path d="M16 7.5L19 4.5M19 4.5H16.5M19 4.5V7" stroke="#D96B33" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// 4. Smart Cities / Urban Infrastructure
export const SmartCitiesIcon: React.FC<SectorIconProps> = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Central High-rise */}
    <rect x="9" y="7" width="6" height="13.5" rx="1" stroke="#FFFFFF" strokeWidth="1.5" />
    <path d="M11 10H13M11 13H13M11 16H13" stroke="#D6C489" strokeWidth="1.5" strokeLinecap="round" />
    {/* Left Building */}
    <path d="M4 12.5C4 12 4.5 11.5 5 11.5H9V20.5H4V12.5Z" stroke="#D96B33" strokeWidth="1.5" strokeLinejoin="round" />
    {/* Right Tower */}
    <path d="M15 14H19C19.5 14 20 14.5 20 15V20.5H15V14Z" stroke="#FFFFFF" strokeWidth="1.5" strokeLinejoin="round" />
    {/* Smart Signal Transmission Waves */}
    <path d="M9 4C10 2.8 14 2.8 15 4" stroke="#D96B33" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="12" cy="5" r="1" fill="#D6C489" />
    <path d="M2 20.5H22" stroke="#D6C489" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

// 5. Water, Sanitation and Sewerage
export const WaterSanitationIcon: React.FC<SectorIconProps> = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Water Droplet Silhouette */}
    <path d="M12 3C12 3 5.5 10.2 5.5 14.5C5.5 18.09 8.41 21 12 21C15.59 21 18.5 18.09 18.5 14.5C18.5 10.2 12 3 12 3Z" stroke="#FFFFFF" strokeWidth="1.6" strokeLinejoin="round" />
    {/* Internal Water Ripple Wave */}
    <path d="M8.5 14.5C9.5 13.5 10.8 13.5 12 14.5C13.2 15.5 14.5 15.5 15.5 14.5" stroke="#D96B33" strokeWidth="1.5" strokeLinecap="round" />
    {/* Treatment / Purity Glimmer Accent */}
    <path d="M9.5 17.5C10.3 16.8 11.2 16.8 12 17.5C12.8 18.2 13.7 18.2 14.5 17.5" stroke="#D6C489" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="12" cy="9.5" r="1.5" fill="#D96B33" />
  </svg>
);

// 6. Tourism / Hospitality
export const TourismHospitalityIcon: React.FC<SectorIconProps> = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Mountain Range */}
    <path d="M2 18L7.5 9L11.5 15L15 10L22 18H2Z" stroke="#FFFFFF" strokeWidth="1.5" strokeLinejoin="round" />
    {/* Sun over Mountain Peak */}
    <circle cx="17" cy="5.5" r="2.5" fill="#D96B33" fillOpacity="0.4" stroke="#D96B33" strokeWidth="1.5" />
    {/* Passenger Ropeway Cable Line */}
    <path d="M3 6.5L21 10.5" stroke="#D6C489" strokeWidth="1.5" strokeLinecap="round" />
    {/* Gondola Cabin */}
    <rect x="9.5" y="8.5" width="4.5" height="3.5" rx="1" fill="#D96B33" stroke="#FFFFFF" strokeWidth="1" />
    <path d="M11.75 7.5V8.5" stroke="#D6C489" strokeWidth="1" />
  </svg>
);

// 7. Mining
export const MiningIcon: React.FC<SectorIconProps> = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Curved Pickaxe Head */}
    <path d="M4 8.5C7 5.5 13 4 19 6.5C18 12.5 16.5 18.5 13.5 21.5" stroke="#D96B33" strokeWidth="1.75" strokeLinecap="round" />
    {/* Pickaxe Wooden/Steel Handle */}
    <path d="M6 19.5L16.5 9" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
    {/* Mineral Crystal Diamond */}
    <path d="M18.5 14.5L20.5 17L18.5 19.5L16.5 17L18.5 14.5Z" fill="#D6C489" fillOpacity="0.5" stroke="#D6C489" strokeWidth="1.2" strokeLinejoin="round" />
    <circle cx="6" cy="19.5" r="1.5" fill="#D96B33" />
  </svg>
);

// 8. Renewable Energy / Power
export const RenewableEnergyIcon: React.FC<SectorIconProps> = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Wind Turbine Mast */}
    <path d="M12 11V21" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
    {/* Wind Turbine Blades */}
    <path d="M12 11L12 4M12 11L6 14.5M12 11L18 14.5" stroke="#D96B33" strokeWidth="1.75" strokeLinecap="round" />
    <circle cx="12" cy="11" r="1.5" fill="#D6C489" />
    {/* Solar Photovoltaic Grid Array */}
    <path d="M3 18.5L7 16H11L9.5 21H4.5L3 18.5Z" fill="#D6C489" fillOpacity="0.25" stroke="#D6C489" strokeWidth="1.2" strokeLinejoin="round" />
    {/* Clean Power Energy Lightning Spark */}
    <path d="M19 14.5L17 17.5H19.5L17.5 21" stroke="#D96B33" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/**
 * Helper to get the bespoke SVG icon for any sector by slug or ID
 */
export const getSectorIcon = (slugOrId: string, className = "w-4 h-4"): React.ReactElement => {
  switch (slugOrId) {
    case 'roads-highways':
      return <RoadsHighwaysIcon className={className} />;
    case 'railways-metro':
      return <RailwaysMetroIcon className={className} />;
    case 'banking-finance':
      return <BankingFinanceIcon className={className} />;
    case 'urban-infrastructure':
      return <SmartCitiesIcon className={className} />;
    case 'water-irrigation':
      return <WaterSanitationIcon className={className} />;
    case 'tourism-infrastructure':
      return <TourismHospitalityIcon className={className} />;
    case 'mining':
      return <MiningIcon className={className} />;
    case 'renewable-energy':
      return <RenewableEnergyIcon className={className} />;
    default:
      return <RoadsHighwaysIcon className={className} />;
  }
};
