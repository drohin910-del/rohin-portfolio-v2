import Link from "next/link";
import { airbus } from "@/data/airbus";
import { starbucks } from "@/data/starbucks";
import { education, experience, interests, languages, personal, skills } from "@/data/personal";
import { BarLineChart, FootballField } from "@/components/charts";
import { ButtonLink, Container, FileMeta, SectionHeading, Tag } from "@/components/ui";
import { fmtBn, fmtPct } from "@/lib/format";

function Snapshot({
  href,
  accent,
  label,
  rows,
}: {
  href: string;
  accent: string;
  label: string;
  rows: { k: string; v: string }[];
}) {
  return (
    <Link
      href={href}
      className="group block border border-rule bg-surface transition-colors hover:border-navy"
    >
      <div className="h-1" style={{ background: accent }} />
      <div className="p-5">
        <p className="text-[0.72rem] font-semibold uppercase tracking-[0.08em]" style={{ color: accent }}>
          {label}
        </p>
        <dl className="mt-3 divide-y divide-rule">
          {rows.map((r) => (
            <div key={r.k} className="flex items-baseline justify-between gap-4 py-2">
              <dt className="text-[0.86rem] text-muted">{r.k}</dt>
              <dd className="num text-right text-[0.98rem] font-medium text-ink">{r.v}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-3 text-[0.84rem] text-navy group-hover:underline">Open case study →</p>
      </div>
    </Link>
  );
}

function ProjectCard({
  accent,
  kicker,
  title,
  summary,
  metrics,
  tags,
  chart,
  href,
  report,
  model,
  sheets,
}: {
  accent: string;
  kicker: string;
  title: string;
  summary: string;
  metrics: { k: string; v: string }[];
  tags: readonly string[];
  chart: React.ReactNode;
  href: string;
  report: string;
  model: string;
  sheets: number;
}) {
  return (
    <article className="border border-rule bg-surface">
      <div className="h-1.5" style={{ background: accent }} />
      <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[1.05fr_1fr] lg:gap-10">
        <div>
          <p className="text-[0.75rem] font-semibold uppercase tracking-[0.08em]" style={{ color: accent }}>
            {kicker}
          </p>
          <h3 className="mt-2 font-serif text-[1.6rem] font-semibold leading-tight">
            <Link href={href} className="hover:text-navy">
              {title}
            </Link>
          </h3>
          <p className="mt-3 text-[0.97rem]">{summary}</p>
          <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-5">
            {metrics.map((m) => (
              <div key={m.k} className="border-t border-ink/70 pt-2">
                <dt className="text-[0.72rem] font-semibold uppercase tracking-[0.07em] text-muted">{m.k}</dt>
                <dd className="num mt-1 text-[1.08rem] font-medium text-ink">{m.v}</dd>
              </div>
            ))}
          </dl>
          <ul className="mt-6 flex flex-wrap gap-2" aria-label="Methods">
            {tags.map((t) => (
              <Tag key={t}>{t}</Tag>
            ))}
          </ul>
        </div>
        <div className="flex flex-col">
          <div className="overflow-x-auto border border-rule bg-paper p-3">
            <div className="min-w-[440px]">{chart}</div>
          </div>
          <div className="mt-5 flex flex-wrap gap-2.5">
            <ButtonLink href={href}>View case study</ButtonLink>
            <ButtonLink href={report} external variant="quiet">
              4-page report <FileMeta>PDF</FileMeta>
            </ButtonLink>
            <ButtonLink href={model} download variant="quiet">
              Excel model <FileMeta>.xlsx · {sheets} sheets</FileMeta>
            </ButtonLink>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section aria-labelledby="hero-name" className="border-b border-rule">
        <Container className="grid gap-10 py-14 sm:py-20 lg:grid-cols-[1.15fr_1fr] lg:items-start lg:gap-14">
          <div>
            <h1 id="hero-name" className="font-serif text-[2.6rem] font-semibold leading-[1.05] sm:text-[3.5rem]">
              {personal.name}
            </h1>
            <p className="mt-3 text-[1.05rem] font-medium text-navy">{personal.roleLine}</p>
            <p className="mt-5 max-w-[34rem] text-[1.08rem] leading-relaxed text-body">
              {personal.intro[0]} {personal.intro[1]}
            </p>

            <div className="mt-7 max-w-[34rem] border border-navy/25 bg-navy-soft/60 px-5 py-4">
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.08em] text-navy">Looking for</p>
              <p className="mt-1 text-[1.02rem] font-medium text-ink">{personal.availability.internship}</p>
              <p className="mt-0.5 text-[0.92rem] text-body">
                {personal.availability.locations} · {personal.availability.agreement}
              </p>
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <ButtonLink href="#projects">View projects</ButtonLink>
              <ButtonLink href={personal.cvHref} variant="secondary">
                Download CV <FileMeta>PDF</FileMeta>
              </ButtonLink>
              <ButtonLink href={personal.linkedinHref} external variant="quiet">
                LinkedIn
              </ButtonLink>
            </div>
          </div>

          <div className="grid gap-5">
            <Snapshot
              href={airbus.path}
              accent="#0f2c47"
              label="Airbus SE · Valuation"
              rows={[
                { k: "DCF value vs share price", v: "€189.45 vs €198.40" },
                { k: "Recommendation", v: "HOLD (−4.5%)" },
                { k: "WACC / terminal growth", v: "7.30% / 3.00%" },
              ]}
            />
            <Snapshot
              href={starbucks.path}
              accent="#00704a"
              label="Starbucks · FP&A"
              rows={[
                { k: "Revenue FY2025A → FY2028F", v: "$37.2bn → $43.7bn" },
                { k: "Operating margin", v: "7.9% → 12.6%" },
                { k: "Three statements", v: "Balance with no plug" },
              ]}
            />
          </div>
        </Container>
      </section>

      {/* Projects */}
      <section aria-labelledby="projects" className="py-16 sm:py-20">
        <Container>
          <SectionHeading
            id="projects"
            title="Projects"
            intro="Two independent models built in Excel from company filings. Starbucks forecasts a business; Airbus values one."
          />
          <div className="grid gap-8">
            <ProjectCard
              accent="#0f2c47"
              kicker="Equity research · Valuation · Aug 2026"
              title={airbus.title}
              summary={airbus.summary}
              metrics={[
                { k: "DCF value per share", v: "€189.45" },
                { k: "Share price (31-Dec-2025)", v: "€198.40" },
                { k: "Recommendation", v: "HOLD (−4.5%)" },
                { k: "Football field", v: "€136.6–€359.0" },
              ]}
              tags={airbus.tags}
              chart={
                <>
                  <p className="mb-1 px-1 text-[0.78rem] text-muted">Value per share by method (€)</p>
                  <FootballField rows={airbus.footballField} dcf={airbus.dcfValue} price={airbus.sharePrice} compact />
                </>
              }
              href={airbus.path}
              report={airbus.files.report}
              model={airbus.files.model}
              sheets={airbus.sheets}
            />
            <ProjectCard
              accent="#00704a"
              kicker="FP&A · Financial modelling · Jul 2026"
              title={starbucks.title}
              summary={starbucks.summary}
              metrics={[
                { k: "Revenue FY2025A → FY2028F", v: "$37.2bn → $43.7bn" },
                { k: "Operating margin", v: "7.9% → 12.6%" },
                { k: "FY2028F net income", v: "$3.81bn (base)" },
                { k: "Scenario range, FY2028F NI", v: "$2.46bn–$5.43bn" },
              ]}
              tags={starbucks.tags}
              chart={
                <BarLineChart
                  compact
                  data={starbucks.base.map((d) => ({
                    label: d.year,
                    bar: d.revenue,
                    line: d.opMargin,
                    forecast: d.forecast,
                  }))}
                  barColor="#00704a"
                  lineColor="#9a7431"
                  barFormat={(v) => fmtBn(v, "$")}
                  lineFormat={fmtPct}
                  barTitle="Revenue"
                  lineTitle="Operating margin"
                  ariaLabel="Starbucks revenue and operating margin, FY2023A to FY2028F. Revenue $36.0bn, $36.2bn, $37.2bn, then forecast $39.1bn, $41.2bn, $43.7bn. Operating margin 16.3%, 15.0%, 7.9%, then 10.8%, 11.8%, 12.6%."
                />
              }
              href={starbucks.path}
              report={starbucks.files.report}
              model={starbucks.files.model}
              sheets={starbucks.sheets}
            />
          </div>
        </Container>
      </section>

      {/* About */}
      <section aria-labelledby="about" className="border-y border-rule bg-surface py-16 sm:py-20">
        <Container>
          <SectionHeading id="about" title="About" />
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h3 className="text-[0.75rem] font-semibold uppercase tracking-[0.08em] text-muted">Education</h3>
              <ul className="mt-3 divide-y divide-rule border-t border-ink/70">
                {education.map((e) => (
                  <li key={e.school} className="py-4">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <p className="font-medium text-ink">
                        {e.school}, {e.place}
                      </p>
                      <p className="num text-[0.85rem] text-muted">{e.period}</p>
                    </div>
                    <p className="text-[0.95rem]">{e.degree}</p>
                    {e.detail ? <p className="mt-1 text-[0.86rem] text-muted">{e.detail}</p> : null}
                  </li>
                ))}
              </ul>

              <h3 className="mt-10 text-[0.75rem] font-semibold uppercase tracking-[0.08em] text-muted">Experience</h3>
              <div className="mt-3 border-t border-ink/70 py-4">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <p className="font-medium text-ink">
                    {experience.role} — {experience.company}, {experience.place}
                  </p>
                  <p className="num text-[0.85rem] text-muted">{experience.period}</p>
                </div>
                <ul className="mt-2 space-y-1 text-[0.95rem]">
                  {experience.bullets.map((b) => (
                    <li key={b} className="flex gap-2.5">
                      <span aria-hidden="true" className="mt-[0.65rem] h-1 w-1 shrink-0 bg-muted" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div>
              <h3 className="text-[0.75rem] font-semibold uppercase tracking-[0.08em] text-muted">Skills</h3>
              <dl className="mt-3 divide-y divide-rule border-t border-ink/70">
                {skills.map((s) => (
                  <div key={s.group} className="grid gap-1 py-4 sm:grid-cols-[150px_1fr] sm:gap-4">
                    <dt className="font-medium text-ink">{s.group}</dt>
                    <dd className="text-[0.95rem]">{s.items.join(" · ")}</dd>
                  </div>
                ))}
                <div className="grid gap-1 py-4 sm:grid-cols-[150px_1fr] sm:gap-4">
                  <dt className="font-medium text-ink">Languages</dt>
                  <dd className="text-[0.95rem]">{languages.join(" · ")}</dd>
                </div>
                <div className="grid gap-1 py-4 sm:grid-cols-[150px_1fr] sm:gap-4">
                  <dt className="font-medium text-ink">Interests</dt>
                  <dd className="text-[0.95rem]">{interests.join(" · ")}</dd>
                </div>
              </dl>
            </div>
          </div>
        </Container>
      </section>

      {/* Contact */}
      <section aria-labelledby="contact" className="py-16 sm:py-20">
        <Container>
          <SectionHeading
            id="contact"
            title="Contact"
            intro={`Open to FP&A, Corporate Finance and Financial Analyst roles: ${personal.availability.internship.toLowerCase()} in ${personal.availability.locations}.`}
          />
          <dl className="grid border-t border-ink/70 sm:grid-cols-2 lg:grid-cols-4">
            <div className="border-b border-rule py-4 pr-4">
              <dt className="text-[0.72rem] font-semibold uppercase tracking-[0.08em] text-muted">Email</dt>
              <dd className="mt-1 break-all">
                <a href={`mailto:${personal.email}`} className="text-navy underline-offset-4 hover:underline">
                  {personal.email}
                </a>
              </dd>
            </div>
            <div className="border-b border-rule py-4 pr-4">
              <dt className="text-[0.72rem] font-semibold uppercase tracking-[0.08em] text-muted">Phone</dt>
              <dd className="num mt-1">
                <a href={personal.phoneHref} className="text-navy underline-offset-4 hover:underline">
                  {personal.phoneDisplay}
                </a>
              </dd>
            </div>
            <div className="border-b border-rule py-4 pr-4">
              <dt className="text-[0.72rem] font-semibold uppercase tracking-[0.08em] text-muted">LinkedIn</dt>
              <dd className="mt-1">
                <a
                  href={personal.linkedinHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-navy underline-offset-4 hover:underline"
                >
                  {personal.linkedinDisplay}
                </a>
              </dd>
            </div>
            <div className="border-b border-rule py-4 pr-4">
              <dt className="text-[0.72rem] font-semibold uppercase tracking-[0.08em] text-muted">CV</dt>
              <dd className="mt-1">
                <a href={personal.cvHref} className="text-navy underline-offset-4 hover:underline">
                  Download CV (PDF)
                </a>
              </dd>
            </div>
          </dl>
          <p className="mt-4 text-[0.88rem] text-muted">Based in {personal.location}.</p>
        </Container>
      </section>
    </>
  );
}
