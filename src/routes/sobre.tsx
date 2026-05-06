import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site-layout";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Container } from "@/components/container";
import { Hero, Title, Lede, Eyebrow } from "@/components/editorial";

export const Route = createFileRoute("/sobre")({
  head: () => ({
    meta: [
      { title: "Sobre — Estado Base" },
      {
        name: "description",
        content:
          "Sobre Vicente e o trabalho da Estado Base — neuropsicologia aplicada com rigor e cuidado.",
      },
      { property: "og:title", content: "Sobre — Estado Base" },
      {
        property: "og:description",
        content: "Sobre Vicente e o projeto Estado Base.",
      },
    ],
  }),
  component: SobrePage,
});

function SobrePage() {
  return (
    <SiteLayout>
      {/* HERO — single column, generous, sober */}
      <Container as="section" size="3xl" className="pt-24 md:pt-36 pb-24 md:pb-32">
        <div className="mb-12">
          <Breadcrumbs
            items={[{ label: "Estado Base", to: "/" }, { label: "Sobre" }]}
          />
        </div>

        <Eyebrow align="left" className="mb-10">Sobre</Eyebrow>

        <Hero align="left">
          Vicente, e o que se
          <br />
          quer dizer com{" "}
          <em className="italic font-normal text-accent">Estado Base.</em>
        </Hero>

        <Lede align="left" italic className="mt-12">
          [PLACEHOLDER] Um parágrafo de abertura, escrito em primeira pessoa,
          sem promessas. Sobre o lugar de onde se fala e o que se pretende
          oferecer.
        </Lede>
      </Container>

      {/* DROP-CAP NARRATIVE — single column, book-like */}
      <Container as="section" size="prose" className="py-24 md:py-32">
        <article className="space-y-8 text-[18px] leading-[1.85] text-foreground">
          <p className="first-letter:font-serif first-letter:text-accent first-letter:text-7xl first-letter:font-medium first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:leading-[0.85]">
            [PLACEHOLDER] Aqui começa a narrativa pessoal. Quem é Vicente, de onde
            veio, o que estudou, como chegou à neuropsicologia aplicada — escrito
            como um capítulo curto, não como uma bio de currículo.
          </p>
          <p>
            [PLACEHOLDER] Um segundo parágrafo sobre a formação: psicólogo, com
            doutorado em uma universidade de Nova York, prática clínica
            continuada e um interesse específico por aquilo que sustenta o
            funcionamento humano em condições reais.
          </p>
          <p>
            [PLACEHOLDER] Um terceiro parágrafo sobre o método de trabalho —
            leitura lenta, escuta, devolutivas escritas, supervisão. O que se
            espera de quem estuda aqui.
          </p>
        </article>
      </Container>

      <Divider />

      {/* THE BRAND — proposal, in author's voice */}
      <Container as="section" size="prose" className="py-24 md:py-32">
        <Eyebrow align="left" className="mb-8">A proposta</Eyebrow>
        <Title align="left" className="mb-10">
          O que <em className="italic text-accent">Estado Base</em> quer ser.
        </Title>
        <div className="space-y-7 text-[17px] leading-[1.8] text-muted-foreground">
          <p>
            [PLACEHOLDER] Uma frase-conceito que define o nome — o que se entende
            por estado base, no contexto da neuropsicologia aplicada.
          </p>
          <p>
            [PLACEHOLDER] Um parágrafo sobre a intenção editorial do projeto: uma
            casa para cursos, materiais e protocolos pensados como objetos de
            leitura, não como produtos descartáveis.
          </p>
          <p>
            [PLACEHOLDER] Uma linha final sobre quem é o leitor implícito desta
            casa — psicólogos, neuropsicólogos, clínicos, estudantes em
            residência.
          </p>
        </div>
      </Container>

      <Divider />

      {/* CLOSING CTA — quiet */}
      <Container as="section" size="3xl" className="py-24 md:py-32 text-center">
        <p className="font-serif italic text-muted-foreground text-lg mb-8">
          Para começar pelo trabalho, e não pelas palavras:
        </p>
        <Link
          to="/sincronos"
          className="inline-flex items-center gap-3 bg-accent text-accent-foreground px-8 py-4 text-sm tracking-wide hover:bg-accent/90 transition-colors"
        >
          Conhecer os cursos
          <span aria-hidden>→</span>
        </Link>
      </Container>
    </SiteLayout>
  );
}

function Divider() {
  return (
    <Container size="3xl">
      <div className="border-t border-border" />
    </Container>
  );
}