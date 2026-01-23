"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Plus, Search, Edit, Trash2, Eye, LogOut, FileText } from "lucide-react";

interface Briefing {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  status: "draft" | "published" | "archived";
  publishedAt?: string;
  updatedAt: string;
}

export default function AdminBriefingsClient() {
  const [briefings, setBriefings] = useState<Briefing[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const router = useRouter();

  useEffect(() => {
    loadBriefings();
  }, [statusFilter, search]);

  const loadBriefings = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (statusFilter !== "all") params.append("status", statusFilter);
      if (search) params.append("search", search);

      const res = await fetch(`/api/admin/briefings?${params}`);
      const data = await res.json();
      setBriefings(data.briefings || []);
    } catch (error) {
      console.error("Error loading briefings:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja deletar este briefing?")) return;

    try {
      const res = await fetch(`/api/admin/briefings/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        loadBriefings();
      }
    } catch (error) {
      console.error("Error deleting briefing:", error);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/strategy/admin/login");
  };

  return (
    <div className="min-h-screen bg-[#05070C]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#05070C]/95 backdrop-blur-md border-b border-[rgba(255,255,255,0.08)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <FileText className="w-6 h-6 text-[#00B86B]" />
              <h1 className="text-xl font-bold text-white">Admin Editorial</h1>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-slate-400 hover:text-white transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Sair
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Toolbar */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Buscar briefings..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-[#070B14]/70 border border-[rgba(255,255,255,0.08)] rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-[#00B86B]/50"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 bg-[#070B14]/70 border border-[rgba(255,255,255,0.08)] rounded-xl text-white focus:outline-none focus:border-[#00B86B]/50"
            >
              <option value="all">Todos</option>
              <option value="draft">Rascunho</option>
              <option value="published">Publicado</option>
              <option value="archived">Arquivado</option>
            </select>
          </div>
          <Link
            href="/strategy/admin/briefings/new"
            className="inline-flex items-center gap-2 px-6 py-2 bg-[#00B86B] text-white rounded-xl font-semibold hover:bg-[#00A85F] transition-all"
          >
            <Plus className="w-5 h-5" />
            Novo Briefing
          </Link>
        </div>

        {/* List */}
        {loading ? (
          <div className="text-center py-12 text-slate-400">Carregando...</div>
        ) : briefings.length === 0 ? (
          <div className="text-center py-12 text-slate-400">
            Nenhum briefing encontrado
          </div>
        ) : (
          <div className="grid gap-4">
            {briefings.map((briefing) => (
              <div
                key={briefing.id}
                className="bg-[#070B14]/70 backdrop-blur-md border border-[rgba(255,255,255,0.08)] rounded-xl p-6 hover:border-[#00B86B]/30 transition-all"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-bold text-white">{briefing.title}</h3>
                      <span
                        className={`px-2 py-1 rounded text-xs font-semibold ${
                          briefing.status === "published"
                            ? "bg-[rgba(0,184,107,0.16)] text-[#00B86B]"
                            : briefing.status === "draft"
                            ? "bg-slate-700/50 text-slate-300"
                            : "bg-slate-800/50 text-slate-400"
                        }`}
                      >
                        {briefing.status === "published"
                          ? "Publicado"
                          : briefing.status === "draft"
                          ? "Rascunho"
                          : "Arquivado"}
                      </span>
                    </div>
                    {briefing.subtitle && (
                      <p className="text-slate-400 text-sm mb-2">{briefing.subtitle}</p>
                    )}
                    <p className="text-slate-500 text-xs">
                      Atualizado: {new Date(briefing.updatedAt).toLocaleDateString("pt-BR")}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <Link
                      href={`/strategy/admin/briefings/${briefing.id}`}
                      className="p-2 text-slate-400 hover:text-[#00B86B] transition-colors"
                      title="Editar"
                    >
                      <Edit className="w-5 h-5" />
                    </Link>
                    <button
                      onClick={() => handleDelete(briefing.id)}
                      className="p-2 text-slate-400 hover:text-red-400 transition-colors"
                      title="Deletar"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
