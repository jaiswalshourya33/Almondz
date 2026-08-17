export interface Service {
  id: string; title: string; slug: string; shortDesc: string; description: string;
  deliverables: string[]; methodology: string; image: string;
}

const engineeringImage = "https://almondzglobalinfra.com/media/product/1392520946_highway1.jpg";
const monitoringImage = "https://almondzglobalinfra.com/media/product/1514813843_agency-for-specialized-monitoring-(asm)1.jpg";
const service = (id: string, title: string, shortDesc: string, deliverables: string[], image = engineeringImage): Service => ({
  id, title, slug: id, shortDesc, description: `AGICL provides ${title.toLowerCase()} services for infrastructure assignments.`, deliverables,
  methodology: "An integrated technical, financial and implementation-focused approach.", image
});

export const SERVICES: Service[] = [
  service("detailed-design", "Detailed Design, Planning & Execution", "Detailed engineering, planning and execution support for infrastructure assignments.", ["Detailed project reports", "Feasibility reports", "Engineering design", "Cost estimates"]),
  service("pmc", "Project Management Consultancy / Supervision", "Project management and supervision services for effective implementation.", ["Project supervision", "Implementation support", "Quality monitoring", "Progress reporting"], monitoringImage),
  service("road-safety-audit", "Road Safety Audit", "Road safety review and advisory for highways and transport infrastructure.", ["Safety review", "Site assessment", "Safety recommendations", "Compliance reporting"]),
  service("pre-bid-engineering", "Pre-Bid Engineering & Cost Estimation", "Engineering and cost-estimation support before bid submission.", ["Pre-bid review", "Cost estimates", "Technical inputs", "Bid support"]),
  service("transaction-advisory", "Transaction Advisory", "Transaction advisory, PPP structuring and bid-process management.", ["PPP structuring", "Financial model", "Bid process management", "Value for money analysis"], monitoringImage),
  service("specialised-monitoring", "Agency for Specialised Monitoring", "Specialised monitoring for project progress and performance.", ["Project monitoring", "Progress review", "Technical reporting", "Performance assessment"], monitoringImage),
  service("tev-study", "Techno-Economic Viability Study", "Technical and economic assessment of project feasibility and viability.", ["Technical assessment", "Economic analysis", "Feasibility study", "Risk review"]),
  service("survey-gis", "Survey, Investigation & GIS Mapping", "Engineering surveys, investigations and GIS mapping for project development.", ["Engineering surveys", "Site investigation", "GIS mapping", "Data assessment"]),
  service("lender-independent-engineer", "Lender Independent Engineers", "Independent technical support for lenders and financing institutions.", ["Technical due diligence", "Project review", "Progress monitoring", "Lender reporting"], monitoringImage),
  service("due-diligence", "Due Diligence (Technical & Financial)", "Technical and financial due diligence for infrastructure projects.", ["Technical due diligence", "Financial due diligence", "Risk assessment", "Review report"], monitoringImage)
];
