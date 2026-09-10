import ablImage from '../images/abl.png';
import sudhakar from '../images/sudhakar-singh.png';
import vijai from '../images/vijai.png';
import sinha from '../images/satish-chandra-sinha.png';
import sankha from '../images/Sankha-das-Gupta.png';
import sanjeet from '../images/sanjeet.png';
import shabad from '../images/shabad-singh-sobti.png';
import amitabh from '../images/amitabh.png';

export interface Leader {
  name: string;
  title: string;
  experience: string;
  bio: string;
  image: string;
  category: "Board of Directors" | "Executive Management";
}

export const LEADERSHIP: Leader[] = [
  {
    name: "A B L SRIVASTAVA",
    title: "Chairman and Director",
    experience: "45+ Years",
    bio: "CA (Dr.) A. B. L. Srivastava, Non-Executive Chairman, Almondz Global Infra-Consultant Limited, is a Chartered Accountant with an MBF and a Ph.D. in Arbitration & Dispute Resolution, and an IPMA Level A Certified Project Management Professional with 45+ years of experience in finance, power and infrastructure, including 12 years at Almondz; he has held senior roles including Chairman & Managing Director of NHPC, alongside REC, NHDC, PTC India and PTC India Financial Services, and as Chairman of AGICL now provides strategic and governance leadership driving the company's institutional growth, notable for pioneering the Buyback of Shares concept in a CPSU and for being the only non-engineer in India to hold IPMA's top-tier project management certification, with honours including the ICAI Special Achiever Award (2010) and Outstanding Individual Contribution to Power Sector Award (2013).",
    image: ablImage,
    category: "Board of Directors"
  },
  {
    name: "SUDHAKAR SINGH",
    title: "Whole Time Director",
    experience: "35+ Years",
    bio: "Mr. Sudhakar Singh, Whole Time Director, Almondz Global Infra Consultant Ltd., is a Civil Engineering graduate (B. Tech Hons., NITK Surathkal) and Life Member of the Indian Roads Congress, with 35+ years of experience in highway and road infrastructure, particularly Project Construction Management of BOT, Turnkey and Item Rate Projects; associated with AGICL since July 2016, he is involved in Business Development and Execution of Engineering services for Highways and Smart Cities, with expertise covering project management, contract administration, construction supervision, FIDIC contracts and PPP Concession Agreements. He has held key roles at NHAI (Project Director-cum-DGM Technical), The Louis Berger Group USA (9+ years on World Bank/ADB projects), IRCON International and Feedback Infrastructure Services, with notable project experience including the Gurgaon–Kotputli–Jaipur six-laning, the Kanpur East–West Corridor bridge over the Ganga, Ganga Expressway (Package-I), and rehabilitation of the Kabul–Doshi Highway in Afghanistan.",
    image: sudhakar,
    category: "Board of Directors"
  },
  {
    name: "VIJAI PRAKASH AGRAWAL",
    title: "Independent Director",
    experience: "45+ Years",
    bio: "Mr. Vijai Prakash Agrawal is a M.E (Power Electronics and Electrical Drivers) from IIT Roorkee, former CMD at Airport Authority of India and has a rich experience of over 35 years in developing airports infrastructure from planning to commercialization, setup over 60 national & international airports with over 200 million passenger capacity. He has led and managed an organization with 18,500 direct employees (100K indirect) for 10 years with over 125 airports (450 including airstrips), overseeing a massive airspace 2.8 Sq. million NM and serving over 1.5 billion passengers. He has good managerial, Interpersonal Communications and teamwork skills.",
    image: vijai,
    category: "Board of Directors"
  },
  {
    name: "SATISH CHANDRA SINHA",
    title: "Independent Director",
    experience: "45+ Years",
    bio: "Mr. Satish Chandra Sinha aged around 66 years is a seasoned Banker having more than 32 years’ experience as a banker in Union Bank of India. Starting his career as a probationary officer in 1975 he worked across various locations in India, including rural, urban, and metro regions and rose to the position of General Manager in 2006. He was also held the position of Executive Director on the Board of Oriental Bank of Commerce and as member of Board for Industrial and Financial Reconstruction (BIFR). He had also having association as honorary member of the Apex committee of the SIDBI Innovation and Incubation Centre (SIIC) formed by the collaboration between IIT Kanpur and the Government of Uttar Pradesh and Nominee Director (Non-Executive) on the Board of Canara, HSBC, Oriental Bank of Commerce, Life Insurance Company Limited between 2011 and 2012. Mr. Satish Chandra Sinha is B.Com from Patna University and also hold CAIIB diploma. He is also on Board of Almondz Global Securities Limited.",
    image: sinha,
    category: "Board of Directors"
  },
  {
    name: "SANKHA DAS GUPTA",
    title: "Whole Time Director",
    experience: "25+ Years",
    bio: "Mr. Sankha Dasgupta, Whole Time Director, Almondz Global Infra-Consultant Limited, holds a Post Graduate Diploma in Management from XIM Bhubaneswar and a B.Com from the University of Delhi, and is a Certified Fraud Examiner (CFE) with certifications in PPP and ESG, bringing 25+ years of experience in infrastructure consultancy, financial advisory, project management, PPP projects, transaction advisory and business development; associated with AGICL since 1998, his expertise spans financial feasibility and modelling, PPP structuring, transaction advisory, project appraisal, bid process management, RFP/RFQ and concession agreement preparation, and project due diligence. He has advised Government departments, public sector organisations and infrastructure authorities across sectors including urban infrastructure, tourism, healthcare, water, transportation and food-grain storage, with notable assignments for the Food Corporation of India, Punjab Infrastructure Development Board, Himachal Pradesh Infrastructure Development Board and Jammu & Kashmir Housing Board.",
    image: sankha,
    category: "Board of Directors"
  },
  {
    name: "Shabad Singh Sobti",
    title: "Whole Time Director",
    experience: "10+ Years",
    bio: "Mr. Shabad Singh Sobti, son of Mr. Navjeet Singh Sobti, belongs to the Promoter Group of the Company. He holds a Bachelor of Science (B.Sc.) degree from the University of Virginia, a reputed foreign university, reflecting a strong academic foundation and well-developed analytical skills. He has approximately six (6) years of professional experience, during which he has demonstrated sound managerial, strategic, and operational capabilities. His exposure to business operations and involvement in decision-making processes equip him well to discharge the responsibilities of a Whole-Time Director. His academic qualifications, coupled with hands-on professional experience, are expected to contribute meaningfully to the Company’s growth, corporate governance, and long-term strategic objectives.",
    image: shabad,
    category: "Board of Directors"
  },
  {
    name: "SANJEET KUMAR AHLAWAT",
    title: "Whole Time Director",
    experience: "20+ Years",
    bio: "Mr. Sanjeet Kumar Ahlawat, Whole-time Director, Almondz Global Infra Consultant Limited, holds a Master of Planning (Regional Planning) from SPA New Delhi and a Master's in Geography from Kurukshetra University (Gold Medallist), and is an Associate Life Member of ITPI, with 20+ years of experience in international business development across infrastructure and urban planning. At Almondz, he leads Business Development, securing around ₹150 Crore in road-sector business, 2 World Bank-funded projects, and 14 international road projects across Nigeria, Zambia, Kenya, Somaliland and Uganda, alongside a strong domestic portfolio with NHAI, NHIDCL and state PWDs, and GIS-based AMRUT master plans for multiple states.",
    image: sanjeet,
    category: "Board of Directors"
  },
  {
    name: "Amitabh Sharan",
    title: "Whole Time Director",
    experience: "25+ Years",
    bio: "Mr. Amitabh Sharan is a seasoned Geotechnical and Engineering Geology expert with over 29 years of experience in tunnels, hydropower, and infrastructure projects across India and neighbouring regions. He specializes in NATM tunnelling, geotechnical investigations, and landslide mitigation, and currently serves as the Founder & Managing Director of Excelling Geo & Engineering Consultant Pvt. Ltd and whole time Director AGICL.",
    image: amitabh,
    category: "Board of Directors"
  }
];
