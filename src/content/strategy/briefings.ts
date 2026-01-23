export interface Briefing {
  slug: string;
  title: string;
  date: string; // ISO format
  summary: string;
  tags: string[];
  readingTime: string;
  coverImage?: string;
  pdfUrl: string;
  youtubeUrl?: string;
  relatedMaps?: string[];
  relatedPodcast?: string;
  content?: string; // Conteúdo HTML/Markdown completo do briefing (opcional)
}

export const BRIEFINGS: Briefing[] = [
  {
    slug: "petroleo-poder-oriente-medio",
    title: "Petróleo e poder no Oriente Médio: uma análise geoespacial",
    date: "2024-01-15",
    summary: "Mapeamento das rotas de exportação e dependências energéticas globais através de visualizações interativas.",
    tags: ["Energia", "Geopolítica", "Oriente Médio"],
    readingTime: "6 min",
    coverImage: "/images/strategy/briefing-petroleo.jpg",
    pdfUrl: "/pdfs/strategy/petroleo-poder-oriente-medio.pdf",
    youtubeUrl: "https://youtube.com/watch?v=example1",
    relatedMaps: ["fluxos-petroleo-global"],
    relatedPodcast: "petroleo-geopolitica-mapas",
  },
  {
    slug: "agua-arma-conflitos-africa",
    title: "Água como arma: conflitos hídricos na África Subsaariana",
    date: "2024-01-12",
    summary: "Análise dos principais pontos de tensão relacionados a recursos hídricos e suas implicações geopolíticas.",
    tags: ["Água & Clima", "Conflitos", "África"],
    readingTime: "8 min",
    coverImage: "/images/strategy/briefing-agua.jpg",
    pdfUrl: "/pdfs/strategy/agua-arma-conflitos-africa.pdf",
    relatedMaps: ["conflitos-hidricos-transfronteiricos"],
  },
  {
    slug: "ucrania-corredores-graos",
    title: "Guerra na Ucrânia: impacto nos corredores de grãos globais",
    date: "2024-01-10",
    summary: "Como o conflito alterou fluxos comerciais e segurança alimentar em múltiplas regiões do mundo.",
    tags: ["Agricultura", "Conflitos", "Ucrânia"],
    readingTime: "5 min",
    coverImage: "/images/strategy/briefing-ucrania.jpg",
    pdfUrl: "/pdfs/strategy/ucrania-corredores-graos.pdf",
    youtubeUrl: "https://youtube.com/watch?v=example2",
    relatedMaps: ["riscos-climaticos-seguranca-alimentar"],
  },
  {
    slug: "amazonia-fronteiras-recursos",
    title: "Amazônia: fronteiras, recursos e soberania",
    date: "2024-01-08",
    summary: "Mapeamento das pressões geopolíticas sobre a maior floresta tropical do planeta.",
    tags: ["Geopolítica", "Recursos Naturais", "Amazônia"],
    readingTime: "7 min",
    coverImage: "/images/strategy/briefing-amazonia.jpg",
    pdfUrl: "/pdfs/strategy/amazonia-fronteiras-recursos.pdf",
    relatedMaps: ["recursos-minerais-estrategicos"],
  },
  {
    slug: "artico-fronteira-energetica",
    title: "Ártico: a nova fronteira energética",
    date: "2024-01-05",
    summary: "Derretimento do gelo e competição por recursos naturais na região mais ao norte do planeta.",
    tags: ["Energia", "Clima", "Ártico"],
    readingTime: "4 min",
    pdfUrl: "/pdfs/strategy/artico-fronteira-energetica.pdf",
  },
  {
    slug: "chipre-divisao-recursos-offshore",
    title: "Chipre: divisão territorial e recursos offshore",
    date: "2024-01-03",
    summary: "Análise do conflito histórico e das descobertas de gás natural no Mediterrâneo Oriental.",
    tags: ["Conflitos", "Energia", "Mediterrâneo"],
    readingTime: "6 min",
    pdfUrl: "/pdfs/strategy/chipre-divisao-recursos-offshore.pdf",
    relatedMaps: ["rotas-comerciais-choke-points"],
  },
];

export function getBriefingBySlug(slug: string): Briefing | undefined {
  return BRIEFINGS.find(b => b.slug === slug);
}

export function getAllBriefings(): Briefing[] {
  return BRIEFINGS;
}
