export interface Project {
  id: string;
  title: string;
  slug: string;
  sector: string;
  sectorSlug: string;
  status: "Recently Awarded" | "Ongoing" | "Completed";
  location: string;
  coordinates: string;
  image: string;
  youtubeUrl?: string;
  role: string;
  client: string;
  description: string;
  impact: string;
  servicesProvided: string[];
}

export const PROJECTS: Project[] = [
  {
    id: "vadodara-kim-expressway",
    title: "Vadodara-Kim Expressway (Package IV)",
    slug: "vadodara-kim-expressway",
    sector: "Roads & Highways",
    sectorSlug: "roads-highways",
    status: "Ongoing",
    location: "Gujarat, India",
    coordinates: "22° 18' N / 73° 11' E",
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80",
    youtubeUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    role: "Independent Engineer & Supervision Consultant",
    client: "National Highways Authority of India (NHAI)",
    description: "Consultancy services for the development of India's greenfield expressway networks, ensuring rigid quality controls, structural longevity, and high-speed safety.",
    impact: "Reduces travel time between Vadodara and Surat by 45 minutes, slashing logistics costs and vehicular emissions.",
    servicesProvided: ["Independent Engineering", "Quality Control", "HSE Supervision", "Milestone Certification"]
  },
  {
    id: "zozila-tunnel",
    title: "Zozila Tunnel Project",
    slug: "zozila-tunnel",
    sector: "Roads & Highways",
    sectorSlug: "roads-highways",
    status: "Ongoing",
    location: "Jammu & Kashmir / Ladakh, India",
    coordinates: "34° 17' N / 75° 30' E",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80",
    youtubeUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    role: "Detailed Design & Geotechnical Consultant",
    client: "Ministry of Road Transport and Highways (MoRTH)",
    description: "Critical engineering across high-altitude Himalayan terrain, providing year-round all-weather connectivity between Srinagar, Kargil, and Leh.",
    impact: "Ensures uninterrupted military and civilian supply lines across treacherous mountain passes previously closed for 6 months a year.",
    servicesProvided: ["Geotechnical Investigation", "Tunnel Ventilation Engineering", "Structural Design", "Safety Audits"]
  },
  {
    id: "cascadia-hydroelectric",
    title: "Cascadia Hydroelectric Expansion",
    slug: "cascadia-hydroelectric",
    sector: "Energy & Power",
    sectorSlug: "energy-power",
    status: "Recently Awarded",
    location: "Pacific Northwest",
    coordinates: "45° 37' N / 121° 58' W",
    image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=1200&q=80",
    youtubeUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    role: "Lender Independent Engineer & TEV Consultant",
    client: "International Energy Consortium",
    description: "A critical infrastructure upgrade integrating next-generation turbine technology to increase renewable power output by 35%.",
    impact: "Adds 450 MW of clean, reliable baseload hydroelectric power to the regional grid without expanding reservoir footprints.",
    servicesProvided: ["Techno-Economic Viability", "Lender Independent Engineering", "Environmental Audit"]
  },
  {
    id: "trans-continental-rail",
    title: "Trans-Continental Rail Hub",
    slug: "trans-continental-rail",
    sector: "Railways & Metro Rail",
    sectorSlug: "railways-metro",
    status: "Completed",
    location: "Central Europe",
    coordinates: "48° 08' N / 11° 34' E",
    image: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=1200&q=80",
    youtubeUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    role: "Lead Station Architect & Permanent Way Engineer",
    client: "European Rail Infrastructure Agency",
    description: "Connecting three major metropolitan areas with a sustainable multi-modal transit center designed for peak passenger efficiency.",
    impact: "Handles over 120,000 daily commuters with seamless high-speed train interchanges and zero carbon footprint design.",
    servicesProvided: ["Detailed Design", "Permanent Way Engineering", "Station Architecture", "PMC"]
  },
  {
    id: "dehradun-smart-city",
    title: "Dehradun Smart City Command & Control",
    slug: "dehradun-smart-city",
    sector: "Smart Cities & Urban Infrastructure",
    sectorSlug: "smart-cities",
    status: "Completed",
    location: "Uttarakhand, India",
    coordinates: "30° 19' N / 78° 02' E",
    image: "https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=1200&q=80",
    youtubeUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    role: "Master Planning & ICT Consultant",
    client: "Dehradun Smart City Ltd.",
    description: "Implementation of an integrated command and control center (ICCC), intelligent traffic management systems, and smart municipal water metering.",
    impact: "Improved emergency response times by 40% and reduced urban water wastage across the municipal zone.",
    servicesProvided: ["Master Planning", "ICT Architecture", "Project Management", "IoT Integration"]
  },
  {
    id: "himachal-ropeways",
    title: "Himachal Pradesh Passenger Ropeway Network",
    slug: "himachal-ropeways",
    sector: "SIT (Specialized Infrastructure & Tourism)",
    sectorSlug: "sit",
    status: "Ongoing",
    location: "Himachal Pradesh, India",
    coordinates: "31° 10' N / 77° 10' E",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
    youtubeUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    role: "Turnkey Engineering & Feasibility Consultant",
    client: "Ropeways and Rapid Transport System Development Corporation (RTDC)",
    description: "Developing 15 high-altitude cable propelled transit systems to alleviate severe traffic congestion in pilgrimage and tourist towns.",
    impact: "Replaces polluting road traffic with clean electric cable cars, reducing carbon emissions and transit times by 70%.",
    servicesProvided: ["Feasibility & TEV", "Detailed Engineering", "Topographic Survey", "Environmental Clearance"]
  },
  {
    id: "ganga-water-grid",
    title: "Ganga Basin Bulk Water Supply Grid",
    slug: "ganga-water-grid",
    sector: "Water & Waste Water",
    sectorSlug: "water-sanitation",
    status: "Recently Awarded",
    location: "Uttar Pradesh & Bihar, India",
    coordinates: "25° 27' N / 81° 51' E",
    image: "https://images.unsplash.com/photo-1584727638096-042c45049ebe?auto=format&fit=crop&w=1200&q=80",
    role: "Project Management Consultant",
    client: "National Mission for Clean Ganga (NMCG)",
    description: "Design and supervision of bulk water treatment plants and piped water networks supplying potable water to 250 rural habitations.",
    impact: "Provides safe drinking water to over 2 million rural citizens, eradicating water-borne diseases.",
    servicesProvided: ["Hydraulic Design", "Pipeline Engineering", "SCADA Integration", "Quality Supervision"]
  },
  {
    id: "palakkad-rail-coach",
    title: "New Rail Coach Factory",
    slug: "palakkad-rail-coach",
    sector: "Railways & Metro Rail",
    sectorSlug: "railways-metro",
    status: "Completed",
    location: "Kerala, India",
    coordinates: "10° 46' N / 76° 39' E",
    image: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=1200&q=80",
    role: "Industrial Infrastructure & Structural Consultant",
    client: "Indian Railways",
    description: "Comprehensive civil, electrical, and mechanical engineering for a state-of-the-art railway coach manufacturing plant.",
    impact: "Accelerated domestic rolling stock production capacity, generating over 3,500 direct regional manufacturing jobs.",
    servicesProvided: ["Industrial Architecture", "MEP Engineering", "Structural Design", "Construction Supervision"]
  }
];
