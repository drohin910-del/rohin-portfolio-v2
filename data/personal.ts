export const SITE_URL = "https://rohin-portfolio-tau.vercel.app";

export const personal = {
  name: "Rohin Dillibabu",
  nameFormal: "Rohin DILLIBABU",
  roleLine: "Corporate Finance · FP&A · Financial Analyst — internship candidate",
  location: "Paris, France",
  email: "drohin910@gmail.com",
  phoneDisplay: "+33 7 80 87 68 41",
  phoneHref: "tel:+33780876841",
  linkedinDisplay: "linkedin.com/in/rohin20",
  linkedinHref: "https://www.linkedin.com/in/rohin20",
  cvHref: "/resume/Rohin-Dillibabu-CV.pdf",
  intro: [
    "Master in Management student specialising in Corporate Finance at ESSCA, Paris.",
    "I build Excel financial models using public filings, including a driver-based three-statement forecast for Starbucks and a DCF valuation with comparable company analysis for Airbus.",
  ],
  availability: {
    internship: "6-month end-of-studies internship",
    locations: "France",
    agreement: "Convention de stage from ESSCA",
  },
  targetRoles: ["FP&A Intern", "Corporate Finance Intern", "Financial Analyst Intern"],
} as const;

export const education = [
  {
    school: "ESSCA School of Management",
    place: "Paris",
    degree: "Master in Management (MiM), Corporate Finance – Accounting and Finance",
    period: "2025 – 2027",
    detail:
      "Key courses: Advanced Corporate Finance (Financial Modelling) · Advanced Management Control · Consolidated Accounts & IFRS · Quantitative Methods for Finance",
  },
  {
    school: "Madras Christian College",
    place: "Chennai, India",
    degree: "Bachelor of Business Administration (BBA)",
    period: "2022 – 2025",
    detail: null,
  },
] as const;

export const experience = {
  role: "HR Intern",
  company: "KUN Capital (Ashok Leyland)",
  place: "Chennai, India",
  period: "Feb – Mar 2025",
  bullets: [
    "Organised and maintained records for 100+ employees in Excel.",
    "Coordinated compensation-data processing for 100+ employees.",
    "Screened and tracked 50+ candidates through the hiring pipeline.",
  ],
} as const;

export const skills = [
  {
    group: "Core",
    items: ["FP&A", "Financial Analysis", "Forecasting & Scenarios", "Valuation (DCF, Comparables)", "KPI Reporting"],
  },
  {
    group: "Finance & Modelling",
    items: ["Three-Statement Modelling", "DCF (WACC, CAPM)", "Comparables", "Scenario Analysis", "NPV & IRR"],
  },
  {
    group: "Tools",
    items: ["Advanced Excel (XLOOKUP, INDEX-MATCH, CHOOSE/MATCH, PivotTables)", "Power BI", "Power Query", "DAX", "PowerPoint"],
  },
] as const;

export const languages = ["English C1 (IELTS 7.0)", "French A2", "Tamil (native)"] as const;

export const interests = [
  "Personal Investing & Market Analysis",
  "Learning French daily",
  "Documentary video-making",
  "Chess",
  "Football",
] as const;
