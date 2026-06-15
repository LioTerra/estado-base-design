import { createFileRoute } from "@tanstack/react-router";

import LandingPage from "@/LandingPage_com_prints_depoimentos";

export const Route = createFileRoute("/sincronos")({
  head: () => {
    const title = "Personalidade e Neurociência - Estado Base";
    const description =
      "Curso online ao vivo com Vicente Cotanda sobre personalidade, traços, temperamento, genética, ambiente e neurodesenvolvimento.";
    const url = "https://estado-base-design.leonardoterradarosa.workers.dev/sincronos";
    const ogImage =
      "https://estado-base-design.leonardoterradarosa.workers.dev/og-curso-personalidade.png";

    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:url", content: url },
        { property: "og:image", content: ogImage },
        { property: "og:image:width", content: "1200" },
        { property: "og:image:height", content: "630" },
        { property: "og:locale", content: "pt_BR" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:image", content: ogImage },
      ],
    };
  },
  component: LandingPage,
});
