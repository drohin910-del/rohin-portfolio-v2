import { personal } from "@/data/personal";
import { Container } from "./ui";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-8 border-t border-rule py-8 text-[0.84rem] text-muted">
      <Container className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p>
          {personal.name} · {personal.location} · {year}
        </p>
        <p>Independent student projects using public data; not investment advice.</p>
      </Container>
    </footer>
  );
}
