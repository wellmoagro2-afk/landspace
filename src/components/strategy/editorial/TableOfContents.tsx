"use client";

import { useEffect, useState } from "react";
import { Hash } from "lucide-react";

interface Heading {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  content: string;
}

export default function TableOfContents({ content }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState("");

  // Helper para requestAnimationFrame (casos de DOM/layout)
  const raf = (cb: () => void) => requestAnimationFrame(cb);

  useEffect(() => {
    // Extrair headings do conteúdo MDX
    const h2Regex = /^##\s+(.+)$/gm;
    const h3Regex = /^###\s+(.+)$/gm;
    const found: Heading[] = [];

    let match;
    while ((match = h2Regex.exec(content)) !== null) {
      const text = match[1];
      const id = text
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-");
      found.push({ id, text, level: 2 });
    }

    while ((match = h3Regex.exec(content)) !== null) {
      const text = match[1];
      const id = text
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-");
      found.push({ id, text, level: 3 });
    }

    raf(() => setHeadings(found));

    // Observer para destacar heading ativo
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-100px 0px -66% 0px" }
    );

    headings.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [content, headings.length]);

  if (headings.length === 0) return null;

  return (
    <nav className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto">
      <div className="bg-[#070B14]/70 backdrop-blur-md border border-[rgba(255,255,255,0.08)] rounded-xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <Hash className="w-5 h-5 text-[#00B86B]" />
          <h3 className="font-bold text-white">Sumário</h3>
        </div>
        <ul className="space-y-2">
          {headings.map((heading) => (
            <li key={heading.id}>
              <a
                href={`#${heading.id}`}
                className={`block py-2 px-3 rounded-lg text-sm transition-all ${
                  activeId === heading.id
                    ? "bg-[rgba(0,184,107,0.16)] text-[#00B86B] font-medium"
                    : "text-slate-400 hover:text-white hover:bg-[#070B14]/50"
                } ${heading.level === 3 ? "pl-6" : ""}`}
              >
                {heading.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
