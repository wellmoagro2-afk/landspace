"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { 
  FileText, 
  Download, 
  CheckCircle2, 
  Clock, 
  Circle,
  LogOut,
  DollarSign,
  Calendar,
  ArrowRight
} from "lucide-react";
import { toastInfo } from "@/lib/toast";

interface Project {
  id: string;
  protocol: string;
  title?: string | null;
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
  createdAt: string;
  updatedAt: string;
  progress: number;
}

interface Step {
  id: string;
  stepKey: string;
  title: string;
  description?: string;
  state: "PENDING" | "ACTIVE" | "DONE";
  startedAt?: string;
  finishedAt?: string;
  order: number;
}

export default function PortalDashboardPage() {
  const router = useRouter();
  const params = useParams();
  const protocol = params?.protocol as string;

  const [project, setProject] = useState<Project | null>(null);
  const [steps, setSteps] = useState<Step[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!protocol) return;

    async function fetchData() {
      try {
        const [projectRes, stepsRes] = await Promise.all([
          fetch(`/api/portal/project/${protocol}`),
          fetch(`/api/portal/project/${protocol}/steps`),
        ]);

        if (!projectRes.ok) {
          if (projectRes.status === 401) {
            router.push("/studio/portal");
            return;
          }
          throw new Error("Erro ao carregar projeto");
        }

        const projectData = await projectRes.json();
        const stepsData = await stepsRes.json();

        setProject(projectData.project);
        setSteps(stepsData.steps);
      } catch (err) {
        setError("Erro ao carregar dados do projeto");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [protocol, router]);

  const handleLogout = async () => {
    await fetch("/api/portal/logout", { method: "POST" });
    router.push("/studio/portal");
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const getStatusBadgeColor = (status: string) => {
    const colors: Record<string, string> = {
      TRIAGEM: "bg-slate-500/20 text-slate-300 border-slate-500/30",
      VALIDACAO_DADOS: "bg-blue-500/20 text-blue-300 border-blue-500/30",
      PROPOSTA: "bg-purple-500/20 text-purple-300 border-purple-500/30",
      ENTRADA_PAGA: "bg-green-500/20 text-green-300 border-green-500/30",
      EM_PRODUCAO: "bg-indigo-500/20 text-indigo-300 border-indigo-500/30",
      QA_INTERNO: "bg-amber-500/20 text-amber-300 border-amber-500/30",
      // REMOVIDOS: PREVIA_ENTREGUE e AJUSTES
      FINAL_PRONTO: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
      SALDO_PENDENTE: "bg-red-500/20 text-red-300 border-red-500/30",
      LIBERADO: "bg-green-500/20 text-green-300 border-green-500/30",
      ENCERRADO: "bg-slate-500/20 text-slate-300 border-slate-500/30",
    };
    return colors[status] || colors.TRIAGEM;
  };

  const getStepIcon = (state: string) => {
    if (state === "DONE") {
      return <CheckCircle2 className="w-5 h-5 text-green-400" />;
    }
    if (state === "ACTIVE") {
      return <Clock className="w-5 h-5 text-indigo-400 animate-pulse" />;
    }
    return <Circle className="w-5 h-5 text-slate-500" />;
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

  if (error || !project) {
    return (
      <div className="min-h-screen bg-[#02040a] flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-red-400 mb-4">{error || "Projeto não encontrado"}</p>
          <button
            onClick={() => router.push("/studio/portal")}
            className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors"
          >
            Voltar ao Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#02040a]">
      {/* Header */}
      <header className="bg-slate-900/60 backdrop-blur-md border-b border-indigo-500/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-white">Portal do Cliente</h1>
              <p className="text-sm text-slate-400">Protocolo: {project.protocol}</p>
              {project.title && (
                <p className="text-sm text-slate-300 mt-1 font-medium">{project.title}</p>
              )}
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-slate-300 hover:text-white transition-colors flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Sair
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Info do Projeto */}
        <div className="bg-slate-900/60 backdrop-blur-md border border-indigo-500/30 rounded-2xl p-6 mb-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">{project.clientName}</h2>
              <p className="text-slate-400 text-sm">
                {project.serviceType.replace(/_/g, " ")}
              </p>
            </div>
            <span className={`px-3 py-1 rounded-lg text-xs font-semibold border ${getStatusBadgeColor(project.status)}`}>
              {project.status.replace(/_/g, " ")}
            </span>
          </div>

          {/* Progress Bar */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-slate-300">Progresso do Projeto</span>
              <span className="text-sm font-semibold text-indigo-400">{project.progress}%</span>
            </div>
            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden relative">
              <svg
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 100 2"
                preserveAspectRatio="none"
              >
                <rect
                  x="0"
                  y="0"
                  width={project.progress}
                  height="2"
                  className="fill-indigo-500"
                  rx="1"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Timeline de Steps */}
          <div className="lg:col-span-2">
            <div className="bg-slate-900/60 backdrop-blur-md border border-indigo-500/30 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-6">Andamento do Projeto</h3>
              <div className="space-y-4">
                {/* Filtrar steps removidos: PREVIA_ENTREGUE e AJUSTES */}
                {(() => {
                  const filteredSteps = steps.filter((step) => step.stepKey !== 'PREVIA_ENTREGUE' && step.stepKey !== 'AJUSTES');
                  return filteredSteps.map((step, index) => (
                    <div key={step.id} className="flex items-start gap-4">
                      <div className="flex-shrink-0 mt-1">
                        {getStepIcon(step.state)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className={`font-semibold ${
                            step.state === "DONE" ? "text-green-400" :
                            step.state === "ACTIVE" ? "text-indigo-400" :
                            "text-slate-400"
                          }`}>
                            {step.title}
                          </h4>
                          {step.finishedAt && (
                            <span className="text-xs text-slate-500">
                              {new Date(step.finishedAt).toLocaleDateString("pt-BR")}
                            </span>
                          )}
                        </div>
                        {step.description && (
                          <p className="text-sm text-slate-400">{step.description}</p>
                        )}
                      </div>
                      {index < filteredSteps.length - 1 && (
                        <div className="absolute left-6 mt-8 w-0.5 h-8 bg-slate-700/50"></div>
                      )}
                    </div>
                  ));
                })()}
              </div>
            </div>
          </div>

          {/* Sidebar - Financeiro e Ações */}
          <div className="space-y-6">
            {/* Financeiro */}
            <div className="bg-slate-900/60 backdrop-blur-md border border-indigo-500/30 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-indigo-400" />
                Financeiro
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-slate-400">Valor Total</span>
                  <span className="font-semibold text-white">{formatCurrency(project.totalValue)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Entrada</span>
                  <span className="font-semibold text-white">{formatCurrency(project.entryValue)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Pago</span>
                  <span className="font-semibold text-green-400">{formatCurrency(project.paidValue)}</span>
                </div>
                <div className="pt-3 border-t border-slate-700/50 flex justify-between">
                  <span className="text-slate-300 font-semibold">Saldo</span>
                  <span className={`font-bold ${
                    project.balanceValue > 0 ? "text-red-400" : "text-green-400"
                  }`}>
                    {formatCurrency(project.balanceValue)}
                  </span>
                </div>
              </div>

              {project.balanceValue > 0 && (
                <div className="mt-4 p-4 bg-amber-500/10 border border-amber-500/30 rounded-lg">
                  <p className="text-sm text-amber-300 mb-2">
                    Saldo pendente para liberar entrega final
                  </p>
                  <button 
                    onClick={() => {
                      toastInfo(
                        "Instruções de Pagamento",
                        `Saldo pendente: ${formatCurrency(project.balanceValue)}. Entre em contato para pagar e liberar a entrega.`
                      );
                    }}
                    className="w-full px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg text-sm font-semibold transition-colors"
                  >
                    Ver Instruções de Pagamento
                  </button>
                </div>
              )}
            </div>

            {/* Ações Rápidas */}
            <div className="bg-slate-900/60 backdrop-blur-md border border-indigo-500/30 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">Ações</h3>
              <div className="space-y-2">
                <Link
                  href={`/studio/portal/${protocol}/files`}
                  className="w-full px-4 py-3 bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/30 rounded-lg text-indigo-300 hover:text-indigo-200 transition-all flex items-center justify-between group"
                >
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    <span>Ver Arquivos</span>
                  </div>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
