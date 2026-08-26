export interface Certification {
  title: string;
  image: string;
}

// Sourced and verified directly from https://almondzglobalinfra.com/certificate/ —
// title and image are matched 1:1 with the official listing, in the same order.
export const CERTIFICATIONS: Certification[] = [
  { title: "Certificate of Compliance", image: "https://almondzglobalinfra.com/media/media/927632341_1.jpg" },
  { title: "Empanelment Letter", image: "https://almondzglobalinfra.com/media/media/1632947821_Empanelment_Letter_-_Almondz_-_August_2025.jpg" },
  { title: "ISO 14001", image: "https://almondzglobalinfra.com/media/media/99025928_ISO-14001-2027.PNG" },
  { title: "LEI Certificate", image: "https://almondzglobalinfra.com/media/media/1263306562_LEI-Certificate.jpg" },
  { title: "Phd Chamber of Commerce", image: "https://almondzglobalinfra.com/media/media/823695367_Phd-Chamber-of-Commerce.jpg" },
  { title: "Udyam Registration Certificate With Annexure", image: "https://almondzglobalinfra.com/media/media/1306934483_Udyam-Registration-Certificate-With-Annexure.jpg" },
  { title: "E-Certificate 18AAMCA2593F1ZH", image: "https://almondzglobalinfra.com/media/media/2023159827_Untitled_design_(5).jpg" },
  { title: "E-Certificate-27AAMCA2593F1ZI", image: "https://almondzglobalinfra.com/media/media/1152614200_Untitled_design_(6).jpg" },
  { title: "Certificate TC-15549 NABL", image: "https://almondzglobalinfra.com/media/media/1393045108_Certificate_TC-15549_NABL.jpg" },
  { title: "Scope of Accrediation -NABL", image: "https://almondzglobalinfra.com/media/media/485502809_Scope-of-Accrediation-NABL.jpg" },
  { title: "Membership Certificate 1", image: "https://almondzglobalinfra.com/media/media/cyyyyyc-membership-certificate.jpg" },
  { title: "ISO 45001", image: "https://almondzglobalinfra.com/media/media/1292493358_ISO-45001-2018.jpg" },
  { title: "Appreciation Certificate", image: "https://almondzglobalinfra.com/media/media/1415218359_apr.jpg" },
  { title: "Membership Certificate", image: "https://almondzglobalinfra.com/media/media/1457669284_CEAI.jpg" },
  { title: "Empanelment Partner", image: "https://almondzglobalinfra.com/media/media/796897213_emple.jpg" },
  { title: "ISO 27001", image: "https://almondzglobalinfra.com/media/media/1847632286_ISO-27001-2022.jpg" },
];

// A short teaser of AGICL's empanelments — see the full, categorized list
// (Central/State Bodies, Banks) on the dedicated Empanelments & Clients page.
export const EMPANELMENTS = [
  { name: "NHAI", desc: "National Highways Authority of India — Financial Consultant / Drone Aerial Survey" },
  { name: "MoRTH", desc: "Ministry of Road Transport and Highways — Empanelled Consultancy Partner" },
  { name: "World Bank", desc: "Registered Consultant for World Bank-Funded Infrastructure Projects" },
  { name: "Asian Development Bank (ADB)", desc: "Empanelled Consultant for ADB-Funded Urban Infrastructure Projects" },
  { name: "SIDBI", desc: "Small Industrial Development Bank of India — Techno-Economic Viability (TEV) Empanelment" },
  { name: "Indian Banks' Association (IBA)", desc: "Empanelled Agency for Specialised Monitoring (ASM) for NPA Resolution" },
  { name: "NaBFID", desc: "National Bank for Financing Infrastructure and Development — LIE & TEV Empanelment" }
];
