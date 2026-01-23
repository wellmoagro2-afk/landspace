"use client";

import Link from "next/link";
import { ButtonHTMLAttributes, AnchorHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost" | "link" | "outline";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  asChild?: boolean;
}

interface ButtonLinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href: string;
  accentColor?: "amber" | "cyan" | "purple" | "emerald" | "indigo";
}

const buttonVariants = {
  primary: "text-white border-transparent shadow-lg focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-950",
  secondary: "bg-slate-900/30 text-slate-400 border border-slate-800 hover:bg-slate-900/60 hover:text-white hover:border-slate-700 hover:shadow-lg hover:shadow-slate-900/20 focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-950",
  ghost: "bg-transparent text-slate-300 border-transparent hover:bg-slate-800/30 hover:text-white focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-950",
  link: "bg-transparent text-slate-400 border-transparent underline-offset-4 hover:underline focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-950",
  outline: "bg-transparent text-slate-300 border border-slate-700 hover:bg-slate-800/30 hover:text-white hover:border-slate-600 focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-950",
};

const buttonSizes = {
  sm: "px-3 py-1.5 text-xs rounded-lg",
  md: "px-4 py-2.5 text-sm rounded-xl",
  lg: "px-6 py-3.5 text-base rounded-xl",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 font-semibold transition-all duration-200 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed",
          buttonVariants[variant],
          buttonSizes[size],
          variant === "primary" && "button-primary-gradient hover:button-primary-gradient-hover hover:shadow-xl button-focus-ring",
          variant === "secondary" && "hover:border-[var(--ls-accent-border)]",
          variant === "link" && "hover:text-[rgb(var(--ls-accent-light))]",
          className
        )}
        disabled={disabled}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export const ButtonLink = forwardRef<HTMLAnchorElement, ButtonLinkProps>(
  ({ className, variant = "primary", size = "md", href, accentColor, ...props }, ref) => {
    return (
      <Link
        ref={ref}
        href={href}
        className={cn(
          "inline-flex items-center justify-center gap-2 font-semibold transition-all duration-200 focus:outline-none",
          buttonVariants[variant],
          buttonSizes[size],
          variant === "primary" && "button-primary-gradient hover:button-primary-gradient-hover hover:shadow-xl button-focus-ring",
          variant === "secondary" && accentColor ? "hover:border-[var(--ls-accent-border)] hover:text-[rgb(var(--ls-accent-light))] hover:button-secondary-hover-shadow" : "hover:border-[var(--ls-accent-border)]",
          variant === "link" && "hover:text-[rgb(var(--ls-accent-light))]",
          accentColor && `[--ls-accent:var(--ls-${accentColor}-accent)] [--ls-accent-light:var(--ls-${accentColor}-accent-light)] [--ls-accent-dark:var(--ls-${accentColor}-accent-dark)] [--ls-accent-border:var(--ls-${accentColor}-accent-border)] [--ls-accent-ring:var(--ls-${accentColor}-accent-ring)] [--ls-glow:var(--ls-${accentColor}-glow)]`,
          className
        )}
        {...props}
      />
    );
  }
);

ButtonLink.displayName = "ButtonLink";
