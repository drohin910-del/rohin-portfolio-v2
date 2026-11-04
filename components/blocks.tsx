import type { ReactNode } from "react";
import { ButtonLink, FileMeta } from "./ui";

export function Flow({ steps, accent }: { steps: readonly { step: string; detail: string }[]; accent: string }) {
  return (
    <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-7 lg:gap-0">
      {steps.map((s, i) => (
        <li key={s.step} className="relative border border-rule bg-surface p-4 lg:border-l-0 lg:first:border-l">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.04em] [overflow-wrap:anywhere]" style={{ color: accent }}>
            {s.step}
          </p>
          <p className="mt-1.5 text-[0.84rem] leading-snug text-body">{s.detail}</p>
          {i < steps.length - 1 ? (
            <span aria-hidden="true" className="absolute -right-2 top-1/2 z-10 hidden -translate-y-1/2 text-muted lg:block">
              ›
            </span>
          ) : null}
        </li>
      ))}
    </ol>
  );
}

export function JudgementBox({ items }: { items: readonly string[] }) {
  return (
    <aside aria-labelledby="judgement" className="border-l-4 border-gold bg-gold-soft/60 p-5 sm:p-6">
      <h2 id="judgement" className="font-serif text-[1.35rem] font-semibold">
        Judgement calls
      </h2>
      <p className="mt-1 text-[0.9rem] text-muted">
        Assumptions a reviewer should question first, and why I made them.
      </p>
      <ul className="mt-4 space-y-2.5">
        {items.map((t) => (
          <li key={t} className="flex gap-3 text-[0.95rem]">
            <span aria-hidden="true" className="mt-[0.6rem] h-1.5 w-1.5 shrink-0 bg-gold" />
            <span>{t}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export function Downloads({
  report,
  model,
  sheets,
}: {
  report: string;
  model: string;
  sheets: number;
}) {
  return (
    <div className="border border-rule bg-surface p-5 sm:p-6">
      <div className="flex flex-wrap gap-3">
        <ButtonLink href={report} external variant="primary">
          View 4-page report <FileMeta>PDF</FileMeta>
        </ButtonLink>
        <ButtonLink href={report} download variant="secondary">
          Download report <FileMeta>PDF · 4 pages</FileMeta>
        </ButtonLink>
        <ButtonLink href={model} download variant="secondary">
          Download Excel model <FileMeta>.xlsx · {sheets} sheets</FileMeta>
        </ButtonLink>
      </div>
      <p className="mt-4 text-[0.85rem] text-muted">
        Best opened in Microsoft Excel (the scenario table uses an Excel data table).
      </p>
    </div>
  );
}

export function DataTable({
  caption,
  head,
  rows,
  highlightLast = false,
  minWidth = "min-w-[520px]",
  textCols = [],
}: {
  caption: ReactNode;
  head: readonly string[];
  rows: readonly (readonly ReactNode[])[];
  highlightLast?: boolean;
  minWidth?: string;
  textCols?: readonly number[];
}) {
  return (
    <div className="overflow-x-auto">
      <table className={`w-full ${minWidth} border-collapse text-[0.9rem]`}>
        <caption className="mb-2 text-left text-[0.8rem] text-muted">{caption}</caption>
        <thead>
          <tr className="border-b-2 border-ink/80">
            {head.map((h, i) => (
              <th
                key={h}
                scope="col"
                className={`py-2 pr-3 text-[0.75rem] font-semibold uppercase tracking-[0.06em] text-muted ${
                  i === 0 || textCols.includes(i) ? "text-left" : "text-right"
                }`}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, ri) => (
            <tr
              key={ri}
              className={`border-b border-rule ${highlightLast && ri === rows.length - 1 ? "bg-tint font-semibold text-ink" : ""}`}
            >
              {r.map((c, ci) =>
                ci === 0 ? (
                  <th key={ci} scope="row" className="py-2 pr-3 text-left font-normal text-ink">
                    {c}
                  </th>
                ) : (
                  <td
                    key={ci}
                    className={textCols.includes(ci) ? "py-2 pr-3 text-left text-[0.86rem] text-muted" : "num py-2 pr-3 text-right"}
                  >
                    {c}
                  </td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function CaseHeader({
  accent,
  label,
  title,
  classification,
  period,
  disclosure,
  children,
}: {
  accent: string;
  label: string;
  title: string;
  classification: string;
  period: string;
  disclosure: string;
  children: ReactNode;
}) {
  return (
    <div className="border-b border-rule bg-surface">
      <div className="h-1.5 w-full" style={{ background: accent }} />
      <div className="mx-auto w-full max-w-6xl px-5 pb-10 pt-10 sm:px-8 sm:pt-14">
        <p className="text-[0.78rem] font-semibold uppercase tracking-[0.08em]" style={{ color: accent }}>
          {label}
        </p>
        <h1 className="mt-2 max-w-4xl font-serif text-[2.1rem] font-semibold leading-[1.12] sm:text-[2.75rem]">
          {title}
        </h1>
        <p className="mt-3 text-muted">
          {classification} · {period}
        </p>
        <p className="mt-1 text-[0.85rem] text-muted">{disclosure}</p>
        {children}
      </div>
    </div>
  );
}
