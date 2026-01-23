/**
 * Wrapper seguro para buscar briefing data
 * Prioriza fontes estáticas (MDX/JSON) e usa Prisma apenas como fallback
 * Trata erros graciosamente para evitar quebrar o build/dev
 */
import "server-only";
import { prisma } from "@/lib/prisma";
import { getBriefingBySlug as getMDXBriefing } from "@/lib/briefings";
import { getBriefingBySlug as getStaticBriefing } from "@/content/strategy/briefings";
import { getKeystaticBriefing } from "@/lib/keystatic/briefings";
import { generateBriefingId } from "@/lib/strategy/briefingId";

export interface BriefingData {
  id: string;
  slug: string;
  title: string;
  subtitle: string | null;
  summary: string;
  abstract?: string;
  keywords?: string[];
  volume?: number;
  edition?: number;
  briefingId?: string;
  doi?: string;
  tags: string;
  coverImageUrl: string | null;
  readingTime: string;
  readingTimeMinutes?: number;
  contentMdx?: string; // Legado
  // Nova estrutura Big Tech
  introducao?: string;
  area_estudo?: string;
  bases_dados?: string;
  procedimentos?: string[] | string; // Pode ser array ou string JSON
  resultados_discussao?: string;
  limitacoes_incertezas?: string;
  conclusao?: string | string[]; // Pode ser string (legado) ou array (nova estrutura)
  referencias?: string;
  // Campos legados
  desenvolvimento?: string;
  status: "draft" | "published" | "archived";
  publishedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  seoTitle: string | null;
  seoDescription: string | null;
  pdfUrl: string | null;
  youtubeUrl: string | null;
  relatedMaps: string | null;
  relatedPodcast: string | null;
}

export interface BriefingWithExtras extends Omit<BriefingData, 'relatedPodcast'> {
  mapEmbedUrl?: string;
  mapDownloadPath?: string;
  mapUrl?: string;
  mapDownloadUrl?: string;
  relatedPodcast?: string | null;
}

/**
 * Busca briefing por slug com fallback gracioso
 * Prioridade: Keystatic > MDX > Static > Prisma
 */
export async function getBriefingData(
  slug: string,
  isDraftMode: boolean = false
): Promise<BriefingWithExtras | null> {
  // Prioridade 1: Keystatic
  try {
    const keystaticBriefing = await getKeystaticBriefing(slug);
    if (keystaticBriefing) {
      // Verificar se está publicado (a menos que esteja em draft mode)
      if (!isDraftMode) {
        const publishedAt = new Date(keystaticBriefing.meta.publishedAt);
        const now = new Date();
        if (publishedAt > now) {
          // Ainda não publicado, continuar para próxima fonte
        } else {
          const publishedDate = new Date(keystaticBriefing.meta.publishedAt);
          // Usar 2026 como ano padrão se a data for anterior
          const year = publishedDate.getFullYear() < 2026 ? 2026 : publishedDate.getFullYear();
          const briefingId = keystaticBriefing.meta.briefingId || generateBriefingId(keystaticBriefing.slug, year);
          
          return {
            id: "",
            slug: keystaticBriefing.slug,
            title: keystaticBriefing.meta.title,
            subtitle: keystaticBriefing.meta.subtitle || null,
            summary: keystaticBriefing.meta.summary,
            abstract: keystaticBriefing.meta.abstract,
            keywords: keystaticBriefing.meta.keywords,
            volume: keystaticBriefing.meta.volume || 1,
            edition: keystaticBriefing.meta.edition,
            briefingId,
            doi: keystaticBriefing.meta.doi,
            tags: JSON.stringify(keystaticBriefing.meta.tags || []),
            coverImageUrl: keystaticBriefing.meta.coverImage || null,
            readingTime: "5 min",
            contentMdx: keystaticBriefing.content,
            // Nova estrutura Big Tech
            introducao: keystaticBriefing.introducao,
            area_estudo: keystaticBriefing.area_estudo,
            bases_dados: keystaticBriefing.bases_dados,
            procedimentos: Array.isArray(keystaticBriefing.procedimentos) 
              ? keystaticBriefing.procedimentos 
              : keystaticBriefing.procedimentos 
                ? JSON.stringify(keystaticBriefing.procedimentos)
                : undefined,
            resultados_discussao: keystaticBriefing.resultados_discussao,
            limitacoes_incertezas: keystaticBriefing.limitacoes_incertezas,
            conclusao: Array.isArray(keystaticBriefing.conclusao) 
              ? JSON.stringify(keystaticBriefing.conclusao)
              : keystaticBriefing.conclusao,
            referencias: keystaticBriefing.referencias,
            // Campos legados
            desenvolvimento: keystaticBriefing.desenvolvimento,
            status: "published" as const,
            publishedAt: publishedDate,
            createdAt: publishedDate,
            updatedAt: publishedDate,
            seoTitle: null,
            seoDescription: null,
            pdfUrl: null,
            youtubeUrl: keystaticBriefing.meta.youtubeUrl || null,
            relatedMaps: keystaticBriefing.meta.relatedMaps
              ? JSON.stringify(keystaticBriefing.meta.relatedMaps)
              : null,
            relatedPodcast: keystaticBriefing.meta.relatedPodcast || null,
            mapEmbedUrl: keystaticBriefing.meta.mapEmbedUrl,
            mapDownloadPath: keystaticBriefing.meta.mapDownloadFile,
            mapUrl: keystaticBriefing.meta.mapUrl,
            mapDownloadUrl: keystaticBriefing.meta.mapDownloadFile,
          };
        }
      } else {
        // Draft mode: retornar mesmo se não publicado
        const publishedDate = new Date(keystaticBriefing.meta.publishedAt);
        // Usar 2026 como ano padrão se a data for anterior
        const year = publishedDate.getFullYear() < 2026 ? 2026 : publishedDate.getFullYear();
        const briefingId = keystaticBriefing.meta.briefingId || generateBriefingId(keystaticBriefing.slug, year);
        
        return {
          id: "",
          slug: keystaticBriefing.slug,
          title: keystaticBriefing.meta.title,
          subtitle: keystaticBriefing.meta.subtitle || null,
          summary: keystaticBriefing.meta.summary,
          volume: keystaticBriefing.meta.volume || 1,
          edition: keystaticBriefing.meta.edition,
          briefingId,
          doi: keystaticBriefing.meta.doi,
          tags: JSON.stringify(keystaticBriefing.meta.tags || []),
          coverImageUrl: keystaticBriefing.meta.coverImage || null,
          readingTime: "5 min",
          contentMdx: keystaticBriefing.content,
          status: "published" as const,
          publishedAt: publishedDate,
          createdAt: publishedDate,
          updatedAt: publishedDate,
          seoTitle: null,
          seoDescription: null,
          pdfUrl: null,
          youtubeUrl: keystaticBriefing.meta.youtubeUrl || null,
          relatedMaps: keystaticBriefing.meta.relatedMaps
            ? JSON.stringify(keystaticBriefing.meta.relatedMaps)
            : null,
          relatedPodcast: keystaticBriefing.meta.relatedPodcast || null,
          mapEmbedUrl: keystaticBriefing.meta.mapEmbedUrl,
          mapDownloadPath: keystaticBriefing.meta.mapDownloadFile,
          mapUrl: keystaticBriefing.meta.mapUrl,
          mapDownloadUrl: keystaticBriefing.meta.mapDownloadFile,
        };
      }
    }
  } catch (error) {
    console.error(`[BriefingData] Erro ao buscar do Keystatic (${slug}):`, error);
    // Continuar para próxima fonte
  }

  // Prioridade 2: MDX (filesystem)
  try {
    const mdxBriefing = getMDXBriefing(slug);
    if (mdxBriefing) {
      const publishedDate = new Date(mdxBriefing.meta.publishedAt);
      // Usar 2026 como ano padrão se a data for anterior
      const year = publishedDate.getFullYear() < 2026 ? 2026 : publishedDate.getFullYear();
      const briefingId = (mdxBriefing.meta as any).briefingId || generateBriefingId(mdxBriefing.slug, year);
      
      return {
        id: "",
        slug: mdxBriefing.slug,
        title: mdxBriefing.meta.title,
        subtitle: null,
        summary: mdxBriefing.meta.summary,
        volume: mdxBriefing.meta.volume || 1,
        edition: mdxBriefing.meta.edition,
        briefingId,
        doi: mdxBriefing.meta.doi,
        tags: JSON.stringify(mdxBriefing.meta.tags),
        coverImageUrl: mdxBriefing.meta.coverImageUrl || null,
        readingTime: mdxBriefing.meta.readingTime,
        readingTimeMinutes: mdxBriefing.meta.readingTimeMinutes,
        contentMdx: mdxBriefing.contentMdx,
        status: "published" as const,
        publishedAt: publishedDate,
        createdAt: publishedDate,
        updatedAt: publishedDate,
        seoTitle: null,
        seoDescription: null,
        pdfUrl: null,
        youtubeUrl: mdxBriefing.meta.youtubeUrl || null,
        relatedMaps: mdxBriefing.meta.relatedMaps
          ? JSON.stringify(mdxBriefing.meta.relatedMaps)
          : null,
        relatedPodcast: mdxBriefing.meta.relatedPodcast || null,
        mapEmbedUrl: mdxBriefing.meta.mapEmbedUrl,
        mapDownloadPath: mdxBriefing.meta.mapDownloadPath || mdxBriefing.meta.mapDownloadUrl,
        mapUrl: mdxBriefing.meta.mapUrl,
        mapDownloadUrl: mdxBriefing.meta.mapDownloadUrl || mdxBriefing.meta.mapDownloadPath,
      };
    }
  } catch (error) {
    console.error(`[BriefingData] Erro ao buscar MDX (${slug}):`, error);
    // Continuar para próxima fonte
  }

  // Prioridade 3: Static (JSON/TS)
  try {
    const staticBriefing = getStaticBriefing(slug);
    if (staticBriefing) {
      const publishedDate = new Date(staticBriefing.date);
      // Usar 2026 como ano padrão se a data for anterior
      const year = publishedDate.getFullYear() < 2026 ? 2026 : publishedDate.getFullYear();
      const briefingId = (staticBriefing as any).briefingId || generateBriefingId(staticBriefing.slug, year);
      
      return {
        id: "",
        slug: staticBriefing.slug,
        title: staticBriefing.title,
        subtitle: null,
        summary: staticBriefing.summary,
        volume: (staticBriefing as any).volume || 1,
        edition: (staticBriefing as any).edition,
        briefingId,
        doi: (staticBriefing as any).doi,
        tags: JSON.stringify(staticBriefing.tags),
        coverImageUrl: staticBriefing.coverImage || null,
        readingTime: staticBriefing.readingTime,
        contentMdx: staticBriefing.content || "",
        status: "published" as const,
        publishedAt: publishedDate,
        createdAt: publishedDate,
        updatedAt: publishedDate,
        seoTitle: null,
        seoDescription: null,
        pdfUrl: null,
        youtubeUrl: staticBriefing.youtubeUrl || null,
        relatedMaps: staticBriefing.relatedMaps
          ? JSON.stringify(staticBriefing.relatedMaps)
          : null,
        relatedPodcast: (staticBriefing as any).relatedPodcast || null,
      };
    }
  } catch (error) {
    console.error(`[BriefingData] Erro ao buscar Static (${slug}):`, error);
    // Continuar para Prisma
  }

  // Prioridade 4: Prisma (apenas se não estiver em draft mode e outras fontes falharam)
  if (!isDraftMode) {
    try {
      const briefing = await prisma.briefing.findUnique({
        where: { slug },
      });
      
      if (briefing && briefing.status === "published") {
        return {
          ...briefing,
          mapEmbedUrl: undefined,
          mapDownloadPath: undefined,
          mapUrl: undefined,
          mapDownloadUrl: undefined,
        };
      }
    } catch (error) {
      // Prisma pode falhar (ex: SQLite não configurado, adapter errado)
      // Não quebrar o build, apenas logar
      console.error(`[BriefingData] Erro ao buscar do Prisma (${slug}):`, error);
      console.warn(`[BriefingData] Prisma falhou, usando apenas fontes estáticas`);
    }
  }

  return null;
}
