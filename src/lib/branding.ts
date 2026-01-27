/**
 * Guia de Nomenclatura LandSpace
 * Padrão Big Tech: nomes curtos na UI, completos em SEO/metadados
 */

export const branding = {
  brandName: "LandSpace",
  
  pillars: {
    tech: {
      uiName: "Tech", // Nome curto para UI (navbar, cards, etc.)
      seoName: "LandSpace Tech", // Nome completo para SEO/metadados
      tagline: "Automação geoespacial por LandSpace.",
      microtag: "Automação",
      cta: "Explorar Tech",
      href: "/tech",
    },
    studio: {
      uiName: "Studio",
      seoName: "LandSpace Studio",
      tagline: "Geointeligência e soluções geoespaciais para decisão pública, ambiental e agro.",
      microtag: "Serviços",
      cta: "Explorar Studio",
      href: "/studio",
    },
    strategy: {
      uiName: "Strategy",
      seoName: "LandSpace Strategy",
      tagline: "Insights geopolíticos orientados por mapas, por LandSpace.",
      microtag: "Editorial",
      cta: "Explorar Strategy",
      href: "/strategy",
    },
    academy: {
      uiName: "Academy",
      seoName: "LandSpace Academy",
      tagline: "Formação em geotecnologias por LandSpace.",
      microtag: "Formação",
      cta: "Explorar Academy",
      href: "/academy",
    },
    labs: {
      uiName: "Labs",
      seoName: "LandSpace Labs",
      tagline: "Engenharia de Produto Geoespacial & Validação.",
      microtag: "Validação",
      cta: "Explorar Labs",
      href: "/labs",
    },
  },
  
  // Metadados SEO por página
  seo: {
    home: {
      title: "LandSpace | Tecnologia, Educação e Inteligência Geoespacial",
      description: "Tecnologia, educação e inteligência geoespacial para entender sistemas complexos — do território ao cenário global.",
    },
    tech: {
      title: "LandSpace Tech | Automação Geoespacial",
      description: "Ferramentas, pipelines e soluções geoespaciais validadas para automação e escala operacional.",
    },
    studio: {
      title: "LandSpace Studio | Cartografia Técnica e Serviços Geoespaciais",
      description: "Mapas, modelos e relatórios prontos para planejamento territorial, gestão ambiental, bacias hidrográficas e agricultura de precisão — com base geoespacial organizada e padrão de qualidade auditável.",
    },
    strategy: {
      title: "LandSpace Strategy | Geopolítica, Clima e Recursos Naturais",
      description: "Mapas e análises geopolíticas sobre recursos naturais, clima, conflitos e poder. Artigos sintéticos, vídeos, podcast e briefings visuais orientados por dados.",
    },
    academy: {
      title: "LandSpace Academy | Cursos e Trilhas",
      description: "Formação aplicada em SIG, sensoriamento remoto e GeoAI. Capacitação técnica avançada em automação e inteligência geoespacial.",
    },
    labs: {
      title: "LandSpace Labs | Engenharia de Produto Geoespacial & Validação",
      description: "Engenharia de Produto Geoespacial & Validação. Transformação de métodos e modelos em produtos geotecnológicos robustos, auditáveis e escaláveis, com validação contínua e padrões de qualidade.",
    },
  },
} as const;

// Helpers para acesso rápido
export const getPillar = (key: "tech" | "studio" | "strategy" | "academy" | "labs") => branding.pillars[key];
export const getSEO = (key: "home" | "tech" | "studio" | "strategy" | "academy" | "labs") => branding.seo[key];
