import { notFound } from "next/navigation";
import { getPodcastBySlug } from "@/content/strategy/podcast";
import PodcastDetailClient from "./PodcastDetailClient";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function PodcastDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const podcast = getPodcastBySlug(slug);

  if (!podcast) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-950 relative">
      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-0 grid-pattern-emerald-lg"></div>

      <main className="relative z-10 py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <PodcastDetailClient podcast={podcast} />
        </div>
      </main>
    </div>
  );
}
