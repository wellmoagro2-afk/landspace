"use client";

import { HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

type BadgeVariant = "neutral" | "accent" | "outline";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

const badgeVariants = {
  neutral: "bg-slate-900/90 text-white border-slate-700",
  accent: "bg-[var(--ls-accent-soft-bg)] text-white border-[var(--ls-accent-border)]",
  outline: "bg-transparent text-slate-300 border-slate-700",
};

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = "neutral", ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-semibold border backdrop-blur-sm shadow-sm",
          badgeVariants[variant],
          className
        )}
        {...props}
      />
    );
  }
);

Badge.displayName = "Badge";
