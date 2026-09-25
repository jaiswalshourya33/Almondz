export interface Certification {
  title: string;
  /**
   * Locally hosted page scans of the certificate (served from /public), in
   * document order. The first page is the card thumbnail; the viewer shows every
   * page. Left unset when no scan has been supplied yet — the page shows a
   * placeholder badge instead of a broken image.
   */
  pages?: string[];
}

const scans = (slug: string, count = 1) =>
  Array.from({ length: count }, (_, i) => `/certifications/${slug}-${i + 1}.jpg`);

// Scans are rendered from the client-supplied PDFs. Entries without `pages` are
// still awaiting a scan (see CertificationsPage's placeholder fallback).
export const CERTIFICATIONS: Certification[] = [
  { title: "Certificate of Compliance", pages: scans('certificate-of-compliance-cmmi-l3') },
  { title: "Empanelment Letter" },
  { title: "ISO 14001", pages: scans('iso-14001') },
  { title: "LEI Certificate" },
  { title: "Phd Chamber of Commerce", pages: scans('phd-chamber-of-commerce') },
  { title: "Udyam Registration Certificate With Annexure", pages: scans('udyam-registration', 3) },
  { title: "E-Certificate 18AAMCA2593F1ZH", pages: scans('gst-e-certificate-18AAMCA2593F1ZH') },
  { title: "E-Certificate-27AAMCA2593F1ZI" },
  { title: "Certificate TC-15549 NABL", pages: scans('nabl-certificate-tc-15549') },
  { title: "Scope of Accrediation -NABL", pages: scans('nabl-scope-of-accreditation', 4) },
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
