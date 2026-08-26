export interface Project { id: string; title: string; slug: string; sector: string; sectorSlug: string; status: "Recently Awarded" | "Ongoing" | "Completed"; location: string; coordinates: string; image: string; youtubeUrl?: string; role: string; client: string; description: string; impact: string; servicesProvided: string[]; }

const images = {
  roads: "https://almondzglobalinfra.com/media/product/183845799_highway.jpg", smart: "https://almondzglobalinfra.com/media/product/313788118_smartcity.jpg", tourism: "https://almondzglobalinfra.com/media/product/1272138012_cable.jpg", rail: "https://almondzglobalinfra.com/media/product/28977533_rail.jpg", finance: "https://almondzglobalinfra.com/media/product/1513015590_1.jpg", water: "https://almondzglobalinfra.com/media/product/1502232643_water.jpg"
};

const project = (
  id: string, title: string, sector: string, sectorSlug: string, status: Project["status"],
  location: string, role: string, client: string, image: string,
  description: string, impact: string, coordinates = "India"
): Project => ({ id, title, slug: id, sector, sectorSlug, status, location, coordinates, image, role, client, description, impact, servicesProvided: [role] });

export const PROJECTS: Project[] = [
  project(
    "vadodara-kim-expressway", "Construction of Six-lane Vadodara–Kim Expressway, Padra to Vadodara section of Vadodara–Mumbai Expressway (Phase IA – Package I)",
    "Roads, Bridges, Highways & Tunnels", "roads-highways", "Completed", "Gujarat, India",
    "Financial Consultant", "NHAI", images.finance,
    "AGICL served as Financial Consultant to NHAI for the six-lane Vadodara–Kim Expressway (Padra to Vadodara section), part of the Vadodara–Mumbai Expressway, delivering financial appraisal and advisory support through to completion.",
    "Delivered financial consultancy for a flagship stretch of the Vadodara–Mumbai Expressway, supporting NHAI's project financing and appraisal requirements."
  ),
  project(
    "himachal-ropeways", "Financial feasibility study, project structuring and bid process management for passenger ropeways at Dharamshala–McLeodganj/Triund, Naina Devi Ji–Toba and Deothsidh–Shahtalai",
    "Tourism Infrastructure", "tourism-infrastructure", "Completed", "Himachal Pradesh, India",
    "Financial Feasibility, Structuring & Bid Process Management", "HPIDB", images.tourism,
    "AGICL conducted financial feasibility studies, project structuring and bid process management for HPIDB's passenger ropeway projects at Dharamshala–McLeodganj/Triund, Naina Devi Ji–Toba and Deothsidh–Shahtalai in Himachal Pradesh.",
    "Enabled HPIDB to structure and tender three passenger ropeway projects, expanding tourism connectivity across Himachal Pradesh."
  ),
  project(
    "bharmani-ropeway", "Technical & financial feasibility study and bid process management for Passenger Ropeway from Sachuin (Bharmour) to Bharmani Mata Temple",
    "Tourism Infrastructure", "tourism-infrastructure", "Completed", "Chamba, Himachal Pradesh, India",
    "Technical & Financial Feasibility and Bid Process Management", "HPIDB", images.tourism,
    "AGICL carried out technical and financial feasibility studies and bid process management for HPIDB's passenger ropeway project from Sachuin (Bharmour) to Bharmani Mata Temple in Chamba district.",
    "Supported HPIDB in structuring and tendering a pilgrimage-tourism ropeway connecting Sachuin to the Bharmani Mata Temple."
  ),
  project(
    "chitradurga-davanagere", "Six-laning of Chitradurga to Davanagere including the proposed Chitradurga Bypass on NH-4 under NHDP Phase V",
    "Roads, Bridges, Highways & Tunnels", "roads-highways", "Completed", "Karnataka, India",
    "Financial Consultant", "NHAI", images.finance,
    "AGICL served as Financial Consultant to NHAI for the six-laning of Chitradurga to Davanagere, including the Chitradurga Bypass on NH-4, under NHDP Phase V.",
    "Supported NHAI's financial appraisal for a key NHDP Phase V six-laning corridor in Karnataka."
  ),
  project(
    "zojila-tunnel", "Zojila Tunnel on Srinagar–Sonamarg–Gumri Road (NH-1) on DBFOT Annuity Basis",
    "Roads, Bridges, Highways & Tunnels", "roads-highways", "Completed", "Jammu & Kashmir, India",
    "Financial Consultant", "Ministry of Road Transport & Highways", images.roads,
    "AGICL served as Financial Consultant to the Ministry of Road Transport & Highways for the Zojila Tunnel on the Srinagar–Sonamarg–Gumri Road (NH-1), developed on a DBFOT annuity basis.",
    "Supported financial appraisal of one of India's longest strategic bi-directional tunnels, improving all-weather connectivity in Jammu & Kashmir."
  ),
  project(
    "palakkad-rail-coach", "Setting up of a New Rail Coach Factory at Palakkad",
    "Railways & Metro Rail", "railways-metro", "Completed", "Kerala, India",
    "Infrastructure Consultancy", "RITES", images.rail,
    "AGICL provided infrastructure consultancy services to RITES for the setting up of a new Rail Coach Factory at Palakkad, Kerala.",
    "Supported RITES in the infrastructure consultancy for a new rail coach manufacturing facility in Kerala."
  ),
  project(
    "dharamshala-smart-city", "Design, develop, manage and implement Dharamshala Smart City project",
    "Urban Infrastructure", "urban-infrastructure", "Completed", "Dharamshala, Himachal Pradesh, India",
    "PMC Consultant (JV with ILF Consulting Engineers)", "Dharamshala Smart City Ltd.", images.smart,
    "AGICL, in joint venture with ILF Consulting Engineers, served as PMC Consultant to Dharamshala Smart City Ltd., designing, developing, managing and implementing the Dharamshala Smart City project.",
    "Delivered integrated project management consultancy for one of Himachal Pradesh's flagship Smart City missions."
  ),
  project(
    "dehradun-smart-city", "Design, develop, manage and implement Dehradun Smart City project",
    "Urban Infrastructure", "urban-infrastructure", "Completed", "Dehradun, Uttarakhand, India",
    "PMC Consultant (JV with REPL)", "Dehradun Smart City Ltd.", images.smart,
    "AGICL, in joint venture with REPL, served as PMC Consultant to Dehradun Smart City Ltd., designing, developing, managing and implementing the Dehradun Smart City project.",
    "Delivered integrated project management consultancy for Uttarakhand's flagship Dehradun Smart City mission."
  ),
  project(
    "hospet-hampi-gangawati", "Project Management for Hospet (NH-67) – Hampi – Gangawati – Sindhnur (NH-150A) under the BRT scheme",
    "Roads, Bridges, Highways & Tunnels", "roads-highways", "Ongoing", "Karnataka, India",
    "Project Management Consultancy", "Infrastructure Client", images.roads,
    "AGICL is providing Project Management Consultancy for the Hospet (NH-67)–Hampi–Gangawati–Sindhnur (NH-150A) road development under the Bharatmala BRT scheme in Karnataka.",
    "Delivering project management oversight for a strategic Karnataka highway corridor under the Bharatmala programme."
  ),
  project(
    "durg-raipur-bypass", "Pre-tender services for construction of the 6-lane Durg–Raipur bypass section of NH-53, Packages A and B",
    "Roads, Bridges, Highways & Tunnels", "roads-highways", "Ongoing", "Chhattisgarh, India",
    "Pre-tender Services", "Infrastructure Client", images.roads,
    "AGICL is providing pre-tender services for the construction of the 6-lane Durg–Raipur bypass section of NH-53, Packages A and B, in Chhattisgarh.",
    "Supporting pre-construction readiness for a key 6-lane bypass on NH-53 in Chhattisgarh."
  ),
  project(
    "silkyara-barkot-tunnel", "Safety consultancy for the two-lane bi-directional Silkyara Bend–Barkot Tunnel with escape passage and approaches on NH-134",
    "Roads, Bridges, Highways & Tunnels", "roads-highways", "Ongoing", "Uttarakhand, India",
    "Safety Consultant", "Infrastructure Client", images.roads,
    "AGICL is providing safety consultancy for the two-lane bi-directional Silkyara Bend–Barkot Tunnel, including its escape passage and approaches, on NH-134 in Uttarakhand.",
    "Delivering independent safety consultancy for a strategic Himalayan tunnel project on NH-134."
  ),
  project(
    "dwarka-expressway", "Dwarka Expressway Project – Package I from Shiv Murti Intersection to Road Under Bridge near Dwarka Sector 21",
    "Roads, Bridges, Highways & Tunnels", "roads-highways", "Ongoing", "Delhi, India",
    "Safety Consultancy Services", "Infrastructure Client", images.roads,
    "AGICL is providing safety consultancy services for the Dwarka Expressway Project — Package I, from the Shiv Murti Intersection to the Road Under Bridge near Dwarka Sector 21.",
    "Delivering independent road safety consultancy for a flagship access-controlled urban expressway in Delhi."
  ),
  project(
    "delhi-amritsar-katra", "Safety Consultant for Delhi–Amritsar–Katra Expressway, Phase I Package V",
    "Roads, Bridges, Highways & Tunnels", "roads-highways", "Ongoing", "Haryana, India",
    "Safety Consultant", "Infrastructure Client", images.roads,
    "AGICL is serving as Safety Consultant for the Delhi–Amritsar–Katra Expressway, Phase I Package V, in Haryana.",
    "Delivering independent road safety consultancy for a strategic national expressway corridor connecting Delhi, Amritsar and Katra."
  ),

  // Flagship projects added from AGICL_Corporate_Profile.md / AGICL_Brochure_Final.md
  project(
    "upeida-vindhya-purvanchal-jewar-expressways", "Project Development & DPR Consultancy for the Vindhya Expressway, Purvanchal Spur and Jewar Link Expressway",
    "Roads, Bridges, Highways & Tunnels", "roads-highways", "Ongoing", "Uttar Pradesh, India",
    "Project Development and DPR Consultant", "UPEIDA", images.roads,
    "AGICL is the Project Development and DPR Consultant for UPEIDA's Vindhya Expressway, Purvanchal Spur and Jewar Link Expressway, covering feasibility studies, DPR preparation, statutory clearances and project development for over 470 km of six-lane access-controlled greenfield expressways designed to IRC:SP:99:2024 standards.",
    "Advancing more than 470 km of greenfield six-lane expressway development across Uttar Pradesh's expressway network."
  ),
  project(
    "leh-bypass-pmc", "Project Management Consultancy including Design for the 82 km Leh Bypass",
    "Roads, Bridges, Highways & Tunnels", "roads-highways", "Ongoing", "Leh, Ladakh, India",
    "Project Management Consultancy including Design", "NHIDCL", images.roads,
    "AGICL is providing Project Management Consultancy including design for the construction of the 82 km Leh Bypass, including land acquisition support and utility shifting, developing a four-lane bypass linking NH-1 and NH-3 around Leh.",
    "Improving regional connectivity around Leh through a new four-lane bypass linking NH-1 and NH-3.",
    "Leh, India"
  ),
  project(
    "tharthri-dpr", "Detailed Project Report for Tharthri–Kilhotran",
    "Roads, Bridges, Highways & Tunnels", "roads-highways", "Completed", "Jammu & Kashmir, India",
    "Detailed Project Report (DPR) Consultant", "NHIDCL", images.roads,
    "AGICL prepared the Detailed Project Report for the Tharthri–Kilhotran stretch for NHIDCL, valued at ₹4,065 Cr — AGICL's largest single DPR assignment.",
    "Delivered AGICL's largest single DPR assignment to date, supporting NHIDCL's road development planning in Jammu & Kashmir."
  ),
  project(
    "bhalsar-ramnagar-ppp", "73.6 km Bhalsar–Ramnagar PPP Road Corridor",
    "Roads, Bridges, Highways & Tunnels", "roads-highways", "Completed", "Uttar Pradesh, India",
    "PPP Structuring & DPR Consultant", "UPSHA", images.roads,
    "AGICL supported the 73.6 km Bhalsar–Ramnagar corridor for UPSHA — AGICL's longest PPP road corridor assignment, valued at ₹1,978 Cr.",
    "Delivered AGICL's longest PPP road corridor to date, supporting UPSHA's public-private road development in Uttar Pradesh."
  ),
  project(
    "mp-jal-nigam-dpr-schemes", "Detailed Project Reports for 5 Madhya Pradesh Jal Nigam Water Supply Schemes (A19, A29/30, A41, A42, A82)",
    "Water & Irrigation", "water-irrigation", "Completed", "Madhya Pradesh, India",
    "Detailed Project Report (DPR) Consultant", "Madhya Pradesh Jal Nigam", images.water,
    "AGICL prepared Detailed Project Reports — including surveys, investigations, hydraulic and structural design, detailed engineering, drawings and cost estimates — for 5 Madhya Pradesh Jal Nigam rural water supply schemes (A19, A29/30, A41, A42, A82) valued at ₹7,997 Cr, designed to deliver sustainable piped drinking water through Functional Household Tap Connections (FHTCs).",
    "AGICL's single largest water-sector engagement, enabling Functional Household Tap Connections across multiple districts of Madhya Pradesh."
  ),
  project(
    "kosi-river-barrage-modelling", "Kosi River & Barrage Physical Modelling and O&M",
    "Water & Irrigation", "water-irrigation", "Ongoing", "Bihar, India",
    "Operation & Maintenance Consultant", "Bihar Water Resources Department (WRD)", images.water,
    "AGICL is providing Operation & Maintenance consultancy including physical modelling of the Kosi River and Barrage for the Bihar Water Resources Department, valued at ₹1,000 Cr.",
    "Supporting flood management and barrage operations on the Kosi River for the Government of Bihar."
  ),
  project(
    "assam-resilient-rural-bridges", "Assam Resilient Rural Bridges Program (ARRBP)",
    "Roads, Bridges, Highways & Tunnels", "roads-highways", "Ongoing", "Assam, India",
    "Program Management Consultancy (PMC)", "Government of Assam PWD (World Bank-funded)", images.roads,
    "AGICL is providing Program Management Consultancy for the World Bank-funded Assam Resilient Rural Bridges Program, covering approximately 1,100 bridges across 44,600 km of rural roads implemented by the Assam Public Works Road Department, valued at ₹4,706 Cr.",
    "Strengthening rural connectivity across Assam through climate-resilient bridge construction and rehabilitation spanning roughly 1,100 bridges."
  ),
  project(
    "tuda-integrated-urban-infrastructure", "Integrated Urban Infrastructure Development, Tripura",
    "Urban Infrastructure", "urban-infrastructure", "Ongoing", "Tripura, India",
    "Project Design & Management Consultant (PDMC)", "Tripura Urban Development Authority (TUDA), ADB-funded", images.smart,
    "AGICL is engaged as Project Design and Management Consultant for integrated urban infrastructure development in Tripura for TUDA, encompassing water supply, storm water drainage, wastewater and septage management, urban roads and public amenities under Project Readiness Financing — an ADB (Asian Development Bank) funded project valued at ₹2,300 Cr.",
    "Advancing integrated, ADB-funded urban infrastructure readiness across Tripura's water, drainage, wastewater and road networks."
  ),
  project(
    "zambia-oprc-technical-audit", "Technical Audit of OPRC Contracts for Improved Rural Connectivity",
    "Roads, Bridges, Highways & Tunnels", "roads-highways", "Ongoing", "Zambia",
    "Technical Auditor (in consortium with KCM Green Zambia)", "National Road Fund Agency, Zambia (World Bank-funded)", images.roads,
    "AGICL, in consortium with KCM Green Zambia, is providing Technical Audit Services for the World Bank-assisted Output and Performance-Based Road Contracts (OPRC) covering approximately 4,300 km of rural roads in Zambia, valued at ₹1,863 Cr, ensuring quality, compliance and performance throughout implementation.",
    "AGICL's flagship international assignment, auditing quality and performance across 4,300 km of rural road contracts in Zambia.",
    "Zambia"
  ),
  project(
    "avaada-renewable-energy-asm", "Agency for Specialised Monitoring — Avaada Electro & Avaada Sunrise Energy",
    "Renewable Energy", "renewable-energy", "Ongoing", "Gujarat, India",
    "Agency for Specialised Monitoring (ASM)", "Avaada Electro Pvt. Ltd. / Avaada Sunrise Energy Pvt. Ltd.", images.finance,
    "AGICL is providing Agency for Specialised Monitoring services for Avaada Electro's Solar Cell & Module Manufacturing facility (₹5,193 Cr) and Avaada Sunrise Energy's 580 MW solar power project in Gujarat (₹2,900 Cr), delivering independent lender-side monitoring across both assignments.",
    "Providing independent lender monitoring across two of India's largest solar manufacturing and generation assignments."
  ),
  project(
    "jiribam-imphal-railway", "New Broad Gauge Line, Jiribam–Imphal",
    "Railways & Metro Rail", "railways-metro", "Ongoing", "Assam & Manipur, India",
    "General Consultant, Dy. CE/CON/Jiribam (Silchar & Imphal)", "North Frontier Railway", images.rail,
    "AGICL is appointed General Consultant for the office of Dy. CE/CON/Jiribam at Silchar & Imphal for North Frontier Railway, in connection with construction of the new Broad Gauge line from Jiribam to Imphal — associated with the ₹22,500+ Crore Jiribam–Imphal New Broad Gauge Line, one of India's most strategic railway connectivity projects linking Assam and Manipur.",
    "Supporting construction consultancy on one of India's most strategic new railway lines, connecting Assam and Manipur."
  ),
  project(
    "gnhcp-highway-rehabilitation", "Technical Audit Consultancy — Green National Highways Corridor Project (GNHCP) & NHIIP",
    "Roads, Bridges, Highways & Tunnels", "roads-highways", "Ongoing", "Rajasthan, Himachal Pradesh, Uttar Pradesh & Andhra Pradesh, India",
    "Technical Audit Consultant", "World Bank-funded (National Highways Authority of India)", images.roads,
    "AGICL is delivering Technical Audit Consultancy services for World Bank-funded National Highway projects under the Green National Highways Corridor Project (GNHCP) and NHIIP, covering highway rehabilitation and upgradation works across Rajasthan, Himachal Pradesh, Uttar Pradesh and Andhra Pradesh, valued at ₹7,662 Cr.",
    "Auditing quality, safety and environmental sustainability across a ₹7,662 Cr multi-state highway rehabilitation programme."
  )
];
