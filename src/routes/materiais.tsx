import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/page-shell";

export const Route = createFileRoute("/materiais")({
  head: () => ({
    meta: [
      { title: "Materiais — Estado Base" },
      {
        name: "description",
        content:
          "E-books, guias e protocolos de neuropsicologia aplicada para a prática cotidiana e clínica.",
      },
      { property: "og:title", content: "Materiais — Estado Base" },
      {
        property: "og:description",
        content: "E-books, guias e protocolos para a prática cotidiana e clínica.",
      },
    ],
  }),
  component: () => (
    <PageShell
      eyebrow="III. Materiais"
      title="E-books, guias e protocolos."
      lede="Placeholder. Materiais escritos para acompanhar o estudo e a prática — pensados como objetos de leitura, não como arquivos descartáveis."
      breadcrumbs={[
        { label: "Estado Base", to: "/" },
        { label: "Materiais" },
      ]}
    />
  ),
});