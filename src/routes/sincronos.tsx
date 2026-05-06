import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/page-shell";

export const Route = createFileRoute("/sincronos")({
  head: () => ({
    meta: [
      { title: "Cursos Síncronos — Estado Base" },
      {
        name: "description",
        content:
          "Encontros ao vivo de neuropsicologia aplicada, em turmas pequenas, conduzidos por Vicente.",
      },
      { property: "og:title", content: "Cursos Síncronos — Estado Base" },
      {
        property: "og:description",
        content: "Encontros ao vivo, em turmas pequenas, com acompanhamento direto.",
      },
    ],
  }),
  component: () => (
    <PageShell
      eyebrow="I. Cursos Síncronos"
      title="Encontros ao vivo, em turmas pequenas."
      lede="Placeholder. Aqui descreveremos o formato dos encontros síncronos, a duração, o método e o que se espera de quem participa."
      breadcrumbs={[
        { label: "Estado Base", to: "/" },
        { label: "Cursos Síncronos" },
      ]}
    />
  ),
});