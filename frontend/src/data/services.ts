export interface Service {
  id: string; title: string; slug: string; shortDesc: string; description: string;
  deliverables: string[]; methodology: string; image: string;
}

const engineeringImage = "https://almondzglobalinfra.com/media/product/1392520946_highway1.jpg";
const monitoringImage = "https://almondzglobalinfra.com/media/product/1514813843_agency-for-specialized-monitoring-(asm)1.jpg";

const defaultMethodology = "An integrated technical, financial and implementation-focused approach.";

const service = (
  id: string,
  title: string,
  shortDesc: string,
  description: string,
  deliverables: string[],
  image = engineeringImage,
  methodology = defaultMethodology
): Service => ({ id, title, slug: id, shortDesc, description, deliverables, methodology, image });

// Descriptions below are drawn directly from AGICL's official Corporate Profile and
// marketing brochure — not generic filler text.
export const SERVICES: Service[] = [
  service(
    "detailed-design",
    "Detailed Design, Planning & Execution",
    "Detailed engineering, planning and execution support for infrastructure assignments.",
    "Detailed engineering design, construction supervision, and quality assurance across all infrastructure sectors — spanning the full project lifecycle from concept and feasibility through design, construction and commissioning.",
    ["Detailed project reports", "Feasibility reports", "Engineering design", "Cost estimates"]
  ),
  service(
    "independent-authority-engineer",
    "Independent / Authority Engineer Services",
    "Oversight and certification for EPC and BOT projects on behalf of government authorities and lenders.",
    "AGICL provides Independent Engineer and Authority Engineer services, delivering oversight and certification for EPC and BOT projects on behalf of government authorities and lending institutions across roads, highways and infrastructure assignments nationwide.",
    ["EPC/BOT project oversight", "Certification & compliance", "Authority engineer reporting", "Quality surveillance"],
    engineeringImage
  ),
  service(
    "pmc",
    "Project Management Consultancy / Supervision",
    "Project management and supervision services for effective implementation.",
    "Feasibility studies, DPR preparation and pre-bid assistance, with end-to-end project management and implementation supervision ensuring on-time delivery and rigorous quality control.",
    ["Project supervision", "Implementation support", "Quality monitoring", "Progress reporting"],
    monitoringImage
  ),
  service(
    "road-safety-audit",
    "Road Safety Audit",
    "Road safety review and advisory for highways and transport infrastructure.",
    "Comprehensive Road Safety Engineering and Audit Services covering Road Safety Audits (RSA), Black Spot Identification & Rectification Studies, Safety Inspections, Traffic Engineering and Crash Data Analysis, aligned with IRC, MoRTH and international best practices.",
    ["Safety review", "Site assessment", "Black spot identification & rectification", "Safety recommendations", "Compliance reporting"]
  ),
  service(
    "pre-bid-engineering",
    "Pre-Bid Engineering & Cost Estimation",
    "Engineering and cost-estimation support before bid submission.",
    "Pre-bid engineering and cost-estimation support to help clients prepare technically and financially sound bids, including detailed cost estimates and technical inputs ahead of bid submission.",
    ["Pre-bid review", "Cost estimates", "Technical inputs", "Bid support"]
  ),
  service(
    "transaction-advisory",
    "Transaction Advisory",
    "Transaction advisory, PPP structuring and bid-process management.",
    "As a DEA (Department of Economic Affairs, Ministry of Finance) empanelled Transaction Advisor, AGICL provides Transaction Advisory and Bid Process Management services for complex infrastructure projects, with deep expertise in PPP structuring, financial and technical feasibility, procurement advisory and bid management.",
    ["PPP structuring", "Financial model", "Bid process management", "Value for money analysis"],
    monitoringImage
  ),
  service(
    "specialised-monitoring",
    "Agency for Specialised Monitoring",
    "Specialised monitoring for project progress and performance.",
    "AGICL is empanelled with the Indian Banks' Association (IBA) as an Agency for Specialised Monitoring (ASM), providing independent monitoring and loan oversight services across diverse sectors including infrastructure, energy, fertilizers and manufacturing for India's leading public sector banks.",
    ["Project monitoring", "Progress review", "Technical reporting", "Performance assessment"],
    monitoringImage
  ),
  service(
    "tev-study",
    "Techno-Economic Viability Study",
    "Technical and economic assessment of project feasibility and viability.",
    "Techno-Economic Viability (TEV) studies providing independent project appraisal and technical due diligence, helping financial institutions and project stakeholders make informed investment decisions.",
    ["Technical assessment", "Economic analysis", "Feasibility study", "Risk review"]
  ),
  service(
    "survey-gis",
    "Survey, Investigation & GIS Mapping",
    "Engineering surveys, investigations and GIS mapping for project development.",
    "End-to-end Survey, Investigation & GIS Mapping services supported by an extensive in-house fleet of specialised equipment — drone/UAV photogrammetry, LiDAR, DGPS and total stations — and skilled technical teams.",
    ["Engineering surveys", "Site investigation", "GIS mapping", "Data assessment"]
  ),
  service(
    "lender-independent-engineer",
    "Lender Independent Engineers",
    "Independent technical support for lenders and financing institutions.",
    "As a trusted provider of Lenders' Independent Engineer (LIE) services, AGICL delivers independent project appraisal, technical due diligence, monitoring and risk assessment across infrastructure and industrial sectors on behalf of financing institutions.",
    ["Technical due diligence", "Project review", "Progress monitoring", "Lender reporting"],
    monitoringImage
  ),
  service(
    "due-diligence",
    "Due Diligence (Technical & Financial)",
    "Technical and financial due diligence for infrastructure projects.",
    "Independent technical and financial due diligence for infrastructure projects, supporting informed investment and lending decisions through rigorous risk assessment and review.",
    ["Technical due diligence", "Financial due diligence", "Risk assessment", "Review report"],
    monitoringImage
  )
];
