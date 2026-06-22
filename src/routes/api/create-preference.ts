import { createFileRoute } from "@tanstack/react-router";

const MERCADO_PAGO_PREFERENCES_URL =
  "https://api.mercadopago.com/checkout/preferences";

export const Route = createFileRoute("/api/create-preference")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const requestOrigin = new URL(request.url).origin;
        const originHeader = request.headers.get("Origin");

        if (originHeader && originHeader !== requestOrigin) {
          return Response.json({ error: "Invalid request origin." }, { status: 403 });
        }

        const accessToken = process.env.MP_ACCESS_TOKEN;
        const publicKey = process.env.VITE_MP_PUBLIC_KEY;

        if (!accessToken || !publicKey) {
          return Response.json(
            { error: "Mercado Pago credentials are not configured." },
            { status: 503 },
          );
        }

        const response = await fetch(MERCADO_PAGO_PREFERENCES_URL, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            items: [
              {
                title: "Personalidade e Neurociência — Curso Online",
                quantity: 1,
                unit_price: 979,
                currency_id: "BRL",
              },
            ],
            payment_methods: {
              installments: 9,
            },
            back_urls: {
              success:
                "https://estado-base-design.leonardoterradarosa.workers.dev/obrigado",
              failure:
                "https://estado-base-design.leonardoterradarosa.workers.dev/pagamento",
              pending:
                "https://estado-base-design.leonardoterradarosa.workers.dev/pagamento",
            },
            auto_return: "approved",
          }),
        });

        const preference = (await response.json()) as {
          id?: string;
          init_point?: string;
          message?: string;
        };

        if (!response.ok || !preference.id) {
          console.error("Mercado Pago preference creation failed", {
            status: response.status,
            message: preference.message,
          });

          return Response.json(
            { error: "Unable to create payment preference." },
            { status: 502 },
          );
        }

        return Response.json(
          {
            preference_id: preference.id,
            public_key: publicKey,
            init_point: preference.init_point,
          },
          {
            headers: {
              "Cache-Control": "no-store",
            },
          },
        );
      },
    },
  },
});
