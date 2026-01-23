export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  readTime: string;
  publishedAt: string;
  author: string;
  thumbnail?: string;
  hasDownload?: boolean; // Indica se o post tem ferramenta grátis para download
  isShowcase?: boolean; // Indica se é um estudo de caso/showcase (demonstração de ferramenta paga)
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "automatizando-analises-r",
    title: "Análise Temporal de Mudança de Uso da Terra",
    excerpt: "Monitoramento da dinâmica da paisagem por meio de métricas espaciais e automação analítica.",
    hasDownload: true,
    content: `
# Automatizando Análises de Mudança de Uso da Terra com R

A análise de mudança de uso e cobertura da terra é fundamental para entender a dinâmica territorial e os impactos ambientais. Neste tutorial, você aprenderá a automatizar esse processo usando R.

## Por que automatizar?

A automação permite:
- Processar grandes volumes de dados rapidamente
- Reduzir erros manuais
- Gerar resultados reproduzíveis
- Economizar tempo em análises repetitivas

## Scripts Prontos

Todos os scripts estão disponíveis no curso completo, incluindo:
- Processamento de mapas de uso da terra
- Geração de matrizes de transição
- Criação de gráficos profissionais
- Exportação de resultados em alta qualidade

## Conclusão

Com os scripts prontos e a metodologia apresentada, você pode realizar análises complexas de mudança de uso da terra de forma eficiente e profissional.
    `,
    category: "R",
    readTime: "8 min de leitura",
    publishedAt: "2024-12-15",
    author: "Wellmo Alves, PhD",
  },
  {
    slug: "scripts-rusle-qgis",
    title: "Modelagem RUSLE Automatizada no QGIS",
    excerpt: "Geração de mapas de erosão com fluxos automatizados e metodologia consolidada.",
    hasDownload: true,
    content: `
# Scripts Prontos para Modelagem RUSLE em QGIS

A equação RUSLE (Revised Universal Soil Loss Equation) é uma das ferramentas mais utilizadas para modelagem de perda de solos. Neste artigo, apresentamos scripts prontos para implementação em QGIS.

## O que é a RUSLE?

A RUSLE calcula a perda anual de solo através de cinco fatores:
- Fator de erosividade da chuva (R)
- Fator de erodibilidade do solo (K)
- Fator topográfico (LS)
- Fator de cobertura e manejo (C)
- Fator de práticas conservacionistas (P)

## Scripts Disponíveis

No curso completo, você terá acesso a:
- Scripts Python para QGIS
- Processamento automatizado de dados
- Geração de mapas temáticos
- Análise de áreas críticas de erosão

## Aplicações Práticas

Esses scripts são ideais para:
- Projetos de conservação do solo
- Licenciamento ambiental
- Planejamento agrícola
- Estudos de impacto ambiental
    `,
    category: "QGIS",
    readTime: "6 min de leitura",
    publishedAt: "2024-12-10",
    author: "Wellmo Alves, PhD",
  },
  {
    slug: "gee-processamento-nuvem",
    title: "Processamento em Nuvem para Grandes Volumes",
    excerpt: "Escalonamento de análises geoespaciais utilizando infraestrutura em nuvem e scripts automatizados.",
    hasDownload: true,
    content: `
# Google Earth Engine: Processamento em Nuvem para Grandes Volumes

O Google Earth Engine revoluciona o processamento de dados geoespaciais, permitindo análises de grandes volumes de dados diretamente na nuvem.

## Vantagens do GEE

- Processamento na nuvem (sem download)
- Catálogo massivo de imagens de satélite
- APIs poderosas em JavaScript e Python
- Processamento paralelo e escalável

## Casos de Uso

- Análise temporal de mudanças de cobertura
- Monitoramento de desmatamento
- Análise de secas e inundações
- Classificação de uso da terra em larga escala

## Scripts Prontos

No curso, você terá acesso a scripts para:
- Processamento de coleções de imagens
- Análises temporais automatizadas
- Exportação de resultados
- Integração com outras ferramentas

## Conclusão

O Google Earth Engine é uma ferramenta essencial para quem trabalha com grandes volumes de dados geoespaciais. Com os scripts prontos, você pode começar a usar imediatamente.
    `,
    category: "GEE",
    readTime: "10 min de leitura",
    publishedAt: "2024-12-05",
    author: "Wellmo Alves, PhD",
  },
];

export function getBlogPostBySlug(slug: string) {
  return BLOG_POSTS.find((post) => post.slug === slug);
}

export function getAllBlogPosts() {
  return BLOG_POSTS;
}

