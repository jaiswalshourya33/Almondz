import dprPreparationImage from '../images/svc-pmc.png';
import feasibilityStudiesImage from '../images/svc-pre-bid-engineering.png';
import pmcImage from '../images/svc-lender-independent-engineer.png';
import authorityEngineerImage from '../images/svc-detailed-design.png';
import surveyTestingImage from '../images/sit-field-testing.png';
import transactionAdvisoryImage from '../images/svc-transaction-advisory.png';
import assuranceServicesImage from '../images/svc-due-diligence.png';
import roadSafetyImage from '../images/svc-road-safety-audit.png';

export interface Service {
  id: string; title: string; slug: string; shortDesc: string; description: string;
  deliverables: string[]; methodology: string; image: string;
}

const engineeringImage = "https://almondzglobalinfra.com/media/product/1392520946_highway1.jpg";

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

// Mirrors AGICL's "Service Capabilities" set, in the same order: DPR Preparation,
// Feasibility Studies, PMC, Authority / Independent Engineer Services, Survey
// Investigation & Testing, Transaction Advisory & Financial Services, Engineering
// Design & Supervision, Assurance Services, Road Safety Services.
export const SERVICES: Service[] = [
  service(
    "dpr-preparation",
    "DPR Preparation",
    "Comprehensive Detailed Project Reports for approvals and funding.",
    "We prepare comprehensive Detailed Project Reports including feasibility inputs, engineering design, cost estimation, financial analysis and implementation strategy — in compliance with statutory requirements to obtain approvals and funding.",
    ["Detailed Project Reports (DPR)", "Feasibility inputs & engineering design", "Cost estimation & financial analysis", "Implementation strategy & statutory compliance"],
    dprPreparationImage
  ),
  service(
    "feasibility-studies",
    "Feasibility Studies",
    "Techno-economic, financial, environmental and social feasibility studies.",
    "We conduct techno-economic, financial, environmental and social feasibility studies to assess project viability, identify risks and opportunities, and support informed decision-making for sustainable and commercially viable infrastructure investments.",
    ["Techno-economic feasibility", "Financial viability assessment", "Environmental & social feasibility", "Risk & opportunity analysis"],
    feasibilityStudiesImage
  ),
  service(
    "pmc",
    "Project Management Consultancy (PMC)",
    "Planning, monitoring, quality assurance and contract administration for on-time delivery.",
    "Our PMC services cover planning, coordination, monitoring, quality assurance, contract administration and stakeholder management — ensuring timely delivery, cost efficiency and adherence to quality and safety standards.",
    ["Project planning & coordination", "Progress monitoring & reporting", "Quality assurance", "Contract administration", "Stakeholder management"],
    pmcImage
  ),
  service(
    "authority-independent-engineer",
    "Authority / Independent Engineer Services",
    "Construction supervision, review and certification for EPC, HAM and PPP projects.",
    "We provide Authority / Independent Engineer services including construction supervision, quality control, safety compliance, technical review and certification of works for highways and infrastructure projects under EPC, HAM and PPP modes.",
    ["Construction supervision", "Quality control & safety compliance", "Technical review of works", "Certification & authority reporting"],
    authorityEngineerImage
  ),
  service(
    "survey-investigation-testing",
    "Survey Investigation & Testing",
    "Geotechnical investigation, material testing and topographic / utility surveys.",
    "We deliver advanced survey, investigation and testing solutions including geotechnical investigations, material testing, and topographic and utility surveys — providing accurate data and reliable insights for safe and efficient project planning and execution.",
    ["Geotechnical investigation", "Material & soil testing", "Topographic & utility surveys", "Survey data analysis & reporting"],
    surveyTestingImage
  ),
  service(
    "transaction-advisory-financial",
    "Transaction Advisory & Financial Services",
    "Strategic advisory and financial services for infrastructure and PPP projects.",
    "We offer strategic advisory and financial services for infrastructure and PPP projects — covering feasibility assessment, financial modelling, bid process management, concession structuring, DPR preparation and transaction support for government and private sector clients.",
    ["Financial modelling & feasibility", "Bid process management", "Concession structuring", "Transaction support (government & private)"],
    transactionAdvisoryImage
  ),
  service(
    "engineering-design-supervision",
    "Engineering Design & Supervision",
    "Multidisciplinary engineering design and supervision across infrastructure sectors.",
    "We provide multidisciplinary engineering design and supervision services across highways, bridges, urban infrastructure, railways and water, sanitation and sewerage systems — ensuring quality execution, technical compliance and optimal performance throughout the project lifecycle.",
    ["Multidisciplinary detailed design", "Construction supervision", "Technical compliance review", "Lifecycle performance assurance"],
    engineeringImage
  ),
  service(
    "assurance-services",
    "Assurance Services",
    "Independent technical, financial and operational assurance and audit.",
    "We provide independent assurance and audit services including technical, financial and operational reviews — to ensure compliance, mitigate risks, improve governance and enhance stakeholder confidence.",
    ["Technical assurance reviews", "Financial & operational audit", "Compliance & risk assessment", "Governance improvement recommendations"],
    assuranceServicesImage
  ),
  service(
    "road-safety-services",
    "Road Safety Services",
    "End-to-end road safety audits, black-spot studies and safety engineering.",
    "We provide end-to-end road safety solutions including road safety audits, safety engineering, black spot studies, traffic studies, signage and marking design, and awareness programmes — to enhance road user safety and reduce accidents.",
    ["Road safety audits (RSA)", "Black spot identification & rectification", "Traffic studies", "Signage & marking design", "Road safety awareness programmes"],
    roadSafetyImage
  )
];
