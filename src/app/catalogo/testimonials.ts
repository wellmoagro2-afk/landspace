export type Testimonial = {
  name: string;
  role: string;
  image: string;
  text: string;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Carlos Mendes",
    role: "Engenheiro Agrônomo",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?fit=facearea&facepad=2&w=256&h=256&q=80",
    text: "Eu levava dias para fazer essas análises na mão. Com a ferramenta de automação geotecnológica e o treinamento de aplicação, faço o mesmo trabalho em 15 minutos."
  },
  {
    name: "Ana Paula Ramos",
    role: "Geógrafa e Consultora",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?fit=facearea&facepad=2&w=256&h=256&q=80",
    text: "As ferramentas geotecnológicas são muito bem explicadas e práticas. Consegui aplicar diretamente no meu trabalho de planejamento territorial com o treinamento de implementação."
  },
  {
    name: "João Carvalho",
    role: "Analista Ambiental",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?fit=facearea&facepad=2&w=256&h=256&q=80",
    text: "As ferramentas exclusivas da LandSpace mudaram meu fluxo de trabalho. O suporte técnico da LandSpace é ágil e vai direto ao ponto."
  },
  {
    name: "Mariana Souza",
    role: "Mestranda em Geografia",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?fit=facearea&facepad=2&w=256&h=256&q=80",
    text: "Mesmo sem conhecimento técnico prévio, consegui executar todas as rotinas na primeira tentativa. Os gráficos gerados são de altíssimo nível acadêmico."
  },
  {
    name: "Ricardo Gomes",
    role: "Engenheiro Florestal",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fit=facearea&facepad=2&w=256&h=256&q=80",
    text: "A precisão das ferramentas para inventário florestal é incrível. O que eu fazia em semanas, a automação resolve em horas."
  },
  {
    name: "Fernanda Lima",
    role: "Engenheira Civil",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?fit=facearea&facepad=2&w=256&h=256&q=80",
    text: "Rigor científico impecável. Uso as ferramentas geotecnológicas e metodologias do treinamento para validar meus laudos hidrológicos e de drenagem."
  },
  {
    name: "Pedro Henrique",
    role: "Especialista em GIS",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?fit=facearea&facepad=2&w=256&h=256&q=80",
    text: "Não é só um treinamento, é um arsenal completo de ferramentas geotecnológicas. O acesso às metodologias validadas e ao suporte técnico faz toda a diferença."
  },
  {
    name: "Camila Duarte",
    role: "Pesquisadora",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?fit=facearea&facepad=2&w=256&h=256&q=80",
    text: "Consegui publicar meu artigo em revista A1 graças às ferramentas de análise estatística e ao treinamento de aplicação. As rotinas automatizadas geram resultados de altíssima qualidade."
  },
  {
    name: "Lucas Ferreira",
    role: "Biólogo",
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?fit=facearea&facepad=2&w=256&h=256&q=80",
    text: "Trabalho com licenciamento e a ferramenta de fragilidade automatizou toda a parte braçal dos relatórios."
  },
  {
    name: "Roberto Silva",
    role: "Topógrafo",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?fit=facearea&facepad=2&w=256&h=256&q=80",
    text: "A automação no processamento de imagens de Drone me surpreendeu. Entrego ortomosaicos muito mais rápido agora."
  },
  {
    name: "Juliana Martins",
    role: "Gestora de Projetos",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    text: "Implementei as rotinas da LandSpace na minha equipe. A produtividade do setor de geoprocessamento triplicou."
  },
  {
    name: "Gabriel Costa",
    role: "Cientista de Dados",
    image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?fit=facearea&facepad=2&w=256&h=256&q=80",
    text: "Já programava em Python, mas a lógica de automação da LandSpace é de outro nível. Estrutura limpa e eficiente."
  }
];

/**
 * Retorna 2 depoimentos únicos baseados no slug do curso
 * Usa o índice do curso no array COURSES para garantir distribuição rotativa
 */
export function getTestimonialsBySlug(slug: string, courses: Array<{ slug: string }>): Testimonial[] {
  // Encontra o índice do curso no array
  const courseIndex = courses.findIndex(course => course.slug === slug);
  
  // Se não encontrar, usa índice 0 como fallback
  const index = courseIndex >= 0 ? courseIndex : 0;
  
  // Seleciona 2 depoimentos únicos baseados no índice
  // Usa módulo para garantir que sempre teremos 2 depoimentos válidos
  const firstIndex = index % TESTIMONIALS.length;
  const secondIndex = (index + 1) % TESTIMONIALS.length;
  
  // Garante que os dois depoimentos sejam diferentes
  const second = secondIndex === firstIndex 
    ? (secondIndex + 1) % TESTIMONIALS.length 
    : secondIndex;
  
  return [
    TESTIMONIALS[firstIndex],
    TESTIMONIALS[second]
  ];
}

