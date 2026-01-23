"use client";

import Link from "next/link";
import { HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

export interface SegmentedControlItem {
  label: string;
  href: string;
  color?: "amber" | "cyan" | "purple" | "emerald" | "indigo";
}

interface SegmentedControlProps extends HTMLAttributes<HTMLDivElement> {
  items: SegmentedControlItem[];
  activeHref?: string;
}

const colorClasses = {
  amber: {
    hover: "hover:border-amber-400/30",
    active: "bg-gradient-to-r from-amber-400 to-amber-600 text-white border-amber-400/50 shadow-lg shadow-amber-400/30",
  },
  cyan: {
    hover: "hover:border-cyan-400/30",
    active: "bg-gradient-to-r from-cyan-400 to-cyan-600 text-white border-cyan-400/50 shadow-lg shadow-cyan-400/30",
  },
  purple: {
    hover: "hover:border-purple-400/30",
    active: "bg-gradient-to-r from-purple-400 to-purple-600 text-white border-purple-400/50 shadow-lg shadow-purple-400/30",
  },
  emerald: {
    hover: "hover:border-[#00B86B]/30",
    active: "bg-gradient-to-r from-[#00B86B] to-[#00A85F] text-white border-[#00B86B]/50 shadow-lg shadow-[#00B86B]/30",
  },
  indigo: {
    hover: "hover:border-indigo-400/30",
    active: "bg-gradient-to-r from-indigo-400 to-indigo-600 text-white border-indigo-400/50 shadow-lg shadow-indigo-400/30",
  },
};

export const SegmentedControl = forwardRef<HTMLDivElement, SegmentedControlProps>(
  ({ className, items, activeHref, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex flex-col sm:flex-row gap-1 bg-slate-900/60 backdrop-blur-md border border-slate-700/40 rounded-2xl p-1.5 shadow-xl",
          className
        )}
        role="group"
        aria-label="Selecionar segmento"
        {...props}
      >
        {items.map((item) => {
          const isActive = activeHref === item.href;
          const color = item.color || "cyan";
          const colors = colorClasses[color];
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group relative inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-950 focus:ring-[var(--ls-accent-ring)]",
                isActive
                  ? colors.active
                  : "bg-slate-800/40 text-slate-300 border-slate-700/30 hover:bg-slate-800/60 hover:text-white " + colors.hover
              )}
              aria-label={item.label}
            >
              <span>{item.label}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" />
            </Link>
          );
        })}
      </div>
    );
  }
);

SegmentedControl.displayName = "SegmentedControl";
