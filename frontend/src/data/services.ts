import dprPreparationImage from '../images/services-dpr-preparation.png';
import feasibilityStudiesImage from '../images/services-feasibility-studies.jpg';
import preBidEngineeringImage from '../images/services-pre-bid-engineering.png';
import detailedDesignImage from '../images/svc-detailed-design.png';
import pmcImage from '../images/services-pmc.png';
import authorityEngineerImage from '../images/services-authority-independent-engineer.png';
import surveyTestingImage from '../images/services-survey-investigation-testing.png';
import transactionAdvisoryImage from '../images/services-transaction-advisory.png';
import engineeringDesignImage from '../images/services-engineering-design-supervision.png';
import assuranceServicesImage from '../images/services-assurance-services.png';

export interface Service {
  id: string; title: string; slug: string; tag: string; shortDesc: string; description: string;
  deliverables: string[]; methodology: string; image: string;
}

const engineeringImage = "https://almondzglobalinfra.com/media/product/1392520946_highway1.jpg";

const defaultMethodology = "An integrated technical, financial and implementation-focused approach.";

const service = (
  id: string,
  title: string,
  tag: string,
  shortDesc: string,
  description: string,
  deliverables: string[],
  image = engineeringImage,
  methodology = defaultMethodology
): Service => ({ id, title, slug: id, tag, shortDesc, description, deliverables, methodology, image });

// AGICL's service line, in the exact order it should appear across the site:
// Survey, Investigation & Geospatial Mapping → Feasibility Study → Pre-Bid
// Engineering → Design → Detailed Project Report (DPR) → Transaction Advisory →
// Risk Assurance → Project Management Consultancy (PMC) → Supervision → O&M
// Services. This array is the single source of truth — the navbar mega-menu,
// homepage spotlight and Services page all render straight from it.
export const SERVICES: Service[] = [
  service(
    "survey-investigation-testing",
    "Survey, Investigation & Geospatial Mapping",
    "Survey & Mapping",
    "Accurate project insights.",
    "We deliver survey, investigation and geospatial mapping solutions — geotechnical investigations, material and soil testing, topographic and utility surveys, and GIS / drone-based mapping — providing accurate data and reliable insights for safe, efficient project planning and execution.",
    ["Geotechnical investigation", "Material & soil testing", "Topographic & utility surveys", "GIS & drone-based geospatial mapping", "Survey data analysis & reporting"],
    surveyTestingImage
  ),
  service(
    "feasibility-studies",
    "Feasibility Study",
    "Advisory",
    "Assessing project viability.",
    "We conduct techno-economic, financial, environmental and social feasibility studies to assess project viability, identify risks and opportunities, and support informed decision-making for sustainable and commercially viable infrastructure investments.",
    ["Techno-economic feasibility", "Financial viability assessment", "Environmental & social feasibility", "Risk & opportunity analysis"],
    feasibilityStudiesImage
  ),
  service(
    "pre-bid-engineering",
    "Pre-Bid Engineering",
    "Bid Support",
    "Technical due diligence, bid support and project assessment.",
    "Our pre-bid engineering services provide tendering assistance for the procurement of orders — including bidding assistance and review of the client's RFQ/RFP documents. We analyse technical requirements, strategise cost optimisation through value engineering, develop the bill of quantities and identify material sources. Support extends across all phases of bidding, including traffic surveys, revenue potential assessment and project financial modelling with IRR and sensitivity analysis for BOT / Annuity basis offers.",
    ["Bidding assistance & RFQ/RFP document review", "Technical requirements analysis & recommendations", "Cost strategy & value engineering", "Bill of quantities (BOQ) preparation & material sourcing", "Project cost estimation", "Traffic surveys & revenue potential analysis", "Project IRR with sensitivity analysis", "BOT / Annuity basis offer preparation & contract finalisation support"],
    preBidEngineeringImage
  ),
  service(
    "design",
    "Design",
    "Engineering Design",
    "Innovative, practical designs.",
    "We provide multidisciplinary engineering design across highways, bridges, urban infrastructure, railways and water, sanitation and sewerage systems — combining innovative, buildable solutions with technical compliance and whole-life performance.",
    ["Multidisciplinary detailed design", "Design drawings & specifications", "Technical compliance review", "Value engineering & design optimisation"],
    detailedDesignImage
  ),
  service(
    "dpr-preparation",
    "Detailed Project Report (DPR)",
    "Project Planning",
    "A clear project roadmap.",
    "We prepare comprehensive Detailed Project Reports including feasibility inputs, engineering design, cost estimation, financial analysis and implementation strategy — in compliance with statutory requirements to obtain approvals and funding.",
    ["Detailed Project Reports (DPR)", "Feasibility inputs & engineering design", "Cost estimation & financial analysis", "Implementation strategy & statutory compliance"],
    dprPreparationImage
  ),
  service(
    "transaction-advisory-financial",
    "Transaction Advisory",
    "Financial Advisory",
    "Efficient transaction structuring.",
    "We offer strategic advisory and financial services for infrastructure and PPP projects — covering feasibility assessment, financial modelling, bid process management, concession structuring, DPR preparation and transaction support for government and private sector clients.",
    ["Financial modelling & feasibility", "Bid process management", "Concession structuring", "Transaction support (government & private)"],
    transactionAdvisoryImage
  ),
  service(
    "assurance-services",
    "Risk Assurance",
    "Risk & Assurance",
    "Agency for specialized monitoring, TEV Study, Lender's Independent Engineers.",
    "We act as an Agency for Specialised Monitoring (ASM) and provide Techno-Economic Viability (TEV) studies and Lender's / Independent Engineer services — giving lenders and stakeholders independent assurance on project health, compliance and risk.",
    ["Agency for Specialised Monitoring (ASM)", "Techno-Economic Viability (TEV) studies", "Lender's / Independent Engineer services", "Compliance & risk assessment"],
    assuranceServicesImage
  ),
  service(
    "pmc",
    "Project Management Consultancy (PMC)",
    "Project Management",
    "On-time, quality delivery.",
    "Our PMC services cover planning, coordination, monitoring, quality assurance, contract administration and stakeholder management — ensuring timely delivery, cost efficiency and adherence to quality and safety standards.",
    ["Project planning & coordination", "Progress monitoring & reporting", "Quality assurance", "Contract administration", "Stakeholder management"],
    pmcImage
  ),
  service(
    "authority-independent-engineer",
    "Supervision",
    "Supervision",
    "Construction supervision and Independent engineer.",
    "We provide construction supervision and Authority / Independent Engineer services including quality control, safety compliance, technical review and certification of works for highways and infrastructure projects under EPC, HAM and PPP modes.",
    ["Construction supervision", "Quality control & safety compliance", "Technical review of works", "Certification & authority reporting"],
    engineeringDesignImage
  ),
  service(
    "om-services",
    "O&M Services",
    "Operations & Maintenance",
    "Reliable long-term performance.",
    "We support operations and maintenance of infrastructure assets — condition assessment, maintenance planning, performance monitoring and Independent Engineer services during the O&M period — to protect asset value and ensure reliable long-term performance.",
    ["Condition assessment & asset inventory", "Maintenance planning & manuals", "Performance & compliance monitoring", "Independent Engineer during O&M"],
    authorityEngineerImage
  )
];
