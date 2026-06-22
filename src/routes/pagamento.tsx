import { createFileRoute } from "@tanstack/react-router";

const COURSE_NAME =
  "Curso On-line Sobre Personalidade, Neurociência e o Modelo dos Cinco Grandes Fatores (Big Five Model)";
const MERCADO_PAGO_URL = "https://mpago.li/1s8xuTe";
const WHATSAPP_URL =
  `https://wa.me/5551993545506?text=${encodeURIComponent(`Olá! Quero me inscrever no ${COURSE_NAME} e pagar via PIX com o desconto de 15%.`)}`;

export const Route = createFileRoute("/pagamento")({
  head: () => ({
    meta: [
      {
        title: `Pagamento — ${COURSE_NAME}`,
      },
      {
        name: "description",
        content:
          "Escolha a forma de pagamento da inscrição: cartão de crédito, boleto ou PIX.",
      },
      {
        property: "og:title",
        content: `Pagamento — ${COURSE_NAME}`,
      },
      {
        property: "og:description",
        content:
          "Inscrição no curso ao vivo com Vicente Cotanda. Cartão em até 9x, boleto ou PIX com desconto.",
      },
      {
        name: "twitter:title",
        content: `Pagamento — ${COURSE_NAME}`,
      },
    ],
  }),
  component: PagamentoPage,
});

function PagamentoPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b-2 border-accent bg-background/85 py-3 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-6 md:px-10">
          <a
            href="/"
            className="font-serif text-xl font-medium tracking-[-0.01em] text-foreground no-underline"
          >
            Vicente <em className="not-italic text-accent">Cotanda</em>
          </a>
          <span className="hidden text-xs uppercase tracking-[0.08em] text-muted-foreground sm:inline">
            Inscrição
          </span>
        </div>
      </header>

      <main>
        <section className="mx-auto w-full max-w-6xl px-6 py-10 md:px-10 md:py-14">
        <a
          href="/"
          className="inline-flex text-sm text-muted-foreground underline-offset-4 hover:text-accent hover:underline"
        >
          ← Voltar
        </a>

        <header className="mx-auto mt-16 max-w-4xl text-center md:mt-20">
          <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-primary">
            Inscrição
          </p>
          <h1 className="mt-6 font-serif text-[clamp(38px,6vw,64px)] leading-[1.08]">
            {COURSE_NAME}
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">
            3 aulas ao vivo · 12, 19 e 26 de agosto · Google Meet · com certificado
          </p>
        </header>

        <section className="mx-auto mt-12 max-w-3xl border-y border-border py-8 text-center">
          <p className="font-serif text-[clamp(46px,8vw,72px)] leading-none">
            R$ 979,00
          </p>
          <p className="mt-3 text-base text-muted-foreground">
            no PIX, à vista · ou em até 9x sem juros no cartão
          </p>
        </section>

        <section
          className="mt-12 grid gap-5 md:grid-cols-2"
          aria-label="Formas de pagamento"
        >
          <PaymentCard
            eyebrow="Cartão de crédito"
            title="Pague com cartão."
            cta="Pagar com cartão"
            href={MERCADO_PAGO_URL}
          >
            <p>
              Parcele em até 9x sem juros, ou pague com boleto bancário.
              Pagamento processado com segurança via Mercado Pago.
            </p>
          </PaymentCard>

          <PaymentCard
            eyebrow="PIX"
            title="PIX com desconto."
            cta="Pagar com PIX"
            href={WHATSAPP_URL}
            badge="15% OFF"
            variant="secondary"
          >
            <p>
              <strong className="font-serif text-3xl font-medium text-foreground">
                R$ 979,00
              </strong>{" "}
              <span className="text-sm text-muted-foreground line-through">
                R$ 1.299,00
              </span>
            </p>
            <p>
              Condição especial de primeiro lote. Para pagar via PIX, fale com
              a gente diretamente — confirmamos os dados e enviamos a chave.
            </p>
          </PaymentCard>
        </section>

        <footer className="mt-16 border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>
            Dúvidas sobre inscrição, valores ou pagamento? Fale com a gente.
          </p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://wa.me/5551993545506"
              target="_blank"
              rel="noopener"
              className="underline underline-offset-4 hover:text-accent"
            >
              +55 51 99354-5506
            </a>
            <a
              href="mailto:vdcotanda@gmail.com"
              className="underline underline-offset-4 hover:text-accent"
            >
              vdcotanda@gmail.com
            </a>
          </div>
          <p className="mt-5 text-xs uppercase tracking-[0.16em] text-muted-foreground">
            Garantia de 7 dias — devolução integral.
          </p>
        </footer>
        </section>
      </main>
    </div>
  );
}

function PaymentCard({
  eyebrow,
  title,
  cta,
  href,
  badge,
  variant = "primary",
  children,
}: {
  eyebrow: string;
  title: string;
  cta: string;
  href: string;
  badge?: string;
  variant?: "primary" | "secondary";
  children: React.ReactNode;
}) {
  return (
    <article className="relative flex min-h-[25rem] flex-col border border-border bg-card p-7 shadow-[0_18px_45px_rgba(28,26,46,0.08)] md:p-8">
      {badge ? (
        <span className="absolute right-5 top-5 bg-accent px-3 py-1 text-[11px] font-medium uppercase tracking-[0.14em] text-accent-foreground">
          {badge}
        </span>
      ) : null}
      <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-primary">
        {eyebrow}
      </p>
      <h2 className="mt-5 font-serif text-4xl leading-tight">{title}</h2>
      <div className="mt-6 grid gap-4 text-[16px] leading-relaxed text-muted-foreground">
        {children}
      </div>
      <a
        href={href}
        target="_blank"
        rel="noopener"
        className={
          variant === "primary"
            ? "mt-auto inline-flex w-full items-center justify-center bg-accent px-6 py-4 text-sm font-medium uppercase tracking-[0.06em] text-accent-foreground transition-colors hover:bg-accent/90"
            : "mt-auto inline-flex w-full items-center justify-center border border-accent px-6 py-4 text-sm font-medium uppercase tracking-[0.06em] text-accent transition-colors hover:bg-accent hover:text-accent-foreground"
        }
      >
        {cta}
      </a>
    </article>
  );
}
