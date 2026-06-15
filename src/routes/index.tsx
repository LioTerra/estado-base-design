import { createFileRoute } from "@tanstack/react-router";

import LandingPage from "@/LandingPage_com_prints_depoimentos";

export const Route = createFileRoute("/")({
  head: () => {
    const title =
      "Personalidade e Neurociência — com Vicente Cotanda";
    const description =
      "Curso intensivo online ao vivo. Traços, temperamento, genética, ambiente e " +
      "neurodesenvolvimento na formação da personalidade — sem reducionismos. " +
      "Aulas ao vivo, gravações, material escrito e certificado.";
    const url = "https://estado-base-design.leonardoterradarosa.workers.dev/";
    const ogImage = url + "og-curso-personalidade.png";
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
