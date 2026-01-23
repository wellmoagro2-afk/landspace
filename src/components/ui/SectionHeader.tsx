"use client";

import { HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface SectionHeaderProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}

export const SectionHeader = forwardRef<HTMLDivElement, SectionHeaderProps>(
  ({ className, title, subtitle, align = "center", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "space-y-4 mb-16",
          align === "center" && "text-center",
          align === "left" && "text-left",
          className
        )}
        {...props}
      >
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight">
          {title}
        </h2>
        {subtitle && (
          <p className="text-lg text-slate-400 max-w-2xl leading-relaxed mx-auto">
            {subtitle}
          </p>
        )}
      </div>
    );
  }
);

SectionHeader.displayName = "SectionHeader";
