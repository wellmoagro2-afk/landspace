import { FileText, Map, Headphones } from "lucide-react";

export interface Briefing {
  id: string;
  title: string;
  summary: string;
  category: "Energia" | "Água & Clima" | "Conflitos" | "Agricultura" | "Geopolítica";
  date: string;
  readTime: string;
  slug: string;
}

export interface StrategyMap {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  isFeatured?: boolean;
  slug: string;
}

export interface PodcastEpisode {
  id: string;
  title: string;
  duration: string;
  date: string;
  slug: string;
}

export const BRIEFINGS: Briefing[] = [
  {
    id: "1",
    title: "Petróleo e poder no Oriente Médio: uma análise geoespacial",
    summary: "Mapeamento das rotas de exportação e dependências energéticas globais através de visualizações interativas.",
    category: "Energia",
    date: "15 Jan 2024",
    readTime: "6 min",
    slug: "petroleo-poder-oriente-medio",
  },
  {
    id: "2",
    title: "Água como arma: conflitos hídricos na África Subsaariana",
    summary: "Análise dos principais pontos de tensão relacionados a recursos hídricos e suas implicações geopolíticas.",
    category: "Água & Clima",
    date: "12 Jan 2024",
    readTime: "8 min",
    slug: "agua-arma-conflitos-africa",
  },
  {
    id: "3",
    title: "Guerra na Ucrânia: impacto nos corredores de grãos globais",
    summary: "Como o conflito alterou fluxos comerciais e segurança alimentar em múltiplas regiões do mundo.",
    category: "Agricultura",
    date: "10 Jan 2024",
    readTime: "5 min",
    slug: "ucrania-corredores-graos",
  },
  {
    id: "4",
    title: "Amazônia: fronteiras, recursos e soberania",
    summary: "Mapeamento das pressões geopolíticas sobre a maior floresta tropical do planeta.",
    category: "Geopolítica",
    date: "8 Jan 2024",
    readTime: "7 min",
    slug: "amazonia-fronteiras-recursos",
  },
  {
    id: "5",
    title: "Ártico: a nova fronteira energética",
    summary: "Derretimento do gelo e competição por recursos naturais na região mais ao norte do planeta.",
    category: "Energia",
    date: "5 Jan 2024",
    readTime: "4 min",
    slug: "artico-fronteira-energetica",
  },
  {
    id: "6",
    title: "Chipre: divisão territorial e recursos offshore",
    summary: "Análise do conflito histórico e das descobertas de gás natural no Mediterrâneo Oriental.",
    category: "Conflitos",
    date: "3 Jan 2024",
    readTime: "6 min",
    slug: "chipre-divisao-recursos-offshore",
  },
];

export const STRATEGY_MAPS: StrategyMap[] = [
  {
    id: "1",
    title: "Mapa da Semana: Fluxos de Petróleo Global",
    description: "Visualização interativa dos principais corredores de exportação e dependências energéticas entre países.",
    thumbnail: "/map-placeholder.jpg",
    isFeatured: true,
    slug: "fluxos-petroleo-global",
  },
  {
    id: "2",
    title: "Conflitos Hídricos Transfronteiriços",
    description: "Mapeamento dos principais pontos de tensão relacionados a recursos hídricos compartilhados.",
    thumbnail: "/map-placeholder.jpg",
    slug: "conflitos-hidricos-transfronteiricos",
  },
  {
    id: "3",
    title: "Riscos Climáticos e Segurança Alimentar",
    description: "Análise geoespacial dos impactos climáticos sobre produção agrícola e segurança alimentar global.",
    thumbnail: "/map-placeholder.jpg",
    slug: "riscos-climaticos-seguranca-alimentar",
  },
  {
    id: "4",
    title: "Rotas Comerciais e Choke Points",
    description: "Visualização dos principais pontos de estrangulamento no comércio marítimo global.",
    thumbnail: "/map-placeholder.jpg",
    slug: "rotas-comerciais-choke-points",
  },
  {
    id: "5",
    title: "Recursos Minerais Estratégicos",
    description: "Mapeamento da distribuição global de minerais críticos para tecnologias modernas.",
    thumbnail: "/map-placeholder.jpg",
    slug: "recursos-minerais-estrategicos",
  },
];

export const PODCAST_EPISODES: PodcastEpisode[] = [
  {
    id: "1",
    title: "Petróleo e Geopolítica: o que os mapas revelam",
    duration: "18 min",
    date: "14 Jan 2024",
    slug: "petroleo-geopolitica-mapas",
  },
  {
    id: "2",
    title: "Água como recurso estratégico",
    duration: "15 min",
    date: "11 Jan 2024",
    slug: "agua-recurso-estrategico",
  },
  {
    id: "3",
    title: "Ucrânia: impacto nos fluxos globais de alimentos",
    duration: "22 min",
    date: "9 Jan 2024",
    slug: "ucrania-fluxos-alimentos",
  },
  {
    id: "4",
    title: "Amazônia e soberania territorial",
    duration: "12 min",
    date: "7 Jan 2024",
    slug: "amazonia-soberania-territorial",
  },
];
