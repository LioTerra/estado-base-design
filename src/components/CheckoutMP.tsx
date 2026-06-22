import { Barcode, Check, Copy, CreditCard, ExternalLink, LoaderCircle, QrCode } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type PaymentMode = "card" | "pix" | "boleto";

type CardFormData = {
  token: string;
  installments: number;
  payment_method_id: string;
  transaction_amount: number;
  payer: {
    email: string;
    identification: {
      type: string;
      number: string;
    };
  };
};

type CardAdditionalData = {
  paymentTypeId: "credit_card" | "debit_card";
};

type BrickController = {
  unmount: () => void;
};

type MercadoPagoInstance = {
  bricks: () => {
    create: (
      type: "cardPayment",
      containerId: string,
      settings: {
        initialization: { amount: number };
        customization: {
          paymentMethods: { maxInstallments: number };
          visual: { style: { theme: "default" } };
        };
        callbacks: {
          onReady: () => void;
          onSubmit: (formData: CardFormData, additionalData: CardAdditionalData) => Promise<void>;
          onError: (error: unknown) => void;
        };
      },
    ) => Promise<BrickController>;
  };
};

declare global {
  interface Window {
    MercadoPago?: new (publicKey: string, options?: { locale: string }) => MercadoPagoInstance;
  }
}

type OrderResult = {
  order_id?: string;
  status?: string;
  status_detail?: string;
  payment_status?: string;
  payment_status_detail?: string;
  ticket_url?: string;
  qr_code?: string;
  qr_code_base64?: string;
  digitable_line?: string;
  error?: string;
};

const modes: Array<{
  id: PaymentMode;
  label: string;
  icon: typeof CreditCard;
}> = [
  { id: "card", label: "Cartão", icon: CreditCard },
  { id: "pix", label: "PIX", icon: QrCode },
  { id: "boleto", label: "Boleto", icon: Barcode },
];

function loadMercadoPagoSdk() {
  if (window.MercadoPago) return Promise.resolve();

  return new Promise<void>((resolve, reject) => {
    const current = document.querySelector<HTMLScriptElement>(
      'script[src="https://sdk.mercadopago.com/js/v2"]',
    );

    if (current) {
      current.addEventListener("load", () => resolve(), { once: true });
      current.addEventListener("error", () => reject(), { once: true });
      return;
    }

    const script = document.createElement("script");
    script.src = "https://sdk.mercadopago.com/js/v2";
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Mercado Pago SDK unavailable"));
    document.head.appendChild(script);
  });
}

async function submitOrder(payload: Record<string, unknown>) {
  const response = await fetch("/api/process-order", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const result = (await response.json()) as OrderResult;

  if (!response.ok) {
    throw new Error(result.error || "Não foi possível processar o pagamento.");
  }

  return result;
}

export function CheckoutMP() {
  const [mode, setMode] = useState<PaymentMode>("card");
  const [publicKey, setPublicKey] = useState("");
  const [loadingConfig, setLoadingConfig] = useState(true);
  const [brickReady, setBrickReady] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<OrderResult | null>(null);
  const [copied, setCopied] = useState(false);
  const cardController = useRef<BrickController | null>(null);

  useEffect(() => {
    let active = true;

    const prepare = async () => {
      try {
        const response = await fetch("/api/create-order");
        const data = (await response.json()) as { public_key?: string; error?: string };
        if (!response.ok || !data.public_key) {
          throw new Error(data.error || "Checkout indisponível.");
        }
        if (active) setPublicKey(data.public_key);
      } catch (reason) {
        if (active) {
          setError(
            reason instanceof Error ? reason.message : "Não foi possível iniciar o checkout.",
          );
        }
      } finally {
        if (active) setLoadingConfig(false);
      }
    };

    void prepare();
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (mode !== "card" || !publicKey) return;

    let active = true;

    const renderCardForm = async () => {
      setBrickReady(false);
      setError("");

      try {
        await loadMercadoPagoSdk();
        if (!active || !window.MercadoPago) return;

        const mp = new window.MercadoPago(publicKey, { locale: "pt-BR" });
        const controller = await mp.bricks().create("cardPayment", "cardPaymentBrick_container", {
          initialization: { amount: 979 },
          customization: {
            paymentMethods: { maxInstallments: 9 },
            visual: { style: { theme: "default" } },
          },
          callbacks: {
            onReady: () => {
              if (active) setBrickReady(true);
            },
            onSubmit: async (formData, additionalData) => {
              setProcessing(true);
              setError("");

              try {
                const order = await submitOrder({
                  paymentType: "card",
                  paymentMethodId: formData.payment_method_id,
                  paymentMethodType: additionalData.paymentTypeId,
                  token: formData.token,
                  installments: Number(formData.installments),
                  payer: formData.payer,
                });

                if (
                  order.status === "processed" ||
                  order.status_detail === "accredited" ||
                  order.payment_status === "processed"
                ) {
                  window.location.assign("/obrigado");
                  return;
                }

                setError("O pagamento não foi aprovado. Revise os dados ou tente outro cartão.");
              } catch (reason) {
                setError(
                  reason instanceof Error
                    ? reason.message
                    : "Não foi possível processar o pagamento.",
                );
              } finally {
                setProcessing(false);
              }
            },
            onError: () => {
              if (active) {
                setError("Não foi possível carregar o formulário do cartão.");
              }
            },
          },
        });

        if (!active) {
          controller.unmount();
          return;
        }

        cardController.current = controller;
      } catch {
        if (active) setError("Não foi possível carregar o formulário do cartão.");
      }
    };

    void renderCardForm();

    return () => {
      active = false;
      cardController.current?.unmount();
      cardController.current = null;
    };
  }, [mode, publicKey]);

  const changeMode = (nextMode: PaymentMode) => {
    setMode(nextMode);
    setError("");
    setResult(null);
    setCopied(false);
  };

  const handleAlternativePayment = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setProcessing(true);
    setError("");
    setResult(null);

    const data = new FormData(event.currentTarget);
    const payer = {
      email: String(data.get("email") || ""),
      firstName: String(data.get("firstName") || ""),
      lastName: String(data.get("lastName") || ""),
      identification: {
        type: "CPF",
        number: String(data.get("cpf") || ""),
      },
      ...(mode === "boleto"
        ? {
            address: {
              zipCode: String(data.get("zipCode") || ""),
              streetName: String(data.get("streetName") || ""),
              streetNumber: String(data.get("streetNumber") || ""),
              neighborhood: String(data.get("neighborhood") || ""),
              city: String(data.get("city") || ""),
              state: String(data.get("state") || ""),
            },
          }
        : {}),
    };

    try {
      const order = await submitOrder({ paymentType: mode, payer });
      setResult(order);
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Não foi possível gerar o pagamento.");
    } finally {
      setProcessing(false);
    }
  };

  const copyPix = async () => {
    if (!result?.qr_code) return;
    await navigator.clipboard.writeText(result.qr_code);
    setCopied(true);
  };

  return (
    <section className="border border-border bg-[#F7F3EE] shadow-[0_18px_45px_rgba(28,26,46,0.08)]">
      <div
        className="grid grid-cols-3 border-b border-border"
        role="tablist"
        aria-label="Forma de pagamento"
      >
        {modes.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={mode === id}
            onClick={() => changeMode(id)}
            className={`flex min-h-16 items-center justify-center gap-2 border-b-2 px-3 text-sm font-medium transition-colors ${
              mode === id
                ? "border-[#C9963A] text-[#1C1A2E]"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            <Icon size={18} aria-hidden="true" />
            {label}
          </button>
        ))}
      </div>

      <div className="p-5 md:p-8">
        <div className="mb-7 text-center">
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-primary">
            Pagamento seguro
          </p>
          <h2 className="mt-3 font-serif text-3xl text-[#1C1A2E] md:text-4xl">
            {mode === "card"
              ? "Pague com cartão"
              : mode === "pix"
                ? "Gere seu PIX"
                : "Gere seu boleto"}
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            {mode === "card"
              ? "Até 9x sem juros. Os dados são protegidos pelo Mercado Pago."
              : mode === "pix"
                ? "O QR Code fica disponível logo após a confirmação dos dados."
                : "O boleto vence em 3 dias e pode levar até 2 horas úteis para compensar."}
          </p>
        </div>

        {mode === "card" ? (
          <div className="relative">
            {loadingConfig || !brickReady ? (
              <div className="flex min-h-48 items-center justify-center gap-3 text-sm text-muted-foreground">
                <LoaderCircle className="animate-spin" size={20} />
                Preparando formulário seguro...
              </div>
            ) : null}
            <div
              id="cardPaymentBrick_container"
              className={brickReady ? "block" : "absolute inset-0 invisible"}
            />
            {processing ? (
              <div className="absolute inset-0 grid place-items-center bg-[#F7F3EE]/90">
                <span className="flex items-center gap-3 text-sm font-medium">
                  <LoaderCircle className="animate-spin" size={20} />
                  Processando pagamento...
                </span>
              </div>
            ) : null}
          </div>
        ) : result ? (
          <PaymentResult mode={mode} result={result} copied={copied} onCopy={copyPix} />
        ) : (
          <AlternativePaymentForm
            mode={mode}
            processing={processing}
            onSubmit={handleAlternativePayment}
          />
        )}

        {error ? (
          <p className="mt-5 border-l-2 border-[#7A1E1E] pl-4 text-sm text-[#7A1E1E]" role="alert">
            {error}
          </p>
        ) : null}
      </div>
    </section>
  );
}

function AlternativePaymentForm({
  mode,
  processing,
  onSubmit,
}: {
  mode: "pix" | "boleto";
  processing: boolean;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}) {
  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      {mode === "boleto" ? (
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Nome" name="firstName" autoComplete="given-name" />
          <Field label="Sobrenome" name="lastName" autoComplete="family-name" />
        </div>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="E-mail" name="email" type="email" autoComplete="email" />
        {mode === "boleto" ? (
          <Field label="CPF" name="cpf" inputMode="numeric" autoComplete="off" />
        ) : null}
      </div>

      {mode === "boleto" ? (
        <>
          <div className="grid gap-4 sm:grid-cols-[0.8fr_2fr]">
            <Field label="CEP" name="zipCode" inputMode="numeric" autoComplete="postal-code" />
            <Field label="Rua" name="streetName" autoComplete="address-line1" />
          </div>
          <div className="grid gap-4 sm:grid-cols-[0.7fr_1.5fr]">
            <Field label="Número" name="streetNumber" autoComplete="address-line2" />
            <Field label="Bairro" name="neighborhood" />
          </div>
          <div className="grid gap-4 sm:grid-cols-[2fr_0.6fr]">
            <Field label="Cidade" name="city" autoComplete="address-level2" />
            <Field label="UF" name="state" maxLength={2} autoComplete="address-level1" />
          </div>
        </>
      ) : null}

      <button
        type="submit"
        disabled={processing}
        className="mt-3 inline-flex min-h-13 w-full items-center justify-center gap-2 rounded-[4px] bg-[#C9963A] px-6 py-4 font-serif text-lg text-[#F7F3EE] transition-colors hover:bg-[#b58430] disabled:cursor-wait disabled:opacity-65"
      >
        {processing ? <LoaderCircle className="animate-spin" size={19} /> : null}
        {processing ? "Gerando..." : mode === "pix" ? "Gerar QR Code PIX" : "Gerar boleto"}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  ...inputProps
}: {
  label: string;
  name: string;
  type?: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="grid gap-1.5 text-[13px] font-medium text-[#1C1A2E]">
      {label}
      <input
        required
        name={name}
        type={type}
        className="min-h-12 rounded-[4px] border border-[#D9D0C4] bg-white px-3.5 text-base text-[#1C1A2E] outline-none transition-shadow focus:border-[#C9963A] focus:ring-2 focus:ring-[#C9963A]/20"
        {...inputProps}
      />
    </label>
  );
}

function PaymentResult({
  mode,
  result,
  copied,
  onCopy,
}: {
  mode: "pix" | "boleto";
  result: OrderResult;
  copied: boolean;
  onCopy: () => void;
}) {
  if (mode === "pix") {
    return (
      <div className="text-center">
        {result.qr_code_base64 ? (
          <img
            src={`data:image/png;base64,${result.qr_code_base64}`}
            alt="QR Code para pagamento via PIX"
            className="mx-auto size-56 border border-border bg-white p-3"
          />
        ) : null}
        <p className="mt-5 text-sm text-muted-foreground">
          Abra o app do seu banco, escolha PIX e leia o QR Code.
        </p>
        {result.qr_code ? (
          <button
            type="button"
            onClick={onCopy}
            className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-[4px] border border-[#C9963A] px-5 py-3 text-sm font-medium text-[#1C1A2E] hover:bg-[#C9963A]/10"
          >
            {copied ? <Check size={18} /> : <Copy size={18} />}
            {copied ? "Código copiado" : "Copiar código PIX"}
          </button>
        ) : null}
      </div>
    );
  }

  return (
    <div className="text-center">
      <Check className="mx-auto text-[#C9963A]" size={38} />
      <h3 className="mt-4 font-serif text-2xl">Boleto gerado.</h3>
      <p className="mt-3 text-sm text-muted-foreground">
        Abra o boleto em uma nova aba para imprimir ou pagar pelo aplicativo do seu banco.
      </p>
      {result.digitable_line ? (
        <p className="mt-5 break-all border border-border bg-white p-3 text-xs leading-relaxed">
          {result.digitable_line}
        </p>
      ) : null}
      {result.ticket_url ? (
        <a
          href={result.ticket_url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-[4px] bg-[#C9963A] px-6 py-4 font-serif text-lg text-[#F7F3EE]"
        >
          Abrir boleto
          <ExternalLink size={18} />
        </a>
      ) : null}
    </div>
  );
}
