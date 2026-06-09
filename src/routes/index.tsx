import { createFileRoute } from "@tanstack/react-router";

import LandingPage from "@/LandingPage_com_prints_depoimentos";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Estado Base - Neuropsicologia Aplicada" },
      {
        name: "description",
        content:
          "Landing page do Estado Base com cursos, materiais e depoimentos de neuropsicologia aplicada.",
      },
      { property: "og:title", content: "Estado Base - Neuropsicologia Aplicada" },
      {
        property: "og:description",
        content:
          "Cursos, materiais e depoimentos do Estado Base em neuropsicologia aplicada.",
      },
    ],
  }),
  component: LandingPage,
});
