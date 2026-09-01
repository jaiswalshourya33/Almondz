import React from 'react';

export const Iso9001Logo: React.FC<{ className?: string }> = ({ className = "h-12 w-auto" }) => (
  <svg viewBox="0 0 240 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Grey & Blue checkmark */}
    <path d="M22 55 L38 72 L78 28 L66 18 L38 52 L30 44 Z" fill="#718096" />
    <path d="M30 48 L44 65 L88 20 L76 10 L44 45 L36 38 Z" fill="#1A365D" />
    {/* ISO Text */}
    <text x="75" y="62" fontFamily="Arial, Helvetica, sans-serif" fontWeight="900" fontSize="52" fill="#0F2C59" letterSpacing="-1">
      ISO
    </text>
    {/* 9001 / 2015 text */}
    <text x="172" y="44" fontFamily="Arial, Helvetica, sans-serif" fontWeight="800" fontSize="24" fill="#0F2C59">
      9001
    </text>
    <text x="172" y="68" fontFamily="Arial, Helvetica, sans-serif" fontWeight="700" fontSize="22" fill="#0F2C59">
      2015
    </text>
    {/* CERTIFIED banner */}
    <text x="120" y="90" fontFamily="Arial, Helvetica, sans-serif" fontWeight="800" fontSize="18" fill="#0F2C59" letterSpacing="4" textAnchor="middle">
      CERTIFIED
    </text>
  </svg>
);

export const Iso45001Logo: React.FC<{ className?: string }> = ({ className = "h-12 w-auto" }) => (
  <svg viewBox="0 0 240 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Green checkmark */}
    <path d="M18 52 L38 74 L84 22 L72 12 L38 54 L28 44 Z" fill="#38A169" />
    <path d="M42 22 C48 14, 58 10, 70 8" stroke="#38A169" strokeWidth="4" strokeLinecap="round" />
    {/* ISO Text */}
    <text x="75" y="62" fontFamily="Arial, Helvetica, sans-serif" fontWeight="900" fontSize="52" fill="#0F2C59" letterSpacing="-1">
      ISO
    </text>
    {/* 45001 / 2018 text */}
    <text x="170" y="44" fontFamily="Arial, Helvetica, sans-serif" fontWeight="800" fontSize="23" fill="#0F2C59">
      45001
    </text>
    <text x="172" y="68" fontFamily="Arial, Helvetica, sans-serif" fontWeight="700" fontSize="22" fill="#0F2C59">
      2018
    </text>
    {/* CERTIFIED banner */}
    <text x="120" y="90" fontFamily="Arial, Helvetica, sans-serif" fontWeight="800" fontSize="18" fill="#0F2C59" letterSpacing="4" textAnchor="middle">
      CERTIFIED
    </text>
  </svg>
);

export const Iso14001Logo: React.FC<{ className?: string }> = ({ className = "h-12 w-auto" }) => (
  <svg viewBox="0 0 220 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Green Foliage / Tree Emblem */}
    <g transform="translate(10, 5) scale(0.85)">
      <circle cx="110" cy="45" r="42" stroke="#2F855A" strokeWidth="4" fill="none" />
      <path d="M78 40 C78 25, 142 25, 142 40 C142 55, 78 55, 78 40 Z" fill="#2F855A" opacity="0.15" />
      {/* Leaves */}
      <ellipse cx="100" cy="35" rx="8" ry="12" fill="#2F855A" transform="rotate(-30 100 35)" />
      <ellipse cx="120" cy="35" rx="8" ry="12" fill="#2F855A" transform="rotate(30 120 35)" />
      <ellipse cx="110" cy="24" rx="8" ry="12" fill="#2F855A" />
      <ellipse cx="90" cy="48" rx="8" ry="6" fill="#2F855A" transform="rotate(-15 90 48)" />
      <ellipse cx="130" cy="48" rx="8" ry="6" fill="#2F855A" transform="rotate(15 130 48)" />
      {/* Trunk and stylized branch */}
      <path d="M110 38 L110 65 L132 65" stroke="#2F855A" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
    </g>
    {/* ISO 14001 text */}
    <text x="110" y="88" fontFamily="Arial, Helvetica, sans-serif" fontWeight="900" fontSize="22" fill="#2F855A" letterSpacing="1" textAnchor="middle">
      ISO 14001
    </text>
  </svg>
);

export const Iso27001Logo: React.FC<{ className?: string }> = ({ className = "h-12 w-auto" }) => (
  <svg viewBox="0 0 240 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Shield Icon */}
    <path d="M22 22 L45 12 L68 22 C68 48, 45 68, 45 68 C45 68, 22 48, 22 22 Z" fill="#0F2C59" />
    <path d="M34 38 L42 46 L56 30" stroke="#D6C489" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    {/* ISO Text */}
    <text x="75" y="62" fontFamily="Arial, Helvetica, sans-serif" fontWeight="900" fontSize="52" fill="#0F2C59" letterSpacing="-1">
      ISO
    </text>
    {/* 27001 / 2022 text */}
    <text x="170" y="44" fontFamily="Arial, Helvetica, sans-serif" fontWeight="800" fontSize="23" fill="#0F2C59">
      27001
    </text>
    <text x="172" y="68" fontFamily="Arial, Helvetica, sans-serif" fontWeight="700" fontSize="22" fill="#0F2C59">
      2022
    </text>
    {/* CERTIFIED banner */}
    <text x="120" y="90" fontFamily="Arial, Helvetica, sans-serif" fontWeight="800" fontSize="18" fill="#0F2C59" letterSpacing="4" textAnchor="middle">
      CERTIFIED
    </text>
  </svg>
);

export const OssCertLogo: React.FC<{ className?: string }> = ({ className = "h-12 w-auto" }) => (
  <svg viewBox="0 0 200 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="200" height="100" rx="12" fill="#D32F2F" />
    <circle cx="100" cy="38" r="24" fill="#ffffff" />
    {/* Pagoda / Emblem */}
    <path d="M100 20 L115 36 L85 36 Z" fill="#D32F2F" />
    <path d="M92 36 L108 36 L100 48 Z" fill="#FBC02D" stroke="#D32F2F" strokeWidth="1.5" />
    <ellipse cx="100" cy="50" rx="16" ry="4" fill="#FBC02D" />
    <text x="100" y="74" fontFamily="Arial, Helvetica, sans-serif" fontWeight="900" fontSize="22" fill="#ffffff" textAnchor="middle" letterSpacing="1">
      OSS
    </text>
    <text x="100" y="90" fontFamily="Arial, Helvetica, sans-serif" fontWeight="700" fontSize="13" fontStyle="italic" fill="#ffffff" textAnchor="middle">
      Certification
    </text>
  </svg>
);

export const CeaiLogo: React.FC<{ className?: string }> = ({ className = "h-12 w-auto" }) => (
  <svg viewBox="0 0 220 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* CEAI Stylized Text */}
    <text x="12" y="60" fontFamily="Arial, Helvetica, sans-serif" fontWeight="900" fontSize="48" fontStyle="italic" fill="#0F2C59">
      CEAI
    </text>
    {/* Colored Dots */}
    <rect x="135" y="24" width="8" height="8" fill="#D32F2F" transform="rotate(45 139 28)" />
    <rect x="148" y="32" width="8" height="8" fill="#38A169" transform="rotate(45 152 36)" />
    <text x="12" y="82" fontFamily="Arial, Helvetica, sans-serif" fontWeight="700" fontSize="12" fill="#1A365D">
      Consulting Engineers
    </text>
    <text x="12" y="95" fontFamily="Arial, Helvetica, sans-serif" fontWeight="600" fontSize="10" fill="#4A5568">
      Association of India
    </text>
  </svg>
);

export const UkCertLogo: React.FC<{ className?: string }> = ({ className = "h-12 w-auto" }) => (
  <svg viewBox="0 0 220 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Stylized UK Cert */}
    <text x="12" y="65" fontFamily="Arial, Helvetica, sans-serif" fontWeight="900" fontSize="50" fill="#D32F2F">
      UK
    </text>
    <rect x="85" y="26" width="120" height="38" rx="4" fill="#0F2C59" />
    <text x="145" y="52" fontFamily="Arial, Helvetica, sans-serif" fontWeight="800" fontSize="24" fill="#ffffff" textAnchor="middle">
      cert
    </text>
    {/* Blue arrow crossing */}
    <path d="M92 48 L142 48 L130 38 M142 48 L130 58" stroke="#00BCD4" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    <text x="110" y="86" fontFamily="Arial, Helvetica, sans-serif" fontWeight="600" fontSize="11" fill="#4A5568" textAnchor="middle">
      Certification & Inspection
    </text>
  </svg>
);
