import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site-layout";
import { Container } from "@/components/container";

const HOTMART_URL = "[HOTMART_URL]";

export const Route = createFileRoute("/cursos/neuropsicologia-na-pratica")({
  head: () => ({
    meta: [
      { title: "Neuropsicologia na Prática — Estado Base" },
      {
        name: "description",
        content:
          "Curso de Neuropsicologia na Prática conduzido por Vicente Cotanda, psicólogo e doutor pela New York.",
      },
      {
        property: "og:title",
        content: "Neuropsicologia na Prática — Estado Base",
      },
      {
        property: "og:description",
        content:
          "Um curso de neuropsicologia aplicada, conduzido por Vicente Cotanda.",
      },
    ],
  }),
  component: CoursePage,
});

const outcomes = [
  "[PLACEHOLDER] Compreender os fundamentos clínicos da neuropsicologia aplicada.",
  "[PLACEHOLDER] Conduzir avaliações breves com escuta e precisão.",
  "[PLACEHOLDER] Construir hipóteses funcionais a partir de sinais sutis.",
  "[PLACEHOLDER] Integrar achados ao plano terapêutico do paciente.",
  "[PLACEHOLDER] Escrever devolutivas claras, humanas e tecnicamente sólidas.",
  "[PLACEHOLDER] Sustentar a prática com leitura contínua e supervisão.",
];

const testimonials = [
  {
    quote:
      "[PLACEHOLDER] Um curso que mudou a forma como escuto meus pacientes. Vicente conduz com rigor e delicadeza, sem nunca perder a profundidade.",
    name: "—  Aluna 1",
    role: "Psicóloga clínica",
  },
  {
    quote:
      "[PLACEHOLDER] Saí com um repertório técnico real e, mais que isso, com uma nova forma de pensar o trabalho clínico.",
    name: "—  Aluno 2",
    role: "Neuropsicólogo",
  },
  {
    quote:
      "[PLACEHOLDER] Raríssimo encontrar um curso que respeita o tempo do estudo. Voltei a ler, voltei a pensar.",
    name: "—  Aluna 3",
    role: "Psicóloga, residência",
  },
];

const faqs = [
  {
    q: "[PLACEHOLDER] Para quem é este curso?",
    a: "[PLACEHOLDER] Resposta breve descrevendo o público — psicólogos, neuropsicólogos, residentes, profissionais da saúde mental que desejam aprofundar a prática clínica.",
  },
  {
    q: "[PLACEHOLDER] Preciso de formação prévia em neuropsicologia?",
    a: "[PLACEHOLDER] Resposta sobre pré-requisitos, leituras sugeridas antes do início e nível esperado.",
  },
  {
    q: "[PLACEHOLDER] Como funcionam os encontros?",
    a: "[PLACEHOLDER] Resposta sobre o formato — encontros ao vivo, materiais gravados, leituras complementares e supervisão.",
  },
  {
    q: "[PLACEHOLDER] Há certificado ao final?",
    a: "[PLACEHOLDER] Resposta sobre certificação, carga horária e critérios de conclusão.",
  },
];

function CoursePage() {
  return (
    <SiteLayout>
      {/* HERO */}
      <Container as="section" size="6xl" className="pt-20 md:pt-32 pb-20 md:pb-28">
        <nav
          aria-label="Breadcrumb"
          className="mb-12 text-xs uppercase tracking-[0.2em] text-muted-foreground"
        >
          <ol className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <li>
              <Link to="/" className="hover:text-primary transition-colors">
                Estado Base
              </Link>
            </li>
            <li aria-hidden className="text-border">/</li>
            <li>
              <Link to="/sincronos" className="hover:text-primary transition-colors">
                Cursos Síncronos
              </Link>
            </li>
            <li aria-hidden className="text-border">/</li>
            <li aria-current="page" className="text-foreground">
              Neuropsicologia na Prática
            </li>
          </ol>
        </nav>
        <div className="text-xs uppercase tracking-[0.2em] text-accent mb-8 flex items-center gap-3">
          <span aria-hidden className="inline-block h-px w-6 bg-accent" />
          Curso · Neuropsicologia Aplicada
        </div>
        <h1 className="font-serif text-[44px] sm:text-[58px] lg:text-[80px] leading-[1.04] tracking-tight text-foreground max-w-3xl">
          Neuropsicologia
          <br />
          na <em className="italic font-normal text-primary">Prática.</em>
        </h1>
        <p className="mt-10 max-w-[60ch] text-[18px] md:text-[20px] leading-[1.7] text-muted-foreground font-serif italic">
          [PLACEHOLDER] Um subtítulo cuidadoso, escrito com calma, que situa o leitor
          diante do que este curso é — e do que ele não é. Duas linhas, no máximo
          três.
        </p>
        <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4 text-sm text-muted-foreground">
          <span>com <span className="text-foreground">Vicente Cotanda</span></span>
          <span aria-hidden className="text-border">·</span>
          <span>[PLACEHOLDER] Próxima turma em [data]</span>
          <span aria-hidden className="text-border">·</span>
          <span>[PLACEHOLDER] Vagas limitadas</span>
        </div>
      </Container>

      <Divider />

      {/* BIO */}
      <Container as="section" size="6xl" className="py-24 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          <div className="lg:col-span-5">
            <figure>
              <div className="aspect-[4/5] w-full bg-secondary border border-border relative overflow-hidden">
                <div
                  className="absolute inset-0 opacity-[0.07]"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(45deg, var(--color-foreground) 0 1px, transparent 1px 14px)",
                  }}
                  aria-hidden
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-serif italic text-muted-foreground text-sm tracking-wide">
                    retrato — Vicente Cotanda
                  </span>
                </div>
              </div>
              <figcaption className="mt-4 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                Vicente Cotanda · Psicólogo, PhD
              </figcaption>
            </figure>
          </div>
          <div className="lg:col-span-7">
            <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-6">
              Sobre o autor
            </div>
            <h2 className="font-serif text-3xl md:text-5xl leading-[1.1] text-foreground">
              Vicente Cotanda.
            </h2>
            <div className="mt-8 space-y-5 text-[17px] leading-[1.75] text-muted-foreground max-w-[60ch]">
              <p>
                [PLACEHOLDER] Psicólogo, doutor (PhD) por uma universidade em Nova
                York, com formação clínica e pesquisa em neuropsicologia aplicada.
              </p>
              <p>
                [PLACEHOLDER] Um parágrafo sobre a trajetória — o que estudou, onde
                ensinou, como chegou à forma de trabalho que pratica hoje. Tom
                editorial, sem superlativos.
              </p>
              <p>
                [PLACEHOLDER] Uma linha final sobre o que move seu ensino: a leitura
                lenta, o cuidado clínico, o respeito ao paciente.
              </p>
            </div>
          </div>
        </div>
      </Container>

      <Divider />

      {/* WHAT YOU'LL LEARN */}
      <Container as="section" size="6xl" className="py-24 md:py-32">
        <div className="mb-16 md:mb-20 max-w-[60ch]">
          <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-6">
            O que você levará
          </div>
          <h2 className="font-serif text-3xl md:text-5xl leading-[1.1] text-foreground">
            Um conjunto de aprendizados <em className="italic">duráveis.</em>
          </h2>
        </div>
        <ol className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10 max-w-5xl"> {/* editorial-width-ok: 2-col grid, not body copy */}
          {outcomes.map((o, i) => (
            <li key={i} className="flex gap-6">
              <span className="font-serif text-accent text-xl tabular-nums shrink-0 pt-0.5">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="text-[17px] leading-[1.7] text-foreground">{o}</p>
            </li>
          ))}
        </ol>
      </Container>

      <Divider />

      {/* FORMAT */}
      <Container as="section" size="6xl" className="py-24 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          <div className="lg:col-span-5">
            <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-6">
              Formato
            </div>
            <h2 className="font-serif text-3xl md:text-5xl leading-[1.1] text-foreground">
              Como o curso acontece.
            </h2>
          </div>
          <div className="lg:col-span-7">
            <dl className="divide-y divide-border border-y border-border">
              {[
                ["Duração", "[PLACEHOLDER] X semanas"],
                ["Encontros síncronos", "[PLACEHOLDER] X encontros ao vivo, semanais"],
                ["Conteúdo assíncrono", "[PLACEHOLDER] Aulas gravadas e leituras"],
                ["Carga horária", "[PLACEHOLDER] X horas"],
                ["Suporte", "[PLACEHOLDER] Acompanhamento direto e supervisão"],
              ].map(([k, v]) => (
                <div
                  key={k}
                  className="grid grid-cols-3 gap-6 py-5"
                >
                  <dt className="text-xs uppercase tracking-[0.18em] text-muted-foreground col-span-1 pt-1">
                    {k}
                  </dt>
                  <dd className="col-span-2 text-[17px] leading-[1.6] text-foreground font-serif">
                    {v}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Container>

      <Divider />

      {/* TESTIMONIALS */}
      <Container as="section" size="6xl" className="py-24 md:py-32">
        <div className="mb-16 md:mb-20 max-w-[60ch]">
          <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-6">
            Quem já estudou
          </div>
          <h2 className="font-serif text-3xl md:text-5xl leading-[1.1] text-foreground">
            Sobre a experiência.
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border">
          {testimonials.map((t, i) => (
            <figure
              key={i}
              className="bg-background p-8 md:p-10 flex flex-col"
            >
              <span aria-hidden className="font-serif text-accent text-5xl leading-none mb-6">
                “
              </span>
              <blockquote className="font-serif text-[18px] md:text-[19px] leading-[1.55] text-foreground italic flex-1">
                {t.quote}
              </blockquote>
              <figcaption className="mt-8 pt-6 border-t border-border">
                <div className="text-sm text-foreground">{t.name}</div>
                <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground mt-1">
                  {t.role}
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>

      <Divider />

      {/* PRICING */}
      <Container as="section" size="6xl" className="py-28 md:py-40">
        <div className="max-w-3xl">
          <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-8">
            Inscrição
          </div>
          <h2 className="font-serif text-4xl md:text-6xl leading-[1.05] text-foreground">
            Um investimento sereno
            <br />
            <em className="italic text-primary">no seu próprio estudo.</em>
          </h2>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-12 gap-10 items-end border-t border-border pt-10">
            <div className="md:col-span-5">
              <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">
                Valor
              </div>
              <div className="font-serif text-5xl md:text-6xl text-foreground tracking-tight">
                [PRICE PLACEHOLDER]
              </div>
              <div className="mt-3 text-sm text-muted-foreground">
                [PLACEHOLDER] ou em até X parcelas
              </div>
            </div>
            <div className="md:col-span-7 md:pl-10 md:border-l md:border-border">
              <p className="text-[16px] leading-[1.7] text-muted-foreground max-w-[60ch] mb-8">
                [PLACEHOLDER] Uma linha breve sobre o que está incluído — encontros,
                materiais, certificado, comunidade.
              </p>
              <a
                href={HOTMART_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-primary text-primary-foreground px-8 py-4 text-sm tracking-wide hover:bg-primary/90 transition-colors"
              >
                Inscrever-se pelo Hotmart
                <span aria-hidden>→</span>
              </a>
              <div className="mt-4 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                Pagamento seguro · processado pela Hotmart
              </div>
            </div>
          </div>
        </div>
      </Container>

      <Divider />

      {/* FAQ */}
      <Container as="section" size="6xl" className="py-24 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          <div className="lg:col-span-4">
            <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-6">
              Perguntas
            </div>
            <h2 className="font-serif text-3xl md:text-5xl leading-[1.1] text-foreground">
              Antes de
              <br />
              se inscrever.
            </h2>
          </div>
          <div className="lg:col-span-8">
            <dl className="divide-y divide-border border-y border-border">
              {faqs.map((f) => (
                <div key={f.q} className="py-8">
                  <dt className="font-serif text-xl md:text-2xl text-foreground leading-snug">
                    {f.q}
                  </dt>
                  <dd className="mt-4 text-[16px] leading-[1.75] text-muted-foreground max-w-[60ch]">
                    {f.a}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
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