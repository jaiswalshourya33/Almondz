// Corporate Governance section — mirrors the "Corporate Governance" dropdown on
// almondzglobalinfra.com. Only the five items that exist on the original site are
// listed here. Page bodies are filled in from client-supplied content.

export interface GovernanceDocument {
  /** Display title of the document */
  title: string;
  /** Short supporting line shown under the title */
  summary: string;
  /** Path to the PDF served from /public */
  file: string;
}

export interface AnnualReturnFiling {
  /** Financial year the return covers, e.g. "2024–2025" */
  period: string;
  /** Statutory form filed for that year */
  form: 'MGT-7' | 'MGT-9';
  /** Path to the PDF served from /public */
  file: string;
}

export interface DirectorResignationYear {
  /** Financial year the resignations fall in, e.g. "2024–2025" */
  period: string;
  /** Names of directors who resigned that year, exactly as published */
  directors: string[];
}

export interface GeneralMeetingNotice {
  /** Notice label exactly as published, e.g. "1st EGM Notice" */
  label: string;
  /** Path to the PDF served from /public */
  file: string;
}

export interface GeneralMeetingYear {
  /** Financial-year label, e.g. "FY 2025-26" */
  period: string;
  /** Notices issued that year, in published order */
  notices: GeneralMeetingNotice[];
}

export interface GeneralMeetingCategory {
  /** Full category name, e.g. "Extraordinary General Meeting" */
  category: string;
  /** Short form shown as a mono tag, e.g. "EGM" */
  abbr: string;
  /** Financial years with notices, newest first */
  years: GeneralMeetingYear[];
}

export interface CommitteeMember {
  /** Full name, exactly as published */
  name: string;
  /** Role within the committee, exactly as published */
  role: string;
}

export interface Committee {
  /** Committee name */
  name: string;
  /** Members and their roles */
  members: CommitteeMember[];
}

export interface CorporateGovernanceItem {
  /** URL slug under /corporate-governance/ */
  slug: string;
  /** Exact dropdown label as it appears on the original website */
  navLabel: string;
  /** Hero banner second line (page name, upper-cased with trailing period) */
  heroLine: string;
  /** Mono eyebrow shown above the page heading */
  eyebrow: string;
  /** Short intro line shown above the content on the page */
  intro: string;
  /** Original page this corresponds to on almondzglobalinfra.com */
  sourcePage: string;
  /** Downloadable documents listed on the page, if any */
  documents?: GovernanceDocument[];
  /** Board / management committees listed on the page, if any */
  committees?: Committee[];
  /** Annual Return filings (MGT-7 / MGT-9) listed on the page, newest first */
  annualReturns?: AnnualReturnFiling[];
  /** Directors who resigned, grouped by financial year, newest first */
  directorResignations?: DirectorResignationYear[];
  /** General Meeting notices (AGM / EGM), grouped by category then financial year */
  generalMeetings?: GeneralMeetingCategory[];
}

export const CORPORATE_GOVERNANCE: CorporateGovernanceItem[] = [
  {
    slug: 'policy',
    navLabel: 'Policy',
    heroLine: 'POLICY.',
    eyebrow: 'Board-Approved Policies',
    intro:
      'Board-approved policies governing conduct, remuneration and social responsibility at Almondz Global Infra-Consultant Limited. Each policy is available below as a PDF for viewing.',
    sourcePage: 'policy.php',
    documents: [
      {
        title: 'Nomination & Remuneration Policy',
        summary:
          'Framework for the appointment, evaluation and remuneration of Directors, Key Managerial Personnel and Senior Management.',
        file: '/policies/nomination-remuneration-policy.pdf',
      },
      {
        title: 'POSH Policy',
        summary:
          'Prevention of Sexual Harassment policy setting out a safe, respectful workplace and the redressal mechanism for complaints.',
        file: '/policies/posh-policy.pdf',
      },
      {
        title: 'Corporate Social Responsibility Policy',
        summary:
          'CSR objectives, focus areas, governance and implementation approach for the Company’s community and sustainability initiatives.',
        file: '/policies/corporate-social-responsibility-policy.pdf',
      },
    ],
  },
  {
    slug: 'composition-of-committees',
    navLabel: 'Composition of Committees',
    heroLine: 'COMPOSITION OF COMMITTEES.',
    eyebrow: 'Board & Management Committees',
    intro:
      'Constitution of the statutory and management committees of Almondz Global Infra-Consultant Limited, with their current members and respective roles.',
    sourcePage: 'composition-of-committees.php',
    committees: [
      {
        name: 'Audit Committee',
        members: [
          { name: 'Mr. Satish Chandra Sinha', role: 'Chairman/Member' },
          { name: 'Mr. Vijai Prakash Agrawal', role: 'Member' },
          { name: 'Mr. Sankha Dasgupta', role: 'Member' },
        ],
      },
      {
        name: 'Nomination and Remuneration Committee',
        members: [
          { name: 'Mr. Satish Chandra Sinha', role: 'Chairman/Member' },
          { name: 'Mr. Vijai Prakash Agrawal', role: 'Member' },
          { name: 'Mr. Sankha Dasgupta', role: 'Member' },
        ],
      },
      {
        name: 'Management Committee',
        members: [
          { name: 'Mr. Sudhakar Singh', role: 'Member of the Committee' },
          { name: 'Mr. Sankha Dasgupta', role: 'Member of the Committee' },
          { name: 'Mr. Sanjeet Kumar Ahlawat', role: 'Member of the Committee' },
        ],
      },
      {
        name: 'Internal Complaints Committee',
        members: [
          { name: 'Mrs. Anita Nayar', role: 'Presiding Officer' },
          { name: 'Mr. Harpal Singh', role: 'Member' },
          { name: 'Mr. Sunny Mahajan', role: 'Member' },
          { name: 'Mr. Ajay Pratap', role: 'Member' },
          { name: 'Mrs. Neelu Jain', role: 'Member (from NGO)' },
        ],
      },
    ],
  },
  {
    slug: 'annual-return',
    navLabel: 'Annual Return',
    heroLine: 'ANNUAL RETURN.',
    eyebrow: 'Statutory Filings',
    intro:
      'Annual Returns of Almondz Global Infra-Consultant Limited filed with the Registrar of Companies under Section 92 of the Companies Act, 2013. Each filing opens in an on-screen reader for viewing.',
    sourcePage: 'annual-return1.php',
    annualReturns: [
      { period: '2025–2026', form: 'MGT-7', file: '/annual-returns/2025-2026-mgt-7.pdf' },
      { period: '2024–2025', form: 'MGT-7', file: '/annual-returns/2024-2025-mgt-7.pdf' },
      { period: '2023–2024', form: 'MGT-7', file: '/annual-returns/2023-2024-mgt-7.pdf' },
      { period: '2022–2023', form: 'MGT-7', file: '/annual-returns/2022-2023-mgt-7.pdf' },
      { period: '2021–2022', form: 'MGT-7', file: '/annual-returns/2021-2022-mgt-7.pdf' },
      { period: '2020–2021', form: 'MGT-7', file: '/annual-returns/2020-2021-mgt-7.pdf' },
      { period: '2019–2020', form: 'MGT-7', file: '/annual-returns/2019-2020-mgt-7.pdf' },
      { period: '2019–2020', form: 'MGT-9', file: '/annual-returns/2019-2020-mgt-9.pdf' },
      { period: '2018–2019', form: 'MGT-9', file: '/annual-returns/2018-2019-mgt-9.pdf' },
      { period: '2017–2018', form: 'MGT-9', file: '/annual-returns/2017-2018-mgt-9.pdf' },
    ],
  },
  {
    slug: 'shareholders-info',
    navLabel: "Shareholders' Info",
    heroLine: "SHAREHOLDERS' INFO.",
    eyebrow: 'Investor Information',
    intro:
      'Shareholder and investor disclosures of Almondz Global Infra-Consultant Limited, including the record of Directors who have resigned from the Board, grouped by financial year.',
    sourcePage: 'shareholders-info.php',
    directorResignations: [
      { period: '2024–2025', directors: ['Mr. Amit Prakash Singh'] },
      {
        period: '2023–2024',
        directors: ['Mr. Vimal Kishore Kaushik', 'Mr. Ajay Kumar', 'Mr. Jagdeep Singh'],
      },
      { period: '2020–2021', directors: ['Mr. Satish Chandra Sinha', 'Mr. Vinod Kumar Giri'] },
    ],
  },
  {
    slug: 'general-meeting-notice',
    navLabel: 'General Meeting Notice',
    heroLine: 'GENERAL MEETING NOTICE.',
    eyebrow: 'General Meetings',
    intro:
      'Notices convening the General Meetings of Almondz Global Infra-Consultant Limited — Annual and Extraordinary — issued to shareholders under the Companies Act, 2013. Each notice opens in an on-screen reader for viewing.',
    sourcePage: 'general-meeting-notice.php',
    generalMeetings: [
      {
        category: 'Extraordinary General Meeting',
        abbr: 'EGM',
        years: [
          {
            period: 'FY 2025-26',
            notices: [
              { label: '1st EGM Notice', file: '/general-meeting-notices/egm-fy2025-26-1.pdf' },
              { label: '2nd EGM Notice', file: '/general-meeting-notices/egm-fy2025-26-2.pdf' },
              { label: '3rd EGM Notice', file: '/general-meeting-notices/egm-fy2025-26-3.pdf' },
            ],
          },
          {
            period: 'FY 2024-25',
            notices: [
              { label: '1st EGM Notice', file: '/general-meeting-notices/egm-fy2024-25-1.pdf' },
              { label: '2nd EGM Notice', file: '/general-meeting-notices/egm-fy2024-25-2.pdf' },
            ],
          },
        ],
      },
      {
        category: 'Annual General Meeting',
        abbr: 'AGM',
        years: [
          {
            period: 'FY 2025-26',
            notices: [{ label: '13th AGM Notice', file: '/general-meeting-notices/agm-fy2025-26-13th.pdf' }],
          },
          {
            period: 'FY 2024-25',
            notices: [{ label: '12th AGM Notice', file: '/general-meeting-notices/agm-fy2024-25-12th.pdf' }],
          },
          {
            period: 'FY 2023-24',
            notices: [{ label: '11th AGM Notice', file: '/general-meeting-notices/agm-fy2023-24-11th.pdf' }],
          },
          {
            period: 'FY 2022-23',
            notices: [{ label: '10th AGM Notice', file: '/general-meeting-notices/agm-fy2022-23-10th.pdf' }],
          },
        ],
      },
    ],
  },
];
