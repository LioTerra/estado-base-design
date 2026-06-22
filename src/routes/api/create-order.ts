import { createFileRoute } from "@tanstack/react-router";
import { createMercadoPagoOrder } from "@/lib/mercadoPagoOrders";

export const Route = createFileRoute("/api/create-order")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const requestOrigin = new URL(request.url).origin;
        const originHeader = request.headers.get("Origin");

        if (originHeader && originHeader !== requestOrigin) {
          return Response.json({ error: "Origem da requisição inválida." }, { status: 403 });
        }

        const publicKey = process.env.VITE_MP_PUBLIC_KEY;
        if (!publicKey) {
          return Response.json(
            { error: "O checkout ainda não está configurado." },
            { status: 503 },
          );
        }

        return Response.json(
          { public_key: publicKey },
          { headers: { "Cache-Control": "no-store" } },
        );
      },
      POST: async ({ request }) => createMercadoPagoOrder(request),
    },
  },
});
