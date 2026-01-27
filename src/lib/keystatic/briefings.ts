import "server-only";
import { createReader } from "@keystatic/core/reader";
import config from "../../../keystatic.config";
import path from "path";

const reader = createReader(process.cwd(), config);

// Tipos para documentos do Keystatic (DocumentElement[])
interface KeystaticDocumentElement {
  children?: KeystaticDocumentChild[];
  [key: string]: unknown;
}

interface KeystaticDocumentChild {
  text?: string;
  [key: string]: unknown;
}

// Type guard para validar estrutura do documento
function isKeystaticDocumentElement(value: unknown): value is KeystaticDocumentElement {
  return typeof value === 'object' && value !== null;
}

function isKeystaticDocumentArray(value: unknown): value is KeystaticDocumentElement[] {
  return Array.isArray(value) && value.every(isKeystaticDocumentElement);
}

// Helper para converter documento Keystatic para string
async function keystaticDocToString(doc: unknown): Promise<string> {
  if (!isKeystaticDocumentArray(doc)) {
    return '';
  }
  
  return doc
    .map((e) => {
      if (Array.isArray(e.children)) {
        return e.children
          .map((c) => (isKeystaticDocumentChild(c) && typeof c.text === 'string' ? c.text : ''))
          .join('');
      }
      return '';
    })
    .join('\n');
}

function isKeystaticDocumentChild(value: unknown): value is KeystaticDocumentChild {
  return typeof value === 'object' && value !== null;
}

export interface KeystaticBriefingMeta {
  title: string;
  subtitle?: string;
  summary: string;
  abstract?: string;
  keywords?: string[];
  publishedAt: string;
  volume?: number;
  edition?: number;
  briefingId?: string;
  doi?: string;
  tags: string[];
  coverImage?: string;
  pdfFile?: string;
  mapEmbedUrl?: string;
  mapUrl?: string;
  mapDownloadFile?: string;
  youtubeUrl?: string;
  relatedMaps?: string[];
  relatedPodcast?: string;
}

export interface KeystaticBriefing {
  slug: string;
  meta: KeystaticBriefingMeta;
  // Nova estrutura Big Tech
  introducao?: string; // Núcleo estratégico
  area_estudo?: string; // Material e Método - Recorte espacial
  bases_dados?: string; // Material e Método - Fontes e resoluções
  procedimentos?: string[]; // Material e Método - Pipeline metodológico
  resultados_discussao?: string; // Análise técnica com destaque para mapa
  limitacoes_incertezas?: string; // Limitações metodológicas
  conclusao?: string[]; // Lista de bullets (achados e próximos passos)
  referencias?: string; // Referências MDX (padrão ABNT)
  // Campos legados (compatibilidade)
  content?: string; // Conteúdo MDX renderizado (legado)
  desenvolvimento?: string; // Desenvolvimento MDX (legado)
}

/**
 * Obtém um briefing pelo slug
 */
export async function getKeystaticBriefing(slug: string): Promise<KeystaticBriefing | null> {
  try {
    const entry = await reader.collections.briefings.read(slug);
    if (!entry) {
      return null;
    }

    return {
      slug,
      meta: {
        title: entry.title,
        subtitle: entry.subtitle,
        summary: entry.summary,
        abstract: entry.abstract,
        keywords: [...(entry.keywords || [])],
        publishedAt: entry.publishedAt,
        volume: entry.volume || 1,
        edition: entry.edition ?? undefined,
        briefingId: entry.briefingId,
        doi: entry.doi,
        tags: [...(entry.tags || [])],
        coverImage: entry.coverImage ?? undefined,
        pdfFile: entry.pdfFile ?? undefined,
        mapEmbedUrl: entry.mapEmbedUrl ?? undefined,
        mapUrl: entry.mapUrl ?? undefined,
        mapDownloadFile: entry.mapDownloadFile ?? undefined,
        youtubeUrl: entry.youtubeUrl ?? undefined,
        relatedMaps: [...(entry.relatedMaps || [])],
        relatedPodcast: entry.relatedPodcast ?? undefined,
      },
      // Nova estrutura Big Tech
      // Resolver campos que podem ser funções (DocumentElement[]) ou strings
      introducao: entry.introducao && typeof entry.introducao === 'function' 
        ? await entry.introducao().then(keystaticDocToString)
        : (entry.introducao as string | undefined),
      area_estudo: entry.area_estudo && typeof entry.area_estudo === 'function'
        ? await entry.area_estudo().then(keystaticDocToString)
        : (entry.area_estudo as string | undefined),
      bases_dados: entry.bases_dados && typeof entry.bases_dados === 'function'
        ? await entry.bases_dados().then(keystaticDocToString)
        : (entry.bases_dados as string | undefined),
      procedimentos: Array.isArray(entry.procedimentos) 
        ? [...entry.procedimentos] 
        : [],
      resultados_discussao: entry.resultados_discussao && typeof entry.resultados_discussao === 'function'
        ? await entry.resultados_discussao().then(keystaticDocToString)
        : (entry.resultados_discussao as string | undefined),
      limitacoes_incertezas: entry.limitacoes_incertezas as string | undefined,
      conclusao: Array.isArray(entry.conclusao) 
        ? [...entry.conclusao] 
        : [],
      referencias: entry.referencias && typeof entry.referencias === 'function'
        ? await entry.referencias().then(keystaticDocToString)
        : (entry.referencias as string | undefined),
      // Campos legados (compatibilidade)
      content: entry.content && typeof entry.content === 'function'
        ? await entry.content().then(keystaticDocToString)
        : (entry.content as string | undefined),
      desenvolvimento: entry.desenvolvimento && typeof entry.desenvolvimento === 'function'
        ? await entry.desenvolvimento().then(keystaticDocToString)
        : (entry.desenvolvimento as string | undefined),
    };
  } catch (error) {
    console.error(`Erro ao ler briefing ${slug} do Keystatic:`, error);
    return null;
  }
}

/**
 * Obtém todos os briefings
 */
export async function getAllKeystaticBriefings(): Promise<KeystaticBriefing[]> {
  try {
    const slugs = await reader.collections.briefings.list();
    const briefings = await Promise.all(
      slugs.map(async (slug) => {
        const briefing = await getKeystaticBriefing(slug);
        return briefing;
      })
    );

    return briefings
      .filter((b): b is KeystaticBriefing => b !== null)
      .sort((a, b) => {
        return new Date(b.meta.publishedAt).getTime() - new Date(a.meta.publishedAt).getTime();
      });
  } catch (error) {
    console.error("Erro ao listar briefings do Keystatic:", error);
    return [];
  }
}

/**
 * Obtém briefings publicados (ou todos se Draft Mode estiver ativo)
 */
export async function getPublishedKeystaticBriefings(
  includeDrafts: boolean = false
): Promise<KeystaticBriefing[]> {
  const allBriefings = await getAllKeystaticBriefings();
  
  if (includeDrafts) {
    return allBriefings;
  }

  // Filtrar apenas os publicados (com data de publicação no passado ou hoje)
  const now = new Date();
  return allBriefings.filter((briefing) => {
    const publishedAt = new Date(briefing.meta.publishedAt);
    return publishedAt <= now;
  });
}
