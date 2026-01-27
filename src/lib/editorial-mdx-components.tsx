import type React from "react";
import KeyTakeaways from "@/components/strategy/editorial/KeyTakeaways";
import PullQuote from "@/components/strategy/editorial/PullQuote";
import Callout from "@/components/strategy/editorial/Callout";
import Figure from "@/components/strategy/editorial/Figure";
import Quote from "@/components/strategy/editorial/Quote";
import MetricCard from "@/components/strategy/editorial/MetricCard";
import Divider from "@/components/strategy/editorial/Divider";
import Image from "next/image";
import Link from "next/link";

export const editorialMdxComponents = {
  // Headings
  h2: ({ children, id, ...props }: React.ComponentPropsWithoutRef<"h2">) => {
    const headingId = id || (typeof children === "string"
      ? children.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-")
      : "");
    return (
      <h2 id={headingId} className="editorial-heading-h2" {...props}>
        {children}
      </h2>
    );
  },
  h3: ({ children, id, ...props }: React.ComponentPropsWithoutRef<"h3">) => {
    const headingId = id || (typeof children === "string"
      ? children.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-")
      : "");
    return (
      <h3 id={headingId} className="editorial-heading-h3" {...props}>
        {children}
      </h3>
    );
  },
  p: ({ children, ...props }: React.ComponentPropsWithoutRef<"p">) => (
    <p className="editorial-paragraph" {...props}>
      {children}
    </p>
  ),
  a: ({ href, children, ...props }: React.ComponentPropsWithoutRef<"a">) => {
    // Validar href
    if (!href || typeof href !== 'string') {
      // Sem href válido, renderizar como span
      return <span className="editorial-link">{children}</span>;
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
      return <span className="editorial-link">{children}</span>;
    }

    // Links externos (http/https) - garantir rel seguro
    if (hrefLower.startsWith('http://') || hrefLower.startsWith('https://') || hrefLower.startsWith('//')) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="editorial-link"
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
        className="editorial-link"
        {...props}
      >
        {children}
      </Link>
    );
  },
  ul: ({ children, ...props }: React.ComponentPropsWithoutRef<"ul">) => (
    <ul className="editorial-list" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }: React.ComponentPropsWithoutRef<"ol">) => (
    <ol className="editorial-list" {...props}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }: React.ComponentPropsWithoutRef<"li">) => (
    <li className="editorial-list-item" {...props}>
      {children}
    </li>
  ),
  strong: ({ children, ...props }: React.ComponentPropsWithoutRef<"strong">) => (
    <strong className="editorial-strong" {...props}>
      {children}
    </strong>
  ),
  em: ({ children, ...props }: React.ComponentPropsWithoutRef<"em">) => (
    <em className="editorial-em" {...props}>
      {children}
    </em>
  ),
  blockquote: ({ children, ...props }: React.ComponentPropsWithoutRef<"blockquote">) => (
    <blockquote className="editorial-blockquote" {...props}>
      {children}
    </blockquote>
  ),
  code: ({ children, ...props }: React.ComponentPropsWithoutRef<"code">) => (
    <code className="editorial-code" {...props}>
      {children}
    </code>
  ),
  pre: ({ children, ...props }: React.ComponentPropsWithoutRef<"pre">) => (
    <pre className="editorial-pre" {...props}>
      {children}
    </pre>
  ),
  img: ({ src, alt, ...props }: React.ComponentPropsWithoutRef<"img">) => {
    // Validar src
    if (!src || typeof src !== 'string') {
      return null;
    }

    // Allowlist de hosts permitidos para imagens externas (vazio por padrão = bloquear externo)
    const ALLOWED_IMAGE_HOSTS: string[] = [];
    // Exemplo futuro: ['cdn.example.com', 'images.example.com']

    const srcLower = src.trim().toLowerCase();
    let imageSrc: string;
    let isExternal = false;

    // Verificar se é URL externa
    if (srcLower.startsWith('http://') || srcLower.startsWith('https://')) {
      isExternal = true;
      
      // Se não houver allowlist ou host não estiver na allowlist, bloquear
      if (ALLOWED_IMAGE_HOSTS.length === 0) {
        return null; // Bloquear externo por padrão
      }

      try {
        const url = new URL(src);
        if (!ALLOWED_IMAGE_HOSTS.includes(url.hostname)) {
          return null; // Host não permitido
        }
      } catch {
        return null; // URL inválida
      }

      imageSrc = src;
    } else {
      // Imagem local: normalizar path
      imageSrc = src.startsWith('/') ? src : `/${src}`;
    }

    // Garantir alt string
    const altText = typeof alt === 'string' ? alt : '';

    return (
      <div className="editorial-image-wrapper my-8">
        <div className="relative w-full aspect-video rounded-sm overflow-hidden border border-[rgba(0,0,0,0.12)]">
          <Image 
            src={imageSrc} 
            alt={altText} 
            fill 
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 720px"
            unoptimized={isExternal} // Se for URL externa, não otimizar
          />
        </div>
        {altText && (
          <p className="text-sm font-sans text-[#6A6A6A] mt-2 italic text-center">{altText}</p>
        )}
      </div>
    );
  },
  // Componentes customizados editoriais
  KeyTakeaways,
  PullQuote,
  Callout,
  Figure,
  Quote,
  MetricCard,
  Divider,
};
