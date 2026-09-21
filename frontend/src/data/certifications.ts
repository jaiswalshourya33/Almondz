export interface Certification {
  title: string;
  /**
   * Path to a locally hosted scan of the certificate, if one has been supplied.
   * Left unset when no local file exists yet — the page shows a placeholder
   * badge instead of a broken image rather than hot-linking a third-party URL.
   */
  image?: string;
}

// The previous entries hot-linked image URLs on almondzglobalinfra.com
// (e.g. "https://almondzglobalinfra.com/media/media/927632341_1.jpg"). That
// domain now serves this same site, so those paths just 404 into the SPA's
// index.html — every certificate rendered as a broken image. Titles are kept;
// `image` is left unset until an actual certificate scan is supplied for that
// entry (see CertificationsPage's placeholder fallback).
export const CERTIFICATIONS: Certification[] = [
  { title: "Certificate of Compliance" },
  { title: "Empanelment Letter" },
  { title: "ISO 14001" },
  { title: "LEI Certificate" },
  { title: "Phd Chamber of Commerce" },
  { title: "Udyam Registration Certificate With Annexure" },
  { title: "E-Certificate 18AAMCA2593F1ZH" },
  { title: "E-Certificate-27AAMCA2593F1ZI" },
  { title: "Certificate TC-15549 NABL" },
  { title: "Scope of Accrediation -NABL" },
  { title: "Membership Certificate 1" },
  { title: "ISO 45001" },
  { title: "Appreciation Certificate" },
  { title: "Membership Certificate" },
  { title: "Empanelment Partner" },
  { title: "ISO 27001" },
];

// A short teaser of AGICL's empanelments — see the full, categorized list
// (Central/State Bodies, Banks) on the dedicated Empanelments & Clients page.
// `logo` is only set where a verified official logo file (Wikimedia Commons,
// checked to actually load) was found — the card falls back to the Building2
// icon badge for institutions without one, rather than risk a broken image.
export const EMPANELMENTS = [
  { name: "NHAI", desc: "National Highways Authority of India — Financial Consultant / Drone Aerial Survey" },
  { name: "MoRTH", desc: "Ministry of Road Transport and Highways — Empanelled Consultancy Partner", logo: "https://upload.wikimedia.org/wikipedia/commons/c/ce/Ministry_of_Road_Transport_and_Highways.svg" },
  { name: "World Bank", desc: "Registered Consultant for World Bank-Funded Infrastructure Projects", logo: "https://upload.wikimedia.org/wikipedia/commons/8/86/World_Bank_logo.svg" },
  { name: "Asian Development Bank (ADB)", desc: "Empanelled Consultant for ADB-Funded Urban Infrastructure Projects", logo: "https://upload.wikimedia.org/wikipedia/commons/4/43/Asian_Development_Bank_logo.svg" },
  { name: "SIDBI", desc: "Small Industrial Development Bank of India — Techno-Economic Viability (TEV) Empanelment", logo: "https://upload.wikimedia.org/wikipedia/commons/b/b1/SIDBI_LOGO.png" },
  { name: "Indian Banks' Association (IBA)", desc: "Empanelled Agency for Specialised Monitoring (ASM) for NPA Resolution" },
  { name: "NaBFID", desc: "National Bank for Financing Infrastructure and Development — LIE & TEV Empanelment" }
];
