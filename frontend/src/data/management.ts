import tiwari from '../images/CP_Tiwari.jpg';
import nirmal from '../images/nirmala kumar sinha.jpg';
import gaurav from '../images/sharma.jpg';
import rahul from '../images/rahul.jpg';
import rashmi from '../images/rashmi.jpg';
import sunny from '../images/sunny.jpg';
import sanjeev from '../images/sanjeev-jain.jpg'

export interface ManagementMember {
  id: string;
  name: string;
  title: string;
  qualification: string;
  experienceYears: number;
  bio: string;
  image: string;
  email: string;
  linkedin?: string;
  featured?: boolean;
  department?: string;
  competencies?: string[];
  keyProjects?: string[];
}

// Generic initials-avatar placeholder for team members whose photograph isn't
// available in-house yet — never substitute a stock/stand-in photo for a real,
// named person.
const avatarPlaceholder = (name: string) =>
  `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=0D1B2A&color=F2834C&size=256&bold=true`;

const COMPANY_EMAIL = "contact@almondzglobalinfra.com";

export const MANAGEMENT_TEAM: ManagementMember[] = [
  {
    id: "nirmal-kumar-sinha",
    name: "Nirmal Kumar Sinha",
    title: "Executive Director (Railway, Metro And Urban Mobility)",
    qualification: "IIT Kanpur alumnus, M. Tech (1979) and B. Tech (1977) in Civil Engineering",
    experienceYears: 40,
    bio: "Nirmal Kumar Sinha, an IIT Kanpur alumnus with an M. Tech (1979) and B. Tech (1977) in Civil Engineering, has over 40 years of extensive professional experience in all areas of railway engineering. His career is marked by technical excellence and dedication to the field.",
    image: nirmal,
    email: COMPANY_EMAIL,
    department: "Engineering & Technical",
    competencies: ["Railways"],
    featured: true
  },
  {
    id: "cp-tiwari",
    name: "CP. Tiwari",
    title: "Executive Director – (Highway Design & DPR)",
    qualification: "Degree in Civil Engineering",
    experienceYears: 38,
    bio: "Mr. Tiwari holds a Degree in Civil Engineering, with more than 38 years of professional experience. He is having a rich experience as Quantity Surveyor/ Senior Surveyor, is responsible for supervision of topographical survey, review data, preparation of cost estimates, bill of quantities and analysis of rates, preparation of Technical Specification, suggest bid packaging documentation of final detailed project report including drawings and designs, assist the Client for finalizing Contract packages.",
    image: tiwari,
    email: COMPANY_EMAIL,
    department: "Engineering & Technical",
    competencies: ["Highway Design", "DPR"],
    featured: true
  },
  {
    id: "ashok-kumar-agrawal",
    name: "Ashok Kumar Agrawal",
    title: "Highways Specialist",
    qualification: "Domain Specialist — Highways",
    experienceYears: 35,
    bio: "Ashok Kumar Agrawal brings more than 35 years of experience in highways engineering, contributing to AGICL's road and highway consultancy assignments across India.",
    image: avatarPlaceholder("Ashok Kumar Agrawal"),
    email: COMPANY_EMAIL,
    department: "Engineering & Technical",
    competencies: ["Highways"]
  },
  {
    id: "salil-kumar-yadav",
    name: "Salil Kumar Yadav",
    title: "Environmental Impact Assessment Specialist",
    qualification: "Domain Specialist — Environmental Impact Assessment",
    experienceYears: 35,
    bio: "Salil Kumar Yadav brings more than 35 years of experience in Environmental Impact Assessment (EIA), supporting AGICL's environmental and social compliance work across infrastructure sectors.",
    image: avatarPlaceholder("Salil Kumar Yadav"),
    email: COMPANY_EMAIL,
    department: "Environmental & ESG",
    competencies: ["Environmental Impact Assessment"]
  },
  {
    id: "amit-sardana",
    name: "Amit Sardana",
    title: "Water & Wastewater Specialist",
    qualification: "Domain Specialist — Water & Wastewater",
    experienceYears: 30,
    bio: "Amit Sardana brings more than 30 years of experience in Water & Wastewater engineering, supporting AGICL's water infrastructure consultancy assignments.",
    image: avatarPlaceholder("Amit Sardana"),
    email: COMPANY_EMAIL,
    department: "Engineering & Technical",
    competencies: ["Water & Wastewater"]
  },
  {
    id: "sanjeev-jain",
    name: "Sanjeev Jain",
    title: "Chief Financial Officer",
    qualification: "B. Com (Honors) and PGDBA (Finance)",
    experienceYears: 25,
    bio: "Mr. Sanjeev Jain is B. Com (Honors) and PGDBA (Finance) having vast experience of more than 25 years in the field of Accounts, Finance and Taxation especially in Infrastructure advisory sector. Major experience in Corporate Financials, Income Tax, Goods and Service Tax, MIS Reporting, Financial Projections, Costing Analysis, project Costing and variance analysis.",
    image: sanjeev,
    email: COMPANY_EMAIL,
    department: "Executive Leadership",
    competencies: ["Finance", "Taxation"],
    featured: true
  },
  {
    id: "subhash-goyal",
    name: "Subhash Goyal",
    title: "Water & Wastewater Specialist",
    qualification: "Domain Specialist — Water & Wastewater",
    experienceYears: 30,
    bio: "Subhash Goyal brings more than 30 years of experience in Water & Wastewater engineering, supporting AGICL's water infrastructure consultancy assignments.",
    image: avatarPlaceholder("Subhash Goyal"),
    email: COMPANY_EMAIL,
    department: "Engineering & Technical",
    competencies: ["Water & Wastewater"]
  },
  {
    id: "rk-gupta",
    name: "R K Gupta",
    title: "Hydrology Specialist",
    qualification: "Domain Specialist — Hydrology",
    experienceYears: 35,
    bio: "R K Gupta brings more than 35 years of experience in Hydrology, supporting AGICL's water resource and river engineering assignments.",
    image: avatarPlaceholder("R K Gupta"),
    email: COMPANY_EMAIL,
    department: "Engineering & Technical",
    competencies: ["Hydrology"]
  },
  {
    id: "himat-singh",
    name: "Himat Singh",
    title: "Road Safety Specialist",
    qualification: "Domain Specialist — Road Safety",
    experienceYears: 25,
    bio: "Himat Singh brings more than 25 years of experience in Road Safety, supporting AGICL's road safety audit and engineering assignments.",
    image: avatarPlaceholder("Himat Singh"),
    email: COMPANY_EMAIL,
    department: "Engineering & Technical",
    competencies: ["Road Safety"]
  },
  {
    id: "uma-devi",
    name: "Uma Devi",
    title: "Road Safety Specialist",
    qualification: "Domain Specialist — Road Safety",
    experienceYears: 25,
    bio: "Uma Devi brings more than 25 years of experience in Road Safety, supporting AGICL's road safety audit and engineering assignments.",
    image: avatarPlaceholder("Uma Devi"),
    email: COMPANY_EMAIL,
    department: "Engineering & Technical",
    competencies: ["Road Safety"]
  },
  {
    id: "prakash-singh-bhandari",
    name: "Prakash Singh Bhandari",
    title: "Infrastructure Advisory Specialist",
    qualification: "Domain Specialist — Infrastructure Advisory",
    experienceYears: 25,
    bio: "Prakash Singh Bhandari brings more than 25 years of experience in Infrastructure Advisory, supporting AGICL's project development and advisory mandates.",
    image: avatarPlaceholder("Prakash Singh Bhandari"),
    email: COMPANY_EMAIL,
    department: "Project Management",
    competencies: ["Infrastructure Advisory"]
  },
  {
    id: "vikas-galhotra",
    name: "Vikas Galhotra",
    title: "Finance Specialist",
    qualification: "Domain Specialist — Finance",
    experienceYears: 25,
    bio: "Vikas Galhotra brings more than 25 years of experience in Finance, supporting AGICL's corporate finance and project funding functions.",
    image: avatarPlaceholder("Vikas Galhotra"),
    email: COMPANY_EMAIL,
    department: "Financial Advisory",
    competencies: ["Finance"]
  },
  {
    id: "ila-dobhal",
    name: "Ila Dobhal",
    title: "Transaction Advisory Specialist",
    qualification: "Domain Specialist — Transaction Advisory",
    experienceYears: 20,
    bio: "Ila Dobhal brings more than 20 years of experience in Transaction Advisory, supporting AGICL's PPP structuring and bid process management assignments.",
    image: avatarPlaceholder("Ila Dobhal"),
    email: COMPANY_EMAIL,
    department: "Financial Advisory",
    competencies: ["Transaction Advisory"]
  },
  {
    id: "ashish-kumar",
    name: "Ashish Kumar",
    title: "Pavement Specialist",
    qualification: "Domain Specialist — Pavement Engineering",
    experienceYears: 15,
    bio: "Ashish Kumar brings more than 15 years of experience as a Pavement Specialist, supporting AGICL's highway design and road assessment assignments.",
    image: avatarPlaceholder("Ashish Kumar"),
    email: COMPANY_EMAIL,
    department: "Engineering & Technical",
    competencies: ["Pavement Engineering"]
  },
  {
    id: "nitin-suri",
    name: "Nitin Suri",
    title: "Transaction Advisory Specialist",
    qualification: "Domain Specialist — Transaction Advisory",
    experienceYears: 25,
    bio: "Nitin Suri brings more than 25 years of experience in Transaction Advisory, supporting AGICL's PPP structuring and bid process management assignments.",
    image: avatarPlaceholder("Nitin Suri"),
    email: COMPANY_EMAIL,
    department: "Financial Advisory",
    competencies: ["Transaction Advisory"]
  },
  {
    id: "gaurav-sharma",
    name: "Gaurav Sharma",
    title: "Vice President (Survey Investigation Testing And GIS)",
    qualification: "Masters in Remote Sensing, Image Processing and Applications from University of Dundee, Scotland, UK",
    experienceYears: 20,
    bio: "Mr. Sharma has Masters in Remote Sensing, Image Processing and Applications from University of Dundee, Scotland, UK. He has more than 20 years of experience in the geomatics industry and hands-on experience in Terrestrial, Mobile and Airborne LiDAR, 360° Panoramic Imagery Data Collection and Processing, DGPS/ RTK Collection and Processing, Aerial/ Satellite/ UAV Imagery Processing, Thematic Maps and Data Analytics. Proficient in handling business operations and marketing. He has worked in various projects related to Roads, Railways, Telecom, Mining, Hydropower, Townships and SEZ. He has been an advocate of Geospatial and BIM technology integration through various forums and has executed projects and programs globally.",
    image: gaurav,
    email: COMPANY_EMAIL,
    department: "Engineering & Technical",
    competencies: ["Survey & GIS", "LiDAR"],
    featured: true
  },
  {
    id: "kunal-siddhi",
    name: "Kunal Siddhi",
    title: "Structure Design Specialist",
    qualification: "Domain Specialist — Structure Design",
    experienceYears: 15,
    bio: "Kunal Siddhi brings more than 15 years of experience in Structure Design, supporting AGICL's bridge and structural engineering assignments.",
    image: avatarPlaceholder("Kunal Siddhi"),
    email: COMPANY_EMAIL,
    department: "Engineering & Technical",
    competencies: ["Structure Design"]
  },
  {
    id: "rashmi-punia",
    name: "Rashmi Punia",
    title: "Chief Technology Officer",
    qualification: "Btech Graduate in Information Technology from I.P University Delhi",
    experienceYears: 15,
    bio: "Ms. Punia is a Btech Graduate in Information Technology from I.P University Delhi. With experience of more than 15 years, she has immense knowledge in the field of I.T including working knowledge of programming language like Java, core python, etc. She has worked as a senior software engineer in track management system for Centre for Railway information system (CRIS), Indian Railways including designing & developing for various assets of Indian Railway like Rail, Level crossing, Land Boundary, ODC, Fasting, etc. She is well versed with the technologies like Java, Servlets, JSP, Java Beans, JDBC. EJB, HTML, JavaScript, Struts, XML, Web Services, AJAX, Hibernate and many more. She recently pursued and received a certificate in Data Science from Harvard.",
    image: rashmi,
    email: COMPANY_EMAIL,
    department: "Executive Leadership",
    competencies: ["Information Technology"]
  },
  {
    id: "vinay-kumar",
    name: "Vinay Kumar",
    title: "Highways Specialist",
    qualification: "Domain Specialist — Highways",
    experienceYears: 15,
    bio: "Vinay Kumar brings more than 15 years of experience in highways engineering, supporting AGICL's road and highway consultancy assignments.",
    image: avatarPlaceholder("Vinay Kumar"),
    email: COMPANY_EMAIL,
    department: "Engineering & Technical",
    competencies: ["Highways"]
  },
  {
    id: "rajni-sharma",
    name: "Rajni Sharma",
    title: "Infrastructure Advisory Specialist",
    qualification: "Domain Specialist — Infrastructure Advisory",
    experienceYears: 15,
    bio: "Rajni Sharma brings more than 15 years of experience in Infrastructure Advisory, supporting AGICL's project development and advisory mandates.",
    image: avatarPlaceholder("Rajni Sharma"),
    email: COMPANY_EMAIL,
    department: "Project Management",
    competencies: ["Infrastructure Advisory"]
  },
  {
    id: "vartika-srivastava",
    name: "Vartika Srivastava",
    title: "Finance Consultant",
    qualification: "Domain Specialist — Finance",
    experienceYears: 12,
    bio: "Vartika Srivastava brings more than 12 years of experience as a Finance Consultant, supporting AGICL's financial advisory functions.",
    image: avatarPlaceholder("Vartika Srivastava"),
    email: COMPANY_EMAIL,
    department: "Financial Advisory",
    competencies: ["Finance"]
  },
  {
    id: "shailja-agarwal",
    name: "Shailja Agarwal",
    title: "Finance Consultant",
    qualification: "Domain Specialist — Finance",
    experienceYears: 10,
    bio: "Shailja Agarwal brings more than 10 years of experience as a Finance Consultant, supporting AGICL's financial advisory functions.",
    image: avatarPlaceholder("Shailja Agarwal"),
    email: COMPANY_EMAIL,
    department: "Financial Advisory",
    competencies: ["Finance"]
  },
  {
    id: "arindam-biswas",
    name: "Arindam Biswas",
    title: "Business Development Specialist",
    qualification: "Domain Specialist — Business Development",
    experienceYears: 35,
    bio: "Arindam Biswas brings more than 35 years of experience in Business Development, supporting AGICL's institutional client relationships and growth strategy.",
    image: avatarPlaceholder("Arindam Biswas"),
    email: COMPANY_EMAIL,
    department: "Project Management",
    competencies: ["Business Development"]
  },
  {
    id: "rahul-pratap",
    name: "Rahul Pratap",
    title: "Vice President (Business Development)",
    qualification: "Master's Degree in Delivery Management",
    experienceYears: 15,
    bio: "Mr. Rahul Pratap is a professional having a Master's Degree in Delivery Management with over 15 years' experience in Business Development, Project Management, Bid Management, New Business, Business Planning & Strategy, Strategic Partnering & forming JVs/Consortiums, Contract Management, Client Relations, Government Proposals, People Management, Project Management and Client Expectations Management.",
    image: rahul,
    email: COMPANY_EMAIL,
    department: "Project Management",
    competencies: ["Business Development"],
    featured: true
  },
  {
    id: "sahil-kaushal",
    name: "Sahil Kaushal",
    title: "Business Development Specialist",
    qualification: "Domain Specialist — Business Development",
    experienceYears: 10,
    bio: "Sahil Kaushal brings more than 10 years of experience in Business Development, supporting AGICL's institutional client relationships and growth strategy.",
    image: avatarPlaceholder("Sahil Kaushal"),
    email: COMPANY_EMAIL,
    department: "Project Management",
    competencies: ["Business Development"]
  },
  {
    id: "sunny-mahajan",
    name: "Sunny Mahajan",
    title: "Vice President (Human Resources)",
    qualification: "",
    experienceYears: 16,
    bio: "Mr. Mahajan is a dynamic professional, with over 16 years of professional experience in Human Resource Management. He has been a part of Almondz Group for the last thirteen years and is currently heading the Human Resources Division. His expertise lies in overseeing all HR initiatives, systems and tactics, Recruitment and Selection, Performance Management, Payroll and Compliances, Training & Development, Audit & MIS, Analysing data and using HR metrics. At Almondz we firmly believe that fostering a healthy sense of community in our work-space is essential. Engaged employees are more like to perform better themselves, as well as inspire those around them to put in their best. At Almondz we celebrate our employees (and not just their work), with events that bring everyone together. When you join Almondz, you become a part of a family that provides you with an exciting and stimulating environment to grow and achieve greater professional heights.",
    image: sunny,
    email: COMPANY_EMAIL,
    department: "Executive Leadership",
    competencies: ["Human Resources"]
  },
];
