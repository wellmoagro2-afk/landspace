import { config, fields, collection } from "@keystatic/core";

export default config({
  storage: {
    kind: "local",
  },
  collections: {
    briefings: collection({
      label: "Briefings",
      slugField: "slug",
      path: "src/content/keystatic/briefings/*",
      format: { contentField: "content" },
      schema: {
        slug: fields.slug({
          name: {
            label: "Slug",
            validation: { isRequired: true },
          },
        }),
        title: fields.text({
          label: "Título",
          validation: { isRequired: true },
        }),
        subtitle: fields.text({
          label: "Subtítulo",
        }),
        summary: fields.text({
          label: "Resumo",
          multiline: true,
          validation: { isRequired: true },
        }),
        abstract: fields.text({
          label: "Abstract",
          description: "Resumo executivo de até 200 palavras",
          multiline: true,
          validation: { 
            isRequired: true,
            length: { max: 200 }
          },
        }),
        keywords: fields.array(
          fields.text({ label: "Palavra-chave" }),
          {
            label: "Palavras-chave",
            description: "3 palavras-chave principais",
            itemLabel: (props) => props.value,
            validation: { length: { min: 3, max: 3 } },
          }
        ),
        publishedAt: fields.date({
          label: "Data de Publicação",
          validation: { isRequired: true },
        }),
        volume: fields.integer({
          label: "Volume",
          description: "Volume da publicação (ex: 1 para 2026)",
          defaultValue: 1,
        }),
        edition: fields.integer({
          label: "Edição",
          description: "Número sequencial da edição (ex: 1, 2, 3...)",
        }),
        briefingId: fields.text({
          label: "ID do Briefing",
          description: "Identificador único (ex: LS-STR-2026-001). Se vazio, será gerado automaticamente.",
        }),
        doi: fields.text({
          label: "DOI",
          description: "Digital Object Identifier (ex: 10.xxxx/xxxx). Se preenchido, será exibido abaixo do ID técnico.",
        }),
        tags: fields.array(
          fields.text({ label: "Tag" }),
          {
            label: "Tags",
            itemLabel: (props) => props.value,
          }
        ),
        coverImage: fields.image({
          label: "Imagem de Capa",
          directory: "public/strategy/briefings/covers",
          publicPath: "/strategy/briefings/covers",
        }),
        pdfFile: fields.file({
          label: "Arquivo PDF",
          directory: "public/strategy/briefings/pdfs",
          publicPath: "/strategy/briefings/pdfs",
        }),
        mapEmbedUrl: fields.text({
          label: "URL do Mapa (Embed)",
        }),
        mapUrl: fields.text({
          label: "URL do Mapa",
        }),
        mapDownloadFile: fields.file({
          label: "Arquivo do Mapa para Download",
          directory: "public/strategy/briefings/maps",
          publicPath: "/strategy/briefings/maps",
        }),
        youtubeUrl: fields.text({
          label: "URL do YouTube",
        }),
        relatedMaps: fields.array(
          fields.text({ label: "Slug do Mapa Relacionado" }),
          {
            label: "Mapas Relacionados",
            itemLabel: (props) => props.value,
          }
        ),
        relatedPodcast: fields.text({
          label: "Slug do Podcast Relacionado",
        }),
        // ============================================
        // NOVA ESTRUTURA BIG TECH - NÚCLEO ESTRATÉGICO
        // ============================================
        introducao: fields.document({
          label: "Introdução",
          description: "Núcleo estratégico - Contexto e objetivos",
          formatting: true,
          dividers: true,
          links: true,
          images: {
            directory: "public/strategy/briefings/images",
            publicPath: "/strategy/briefings/images",
          },
          layouts: [[1], [1, 1], [1, 1, 1]],
        }),
        
        // ============================================
        // MATERIAL E MÉTODO (COMPARTIMENTADO)
        // ============================================
        area_estudo: fields.document({
          label: "Área de Estudo",
          description: "Recorte espacial - Foco geográfico da análise",
          formatting: true,
          dividers: true,
          links: true,
          images: {
            directory: "public/strategy/briefings/images",
            publicPath: "/strategy/briefings/images",
          },
        }),
        bases_dados: fields.document({
          label: "Bases de Dados",
          description: "Fontes e resoluções utilizadas",
          formatting: true,
          dividers: true,
          links: true,
        }),
        procedimentos: fields.array(
          fields.text({ label: "Etapa do Procedimento" }),
          {
            label: "Procedimentos",
            description: "Pipeline metodológico - Lista de etapas do processo (será renderizado como fluxograma)",
            itemLabel: (props) => props.value || "Etapa sem descrição",
          }
        ),
        
        // ============================================
        // ANÁLISE TÉCNICA
        // ============================================
        resultados_discussao: fields.document({
          label: "Resultados e Discussão",
          description: "Análise técnica com destaque máximo para o Mapa",
          formatting: true,
          dividers: true,
          links: true,
          images: {
            directory: "public/strategy/briefings/images",
            publicPath: "/strategy/briefings/images",
          },
          layouts: [[1], [1, 1], [1, 1, 1]],
        }),
        limitacoes_incertezas: fields.text({
          label: "Limitações e Incertezas",
          description: "Texto curto - 1 parágrafo sobre limitações metodológicas",
          multiline: true,
        }),
        
        // ============================================
        // FECHAMENTO
        // ============================================
        conclusao: fields.array(
          fields.text({ label: "Achado ou Próximo Passo" }),
          {
            label: "Conclusão",
            description: "Lista de bullets para achados e próximos passos",
            itemLabel: (props) => props.value || "Item sem descrição",
          }
        ),
        referencias: fields.document({
          label: "Referências",
          description: "Fontes consultadas no padrão ABNT",
          formatting: true,
          dividers: true,
          links: true,
        }),
        
        // ============================================
        // CAMPOS LEGADOS (Compatibilidade)
        // ============================================
        desenvolvimento: fields.document({
          label: "Desenvolvimento (Legado)",
          description: "Campo legado - Use 'Introdução' e 'Resultados e Discussão' na nova estrutura",
          formatting: true,
          dividers: true,
          links: true,
          images: {
            directory: "public/strategy/briefings/images",
            publicPath: "/strategy/briefings/images",
          },
          layouts: [[1], [1, 1], [1, 1, 1]],
        }),
        // Manter content para compatibilidade com briefings antigos
        content: fields.document({
          label: "Conteúdo (Legado)",
          description: "Use apenas se o briefing não tiver a nova estrutura",
          formatting: true,
          dividers: true,
          links: true,
          images: {
            directory: "public/strategy/briefings/images",
            publicPath: "/strategy/briefings/images",
          },
          layouts: [[1], [1, 1], [1, 1, 1]],
        }),
      },
    }),
    maps: collection({
      label: "Mapas",
      slugField: "slug",
      path: "src/content/keystatic/maps/*",
      schema: {
        slug: fields.slug({
          name: {
            label: "Slug",
            validation: { isRequired: true },
          },
        }),
        title: fields.text({
          label: "Título",
          validation: { isRequired: true },
        }),
        description: fields.text({
          label: "Descrição",
          multiline: true,
          validation: { isRequired: true },
        }),
        embedUrl: fields.text({
          label: "URL do Embed",
        }),
        downloadFile: fields.file({
          label: "Arquivo para Download",
          directory: "public/strategy/maps",
          publicPath: "/strategy/maps",
        }),
        tags: fields.array(
          fields.text({ label: "Tag" }),
          {
            label: "Tags",
            itemLabel: (props) => props.value,
          }
        ),
        publishedAt: fields.date({
          label: "Data de Publicação",
        }),
      },
    }),
    podcasts: collection({
      label: "Podcasts",
      slugField: "slug",
      path: "src/content/keystatic/podcasts/*",
      schema: {
        slug: fields.slug({
          name: {
            label: "Slug",
            validation: { isRequired: true },
          },
        }),
        title: fields.text({
          label: "Título",
          validation: { isRequired: true },
        }),
        description: fields.text({
          label: "Descrição",
          multiline: true,
          validation: { isRequired: true },
        }),
        audioUrl: fields.text({
          label: "URL do Áudio",
        }),
        coverImage: fields.image({
          label: "Imagem de Capa",
          directory: "public/strategy/podcasts/covers",
          publicPath: "/strategy/podcasts/covers",
        }),
        publishedAt: fields.date({
          label: "Data de Publicação",
          validation: { isRequired: true },
        }),
      },
    }),
  },
});
