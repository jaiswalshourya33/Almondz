import React from 'react';

/**
 * Bespoke, multi-tone SVG illustrated icons for Corporate Governance Policies.
 * Designed with Almondz corporate color palette:
 * - Corporate Navy: #2B4A6D / #172B44
 * - Vibrant Orange: #D96B33 / #E87A3E
 * - Gold / Bronze: #D6C489 / #A49050
 * - Soft Emerald & Neutral: #10B981, #F1F4F8
 */

// 01. Nomination & Remuneration Policy (Executive leadership, talent appointment & compensation governance)
export const NominationPolicySvg: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="nom-grad-navy" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
        <stop stopColor="#2B4A6D" />
        <stop offset="1" stopColor="#172B44" />
      </linearGradient>
      <linearGradient id="nom-grad-orange" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
        <stop stopColor="#E87A3E" />
        <stop offset="1" stopColor="#D96B33" />
      </linearGradient>
      <linearGradient id="nom-grad-gold" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
        <stop stopColor="#F5E4A8" />
        <stop offset="1" stopColor="#D6C489" />
      </linearGradient>
    </defs>

    {/* Executive Framework Board Document Backdrop */}
    <rect x="6" y="5" width="36" height="38" rx="5" fill="#F0F4F8" stroke="#2B4A6D" strokeWidth="1.5" strokeOpacity="0.3" />
    <path d="M12 11h14M12 16h8" stroke="#2B4A6D" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.4" />

    {/* Executive Leadership Figure */}
    <circle cx="24" cy="20" r="5" fill="url(#nom-grad-orange)" stroke="#2B4A6D" strokeWidth="1.5" />
    <path d="M15 34c0-4.5 4-7.5 9-7.5s9 3 9 7.5" fill="url(#nom-grad-navy)" stroke="#2B4A6D" strokeWidth="1.5" />

    {/* Golden Compensation Scales / Merit Stars */}
    <g transform="translate(31, 8)">
      <circle cx="6" cy="6" r="5.5" fill="url(#nom-grad-gold)" stroke="#A49050" strokeWidth="1" />
      <path d="M6 3.5v5M4.5 4.5h3" stroke="#2B4A6D" strokeWidth="1.25" strokeLinecap="round" />
    </g>

    {/* Governance Ties / Ribbon Base */}
    <path d="M22 34l2 4 2-4" fill="#D6C489" stroke="#2B4A6D" strokeWidth="1" />
  </svg>
);

// 02. POSH Policy (Prevention of Sexual Harassment - Safe, dignified, respectful & protective workplace)
export const PoshPolicySvg: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="posh-grad-shield" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
        <stop stopColor="#35577D" />
        <stop offset="1" stopColor="#1D324C" />
      </linearGradient>
      <linearGradient id="posh-grad-orange" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
        <stop stopColor="#E87A3E" />
        <stop offset="1" stopColor="#D96B33" />
      </linearGradient>
      <linearGradient id="posh-grad-gold" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
        <stop stopColor="#F5E4A8" />
        <stop offset="1" stopColor="#D6C489" />
      </linearGradient>
    </defs>

    {/* Outer Security & Protection Glow */}
    <circle cx="24" cy="24" r="19" fill="#D96B33" fillOpacity="0.08" />

    {/* Primary Sanctuary Protective Shield */}
    <path
      d="M24 6l15 5.5v12.5c0 10.5-6.5 17-15 20-8.5-3-15-9.5-15-20V11.5L24 6z"
      fill="url(#posh-grad-shield)"
      stroke="#2B4A6D"
      strokeWidth="2"
      strokeLinejoin="round"
    />

    {/* Inner Golden Border Contour */}
    <path
      d="M24 10l11 4v9.5c0 7.5-4.5 12.5-11 15-6.5-2.5-11-7.5-11-15V14l11-4z"
      fill="#FFFFFF"
      stroke="url(#posh-grad-gold)"
      strokeWidth="1.5"
    />

    {/* Equality & Mutual Respect Twin Nodes */}
    <circle cx="20" cy="20" r="2.5" fill="#2B4A6D" />
    <circle cx="28" cy="20" r="2.5" fill="url(#posh-grad-orange)" />
    <path d="M16 29c0-2.5 2-4 4-4h8c2 0 4 1.5 4 4" stroke="#2B4A6D" strokeWidth="2" strokeLinecap="round" fill="none" />

    {/* Golden Safe Assurance Check Badge */}
    <circle cx="24" cy="33" r="4.5" fill="url(#posh-grad-orange)" stroke="#FFFFFF" strokeWidth="1.5" />
    <path d="M22 33l1.5 1.5 3-3" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// 03. Corporate Social Responsibility Policy (CSR - Sustainable nation building, community empowerment & ecology)
export const CsrPolicySvg: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="csr-grad-green" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
        <stop stopColor="#34D399" />
        <stop offset="1" stopColor="#059669" />
      </linearGradient>
      <linearGradient id="csr-grad-orange" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
        <stop stopColor="#E87A3E" />
        <stop offset="1" stopColor="#D96B33" />
      </linearGradient>
      <linearGradient id="csr-grad-navy" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
        <stop stopColor="#2B4A6D" />
        <stop offset="1" stopColor="#172B44" />
      </linearGradient>
      <linearGradient id="csr-grad-gold" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
        <stop stopColor="#F5E4A8" />
        <stop offset="1" stopColor="#D6C489" />
      </linearGradient>
    </defs>

    {/* Community Care Background Halo */}
    <circle cx="24" cy="24" r="18" fill="#F0F9F5" stroke="#10B981" strokeWidth="1.5" strokeOpacity="0.3" strokeDasharray="3 3" />

    {/* Sprouting Seedling & Sustainable Ecosystem */}
    {/* Left Leaf */}
    <path
      d="M24 24c-7 0-11-4-11-12 8 0 11 4 11 12z"
      fill="url(#csr-grad-green)"
      stroke="#059669"
      strokeWidth="1.5"
    />
    {/* Right Leaf */}
    <path
      d="M24 24c7 0 11-4 11-12-8 0-11 4-11 12z"
      fill="url(#csr-grad-orange)"
      stroke="#D96B33"
      strokeWidth="1.5"
    />
    {/* Central Stem */}
    <path d="M24 24v14" stroke="url(#csr-grad-navy)" strokeWidth="2.5" strokeLinecap="round" />

    {/* Nurturing Corporate Hands / Earth Support Arc */}
    <path
      d="M11 34c4 4 8 5 13 5s9-1 13-5"
      stroke="url(#csr-grad-navy)"
      strokeWidth="3"
      strokeLinecap="round"
    />
    <path
      d="M8 30c3 3 6 4 10 4M40 30c-3 3-6 4-10 4"
      stroke="url(#csr-grad-gold)"
      strokeWidth="2"
      strokeLinecap="round"
    />

    {/* Golden Solar Energy / Community Impact Spark */}
    <circle cx="24" cy="8" r="2.5" fill="url(#csr-grad-gold)" />
    <path d="M24 3v2M19 5l1 1.5M29 5l-1 1.5" stroke="#D6C489" strokeWidth="1.25" strokeLinecap="round" />
  </svg>
);

// Fallback Generic Policy SVG (Official board resolution document with seal & ribbon)
export const GenericPolicySvg: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="gen-pol-navy" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
        <stop stopColor="#2B4A6D" />
        <stop offset="1" stopColor="#172B44" />
      </linearGradient>
      <linearGradient id="gen-pol-gold" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
        <stop stopColor="#F5E4A8" />
        <stop offset="1" stopColor="#D6C489" />
      </linearGradient>
      <linearGradient id="gen-pol-orange" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
        <stop stopColor="#E87A3E" />
        <stop offset="1" stopColor="#D96B33" />
      </linearGradient>
    </defs>

    {/* Document Base */}
    <rect x="8" y="5" width="32" height="38" rx="4" fill="#FFFFFF" stroke="url(#gen-pol-navy)" strokeWidth="2" />
    
    {/* Folded Top Right Corner */}
    <path d="M30 5v7a2 2 0 0 0 2 2h8" fill="url(#gen-pol-gold)" stroke="url(#gen-pol-navy)" strokeWidth="1.5" />

    {/* Text Lines */}
    <rect x="14" y="12" width="12" height="3" rx="1.5" fill="#2B4A6D" />
    <path d="M14 19h20M14 24h16M14 29h12" stroke="#2B4A6D" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.4" />

    {/* Official Seal & Ribbons */}
    <g transform="translate(28, 28)">
      <path d="M5 9l-2 5 4-1.5 4 1.5-2-5" fill="url(#gen-pol-orange)" stroke="#2B4A6D" strokeWidth="1" />
      <circle cx="7" cy="5" r="5.5" fill="url(#gen-pol-gold)" stroke="#A49050" strokeWidth="1.25" />
      <path d="M5 5l1.5 1.5 3-3" stroke="#2B4A6D" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    </g>
  </svg>
);
