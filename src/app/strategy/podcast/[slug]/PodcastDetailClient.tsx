"use client";

import Link from "next/link";
import { getAllPodcasts } from "@/content/strategy/podcast";
import AudioPlayer from "@/components/strategy/AudioPlayer";
import ContentCard from "@/components/strategy/ContentCard";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import type { PodcastEpisode } from "@/content/strategy/podcast";

interface PodcastDetailClientProps {
  podcast: PodcastEpisode;
}

export default function PodcastDetailClient({ podcast }: PodcastDetailClientProps) {
  const allPodcasts = getAllPodcasts();
  const otherPodcasts = allPodcasts
    .filter((p) => p.slug !== podcast.slug)
    .slice(0, 3);

  return (
    <>
      {/* Back Button */}
      <Link
        href="/strategy/podcast"
        className="inline-flex items-center gap-2 text-slate-400 hover:text-emerald-400 transition-colors mb-8"
      >
        <ArrowLeft className="w-4 h-4" />
        Voltar para Podcast
      </Link>

      {/* Cover Image */}
      {podcast.coverImage && (
        <div className="relative w-full h-64 md:h-80 rounded-2xl overflow-hidden mb-8">
          <img
            src={podcast.coverImage}
            alt={podcast.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Header */}
      <div className="mb-8 space-y-4">
        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {podcast.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-sm font-medium text-emerald-400"
            >
              {tag}
            </span>
          ))}
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
          {podcast.title}
        </h1>

        {/* Meta Info */}
        <div className="flex items-center gap-6 text-sm text-slate-400">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>{new Date(podcast.date).toLocaleDateString("pt-BR", { day: "numeric", month: "long", year: "numeric" })}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>{podcast.duration}</span>
          </div>
        </div>

        {/* Summary */}
        <p className="text-lg text-slate-300 leading-relaxed">
          {podcast.summary}
        </p>
      </div>

      {/* Audio Player */}
      <div className="mb-12">
        <AudioPlayer
          audioUrl={podcast.audioUrl}
          title={podcast.title}
          youtubeUrl={podcast.youtubeUrl}
          transcriptUrl={podcast.transcriptUrl}
        />
      </div>

      {/* Other Episodes */}
      {otherPodcasts.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-white mb-6">Episódios Recentes</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {otherPodcasts.map((p) => (
              <ContentCard
                key={p.slug}
                variant="podcast"
                title={p.title}
                summary={p.summary}
                date={p.date}
                tags={p.tags}
                href={`/strategy/podcast/${p.slug}`}
                coverImage={p.coverImage}
                duration={p.duration}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
