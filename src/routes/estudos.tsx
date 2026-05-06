import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site-layout";
import { Container } from "@/components/container";
import { Hero, Title, Lede, Eyebrow, Prose } from "@/components/editorial";
import { Breadcrumbs } from "@/components/breadcrumbs";

export const Route = createFileRoute("/estudos")({
  head: () => ({
    meta: [
      { title: "Estudos — Estado Base" },
      {
        name: "description",
        content:
          "Estudos de neuropsicologia aplicada conduzidos por Vicente Cotanda — ao vivo, gravados e em formato de material.",
      },
      { property: "og:title", content: "Estudos — Estado Base" },
      {
        property: "og:description",
        content:
          "Três formatos de estudo. Um único compromisso com a profundidade.",
      },
    ],
  }),
  component: EstudosPage,
});

const FORMATOS = [
  {
    numeral: "I",
    label: "Ao vivo",
    to: "/sincronos",
    title: "Encontros ao vivo",
    desc: "Turmas pequenas, conduzidas em tempo real. O estudo como conversa — com espaço para perguntas, desvios e silêncio necessário.",
  },
  {
    numeral: "II",
    label: "Gravados",
    to: "/assincronos",
    title: "Estudos gravados",
    desc: "Percursos organizados como capítulos, para serem feitos no próprio ritmo. Sem perda de rigor, sem pressão de horário.",
  },
  {
    numeral: "III",
    label: "Materiais",
    to: "/materiais",
    title: "Materiais escritos",
    desc: "E-books, guias e protocolos pensados como objetos de leitura. Para levar para a prática clínica ou para a mesa de estudo.",
  },
];

const ESTUDOS = [
  {
    id: 1,
    formato: "Gravado",
    formatoTo: "/assincronos",
    title: "Neurociência: Cérebro, Personalidade e Comportamento Humano",
    desc: "Um percurso pelos fundamentos da neurociência aplicada ao entendimento da personalidade e do comportamento — com rigor científico e linguagem acessível.",
    preco: "R$ 1.000",
    hotmart: "https://pay.hotmart.com/H98688247S",
  },
  {
    id: 2,
    formato: "Gravado",
    formatoTo: "/assincronos",
    title: "Dopamina, Sistema de Recompensa e Felicidade",
    desc: "Como o cérebro processa recompensa, motivação e bem-estar. Um estudo sobre os mecanismos neurobiológicos por trás do que nos move.",
    preco: "R$ 1.000",
    hotmart: "https://pay.hotmart.com/U99575271K",
  },
  {
    id: 3,
    formato: "Gravado",
    formatoTo: "/assincronos",
    title: "Introdução ao Estudo da Personalidade",
    desc: "Uma introdução cuidadosa às principais teorias e modelos de personalidade — da biologia à psicologia clínica, sem atalhos.",
    preco: "R$ 1.000",
    hotmart: "https://pay.hotmart.com/L99574508U",
  },
  {
    id: 4,
    formato: "Gravado",
    formatoTo: "/assincronos",
    title: "Cérebro, Comportamento e Evolução",
    desc: "Como a evolução moldou o cérebro humano e o que isso significa para o comportamento, as emoções e a vida em sociedade.",
    preco: "R$ 1.000",
    hotmart: "https://pay.hotmart.com/P99583442A",
  },
];

function EstudosPage() {
  return (
    <SiteLayout>

      {/* HERO */}
      <Container as="section" size="3xl" className="pt-24 md:pt-36 pb-20 md:pb-28">
        <div className="mb-12">
          <Breadcrumbs
            items={[{ label: "Estado Base", to: "/" }, { label: "Estudos" }]}
          />
        </div>
        <Eyebrow align="left" className="mb-10">
          Estudos
        </Eyebrow>
        <Hero align="left">
          Três formas de
          <br />
          estudar o que{" "}
          <em className="italic font-normal text-accent">importa.</em>
        </Hero>
        <Lede align="left" className="mt-12">
          Ao vivo, gravado ou em texto — o formato muda, o compromisso
          com a profundidade permanece. Cada estudo é conduzido por Vicente
          Cotanda, psicólogo e doutorando em neurociências.
        </Lede>
      </Container>

      <Divider />

      {/* FORMATOS */}
      <Container as="section" size="6xl" className="py-24 md:py-32">
        <div className="mb-16 md:mb-20">
          <Eyebrow align="left" className="mb-8">Formatos</Eyebrow>
          <Title align="left">
            Como o estudo pode{" "}
            <em className="italic text-accent">acontecer.</em>
          </Title>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border">
          {FORMATOS.map((f) => (
            <div key={f.numeral} className="bg-background p-8 md:p-10 flex flex-col gap-6">
              <div className="flex items-baseline gap-4">
                <span className="font-serif text-accent text-3xl leading-none">
                  {f.numeral}
                </span>
                <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  {f.label}
                </span>
              </div>
              <h3 className="font-serif text-xl md:text-2xl text-foreground leading-snug">
                {f.title}
              </h3>
              <p className="text-[15px] leading-[1.75] text-muted-foreground flex-1">
                {f.desc}
              </p>
              <Link
                to={f.to}
                className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-accent border-b border-accent pb-px hover:opacity-70 transition-opacity self-start"
              >
                Ver estudos
                <span aria-hidden>→</span>
              </Link>
            </div>
          ))}
        </div>
      </Container>

      <Divider />

      {/* ESTUDOS — listagem */}
      <Container as="section" size="6xl" className="py-24 md:py-32">
        <div className="mb-16 md:mb-20">
          <Eyebrow align="left" className="mb-8">Disponíveis agora</Eyebrow>
          <Title align="left">
            Todos os{" "}
            <em className="italic text-accent">estudos.</em>
          </Title>
        </div>

        <div className="divide-y divide-border border-y border-border">
          {ESTUDOS.map((e, i) => (
            <article key={e.id} className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-16 py-10 md:py-12 items-start">

              {/* Número + formato */}
              <div className="lg:col-span-1 flex lg:flex-col items-center lg:items-start gap-4 lg:gap-2 pt-1">
                <span className="font-serif text-accent text-2xl leading-none tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <Link
                  to={e.formatoTo}
                  className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground hover:text-accent transition-colors"
                >
                  {e.formato}
                </Link>
              </div>

              {/* Título + descrição */}
              <div className="lg:col-span-7">
                <h3 className="font-serif text-2xl md:text-3xl leading-[1.15] text-foreground mb-4">
                  {e.title}
                </h3>
                <p className="text-[16px] leading-[1.8] text-muted-foreground max-w-[60ch]">
                  {e.desc}
                </p>
              </div>

              {/* Preço + CTA */}
              <div className="lg:col-span-4 lg:text-right flex flex-col lg:items-end gap-5">
                <div>
                  <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-1">
                    Investimento
                  </div>
                  <div className="font-serif text-3xl md:text-4xl text-foreground tracking-tight">
                    {e.preco}
                  </div>
                </div>
                <a
                  href={e.hotmart}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-primary text-primary-foreground px-6 py-3.5 text-xs tracking-wide hover:bg-primary/90 transition-colors"
                >
                  Inscrever-se
                  <span aria-hidden>→</span>
                </a>
                <span className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
                  Hotmart · pagamento seguro
                </span>
              </div>

            </article>
          ))}
        </div>
      </Container>

      <Divider />

      {/* CLOSING — Vicente */}
      <Container as="section" size="prose" className="py-24 md:py-32 text-center">
        <Eyebrow className="mb-8">Quem conduz</Eyebrow>
        <Title className="mb-10">
          Vicente{" "}
          <em className="italic text-accent">Cotanda.</em>
        </Title>
        <Prose align="center">
          <p>
            Psicólogo, doutorando em neurociências pelo Instituto do Cérebro
            do Rio Grande do Sul. Conduz estudos com o rigor de quem pesquisa
            e a clareza de quem ensina.
          </p>
        </Prose>
        <div className="mt-10">
          <Link
            to="/sobre"
            className="inline-flex items-center gap-3 text-sm tracking-wide text-foreground border-b border-accent pb-1 hover:text-accent transition-colors"
          >
            Ler sobre o Vicente
            <span aria-hidden>→</span>
          </Link>
        </div>
      </Container>

    </SiteLayout>
  );
}

function Divider() {
  return (
    <Container size="6xl">
      <div className="border-t border-border" />
    </Container>
  );
}
