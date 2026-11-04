import type { Metadata } from "next";
import { airbus as a } from "@/data/airbus";
import { BarLineChart, ColumnChart, FootballField, Waterfall } from "@/components/charts";
import { CaseHeader, DataTable, Downloads, Flow, JudgementBox } from "@/components/blocks";
import { Gallery } from "@/components/gallery";
import { Container, Metric, Note } from "@/components/ui";
import { fmtBn, fmtInt, fmtPct } from "@/lib/format";

export const metadata: Metadata = {
  title: "Airbus SE — Equity Research & DCF Valuation",
  description:
    "Independent Airbus SE valuation: five-year FCFF forecast, 7.30% WACC, DCF value of €189.45 per share vs €198.40, comparable companies, sensitivity and football field. HOLD.",
  alternates: { canonical: a.path },
  openGraph: {
    title: "Airbus SE — Equity Research & DCF Valuation | Rohin Dillibabu",
    description: "DCF value €189.45 per share vs €198.40 share price (31-Dec-2025): HOLD. 16-sheet Excel model.",
    url: a.path,
    images: [{ url: "/og.png", width: 1200, height: 630 }],
  },
};

const ACCENT = "#0f2c47";

const toc = [
  ["answer", "The answer"],
  ["model", "How the model works"],
  ["forecast", "Forecast"],
  ["dcf", "Free cash flow & DCF"],
  ["wacc", "WACC"],
  ["sensitivity", "Sensitivity"],
  ["comps", "Comparable companies"],
  ["football", "Football field"],
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
  name: a.title,
  author: { "@type": "Person", name: "Rohin Dillibabu" },
  dateCreated: "2026-08",
  about: "Airbus SE equity valuation (independent academic project, not affiliated with Airbus)",
  keywords: a.tags.join(", "),
};

export default function AirbusPage() {
  const sens = a.sensitivity;
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(projectJsonLd) }} />
      <CaseHeader
        accent={ACCENT}
        label="Case study · Valuation"
        title={a.title}
        classification={a.classification}
        period={a.period}
        disclosure={`Independent academic project using public data — not affiliated with Airbus. Valuation date ${a.valuationDate}. ${a.currency}. Excel, ${a.sheets} sheets, built ${a.built}.`}
      >
        <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-6 md:grid-cols-3 lg:grid-cols-6">
          {a.headline.map((m) => (
            <Metric key={m.label} label={m.label} value={m.value} note={m.note} />
          ))}
        </dl>
      </CaseHeader>

      <Container className="grid gap-12 py-12 lg:grid-cols-[190px_1fr] lg:gap-14">
        <nav aria-label="On this page" className="hidden lg:block">
          <ul className="sticky top-20 space-y-1.5 border-l border-rule pl-4 text-[0.86rem]">
            {toc.map(([id, label]) => (
              <li key={id}>
                <a href={`#${id}`} className="text-muted hover:text-navy">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="min-w-0 space-y-16">
          <section aria-labelledby="answer">
            <p className="text-[0.75rem] font-semibold uppercase tracking-[0.08em] text-muted">The question</p>
            <p className="mt-1 font-serif text-[1.35rem] font-semibold text-ink">{a.question}</p>
            <div className="mt-8"><H2 id="answer">The answer</H2></div>
            <div className="mt-3 max-w-3xl space-y-3 text-[1.02rem]">
              {a.answer.map((p) => (
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
              Sixteen sheets, each feeding the next. Inputs sit on one assumptions sheet; everything downstream is formulas.
            </p>
            <Flow steps={a.flow} accent={ACCENT} />
            <ul className="mt-6 max-w-3xl space-y-2 text-[0.95rem]">
              {a.method.map((m) => (
                <li key={m} className="flex gap-3">
                  <span aria-hidden="true" className="mt-[0.62rem] h-1.5 w-1.5 shrink-0 bg-navy" />
                  {m}
                </li>
              ))}
            </ul>
            <details className="mt-5 text-[0.88rem] text-muted">
              <summary className="cursor-pointer text-navy">See all 16 sheet names</summary>
              <p className="mt-2">{a.sheetNames.join(" · ")}</p>
            </details>
          </section>

          <section aria-labelledby="forecast">
            <H2 id="forecast">Revenue and margin, FY2023A–FY2030F</H2>
            <p className="mt-2 mb-5 max-w-3xl text-muted">
              Revenue grows from €73.4bn to €99.8bn as deliveries ramp up; EBIT margin moves from 8.3% to 9.0%.
            </p>
            <div className="overflow-x-auto border border-rule bg-surface p-4">
              <div className="min-w-[560px]">
                <BarLineChart
                  data={a.incomeStatement.map((d) => ({ label: d.year, bar: d.revenue, line: d.ebitMargin, forecast: d.forecast }))}
                  barColor="#1f4e79"
                  lineColor="#9a7431"
                  barFormat={(v) => fmtBn(v, "€")}
                  lineFormat={fmtPct}
                  barTitle="Revenue"
                  lineTitle="EBIT margin"
                  ariaLabel={`Airbus revenue and EBIT margin: ${a.incomeStatement
                    .map((d) => `${d.year} €${fmtInt(d.revenue)}m, ${d.ebitMargin}%`)
                    .join("; ")}`}
                />
              </div>
            </div>
            <div className="mt-8 grid gap-8 md:grid-cols-2">
              <DataTable
                caption="FY2025A revenue by segment (€m)"
                minWidth="min-w-0"
                head={["Segment", "Revenue", "Share"]}
                rows={[
                  ...a.segments.map((s) => [s.name, fmtInt(s.value), s.share] as const),
                  ["Eliminations", `(${fmtInt(-a.eliminations)})`, "—"] as const,
                  ["Group revenue", "73,420", ""] as const,
                ]}
                highlightLast
              />
              <DataTable
                caption="Operating KPIs"
                head={["Measure", "Value"]}
                minWidth="min-w-0"
                rows={a.kpis.map((k) => [k.label, k.value] as const)}
              />
            </div>
            <div className="mt-8">
              <DataTable
                caption="Income statement summary (€m)"
                head={["", ...a.incomeStatement.map((d) => d.year)]}
                rows={[
                  ["Revenue", ...a.incomeStatement.map((d) => fmtInt(d.revenue))],
                  ["EBIT margin", ...a.incomeStatement.map((d) => fmtPct(d.ebitMargin))],
                  ["Net profit", ...a.incomeStatement.map((d) => fmtInt(d.netProfit))],
                ]}
              />
            </div>
          </section>

          <section aria-labelledby="dcf">
            <H2 id="dcf">Free cash flow and DCF</H2>
            <p className="mt-2 mb-5 max-w-3xl text-muted">
              FCFF = NOPAT + D&amp;A − capex − change in operating working capital, discounted at 7.30% over five years, plus a
              Gordon-growth terminal value at 3.00%.
            </p>
            <div className="grid gap-6">
              <figure className="min-w-0 border border-rule bg-surface p-4">
                <figcaption className="mb-2 text-[0.85rem] text-muted">Free cash flow to firm (€m)</figcaption>
                <ColumnChart
                  data={a.fcff}
                  color="#1f4e79"
                  format={fmtInt}
                  ariaLabel={`Airbus FCFF: ${a.fcff.map((f) => `${f.year} €${fmtInt(f.value)}m`).join(", ")}`}
                />
              </figure>
              <figure className="min-w-0 border border-rule bg-surface p-4">
                <figcaption className="mb-2 text-[0.85rem] text-muted">Enterprise value to equity value (€m)</figcaption>
                <div className="overflow-x-auto">
                  <div className="min-w-[520px]">
                    <Waterfall
                      steps={a.bridge}
                      color="#7d9cba"
                      totalColor="#1f4e79"
                      format={(v) =>
                        v < 0 ? `(${fmtInt(-v)})` : v.toLocaleString("en-GB", { maximumFractionDigits: 1 })
                      }
                      ariaLabel="Bridge from PV of FCFF €21,652m and PV of terminal value €115,394m to enterprise value €137,046.5m, plus net cash €12,171m, less non-controlling interest €80m, to equity value €149,137.5m."
                    />
                  </div>
                </div>
              </figure>
            </div>
            <div className="mt-6 grid gap-4 border-y border-rule py-5 sm:grid-cols-3">
              <p className="text-[0.95rem]">
                <span className="block text-[0.72rem] font-semibold uppercase tracking-[0.08em] text-muted">Equity value</span>
                <span className="num text-[1.15rem] text-ink">€149,137.5m</span>
              </p>
              <p className="text-[0.95rem]">
                <span className="block text-[0.72rem] font-semibold uppercase tracking-[0.08em] text-muted">÷ Shares</span>
                <span className="num text-[1.15rem] text-ink">{a.shares}</span>
              </p>
              <p className="text-[0.95rem]">
                <span className="block text-[0.72rem] font-semibold uppercase tracking-[0.08em] text-muted">= Value per share</span>
                <span className="num text-[1.15rem] font-semibold text-navy">€189.45</span>
              </p>
            </div>
            <Note>Terminal value is {a.tvShare} of enterprise value — see the sensitivity grid and judgement calls.</Note>
          </section>

          <section aria-labelledby="wacc">
            <H2 id="wacc">WACC build</H2>
            <p className="mt-2 mb-5 max-w-3xl text-muted">Cost of equity from CAPM, cost of debt from reported interest, market-value weights.</p>
            <div className="max-w-2xl">
              <DataTable
                caption="Cost of capital"
                head={["Input", "Value", "Basis"]}
                textCols={[2]}
                minWidth="min-w-[440px]"
                rows={a.wacc.map((w) => [w.label, w.value, w.source] as const)}
                highlightLast
              />
            </div>
          </section>

          <section aria-labelledby="sensitivity">
            <H2 id="sensitivity">Sensitivity: value per share (€)</H2>
            <p className="mt-2 mb-5 max-w-3xl text-muted">
              The same DCF re-run across WACC and terminal growth. Live formulas in the workbook; the base case is outlined.
            </p>
            <div className="overflow-x-auto">
              <table className="min-w-[520px] border-collapse text-[0.92rem]">
                <caption className="mb-2 text-left text-[0.8rem] text-muted">
                  Rows: WACC · Columns: terminal growth rate
                </caption>
                <thead>
                  <tr>
                    <th scope="col" className="p-2 text-left text-[0.75rem] font-semibold uppercase tracking-[0.06em] text-muted">
                      WACC \ g
                    </th>
                    {sens.growth.map((g) => (
                      <th key={g} scope="col" className="num p-2 text-right text-[0.85rem] font-medium text-ink">
                        {g}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sens.values.map((row, ri) => (
                    <tr key={sens.wacc[ri]}>
                      <th scope="row" className="num p-2 text-left text-[0.85rem] font-medium text-ink">
                        {sens.wacc[ri]}
                      </th>
                      {row.map((v, ci) => {
                        const base = ri === 2 && ci === 2;
                        const above = v >= a.sharePrice;
                        return (
                          <td
                            key={ci}
                            className={`num border border-paper p-2 text-right ${
                              base ? "outline outline-2 -outline-offset-2 outline-ink font-semibold" : ""
                            } ${above ? "bg-navy-soft text-navy-deep" : "bg-tint text-body"}`}
                          >
                            {v.toFixed(base ? 2 : 1)}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Note>Blue cells are at or above the €198.40 share price; grey cells are below it. Range: €136.6–€333.7.</Note>
          </section>

          <section aria-labelledby="comps">
            <H2 id="comps">Comparable companies</H2>
            <p className="mt-2 mb-5 max-w-3xl text-muted">
              Trading multiples for Boeing, RTX, Lockheed Martin and General Dynamics, applied to Airbus at the peer median.
            </p>
            <DataTable
              caption="Trading multiples (market data as of 31-Dec-2025)"
              head={["Company", "Ticker", "EV / Revenue", "EV / EBITDA", "P / E"]}
              rows={a.comps.map((c) => [c.company, c.ticker, c.evRev, c.evEbitda, c.pe] as const)}
              highlightLast
            />
            <Note>*The P/E median excludes Boeing (90.1x) as an earnings outlier.</Note>
            <dl className="mt-6 grid max-w-2xl grid-cols-3 gap-4">
              {a.impliedFromMedians.map((m) => (
                <Metric key={m.method} label={`Implied · ${m.method}`} value={m.value} />
              ))}
            </dl>
          </section>

          <section aria-labelledby="football">
            <H2 id="football">Football field</H2>
            <p className="mt-2 mb-5 max-w-3xl text-muted">
              All four methods side by side. The DCF value and the share price both sit in the lower-middle of the range.
            </p>
            <div className="overflow-x-auto border border-rule bg-surface p-4">
              <div className="min-w-[560px]">
                <FootballField rows={a.footballField} dcf={a.dcfValue} price={a.sharePrice} />
              </div>
            </div>
            <Note>Overall range €136.6–€359.0 per share. Rating bands: BUY above +15%, SELL below −15%, HOLD in between.</Note>
          </section>

          <JudgementBox items={a.judgement} />

          <section aria-labelledby="screens">
            <H2 id="screens">Model screenshots</H2>
            <p className="mt-2 mb-5 max-w-3xl text-muted">Taken from the Excel workbook. Select an image to enlarge it.</p>
            <Gallery items={a.screens} label="Airbus model screenshots" wide />
          </section>

          <section aria-labelledby="gallery">
            <H2 id="gallery">Report pages</H2>
            <p className="mt-2 mb-5 max-w-3xl text-muted">The four-page equity research summary. Select a page to enlarge it.</p>
            <Gallery items={a.gallery} label="Airbus report pages" />
          </section>

          <section aria-labelledby="files">
            <H2 id="files">Files</H2>
            <div className="mt-5">
              <Downloads report={a.files.report} model={a.files.model} sheets={a.sheets} />
            </div>
          </section>
        </div>
      </Container>
    </>
  );
}
