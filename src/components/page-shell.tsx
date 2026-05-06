import type { ReactNode } from "react";
import { SiteLayout } from "./site-layout";
import { Breadcrumbs, type Crumb } from "./breadcrumbs";
import { Container } from "./container";
import { Hero, Lede, Eyebrow } from "./editorial";

export function PageShell({
  eyebrow,
  title,
  lede,
  breadcrumbs,
  children,
}: {
  eyebrow: string;
  title: string;
  lede?: string;
  breadcrumbs?: Crumb[];
  children?: ReactNode;
}) {
  return (
    <SiteLayout>
      <Container as="section" size="3xl" className="pt-24 md:pt-36 pb-24 md:pb-32 text-center">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <div className="mb-10 flex justify-center">
            <Breadcrumbs items={breadcrumbs} />
          </div>
        )}
        <Eyebrow className="mb-8">{eyebrow}</Eyebrow>
        <Hero>{title}</Hero>
        {lede && <Lede className="mt-8">{lede}</Lede>}
      </Container>
      <Container size="3xl">
        <div className="border-t border-border" />
      </Container>
      <Container as="section" size="3xl" className="py-24 md:py-32 min-h-[30vh] text-center">
        {children ?? (
          <p className="font-serif italic text-muted-foreground">
            Conteúdo em preparação.
          </p>
        )}
      </Container>
    </SiteLayout>
  );
}