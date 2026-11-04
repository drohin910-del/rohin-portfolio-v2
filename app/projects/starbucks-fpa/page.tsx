import type { Metadata } from "next";
import { starbucks as s } from "@/data/starbucks";
import { BarLineChart, ScenarioBars, Waterfall } from "@/components/charts";
import { CaseHeader, DataTable, Downloads, Flow, JudgementBox } from "@/components/blocks";
import { Gallery } from "@/components/gallery";
import { Container, Metric, Note } from "@/components/ui";
import { fmtBn, fmtInt, fmtPct, fmtUsdM } from "@/lib/format";

export const metadata: Metadata = {
  title: "Starbucks — Driver-Based FP&A Model",
  description:
    "Independent Starbucks FP&A model: driver-based forecast to FY2028F, fully linked three statements with no plug, and Bear/Base/Bull scenarios. Revenue $37.2bn → $43.7bn, margin 7.9% → 12.6%.",
  alternates: { canonical: s.path },
  openGraph: {
    title: "Starbucks — Driver-Based FP&A Model | Rohin Dillibabu",
    description: "Three-statement forecast to FY2028F with Bear/Base/Bull scenarios. 14-sheet Excel model.",
    url: s.path,
    images: [{ url: "/og.png", width: 1200, height: 630 }],
  },
};

const ACCENT = "#00704a";
const SCEN_COLORS = ["#a9c9b9", "#00704a", "#0b4f36"] as const;

const toc = [
  ["answer", "The answer"],
  ["model", "How the model works"],
  ["performance", "Performance & forecast"],
  ["margin", "FY2025 margin drop"],
  ["drivers", "Revenue drivers"],
  ["statements", "Three statements"],
  ["scenarios", "Scenarios"],
  ["judgement", "Judgement calls"],
  ["screens", "Model screenshots"],
  ["gallery", "Report pages"],
  ["files", "Files"],
] as const;

function H2({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="scroll-mt-20 font-serif text-[1.6rem] font-semibold leading-tight">
      {children}
    </h2>
  );
}

const projectJsonLd = {
  "@context": "https://schema.org",
  "@type": "CreativeWork",
  name: s.title,
  author: { "@type": "Person", name: "Rohin Dillibabu" },
  dateCreated: "2026-07",
  about: "Starbucks driver-based FP&A forecast (independent academic project, not affiliated with Starbucks)",
  keywords: s.tags.join(", "),
};

export default function StarbucksPage() {
  const mb = s.marginBridge;
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(projectJsonLd) }} />
      <CaseHeader
        accent={ACCENT}
        label="Case study · FP&A"
        title={s.title}
        classification={s.classification}
        period={s.period}
        disclosure={`Independent academic project using public data — not affiliated with Starbucks. ${s.currency}. Excel, ${s.sheets} sheets, built ${s.built}.`}
      >
        <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-6 md:grid-cols-3 lg:grid-cols-6">
          {s.headline.map((m) => (
            <Metric key={m.label} label={m.label} value={m.value} note={m.note} />
          ))}
        </dl>
      </CaseHeader>

      <Container className="grid gap-12 py-12 lg:grid-cols-[190px_1fr] lg:gap-14">
        <nav aria-label="On this page" className="hidden lg:block">
          <ul className="sticky top-20 space-y-1.5 border-l border-rule pl-4 text-[0.86rem]">
            {toc.map(([id, label]) => (
              <li key={id}>
                <a href={`#${id}`} className="text-muted hover:text-green">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="min-w-0 space-y-16">
          <section aria-labelledby="answer">
            <p className="text-[0.75rem] font-semibold uppercase tracking-[0.08em] text-muted">The question</p>
            <p className="mt-1 font-serif text-[1.35rem] font-semibold text-ink">{s.question}</p>
            <div className="mt-8"><H2 id="answer">The answer</H2></div>
            <div className="mt-3 max-w-3xl space-y-3 text-[1.02rem]">
              {s.answer.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <p className="mt-4 text-[0.85rem] text-muted">
              Years marked <strong className="font-semibold text-ink">A</strong> are actual (reported);{" "}
              <strong className="font-semibold text-ink">F</strong> are my forecasts.
            </p>
          </section>

          <section aria-labelledby="model">
            <H2 id="model">How the model works</H2>
            <p className="mt-2 mb-5 max-w-3xl text-muted">
              Fourteen sheets. One scenario selector feeds every assumption, and all three statements update together.
            </p>
            <Flow steps={s.flow} accent={ACCENT} />
            <ul className="mt-6 max-w-3xl space-y-2 text-[0.95rem]">
              {s.method.map((m) => (
                <li key={m} className="flex gap-3">
                  <span aria-hidden="true" className="mt-[0.62rem] h-1.5 w-1.5 shrink-0 bg-green" />
                  {m}
                </li>
              ))}
            </ul>
            <details className="mt-5 text-[0.88rem] text-muted">
              <summary className="cursor-pointer text-green">See all 14 sheet names</summary>
              <p className="mt-2">{s.sheetNames.join(" · ")}</p>
            </details>
          </section>

          <section aria-labelledby="performance">
            <H2 id="performance">Performance and forecast, FY2023A–FY2028F</H2>
            <p className="mt-2 mb-5 max-w-3xl text-muted">Base case. Margin fell to 7.9% in FY2025 and recovers to 12.6% by FY2028F.</p>
            <div className="overflow-x-auto border border-rule bg-surface p-4">
              <div className="min-w-[520px]">
                <BarLineChart
                  data={s.base.map((d) => ({ label: d.year, bar: d.revenue, line: d.opMargin, forecast: d.forecast }))}
                  barColor="#00704a"
                  lineColor="#9a7431"
                  barFormat={(v) => fmtBn(v, "$")}
                  lineFormat={fmtPct}
                  barTitle="Revenue"
                  lineTitle="Operating margin"
                  ariaLabel={`Starbucks revenue and operating margin: ${s.base
                    .map((d) => `${d.year} $${fmtInt(d.revenue)}m, ${d.opMargin}%`)
                    .join("; ")}`}
                />
              </div>
            </div>
            <div className="mt-8">
              <DataTable
                caption="Base case ($m unless stated)"
                head={["", ...s.base.map((d) => d.year)]}
                rows={[
                  ["Revenue", ...s.base.map((d) => fmtInt(d.revenue))],
                  ["Operating margin", ...s.base.map((d) => fmtPct(d.opMargin))],
                  ["Operating income", ...s.base.map((d) => fmtInt(d.opIncome))],
                  ["Net income", ...s.base.map((d) => fmtInt(d.netIncome))],
                  ["Operating cash flow", ...s.base.map((d) => fmtInt(d.ocf))],
                  ["Total stores", ...s.base.map((d) => fmtInt(d.stores))],
                ]}
              />
              <Note>FY2028F ending cash: {s.endingCash2028}. Revenue growth FY2025A → FY2028F: +17.6%.</Note>
            </div>
          </section>

          <section aria-labelledby="margin">
            <H2 id="margin">Why the FY2025 margin dropped</H2>
            <p className="mt-2 mb-5 max-w-3xl text-muted">
              Operating margin fell from 15.0% to 7.9% in one year. Understanding why matters before forecasting a recovery.
            </p>
            <figure className="overflow-x-auto border border-rule bg-surface p-4">
              <div className="min-w-[520px]">
                <Waterfall
                  steps={[
                    { label: mb.start.label, value: mb.start.value, kind: "start" },
                    ...mb.steps.map((st) => ({ label: st.label, value: st.value, kind: "sub" as const })),
                    { label: mb.end.label, value: mb.end.value, kind: "total" },
                  ]}
                  color="#00704a"
                  totalColor="#00704a"
                  negColor="#c98a7f"
                  format={(v, kind) => (kind === "sub" ? `−${Math.abs(v).toFixed(1)}pp` : `${v.toFixed(1)}%`)}
                  ariaLabel="Operating margin bridge: FY2024A 15.0%, restructuring −2.4pp, deleverage −2.1pp, labour investment −1.3pp, inflation −0.8pp, other −0.5pp, FY2025A 7.9%."
                />
              </div>
              <figcaption className="mt-2 text-[0.82rem] text-muted">{mb.source}</figcaption>
            </figure>
          </section>

          <section aria-labelledby="drivers">
            <H2 id="drivers">Revenue drivers</H2>
            <div className="mt-4 grid gap-8 lg:grid-cols-[1fr_1.1fr]">
              <div>
                <p className="max-w-xl text-[1.02rem]">
                  <strong className="font-semibold text-ink">Revenue = total stores × revenue per store.</strong> Stores grow
                  from 40,990 to 45,096 and revenue per store from {s.revenuePerStore.from} to {s.revenuePerStore.to}.
                </p>
                <p className="mt-3 max-w-xl text-[0.95rem] text-muted">
                  Comparable sales are split into transactions (traffic) and average ticket and used as a cross-check on the
                  revenue-per-store assumption. They do not drive revenue directly.
                </p>
                <dl className="mt-6 grid grid-cols-2 gap-5">
                  <Metric label="Stores FY2025A → FY2028F" value="40,990 → 45,096" note="+10.0%" />
                  <Metric
                    label="Revenue per store"
                    value={`${s.revenuePerStore.from} → ${s.revenuePerStore.to}`}
                    note={`${s.revenuePerStore.fromYear} → ${s.revenuePerStore.toYear}`}
                  />
                </dl>
              </div>
              <DataTable
                caption="Comparable sales split (historical)"
                minWidth="min-w-0"
                head={["Year", "Comparable sales", "Transactions", "Average ticket"]}
                rows={s.comps.map((c) => [c.year, c.comps, c.transactions, c.ticket] as const)}
              />
            </div>
          </section>

          <section aria-labelledby="statements">
            <H2 id="statements">Three linked statements</H2>
            <p className="mt-2 mb-5 max-w-3xl text-muted">
              The cash flow statement is built from balance-sheet movements, so the balance sheet balances in every year and every
              scenario with no plug.
            </p>
            <ol className="grid gap-3 md:grid-cols-3">
              {[
                {
                  t: "Income statement",
                  d: "Revenue and cost drivers produce operating income, interest, tax and net income.",
                },
                {
                  t: "Cash flow statement",
                  d: "Net income plus non-cash items and working-capital movements; capex, dividends and debt flows.",
                },
                {
                  t: "Balance sheet",
                  d: "Cash from the cash flow statement; retained deficit and PP&E roll forward. A revolver draws only if cash would fall below $1.5bn.",
                },
              ].map((b) => (
                <li key={b.t} className="border border-rule bg-surface p-5">
                  <p className="font-semibold text-ink">{b.t}</p>
                  <p className="mt-1.5 text-[0.92rem]">{b.d}</p>
                </li>
              ))}
            </ol>
            <p className="mt-4 inline-block border-l-4 border-green bg-green-soft px-4 py-2 text-[0.92rem] text-ink">
              Check: total assets = total liabilities + equity in every year of Bear, Base and Bull.
            </p>
          </section>

          <section aria-labelledby="scenarios">
            <H2 id="scenarios">Scenarios, FY2028F</H2>
            <p className="mt-2 mb-5 max-w-3xl text-muted">
              One selector switches every assumption. All three cases are calculated live in the workbook by an Excel data table.
            </p>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="border border-rule bg-surface p-3">
                <ScenarioBars
                  title="Revenue"
                  values={s.scenarios.map((x) => ({ name: x.name, value: x.revenue }))}
                  colors={SCEN_COLORS}
                  format={(v) => fmtBn(v, "$")}
                />
              </div>
              <div className="border border-rule bg-surface p-3">
                <ScenarioBars
                  title="Net income"
                  values={s.scenarios.map((x) => ({ name: x.name, value: x.netIncome }))}
                  colors={SCEN_COLORS}
                  format={(v) => fmtBn(v, "$")}
                />
              </div>
              <div className="border border-rule bg-surface p-3">
                <ScenarioBars
                  title="Operating cash flow"
                  values={s.scenarios.map((x) => ({ name: x.name, value: x.ocf }))}
                  colors={SCEN_COLORS}
                  format={(v) => fmtBn(v, "$")}
                />
              </div>
            </div>
            <div className="mt-8">
              <DataTable
                caption="FY2028F outcomes and key assumptions"
                head={["", "Bear", "Base", "Bull"]}
                rows={[
                  ["Revenue", ...s.scenarios.map((x) => fmtUsdM(x.revenue))],
                  ["Operating margin", ...s.scenarios.map((x) => fmtPct(x.margin))],
                  ["Net income", ...s.scenarios.map((x) => fmtUsdM(x.netIncome))],
                  ["Operating cash flow", ...s.scenarios.map((x) => fmtUsdM(x.ocf))],
                  ["Ending cash", ...s.scenarios.map((x) => (x.cashNote ? `${x.endingCash} (${x.cashNote})` : x.endingCash))],
                  ["Store growth p.a.", ...s.scenarios.map((x) => x.storeGrowth)],
                  ["Cost of sales % revenue", ...s.scenarios.map((x) => x.cogs)],
                ]}
              />
              <Note>In the Bear case cash would fall below the $1.5bn minimum, so the revolver draws $830m by FY2028F.</Note>
            </div>
          </section>

          <JudgementBox items={s.judgement} />

          <section aria-labelledby="screens">
            <H2 id="screens">Model screenshots</H2>
            <p className="mt-2 mb-5 max-w-3xl text-muted">Taken from the Excel workbook. Select an image to enlarge it.</p>
            <Gallery items={s.screens} label="Starbucks model screenshots" wide />
          </section>

          <section aria-labelledby="gallery">
            <H2 id="gallery">Report pages</H2>
            <p className="mt-2 mb-5 max-w-3xl text-muted">The four-page FP&amp;A summary. Select a page to enlarge it.</p>
            <Gallery items={s.gallery} label="Starbucks report pages" />
          </section>

          <section aria-labelledby="files">
            <H2 id="files">Files</H2>
            <div className="mt-5">
              <Downloads report={s.files.report} model={s.files.model} sheets={s.sheets} />
            </div>
          </section>
        </div>
      </Container>
    </>
  );
}
