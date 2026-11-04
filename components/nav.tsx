import Link from "next/link";
import { personal } from "@/data/personal";

const links = [
  { href: "/#projects", label: "Projects" },
  { href: "/#about", label: "About" },
  { href: "/#contact", label: "Contact" },
];

export function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-rule bg-paper/95 backdrop-blur-sm">
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
        <Link href="/" className="font-serif text-[1.05rem] font-semibold text-ink hover:text-navy">
          {personal.name}
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="text-[0.9rem] text-muted transition-colors hover:text-ink">
              {l.label}
            </Link>
          ))}
          <a
            href={personal.cvHref}
            className="inline-flex min-h-9 items-center rounded-[3px] bg-navy px-3.5 text-[0.85rem] font-medium text-white transition-colors hover:bg-navy-deep"
          >
            Download CV
          </a>
        </nav>

        <details className="menu relative md:hidden">
          <summary
            className="inline-flex min-h-11 items-center rounded-[3px] border border-rule px-3 text-[0.9rem] text-ink"
            aria-label="Open menu"
          >
            Menu
          </summary>
          <nav
            aria-label="Mobile"
            className="absolute right-0 mt-2 flex w-56 flex-col rounded-[4px] border border-rule bg-surface p-2 shadow-lg"
          >
            {links.map((l) => (
              <Link key={l.href} href={l.href} className="rounded-[3px] px-3 py-3 text-ink hover:bg-tint">
                {l.label}
              </Link>
            ))}
            <a href={personal.cvHref} className="mt-1 rounded-[3px] bg-navy px-3 py-3 font-medium text-white">
              Download CV
            </a>
          </nav>
        </details>
      </div>
    </header>
  );
}
