import type React from "react";
import Callout from "@/components/strategy/editorial/Callout";
import Figure from "@/components/strategy/editorial/Figure";
import Quote from "@/components/strategy/editorial/Quote";
import MetricCard from "@/components/strategy/editorial/MetricCard";
import Divider from "@/components/strategy/editorial/Divider";
import Image from "next/image";
import Link from "next/link";

export const mdxComponents = {
  // Headings com IDs (IDs serão gerados pelo ReaderTOC se não existirem)
  h2: ({ children, id, ...props }: React.ComponentPropsWithoutRef<"h2">) => {
    const headingId = id || (typeof children === "string"
      ? children.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-")
      : "");
    return (
      <h2 id={headingId} {...props}>
        {children}
      </h2>
    );
  },
  h3: ({ children, id, ...props }: React.ComponentPropsWithoutRef<"h3">) => {
    const headingId = id || (typeof children === "string"
      ? children.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-")
      : "");
    return (
      <h3 id={headingId} {...props}>
        {children}
      </h3>
    );
  },
  p: ({ children, ...props }: React.ComponentPropsWithoutRef<"p">) => (
    <p className="text-slate-300 leading-relaxed mb-6" {...props}>
      {children}
    </p>
  ),
  a: ({ href, children, ...props }: React.ComponentPropsWithoutRef<"a">) => {
    // Validar href
    if (!href || typeof href !== 'string') {
      // Sem href válido, renderizar como span
      return <span className="text-[#00B86B]">{children}</span>;
    }

    const hrefLower = href.trim().toLowerCase();

    // Bloquear esquemas perigosos
    if (
      hrefLower.startsWith('javascript:') ||
      hrefLower.startsWith('vbscript:') ||
      hrefLower.startsWith('data:text/html') ||
      hrefLower.startsWith('data:image/svg+xml')
    ) {
      // Renderizar como span (link removido)
      return <span className="text-[#00B86B]">{children}</span>;
    }

    // Links externos (http/https)
    if (hrefLower.startsWith('http://') || hrefLower.startsWith('https://')) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#00B86B] hover:text-[#00A85F] underline underline-offset-2"
          {...props}
        >
          {children}
        </a>
      );
    }

    // Links internos (usar Next.js Link)
    return (
      <Link
        href={href}
        className="text-[#00B86B] hover:text-[#00A85F] underline underline-offset-2"
        {...props}
      >
        {children}
      </Link>
    );
  },
  ul: ({ children, ...props }: React.ComponentPropsWithoutRef<"ul">) => (
    <ul className="list-disc list-inside space-y-2 mb-6 text-slate-300" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }: React.ComponentPropsWithoutRef<"ol">) => (
    <ol className="list-decimal list-inside space-y-2 mb-6 text-slate-300" {...props}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }: React.ComponentPropsWithoutRef<"li">) => (
    <li className="ml-4" {...props}>
      {children}
    </li>
  ),
  strong: ({ children, ...props }: React.ComponentPropsWithoutRef<"strong">) => (
    <strong className="font-semibold text-white" {...props}>
      {children}
    </strong>
  ),
  em: ({ children, ...props }: React.ComponentPropsWithoutRef<"em">) => (
    <em className="italic text-slate-200" {...props}>
      {children}
    </em>
  ),
  blockquote: ({ children, ...props }: React.ComponentPropsWithoutRef<"blockquote">) => (
    <blockquote
      className="border-l-4 border-[#00B86B]/30 pl-6 py-4 my-6 italic text-slate-300"
      {...props}
    >
      {children}
    </blockquote>
  ),
  code: ({ children, ...props }: React.ComponentPropsWithoutRef<"code">) => (
    <code
      className="bg-[rgba(0,184,107,0.16)] text-[#00B86B] px-2 py-1 rounded text-sm font-mono"
      {...props}
    >
      {children}
    </code>
  ),
  pre: ({ children, ...props }: React.ComponentPropsWithoutRef<"pre">) => (
    <pre
      className="bg-[#070B14] border border-[rgba(255,255,255,0.08)] rounded-xl p-4 overflow-x-auto mb-6"
      {...props}
    >
      {children}
    </pre>
  ),
  img: ({ src, alt, ...props }: React.ComponentPropsWithoutRef<"img">) => {
    // Validar src
    if (!src || typeof src !== 'string') {
      return null; // Sem src válido, não renderizar
    }

    // Permitir apenas src local (começando com "/")
    if (!src.startsWith('/')) {
      // Bloquear imagens externas por padrão (mais seguro)
      return null;
    }

    // Garantir alt string
    const altText = typeof alt === 'string' ? alt : '';

    return (
      <div className="my-8">
        <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-[rgba(255,255,255,0.08)]">
          <Image src={src} alt={altText} fill className="object-cover" />
        </div>
      </div>
    );
  },
  // Componentes customizados
  Callout,
  Figure,
  Quote,
  MetricCard,
  Divider,
};
