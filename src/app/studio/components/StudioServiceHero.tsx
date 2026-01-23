"use client";

import { Badge } from "@/components/ui/Badge";

interface StudioServiceHeroProps {
  headline: string;
  subheadline: string;
  badges: string[];
}

export default function StudioServiceHero({ headline, subheadline, badges }: StudioServiceHeroProps) {
  return (
    <div className="text-center mb-16">
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
        {headline}
      </h1>
      <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-6">
        {subheadline}
      </p>
      {badges && badges.length > 0 && (
        <div className="flex flex-wrap justify-center gap-3">
          {badges.map((badge, idx) => (
            <Badge key={idx} variant="outline" className="border-indigo-500/30 text-indigo-300 bg-indigo-500/10">
              {badge}
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}
