import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

const COURSE_NAME =
  "Curso On-line Sobre Personalidade, Neurociência e o Modelo dos Cinco Grandes Fatores (Big Five Model)";
const MERCADO_PAGO_URL = "https://mpago.li/1s8xuTe";
const WHATSAPP_URL =
  `https://wa.me/5551993545506?text=${encodeURIComponent(`Olá! Quero me inscrever no ${COURSE_NAME} e pagar via PIX com o desconto de 15%.`)}`;

type WalletBrickController = {
  unmount?: () => void;
};

type MercadoPagoInstance = {
  bricks: () => {
    create: (
      type: "wallet",
      containerId: string,
      settings: {
        initialization: {
          preferenceId: string;
          redirectMode: "self" | "blank";
        };
      },
    ) => Promise<WalletBrickController>;
  };
};

declare global {
  interface Window {
    MercadoPago?: new (
      publicKey: string,
      options?: { locale: string },
    ) => MercadoPagoInstance;
  }
}

function loadMercadoPagoSdk() {
  if (window.MercadoPago) return Promise.resolve();

  return new Promise<void>((resolve, reject) => {
    const existingScript = document.querySelector<HTMLScriptElement>(
      'script[src="https://sdk.mercadopago.com/js/v2"]',
    );

    if (existingScript) {
      existingScript.addEventListener("load", () => resolve(), { once: true });
      existingScript.addEventListener("error", () => reject(), { once: true });
      return;
    }

    const script = document.createElement("script");
    script.src = "https://sdk.mercadopago.com/js/v2";
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Unable to load Mercado Pago SDK."));
    document.head.appendChild(script);
  });
}

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
  const [checkout, setCheckout] = useState<{
    preferenceId: string;
    publicKey: string;
    initPoint?: string;
  } | null>(null);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState("");

  useEffect(() => {
    if (!checkoutOpen || !checkout) return;

    let controller: WalletBrickController | undefined;
    let cancelled = false;

    const renderCheckout = async () => {
      try {
        await loadMercadoPagoSdk();
        if (cancelled || !window.MercadoPago) return;

        const mercadoPago = new window.MercadoPago(checkout.publicKey, {
          locale: "pt-BR",
        });

        controller = await mercadoPago.bricks().create(
          "wallet",
          "walletBrick_container",
          {
            initialization: {
              preferenceId: checkout.preferenceId,
              redirectMode: "blank",
            },
          },
        );
      } catch {
        setCheckoutError(
          "Não foi possível carregar o checkout. Use o link alternativo abaixo.",
        );
      }
    };

    void renderCheckout();

    return () => {
      cancelled = true;
      controller?.unmount?.();
    };
  }, [checkout, checkoutOpen]);

  const handleCheckout = async () => {
    setCheckoutLoading(true);
    setCheckoutError("");

    try {
      const response = await fetch("/api/create-preference", {
        method: "POST",
      });

      if (!response.ok) throw new Error("Preference creation failed.");

      const data = (await response.json()) as {
        preference_id: string;
        public_key: string;
        init_point?: string;
      };

      setCheckout({
        preferenceId: data.preference_id,
        publicKey: data.public_key,
        initPoint: data.init_point,
      });
      setCheckoutOpen(true);
    } catch {
      window.open(MERCADO_PAGO_URL, "_blank", "noopener,noreferrer");
    } finally {
      setCheckoutLoading(false);
    }
  };

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
            eyebrow="Mercado Pago"
            title="Cartão, boleto ou PIX"
            cta={checkoutLoading ? "Abrindo checkout..." : "Abrir checkout"}
            onClick={handleCheckout}
            disabled={checkoutLoading}
          >
            <p>
              Escolha cartão, boleto ou PIX no checkout seguro do Mercado Pago.
              No cartão, parcele em até 9x sem juros.
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
      {checkoutOpen ? (
        <CheckoutModal
          error={checkoutError}
          fallbackUrl={checkout?.initPoint ?? MERCADO_PAGO_URL}
          onClose={() => setCheckoutOpen(false)}
        />
      ) : null}
    </div>
  );
}

function CheckoutModal({
  error,
  fallbackUrl,
  onClose,
}: {
  error: string;
  fallbackUrl: string;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-foreground/55 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="checkout-title"
    >
      <div className="w-full max-w-xl border border-border bg-background p-6 shadow-2xl md:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-primary">
              Mercado Pago
            </p>
            <h2 id="checkout-title" className="mt-3 font-serif text-3xl">
              Cartão, boleto ou PIX
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-2 py-1 text-2xl leading-none text-muted-foreground hover:text-accent"
            aria-label="Fechar checkout"
          >
            ×
          </button>
        </div>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          Continue pelo botão seguro do Mercado Pago. A etapa de pagamento abre
          em uma nova aba para preservar esta página.
        </p>
        <div id="walletBrick_container" className="mt-6 min-h-14" />
        {error ? (
          <p className="mt-4 text-sm text-accent">{error}</p>
        ) : null}
        <a
          href={fallbackUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex text-sm underline underline-offset-4 hover:text-accent"
        >
          Abrir checkout diretamente
        </a>
      </div>
    </div>
  );
}

function PaymentCard({
  eyebrow,
  title,
  cta,
  href,
  onClick,
  disabled = false,
  badge,
  variant = "primary",
  children,
}: {
  eyebrow: string;
  title: string;
  cta: string;
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
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
      {onClick ? (
        <button
          type="button"
          onClick={onClick}
          disabled={disabled}
          className="mt-auto inline-flex w-full items-center justify-center bg-accent px-6 py-4 text-sm font-medium uppercase tracking-[0.06em] text-accent-foreground transition-colors hover:bg-accent/90 disabled:cursor-wait disabled:opacity-65"
        >
          {cta}
        </button>
      ) : (
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
      )}
    </article>
  );
}
