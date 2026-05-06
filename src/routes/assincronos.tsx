import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/page-shell";

export const Route = createFileRoute("/assincronos")({
  head: () => ({
    meta: [
      { title: "Cursos Assíncronos — Estado Base" },
      {
        name: "description",
        content:
          "Estudos em profundidade de neuropsicologia aplicada, no seu próprio ritmo.",
      },
      { property: "og:title", content: "Cursos Assíncronos — Estado Base" },
      {
        property: "og:description",
        content: "Estudos em profundidade, no seu próprio ritmo, sem perder o rigor.",
      },
    ],
  }),
  component: () => (
    <PageShell
      eyebrow="II. Cursos Assíncronos"
      title="Estudos em profundidade, no seu próprio ritmo."
      lede="Placeholder. Cursos gravados, organizados como um livro em capítulos, para serem percorridos com calma e retomados sempre que necessário."
      breadcrumbs={[
        { label: "Estado Base", to: "/" },
        { label: "Cursos Assíncronos" },
      ]}
    />
  ),
});