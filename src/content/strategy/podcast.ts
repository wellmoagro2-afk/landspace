export interface PodcastEpisode {
  slug: string;
  title: string;
  date: string; // ISO format
  summary: string;
  duration: string; // Format: "MM:SS" or "HH:MM:SS"
  tags: string[];
  coverImage?: string;
  audioUrl: string;
  youtubeUrl?: string;
  transcriptUrl?: string;
}

export const PODCAST_EPISODES: PodcastEpisode[] = [
  {
    slug: "petroleo-geopolitica-mapas",
    title: "Petróleo e poder no Oriente Médio: uma análise geoespacial",
    date: "2024-01-14",
    summary: "Análise profunda sobre as rotas críticas de petróleo e como instabilidades regionais impactam o abastecimento global.",
    duration: "18:42",
    tags: ["Energia", "Geopolítica"],
    coverImage: "/images/strategy/podcast-petroleo.jpg",
    audioUrl: "/audio/strategy/petroleo-geopolitica-mapas.mp3",
    youtubeUrl: "https://youtube.com/watch?v=podcast1",
    transcriptUrl: "/transcripts/petroleo-geopolitica-mapas.txt",
  },
  {
    slug: "agua-recurso-estrategico",
    title: "Água como recurso estratégico",
    date: "2024-01-11",
    summary: "Discussão sobre estresse hídrico e suas implicações geopolíticas em diferentes regiões do mundo.",
    duration: "15:30",
    tags: ["Água & Clima"],
    coverImage: "/images/strategy/podcast-agua.jpg",
    audioUrl: "/audio/strategy/agua-recurso-estrategico.mp3",
    youtubeUrl: "https://youtube.com/watch?v=podcast2",
  },
  {
    slug: "ucrania-fluxos-alimentos",
    title: "Ucrânia: impacto nos fluxos globais de alimentos",
    date: "2024-01-09",
    summary: "Como o conflito alterou cadeias de abastecimento e segurança alimentar em múltiplas regiões.",
    duration: "22:15",
    tags: ["Agricultura", "Conflitos"],
    coverImage: "/images/strategy/podcast-ucrania.jpg",
    audioUrl: "/audio/strategy/ucrania-fluxos-alimentos.mp3",
    youtubeUrl: "https://youtube.com/watch?v=podcast3",
  },
  {
    slug: "amazonia-soberania-territorial",
    title: "Amazônia e soberania territorial",
    date: "2024-01-07",
    summary: "Análise das pressões geopolíticas sobre a maior floresta tropical e seus recursos.",
    duration: "12:50",
    tags: ["Geopolítica", "Recursos Naturais"],
    audioUrl: "/audio/strategy/amazonia-soberania-territorial.mp3",
    youtubeUrl: "https://youtube.com/watch?v=podcast4",
  },
  {
    slug: "artico-nova-fronteira",
    title: "Ártico: a nova fronteira",
    date: "2024-01-05",
    summary: "Derretimento do gelo e competição por recursos na região mais ao norte do planeta.",
    duration: "16:20",
    tags: ["Clima", "Energia"],
    audioUrl: "/audio/strategy/artico-nova-fronteira.mp3",
    youtubeUrl: "https://youtube.com/watch?v=podcast5",
  },
  {
    slug: "chipre-gas-mediterraneo",
    title: "Chipre e o gás do Mediterrâneo",
    date: "2024-01-03",
    summary: "Descobertas de gás natural e suas implicações para o conflito histórico na ilha.",
    duration: "14:10",
    tags: ["Energia", "Conflitos"],
    audioUrl: "/audio/strategy/chipre-gas-mediterraneo.mp3",
  },
];

export function getPodcastBySlug(slug: string): PodcastEpisode | undefined {
  return PODCAST_EPISODES.find(p => p.slug === slug);
}

export function getAllPodcasts(): PodcastEpisode[] {
  return PODCAST_EPISODES;
}
