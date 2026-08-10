export interface Certification {
  title: string;
  issuer: string;
  year: string;
  description: string;
}

export const CERTIFICATIONS: Certification[] = [
  {
    title: "ISO 9001:2015 Certified",
    issuer: "Intertek Certification",
    year: "2015 - Present",
    description: "Certified quality management system across all infrastructure consultancy, engineering design, and project management operations."
  },
  {
    title: "ISO 14001:2015",
    issuer: "Global Quality Standards",
    year: "2018 - Present",
    description: "Environmental management standards ensuring sustainable engineering practices and ecological preservation."
  },
  {
    title: "ISO 45001:2018",
    issuer: "Bureau Veritas",
    year: "2020 - Present",
    description: "Occupational health and safety management systems safeguarding site engineers and contractors."
  }
];

export const EMPANELMENTS = [
  { name: "NHAI", desc: "National Highways Authority of India — Empanelled Independent Engineer" },
  { name: "MoRTH", desc: "Ministry of Road Transport and Highways — Approved Consultancy Partner" },
  { name: "World Bank", desc: "Registered Institutional Consultant for Multilateral Infrastructure Projects" },
  { name: "Asian Development Bank (ADB)", desc: "Empanelled Infrastructure Advisory & Supervision Partner" },
  { name: "DDA", desc: "Delhi Development Authority — Urban Planning & Engineering Consultant" },
  { name: "MMRDA", desc: "Mumbai Metropolitan Region Development Authority — Transport & Metro Consultant" },
  { name: "NITI Aayog", desc: "Strategic Advisory Partner for National Infrastructure Pipeline (NIP)" }
];
