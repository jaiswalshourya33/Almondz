export interface Service {
  id: string;
  title: string;
  slug: string;
  shortDesc: string;
  description: string;
  deliverables: string[];
  methodology: string;
  image: string;
}

export const SERVICES: Service[] = [
  {
    id: "due-diligence",
    title: "Due Diligence — Technical & Financial",
    slug: "due-diligence",
    shortDesc: "Comprehensive audit of assets, regulatory compliance, title deeds, and operational forecasts.",
    description: "Our multidisciplinary due diligence teams uncover operational bottlenecks, regulatory risks, and financial variances to protect investor capital before transaction closure.",
    deliverables: [
      "Technical Risk Matrix",
      "Asset Valuation & Depreciation Report",
      "Environmental & Regulatory Compliance Audit",
      "CapEx & OpEx Benchmark Analysis"
    ],
    methodology: "Combining rigorous on-site physical inspection with historical data triangulation and predictive financial modeling.",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "lender-independent-engineer",
    title: "Lender Independent Engineers (LIE)",
    slug: "lender-independent-engineer",
    shortDesc: "Independent oversight on behalf of financial institutions to certify construction milestones and fund disbursements.",
    description: "As trusted LIE advisors, we act as the objective technical custodian safeguarding lender interests across mega infrastructure projects.",
    deliverables: [
      "Monthly Progress & Milestone Certification",
      "Quality Assurance & Material Testing Reports",
      "Cost-to-Completion Estimates",
      "Safety Compliance Audits"
    ],
    methodology: "Independent site monitoring using drone aerial surveys, IoT sensor data, and certified material testing laboratories.",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "tev-study",
    title: "Techno-Economic Viability (TEV) Study",
    slug: "tev-study",
    shortDesc: "Rigorous evaluation of project feasibility combining engineering specifications with economic forecasts.",
    description: "TEV studies form the bedrock of project financing. We analyze market demand, technical design integrity, and financial rate of return under various sensitivity scenarios.",
    deliverables: [
      "Demand Forecasting & Traffic/Revenue Models",
      "Technical Design Review",
      "Financial IRR & NPV Sensitivity Matrices",
      "Risk Identification & Mitigation Blueprint"
    ],
    methodology: "Quantitative scenario simulation coupled with exhaustive primary market research and technical parameter testing.",
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "specialised-monitoring",
    title: "Agency for Specialised Monitoring (ASM)",
    slug: "specialised-monitoring",
    shortDesc: "Real-time tracking of complex construction timelines, fund utilization, and contractor performance.",
    description: "ASM services ensure that large-scale government and institutional projects remain on schedule and within budget through transparent telemetry and expert oversight.",
    deliverables: [
      "Real-time Dashboard Analytics",
      "Fund Utilization Tracking",
      "Bottleneck & Dispute Early Warning Alerts",
      "Quarterly Executive Stewardship Reports"
    ],
    methodology: "Deploying proprietary project management dashboards integrated with on-ground technical inspection teams.",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "detailed-design",
    title: "Detailed Design, Planning & Execution",
    slug: "detailed-design",
    shortDesc: "End-to-end engineering blueprints, structural calculations, and construction execution methodologies.",
    description: "Transforming conceptual visions into construction-ready engineering drawings using advanced BIM (Building Information Modeling) and finite element analysis.",
    deliverables: [
      "Detailed Engineering Drawings (GFC)",
      "Bill of Quantities (BoQ) & Cost Estimates",
      "Technical Specifications & Tender Documents",
      "BIM 3D/4D Federated Models"
    ],
    methodology: "Iterative design validation using parametric CAD tools, wind tunnel simulations, and seismic stress analysis.",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "pre-bid-engineering",
    title: "Pre-Bid Engineering & Cost Estimation",
    slug: "pre-bid-engineering",
    shortDesc: "Strategic engineering support for contractors during tender preparation and financial bidding.",
    description: "Maximizing win rates for EPC contractors by optimizing structural designs, accurate quantity surveying, and competitive cost estimations.",
    deliverables: [
      "Optimized Design Alternatives for Cost Reduction",
      "Accurate BoQ & Material Take-offs",
      "Risk-Adjusted Pricing Models",
      "Tender Compliance Checklists"
    ],
    methodology: "Rapid value engineering analysis combined with historical cost database benchmarking.",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "pmc",
    title: "Project Management Consultancy / Supervision",
    slug: "pmc",
    shortDesc: "Turnkey supervision, quality control, HSE management, and contractor coordination on site.",
    description: "We oversee construction execution from foundation to commissioning, ensuring absolute adherence to quality, safety, and environmental standards.",
    deliverables: [
      "Site Supervision & Quality Assurance Logs",
      "HSE (Health, Safety, Environment) Compliance Reports",
      "Contract Administration & Dispute Resolution",
      "Commissioning & Handover Certifications"
    ],
    methodology: "Resident engineering teams embedded on-site equipped with digital inspection tablets and real-time reporting protocols.",
    image: "https://images.unsplash.com/photo-1541888946425-d0fbb18f02f8?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "road-safety-audit",
    title: "Road Safety Audit",
    slug: "road-safety-audit",
    shortDesc: "Systematic safety evaluation of existing or proposed highways and urban road networks.",
    description: "Identifying potential accident hazards and recommending geometry, signage, and lighting enhancements to save lives and improve traffic flow.",
    deliverables: [
      "Safety Hazard Identification Report",
      "Blackspot Remediation Engineering Plans",
      "Road Signage & Pavement Marking Audit",
      "Post-Construction Safety Verification"
    ],
    methodology: "Day and night visual audits, speed profiling, accident data analysis, and IRC guideline benchmarking.",
    image: "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "transaction-advisory",
    title: "Transaction Advisory",
    slug: "transaction-advisory",
    shortDesc: "End-to-end guidance for privatizing or monetizing public infrastructure assets.",
    description: "Guiding government bodies and private investors through asset sales, concession bidding, and partnership negotiations.",
    deliverables: [
      "Information Memorandum & RFP Documentation",
      "Bid Evaluation & Negotiation Support",
      "Concession Agreement Drafting",
      "Financial Closure Assistance"
    ],
    methodology: "Multi-disciplinary advisory team blending legal, financial, and technical infrastructure specialists.",
    image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "survey-gis",
    title: "Survey, Investigation & GIS Mapping",
    slug: "survey-gis",
    shortDesc: "High-precision topographic surveys, LiDAR mapping, geotechnical testing, and GIS spatial databases.",
    description: "Laying the accurate empirical foundation for every project through satellite imagery, drone LiDAR scanning, and soil mechanics testing.",
    deliverables: [
      "High-Resolution DTM/LiDAR Contour Maps",
      "Geotechnical Borehole Logging & Soil Reports",
      "GIS Asset Databases & Spatial Dashboards",
      "Hydrological & Flood Modeling Data"
    ],
    methodology: "State-of-the-art RTK GPS, drone photogrammetry, and accredited soil mechanics laboratory testing.",
    image: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "operations-maintenance",
    title: "Operations & Maintenance (O&M) Advisory",
    slug: "operations-maintenance",
    shortDesc: "Optimizing asset lifecycle performance, preventive maintenance protocols, and facility management.",
    description: "Ensuring long-term asset durability and optimal revenue generation through predictive maintenance algorithms and operational audits.",
    deliverables: [
      "Asset Health Index & Remaining Life Assessment",
      "Preventive Maintenance Schedules",
      "Operational Cost Optimization Plans",
      "Facility Management Standard Operating Procedures"
    ],
    methodology: "IoT-enabled predictive maintenance frameworks combined with expert engineering oversight.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80"
  }
];
