"use client";

import { useState, useEffect, useRef } from "react";
import { List, X } from "lucide-react";

interface TOCItem {
  id: string;
  title: string;
  level: number;
  element: HTMLElement;
}

export default function ReaderTOC() {
  const [items, setItems] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const article = document.getElementById("briefing-article");
    if (!article) return;

    // Capturar headings e garantir IDs
    const headings = article.querySelectorAll("h2, h3");
    const tocItems: TOCItem[] = [];

    headings.forEach((heading) => {
      let id = heading.id;
      if (!id) {
        // Gerar slug a partir do texto
        const text = heading.textContent || "";
        id = text
          .toLowerCase()
          .replace(/[^\w\s-]/g, "")
          .replace(/\s+/g, "-")
          .trim();
        heading.id = id;
      }

      tocItems.push({
        id,
        title: heading.textContent || "",
        level: parseInt(heading.tagName.charAt(1)),
        element: heading as HTMLElement,
      });
    });

    setItems(tocItems);

    // IntersectionObserver para detectar heading ativo
    const observerOptions = {
      rootMargin: "-20% 0px -70% 0px",
      threshold: 0,
    };

    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          setActiveId(id);
        }
      });
    }, observerOptions);

    headings.forEach((heading) => {
      observerRef.current?.observe(heading);
    });

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100; // Offset para barra sticky
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });

      setIsMobileOpen(false);
    }
  };

  if (items.length === 0) return null;

  return (
    <>
      {/* Mobile: Botão para abrir drawer */}
      <button
        onClick={() => setIsMobileOpen(true)}
        className="lg:hidden fixed bottom-6 right-6 z-30 p-3 bg-[rgba(5,7,12,0.85)] backdrop-blur-md border border-[rgba(255,255,255,0.10)] rounded-full text-[rgba(255,255,255,0.85)] hover:bg-[rgba(5,7,12,0.95)] hover:border-[#00B86B]/30 transition-all duration-200 shadow-lg"
        aria-label="Abrir sumário"
      >
        <List className="w-5 h-5" />
      </button>

      {/* Mobile: Drawer */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
          onClick={() => setIsMobileOpen(false)}
        >
          <div
            className="absolute right-0 top-0 bottom-0 w-80 bg-[rgba(5,7,12,0.95)] backdrop-blur-md border-l border-[rgba(255,255,255,0.10)] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b border-[rgba(255,255,255,0.08)] flex items-center justify-between">
              <h3 className="text-sm font-semibold text-white">Sumário</h3>
              <button
                onClick={() => setIsMobileOpen(false)}
                className="p-1 hover:bg-[rgba(255,255,255,0.10)] rounded"
                aria-label="Fechar"
              >
                <X className="w-4 h-4 text-[rgba(255,255,255,0.85)]" />
              </button>
            </div>
            <nav className="p-4">
              <ul className="space-y-2">
                {items.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => scrollToHeading(item.id)}
                      className={`w-full text-left text-sm py-2 px-3 rounded-lg transition-all duration-200 ${
                        activeId === item.id
                          ? "bg-[rgba(0,184,107,0.16)] border border-[rgba(0,184,107,0.2)] text-[#00B86B] font-medium"
                          : "text-[rgba(255,255,255,0.66)] hover:bg-[rgba(255,255,255,0.05)] hover:text-[rgba(255,255,255,0.85)]"
                      } ${item.level === 3 ? "pl-6" : "pl-3"}`}
                    >
                      {item.title}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      )}

      {/* Desktop: Sidebar TOC - Renderizado dentro do <aside> do grid */}
      <div className="hidden lg:block">
        <div className="sticky top-24">
          <div className="bg-[rgba(5,7,12,0.55)] backdrop-blur-md border border-[rgba(255,255,255,0.10)] rounded-xl p-4">
            <h3 className="text-sm font-semibold text-white mb-4">Sumário</h3>
            {activeId && (
              <div className="mb-4 pb-4 border-b border-[rgba(255,255,255,0.08)]">
                <div className="text-xs text-[rgba(255,255,255,0.46)] mb-1">Agora:</div>
                <div className="text-sm text-[#00B86B] font-medium">
                  {items.find((item) => item.id === activeId)?.title || ""}
                </div>
              </div>
            )}
            <nav>
              <ul className="space-y-1">
                {items.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => scrollToHeading(item.id)}
                      className={`w-full text-left text-sm py-1.5 px-3 rounded-lg transition-all duration-200 relative ${
                        activeId === item.id
                          ? "bg-[rgba(0,184,107,0.16)] border border-[rgba(0,184,107,0.2)] text-[#00B86B] font-medium pl-6"
                          : "text-[rgba(255,255,255,0.66)] hover:bg-[rgba(255,255,255,0.05)] hover:text-[rgba(255,255,255,0.85)]"
                      } ${activeId === item.id ? "pl-6" : item.level === 3 ? "pl-6" : "pl-3"}`}
                    >
                      {activeId === item.id && (
                        <span
                          className="absolute left-2 top-1/2 -translate-y-1/2 w-0.5 h-4 bg-[#00B86B] rounded-full"
                          aria-hidden="true"
                        />
                      )}
                      {item.title}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}
