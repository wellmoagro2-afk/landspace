import { draftMode } from "next/headers";
import { prisma } from "@/lib/prisma";
import BriefingsClient from "./BriefingsClient";
import { getAllBriefings as getStaticBriefings } from "@/content/strategy/briefings";
import { getAllBriefings as getMDXBriefings } from "@/lib/briefings";
import { getPublishedKeystaticBriefings } from "@/lib/keystatic/briefings";
import { calculateReadingTime, formatReadingTime } from "@/lib/readingTime";

export default async function BriefingsPage() {
  const { isEnabled: isDraftMode } = await draftMode();

  // Prioridade 1: Buscar briefings do Keystatic
  let keystaticBriefings: Array<{
    slug: string;
    title: string;
    summary: string;
    date: string;
    tags: string[];
    readingTime: string;
    coverImage?: string;
  }> = [];

  try {
    const ksBriefings = await getPublishedKeystaticBriefings(isDraftMode);
    keystaticBriefings = ksBriefings.map((b) => ({
      slug: b.slug,
      title: b.meta.title,
      summary: b.meta.summary,
      date: b.meta.publishedAt,
      tags: b.meta.tags || [],
      readingTime: b.content ? formatReadingTime(calculateReadingTime(b.content)) : '5 min',
      coverImage: b.meta.coverImage,
    }));
  } catch (error) {
    console.error("Erro ao buscar briefings do Keystatic:", error);
  }

  // Buscar briefings do Prisma (apenas publicados, se não estiver em draft mode)
  let dbBriefings: Array<{
    slug: string;
    title: string;
    summary: string;
    date: string;
    tags: string[];
    readingTime: string;
    coverImage?: string;
  }> = [];

  if (!isDraftMode) {
    try {
      const prismaBriefings = await prisma.briefing.findMany({
        where: { status: "published" },
        orderBy: { publishedAt: "desc" },
        take: 50,
      });

      dbBriefings = prismaBriefings.map((b) => ({
        slug: b.slug,
        title: b.title,
        summary: b.summary,
        date: b.publishedAt?.toISOString() || b.createdAt.toISOString(),
        tags: JSON.parse(b.tags || "[]"),
        readingTime: b.readingTime,
        coverImage: b.coverImageUrl || undefined,
      }));
    } catch (error) {
      console.error("Erro ao buscar briefings do Prisma:", error);
    }
  }

  // Buscar briefings MDX (conteúdo real)
  const mdxBriefings = getMDXBriefings().map((b) => ({
    slug: b.slug,
    title: b.meta.title,
    summary: b.meta.summary,
    date: b.meta.publishedAt,
    tags: b.meta.tags,
    readingTime: b.meta.readingTime,
    coverImage: b.meta.coverImageUrl,
  }));

  // Buscar briefings estáticos como fallback
  const staticBriefings = getStaticBriefings().map((b) => ({
    slug: b.slug,
    title: b.title,
    summary: b.summary,
    date: b.date,
    tags: b.tags,
    readingTime: b.readingTime,
    coverImage: b.coverImage,
  }));

  // Combinar e normalizar (prioridade: Keystatic > Prisma > MDX > Estáticos)
  const allBriefings = [
    ...keystaticBriefings,
    ...dbBriefings,
    ...mdxBriefings,
    ...staticBriefings,
  ];

  // Remover duplicatas (manter primeiro encontrado - Keystatic tem prioridade)
  const uniqueBriefings = Array.from(
    new Map(allBriefings.map((b) => [b.slug, b])).values()
  );

  return <BriefingsClient initialBriefings={uniqueBriefings} />;
}
