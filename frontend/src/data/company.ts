export interface CompanyStat {
  label: string;
  value: string;
  number: number;
  suffix: string;
}

export const COMPANY_STATS: CompanyStat[] = [
  { label: "Completed Projects", value: "50+", number: 50, suffix: "+" },
  { label: "Projects Under Engagement", value: "100+", number: 100, suffix: "+" },
  { label: "Empanelments & Accreditations", value: "30+", number: 30, suffix: "+" },
];

export const ECOSYSTEM_PARTNERS = [
  "NHAI",
  "MORTH",
  "WORLD BANK",
  "ADB",
  "DDA",
  "MMRDA",
  "NITI AAYOG"
];

export const LIFECYCLE_STAGES = [
  {
    step: "01",
    category: "Planning",
    title: "Concept & Planning",
    description: "Initial feasibility studies, site analysis, and master planning to align project goals with technical reality."
  },
  {
    step: "02",
    category: "Feasibility",
    title: "Feasibility Studies",
    description: "Detailed technical and economic viability assessments ensuring project bankability and risk mitigation."
  },
  {
    step: "03",
    category: "Engineering",
    title: "Detailed Engineering",
    description: "Rigorous structural engineering, GIS mapping, and blueprint design adhering to international standards."
  },
  {
    step: "04",
    category: "Finance",
    title: "Financial Advisory",
    description: "Transaction structuring, risk modeling, and capital allocation frameworks for sustainable ROI."
  },
  {
    step: "05",
    category: "Management",
    title: "Project Management",
    description: "Comprehensive site supervision, quality assurance, and milestone tracking from ground-breaking to handover."
  },
  {
    step: "06",
    category: "Commissioning",
    title: "Commissioning & O&M",
    description: "Seamless operational handover, safety audits, and lifecycle management optimization."
  }
];
