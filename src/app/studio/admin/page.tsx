"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Plus, Search, LogOut, Eye, Edit, FileText, DollarSign, Lock, Trash2 } from "lucide-react";

interface Project {
  id: string;
  protocol: string;
  clientName: string;
  clientEmail?: string;
  serviceType: string;
  status: string;
  totalValue: number;
  paidValue: number;
  balanceValue: number;
  finalRelease: boolean;
  createdAt: string;
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await fetch("/api/admin/portal/projects");
        
        if (!response.ok) {
          if (response.status === 401) {
            router.push("/studio/admin/login");
            return;
          }
          throw new Error("Erro ao carregar projetos");
        }

        const data = await response.json();
        setProjects(data.projects);
      } catch (err) {
        console.error("Erro:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, [router]);

  const handleLogout = async () => {
    await fetch("/api/admin/portal/logout", { method: "POST" });
    router.push("/studio/admin/login");
  };

  const handleDeleteProject = async (projectId: string, protocol: string) => {
    const confirmed = window.confirm(
      `Tem certeza que deseja excluir o projeto ${protocol}?\n\nEsta ação não pode ser desfeita e excluirá:\n- Todos os arquivos do projeto\n- Todos os pagamentos\n- Todas as etapas`
    );

    if (!confirmed) return;

    const confirmation = window.prompt('Digite "EXCLUIR" para confirmar a exclusão:');
    if (confirmation !== 'EXCLUIR') {
      alert('Exclusão cancelada');
      return;
    }

    try {
      const response = await fetch(`/api/admin/portal/project/${projectId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Erro ao excluir projeto");
      }

      alert("Projeto excluído com sucesso");
      // Recarregar lista de projetos
      const projectsResponse = await fetch("/api/admin/portal/projects");
      if (projectsResponse.ok) {
        const data = await projectsResponse.json();
        setProjects(data.projects);
      }
    } catch (err) {
      console.error("Erro:", err);
      alert(err instanceof Error ? err.message : "Erro ao excluir projeto");
    }
  };

  const filteredProjects = projects.filter((p) =>
    p.protocol.toLowerCase().includes(search.toLowerCase()) ||
    p.clientName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#02040a]">
      {/* Header */}
      <header className="bg-slate-900/60 backdrop-blur-md border-b border-indigo-500/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-white">Admin Portal</h1>
              <p className="text-sm text-slate-400">Gerenciamento de Projetos</p>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/studio/admin/audit"
                className="px-4 py-2 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700/50 text-slate-300 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2"
              >
                <Eye className="w-4 h-4" />
                Auditoria
              </Link>
              <Link
                href="/studio/admin/settings"
                className="px-4 py-2 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700/50 text-slate-300 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2"
              >
                <Lock className="w-4 h-4" />
                Configurações
              </Link>
              <Link
                href="/studio/admin/project/new"
                className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg text-sm font-semibold transition-colors flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Novo Projeto
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-slate-300 hover:text-white transition-colors flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Sair
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Busca */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar por protocolo ou cliente..."
              className="w-full pl-10 pr-4 py-3 bg-slate-900/60 border border-indigo-500/30 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 transition-all"
            />
          </div>
        </div>

        {/* Lista de Projetos */}
        {loading ? (
          <div className="text-center py-12">
            <div className="w-12 h-12 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-slate-400">Carregando projetos...</p>
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-slate-400">Nenhum projeto encontrado</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="bg-slate-900/60 backdrop-blur-md border border-indigo-500/30 rounded-xl p-6 hover:border-indigo-500/50 transition-all"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-bold text-white">{project.protocol}</h3>
                      <span className="px-2 py-1 bg-indigo-500/20 text-indigo-300 text-xs font-semibold rounded border border-indigo-500/30">
                        {project.status.replace(/_/g, " ")}
                      </span>
                    </div>
                    <p className="text-slate-300 mb-1">{project.clientName}</p>
                    {project.clientEmail && (
                      <p className="text-sm text-slate-400">{project.clientEmail}</p>
                    )}
                    <div className="flex items-center gap-4 mt-3 text-sm">
                      <span className="text-slate-400">
                        Total: <span className="text-white font-semibold">R$ {project.totalValue.toFixed(2)}</span>
                      </span>
                      <span className="text-slate-400">
                        Pago: <span className="text-green-400 font-semibold">R$ {project.paidValue.toFixed(2)}</span>
                      </span>
                      <span className="text-slate-400">
                        Saldo: <span className={`font-semibold ${project.balanceValue > 0 ? "text-red-400" : "text-green-400"}`}>
                          R$ {project.balanceValue.toFixed(2)}
                        </span>
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/studio/admin/project/${project.id}`}
                      className="px-4 py-2 bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2"
                    >
                      <Eye className="w-4 h-4" />
                      Ver
                    </Link>
                    <button
                      onClick={() => handleDeleteProject(project.id, project.protocol)}
                      className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-300 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2"
                      title="Excluir projeto"
                    >
                      <Trash2 className="w-4 h-4" />
                      Excluir
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
