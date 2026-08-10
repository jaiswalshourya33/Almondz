export interface Sector {
  id: string;
  title: string;
  slug: string;
  shortDesc: string;
  description: string;
  image: string;
  services: string[];
  featuredProjects: string[];
  metrics: { label: string; value: string }[];
}

export const SECTORS: Sector[] = [
  {
    id: "smart-cities",
    title: "Smart Cities & Urban Infrastructure",
    slug: "smart-cities",
    shortDesc: "Pioneering intelligent urban development with IoT integration, sustainable municipal planning, and transit-oriented design.",
    description: "Almondz is at the forefront of urban transformation, designing smart city command centers, municipal water grids, efficient transit networks, and resilient public spaces that elevate quality of life for millions across India.",
    image: "https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=1200&q=80",
    services: [
      "Master Planning & Zoning",
      "Smart Command & Control Centers",
      "Urban Mobility Solutions",
      "Municipal Solid Waste Management",
      "GIS & Spatial Data Modeling"
    ],
    featuredProjects: ["Dehradun Smart City", "Dharamshala Smart City"],
    metrics: [
      { label: "Urban Plans Developed", value: "25+" },
      { label: "Population Impacted", value: "15M+" }
    ]
  },
  {
    id: "roads-highways",
    title: "Roads, Bridges, Highways & Tunnels",
    slug: "roads-highways",
    shortDesc: "Engineering high-speed expressways, complex mountain tunnels, and heavy-load bridges connecting remote terrains.",
    description: "With extensive experience in national highway corridors and mountainous terrain engineering, Almondz delivers world-class road networks that reduce transit times and accelerate regional commerce.",
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80",
    services: [
      "Alignment & Geometric Design",
      "Geotechnical Investigations",
      "Tunnel Ventilation & Safety Systems",
      "Independent Engineering & Quality Audit",
      "Bridge Load Testing & Structural Health Monitoring"
    ],
    featuredProjects: ["Vadodara-Kim Expressway", "Zozila Tunnel", "Chitradurga-Davanagere Highway"],
    metrics: [
      { label: "Highway Kilometers", value: "4,500+ km" },
      { label: "Major Tunnels & Bridges", value: "120+" }
    ]
  },
  {
    id: "water-sanitation",
    title: "Water & Waste Water",
    slug: "water-sanitation",
    shortDesc: "Securing sustainable water resources, advanced sewage treatment plants, and smart irrigation networks.",
    description: "We provide end-to-end consultancy for bulk water supply, river basin management, wastewater recycling, and rural piped water schemes adhering to stringent environmental benchmarks.",
    image: "https://images.unsplash.com/photo-1584727638096-042c45049ebe?auto=format&fit=crop&w=1200&q=80",
    services: [
      "Bulk Water Transmission Grids",
      "Sewage Treatment Plants (STP) & Effluent Management",
      "River Rejuvenation & Watershed Modeling",
      "SCADA Automation for Water Utilities",
      "NRW (Non-Revenue Water) Reduction"
    ],
    featuredProjects: ["Ganga Basin Water Grid", "Statewide Rural Piped Water Scheme"],
    metrics: [
      { label: "Water Treated Daily", value: "2.4B Liters" },
      { label: "Pipelines Laid", value: "8,000+ km" }
    ]
  },
  {
    id: "railways-metro",
    title: "Railways & Metro Rail",
    slug: "railways-metro",
    shortDesc: "Designing high-speed rail corridors, underground metro systems, and specialized manufacturing coach facilities.",
    description: "Almondz delivers multi-disciplinary engineering for heavy rail, dedicated freight corridors, and urban mass rapid transit systems (MRTS) with emphasis on signaling, track geometry, and station architecture.",
    image: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=1200&q=80",
    services: [
      "Track Alignment & Permanent Way Design",
      "Underground & Elevated Station Architecture",
      "OHE & Traction Power Distribution",
      "Rolling Stock Facility Engineering",
      "Signaling & Telecommunications (S&T)"
    ],
    featuredProjects: ["New Rail Coach Factory Palakkad", "North-South Dedicated Freight Corridor Link"],
    metrics: [
      { label: "Rail Tracks Engineered", value: "1,200+ km" },
      { label: "Metro Stations Designed", value: "45+" }
    ]
  },
  {
    id: "energy-power",
    title: "Energy & Power",
    slug: "energy-power",
    shortDesc: "Integrating renewable solar/hydro energy, smart grid transmission, and power distribution efficiency.",
    description: "Empowering India's green transition through hydro-electric expansion, utility-scale solar parks, transmission line engineering, and substation modernization.",
    image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=1200&q=80",
    services: [
      "Hydro-Electric Generation & Dam Safety",
      "Solar & Wind Park Grid Integration",
      "HV/EHV Transmission Lines & Substations",
      "Energy Audit & Loss Reduction",
      "Power Sector Regulatory Advisory"
    ],
    featuredProjects: ["Cascadia Hydroelectric Expansion", "Rajasthan Solar Ultra Mega Park Grid"],
    metrics: [
      { label: "Power Capacity Enabled", value: "18 GW" },
      { label: "Transmission Lines", value: "3,500+ km" }
    ]
  },
  {
    id: "ports-logistics",
    title: "Ports & Logistics",
    slug: "ports-logistics",
    shortDesc: "Developing deep-water berths, multimodal logistics parks, and inland container depots.",
    description: "Facilitating seamless international trade and domestic supply chains with specialized maritime engineering, container terminal design, and multimodal logistics hub planning.",
    image: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1200&q=80",
    services: [
      "Breakwater & Berth Marine Engineering",
      "Multimodal Logistics Parks (MMLP) Design",
      "Dredging & Coastal Protection",
      "Warehouse Automation & Cargo Handling",
      "Port Access Rail & Road Connectivity"
    ],
    featuredProjects: ["Western Coastal Multimodal Terminal", "Inland Waterway Terminal Hub"],
    metrics: [
      { label: "Cargo Handling Capacity", value: "85 MTPA" },
      { label: "Logistics Parks Planned", value: "14" }
    ]
  },
  {
    id: "airport",
    title: "Airport & Aviation",
    slug: "airport",
    shortDesc: "Designing modern greenfield airports, runway extensions, and air cargo terminals.",
    description: "Providing comprehensive aviation consultancy including airside civil works, terminal building engineering, navigation aids integration, and passenger flow optimization.",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=80",
    services: [
      "Runway, Taxiway & Apron Pavement Design",
      "Terminal Passenger Capacity Planning",
      "Air Traffic Control Tower Engineering",
      "Aviation Fuel Farm Infrastructure",
      "Cargo Complex & MRO Facility Design"
    ],
    featuredProjects: ["Regional Greenfield Airport Upgradation", "International Cargo Hub Terminal"],
    metrics: [
      { label: "Airports Handled", value: "18+" },
      { label: "Passenger Capacity Added", value: "40M/year" }
    ]
  },
  {
    id: "environmental",
    title: "Environmental & Social Impact Assessment",
    slug: "environmental",
    shortDesc: "Rigorous EIA, social safeguards, carbon footprint modeling, and ecological preservation strategies.",
    description: "Ensuring sustainable development through comprehensive environmental clearance documentation, biodiversity conservation plans, and resettlement & rehabilitation (R&R) monitoring.",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80",
    services: [
      "Environmental Impact Assessment (EIA/EMP)",
      "Social Impact Assessment & R&R Advisory",
      "Carbon Neutrality & ESG Roadmaps",
      "Flora-Fauna Biodiversity Conservation",
      "Zero-Waste Municipal Protocols"
    ],
    featuredProjects: ["National Expressway Green Corridor Audit", "River Basin Eco-Restoration"],
    metrics: [
      { label: "Clearances Secured", value: "200+" },
      { label: "Trees Planted / Protected", value: "1.2M+" }
    ]
  },
  {
    id: "financial-advisory",
    title: "Financial Consultant & Transaction Advisory",
    slug: "financial-advisory",
    shortDesc: "Structuring PPP models, financial viability modeling, and investment banking for infrastructure assets.",
    description: "Bridging the gap between public policy and private capital through robust financial syndication, PPP concession agreements, and bankability assessments.",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80",
    services: [
      "Public-Private Partnership (PPP) Structuring",
      "Detailed Financial Modeling & ROI Projections",
      "Bid Process Management & Concession Drafting",
      "Debt Syndication & Investor Pitchbooks",
      "Asset Monetization Advisory"
    ],
    featuredProjects: ["State Highway Annuity Project Syndication", "Municipal Bond Issuance Advisory"],
    metrics: [
      { label: "Capital Mobilized", value: "$8.5B+" },
      { label: "PPP Contracts Structured", value: "60+" }
    ]
  },
  {
    id: "sit",
    title: "SIT (Specialized Infrastructure & Tourism)",
    slug: "sit",
    shortDesc: "Engineering high-altitude passenger ropeways, eco-tourism resorts, and cultural heritage complexes.",
    description: "Unlocking India's tourism potential with state-of-the-art ropeway transportation systems in mountainous terrains, convention centers, and spiritual tourism zone planning.",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
    services: [
      "High-Altitude Ropeway Engineering",
      "Eco-Tourism Master Planning",
      "Heritage Conservation & Adaptive Reuse",
      "Cable Propelled Transit Systems",
      "Hospitality Infrastructure Design"
    ],
    featuredProjects: ["Himachal Pradesh Passenger Ropeway Network", "Varanasi Heritage Zone Revitalization"],
    metrics: [
      { label: "Ropeway Systems Designed", value: "22+" },
      { label: "Tourism Master Plans", value: "16" }
    ]
  },
  {
    id: "banking-finance",
    title: "Banking & Finance Consultancy",
    slug: "banking-finance",
    shortDesc: "Specialized advisory for financial institutions, NPA resolution, credit rating support, and asset valuation.",
    description: "Leveraging our deep infrastructure expertise to assist banks and financial institutions in technical due diligence, project monitoring, and risk appraisal.",
    image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1200&q=80",
    services: [
      "Technical Appraisals for Project Finance",
      "Non-Performing Asset (NPA) Resolution & Valuation",
      "Lender Independent Engineering (LIE)",
      "Risk Mitigation Frameworks",
      "Corporate Restructuring Advisory"
    ],
    featuredProjects: ["Consortium Bank Infrastructure Portfolio Review", "Stressed Asset Technical Audit"],
    metrics: [
      { label: "Portfolios Appraised", value: "$12B+" },
      { label: "Banking Partners", value: "35+" }
    ]
  }
];
