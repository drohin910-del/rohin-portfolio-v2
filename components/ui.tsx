import Link from "next/link";
import type { ReactNode } from "react";

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-6xl px-5 sm:px-8 ${className}`}>{children}</div>;
}

export function SectionHeading({
  id,
  title,
  intro,
}: {
  id?: string;
  title: string;
  intro?: ReactNode;
}) {
  return (
    <div className="mb-8 max-w-3xl">
      <h2 id={id} className="scroll-mt-20 font-serif text-[1.75rem] font-semibold leading-tight sm:text-[2rem]">
        {title}
      </h2>
      {intro ? <p className="mt-2 text-muted">{intro}</p> : null}
    </div>
  );
}

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "quiet";
  external?: boolean;
  download?: boolean;
  className?: string;
  ariaLabel?: string;
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  external = false,
  download = false,
  className = "",
  ariaLabel,
}: ButtonProps) {
  const base =
    "inline-flex min-h-11 items-center justify-center gap-2 rounded-[3px] px-4 py-2 text-[0.92rem] font-medium transition-colors";
  const styles = {
    primary: "bg-navy text-white hover:bg-navy-deep",
    secondary: "border border-navy text-navy hover:bg-navy-soft",
    quiet: "border border-rule bg-surface text-ink hover:border-navy hover:text-navy",
  }[variant];
  const cls = `${base} ${styles} ${className}`;
  const isFile = /\.(pdf|xlsx)$/i.test(href);
  if (external || isFile || href.startsWith("mailto:") || href.startsWith("tel:")) {
    return (
      <a
        href={href}
        className={cls}
        aria-label={ariaLabel}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...(download ? { download: "" } : {})}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} aria-label={ariaLabel}>
      {children}
    </Link>
  );
}

export function Tag({ children }: { children: ReactNode }) {
  return (
    <li className="rounded-[3px] border border-rule bg-surface px-2.5 py-1 text-[0.78rem] text-muted">{children}</li>
  );
}

export function Metric({
  label,
  value,
  note,
  accent = "text-ink",
}: {
  label: string;
  value: string;
  note?: string;
  accent?: string;
}) {
  return (
    <div className="border-t-2 border-ink/80 pt-3">
      <dt className="text-[0.72rem] font-semibold uppercase tracking-[0.08em] text-muted">{label}</dt>
      <dd className={`num mt-1 text-[1.25rem] font-medium leading-snug ${accent}`}>{value}</dd>
      {note ? <dd className="mt-0.5 text-[0.82rem] text-muted">{note}</dd> : null}
    </div>
  );
}

export function FileMeta({ children }: { children: ReactNode }) {
  return <span className="text-[0.75rem] font-normal opacity-90">{children}</span>;
}

export function Note({ children }: { children: ReactNode }) {
  return <p className="mt-3 text-[0.82rem] text-muted">{children}</p>;
}
