import AdminBriefingEditorClient from "./AdminBriefingEditorClient";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function AdminBriefingEditorPage({ params }: PageProps) {
  await requireAdmin();
  const { id } = await params;

  let briefing = null;
  if (id !== "new") {
    const dbBriefing = await prisma.briefing.findUnique({
      where: { id },
    });
    if (!dbBriefing) {
      notFound();
    }
    // Converter tags de string para string[] e normalizar null para undefined
    briefing = {
      ...dbBriefing,
      tags: JSON.parse(dbBriefing.tags || "[]"),
      coverImageUrl: dbBriefing.coverImageUrl ?? undefined,
      subtitle: dbBriefing.subtitle ?? undefined,
      publishedAt: dbBriefing.publishedAt?.toISOString(),
      seoTitle: dbBriefing.seoTitle ?? undefined,
      seoDescription: dbBriefing.seoDescription ?? undefined,
      pdfUrl: dbBriefing.pdfUrl ?? undefined,
      youtubeUrl: dbBriefing.youtubeUrl ?? undefined,
      relatedMaps: dbBriefing.relatedMaps ? JSON.parse(dbBriefing.relatedMaps) : undefined,
    };
  }

  return <AdminBriefingEditorClient briefing={briefing} />;
}
