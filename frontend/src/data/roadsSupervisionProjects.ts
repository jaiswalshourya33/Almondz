import { Project } from './projects';

import tuticorinImg from '../images/roads-sup-tuticorin-port-road.png';
import tuticorinImg2 from '../images/roads-sup-tuticorin-port-road-2.png';
import nh39Img from '../images/roads-sup-nh39-jharkhand.png';
import nh39Img2 from '../images/roads-sup-nh39-jharkhand-2.png';
import byrapuraImg from '../images/roads-sup-byrapura-challakere.png';
import byrapuraImg2 from '../images/roads-sup-byrapura-challakere-2.png';
import hoshiarpurImg from '../images/roads-sup-hoshiarpur-una.png';
import hoshiarpurImg2 from '../images/roads-sup-hoshiarpur-una-2.png';
import assamImg from '../images/roads-sup-assam-nh15-nh315.jpg';
import assamImg2 from '../images/roads-sup-assam-nh15-nh315-2.jpg';
import puneImg from '../images/roads-sup-pune-service-roads.jpg';
import puneImg2 from '../images/roads-sup-pune-service-roads-2.jpg';
import nh530bImg from '../images/roads-sup-nh530b-devinagar-kasganj.jpg';
import nh530bImg2 from '../images/roads-sup-nh530b-devinagar-kasganj-2.jpg';

/**
 * Detailed supervision assignments for the Roads, Bridges, Highways & Tunnels
 * sector, sourced verbatim from SS_Team_Project_Details.md (and the site
 * photographs from "SS Team - Project Details.docx"). Rendered as the
 * "Representative Projects" carousel on the Roads sector page. Each entry's
 * `description` reproduces the document's "Name of the Project" and "Brief note"
 * text; `impact` collects the document's length / cost / progress figures.
 */
const SECTOR = 'Roads, Bridges, Highways & Tunnels';
const SECTOR_SLUG = 'roads-highways';

export const ROADS_SUPERVISION_PROJECTS: Project[] = [
  {
    id: 'sup-tuticorin-port-road-nh7a',
    slug: 'sup-tuticorin-port-road-nh7a',
    title: 'Six Laning of Tuticorin Port Road, NH-7A (New NH-138)',
    sector: SECTOR,
    sectorSlug: SECTOR_SLUG,
    status: 'Completed',
    location: 'Tamil Nadu, India',
    coordinates: 'India',
    image: tuticorinImg,
    detailImage: tuticorinImg2,
    role: "Authority's Engineer for Supervision",
    client: 'NHAI',
    description:
      `Consultancy Services for Authority's Engineer for Supervision of "Six Lanning of Tuticorin Port Road section of NH-7A (New NH-138) from Km 0.000 to Km 6.140 [Effective Length – 5.16 km] on EPC Mode in the state of Tamil Nadu". The project road starts from NH-7 (New NH-138) Km-0+000 to Km-6+140 (Effective Length is 5.160Km) and the project construction six-lane with service road configuration which is connecting to the V. O. Chidambaranar Port.`,
    impact:
      `Total length 5.160 Km; total project cost Rs. 130.203 Cr. Physical progress 100% (construction period completed / O&M started on 01.07.2025); financial progress 98.07% (construction period completed). Date of COD 18.07.2025 (O&M in progress).`,
    servicesProvided: ["Authority's Engineer for Supervision"],
    authorityEngineer: 'M/s Almondz Global Infra Consultant Limited jv with M/s Geo Design & Research Pvt. Ltd.',
    contractor: 'M/s PST Engineering Construction',
    totalLength: '5.160 Km',
    totalCost: 'Rs. 130.203 Cr.',
    physicalProgress: '100% (Construction period completed / O&M started on 01.07.2025)',
    financialProgress: '98.07% (Construction period completed)',
    commercialOperationDate: '18.07.2025 (O&M in progress)',
  },
  {
    id: 'sup-nh39-four-laning-jharkhand-pkg2',
    slug: 'sup-nh39-four-laning-jharkhand-pkg2',
    title: 'Four Laning of NH-39 (Old NH-75), Jharkhand – Package II',
    sector: SECTOR,
    sectorSlug: SECTOR_SLUG,
    status: 'Ongoing',
    location: 'Jharkhand, India',
    coordinates: 'India',
    image: nh39Img,
    detailImage: nh39Img2,
    role: 'Independent Engineer services',
    client: 'NHAI',
    description:
      `Independent Engineer services for Four laning of NH-39 (old NH-75) from design Km 97+600 (existing Km 96+470) (Udaipura village) to design Km 147+540 (existing Km 148+020) (Bhogu Village) in the State of Jharkhand on Hybrid Annuity mode (Package-II). The project road starts from Udaipura village and terminate at Bhogu village from Km-97+600 to Km-147+540. The construction package for the project includes developing the existing two lane to four lane with paved shoulder configuration.`,
    impact:
      `Total length 49.940 Km; total project cost Rs. 908.00 Cr. Physical progress 30%; financial progress 27%.`,
    servicesProvided: ['Independent Engineer services'],
    authorityEngineer: 'M/s Almondz Global Infra Consultant Limited jv with M/s Geo Design & Research Pvt. Ltd.',
    contractor: 'M/s DRA Baidyanath Highways Private Limited Infra Projects Developer.',
    totalLength: '49.940 Km',
    totalCost: 'Rs. 908.00 Cr.',
    physicalProgress: '30%',
    financialProgress: '27%',
  },
  {
    id: 'sup-byrapura-challakere-nh150a-pkg2-om',
    slug: 'sup-byrapura-challakere-nh150a-pkg2-om',
    title: 'Byrapura–Challakere Four Laning (NH-150 A), Karnataka – Package II (during O&M)',
    sector: SECTOR,
    sectorSlug: SECTOR_SLUG,
    status: 'Ongoing',
    location: 'Karnataka, India',
    coordinates: 'India',
    image: byrapuraImg,
    detailImage: byrapuraImg2,
    role: 'Independent Engineer during Operation & Maintenance',
    client: 'NHAI',
    description:
      `Consultancy Services as Independent Engineer during Operation & Maintenance for Package-II Four laning Byrapura to Challakere section of NH-150 A from Km.308.550 to Km.358.500 on HAM Mode under Bharatamala Pariyojana in the State of Karnataka. The project road starts from Byrapura and terminate at Challakera from Km-308+550 to Km-358+500. The construction package for the maintenance and operation stage four lane with paved shoulder configuration.`,
    impact:
      `Total length 49.950 Km; total project cost Rs. 841.70 Cr. Physical progress 98.0%; financial progress 98.0%.`,
    servicesProvided: ['Independent Engineer during Operation & Maintenance'],
    authorityEngineer: 'M/s URS Scott Wilson India Pvt. Ltd. In Jv with Almondz Global Infra Consultant Limited.',
    contractor: 'M/s DBL Byrapura Challakere Highways Pvt. Ltd.',
    totalLength: '49.950 Km',
    totalCost: 'Rs. 841.70 Cr.',
    physicalProgress: '98.0%',
    financialProgress: '98.0%',
  },
  {
    id: 'sup-hoshiarpur-una-nh503a-pkg4',
    slug: 'sup-hoshiarpur-una-nh503a-pkg4',
    title: 'Hoshiarpur–Una Rehabilitation & Hoshiarpur Bypass (NH-503A), Punjab – Package IV',
    sector: SECTOR,
    sectorSlug: SECTOR_SLUG,
    status: 'Ongoing',
    location: 'Punjab, India',
    coordinates: 'India',
    image: hoshiarpurImg,
    detailImage: hoshiarpurImg2,
    role: "Authority's Engineer for Supervision",
    client: 'NHAI',
    description:
      `Consultancy services for Authority's Engineer for Supervision of Rehabilitation and Upgradation of Hoshiarpur to Una up to PB/HP border section of NH-503A to 2 lane paved shoulder configuration (from Design Chainage km 15+200 to Design Chainage km 30+348) & construction of 4 lane Hoshiarpur Bypass (from Design Chainage km 2+425 to Design Chainage km 15+200) (Total Length: 27.923 Kms) in the State of Punjab (Package-IV) under NH(O) on EPC mode. The project road starts from Hoshiarpur and terminates at Una near Himachal Pradesh from Km-15+200 to Km-30+348. The construction of project in very important for the connectivity of inter state road i.e. Punjab to Himachal Pradesh.`,
    impact:
      `Total length 27.923 Km; total project cost Rs. 243.13 Cr. Physical progress 26.71%; financial progress 23.50%.`,
    servicesProvided: ["Authority's Engineer for Supervision"],
    authorityEngineer: 'M/s Almondz Global Infra Consultant Limited In Jv with AICONS Engineering Private Limited',
    contractor: 'M/s Amar Infrastructure Ltd and M/s P.S. Constructions',
    totalLength: '27.923 Km',
    totalCost: 'Rs. 243.13 Cr.',
    physicalProgress: '26.71%',
    financialProgress: '23.50%',
  },
  {
    id: 'sup-assam-nh15-nh315-pkg3-4-5',
    slug: 'sup-assam-nh15-nh315-pkg3-4-5',
    title: 'NH-15 Tinsukia–Makum & NH-315 Dibrugarh–Ledo Improvement, Assam – Packages 3, 4 & 5',
    sector: SECTOR,
    sectorSlug: SECTOR_SLUG,
    status: 'Ongoing',
    location: 'Assam, India',
    coordinates: 'India',
    image: assamImg,
    detailImage: assamImg2,
    role: "Authority's Engineer for Supervision",
    client: 'NHIDCL',
    description:
      `Consultancy Services as Authority's Engineer for Supervision of i) Widening/Improvement to 4 (Four) Lane with Paved Shoulder from km 626+030 (NalanihullaGaon) to km 650+450 (Chotahapjan) on existing Tinsukia -Makum Bypass of NH-15 (Old NH 37) and Improvement of existing NH-315 (Old NH-38) from Km 0+000 (Chotahapjan) to Km 16+900 (Bogapani section) (2-Lane + PS) in the State of Assam on EPC mode. (Package-3) ii) Strengthening/Improvement to 2-Lane Lane with Paved Shoulder from km 16+900 (Bogapani) to km 27+150 (GolaiGoan) on existing Dibrugarh to Ledo section with proposed Digboi Bypass (Green Field and Brownfield)(2-Lane+PS) of NH-315 (Old NH-38)in Tinsukia District in the State of Assam on EPC mode(Package-4) iii) Strengthening/Improvement to 2-Lane with Paved Shoulder from km 27+150 (GolaiGaon) to km 47+682 (Ledo) on existing Dibrugarh to Ledo section with proposed Margherita and Ledo Bypass (Green Field and Brownfield) (2-Lane+PS) of NH-315 (Old NH-38) in Tinsukia District in the State of Assam on EPC mode.`,
    impact:
      `Total length (41.320 Kms PKG-3, 10.250 Kms-PKG-4 & 20.530 Kms-PKG-5). Total project cost Rs. 210.00 Cr.-PKG-3, Rs.114.99 Cr.-PKG-4 & Rs.272.77 Cr.- PKG-5. Physical progress PKG-3: 90.98%, PKG-4: 22.70%, PKG-5: 8.89%. Financial progress PKG-3: 90.06%, PKG-4: 18.94% & PKG-5: 6.53%.`,
    servicesProvided: ["Authority's Engineer for Supervision"],
    authorityEngineer: 'M/s Almondz Global Infra Consultant Limited In Jv with Ayoleeza Consultants Pvt. Ltd.',
    contractor: 'M/s (TTC Infra India-PKG-3) & (M/s RK Infracorp Limited-PKG-4)',
    totalLength: '(41.320 Kms PKG-3, 10.250 Kms-PKG-4 & 20.530 Kms-PKG-5)',
    totalCost: 'Rs. 210.00 Cr.-PKG-3, Rs.114.99 Cr.-PKG-4 & Rs.272.77 Cr.- PKG-5',
    physicalProgress: 'PKG-3: 90.98%, PKG-4: 22.70%, PKG-5: 8.89%',
    financialProgress: 'PKG-3: 90.06%, PKG-4: 18.94% & PKG-5: 6.53%',
  },
  {
    id: 'sup-pune-city-service-roads-nh48',
    slug: 'sup-pune-city-service-roads-nh48',
    title: 'Pune City Service Roads, Pune–Satara Section (NH-48), Maharashtra',
    sector: SECTOR,
    sectorSlug: SECTOR_SLUG,
    status: 'Ongoing',
    location: 'Maharashtra, India',
    coordinates: 'India',
    image: puneImg,
    detailImage: puneImg2,
    role: "Authority's Engineer for Supervision",
    client: 'NHAI',
    description:
      `Consultancy Services as Authority's Engineer for Supervision of Upgradation & rehabilitation of Service Roads on both sides in urban areas of Pune City on Pune-Satara section of NH-48 in the state of Maharashtra on EPC Mode under NH(O) Projects.`,
    impact:
      `Total length (32.280 Kms); total project cost Rs. 321 Cr. Physical progress 25.44%; financial progress 17.79%.`,
    servicesProvided: ["Authority's Engineer for Supervision"],
    authorityEngineer: 'M/s. Almondz Global Infra – Consultant Limited IN JV With EKAM Venture in association with Kaius Consulting Pvt. Ltd.',
    contractor: 'M/S DMR BUILDERS PRIVATE LIMITED',
    totalLength: '(32.280 Kms )',
    totalCost: 'Rs. 321 Cr.',
    physicalProgress: '25.44%',
    financialProgress: '17.79%',
  },
  {
    id: 'sup-nh530b-four-laning-devinagar-kasganj',
    slug: 'sup-nh530b-four-laning-devinagar-kasganj',
    title: 'Four Laning of NH 530B, Devinagar Bypass to Kasganj Bypass, Uttar Pradesh',
    sector: SECTOR,
    sectorSlug: SECTOR_SLUG,
    status: 'Ongoing',
    location: 'Uttar Pradesh, India',
    coordinates: 'India',
    image: nh530bImg,
    detailImage: nh530bImg2,
    role: 'Independent Engineer services',
    client: 'NHAI',
    description:
      `Independent Engineer services for Construction of "Four laning of NH 530B from Devinagar Bypass (End) (Existing Km. 208.000 of NH 530B/Design Km. 66.000) to Kasganj Bypass (End) (Existing Km.150.100 of NH 530B/ Design Km. 123.100) in the State of Uttar Pradesh on Hybrid Annuity mode. -`,
    impact:
      `Total length (58.342 Kms); total project cost (Rs.1226.87 Cr.). Physical progress 78.90%; financial progress 75.10%.`,
    servicesProvided: ['Independent Engineer services'],
    authorityEngineer: 'URS Scott Wilson India Private Limited In Joint Venture with Almondz Global Infra Consultant Limited',
    contractor: 'M/s GR Devinagar Kasganj Highway Private limited',
    totalLength: '(58.342 Kms )',
    totalCost: '(Rs.1226.87 Cr.)',
    physicalProgress: '78.90%',
    financialProgress: '75.10%',
  },
];
