import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/obrigado")({
  head: () => ({
    meta: [
      { title: "Pagamento confirmado! — Personalidade e Neurociência" },
      {
        name: "description",
        content: "Confirmação de pagamento do curso Personalidade e Neurociência.",
      },
    ],
  }),
  component: ObrigadoPage,
});

function ObrigadoPage() {
  return (
    <main className="grid min-h-screen place-items-center bg-background px-6 text-foreground">
      <section className="w-full max-w-2xl text-center">
        <h1 className="mt-6 font-serif text-[clamp(40px,7vw,68px)] leading-tight">
          Pagamento confirmado!
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
          Em breve você receberá o acesso por e-mail. Qualquer dúvida, entre em contato:{" "}
          <a
            href="mailto:vdcotanda@gmail.com"
            className="text-foreground underline underline-offset-4 hover:text-accent"
          >
            vdcotanda@gmail.com
          </a>
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
