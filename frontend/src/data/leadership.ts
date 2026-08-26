import ablImage from '../images/abl.jpg';
import sudhakar from '../images/Sudhakar.jpg';
import vijai from '../images/vijai.jpg';
import sinha from '../images/sinha_(1).jpg';
import sankha from '../images/Sankha-das-Gupta.jpg';
import sanjeet from '../images/sanjeet.jpg';
import shabad from '../images/Shabad singh sobti.jpg';
import amitabh from '../images/amitabh.jpg';

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
    bio: "Mr. Srivastava is M.Com, FCA, MBF having almost 4 decades experience of about 15 years in Central Power Sector (REC and NHPC from October 1999 to 15 September 2014).He was former CMD in NHPC Ltd. He has expertise in Project Management, Project Execution, raising resources through innovative financial products, Corporate restructuring, fund management, raising funds from Bonds, External Commercial Borrowings (ECB), Infrastructure Bonds and dealing with State Electricity Boards. He is also a certified Project Director level A from International Project Management Association (IPMA), Swedan.",
    image: ablImage,
    category: "Board of Directors"
  },
  {
    name: "SUDHAKAR SINGH",
    title: "Whole Time Director",
    experience: "35+ Years",
    bio: "Mr. Sudhakar Singh is a B. Tech (Hons.) in Civil Engineering and having more than 35 years of experience in India and overseas in Civil Engineering/ Contract Management companies Roads/ Highways/ Smart Cities Projects of all magnitude. He has good managerial, Interpersonal Communications and teamwork skills. Presently, Mr. Sudhakar Singh is involved in Business Development/ Execution of Engineering services for Highways and Smart Cities. He has greatly contributed to building up the organization to its present level.",
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
    experience: "35+ Years",
    bio: "Mr. Sankha has earned a B.COM from Delhi University and Post Graduate Diploma in Management from Xavier Institute of Management, Bhubaneshwar (XIMB). He is also a Certified Fraud Examiner (CFE) from ACFE (USA). He has experience of more than 20 years in the field of Corporate Finance, fund raising, financial restructuring and asset monitoring activities. He has advised various clients both Public and Private Sector for in raising funds through Project finance and Domestic Bond Market. He has also carried out various financial restructuring assignments for various Government and Private sector companies in India. Sankha has vast experience in the infrastructure sector especially like Power, renewable energy, roads and highways etc. He has been instrumental in closing large number of transactions in manufacturing, infrastructure and services sector. Further, he is also involved in asset & cash monitoring advisory to various Banks and Institutions for better credit management.",
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
    bio: "Mr. Sanjeet Kumar Ahlawat is Masters in Planning with specialization in Regional Planning from School of Planning and Architecture, New Delhi; Masters of Science in Geography from Kurukshetra University, Diploma in Geo-informatics. He is having more than 17 years of experience International Business Development in Urban & Regional Planning, Urban Infrastructure, Highways & Roads, Power, Agro and Allied Services, Environmental and Social sectoras well as project execution, coordination and management of projects in Infrastructure and Physical Planning, Tourism. He has travelled to Zambia, Nigeria, Senegal, Gambia, Gabon, Yemen, Nepal etc for execution of assignments and contract negotiation of the projects.",
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
