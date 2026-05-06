import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site-layout";
import { Container } from "@/components/container";
import { Hero, Title, Lede, Prose, Eyebrow } from "@/components/editorial";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Estado Base — Neuropsicologia Aplicada" },
      {
        name: "description",
        content:
          "Cursos e materiais de neuropsicologia aplicada conduzidos por Vicente. Uma editora de ideias e práticas para o trabalho interior.",
      },
      { property: "og:title", content: "Estado Base — Neuropsicologia Aplicada" },
      {
        property: "og:description",
        content: "Cursos síncronos, assíncronos e materiais conduzidos por Vicente.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <SiteLayout>
      {/* HERO */}
      <Container as="section" className="pt-24 md:pt-36 pb-24 md:pb-32 text-center">
        <Eyebrow className="mb-10">Neuropsicologia Aplicada</Eyebrow>
        <Hero>
          Um estudo sereno
          <br />
          sobre o que nos
          <br />
          <em className="italic font-normal text-accent">sustenta.</em>
        </Hero>
        <Lede className="mt-10">
          Placeholder. Uma frase introdutória, escrita com calma, que apresenta o
          propósito do trabalho e convida o leitor a permanecer um pouco mais.
          Duas ou três linhas, sem pressa.
        </Lede>
      </Container>

      <Divider />

      {/* SOBRE O ESTADO BASE */}
      <Container as="section" className="py-24 md:py-32 text-center">
        <Eyebrow className="mb-8">Sobre o Estado Base</Eyebrow>
        <Title className="mb-10">
          Uma editora de ideias e <em className="italic text-accent">práticas.</em>
        </Title>
        <Prose align="center">
          <p>
            [PLACEHOLDER] Um parágrafo sobre o que é o Estado Base — uma casa
            para cursos, materiais e protocolos de neuropsicologia aplicada,
            pensados como objetos de leitura, não como produtos descartáveis.
          </p>
          <p>
            [PLACEHOLDER] Uma segunda linha sobre a intenção editorial: rigor
            sem solenidade, profundidade sem hermetismo, prática sem atalhos.
          </p>
        </Prose>
        <div className="mt-10">
          <Link
            to="/sobre"
            className="inline-flex items-center gap-3 text-sm tracking-wide text-foreground border-b border-accent pb-1 hover:text-accent transition-colors"
          >
            Ler a página completa
            <span aria-hidden>→</span>
          </Link>
        </div>
      </Container>

      <Divider />

      {/* VIDEO PLACEHOLDER */}
      <Container as="section" className="py-24 md:py-32 text-center">
        <Eyebrow className="mb-8">Apresentação</Eyebrow>
        <figure>
          <div className="aspect-video w-full bg-secondary border border-border relative overflow-hidden">
            <div
              className="absolute inset-0 opacity-[0.07]"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(45deg, var(--color-foreground) 0 1px, transparent 1px 14px)",
              }}
              aria-hidden
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
              <div className="h-16 w-16 rounded-full border-2 border-accent flex items-center justify-center">
                <span aria-hidden className="text-accent text-xl ml-1">▶</span>
              </div>
              <span className="font-serif italic text-muted-foreground text-sm tracking-wide">
                espaço reservado para vídeo
              </span>
            </div>
          </div>
          <figcaption className="mt-4 text-xs uppercase tracking-[0.18em] text-muted-foreground">
            [PLACEHOLDER] Breve descrição do vídeo
          </figcaption>
        </figure>
      </Container>

      <Divider />

      {/* CLOSING CTA */}
      <Container as="section" className="py-24 md:py-32 text-center">
        <p className="font-serif italic text-muted-foreground text-lg mb-8">
          Para começar pelo trabalho:
        </p>
        <Link
          to="/sincronos"
          className="inline-flex items-center gap-3 bg-primary text-primary-foreground px-8 py-4 text-sm tracking-wide hover:bg-primary/90 transition-colors"
        >
          Conhecer os cursos
          <span aria-hidden>→</span>
        </Link>
        <nav
          aria-label="Atalhos para os cursos"
          className="mt-10 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-xs uppercase tracking-[0.2em] text-muted-foreground"
        >
          <span aria-hidden className="inline-block h-px w-6 bg-accent" />
          <Link to="/sincronos" className="hover:text-accent transition-colors">
            Síncronos
          </Link>
          <span aria-hidden className="inline-block h-px w-6 bg-accent" />
          <Link to="/assincronos" className="hover:text-accent transition-colors">
            Assíncronos
          </Link>
          <span aria-hidden className="inline-block h-px w-6 bg-accent" />
          <Link to="/materiais" className="hover:text-accent transition-colors">
            Materiais
          </Link>
          <span aria-hidden className="inline-block h-px w-6 bg-accent" />
        </nav>
      </Container>
    </SiteLayout>
  );
}

function Divider() {
  return (
    <Container>
      <div className="border-t border-border" />
    </Container>
  );
}
