import { Link } from "@tanstack/react-router";
import { Container } from "./container";

const nav = [
  { to: "/sincronos", label: "Curso ao vivo" },
  { to: "/sobre", label: "Sobre" },
] as const;

export function SiteFooter() {
  return (
    <footer className="mt-32 border-t-2 border-accent bg-secondary">
      <Container size="6xl" className="py-16 grid grid-cols-1 md:grid-cols-12 gap-10">
        <div className="md:col-span-6">
          <div className="font-serif text-xl text-foreground">
            Estado <span className="text-accent">Base</span>
          </div>
          <p className="mt-3 text-muted-foreground max-w-md text-[15px] leading-relaxed">
            Neuropsicologia aplicada — uma editora de ideias e práticas para o trabalho interior.
          </p>
        </div>
        <nav className="md:col-span-6 md:justify-self-end flex flex-wrap gap-x-8 gap-y-3">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="text-sm text-muted-foreground hover:text-accent transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="md:col-span-12 pt-8 border-t border-border text-xs text-muted-foreground tracking-wide">
          © {new Date().getFullYear()} Estado Base. Conduzido por Vicente.
        </div>
      </Container>
    </footer>
  );
}
