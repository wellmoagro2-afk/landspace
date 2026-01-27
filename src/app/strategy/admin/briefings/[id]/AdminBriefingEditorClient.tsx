"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Save, Eye, ArrowLeft, Upload, X } from "lucide-react";

type BriefingStatus = "draft" | "published" | "archived";

interface Briefing {
  id: string;
  slug: string;
  title: string;
  subtitle?: string | null;
  summary: string;
  tags: string[];
  coverImageUrl?: string;
  readingTime: string;
  contentMdx: string;
  status: BriefingStatus;
  publishedAt?: string;
  seoTitle?: string;
  seoDescription?: string;
  pdfUrl?: string;
  youtubeUrl?: string;
  relatedMaps?: string[];
}

/**
 * Type guard para validar se um valor é um BriefingStatus válido
 */
function isBriefingStatus(value: string): value is BriefingStatus {
  return value === "draft" || value === "published" || value === "archived";
}

interface AdminBriefingEditorClientProps {
  briefing: Briefing | null;
}

export default function AdminBriefingEditorClient({ briefing }: AdminBriefingEditorClientProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState<{
    slug: string;
    title: string;
    subtitle: string;
    summary: string;
    tags: string;
    coverImageUrl: string;
    readingTime: string;
    contentMdx: string;
    status: BriefingStatus;
    seoTitle: string;
    seoDescription: string;
    pdfUrl: string;
    youtubeUrl: string;
    relatedMaps: string;
  }>({
    slug: briefing?.slug || "",
    title: briefing?.title || "",
    subtitle: briefing?.subtitle || "",
    summary: briefing?.summary || "",
    tags: briefing?.tags?.join(", ") || "",
    coverImageUrl: briefing?.coverImageUrl || "",
    readingTime: briefing?.readingTime || "5 min",
    contentMdx: briefing?.contentMdx || "",
    status: briefing?.status || "draft",
    seoTitle: briefing?.seoTitle || "",
    seoDescription: briefing?.seoDescription || "",
    pdfUrl: briefing?.pdfUrl || "",
    youtubeUrl: briefing?.youtubeUrl || "",
    relatedMaps: briefing?.relatedMaps?.join(", ") || "",
  });

  const handleSave = async (publish = false) => {
    setSaving(true);
    setError("");
    setSaved(false);

    try {
      const tags = formData.tags
        .split(",")
        .map((t) => t.trim())
        .filter((t) => t.length > 0);

      const relatedMaps = formData.relatedMaps
        .split(",")
        .map((m) => m.trim())
        .filter((m) => m.length > 0);

      const payload = {
        ...formData,
        tags,
        relatedMaps,
        status: publish ? "published" : formData.status,
      };

      const url = briefing
        ? `/api/admin/briefings/${briefing.id}`
        : "/api/admin/briefings";
      const method = briefing ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);

        if (!briefing) {
          router.push(`/strategy/admin/briefings/${data.id}`);
          router.refresh();
        }
      } else {
        setError(data.error || "Erro ao salvar");
      }
    } catch (err) {
      setError("Erro ao salvar briefing");
    } finally {
      setSaving(false);
    }
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        setFormData((prev) => ({ ...prev, coverImageUrl: data.url }));
      } else {
        setError(data.error || "Erro ao fazer upload");
      }
    } catch (err) {
      setError("Erro ao fazer upload");
    } finally {
      setUploading(false);
    }
  };

  const handlePreview = async () => {
    if (!formData.slug) {
      setError("Slug é obrigatório para preview");
      return;
    }

    // Primeiro salvar o rascunho se necessário
    if (briefing && briefing.id) {
      await handleSave(false);
      // Aguardar um pouco para garantir que salvou
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    // Gerar URL de preview - usar secret do servidor via API
    try {
      const res = await fetch(`/api/admin/preview-url?slug=${formData.slug}`);
      const data = await res.json();
      if (data.url) {
        window.open(data.url, "_blank");
      } else {
        setError("Erro ao gerar URL de preview");
      }
    } catch (err) {
      setError("Erro ao gerar URL de preview");
    }
  };

  return (
    <div className="min-h-screen bg-[#05070C]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#05070C]/95 backdrop-blur-md border-b border-[rgba(255,255,255,0.08)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link
                href="/strategy/admin/briefings"
                className="text-slate-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <h1 className="text-xl font-bold text-white">
                {briefing ? "Editar Briefing" : "Novo Briefing"}
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handlePreview}
                disabled={!formData.slug}
                className="flex items-center gap-2 px-4 py-2 bg-[#070B14]/70 border border-[rgba(255,255,255,0.08)] text-white rounded-xl hover:border-[#00B86B]/30 transition-all disabled:opacity-50"
              >
                <Eye className="w-4 h-4" />
                Ver como público
              </button>
              <button
                onClick={() => handleSave(false)}
                disabled={saving}
                className="flex items-center gap-2 px-6 py-2 bg-slate-700 text-white rounded-xl hover:bg-slate-600 transition-all disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                {saving ? "Salvando..." : saved ? "Salvo!" : "Salvar rascunho"}
              </button>
              <button
                onClick={() => handleSave(true)}
                disabled={saving}
                className="flex items-center gap-2 px-6 py-2 bg-[#00B86B] text-white rounded-xl hover:bg-[#00A85F] transition-all disabled:opacity-50"
              >
                Publicar
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Formulário */}
          <div className="space-y-6">
            <div className="bg-[#070B14]/70 backdrop-blur-md border border-[rgba(255,255,255,0.08)] rounded-xl p-6 space-y-4">
              <h2 className="text-lg font-bold text-white mb-4">Metadados</h2>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Slug *
                </label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  className="w-full px-4 py-2 bg-[#05070C] border border-[rgba(255,255,255,0.08)] rounded-xl text-white focus:outline-none focus:border-[#00B86B]/50"
                  placeholder="petroleo-poder-oriente-medio"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Título *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2 bg-[#05070C] border border-[rgba(255,255,255,0.08)] rounded-xl text-white focus:outline-none focus:border-[#00B86B]/50"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Subtítulo
                </label>
                <input
                  type="text"
                  value={formData.subtitle}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                  className="w-full px-4 py-2 bg-[#05070C] border border-[rgba(255,255,255,0.08)] rounded-xl text-white focus:outline-none focus:border-[#00B86B]/50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Resumo *
                </label>
                <textarea
                  value={formData.summary}
                  onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 bg-[#05070C] border border-[rgba(255,255,255,0.08)] rounded-xl text-white focus:outline-none focus:border-[#00B86B]/50"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Tags (separadas por vírgula)
                </label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  className="w-full px-4 py-2 bg-[#05070C] border border-[rgba(255,255,255,0.08)] rounded-xl text-white focus:outline-none focus:border-[#00B86B]/50"
                  placeholder="Energia, Geopolítica, Oriente Médio"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Imagem de Capa
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={formData.coverImageUrl}
                    onChange={(e) => setFormData({ ...formData, coverImageUrl: e.target.value })}
                    className="flex-1 px-4 py-2 bg-[#05070C] border border-[rgba(255,255,255,0.08)] rounded-xl text-white focus:outline-none focus:border-[#00B86B]/50"
                    placeholder="/uploads/strategy/image.jpg"
                  />
                  <label className="px-4 py-2 bg-[#00B86B] text-white rounded-xl hover:bg-[#00A85F] transition-all cursor-pointer flex items-center gap-2">
                    <Upload className="w-4 h-4" />
                    {uploading ? "Enviando..." : "Upload"}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleUpload}
                      className="hidden"
                      disabled={uploading}
                    />
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Tempo de Leitura
                  </label>
                  <input
                    type="text"
                    value={formData.readingTime}
                    onChange={(e) => setFormData({ ...formData, readingTime: e.target.value })}
                    className="w-full px-4 py-2 bg-[#05070C] border border-[rgba(255,255,255,0.08)] rounded-xl text-white focus:outline-none focus:border-[#00B86B]/50"
                    placeholder="6 min"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => {
                      setFormData({ ...formData, status: e.target.value as BriefingStatus });
                    }}
                    className="w-full px-4 py-2 bg-[#05070C] border border-[rgba(255,255,255,0.08)] rounded-xl text-white focus:outline-none focus:border-[#00B86B]/50"
                  >
                    <option value="draft">Rascunho</option>
                    <option value="published">Publicado</option>
                    <option value="archived">Arquivado</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  SEO Title
                </label>
                <input
                  type="text"
                  value={formData.seoTitle}
                  onChange={(e) => setFormData({ ...formData, seoTitle: e.target.value })}
                  className="w-full px-4 py-2 bg-[#05070C] border border-[rgba(255,255,255,0.08)] rounded-xl text-white focus:outline-none focus:border-[#00B86B]/50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  SEO Description
                </label>
                <textarea
                  value={formData.seoDescription}
                  onChange={(e) => setFormData({ ...formData, seoDescription: e.target.value })}
                  rows={2}
                  className="w-full px-4 py-2 bg-[#05070C] border border-[rgba(255,255,255,0.08)] rounded-xl text-white focus:outline-none focus:border-[#00B86B]/50"
                />
              </div>
            </div>
          </div>

          {/* Editor MDX */}
          <div className="space-y-6">
            <div className="bg-[#070B14]/70 backdrop-blur-md border border-[rgba(255,255,255,0.08)] rounded-xl p-6">
              <h2 className="text-lg font-bold text-white mb-4">Conteúdo MDX</h2>
              <textarea
                value={formData.contentMdx}
                onChange={(e) => setFormData({ ...formData, contentMdx: e.target.value })}
                rows={30}
                className="w-full px-4 py-2 bg-[#05070C] border border-[rgba(255,255,255,0.08)] rounded-xl text-white font-mono text-sm focus:outline-none focus:border-[#00B86B]/50"
                placeholder="# Título&#10;&#10;Conteúdo em Markdown/MDX..."
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
