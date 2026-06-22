import { CheckoutMP } from "@/components/CheckoutMP";
import { createFileRoute } from "@tanstack/react-router";

const COURSE_NAME =
  "Curso On-line Sobre Personalidade, Neurociência e o Modelo dos Cinco Grandes Fatores (Big Five Model)";
const WHATSAPP_URL = `https://wa.me/5551993545506?text=${encodeURIComponent(`Olá! Quero me inscrever no ${COURSE_NAME} e prefiro pagar via PIX com atendimento pelo WhatsApp.`)}`;

export const Route = createFileRoute("/pagamento")({
  head: () => ({
    meta: [
      { title: `Pagamento — ${COURSE_NAME}` },
      {
        name: "description",
        content: "Pagamento seguro da inscrição por cartão, PIX ou boleto, sem sair da página.",
      },
      { property: "og:title", content: `Pagamento — ${COURSE_NAME}` },
      {
        property: "og:description",
        content: "Inscrição no curso ao vivo com Vicente Cotanda. Cartão em até 9x, boleto ou PIX.",
      },
      { name: "twitter:title", content: `Pagamento — ${COURSE_NAME}` },
    ],
  }),
  component: PagamentoPage,
});

function PagamentoPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b-2 border-accent bg-background/90 py-3 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-6 md:px-10">
          <a href="/" className="font-serif text-xl font-medium text-foreground no-underline">
            Vicente <em className="not-italic text-accent">Cotanda</em>
          </a>
          <span className="hidden text-xs uppercase tracking-[0.08em] text-muted-foreground sm:inline">
            Inscrição
          </span>
        </div>
      </header>

      <main>
        <section className="mx-auto w-full max-w-5xl px-6 py-10 md:px-10 md:py-14">
          <a
            href="/"
            className="inline-flex text-sm text-muted-foreground underline-offset-4 hover:text-accent hover:underline"
          >
            ← Voltar
          </a>

          <header className="mx-auto mt-12 max-w-4xl text-center md:mt-16">
            <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-primary">
              Inscrição
            </p>
            <h1 className="mt-5 font-serif text-[clamp(36px,6vw,60px)] leading-[1.08]">
              Cartão, boleto ou PIX
            </h1>
            <p className="mt-5 text-base text-muted-foreground md:text-lg">
              3 aulas ao vivo · 12, 19 e 26 de agosto · Google Meet · com certificado
            </p>
          </header>

          <section className="mx-auto mt-10 max-w-3xl bg-[#7A1E1E] px-6 py-7 text-center text-[#F7F3EE] md:px-10">
            <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#C9963A]">
              1º LOTE
            </span>
            <p className="mt-4 text-sm text-[#F7F3EE]/60">
              De <s>R$ 1.299,00</s> por
            </p>
            <p className="mt-2 font-serif text-[clamp(44px,8vw,68px)] leading-none">R$ 979,00</p>
            <p className="mt-3 text-sm text-[#F7F3EE]/80">no Pix, à vista</p>
            <p className="mt-4 text-sm text-[#F7F3EE]/90 md:text-base">
              ou em até <strong>9x sem juros</strong> no cartão. Condições de primeiro lote.
            </p>
          </section>

          <div className="mx-auto mt-10 max-w-3xl">
            <CheckoutMP />
          </div>

          <aside className="mx-auto mt-7 max-w-3xl border border-border px-5 py-4 text-center text-sm text-muted-foreground">
            Prefere combinar o PIX diretamente com a equipe?{" "}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-foreground underline underline-offset-4 hover:text-accent"
            >
              Falar pelo WhatsApp
            </a>
          </aside>

          <footer className="mt-14 border-t border-border pt-8 text-center text-sm text-muted-foreground">
            <p>Dúvidas sobre inscrição, valores ou pagamento? Fale com a gente.</p>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-4">
              <a
                href="tel:+5551993545506"
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
              Garantia de 7 dias · devolução integral.
            </p>
          </footer>
        </section>
      </main>
    </div>
  );
}
