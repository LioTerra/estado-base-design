import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/obrigado")({
  head: () => ({
    meta: [
      { title: "Inscrição recebida — Personalidade" },
      {
        name: "description",
        content: "Confirmação de inscrição no curso Personalidade.",
      },
    ],
  }),
  component: ObrigadoPage,
});

function ObrigadoPage() {
  return (
    <main className="grid min-h-screen place-items-center bg-background px-6 text-foreground">
      <section className="w-full max-w-2xl text-center">
        <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-primary">
          Inscrição recebida
        </p>
        <h1 className="mt-6 font-serif text-[clamp(40px,7vw,68px)] leading-tight">
          Obrigado.
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
          O Mercado Pago está processando sua inscrição. Você receberá as
          informações da turma após a confirmação do pagamento.
        </p>
        <a
          href="/"
          className="mt-10 inline-flex bg-accent px-7 py-4 text-sm font-medium uppercase tracking-[0.06em] text-accent-foreground"
        >
          Voltar para o curso
        </a>
      </section>
    </main>
  );
}
