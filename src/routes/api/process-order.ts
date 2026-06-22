import { createFileRoute } from "@tanstack/react-router";
import { createMercadoPagoOrder } from "@/lib/mercadoPagoOrders";

export const Route = createFileRoute("/api/process-order")({
  server: {
    handlers: {
      POST: async ({ request }) => createMercadoPagoOrder(request),
    },
  },
});
