// Actual site photographs supplied by the client for three ongoing assignments
// (folder "RP - Project Photograph": Bihar Kosi / TUDA / WASH). They replace the
// generic stock imagery for those three projects only; every other project keeps
// its existing image. Per project: `image` (card) + `detailImage` (dialog photo)
// + `gallery` — up to three *distinct*, text-free "Site Photographs" (any frame
// still carrying a burned-in "GPS Map Camera" / WhatsApp stamp is left out).
// See Project_Photograph_Image_Mapping.md for the full rationale.
import kosiPhoto01 from '../images/projects/kosi-01-barrage-guide-bunds.jpeg';
import kosiPhoto03 from '../images/projects/kosi-03-tail-gate-krm.jpeg';
import kosiPhoto05 from '../images/projects/kosi-05-wrd-officials-meeting.jpeg';
import kosiPhoto06 from '../images/projects/kosi-06-wrd-felicitation.jpeg';
import tudaPhoto01 from '../images/projects/tuda-01-ohr-750kl-mohanpur.jpeg';
import tudaPhoto03 from '../images/projects/tuda-03-chobimura-site-visit-dm.jpeg';
import tudaPhoto05 from '../images/projects/tuda-05-chabimura-tourism-minister-visit.jpeg';
import tudaPhoto06 from '../images/projects/tuda-06-adb-mission-chabimura.jpeg';
import tudaPhoto07 from '../images/projects/tuda-07-adb-mission-ttdcl-chabimura.jpeg';
import washPhoto01 from '../images/projects/wash-01-cleanliness-drive.jpg';
import washPhoto02 from '../images/projects/wash-02-independence-day-cleanliness-sepahijala.jpg';
import washPhoto03 from '../images/projects/wash-03-block-level-orientation-swm-rules.jpeg';
import washPhoto06 from '../images/projects/wash-06-community-sanitary-complex-jubrajnagar.jpeg';
// Railways & Metro Rail site photographs supplied by the client
// ("Railway Project details and photographs.docx"). Ten ongoing railway
// assignments; each project keeps only its OWN site photos — card `image`,
// dialog `detailImage`, and up to three `gallery` frames — in the exact order
// they appear under that project's heading in the source document. No photo is
// shared between two projects.
import railDduPssaFobRampImage from '../images/projects/rail-ddu-pssa-01-fob-ramp-steel-beam-durgauti.jpg';
import railDduPssaPfShedImage from '../images/projects/rail-ddu-pssa-02-pf-shed-sheet-fixing-haidar-nagar.jpg';
import railDduGcRampFoundationImage from '../images/projects/rail-ddu-gc-01-ramp-foundation-steel-binding-bhabhua-road.jpg';
import railDduGcFobArchImage from '../images/projects/rail-ddu-gc-02-fob-arch-fixing-bhabhua-road.jpg';
import railRatlamFootingImage from '../images/projects/rail-ratlam-pssa-01-footing-concrete-works.jpg';
import railRatlamMajorBridgeImage from '../images/projects/rail-ratlam-pssa-02-major-bridge-construction.jpg';
import railRatlamDeckSlabImage from '../images/projects/rail-ratlam-pssa-03-deck-slab-concreting.jpg';
import railVijayawadaGunadalaImage from '../images/projects/rail-vijayawada-pssa-01-platform-shelter-gunadala.jpg';
import railVijayawadaGudivadaImage from '../images/projects/rail-vijayawada-pssa-02-platform-shelter-gudivada.jpg';
import railVijayawadaMachilipatnamImage from '../images/projects/rail-vijayawada-pssa-03-station-building-machilipatnam.jpg';
import railTindivanamFootingImage from '../images/projects/rail-tindivanam-nagari-01-bridge-footing-steel-checking.jpg';
import railTindivanamCompactionImage from '../images/projects/rail-tindivanam-nagari-02-subgrade-compaction-rollers.jpg';
import railTindivanamWallReinfImage from '../images/projects/rail-tindivanam-nagari-03-wall-reinforcement-shuttering.jpg';
import railBhopalKotaPedestalImage from '../images/projects/rail-bhopal-kota-scada-01-fob-pedestal-concreting.jpg';
import railBhopalKotaCableImage from '../images/projects/rail-bhopal-kota-scada-02-signal-telecom-cable-marking.jpg';
import railHyderabadStaircaseImage from '../images/projects/rail-hyderabad-pssa-01-pf-staircase-ms-sheet-placement.jpg';
import railHyderabadPccAImage from '../images/projects/rail-hyderabad-pssa-02-foundation-pcc-laying-a.jpg';
import railHyderabadPccBImage from '../images/projects/rail-hyderabad-pssa-03-foundation-pcc-laying-b.jpg';
import railMysuruQuartersImage from '../images/projects/rail-mysuru-pms-01-railway-quarters.jpg';
import railMysuruServiceBuildingImage from '../images/projects/rail-mysuru-pms-02-service-building.jpg';
import railJiribamStationImage from '../images/projects/rail-jiribam-imphal-01-completed-station-hill-section.jpg';
import railJiribamTunnelLiningImage from '../images/projects/rail-jiribam-imphal-02-tunnel-lining-works.jpg';
import railJiribamViaductPiersImage from '../images/projects/rail-jiribam-imphal-03-viaduct-piers.jpg';
import railJiribamTunnelPortalImage from '../images/projects/rail-jiribam-imphal-04-tunnel-portal-works.jpg';
import railGoddaRmcFoundationImage from '../images/projects/rail-godda-mahagama-01-rmc-plant-foundation.jpg';
import railGoddaSiteClearanceImage from '../images/projects/rail-godda-mahagama-02-site-clearance-levelling.jpg';
import gisSurveyMappingImage from '../images/services-survey-investigation-testing.png';
import himachalHillTownImage from '../images/himachal-ropeway.jpg';
import agraTransitTodImage from '../images/sector-railways.jpg';
import usedWaterTreatmentImage from '../images/water-treatment-banner.jpg';
import municipalFinanceImage from '../images/financial-advisory-desk.png';
import drainageDprImage from '../images/services-dpr-preparation.png';
import drainageFeasibilityImage from '../images/services-feasibility-studies.jpg';
import cityMasterPlanImage from '../images/sector-urban.jpg';
import solidWasteFieldImage from '../images/sit-field-testing.png';
import consultantEmpanelmentImage from '../images/services-assurance-services.png';
import dholeraSupervisionImage from '../images/services-engineering-design-supervision.png';
import natureBasedPmcImage from '../images/services-pmc.png';

// `detailImage` is an optional second photograph shown in the project details
// dialog (distinct from the card `image`). `imagePosition` is an optional CSS
// `object-position` value (e.g. "center 30%") applied to the card / modal photo
// so a tall subject isn't cropped through the middle by the wide card banner.
// The trailing optional fields
// (authorityEngineer … commercialOperationDate) carry supervision-assignment
// specifics; they render as extra rows in the project details dialog and are
// simply absent on projects that don't set them.
export interface Project { id: string; title: string; slug: string; sector: string; sectorSlug: string; status: "Recently Awarded" | "Ongoing" | "Completed"; location: string; coordinates: string; image: string; detailImage?: string; gallery?: string[]; imagePosition?: string; youtubeUrl?: string; role: string; client: string; description: string; impact: string; servicesProvided: string[]; authorityEngineer?: string; contractor?: string; totalLength?: string; totalCost?: string; physicalProgress?: string; financialProgress?: string; commercialOperationDate?: string; }

// Project records below are sourced from the client's project brief workbook
// ("Prject breif details _04092026.xlsx" / Project_Brief_Details_04092026.md).
// Field mapping: Project Name -> title; Client Name -> client; Consultancy Fee
// exclusive GST -> totalCost; Scope of Work stages -> servicesProvided (shown as
// "Scope of Services"); Brief Description -> description; Project Status ->
// status. "Date of Commencement" and the sheet's Monthly/Milestone notes have no
// dedicated field, so they are preserved in the `impact` text. Every project uses
// a distinct image (no image is shared between two projects).
export const PROJECTS: Project[] = [
  {
    id: "tripura-state-district-wash-pmu",
    title: `Establishment of State WASH Programme Management Unit (STATE WASH PMU) and District WASH Programme Management Units (DISTRICT WASH PMUs) in each of 8(Eight) District in Tripura under PWD (DWS)`,
    slug: "tripura-state-district-wash-pmu",
    sector: "Water & Irrigation",
    sectorSlug: "water-irrigation",
    status: "Ongoing",
    location: "Tripura, India",
    coordinates: "India",
    image: washPhoto06,
    detailImage: washPhoto03,
    gallery: [washPhoto01, washPhoto02],
    // Keep the crew's faces and the sanitary-complex building in frame on the
    // wide card banner (the bottom caption strip is cropped out).
    imagePosition: "center 42%",
    role: `State & District WASH Programme Management Units (PMU)`,
    client: `DWS, Reg. Division`,
    description: `The WASH Project, Tripura focuses on improving Water, Sanitation and Hygiene services across the state. The project supports urban and rural local bodies in planning, implementing and monitoring sanitation and waste-management initiatives, including: • Solid Waste Management (SWM)  • Liquid Waste Management (LWM)  • Plastic Waste Management (PWM)  • Faecal Sludge Management (FSM)  • Water supply and sanitation improvement  • Preparation of surveys, assessments, DPRs, plans and strategies  • Technical support, capacity building and monitoring of WASH activities  • Coordination with State/District WASH PMUs, ULBs, Gram Panchayats and other stakeholders The project aims to strengthen sanitation infrastructure and services and improve overall public health, hygiene and environmental cleanliness in Tripura.`,
    impact: `Strengthening Water, Sanitation and Hygiene (WASH) service delivery across eight districts of Tripura through State and District WASH Programme Management Units. Date of Commencement: 27-03-2024. Monthly/Milestone (from the source brief): Till Sept 2025; MPR Sept-25 submitted.`,
    totalCost: "₹13,06,01,060 (exclusive of GST)",
    servicesProvided: [
      `The State WASH PMU is responsible for:`,
      `1 Planning and monitoring SWM, LWM, PWM and FSM initiatives across the State.`,
      `2.Reviewing and monitoring DPR preparation and implementation by District WASH PMUs.`,
      `3.Conducting field visits and resolving implementation issues at Block, GP and village levels.`,
      `4.Recommending socially acceptable and environmentally safe technologies.`,
      `5.Monitoring ODF Plus villages and supporting GOBARDHAN projects.`,
      `6.Ensuring convergence of JJM, SBM(G), MGNREGA and 15th FC grants.`,
      `7.Supporting IEC/BCC, training and capacity-building activities.`,
      `8.Coordinating with Government departments, NGOs and civil society organisations.`,
      `9.Monitoring ISA activities under JJM and ensuring regular data updates.`,
      `10.Participating in State/Government of India review and knowledge-sharing meetings.`,
      `11.Providing technical clarification and undertaking other assignments as directed.`,
      `The District WASH PMU will be responsible for`,
      `1.Survey and assessment for SWM, LWM, PWM and FSM projects.`,
      `2.Preparation and monitoring of DPRs in consultation with DWSM, GPs, VCs and stakeholders.`,
      `3.Planning and strategy for sanitation and waste-management initiatives.`,
      `4.Field supervision and resolving implementation issues.`,
      `5.Development of safe and suitable technologies for waste and sanitation management.`,
      `6.Monitoring ODF Plus villages and related activities.`,
      `7.Coordination/convergence among JJM, SBM(G), MGNREGA and other schemes.`,
      `8.Training and capacity building of communities.`,
      `9.Coordination with government departments, NGOs and consultants.`,
      `10.Monitoring ISA activities and updating WASH-related data.`,
      `11.Participation in review and knowledge-sharing meetings.`,
      `12.Performing other assignments given by the competent authority.`
    ]
  },
  {
    id: "tripura-tutdp-pmsc",
    title: `Recruitment of consulting firm as PMSC Tripura Urban and Tourism Development Project (TUTDP) Loan number 4375-IND in Tripura`,
    slug: "tripura-tutdp-pmsc",
    sector: "Urban Infrastructure",
    sectorSlug: "urban-infrastructure",
    status: "Ongoing",
    location: "Tripura, India",
    coordinates: "India",
    image: tudaPhoto01,
    detailImage: tudaPhoto06,
    gallery: [tudaPhoto03, tudaPhoto05, tudaPhoto07],
    role: `Project Management & Supervision Consultant (PMSC)`,
    client: `Tripura Urban Planning & Development Authority (TUDA), Urban Development Department, Government of Tripura`,
    description: `The Tripura Urban and Tourism Development Project (TUTDP) is an ADB-assisted project of the Government of Tripura aimed at improving urban infrastructure, municipal services, and tourism facilities across the state. The project focuses on 12 Urban Local Bodies (ULBs), with investments in water supply, roads, storm-water drainage, climate-resilient infrastructure, and improved urban service delivery.  The tourism component focuses on upgrading selected tourist destinations, improving visitor facilities, and strengthening the capacity of Tripura Tourism Development Corporation Limited (TTDCL) through tourism planning, business planning, and marketing strategies.  The Project Management & Supervision Consultant (PMSC) provides technical and management support to the Project Management Unit (PMU) and Project Implementation Units (PIUs) for effective project implementation, including procurement, contract management, design/DPR review, construction supervision, safeguards, quality control, monitoring, reporting, and institutional capacity building Project Management & Supervision Consultancy (PMSC) for the ADB-assisted Tripura Urban & Tourism Development Project (TUTDP), supporting the Government of Tripura in implementation of urban infrastructure and tourism development initiatives, including water supply, roads, storm-water drainage, climate-resilient infrastructure, municipal services, tourism destination development, procurement, contract management, supervision, safeguards, and institutional capacity building.`,
    impact: `Project Management & Supervision Consultancy for the ADB-assisted Tripura Urban and Tourism Development Project across 12 Urban Local Bodies. Date of Commencement: 01-07-2024. Monthly/Milestone (from the source brief): Till Sept-2025; NA.`,
    totalCost: "₹6,86,47,797 (exclusive of GST)",
    servicesProvided: [
      `Task 1- Project Management:-`,
      `Inception Report,PRMES & QAP,MIS, Mid Term Report, Final Report,Monthly Report, Quarterly Report, Breif Reports,PCR,Specific reports for propsed for loan Documents`,
      `Task-2-Contract Management & Construction Supervision:-`,
      `Construction supervisison Manual, Health & Safety Manual,Monthly Progress Report,Annual Progress Report,Health & Safety Reports,Claims Report,Tender Documents, Special Reports,Environmental Monitoring Reports`,
      `Task-3-Management of Environmental and Social Impacts:-`,
      `Social,Gender & Greivnanace Monitoring & Evaluation Reports, Financial Management & Evaluation Reports,Updating communications and strategy plan.`,
      `Task -4- Communication:-`,
      `Website, Video Presentation,Contract completion Reports`,
      `Task- 5-Commissioning, Operation and Defects Liability:-`,
      `Certificate & Final Reports.`
    ]
  },
  {
    id: "kosi-river-barrage-physical-modelling",
    title: `Fabrication of Model Trays, Running, Simulation, O & M for 5 years of Kosi River & Kosi Barrage models at physical modelling centre (PMC), Centre of Excellence (COE), Birpur, Supaul (Bihar)`,
    slug: "kosi-river-barrage-physical-modelling",
    sector: "Water & Irrigation",
    sectorSlug: "water-irrigation",
    status: "Ongoing",
    location: "Birpur, Supaul, Bihar, India",
    coordinates: "India",
    image: kosiPhoto01,
    detailImage: kosiPhoto03,
    gallery: [kosiPhoto05, kosiPhoto06],
    role: `Fabrication, Simulation & 5-Year O&M Consultant`,
    client: `Water Resource Department (Govt. of Bihar)`,
    description: `The project involves fabrication, operation, hydraulic simulation, and maintenance of physical models of the Kosi River and Kosi Barrage at the Physical Modelling Centre (PMC), Centre of Excellence (COE), Birpur, Supaul, Bihar. The models will be used to study river flow, sediment behaviour, barrage hydraulics, flood management, and related hydraulic conditions. The scope also includes operation and maintenance (O&M) of the physical models for five years to support technical studies and informed decision-making for effective management of the Kosi River and Barrage.`,
    impact: `Physical modelling and five-year O&M of the Kosi River and Kosi Barrage models to support flood management and barrage operations for the Government of Bihar. Date of Commencement: 03-01-2025.`,
    totalCost: "₹11,14,93,800 (exclusive of GST)",
    servicesProvided: [
      `Stage 1-Design Report`,
      `Stage-2-Fabrication work Phase-1`,
      `Stage-3-Fabrication work Phase-2`,
      `Stage-4-Staff Deployment Schedule-includingTechnical & Non Technical support staff deployment schedule during running the model for Validation and trail runs for the period of 03 Months (Part -B) as described in Appendix-A in (TOR)`,
      `Stage5- O & M Period`
    ]
  },
  {
    id: "amritsar-cluster-gis-master-plans",
    title: `FORMULATION OF GIS BASED MASTER PLANS CUM ZONAL DEVELOPMENT PLANS OF TOWNS IN AMRITSAR CLUSTER`,
    slug: "amritsar-cluster-gis-master-plans",
    sector: "Urban Infrastructure",
    sectorSlug: "urban-infrastructure",
    status: "Ongoing",
    location: "Amritsar Cluster, Punjab, India",
    coordinates: "India",
    image: gisSurveyMappingImage,
    role: `GIS-based Master Plan cum Zonal Development Plan Consultant`,
    client: `Not specified in the source brief`,
    description: `The project involves the preparation of GIS-based Master Plans-cum-Zonal Development Plans for towns in the Amritsar Cluster. The assignment focuses on GIS-based spatial planning, land-use analysis, infrastructure assessment, zoning, and identification of future development areas to support planned, sustainable, and orderly urban growth of the towns.`,
    impact: `GIS-based Master Plans-cum-Zonal Development Plans for towns in the Amritsar Cluster to guide planned, sustainable and orderly urban growth. Date of Commencement: 06-03-2026.`,
    totalCost: "₹6,66,58,046 (exclusive of GST)",
    servicesProvided: [
      `Stage-1-a) Submission of Inception Report`,
      `b) Setting up of Site Office`,
      `Stage-2-Approval of Stage prescribed at S. No (i)`,
      `Stage-3-a) Submission of Drone Mapping & Image Processing`,
      `b) Submission of Report on Assessment of existing physical developments, traffic surveys, socio economic surveys, trend of ground, level of existing infrastructure`,
      `Stage-4-Approval of Stage prescribed at S. No (iii)`,
      `Stage-5-a) Submission of ELU & Revenue Plan`,
      `b) Updation of ELU, ground truthing, verification by concerned DTP office and approval of final ELU & Revenue Plan (including superimposition of cadastral layer on ELU)`,
      `c) Submission of Data analysis: Potentials and limitations`,
      `Stage-6-Approval of Stage prescribed at S. No (v)`,
      `Stage-7-a) Submission of Vision and Objectives & Concept Plan`,
      `b) Submission of Draft Master Plan cum Zonal Development Plan & Proposed Strategies including draft Report (as per Section 5 Scope of Work)`,
      `Stage-9-Approval of Stage prescribed at S. No (vii)`,
      `Stage-10-Submission of Final Master Plan cum Zonal Development Plan including Final Report (as per Section 5 Scope of Work)`,
      `Stage-11-Approval of Stage prescribed at S. No. (ix)`
    ]
  },
  {
    id: "himachal-gis-master-plan-nahan-chamba",
    title: `Himanchal GIS Based Master Plan- Nahan & Chamba`,
    slug: "himachal-gis-master-plan-nahan-chamba",
    sector: "Urban Infrastructure",
    sectorSlug: "urban-infrastructure",
    status: "Ongoing",
    location: "Nahan & Chamba, Himachal Pradesh, India",
    coordinates: "India",
    image: himachalHillTownImage,
    role: `GIS-based Master Plan Consultant`,
    client: `State Town and Country Planning Department in coordination with AMRUT State Mission Directorate`,
    description: `The project for the Preparation of GIS-Based Master Plans for Nahan and Chamba involves engaging urban planning and geospatial consultants by the Town and Country Planning (TCP) Department, Himachal Pradesh, to formulate long-term, technology-driven spatial development frameworks for these key historic and administrative towns.  The project brief is outlined below: • Primary Objective: Transition from traditional planning to a digital, high-resolution GIS platform to regulate urban growth, manage eco-sensitive hill terrains, and guide organized spatial and socio-economic development for the horizon year. • Key Scope of Work: o Geospatial Base Map Creation: o Sectoral & Demographic Analysis: o Proposed Land Use & Zoning:  o Utilities & Infrastructure Integration:  Provide local urban bodies and planning authorities with a single source of spatial truth, ensuring streamlined building permissions, disaster-resilient infrastructure, and sustainable urban expansion in Chamba and Nahan.`,
    impact: `GIS-based Master Plans for the hill towns of Nahan and Chamba, moving Himachal Pradesh's Town and Country Planning onto a digital, high-resolution GIS platform. Date of Commencement: 10-07-2025.`,
    totalCost: "₹38,15,450 (exclusive of GST)",
    servicesProvided: [
      `Stage-1-Inception Report`,
      `Stage-2-Socio-economic data collection and analysis`,
      `Stage-3-Spatial attribute data collection and vetting of Base Maps`,
      `Stage-4-Projected Requirements, Issues,Potentials and proposal`,
      `Stage-5-Draft Master Plan`,
      `Stage-6- Final Master Plan`
    ]
  },
  {
    id: "agra-tod-zonal-development-plans",
    title: `Appointment of consultants for Preparation of Zonal Development Plans for the TOD Zones falling with in Agra Development Area.`,
    slug: "agra-tod-zonal-development-plans",
    sector: "Urban Infrastructure",
    sectorSlug: "urban-infrastructure",
    status: "Ongoing",
    location: "Agra, Uttar Pradesh, India",
    coordinates: "India",
    image: agraTransitTodImage,
    role: `Zonal Development Plan Consultant (TOD Zones)`,
    client: `AGRA Development Aunthority`,
    description: `This project focuses on engaging external urban planning consultancies to formulate detailed Zonal Development Plans (ZDPs) for designated Transit-Oriented Development (TOD) Zones within the jurisdiction of the Agra Development Authority (ADA). The project details are structured as follows: • Primary Objective: Prepare actionable, localized development schemes that operationalize the broad vision of the Agra Master Plan. The plans aim to optimize land use, maximize density, and enhance multi-modal connectivity along Agra's key transit nodes and corridors (such as the Agra Metro lines).  Town and Country Planning • Scope of Work: o Detailed Land Use & Zoning: Delineating specific land-use zones, high-density mixed-use developments, and active public spaces around transit hubs.  o Transit & Infrastructure Integration: Integrating pedestrian walkways, non-motorized transport (NMT) networks, last-mile feeder services, and physical infrastructure surrounding transit stops. o Urban Design & Local Area Plans: Establishing building height/FAR incentives, streetscape guidelines, and development controls customized for the TOD influence area.  o Implementation Strategy: Developing phasing schedules, cost estimates, and institutional/financial frameworks for public-private partnerships (PPP) or land-pooling schemes.  • Promote sustainable urban growth, reduce traffic congestion, improve public transit ridership, and foster commercial and residential development surrounding transit infrastructure in Agra.`,
    impact: `Zonal Development Plans for the Transit-Oriented Development (TOD) Zones of the Agra Development Area to optimise land use and multi-modal connectivity. Date of Commencement: 26-06-2024. Monthly/Milestone (from the source brief): Stage-1-5%inception stage submission & approval of Inception Report. Stage-2-Survey and study stage-5% of total fee Stage-3-Demand Assessment & Vissioning stage.(5% of Total fee); Stage-4-Conceptual plan & proposal stage (15% of total fee).`,
    totalCost: "₹1,36,00,000 (exclusive of GST)",
    servicesProvided: [
      `Stage-1-inception stage submission & approval of Inception Report.`,
      `Stage-2-Survey and study stage`,
      `Stage-3-Demand Assessment & Vissioning stage.`,
      `Stage-4-Conceptual plan & proposal stage`,
      `Stage-5-Draft Zonal development plan stage-I`,
      `Stage-6-Draft Zonal development plan stage-II`,
      `Stage-7-Plan,Approval & Final Submission`
    ]
  },
  {
    id: "assam-used-water-management-dprs",
    title: `Preparation of DPRs on Used Water Management  Project`,
    slug: "assam-used-water-management-dprs",
    sector: "Water & Irrigation",
    sectorSlug: "water-irrigation",
    status: "Ongoing",
    location: "Assam, India",
    coordinates: "India",
    image: usedWaterTreatmentImage,
    role: `DPR Consultant – Used Water Management`,
    client: `Swachh Bharat Mission(U), Assam,`,
    description: `Preparation of Detailed Project Reports (DPRs) for Used Water Management projects in Urban Local Bodies (ULBs) of Assam, covering assessment of wastewater generation, treatment requirements, and development of suitable STP/FSTP and soak-pit systems, along with interception, diversion, and reuse of treated wastewater. The DPRs are aimed at providing sustainable and cost-effective wastewater management solutions under Swachh Bharat Mission–Urban 2.0.`,
    impact: `Detailed Project Reports for Used Water Management in Urban Local Bodies of Assam under Swachh Bharat Mission–Urban 2.0. Date of Commencement: 20-02-2026.`,
    totalCost: "₹40,09,322 (exclusive of GST)",
    servicesProvided: [
      `Design Phase:`,
      `Stage 1-On submission of feasibility report with all details including survey and investigation as required and submission of base plan with existing details and on acceptance of the same`,
      `Stage 2-On submission of draft DPR in single copy`,
      `Stage 3-On submission of the final DPR incorporating the necessary suggestions and recommendations`,
      `Stage 4-On approval of DPR in the SLTC`,
      `Procurement Phase:`,
      `Stage-1-Submission of Detailed Tender Paper - Invitation of Bid and BOQ`,
      `Stage-2-On issuance of Work Order to implementing agency`
    ]
  },
  {
    id: "wbmdft-project-development-company",
    title: `Project Development Company for West Bengal Municipal Development Fund Trust`,
    slug: "wbmdft-project-development-company",
    sector: "Urban Infrastructure",
    sectorSlug: "urban-infrastructure",
    status: "Ongoing",
    location: "West Bengal, India",
    coordinates: "India",
    image: municipalFinanceImage,
    role: `Project Development Company (PDC)`,
    client: `West Bengal Municipal Development Fund Trust (WBMDFT)`,
    description: `The engagement of a Project Development Company (PDC) for the West Bengal Municipal Development Fund Trust (WBMDFT)—operating under the Urban Development and Municipal Affairs Department, Government of West Bengal—is designed to provide end-to-end technical, managerial, and financial assistance to Urban Local Bodies (ULBs) for executing municipal infrastructure projects. The  scope of work for the Project Development Company is given  below: 1. Project Identification & Feasibility Assessment 2.Preparation of Detailed Project Reports (DPRs) 3. Transaction Advisory & Bid Management 4.Financial Structuring & Fund Mobilization 5.Project Management & Quality Assurance`,
    impact: `Project Development Company providing technical, legal, financial and secretarial support to the West Bengal Municipal Development Fund Trust and its Urban Local Bodies. Date of Commencement: 23-09-2020.`,
    totalCost: "₹36,00,000 (exclusive of GST)",
    servicesProvided: [
      `A. Requirement for Technical Function:`,
      `1.The PDC will provide technical, legal and financial expertise for developing/formulating bankable urban infrastructure projects & Public Private Partnership (PPP) Projects.`,
      `2.Long(er) Tenure, Low(er) Cost Debt:`,
      `The PDC will appraise the schemes submitted by the ULBs/ DAs for accessing such fund and`,
      `prepare the viability report. The PDC will also carry out monitoring through the implementation of the projects.`,
      `3.PDC will prepare DPR for project other than GoI sponsored schemes of the ULBs/ Development Authorities as and when requested by WBMDFT.`,
      `4.PDC will prepare Project Information Memorandum (PIM) along with estimate and technical design & financial statement along with appraisal of these schemes mentioned at (iv) above prepared and submitted by the ULBs for loan funding from WBMDFT.`,
      `5.PDC will make recommendation to WBMDFT for release of subsequent installments of loan to sanctioned Projects of ULBs after physical inspection of the project status`,
      `6.PDC will prepare Draft Loan Agreement for the non JNNURM project of ULBs as per terms and condition of sanction of loan by WBMDFT as intimated from time to time.`,
      `7.Preparation of Scheme Bank: The PDC will support the ULBs to prepare their scheme bank.`,
      `8.The PDC will act as the technical resource/ support cell of WBMDFT.`,
      `B.Requirement for Secretarial Function:`,
      `1.The support staff provided by the PDC shall be at the full disposal of`,
      `Managing Trustee and would report to the Managing Trustee.`,
      `2.The PDC will provide support staff for works related to computer assistants,`,
      `Office Management & Attendants on contractual basis to the office of the`,
      `WBMDFT to carry out day to day functions of the Trust including secretarial`,
      `functions as & when required by the Managing Trustee.`
    ]
  },
  {
    id: "kmda-nabadwip-drainage-master-plan-dpr",
    title: `Preparation of Geographic information System (GIS) Based Comprehensive Drainage Master Plan and DPR Kolkata Metropolitan Development Authority- Nawadip`,
    slug: "kmda-nabadwip-drainage-master-plan-dpr",
    sector: "Water & Irrigation",
    sectorSlug: "water-irrigation",
    status: "Ongoing",
    location: "Nabadwip (Nadia), West Bengal, India",
    coordinates: "India",
    image: drainageDprImage,
    role: `GIS-based Comprehensive Drainage Master Plan & DPR Consultant`,
    client: `KOLKATA METROPOLITAN DEVELOPMENT AUTHORITY`,
    description: `Preparation of a GIS-based Comprehensive Drainage Master Plan and Detailed Project Report (DPR) for Nabadwip, focusing on drainage assessment, flood management, stormwater planning, and development of sustainable drainage infrastructure.`,
    impact: `GIS-based Comprehensive Drainage Master Plan and DPR for Nabadwip, covering drainage assessment, flood management and stormwater planning. Date of Commencement: 21-11-2023. Monthly/Milestone (from the source brief): Stage 5 -Submission of Inventory of existing situation including base map of the Existing Drainage Infrastructure and Condition assessment report of Existing Drainage infrastructure (8% of Total fee) Stage-7-Submission of Survey Report including GIS map and Database (05% of Total Fee) (50 days); Stage6- On approval of stage 5 & 7 (7%) Stage8- On the approval of Survey Report including GIS map and Database (10% of Total fee).`,
    totalCost: "₹67,75,424 (exclusive of GST)",
    servicesProvided: [
      `Stage-1- Inception Report`,
      `Stage-2- Design considerantion`,
      `Stage 3- Submission and correction (if needed) of Preliminary Feasibility Report (PFR) including recommendation for short-term and mid-term measures`,
      `Stage 4- On approval of corrected Preliminary Feasibility Report (PFR), that includes recommendation for short-term and mid term measures`,
      `Stage 5 -Submission of Inventory of existing situation including base map of the Existing Drainage Infrastructure and Condition assessment report of Existing Drainage infrastructure`,
      `Stage 6- On approval of stage 5 & 7`,
      `Stage-7-Submission of Survey Report including GIS map and Database`,
      `Stage8- On the approval of Survey Report including GIS map and Database`,
      `Stage-9-Issues in drainage System and recommendation to address issues`,
      `Stage10-Submission of Proposals with Map`,
      `Stage11-Submission of Draft Master Plan`,
      `Stage12- On the Aproval of Draft Master Plan-`,
      `Stage 13-Submission of Draft DPR`,
      `Stage14-On the approval of Draft DPR`,
      `Stage15-On submission of Final Master Plan`,
      `Stage16-On submission of Final detailed project Report`,
      `Stage17-On approval of Final Master plan and Final DPR by the competent authority in the department and external funding agency, as well`,
      `Stage18- On submission and approval of Bid Document(s)`,
      `Stage19-On selection of Contractor(s) as per guidelines of the External Funding Agency`
    ]
  },
  {
    id: "kmda-sonarpur-drainage-master-plan-dpr",
    title: `Preparation of Geographic information System (GIS) Based Comprehensive Drainage Master Plan and DPR Kolkata Metropolitan Development Authority- Sonarpur`,
    slug: "kmda-sonarpur-drainage-master-plan-dpr",
    sector: "Water & Irrigation",
    sectorSlug: "water-irrigation",
    status: "Ongoing",
    location: "Sonarpur, West Bengal, India",
    coordinates: "India",
    image: drainageFeasibilityImage,
    role: `GIS-based Comprehensive Drainage Master Plan & DPR Consultant`,
    client: `KOLKATA METROPOLITAN DEVELOPMENT AUTHORITY`,
    description: `Preparation of a GIS-based Comprehensive Drainage Master Plan and DPR for Sonarpur, covering assessment of the existing drainage system, identification of waterlogging and flood-prone areas, GIS-based drainage network planning, and development of priority infrastructure solutions for improved stormwater management.`,
    impact: `GIS-based Comprehensive Drainage Master Plan and DPR for Sonarpur, addressing waterlogging and flood-prone areas and priority stormwater infrastructure. Date of Commencement: 22-12-2023. Monthly/Milestone (from the source brief): Satge-3-On approval of corrected Preliminary Feasibility Report (PFR), that includes recommendation for short-term and midterm measures- (10% of Total Fee)-45 days; Stage 4-On approval of Inventory of existingsituation including base map of the Existing DrainageInfrastructure and Condition assessment report of Existing Drainage infrastructure (15% of Total Fee).`,
    totalCost: "₹1,02,29,661 (exclusive of GST)",
    servicesProvided: [
      `Stage-1- Inception Report`,
      `Stage-2- Design considerantion`,
      `Stage-3-On approval of Feasibility Report includingrecommendation for short term and Mid-term measure`,
      `Stage-4-On approval of Inventory of existingsituation including base map of the Existing Drainage Infrastructure and Condition assessment report of Existing Drainage infrastructure`,
      `Stage-5-On approval of Survey Report including GIS map and Database`,
      `Stage-6-Issues in drainage System and recommendation to address issues`,
      `Stage-7-Submission of Proposals with Map`,
      `Stage-7-On approval of Draft Master Plan`,
      `Stage-8-On approval of Draft Master Plan`,
      `Stage-9-On approval of Draft DPR`,
      `Stage-10-Final Master Plan`,
      `Stage-11- Final DPR`,
      `Stage-12-On approval of Master plan and DPR by the department`,
      `Stage-13-On approval of Master plan and DPR from external funding agency`,
      `Stage-14-On approval of Bid Document & selection of Contractor as per guideline of External Funding Agency`
    ]
  },
  {
    id: "up-amrut-gis-master-plan-formulation",
    title: `GIS-Based Master Plan Formulation (Class-1 city & metro city) of Uttar Pradesh under Amrut (Cities Under Regulated Area)`,
    slug: "up-amrut-gis-master-plan-formulation",
    sector: "Urban Infrastructure",
    sectorSlug: "urban-infrastructure",
    status: "Ongoing",
    location: "Uttar Pradesh, India",
    coordinates: "India",
    image: cityMasterPlanImage,
    role: `GIS-based Master Plan Formulation Consultant`,
    client: `State Mission Directorate., Government of Uttar Pradesh`,
    description: `Formulation of GIS-based Master Plans for Class-I and metropolitan cities in Uttar Pradesh under AMRUT, focusing on land-use planning, infrastructure development, urban growth management, and sustainable development within regulated areas.`,
    impact: `GIS-based Master Plans for Class-I and metropolitan cities in Uttar Pradesh under AMRUT within regulated areas. Date of Commencement: 10-06-2019.`,
    totalCost: "₹3,64,27,700 (exclusive of GST)",
    servicesProvided: [
      `Stage-1-Inception Report`,
      `Stage-2-a) Data collection & surveys by Consultant,`,
      `b) collection of attributes of spatial data`,
      `c) Ground truthing of NRSC's Data by Consultant`,
      `d) Vetting of Base map`,
      `Stage-3-a) Existing Land use plan`,
      `b) Data analysis report including generation of thematic maps, charts, diagrams, etc.`,
      `c) Identification of issues & potentials and Projected Requirements`,
      `Stage-4-a) Sajra Superimposition on the Base Map`,
      `b) Draft Proposals`,
      `c) Draft master plan`,
      `d) Appraisal of Draft Master Plan (Shaskiya Samiti)`,
      `e) Approval of DA Board for inviting Public Objections/ Suggestions`,
      `Stage-5- a) Hearing disposal of Public Objections/ Suggestions`,
      `b) Approval of Draft Master Plan (DA Board)`
    ]
  },

  // ---------------------------------------------------------------------------
  // Railways & Metro Rail — ten ongoing assignments from the client's
  // "Railway Project details and photographs.docx". Content (project name,
  // location, project value, brief) and site photographs are taken verbatim
  // from that document; nothing is shared between two projects.
  // ---------------------------------------------------------------------------
  {
    id: "ddu-pssa-gati-shakti-project-supervision",
    title: `DDU-PSSA – Project Supervision Services Agency for Gati Shakti DDU Unit`,
    slug: "ddu-pssa-gati-shakti-project-supervision",
    sector: "Railways & Metro Rail",
    sectorSlug: "railways-metro",
    status: "Ongoing",
    location: "Uttar Pradesh & Bihar, India",
    coordinates: "India",
    image: railDduPssaFobRampImage,
    detailImage: railDduPssaPfShedImage,
    role: `Project Supervision Services Agency (PSSA)`,
    client: `Gati Shakti Unit, DDU Division (Indian Railways)`,
    description: `The project involves providing Project Supervision Services for various railway infrastructure works including Station redevelopments under ABSS, Construction of FOBs, ROBs, RUBs under the Gati Shakti Unit, DDU Division.`,
    impact: `Ongoing project supervision assignment for railway infrastructure works under the Gati Shakti Unit, DDU Division, spanning sites across Uttar Pradesh and Bihar. Site activities in progress include FOB ramp steel beam shifting and welding works at Durgauti (DGO) station and platform-shed sheet fixing works at Haidar Nagar (HND) station.`,
    servicesProvided: [
      `Project Supervision Services for station redevelopment under the Amrit Bharat Station Scheme (ABSS)`,
      `Supervision of construction of Foot Over Bridges (FOBs), Road Over Bridges (ROBs) and Road Under Bridges (RUBs)`,
      `Coordination among contractors and railway authorities for efficient and timely execution of works`
    ]
  },
  {
    id: "ddu-gc-general-consultancy-gati-shakti",
    title: `DDU-GC – General Consultancy Services for Gati Shakti Units, East Central Railway, DDU Division`,
    slug: "ddu-gc-general-consultancy-gati-shakti",
    sector: "Railways & Metro Rail",
    sectorSlug: "railways-metro",
    status: "Ongoing",
    location: "Deen Dayal Upadhyaya Nagar, Uttar Pradesh, India",
    coordinates: "India",
    image: railDduGcRampFoundationImage,
    detailImage: railDduGcFobArchImage,
    role: `General Consultancy Services (GC)`,
    client: `East Central Railway – Gati Shakti Units, DDU Division`,
    description: `The project involves providing General Consultancy Services for railway infrastructure works under the Gati Shakti Units of East Central Railway, DDU Division. The scope includes technical review, site inspections, progress monitoring and quality assessment of ongoing works. The consultancy services support effective project coordination and implementation in accordance with approved technical requirements.`,
    impact: `Ongoing general consultancy assignment supporting railway infrastructure works under the Gati Shakti Units of East Central Railway, DDU Division. Current site activities include ramp foundation steel binding work and FOB arch fixing works at Bhabhua Road (BBU) station.`,
    servicesProvided: [
      `Technical review of railway infrastructure works under the Gati Shakti Units, DDU Division`,
      `Site inspections, progress monitoring and quality assessment of ongoing works`,
      `Project coordination and implementation support in accordance with approved technical requirements`
    ]
  },
  {
    id: "ratlam-pssa-gati-shakti-western-railway",
    title: `Ratlam-PSSA – Project Supervision Services for Various Construction Works, Gati Shakti Unit, Western Railway`,
    slug: "ratlam-pssa-gati-shakti-western-railway",
    sector: "Railways & Metro Rail",
    sectorSlug: "railways-metro",
    status: "Ongoing",
    location: "Ratlam, Madhya Pradesh, India",
    coordinates: "India",
    image: railRatlamFootingImage,
    detailImage: railRatlamMajorBridgeImage,
    gallery: [railRatlamDeckSlabImage],
    role: `Project Supervision Services Agency (PSSA)`,
    client: `Western Railway – Gati Shakti Unit, Ratlam`,
    description: `The project covers Project Supervision Services for various railway construction works under the Gati Shakti Unit, Ratlam, Western Railway. The scope involves monitoring construction activities at different project locations, including inspection of workmanship, materials and work progress. The PSSA team coordinates with the executing agencies and railway officials to facilitate proper and timely completion of the works.`,
    impact: `Ongoing project supervision assignment under the Gati Shakti Unit, Ratlam, Western Railway. Current site activities include footing concrete works, construction of major bridges and deck-slab concreting over major bridges.`,
    totalCost: "₹212 Crore (project value)",
    servicesProvided: [
      `Monitoring of railway construction activities at multiple project locations`,
      `Inspection of workmanship, materials and work progress`,
      `Coordination with executing agencies and railway officials for proper and timely completion of works`
    ]
  },
  {
    id: "vijayawada-pssa-amrit-bharat-station-scheme",
    title: `Vijayawada-PSSA – Project Supervision Services for Works under Amrit Bharat Station Scheme, Gati Shakti Unit, Vijayawada Division`,
    slug: "vijayawada-pssa-amrit-bharat-station-scheme",
    sector: "Railways & Metro Rail",
    sectorSlug: "railways-metro",
    status: "Ongoing",
    location: "Vijayawada, Andhra Pradesh, India",
    coordinates: "India",
    image: railVijayawadaGunadalaImage,
    detailImage: railVijayawadaGudivadaImage,
    gallery: [railVijayawadaMachilipatnamImage],
    role: `Project Supervision Services Agency (PSSA)`,
    client: `Gati Shakti Unit, Vijayawada Division (Indian Railways)`,
    description: `The project involves supervision of railway station development and related infrastructure works under the Amrit Bharat Station Scheme in Vijayawada Division. The PSSA services cover monitoring of civil, structural and associated works, along with quality and progress assessment. The scope also includes site coordination and inspection to support the systematic execution of station improvement works.`,
    impact: `Ongoing project supervision assignment for station development under the Amrit Bharat Station Scheme, Vijayawada Division. Current site activities include platform shelter works at Gunadala and Gudivada stations and station building works at Machilipatnam.`,
    totalCost: "₹1,600 Crore (project value)",
    servicesProvided: [
      `Supervision of railway station development and related infrastructure works under the Amrit Bharat Station Scheme`,
      `Monitoring of civil, structural and associated works with quality and progress assessment`,
      `Site coordination and inspection to support systematic execution of station improvement works`
    ]
  },
  {
    id: "tindivanam-nagari-new-bg-line-pssa-southern-railway",
    title: `Project Supervision Services for Various Construction Projects under Deputy Chief Engineer/CN/TBM, Southern Railway (Tindivanam–Nagari New Broad Gauge Line)`,
    slug: "tindivanam-nagari-new-bg-line-pssa-southern-railway",
    sector: "Railways & Metro Rail",
    sectorSlug: "railways-metro",
    status: "Ongoing",
    location: "Thindivanam–Walajah–Nagari, Tamil Nadu, India",
    coordinates: "India",
    image: railTindivanamFootingImage,
    detailImage: railTindivanamCompactionImage,
    gallery: [railTindivanamWallReinfImage],
    role: `Project Supervision Services Agency (PSSA)`,
    client: `Southern Railway – Deputy Chief Engineer/CN/TBM`,
    description: `AGICL has been awarded a Project Supervision Services Agency (PSSA) assignment by Southern Railway for the Tindivanam–Nagari New Broad Gauge Line Project, with a consultancy contract value of approximately ₹12.13 Crore. Under this assignment, AGICL provides comprehensive supervision and monitoring services for the construction of 29 Road Over Bridges (ROBs), 25 Major Bridges, 33 Minor Bridges, station buildings, platforms, yards, Foot Over Bridges (FOBs), staff quarters, service buildings, and other associated railway infrastructure works. The scope also includes supervision of development works at Tindivanam and Walajah Road stations.`,
    impact: `The project represents a significant milestone in enhancing regional rail connectivity and infrastructure development. This achievement further strengthens AGICL's presence in the railway sector and demonstrates the Company's proven capabilities in project supervision, quality assurance, and infrastructure management for large-scale transportation projects. Current site activities include major bridges footing steel checking works, compaction of sub-grade using pneumatic rollers, and wall reinforcement and shuttering work.`,
    totalCost: "₹3,634.13 Crore (project value); consultancy contract ≈ ₹12.13 Crore",
    servicesProvided: [
      `Supervision and monitoring of construction of 29 Road Over Bridges (ROBs)`,
      `Supervision of 25 Major Bridges and 33 Minor Bridges`,
      `Supervision of station buildings, platforms, yards, Foot Over Bridges (FOBs), staff quarters and service buildings`,
      `Supervision of development works at Tindivanam and Walajah Road stations`
    ]
  },
  {
    id: "bhopal-kota-2x25kv-at-feeding-scada-pms",
    title: `Project Management Services for 2×25 kV AT Feeding System and SCADA Works – Bhopal & Kota Divisions, West Central Railway`,
    slug: "bhopal-kota-2x25kv-at-feeding-scada-pms",
    sector: "Railways & Metro Rail",
    sectorSlug: "railways-metro",
    status: "Ongoing",
    location: "Bhopal & Kota Divisions, Madhya Pradesh & Rajasthan, India",
    coordinates: "India",
    image: railBhopalKotaPedestalImage,
    detailImage: railBhopalKotaCableImage,
    role: `Project Management Consultant (PMC)`,
    client: `West Central Railway – Bhopal & Kota Divisions`,
    description: `The assignment encompasses design review, project management, supervision, and monitoring of the design, supply, erection, testing, and commissioning of critical traction power infrastructure, including 132/55 kV Scott Connected Traction Substations, Switching Posts, 2×25 kV AT Feeding Systems, and the upgradation of SCADA systems. The project covers key railway sections, namely Suwasra–Bina, Etarsi–Suwasra, Etarsi–Khandwa, Bina–Ruthiyai, and Kota–Ruthiyai.`,
    impact: `This strategic project will contribute significantly to strengthening the railway traction network, enhancing operational reliability, and supporting increased freight loading capacity across the region. The award reinforces AGICL's growing leadership in railway electrification and project management consultancy services. Current site activities include pedestal concreting works for FOB and signal and telecom cable marking.`,
    totalCost: "₹352.67 Crore (project value)",
    servicesProvided: [
      `Design review, project management, supervision and monitoring of design, supply, erection, testing and commissioning of traction power infrastructure`,
      `132/55 kV Scott Connected Traction Substations, Switching Posts and 2×25 kV AT Feeding Systems`,
      `Upgradation of SCADA systems`,
      `Coverage of Suwasra–Bina, Etarsi–Suwasra, Etarsi–Khandwa, Bina–Ruthiyai and Kota–Ruthiyai sections`
    ]
  },
  {
    id: "hyderabad-pssa-gati-shakti-unit",
    title: `Hyderabad-PSSA – Project Supervision Services for CPM/Gati Shakti/Hyderabad Unit`,
    slug: "hyderabad-pssa-gati-shakti-unit",
    sector: "Railways & Metro Rail",
    sectorSlug: "railways-metro",
    status: "Ongoing",
    location: "Hyderabad, Telangana, India",
    coordinates: "India",
    image: railHyderabadStaircaseImage,
    detailImage: railHyderabadPccAImage,
    gallery: [railHyderabadPccBImage],
    role: `Project Supervision Services Agency (PSSA)`,
    client: `CPM/Gati Shakti/Hyderabad Unit (Indian Railways)`,
    description: `The project involves providing Project Supervision Services for various railway infrastructure works including Station redevelopments under ABSS, Construction of FOBs, ROBs, RUBs under the Gati Shakti Unit. The PSSA team supports coordination among contractors and railway authorities for efficient and timely execution of the works.`,
    impact: `Ongoing project supervision assignment for railway infrastructure works under the Gati Shakti/Hyderabad Unit. Current site activities include platform staircase base MS sheet placement work and foundation PCC laying work.`,
    totalCost: "₹464 Crore (project value)",
    servicesProvided: [
      `Project Supervision Services for station redevelopment under the Amrit Bharat Station Scheme (ABSS)`,
      `Supervision of construction of Foot Over Bridges (FOBs), Road Over Bridges (ROBs) and Road Under Bridges (RUBs)`,
      `Coordination among contractors and railway authorities for efficient and timely execution of works`
    ]
  },
  {
    id: "mysuru-pms-railway-station-development",
    title: `Mysuru-PMS – Project Management Services for Development of Mysuru Railway Station`,
    slug: "mysuru-pms-railway-station-development",
    sector: "Railways & Metro Rail",
    sectorSlug: "railways-metro",
    status: "Ongoing",
    location: "Mysuru, Karnataka, India",
    coordinates: "India",
    image: railMysuruQuartersImage,
    detailImage: railMysuruServiceBuildingImage,
    role: `Project Management Services (PMS)`,
    client: `Indian Railways – Mysuru Railway Station Development (EPC mode)`,
    description: `The project involves Project Management Services for the development of Mysuru Railway Station through EPC mode. The scope covers civil, electrical, railway electrification, Signal & Telecom works, including construction of quarters and service buildings, dismantling of existing structures and earthwork. It also includes supervision of bridge extensions, retaining walls and other allied infrastructure works associated with the station development.`,
    impact: `Ongoing project management assignment for the EPC-mode redevelopment of Mysuru Railway Station, covering civil, electrical, railway electrification and Signal & Telecom works along with quarters and service buildings.`,
    totalCost: "₹356 Crore (project value)",
    servicesProvided: [
      `Project Management Services for development of Mysuru Railway Station through EPC mode`,
      `Civil, electrical, railway electrification and Signal & Telecom works`,
      `Construction of quarters and service buildings, dismantling of existing structures and earthwork`,
      `Supervision of bridge extensions, retaining walls and other allied infrastructure works`
    ]
  },
  {
    id: "jiribam-imphal-new-bg-railway-line-gc",
    title: `Jiribam–Imphal New Broad Gauge Railway Line Project – General Consultancy Services`,
    slug: "jiribam-imphal-new-bg-railway-line-gc",
    sector: "Railways & Metro Rail",
    sectorSlug: "railways-metro",
    status: "Ongoing",
    location: "Jiribam (Assam) to Imphal (Manipur), India",
    coordinates: "India",
    image: railJiribamStationImage,
    detailImage: railJiribamTunnelLiningImage,
    gallery: [railJiribamViaductPiersImage, railJiribamTunnelPortalImage],
    role: `General Consultancy Services (GC)`,
    client: `Northeast Frontier Railway – Dy.CE/CON/Jiribam (Silchar & Imphal)`,
    description: `The project involves providing General Consultancy Services for the construction of the new Broad Gauge railway line between Jiribam and Imphal under Northeast Frontier Railway. The consultancy scope supports implementation of railway infrastructure works along the new line, including technical supervision, project monitoring and coordination. The services are provided in connection with the Office of DY.CE/CON/Jiribam at Silchar and Imphal.`,
    impact: `Ongoing general consultancy assignment for the new Broad Gauge line between Jiribam and Imphal under Northeast Frontier Railway, including technical supervision of the completed hill-section station, tunnel lining and portal works, and viaduct piers along the new line.`,
    totalCost: "₹22,500 Crore (project value)",
    servicesProvided: [
      `General Consultancy Services for construction of the new Broad Gauge railway line between Jiribam and Imphal`,
      `Technical supervision, project monitoring and coordination of railway infrastructure works along the new line`,
      `Services rendered in connection with the Office of DY.CE/CON/Jiribam at Silchar and Imphal`
    ]
  },
  {
    id: "godda-mahagama-pms-new-rail-line",
    title: `Godda–Mahagama-PMS – Project Management Services for New Rail Line Project`,
    slug: "godda-mahagama-pms-new-rail-line",
    sector: "Railways & Metro Rail",
    sectorSlug: "railways-metro",
    status: "Ongoing",
    location: "Godda–Mahagama, Jharkhand, India",
    coordinates: "India",
    image: railGoddaRmcFoundationImage,
    detailImage: railGoddaSiteClearanceImage,
    // Bias the wide card crop upward so the foundation pedestals stay in frame
    // and the burned-in date/name strip along the bottom edge is cropped out.
    imagePosition: "center 38%",
    role: `Project Management Services (PMS)`,
    client: `Eastern Railway – Pirpainti–Jasidih New Rail Project`,
    description: `The project involves providing Project Management Services for construction of the new railway line between Godda Station and Mahagama Station from Km 32.439 to Km 60.00. The scope covers Civil, P-Way, Electrification, Signal and Telecom works forming part of the new rail line development. The project is being undertaken in connection with the Pirpainti–Jasidih New Rail Project of Eastern Railway.`,
    impact: `Ongoing project management assignment for the new railway line between Godda and Mahagama stations (Km 32.439 to Km 60.00), covering Civil, P-Way, Electrification and Signal & Telecom works. Current site activities include construction of the RMC plant foundation and site clearance and levelling work.`,
    totalCost: "₹531.23 Crore (project value)",
    servicesProvided: [
      `Project Management Services for construction of the new railway line between Godda Station and Mahagama Station (Km 32.439 to Km 60.00)`,
      `Civil, P-Way, Electrification, Signal and Telecom works`,
      `Undertaken in connection with the Pirpainti–Jasidih New Rail Project of Eastern Railway`
    ]
  },

  {
    id: "assam-30-ulb-solid-waste-management",
    title: `Esatblishing complain Soli waste Management projects, in 30 ULB of Assam in accordance under  swach Bharat Mission 2.0 Guideline of solid waste Management  Rules 2016, Assam`,
    slug: "assam-30-ulb-solid-waste-management",
    sector: "Water & Irrigation",
    sectorSlug: "water-irrigation",
    status: "Completed",
    location: "Assam, India",
    coordinates: "India",
    image: solidWasteFieldImage,
    // Tall subjects (field-test crew) — bias the wide card crop upward so faces
    // and the test apparatus show instead of a mid-body slice.
    imagePosition: "center 22%",
    role: `Solid Waste Management Project Consultant (DPR & Tender)`,
    client: `Swachh Bharat Mission,Urban`,
    description: `Establishment and implementation of Solid Waste Management projects in 30 ULBs of Assam in accordance with Swachh Bharat Mission 2.0 guidelines and the Solid Waste Management Rules, 2016, covering waste collection, segregation, transportation, processing, and scientific disposal.`,
    impact: `Solid Waste Management projects in 30 ULBs of Assam aligned to Swachh Bharat Mission 2.0 and the Solid Waste Management Rules, 2016. Date of Commencement: 07-01-2023.`,
    totalCost: "₹52,58,898 (exclusive of GST)",
    servicesProvided: [
      `Stage-1-Submission of Site Survey and Feasibility Report`,
      `Stage-2-Submission of Draft DPR`,
      `Stage-3- Submission of Final DPR`,
      `Stage-4-Submission of Tender Documents including BOQ`
    ]
  },
  {
    id: "assam-slwm-consultant-empanelment",
    title: `Empanelment of Consultants for solid and Liquid Waste Management projects at ULB's of Assam under SBM (Urban)`,
    slug: "assam-slwm-consultant-empanelment",
    sector: "Water & Irrigation",
    sectorSlug: "water-irrigation",
    status: "Completed",
    location: "Assam, India",
    coordinates: "India",
    image: consultantEmpanelmentImage,
    role: `Empanelled Consultant – Solid & Liquid Waste Management`,
    client: `Swachh Bharat Mission-Urban`,
    description: `Empanelment of consultants for planning, design, DPR preparation, and implementation support for Solid and Liquid Waste Management projects in ULBs of Assam under Swachh Bharat Mission (Urban), focusing on sustainable waste management and improved urban sanitation.`,
    impact: `Empanelment of consultants for Solid and Liquid Waste Management projects in ULBs of Assam under Swachh Bharat Mission (Urban). Date of Commencement: 24-05-2023.`,
    totalCost: "₹10,81,790 (exclusive of GST)",
    servicesProvided: [
      `Stage-1-Submission of Site Survey and Feasibility Report`,
      `Stage-2-Submission of Draft DPR`,
      `Stage-3- Submission of Final DPR`,
      `Stage-4-Submission of Tender Documents including BOQ`
    ]
  },
  {
    id: "dholera-dsir-employers-engineer-supervision",
    title: `Consultancy Services of Employer’s Engineer for Supervision Works for Miscellaneous Construction Projects in DSIR`,
    slug: "dholera-dsir-employers-engineer-supervision",
    sector: "Urban Infrastructure",
    sectorSlug: "urban-infrastructure",
    status: "Completed",
    location: "Dholera, Gujarat, India",
    coordinates: "India",
    image: dholeraSupervisionImage,
    role: `Employer's Engineer – Construction Supervision`,
    client: `Dholera Industrial City Development Ltd (DICDL)`,
    description: `The consultancy services for the Employer’s Engineer for Supervision Works of Miscellaneous Construction Projects in Dholera Special Investment Region (DSIR) involve providing third-party engineering oversight, project management, and quality assurance to the Dholera Industrial City Development Limited (DICDL) for trunk and micro-infrastructure development.`,
    impact: `Employer's Engineer supervision for miscellaneous construction projects in the Dholera Special Investment Region, providing third-party engineering oversight and quality assurance to DICDL. Date of Commencement: 14-08-2020.`,
    totalCost: "₹8,77,00,000 (exclusive of GST)",
    servicesProvided: [
      `1. Construction of Bunding for Flood Protection of Adhiya River in Dholera Special`,
      `Investment Region`,
      `2. Earth Filling in Selected Plots of Activation Area in Dholera Special Investment Region`,
      `3. Enhancement of Side Slope of Storm Water Canal in Activation Area in Dholera`,
      `Special Investment Region`,
      `4. Design and Construction of Service Area Buildings (SAB) in Activation Area in`,
      `Dholera Special Investment Region (21 Nos.)`,
      `5. Construction of Canal Front Development Including Land Filling, Civil, MEP and`,
      `Landscape (Zone 02) in Dholera Special Investment Region.`,
      `6. Construction of Canal Front Development Including Land Filling, Civil, MEP and`,
      `Landscape (Zone 03) in Dholera Special Investment Region`,
      `7. Design and Construction of Service Area Buildings (SAB) in Activation Area in`,
      `Dholera Special Investment Region (17 Nos.)`
    ]
  },
  {
    id: "bhubaneswar-nature-based-water-treatment-pmc",
    title: `Project Management Consultancy (PMC) services for Development and Implementation of nature-based water Treatment solutions at the lake Zone I and Zone IV of the natural drainage Channel No 10, Bhubaneswar`,
    slug: "bhubaneswar-nature-based-water-treatment-pmc",
    sector: "Water & Irrigation",
    sectorSlug: "water-irrigation",
    status: "Completed",
    location: "Bhubaneswar, Odisha, India",
    coordinates: "India",
    image: natureBasedPmcImage,
    role: `Project Management Consultancy (PMC)`,
    client: `Bhuvneshwar Development Authority`,
    description: `The Project Management Consultancy (PMC) services for the Development and Implementation of Nature-Based Water Treatment Solutions at Lake Zones I and IV of Natural Drainage Channel No. 10 in Bhubaneswar involve providing technical expertise, design review, and project monitoring to the Bhubaneswar Smart City Limited (BSCL) / Housing & Urban Development Department, Government of Odisha.`,
    impact: `Project Management Consultancy for nature-based water treatment solutions at Lake Zones I and IV of Natural Drainage Channel No. 10, Bhubaneswar. Date of Commencement: 01-04-2024.`,
    totalCost: "₹1,92,15,000 (exclusive of GST)",
    servicesProvided: [
      `Task 1: Services to be rendered by the consultant at Pre-construction phase.`,
      `1.The Consultant shall acquaint themselves with the data, drawings, material report, and other documents of the DPR and point out any inconsistencies and inform the Employer.`,
      `2.The Consultant shall carry out necessary topographical survey to verify the detail GFC issued to the consultant. Establish the bench marks and control Points in the field along the total length of Channel (Project Scope) prior to commencement of the work.`,
      `3. The Consultant shall record the initial measurements jointly with the contractor and employer's representative.`,
      `4. The Consultant shall conduct the pre-construction review of Manufacture's report and standard samples of manufactured materials and such other materials as required for the project.`,
      `5. The Consultant shall review the Quality assurance Plan (QAP) and SHE report`,
      `submitted by the contractor and recommend to the employer with comments`,
      `for accordance of approval.`,
      `6. The Consultant shall review and recommend for approval of the drawings`,
      `furnished by the contractor along with supporting data in accordance with the`,
      `provisions of the clauses of the contractor's agreement.`,
      `7. The Consultant shall complete all these review activities and send its`,
      `observations to the Engineer within 30 days of receipt of such drawings from`,
      `the contractor.`,
      `Task 2: Construction Supervision Phase.`,
      `1. The Consultant shall assist and advise the Engineer on any Proposal for Change of Scope.`,
      `2.The Consultant shall submit a Construction Supervision manual identifying the`,
      `quality requirements and /or standards for the project and documenting how`,
      `the project will demonstrate compliance.`,
      `3.The Consultant shall issue all necessary instructions to the contractor in consultation with and as delegated by the Engineer.`,
      `4. The Project Manager of the Consultant shall be responsible for making correspondences with the Engineer/Contractor/other entity on project related`,
      `matters in regular basis.`,
      `5.The Consultant shall be responsible to perform all works necessary to supervise and monitor the construction of the project s mentioned in RFP document and`,
      `undertaken as per the approved drawings, plans etc.`,
      `6. The Consultant, when delegated by the Engineer, may instruct the Contractor to execute any work which is urgently. required for the safety of the project, whether because of an accident or Unforeseeable event.`
    ]
  }
];
