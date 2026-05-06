import { useEffect, useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { Container } from "./container";

const nav = [
  { to: "/estudos", label: "Estudos" },
  { to: "/sobre", label: "Sobre" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-background/85 border-b-2 border-accent">
      <Container size="6xl" className="h-20 flex items-center justify-between">
        <Link
          to="/"
          className="font-serif text-xl md:text-[22px] tracking-tight text-foreground hover:text-accent transition-colors"
        >
          Estado <span className="text-accent">Base</span>
        </Link>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          className="inline-flex flex-col items-end justify-center gap-[5px] h-10 w-10 text-foreground hover:text-accent transition-colors"
        >
          <span
            aria-hidden
            className={`block h-px bg-current transition-all ${open ? "w-6 translate-y-[6px] rotate-[8deg]" : "w-6"}`}
          />
          <span
            aria-hidden
            className={`block h-px bg-current transition-all ${open ? "w-6 opacity-0" : "w-5"}`}
          />
          <span
            aria-hidden
            className={`block h-px bg-current transition-all ${open ? "w-6 -translate-y-[6px] -rotate-[8deg]" : "w-4"}`}
          />
        </button>
      </Container>
      {open ? (
        <div className="border-t border-border bg-background">
          <Container as="nav" size="6xl" className="py-4 flex flex-col">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                activeProps={{ className: "text-foreground" }}
                inactiveProps={{ className: "text-muted-foreground" }}
                className="font-serif text-lg py-3 border-b border-border last:border-b-0 hover:text-primary transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </Container>
        </div>
      ) : null}
    </header>
  );
}
