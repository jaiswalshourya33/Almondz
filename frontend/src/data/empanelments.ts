// Sourced directly from AGICL_Corporate_Profile.md (Section 5: Empanelments & Clients)
// and AGICL_Brochure_Final.md (Sections 9 "Empanelments" and 10 "Our Clients").

export interface EmpanelmentGroup {
  category: string;
  description: string;
  items: string[];
}

export const EMPANELMENT_GROUPS: EmpanelmentGroup[] = [
  {
    category: "Central, International Government & National Bodies",
    description: "Ministries, central agencies, national institutions and multilateral bodies AGICL is empanelled with.",
    items: [
      "Ministry of Road Transport and Highways (MoRTH)",
      "National Highways Authority of India (NHAI) — Financial Consultant / Aerial Drone Survey",
      "Department of Economic Affairs (DEA), Ministry of Finance — Transaction Advisor",
      "Small Industrial Development Bank of India (SIDBI) — TEV",
      "Indian Banks' Association (IBA) — ASM (NPA Resolution), Energy & Power, EPC, Iron & Steel, NBFC, Real Estate, Sugar, Tourism, Travel & Hospitality",
      "Bharat Sanchar Nigam Limited (BSNL) — Transaction Advisory",
      "Geological Survey of India (GSI) — Drone Survey",
      "Housing and Urban Development Corporation (HUDCO) — Public Transport & Highways Engineering / Water & Sanitation",
      "PFC Consulting Limited (PFCCL) — RFQ Drafting, Vetting & Evaluation",
      "Delhi Metro Rail Corporation (DMRC) — Consultancy Work",
      "Ministry of Housing and Urban Affairs — Solid Waste Management & Smart Cities Transaction Advisor",
      "APITCO — PMC, Food & Agri, Infra Planning, Tourism Infra, Urban Planning & Development",
      "WAPCOS — Port / Harbour / Fishing Harbour Infrastructure Consultant",
      "National Mission for Clean Ganga (NMCG) — Transaction Advisor",
      "National Bank for Financing Infrastructure and Development (NaBFID) — LIE & TEV (Roads & Bridges, Energy — Solar & Wind, Water & Sanitation)",
      "Telecommunications Consultants India Limited (TCIL)",
      "Mahanagar Telephone Nigam Limited (MTNL) — Transaction Advisory, Land & Asset Monetization",
      "Steel Authority of India Limited (SAIL) — Transaction Advisor, Asset Monetization",
      "National Projects Construction Corporation Limited — Building Projects",
      "Southern Railway — Approved Consultant for Survey, Construction & Maintenance of Private Siding Works",
      "Government of the People's Republic of Bangladesh — PPP Transaction Advisory (Transport, Tourism, Social Infrastructure, Civil Accommodation, Water & Waste)"
    ]
  },
  {
    category: "State Governments & Development Authorities",
    description: "State departments, urban development authorities and public bodies AGICL is empanelled with across India.",
    items: [
      "Maharashtra Jeevan Pradhikaran (MJP) — Project Development & Management Support",
      "Goa Tourism Development Corporation (GTDC) — Transaction Advisor",
      "Water Resources Department, Bihar",
      "Bihar Rajya Pul Nirman Nigam Limited (BRPNN) — DPR Consultant",
      "MP Industrial Development Corporation Limited (MPIDCL) — Transaction Advisor",
      "Himachal Pradesh Infrastructure Development Board (HPIDB) — Transaction Advisor",
      "Swachh Bharat Mission (Urban), Assam — Solid & Liquid Waste Management",
      "Greater Chennai Corporation (GCC) — Drone as a Service (DAAS)",
      "PDCOR Limited (Govt. of Rajasthan) — Independent Engineer",
      "Uttar Pradesh State Road Transport Corporation (UPSRTC) — Independent Engineer",
      "Uttar Pradesh State Industrial Development Authority (UPSIDA) — Engineering & Urban Renewal Works",
      "Ghaziabad Development Authority (GDA) — Urban Designer, Landscape/Architect Consultant",
      "Maharashtra State Road Transport Corporation",
      "Gujarat Infrastructure Development Board (GIDB) — Financial Advisor",
      "Jal Jivan Mission (JJM), Assam — DPR Consultant, Rural Water Supply",
      "Varanasi Development Authority — Transaction Advisory",
      "Public Works Department, Uttarakhand",
      "Public Works Department, Madhya Pradesh",
      "Department of Finance, Government of Punjab — Transaction Advisor",
      "Uttar Pradesh Expressways Industrial Development Authority (UPEIDA) — Project Development & DPR Consultant",
      "Regional Centre for Urban and Environmental Studies (RCUES), Lucknow — Urban & Tourism Planning",
      "Mussoorie Dehradun Development Authority — Tourism Projects",
      "Public Health Engineering Department (PHED), Assam",
      "WATCO, Bhubaneswar — GIS Asset Mapping, Chennai Metropolitan Water Supply & Sewerage Board",
      "Madhya Pradesh Yatri Parivahan and Infrastructure Limited, Bhopal — Architectural & DPR Services",
      "Quality Assurance Authority (QAA), Haryana — DPR & Design Consultants, Categories I–IV",
      "Maharashtra State Infrastructure Development Corporation (MSIDC) — Independent Testing, Roads & Building PMC",
      "Ujjain Smart City Limited — Transaction Advisor",
      "Haryana Urban Development Corporation Limited — Urban Infrastructure Financial & Technical Modelling",
      "Bihar State Educational Infrastructure Development Corporation Ltd. (BSEIDC) — DPR Consultant"
    ]
  },
  {
    category: "National & Scheduled Banks",
    description: "Public sector and scheduled banks where AGICL holds active TEV, LIE and technical consultant empanelments.",
    items: [
      "State Bank of India (SBI) — TEV, Lenders' Traffic Consultant (Multiple Circles)",
      "Punjab National Bank (PNB) — LIE",
      "Canara Bank — LIE / TEV",
      "Central Bank of India — LIE",
      "Bank of Baroda (BOB) — LIE / TEV",
      "Union Bank of India",
      "Bank of India",
      "UCO Bank",
      "Indian Bank",
      "Bank of Maharashtra",
      "AU Small Finance Bank — Technical Consultant",
      "NABARD — TEV"
    ]
  }
];

// Full client roster from AGICL_Brochure_Final.md, Section 10 "Our Clients" —
// obvious source typos/duplicate entity variants (e.g. "Border Road/Roads Organisation",
// "National Highway/s Authority of India") merged into a single canonical entry.
export const CLIENTS: string[] = [
  "AFCONS Infrastructure Limited", "Agroh Infrastructure Developers Private Limited", "Ajmer Development Authority",
  "APCO Infratech Pvt. Ltd.", "Aruj Buildcon Pvt. Ltd.", "Asian Development Bank", "AU Small Finance Bank", "Axis Bank",
  "Ashok Kumar", "Bank of Baroda", "Bathinda Development Authority", "Bhubaneswar Development Authority", "Bhagalpur Smart City Limited",
  "Bhilwara–Rajsamand Tollway Limited (Sadbhav)", "Bhopal Development Authority", "Bijapur Hungund Tollway Private Limited",
  "Biotechnology Industry Research Assistance Council", "Border Roads Organisation", "Brahmaputra Valley Fertilizer Corporation Limited",
  "CDS Infra Project Ltd.", "Central Bank of India", "Central Railway",
  "Chennai Metro Rail Limited", "City and Village Planning Division, Uttar Pradesh", "Dehradun Smart City Ltd.",
  "Delhi Transport Corporation", "Department of Telecommunications", "Dharamshala Municipal Corporation",
  "Dharamshala Smart City Limited", "Dhruv Consultancy Services Limited", "Dhule Palensar Tollway Limited (Sadbhav)",
  "DICD Limited", "Dilip Buildcon Limited", "Dinesh Chandra R A Agarwal", "Dholera Smart City Limited", "East Central Railway",
  "Executive Engineer, Government of Tripura", "Executive Engineer, NH Division, Sitamarhi",
  "Executive Engineer, North Ratnagiri PWD, Government of Maharashtra", "Food Corporation of India",
  "Gawar Construction Limited", "Goa Tourism Development Corporation Ltd.", "Gujarat Metro Rail Corporation (GMRC) Limited",
  "Haryana Public Works Department (Bridges & Roads)", "Haryana State Agricultural Marketing Board, Panchkula",
  "Haryana State Industrial Development Corporation (HSIIDC)", "Himachal Pradesh Infrastructure Development Board",
  "Himachal Pradesh Irrigation & Public Health Department", "HINDIA Engineers Private Limited",
  "Hyderabad Yadgiri Tollway Private Limited (Sadbhav)", "Indian Academy of Highway Engineers", "Ircon International Limited",
  "Iron Triangle Limited", "J & K Cable Car Corporation Limited", "J. Kumar Infraprojects Ltd.", "J.C. Technocrats Pvt. Ltd.",
  "Jal Jeevan Mission, Government of India", "Jawaharlal Nehru National Urban Renewal Mission", "Kalthia Engineering and Construction Ltd.",
  "Kalyana Karnataka Road Transport Corporation", "Kavaratti Smart City Limited",
  "Kutch Railway Company Limited (a JV of Rail Vikas Nigam Limited)", "Larsen & Toubro", "Madhya Pradesh Incredible India",
  "Madhya Pradesh Road Development Corporation Limited",
  "Madhya Pradesh Rural Road Development Authority", "Government of Madhya Pradesh (Madhya Pradesh Shasan)", "Madhya Pradesh State Industrial Development Corporation",
  "Maharashtra State Industrial Development Corporation", "Maharashtra State Road Development Corporation (MSRDC)",
  "Swachh Bharat Mission–Urban, Assam", "MHS Infratech Pvt. Ltd.", "Ministry of Communications, Department of Telecommunications",
  "Ministry of Road Transport and Highways", "MKC Infrastructure Ltd.", "MP Jal Nigam Maryadit", "MP PWD, Bhopal",
  "MP State Cooperative Dairy Federation Ltd.", "MP State Mining Corporation Limited", "Mumbai JNPT Port Road Company Limited",
  "Municipal Corporation — Ajmer, Bhopal, Rohtak, Hisar", "Nashik Municipal Corporation", "National Highways Authority of India (NHAI)",
  "National Highway Circle, Pune", "National Highway Division, Motihari",
  "National Highways & Infrastructure Development Corporation Limited (NHIDCL)", "National Highway P.W. Circle, Nanded",
  "Pradhan Mantri Gram Sadak Yojana", "Public Works Department — Karnataka & Rajasthan",
  "Public Works, Ports and Inland Water Transport Department", "Punjab Heritage and Tourism Promotion Board",
  "Punjab Infrastructure Development Board", "Punjab National Bank", "PWD (Bridges & Roads) — Haryana, Punjab, Ladakh",
  "PWD — Dehradun, Nagpur, Raipur, Rajasthan, Assam, Chhatarpur (MP), Delhi, Maharashtra, Pune",
  "R&B Department, Vijayawada, Andhra Pradesh", "Rajasthan State Highway Authority, Jaipur", "Rajasthan Tourism Development Corporation",
  "Reliance Infrastructure", "RITES Limited", "Road Construction Department (Bihar / Jharkhand / Dumka)", "Roads & Buildings Department",
  "SAAKAR Infra", "Sadbhav Engineering", "Shreeji Infraspace", "Shreenathjee Udaipur Tollway Private Limited (Sadbhav)",
  "South Central Railway", "State Bank of India", "Tata Projects Limited", "Temple Mata Shri Chintpurni", "The World Bank",
  "Tripura Urban Development Authority",
  "Union Bank of India", "Universal Service Obligation Fund (Department of Telecom)", "UP State Warehousing, New Hyderabad, Lucknow",
  "UP Warehousing Corporation",
  "Uttar Pradesh State Highway Authority (UPSHA)", "Uttar Pradesh State Industrial Development Authority (UPSIDA)",
  "Uttar Pradesh State Road Transport Corporation (UPSRTC)", "Uttarakhand State Road Transport Corporation",
  "Visakhapatnam Port Authority", "West Bengal Municipal Development Fund Trust (WBMDFT)", "Welspun", "Western Railway"
];
