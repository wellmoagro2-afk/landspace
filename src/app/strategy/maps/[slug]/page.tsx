import { notFound } from "next/navigation";
import { getMapBySlug } from "@/content/strategy/maps";
import MapDetailClient from "./MapDetailClient";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function MapDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const map = getMapBySlug(slug);

  if (!map) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-950 relative">
      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-0 grid-pattern-emerald-lg"></div>

      <main className="relative z-10 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <MapDetailClient map={map} />
        </div>
      </main>
    </div>
  );
}
