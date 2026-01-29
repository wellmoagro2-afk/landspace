"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Plus, Upload, DollarSign, CheckCircle2, Clock, Circle, Trash2, Edit2 } from "lucide-react";
import { toastSuccess, toastError, toastInfo } from "@/lib/toast";

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
  steps: Step[];
  files: File[];
  payments: Payment[];
}

type StepState = "PENDING" | "ACTIVE" | "DONE";

interface Step {
  id: string;
  stepKey: string;
  title: string;
  state: StepState;
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
  note?: string;
  createdAt: string;
}

export default function AdminProjectPage() {
  const router = useRouter();
  const params = useParams();
  const projectId = params?.id as string;

  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchProject = useCallback(async () => {
    if (!projectId || projectId === "new") return;
    try {
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
      toastError("Erro ao carregar projeto");
    } finally {
      setLoading(false);
    }
  }, [projectId, router]);

  useEffect(() => {
    if (!projectId || projectId === "new") return;
    setLoading(true);
    fetchProject();
  }, [projectId, fetchProject]);

  /**
   * Converte uma string para StepState de forma segura
   */
  function toStepState(value: string): StepState | null {
    if (value === "PENDING" || value === "ACTIVE" || value === "DONE") {
      return value;
    }
    return null;
  }

  const handleUpdateStep = async (stepId: string, state: StepState) => {
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
      toastError("Erro ao atualizar step");
    }
  };

  const handleRenameStep = async (stepId: string, currentTitle: string) => {
    const newTitle = prompt(`Renomear step:\n\nTítulo atual: ${currentTitle}\n\nNovo título (ex: R1, R2, R3):`, currentTitle);
    if (!newTitle || newTitle === currentTitle) return;

    try {
      const response = await fetch(`/api/admin/portal/project/${projectId}/steps`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stepId, title: newTitle }),
      });

      if (!response.ok) throw new Error("Erro ao renomear step");

      const data = await response.json();
      
      if (project) {
        setProject({
          ...project,
          steps: project.steps.map((s) => s.id === stepId ? data.step : s),
        });
      }
    } catch (err) {
      console.error("Erro:", err);
      toastError("Erro ao renomear step");
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

      await fetchProject();
      toastSuccess("Pagamento registrado com sucesso");
    } catch (err) {
      console.error("Erro:", err);
      toastError("Erro ao registrar pagamento");
    }
  };

  const handleEditPayment = async (payment: Payment) => {
    const method = prompt(`Método (PIX/BOLETO/CARTAO/AJUSTE):`, payment.method);
    if (method === null) return; // Usuário cancelou

    const amount = prompt(`Valor:`, payment.amount.toString());
    if (amount === null) return; // Usuário cancelou

    const status = prompt(`Status (PENDING/CONFIRMED/CANCELED):`, payment.status);
    if (status === null) return; // Usuário cancelou

    const note = prompt(`Observações (opcional):`, payment.note || "");

    if (!method || !amount || !status) return;

    try {
      const response = await fetch(`/api/admin/portal/project/${projectId}/payment`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          paymentId: payment.id,
          method: method.toUpperCase(),
          amount: parseFloat(amount),
          status: status.toUpperCase(),
          note: note || undefined,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Erro ao atualizar pagamento");
      }

      await fetchProject();
      toastSuccess("Pagamento atualizado com sucesso");
    } catch (err) {
      console.error("Erro:", err);
      toastError(err instanceof Error ? err.message : "Erro ao atualizar pagamento");
    }
  };

  const handleDeletePayment = async (payment: Payment) => {
    const confirmed = window.confirm(
      `Tem certeza que deseja excluir este pagamento?\n\n` +
      `Método: ${payment.method}\n` +
      `Valor: R$ ${payment.amount.toFixed(2)}\n` +
      `Status: ${payment.status}\n\n` +
      `Esta ação não pode ser desfeita e recalculará o saldo do projeto.`
    );

    if (!confirmed) return;

    try {
      const response = await fetch(`/api/admin/portal/project/${projectId}/payment?paymentId=${payment.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Erro ao excluir pagamento");
      }

      await fetchProject();
      toastSuccess("Pagamento excluído com sucesso");
    } catch (err) {
      console.error("Erro:", err);
      toastError(err instanceof Error ? err.message : "Erro ao excluir pagamento");
    }
  };

  const handleEditTitle = async () => {
    if (!project) return;

    const currentTitle = project.title || '';
    const newTitleInput = prompt(
      `Título do Projeto:\n\nExemplo: "Projeto de Georreferenciamento de Fazenda São Tomás - Rio Verde (GO)"\n\nTítulo atual: ${currentTitle || '(vazio)'}\n\nNovo título:`,
      currentTitle
    );

    if (newTitleInput === null) return; // Usuário cancelou

    const newTitle = newTitleInput.trim();

    try {
      const response = await fetch(`/api/admin/portal/project/${projectId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: newTitle || null,
        }),
      });

      if (!response.ok) {
        let data;
        try {
          data = await response.json();
        } catch {
          // Se não conseguir parsear JSON, usar mensagem genérica
          throw new Error("Erro ao atualizar título. Verifique se a migration foi aplicada.");
        }
        
        const errorMessage = data.error || "Erro ao atualizar título";
        const hint = data.hint || "";
        const errorMsgLower = errorMessage.toLowerCase();
        
        // Mostrar mensagem mais clara se for erro de migration ou campo não encontrado
        if (errorMsgLower.includes("migration") || 
            errorMsgLower.includes("campo") || 
            errorMsgLower.includes("title") ||
            errorMsgLower.includes("disponível") ||
            errorMsgLower.includes("banco de dados") ||
            errorMsgLower.includes("column") ||
            errorMsgLower.includes("does not exist")) {
          toastError("Campo \"title\" não disponível", "Execute: npm run db:migrate");
        } else {
          toastError("Erro ao atualizar título", errorMessage + (hint ? " " + hint : ""));
        }
        return;
      }

      const responseData = await response.json();
      
      // Verificar se há warning (campo não disponível)
      if (responseData.warning) {
        toastError("Atenção", responseData.warning + " Execute: npm run db:migrate");
        return;
      }
      
      // Atualizar estado local com os dados retornados
      if (responseData.project) {
        setProject({
          ...project,
          title: responseData.project.title || newTitle || null,
        });
        toastSuccess("Título atualizado com sucesso");
      } else if (responseData.success) {
        setProject({
          ...project,
          title: newTitle || null,
        });
        toastSuccess("Título atualizado com sucesso");
      }
    } catch (err) {
      console.error("Erro ao atualizar título:", err);
      const errorMessage = err instanceof Error ? err.message : "Erro ao atualizar título";
      
      // Verificar se é erro de migration
      if (errorMessage.includes("migration") || 
          errorMessage.includes("campo") || 
          errorMessage.includes("title") ||
          errorMessage.includes("disponível") ||
          errorMessage.includes("banco de dados")) {
        toastError("Campo \"title\" não disponível", "Execute: npm run db:migrate");
      } else {
        toastError("Erro ao atualizar título", errorMessage);
      }
    }
  };

  const handleEditProjectValue = async (field: 'totalValue' | 'entryValue') => {
    if (!project) return;

    const currentValue = field === 'totalValue' ? project.totalValue : project.entryValue;
    const fieldLabel = field === 'totalValue' ? 'Valor Total' : 'Valor de Entrada';
    
    const newValueInput = prompt(`${fieldLabel}:\n\nValor atual: R$ ${currentValue.toFixed(2)}\n\nNovo valor:`, currentValue.toString());
    
    if (newValueInput === null) return; // Usuário cancelou
    
    const newValue = parseFloat(newValueInput);
    if (isNaN(newValue) || newValue < 0) {
      toastError("Valor inválido", "Digite um número positivo.");
      return;
    }

    // Validação: entrada não pode ser maior que total
    if (field === 'entryValue' && newValue > project.totalValue) {
      toastError("Valor de entrada não pode ser maior que o valor total do projeto.");
      return;
    }

    if (field === 'totalValue' && newValue < project.entryValue) {
      const confirm = window.confirm(
        `O valor total (R$ ${newValue.toFixed(2)}) é menor que a entrada atual (R$ ${project.entryValue.toFixed(2)}).\n\n` +
        `Deseja ajustar a entrada para R$ ${newValue.toFixed(2)} também?`
      );
      if (confirm) {
        // Atualizar ambos os valores
        try {
          const response = await fetch(`/api/admin/portal/project/${projectId}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              totalValue: newValue,
              entryValue: newValue,
            }),
          });

          if (!response.ok) {
            const data = await response.json();
            throw new Error(data.error || "Erro ao atualizar valores");
          }

          await fetchProject();
          toastSuccess("Valores atualizados com sucesso");
        } catch (err) {
          console.error("Erro:", err);
          toastError(err instanceof Error ? err.message : "Erro ao atualizar valores");
        }
        return;
      } else {
        return; // Usuário cancelou
      }
    }

    try {
      const response = await fetch(`/api/admin/portal/project/${projectId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          [field]: newValue,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Erro ao atualizar valor");
      }

      await fetchProject();
      toastSuccess(`${fieldLabel} atualizado com sucesso`);
    } catch (err) {
      console.error("Erro:", err);
      toastError(err instanceof Error ? err.message : "Erro ao atualizar valor");
    }
  };

  const handleUploadFile = async () => {
    // Solicitar nome do projeto (ex: Projeto Final, Projeto Final R1, Projeto Final R2, etc)
    const versionInput = prompt(`Nome do projeto (ex: Projeto Final, Projeto Final R1, Projeto Final R2):`);
    
    // Se o usuário clicou em Cancelar, prompt retorna null - abortar
    if (versionInput === null) {
      return;
    }
    
    // Se o usuário clicou OK mas não digitou nada, usar valor padrão
    const version = versionInput?.trim() || "Projeto Final";

    // Criar input de arquivo
    const input = document.createElement("input");
    input.type = "file";
    input.multiple = false; // Por enquanto, um arquivo por vez
    
    // Configurar handler ANTES de abrir o seletor
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;

      const formData = new FormData();
      formData.append("file", file);
      formData.append("kind", "FINAL"); // Todos os arquivos são FINAL agora
      formData.append("version", version); // Nome customizado (Projeto Final, R1, R2, etc)

      try {
        const response = await fetch(`/api/admin/portal/project/${projectId}/files/upload`, {
          method: "POST",
          body: formData,
          // Não incluir Content-Type - o browser define automaticamente com boundary para FormData
          // Isso garante que não seja tratado como Server Action
        });

        // Verificar se a resposta é OK
        if (!response.ok) {
          // Tentar parsear como JSON primeiro
          const contentType = response.headers.get("content-type");
          let errorMessage = "Erro ao fazer upload";
          
          if (contentType && contentType.includes("application/json")) {
            try {
              const data = await response.json();
              errorMessage = data.error || errorMessage;
            } catch (jsonError) {
              // Se falhar ao parsear JSON, usar texto da resposta
              try {
                const text = await response.text();
                errorMessage = text || errorMessage;
              } catch (textError) {
                // Se falhar ao ler texto, usar mensagem padrão com status
                errorMessage = `Erro ${response.status}: ${response.statusText || errorMessage}`;
              }
            }
          } else {
            // Se não for JSON, tentar ler como texto
            try {
              const text = await response.text();
              errorMessage = text || errorMessage;
            } catch (textError) {
              errorMessage = `Erro ${response.status}: ${response.statusText || errorMessage}`;
            }
          }
          
          throw new Error(errorMessage);
        }

        // Resposta OK - parsear JSON
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          await response.json();
        }
        await fetchProject();
        toastSuccess(`Arquivo "${version}" enviado com sucesso`);
      } catch (err) {
        console.error("Erro no upload:", err);
        const errorMessage = err instanceof Error ? err.message : "Erro ao fazer upload";
        toastError("Erro ao fazer upload", errorMessage);
      }
    };
    
    // Abrir seletor de arquivo APÓS configurar o handler
    input.click();
  };

  const handleDeleteFile = async (fileId: string, filename: string) => {
    if (!project) return;

    const confirmed = window.confirm(
      `Tem certeza que deseja excluir o arquivo "${filename}"?\n\nEsta ação não pode ser desfeita e removerá o arquivo do sistema.`
    );

    if (!confirmed) return;

    try {
      const response = await fetch(`/api/admin/portal/project/${projectId}/files/${fileId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Erro ao excluir arquivo");
      }

      await fetchProject();
      toastSuccess("Arquivo excluído com sucesso");
    } catch (err) {
      console.error("Erro:", err);
      toastError(err instanceof Error ? err.message : "Erro ao excluir arquivo");
    }
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

      await fetchProject();
      toastSuccess(project.finalRelease ? "Liberação bloqueada" : "Liberação ativada");
    } catch (err) {
      console.error("Erro:", err);
      toastError("Erro ao atualizar liberação final");
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
      toastInfo("Exclusão cancelada");
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

      toastSuccess("Projeto excluído com sucesso");
      router.push("/studio/admin");
    } catch (err) {
      console.error("Erro:", err);
      toastError(err instanceof Error ? err.message : "Erro ao excluir projeto");
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
          <div className="flex items-start gap-3">
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-white">{project.protocol}</h1>
              {project.title ? (
                <div className="flex items-center gap-2 mt-1">
                  <p className="text-slate-300 text-sm">{project.title}</p>
                  <button
                    onClick={handleEditTitle}
                    className="p-1 bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 rounded transition-colors"
                    title="Editar título do projeto"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleEditTitle}
                  className="mt-1 text-sm text-indigo-400 hover:text-indigo-300 underline flex items-center gap-1"
                >
                  <Plus className="w-3 h-3" />
                  Adicionar título do projeto
                </button>
              )}
              <p className="text-slate-400 text-sm mt-1">{project.clientName}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Steps */}
          <div className="lg:col-span-2">
            <div className="bg-slate-900/60 backdrop-blur-md border border-indigo-500/30 rounded-2xl p-6">
              <h2 className="text-lg font-bold text-white mb-4">Steps do Projeto</h2>
              <div className="space-y-3">
                {/* Filtrar steps removidos: PREVIA_ENTREGUE e AJUSTES */}
                {project.steps
                  .filter((step) => step.stepKey !== 'PREVIA_ENTREGUE' && step.stepKey !== 'AJUSTES')
                  .map((step) => (
                  <div key={step.id} className="flex items-center gap-4 p-3 bg-slate-800/50 rounded-lg">
                    <div className="flex-shrink-0">
                      {step.state === "DONE" && <CheckCircle2 className="w-5 h-5 text-green-400" />}
                      {step.state === "ACTIVE" && <Clock className="w-5 h-5 text-indigo-400" />}
                      {step.state === "PENDING" && <Circle className="w-5 h-5 text-slate-500" />}
                    </div>
                    <div className="flex-1 flex items-center gap-2">
                      <p className="text-white font-medium">{step.title}</p>
                      {step.stepKey === 'REVISAO' && (
                        <button
                          onClick={() => handleRenameStep(step.id, step.title)}
                          className="text-xs text-indigo-400 hover:text-indigo-300 underline"
                          title="Renomear revisão (ex: R1, R2, R3)"
                        >
                          Renomear
                        </button>
                      )}
                    </div>
                    <select
                      value={step.state}
                      onChange={(e) => {
                        const next = toStepState(e.target.value);
                        if (next) {
                          handleUpdateStep(step.id, next);
                        }
                      }}
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
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Total</span>
                  <div className="flex items-center gap-2">
                    <span className="text-white font-semibold">R$ {project.totalValue.toFixed(2)}</span>
                    <button
                      onClick={() => handleEditProjectValue('totalValue')}
                      className="p-1 bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 rounded transition-colors"
                      title="Editar valor total"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Entrada</span>
                  <div className="flex items-center gap-2">
                    <span className="text-white font-semibold">R$ {project.entryValue.toFixed(2)}</span>
                    <button
                      onClick={() => handleEditProjectValue('entryValue')}
                      className="p-1 bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 rounded transition-colors"
                      title="Editar valor de entrada"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
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
              
              {/* Lista de Pagamentos */}
              {project.payments.length > 0 && (
                <div className="mt-4 pt-4 border-t border-slate-700">
                  <h4 className="text-sm font-semibold text-white mb-2">Pagamentos Registrados</h4>
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {project.payments.map((payment) => (
                      <div key={payment.id} className="text-xs bg-slate-800/50 rounded p-2 flex items-center justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-white">{payment.method}</span>
                            <span className={`px-1.5 py-0.5 rounded text-xs ${
                              payment.status === 'CONFIRMED' ? 'bg-green-500/20 text-green-300' :
                              payment.status === 'PENDING' ? 'bg-amber-500/20 text-amber-300' :
                              'bg-red-500/20 text-red-300'
                            }`}>
                              {payment.status}
                            </span>
                          </div>
                          <div className="text-slate-400 mt-1">
                            R$ {payment.amount.toFixed(2)}
                            {payment.note && (
                              <span className="ml-2 text-slate-500">• {payment.note}</span>
                            )}
                          </div>
                          <div className="text-slate-500 text-xs mt-0.5">
                            {new Date(payment.createdAt).toLocaleDateString("pt-BR")}
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleEditPayment(payment)}
                            className="p-1.5 bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 rounded transition-colors"
                            title="Editar pagamento"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeletePayment(payment)}
                            className="p-1.5 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-300 rounded transition-colors"
                            title="Excluir pagamento"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Arquivos */}
            <div className="bg-slate-900/60 backdrop-blur-md border border-indigo-500/30 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">Arquivos</h3>
              <div className="space-y-2">
                <button
                  onClick={() => handleUploadFile()}
                  className="w-full px-4 py-2 bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 rounded-lg text-sm font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  <Upload className="w-4 h-4" />
                  Upload do Projeto
                </button>
              </div>
              <div className="mt-4 space-y-2">
                {project.files.length === 0 ? (
                  <p className="text-xs text-slate-500 text-center py-2">Nenhum arquivo enviado</p>
                ) : (
                  project.files.map((file) => (
                    <div key={file.id} className="text-xs text-slate-300 p-2 bg-slate-800/50 rounded flex items-center justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <span className="font-medium">{file.filename}</span>
                        <span className="text-slate-500 ml-2">({file.version})</span>
                      </div>
                      <button
                        onClick={() => handleDeleteFile(file.id, file.filename)}
                        className="flex-shrink-0 p-1.5 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-300 rounded transition-colors"
                        title="Excluir arquivo"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
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
