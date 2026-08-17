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

export const MANAGEMENT_TEAM: ManagementMember[] = [
  {
    id: "tiwari",
    name: "CP. Tiwari",
    title: "Executive Director – (Highway Design)",
    qualification: "Degree in Civil Engineering",
    experienceYears: 34,
    bio: "Mr. Tiwari holds a Degree in Civil Engineering, with more than 34 years of professional experience. He is having a rich experience as Quantity Surveyor/ Senior Surveyor, is responsible for supervision of topographical survey, review data, preparation of cost estimates, bill of quantities and analysis of rates, preparation of Technical Specification, suggest bid packaging documentation of final detailed project report including drawings and designs, assist the Client for finalizing Contract packages.",
    image: tiwari,
    email: "sk.gupta@almondzglobalinfra.com",
    featured: true
  },
  {
    id: "nirmal kumar",
    name: "Nirmal Kumar Sinha",
    title: "Executive Director (Railway, Metro And Urban Mobility)",
    qualification: "IT Kanpur alumnus, M. Tech (1979) and B. Tech (1977) in Civil Engineering",
    experienceYears: 35,
    bio: "Nirmal Kumar Sinha, an IIT Kanpur alumnus with an M. Tech (1979) and B. Tech (1977) in Civil Engineering, has over 35 years of extensive professional experience in all areas of railway engineering. His career is marked by technical excellence and dedication to the field.",
    image: nirmal,
    email: "rk.sharma@almondzglobalinfra.com",
    featured: true
  },
  {
    id: "gaurav",
    name: "Gaurav Sharma",
    title: "Vice President ( Survey Investigation Testing And GIS)",
    qualification: "Masters in Remote Sensing, Image Processing and Applications from University of Dundee, Scotland, UK",
    experienceYears: 15,
    bio: "Mr. Sharma has Masters in Remote Sensing, Image Processing and Applications from University of Dundee, Scotland, UK. He has of more than 15 years of experience in the geomatics industry and hands-on experience in Terrestrial, Mobile and Airborne LiDAR, 360° Panoramic Imagery Data Collection and Processing, DGPS/ RTK Collection and Processing, Aerial/ Satellite/ UAV Imagery Processing, Thematic Maps and Data Analytics. Proficient in handling business operations and marketing. He has worked in various projects related to Roads, Railways, Telecom, Mining, Hydropower, Townships and SEZ. He has been an advocate of Geospatial and BIM technology integration through various forums and has executed projects and programs globally.",
    image: gaurav,
    email: "gs.geomatics@almondzglobalinfra.com",
    featured: true
  },
  {
    id: "rahul",
    name: "Rahul Pratap",
    title: "Vice President",
    qualification: " Master’s Degree in Delivery Management",
    experienceYears: 15,
    bio: "Mr. Rahul Pratap Professional having Master’s Degree in Delivery Management with 14+ years’ experience in Business Development, Project Management, Bid Management, New Business, Business Planning & Strategy, Strategic Partnering & forming JVs/Consortiums, Contract Management, Client Relations, Government Proposals, People Management, Project Management and Client Expectations Management.",
    image: rahul,
    email: "rajesh.verma@almondzglobalinfra.com",
    featured: true
  },
  {
    id: "rashmi",
    name: "Rashmi Punia",
    title: "Chief Technology Officer",
    qualification: "Btech Graduate in Information Technology from I.P University Delhi",
    experienceYears: 12,
    bio: "Ms. Punia is a Btech Graduate in Information Technology from I.P University Delhi. With experience of more than 12 years, she has immense knowledge in the field of I.T including working knowledge of programming language like Java, core python, etc. She has worked as a senior software engineer in track management system for Centre for Railway information system (CRIS), Indian Railways including designing & developing for various assets of Indian Railway like Rail, Level crossing, Land Boundary, ODC, Fasting, etc. She is well versed with the technologies like Java, Servlets, JSP, Java Beans, JDBC. EJB, HTML, JavaScript, Struts, XML, Web Services, AJAX, Hibernate and many more. She recently pursued and received a certificate in Data Science from Harvard.",
    image: rashmi,
    email: "vikram.singh@almondzglobalinfra.com"
  },
  {
    id: "sunny",
    name: "Sunny Mahajan",
    title: "Vice President (Human Resources)",
    qualification: "",
    experienceYears: 16,
    bio: "Mr. Mahajan is a dynamic professional, with over 16 years of professional experience in Human Resource Management. He has been a part of Almondz Group for the last thirteen years and is currently heading the Human Resources Division. His expertise lies in overseeing all HR initiatives, systems and tactics, Recruitment and Selection, Performance Management, Payroll and Compliances, Training & Development, Audit & MIS, Analysing data and using HR metrics. At Almondz we firmly believe that fostering a healthy sense of community in our work-space is essential. Engaged employees are more like to perform better themselves, as well as inspire those around them to put in their best. At Almondz we celebrate our employees (and not just their work), with events that bring everyone together. When you join Almondz, you become a part of a family that provides you with an exciting and stimulating environment to grow and achieve greater professional heights.",
    image: sunny,
    email: "meera.nambiar@almondzglobalinfra.com"
  },
  {
    id: "sanjeev",
    name: "Sanjeev Jain",
    title: "Chief Financial Officer",
    qualification: "B. Com (Honors) and PGDBA (Finance) ",
    experienceYears: 22,
    bio: "Mr. Sanjeev Jain is B. Com (Honors) and PGDBA (Finance) having vast experience of more than 22 years in the field of Accounts, Finance and Taxation especially in Infrastructure advisory sector. Major experience in Corporate Financials, Income Tax, Goods and Service Tax, MIS Reporting, Financial Projections, Costing Analysis, project Costing and variance analysis.",
    image: sanjeev,
    email: "rajiv.malhotra@almondzglobalinfra.com"
  },
];
