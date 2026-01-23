import "server-only";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { calculateReadingTime, formatReadingTime } from "@/lib/readingTime";

const briefingsDirectory = path.join(process.cwd(), "src/content/briefings");

export interface BriefingMeta {
  title: string;
  summary: string;
  publishedAt: string;
  volume?: number;
  edition?: number;
  briefingId?: string;
  doi?: string;
  readingTime: string;
  readingTimeMinutes?: number;
  tags: string[];
  pdfPath?: string;
  pdfUrl?: string;
  mapEmbedUrl?: string;
  mapDownloadPath?: string;
  mapUrl?: string;
  mapDownloadUrl?: string;
  coverImageUrl?: string;
  coverAlt?: string;
  youtubeUrl?: string;
  relatedMaps?: string[];
  relatedPodcast?: string;
  shareUrl?: string;
}

export interface BriefingData {
  meta: BriefingMeta;
  contentMdx: string;
  slug: string;
}

export function getBriefingBySlug(slug: string): BriefingData | null {
  try {
    const fullPath = path.join(briefingsDirectory, `${slug}.mdx`);
    
    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    return {
      slug,
      meta: {
        title: data.title || "",
        summary: data.summary || "",
        publishedAt: data.publishedAt || new Date().toISOString(),
        volume: data.volume || 1,
        edition: data.edition,
        briefingId: data.briefingId,
        doi: data.doi,
        readingTime: data.readingTime || "5 min",
        tags: Array.isArray(data.tags) ? data.tags : [],
        pdfPath: data.pdfPath || data.pdfUrl || undefined,
        pdfUrl: data.pdfUrl || data.pdfPath || undefined,
        mapEmbedUrl: data.mapEmbedUrl || undefined,
        mapDownloadPath: data.mapDownloadPath || data.mapDownloadUrl || undefined,
        mapUrl: data.mapUrl || undefined,
        mapDownloadUrl: data.mapDownloadUrl || data.mapDownloadPath || undefined,
        coverImageUrl: data.coverImageUrl || undefined,
        coverAlt: data.coverAlt || undefined,
        youtubeUrl: data.youtubeUrl || undefined,
        relatedMaps: Array.isArray(data.relatedMaps) ? data.relatedMaps : undefined,
        relatedPodcast: data.relatedPodcast || undefined,
      },
      contentMdx: content,
    };
  } catch (error) {
    console.error(`Erro ao ler briefing ${slug}:`, error);
    return null;
  }
}

export function getAllBriefings(): BriefingData[] {
  try {
    if (!fs.existsSync(briefingsDirectory)) {
      return [];
    }

    const fileNames = fs.readdirSync(briefingsDirectory);
    const allBriefings = fileNames
      .filter((name) => name.endsWith(".mdx"))
      .map((fileName) => {
        const slug = fileName.replace(/\.mdx$/, "");
        return getBriefingBySlug(slug);
      })
      .filter((briefing): briefing is BriefingData => briefing !== null)
      .sort((a, b) => {
        return new Date(b.meta.publishedAt).getTime() - new Date(a.meta.publishedAt).getTime();
      });

    return allBriefings;
  } catch (error) {
    console.error("Erro ao listar briefings:", error);
    return [];
  }
}
