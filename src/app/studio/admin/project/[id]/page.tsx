"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Plus, Upload, DollarSign, CheckCircle2, Clock, Circle, Trash2 } from "lucide-react";

interface Project {
  id: string;
  protocol: string;
  clientName: string;
  clientEmail?: string;
  clientPhone?: string;
  serviceType: string;
  status: string;
  totalValue: number;
  entryValue: number;
  paidValue: number;
  balanceValue: number;
  finalRelease: boolean;
  steps: Step[];
  files: File[];
  payments: Payment[];
}

interface Step {
  id: string;
  stepKey: string;
  title: string;
  state: "PENDING" | "ACTIVE" | "DONE";
  order: number;
}

interface File {
  id: string;
  kind: "PREVIEW" | "FINAL";
  filename: string;
  version: string;
}

interface Payment {
  id: string;
  method: string;
  amount: number;
  status: string;
  createdAt: string;
}

export default function AdminProjectPage() {
  const router = useRouter();
  const params = useParams();
  const projectId = params?.id as string;

  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!projectId || projectId === "new") return;

    async function fetchProject() {
      try {
        // Buscar projeto por protocol ou id
        const response = await fetch(`/api/admin/portal/project/${projectId}`);
        
        if (!response.ok) {
          if (response.status === 401) {
            router.push("/studio/admin/login");
            return;
          }
          throw new Error("Erro ao carregar projeto");
        }

        const data = await response.json();
        setProject(data.project);
      } catch (err) {
        console.error("Erro:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchProject();
  }, [projectId, router]);

  const handleUpdateStep = async (stepId: string, state: "PENDING" | "ACTIVE" | "DONE") => {
    try {
      const response = await fetch(`/api/admin/portal/project/${projectId}/steps`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stepId, state }),
      });

      if (!response.ok) throw new Error("Erro ao atualizar step");

      const data = await response.json();
      
      if (project) {
        setProject({
          ...project,
          steps: project.steps.map((s) => s.id === stepId ? data.step : s),
        });
      }
    } catch (err) {
      console.error("Erro:", err);
      alert("Erro ao atualizar step");
    }
  };

  const handleAddPayment = async () => {
    const method = prompt("Método (PIX/BOLETO/CARTAO/AJUSTE):");
    const amount = prompt("Valor:");
    const note = prompt("Observações (opcional):");

    if (!method || !amount) return;

    try {
      const response = await fetch(`/api/admin/portal/project/${projectId}/payment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          method: method.toUpperCase(),
          amount: parseFloat(amount),
          status: "CONFIRMED",
          note: note || undefined,
        }),
      });

      if (!response.ok) throw new Error("Erro ao registrar pagamento");

      const data = await response.json();
      
      // Recarregar projeto
      window.location.reload();
    } catch (err) {
      console.error("Erro:", err);
      alert("Erro ao registrar pagamento");
    }
  };

  const handleUploadFile = async (kind: "PREVIEW" | "FINAL") => {
    // Solicitar versão do arquivo
    const version = prompt(`Versão do arquivo ${kind} (ex: v1, v2, final):`) || "v1";
    if (!version) return;

    const input = document.createElement("input");
    input.type = "file";
    input.multiple = false; // Por enquanto, um arquivo por vez
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;

      const formData = new FormData();
      formData.append("file", file);
      formData.append("kind", kind);
      formData.append("version", version);

      try {
        const response = await fetch(`/api/admin/portal/project/${projectId}/files/upload`, {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error || "Erro ao fazer upload");
        }

        alert(`Arquivo ${kind} (${version}) enviado com sucesso!`);
        window.location.reload();
      } catch (err) {
        console.error("Erro:", err);
        alert(err instanceof Error ? err.message : "Erro ao fazer upload");
      }
    };
    input.click();
  };

  const handleToggleFinalRelease = async () => {
    if (!project) return;

    try {
      const response = await fetch(`/api/admin/portal/project/${projectId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          finalRelease: !project.finalRelease,
        }),
      });

      if (!response.ok) throw new Error("Erro ao atualizar");

      window.location.reload();
    } catch (err) {
      console.error("Erro:", err);
      alert("Erro ao atualizar");
    }
  };

  const handleDeleteProject = async () => {
    if (!project) return;

    const confirmed = window.confirm(
      `Tem certeza que deseja excluir o projeto ${project.protocol}?\n\nEsta ação não pode ser desfeita e excluirá:\n- Todos os arquivos do projeto\n- Todos os pagamentos\n- Todas as etapas`
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
      router.push("/studio/admin");
    } catch (err) {
      console.error("Erro:", err);
      alert(err instanceof Error ? err.message : "Erro ao excluir projeto");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#02040a] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-400">Carregando projeto...</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-[#02040a] flex items-center justify-center">
        <p className="text-red-400">Projeto não encontrado</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#02040a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <Link
              href="/studio/admin"
              className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar
            </Link>
            <button
              onClick={handleDeleteProject}
              className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-300 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2"
            >
              <Trash2 className="w-4 h-4" />
              Excluir Projeto
            </button>
          </div>
          <h1 className="text-2xl font-bold text-white">{project.protocol}</h1>
          <p className="text-slate-400 text-sm mt-1">{project.clientName}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Steps */}
          <div className="lg:col-span-2">
            <div className="bg-slate-900/60 backdrop-blur-md border border-indigo-500/30 rounded-2xl p-6">
              <h2 className="text-lg font-bold text-white mb-4">Steps do Projeto</h2>
              <div className="space-y-3">
                {project.steps.map((step) => (
                  <div key={step.id} className="flex items-center gap-4 p-3 bg-slate-800/50 rounded-lg">
                    <div className="flex-shrink-0">
                      {step.state === "DONE" && <CheckCircle2 className="w-5 h-5 text-green-400" />}
                      {step.state === "ACTIVE" && <Clock className="w-5 h-5 text-indigo-400" />}
                      {step.state === "PENDING" && <Circle className="w-5 h-5 text-slate-500" />}
                    </div>
                    <div className="flex-1">
                      <p className="text-white font-medium">{step.title}</p>
                    </div>
                    <select
                      value={step.state}
                      onChange={(e) => handleUpdateStep(step.id, e.target.value as any)}
                      className="px-3 py-1 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm"
                    >
                      <option value="PENDING">Pendente</option>
                      <option value="ACTIVE">Ativo</option>
                      <option value="DONE">Concluído</option>
                    </select>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Financeiro */}
            <div className="bg-slate-900/60 backdrop-blur-md border border-indigo-500/30 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-indigo-400" />
                Financeiro
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-400">Total</span>
                  <span className="text-white font-semibold">R$ {project.totalValue.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Pago</span>
                  <span className="text-green-400 font-semibold">R$ {project.paidValue.toFixed(2)}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-slate-700">
                  <span className="text-slate-300 font-semibold">Saldo</span>
                  <span className={`font-bold ${project.balanceValue > 0 ? "text-red-400" : "text-green-400"}`}>
                    R$ {project.balanceValue.toFixed(2)}
                  </span>
                </div>
              </div>
              <button
                onClick={handleAddPayment}
                className="w-full mt-4 px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg text-sm font-semibold transition-colors flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Registrar Pagamento
              </button>
            </div>

            {/* Arquivos */}
            <div className="bg-slate-900/60 backdrop-blur-md border border-indigo-500/30 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">Arquivos</h3>
              <div className="space-y-2">
                <button
                  onClick={() => handleUploadFile("PREVIEW")}
                  className="w-full px-4 py-2 bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 rounded-lg text-sm font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  <Upload className="w-4 h-4" />
                  Upload Preview
                </button>
                <button
                  onClick={() => handleUploadFile("FINAL")}
                  className="w-full px-4 py-2 bg-green-500/10 hover:bg-green-500/20 border border-green-500/30 text-green-300 rounded-lg text-sm font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  <Upload className="w-4 h-4" />
                  Upload Final
                </button>
              </div>
              <div className="mt-4 space-y-2">
                {project.files.length === 0 ? (
                  <p className="text-xs text-slate-500 text-center py-2">Nenhum arquivo enviado</p>
                ) : (
                  project.files.map((file) => (
                    <div key={file.id} className="text-xs text-slate-300 p-2 bg-slate-800/50 rounded flex items-center justify-between">
                      <div>
                        <span className="font-medium">{file.filename}</span>
                        <span className="text-slate-500 ml-2">({file.kind} - {file.version})</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Final Release */}
            <div className="bg-slate-900/60 backdrop-blur-md border border-indigo-500/30 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">Liberação Final</h3>
              <div className="flex items-center justify-between">
                <span className="text-slate-300 text-sm">
                  {project.finalRelease ? "Liberado" : "Bloqueado"}
                </span>
                <button
                  onClick={handleToggleFinalRelease}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                    project.finalRelease
                      ? "bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-300"
                      : "bg-green-500/10 hover:bg-green-500/20 border border-green-500/30 text-green-300"
                  }`}
                >
                  {project.finalRelease ? "Bloquear" : "Liberar"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
