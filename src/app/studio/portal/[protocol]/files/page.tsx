"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { Download, Lock, FileText, ArrowLeft, CheckCircle2 } from "lucide-react";

interface File {
  id: string;
  kind: "PREVIEW" | "FINAL";
  filename: string;
  version: string;
  uploadedAt: string;
}

interface FilesData {
  preview: {
    canDownload: boolean;
    files: File[];
  };
  final: {
    canDownload: boolean;
    files: File[];
  };
}

export default function PortalFilesPage() {
  const router = useRouter();
  const params = useParams();
  const protocol = params?.protocol as string;

  const [filesData, setFilesData] = useState<FilesData | null>(null);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState<string | null>(null);

  useEffect(() => {
    if (!protocol) return;

    async function fetchFiles() {
      try {
        const response = await fetch(`/api/portal/project/${protocol}/files`);
        
        if (!response.ok) {
          if (response.status === 401) {
            router.push("/studio/portal");
            return;
          }
          throw new Error("Erro ao carregar arquivos");
        }

        const data = await response.json();
        setFilesData(data);
      } catch (err) {
        console.error("Erro:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchFiles();
  }, [protocol, router]);

  const handleDownload = async (fileId: string, filename: string) => {
    setDownloading(fileId);
    try {
      const response = await fetch(`/api/portal/files/${fileId}/download`);
      
      if (!response.ok) {
        throw new Error("Erro ao fazer download");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      console.error("Erro no download:", err);
      alert("Erro ao fazer download do arquivo");
    } finally {
      setDownloading(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#02040a] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-400">Carregando arquivos...</p>
        </div>
      </div>
    );
  }

  if (!filesData) {
    return (
      <div className="min-h-screen bg-[#02040a] flex items-center justify-center">
        <p className="text-red-400">Erro ao carregar arquivos</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#02040a]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-6">
          <Link
            href={`/studio/portal/${protocol}`}
            className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar ao Dashboard
          </Link>
          <h1 className="text-2xl font-bold text-white">Arquivos do Projeto</h1>
          <p className="text-slate-400 text-sm mt-1">Protocolo: {protocol}</p>
        </div>

        {/* Seção de Arquivos do Projeto */}
        <div className="bg-slate-900/60 backdrop-blur-md border border-indigo-500/30 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-indigo-400" />
              Arquivos do Projeto
            </h2>
            {filesData.final.canDownload ? (
              <span className="px-2 py-1 bg-green-500/20 text-green-300 text-xs font-semibold rounded border border-green-500/30">
                Liberado
              </span>
            ) : (
              <span className="px-2 py-1 bg-red-500/20 text-red-300 text-xs font-semibold rounded border border-red-500/30 flex items-center gap-1">
                <Lock className="w-3 h-3" />
                Bloqueado
              </span>
            )}
          </div>

          {filesData.final.files.length === 0 ? (
            <p className="text-slate-400 text-sm">Nenhum arquivo disponível ainda.</p>
          ) : (
            <div className="space-y-2">
              {/* IMPORTANTE: Mostrar TODOS os arquivos (liberados ou bloqueados) */}
              {filesData.final.files.map((file) => (
                <div
                  key={file.id}
                  className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg border border-slate-700/50"
                >
                  <div className="flex items-center gap-3">
                    {filesData.final.canDownload ? (
                      <CheckCircle2 className="w-5 h-5 text-green-400" />
                    ) : (
                      <Lock className="w-5 h-5 text-red-400" />
                    )}
                    <div>
                      <p className="text-white font-medium">{file.filename}</p>
                      <p className="text-xs text-slate-400">
                        {file.version} • {new Date(file.uploadedAt).toLocaleDateString("pt-BR")}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDownload(file.id, file.filename)}
                    disabled={downloading === file.id || !filesData.final.canDownload}
                    className="px-4 py-2 bg-green-500 hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg text-sm font-semibold transition-colors flex items-center gap-2"
                    title={!filesData.final.canDownload ? "Download bloqueado: saldo pendente ou step não concluído" : ""}
                  >
                    {downloading === file.id ? (
                      "Baixando..."
                    ) : !filesData.final.canDownload ? (
                      <>
                        <Lock className="w-4 h-4" />
                        Bloqueado
                      </>
                    ) : (
                      <>
                        <Download className="w-4 h-4" />
                        Baixar
                      </>
                    )}
                  </button>
                </div>
              ))}
            </div>
          )}
          
          {!filesData.final.canDownload && filesData.final.files.length > 0 && (
            <div className="mt-4 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
              <p className="text-red-300 text-sm">
                Os arquivos serão liberados após o pagamento completo do saldo e conclusão do step correspondente (Final Pronto ou Revisão).
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
