// Every figure below is taken from the final Starbucks workbook (master prompt, section 3.2).

export const starbucks = {
  slug: "starbucks-fpa",
  path: "/projects/starbucks-fpa/",
  title: "Starbucks Corporation — Driver-Based FP&A Model",
  shortTitle: "Starbucks Corporation",
  classification: "FP&A · Financial modelling · Performance analysis",
  period: "FY2023A–FY2025A historical · FY2026F–FY2028F forecast",
  currency: "USD millions unless stated",
  built: "Jul 2026",
  sheets: 14,
  question: "How will Starbucks perform over the next three years, and how wide is the range of outcomes?",
  answer: [
    "In the base case, revenue grows 17.6% from $37.2bn (FY2025A) to $43.7bn (FY2028F) and operating margin recovers from 7.9% to 12.6% as the one-off FY2025 restructuring charge falls away and cost ratios improve.",
    "Across the scenarios, FY2028F net income ranges from $2.5bn (Bear) to $5.4bn (Bull). The three statements are fully linked and the balance sheet balances in every year and scenario with no plug.",
  ],
  summary:
    "14-sheet, three-year model built from Starbucks' FY2023–FY2025 statements and operating KPIs: revenue and cost drivers, linked income statement, balance sheet and cash flow, Bear/Base/Bull scenarios and an executive dashboard.",
  headline: [
    { label: "Revenue FY2025A → FY2028F", value: "$37.2bn → $43.7bn", note: "+17.6%, base case" },
    { label: "Operating margin", value: "7.9% → 12.6%", note: "FY2025A → FY2028F" },
    { label: "Net income", value: "$1.86bn → $3.81bn", note: "FY2025A → FY2028F" },
    { label: "Operating cash flow", value: "$4.75bn → $6.36bn", note: "FY2025A → FY2028F" },
    { label: "Stores", value: "40,990 → 45,096", note: "+10.0%" },
    { label: "Balance sheet", value: "No plug", note: "balances every year and scenario" },
  ],
  tags: ["Driver-based forecast", "Three-statement model", "Scenario analysis", "KPI dashboard"],
  files: {
    model: "/models/Rohin-Dillibabu-Starbucks-FPA-Model.xlsx",
    report: "/reports/Rohin-Dillibabu-Starbucks-FPA-Summary.pdf",
  },
  base: [
    { year: "FY2023A", revenue: 35976, opMargin: 16.3, opIncome: 5871, netIncome: 4125, ocf: 6009, stores: 38038, forecast: false },
    { year: "FY2024A", revenue: 36176, opMargin: 15.0, opIncome: 5409, netIncome: 3762, ocf: 6096, stores: 40199, forecast: false },
    { year: "FY2025A", revenue: 37184, opMargin: 7.9, opIncome: 2937, netIncome: 1857, ocf: 4747, stores: 40990, forecast: false },
    { year: "FY2026F", revenue: 39066, opMargin: 10.8, opIncome: 4228, netIncome: 2837, ocf: 5007, stores: 42220, forecast: true },
    { year: "FY2027F", revenue: 41203, opMargin: 11.8, opIncome: 4856, netIncome: 3308, ocf: 5694, stores: 43571, forecast: true },
    { year: "FY2028F", revenue: 43711, opMargin: 12.6, opIncome: 5528, netIncome: 3812, ocf: 6359, stores: 45096, forecast: true },
  ],
  revenuePerStore: { from: "$0.907m", fromYear: "FY2025A", to: "$0.969m", toYear: "FY2028F" },
  endingCash2028: "$5,017m",
  comps: [
    { year: "FY2023A", comps: "+8%", transactions: "+3%", ticket: "+5%" },
    { year: "FY2024A", comps: "−2%", transactions: "−4%", ticket: "+2%" },
    { year: "FY2025A", comps: "−1%", transactions: "−2%", ticket: "+1%" },
  ],
  marginBridge: {
    start: { label: "FY2024A margin", value: 15.0 },
    steps: [
      { label: "Restructuring", value: -2.4 },
      { label: "Deleverage", value: -2.1 },
      { label: "Labour investment", value: -1.3 },
      { label: "Inflation", value: -0.8 },
      { label: "Other", value: -0.5 },
    ],
    end: { label: "FY2025A margin", value: 7.9 },
    source:
      "Restructuring, deleverage, labour and inflation effects as stated in Starbucks' FY2025 10-K; “Other” is the remaining difference.",
  },
  scenarios: [
    { name: "Bear", revenue: 39080, margin: 9.5, netIncome: 2457, ocf: 4659, endingCash: "$1,500m", cashNote: "revolver draws $830m", storeGrowth: "1.0–1.5%", cogs: "32.2% → 31.8%" },
    { name: "Base", revenue: 43711, margin: 12.6, netIncome: 3812, ocf: 6359, endingCash: "$5,017m", cashNote: "", storeGrowth: "3.0–3.5%", cogs: "31.2% → 30.8%" },
    { name: "Bull", revenue: 48743, margin: 15.8, netIncome: 5434, ocf: 8368, endingCash: "$9,928m", cashNote: "", storeGrowth: "5.0–5.5%", cogs: "30.2% → 29.8%" },
  ],
  flow: [
    { step: "Historicals", detail: "FY2023A–FY2025A statements and operating KPIs" },
    { step: "Drivers", detail: "Stores, revenue per store, comparable sales, cost ratios" },
    { step: "Assumptions", detail: "Scenario selector drives every forecast input" },
    { step: "Forecast", detail: "Revenue and cost forecasts to FY2028F" },
    { step: "Statements", detail: "Income statement, balance sheet and cash flow, fully linked" },
    { step: "Scenarios", detail: "Bear, Base and Bull calculated live" },
    { step: "Dashboard", detail: "KPIs, trends and management insights" },
  ],
  sheetNames: [
    "Cover", "Business Overview", "Historical Financial Data", "Operating Drivers", "Revenue Drivers", "Cost Drivers",
    "Assumptions", "Revenue Forecast", "Cost Forecast", "Balance Sheet Driver", "Supporting Schedule",
    "Three Statement Model", "Scenario Analysis", "Dashboard",
  ],
  method: [
    "Revenue = total stores × revenue per store ($0.907m in FY2025A → $0.969m in FY2028F).",
    "Comparable sales are split into transactions (traffic) and average ticket and used as a cross-check on revenue per store; they do not directly drive revenue.",
    "Cost of sales, store operating expenses (which include wages and benefits), other operating expenses, G&A and D&A are each forecast as a % of revenue. The FY2025 $892m restructuring and impairment charge is not repeated.",
    "The cash flow statement is built from balance-sheet movements, so the balance sheet balances with no plug. A revolver draws only if cash would fall below a $1.5bn minimum.",
  ],
  judgement: [
    "Capex is held at FY2025's $2.3bn a year while stores grow 10% — a conservative choice after the FY2025 store closures.",
    "Interest expense is held flat across the forecast, including when the Bear case draws on the revolver.",
    "Segment revenue covers 99.7% of the total; the small Corporate & Other segment is not shown separately.",
  ],
  screens: [
    { src: "/images/sbux-dashboard-1.webp", thumb: "/images/sbux-dashboard-1-thumb.webp", w: 900, h: 346, caption: "Executive dashboard (1 of 2) — FY2028F KPIs vs FY2025, revenue and operating margin trend, key forecast drivers." },
    { src: "/images/sbux-dashboard-2.webp", thumb: "/images/sbux-dashboard-2-thumb.webp", w: 900, h: 361, caption: "Executive dashboard (2 of 2) — Bear, Base and Bull outcomes for FY2028F, three-year forecast summary and how the model is built." },
    { src: "/images/sbux-scenario.webp", thumb: "/images/sbux-scenario-thumb.webp", w: 900, h: 396, caption: "Scenario Analysis sheet — scenario selector, driver assumptions by case and the selected-case snapshot with balance sheet check." },
    { src: "/images/sbux-scenario-outputs.webp", thumb: "/images/sbux-scenario-outputs-thumb.webp", w: 856, h: 208, caption: "Scenario outputs — Excel data table returning FY2028F results for all three cases at once." },
    { src: "/images/sbux-income.webp", thumb: "/images/sbux-income-thumb.webp", w: 801, h: 772, caption: "Income statement forecast — FY2025A to FY2028F." },
    { src: "/images/sbux-bs-assets.webp", thumb: "/images/sbux-bs-assets-thumb.webp", w: 900, h: 525, caption: "Balance sheet forecast — assets." },
    { src: "/images/sbux-bs-liabilities.webp", thumb: "/images/sbux-bs-liabilities-thumb.webp", w: 900, h: 739, caption: "Balance sheet forecast — liabilities and shareholders' deficit; total assets equal total liabilities and equity every year." },
    { src: "/images/sbux-cfs-1.webp", thumb: "/images/sbux-cfs-1-thumb.webp", w: 900, h: 592, caption: "Cash flow statement forecast — operating and investing activities." },
    { src: "/images/sbux-cfs-2.webp", thumb: "/images/sbux-cfs-2-thumb.webp", w: 900, h: 399, caption: "Cash flow statement forecast — financing activities and ending cash, which links to the balance sheet." },
  ],
  gallery: [
    { src: "/images/starbucks-1.webp", thumb: "/images/starbucks-1-thumb.webp", caption: "Report page 1 — business overview: how Starbucks makes money and what drives its costs." },
    { src: "/images/starbucks-2.webp", thumb: "/images/starbucks-2-thumb.webp", caption: "Report page 2 — industry and competitors, store-network trend." },
    { src: "/images/starbucks-3.webp", thumb: "/images/starbucks-3-thumb.webp", caption: "Report page 3 — performance and outlook: revenue and margin trajectory, comparable-sales split." },
    { src: "/images/starbucks-4.webp", thumb: "/images/starbucks-4-thumb.webp", caption: "Report page 4 — base-case forecast, Bear/Base/Bull outcomes and model integrity check." },
  ],
} as const;

export type Starbucks = typeof starbucks;
