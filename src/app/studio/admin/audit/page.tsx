"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Search, Filter, CheckCircle2, XCircle, Clock } from "lucide-react";

interface AuditLog {
  id: string;
  requestId: string | null;
  userId: string | null;
  protocol: string | null;
  action: string;
  entityType: string | null;
  entityId: string | null;
  metadata: any;
  ipAddress: string | null;
  userAgent: string | null;
  success: boolean;
  errorMessage: string | null;
  createdAt: string;
}

export default function AdminAuditPage() {
  const router = useRouter();
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchAction, setSearchAction] = useState("");
  const [searchProtocol, setSearchProtocol] = useState("");

  useEffect(() => {
    async function fetchLogs() {
      try {
        const params = new URLSearchParams();
        if (searchAction) params.append('action', searchAction);
        if (searchProtocol) params.append('protocol', searchProtocol);

        const response = await fetch(`/api/admin/portal/audit?${params.toString()}`);
        
        if (!response.ok) {
          if (response.status === 401) {
            router.push("/studio/admin/login");
            return;
          }
          throw new Error("Erro ao carregar logs");
        }

        const data = await response.json();
        setLogs(data.logs);
      } catch (err) {
        console.error("Erro:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchLogs();
  }, [router, searchAction, searchProtocol]);

  const formatAction = (action: string) => {
    return action
      .replace(/_/g, ' ')
      .replace(/\b\w/g, (l) => l.toUpperCase());
  };

  return (
    <div className="min-h-screen bg-[#02040a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-6">
          <Link
            href="/studio/admin"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </Link>
          <h1 className="text-2xl font-bold text-white">Logs de Auditoria</h1>
          <p className="text-slate-400 text-sm mt-1">Registro de eventos do Portal do Cliente</p>
        </div>

        {/* Filtros */}
        <div className="bg-slate-900/60 backdrop-blur-md border border-indigo-500/30 rounded-xl p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Filtrar por Ação
              </label>
              <input
                type="text"
                value={searchAction}
                onChange={(e) => setSearchAction(e.target.value)}
                placeholder="Ex: portal_login_success"
                className="w-full px-4 py-2 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Filtrar por Protocolo
              </label>
              <input
                type="text"
                value={searchProtocol}
                onChange={(e) => setSearchProtocol(e.target.value.toUpperCase())}
                placeholder="Ex: LS-2026-000123"
                className="w-full px-4 py-2 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 transition-all"
              />
            </div>
          </div>
        </div>

        {/* Lista de Logs */}
        {loading ? (
          <div className="text-center py-12">
            <div className="w-12 h-12 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-slate-400">Carregando logs...</p>
          </div>
        ) : logs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-slate-400">Nenhum log encontrado</p>
          </div>
        ) : (
          <div className="space-y-3">
            {logs.map((log) => (
              <div
                key={log.id}
                className="bg-slate-900/60 backdrop-blur-md border border-indigo-500/30 rounded-xl p-4 hover:border-indigo-500/50 transition-all"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-3">
                    {log.success ? (
                      <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                    )}
                    <div>
                      <h3 className="text-white font-semibold">{formatAction(log.action)}</h3>
                      {log.protocol && (
                        <p className="text-sm text-indigo-400 font-mono">{log.protocol}</p>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-slate-400">
                      {new Date(log.createdAt).toLocaleString('pt-BR')}
                    </p>
                    {log.requestId && (
                      <p className="text-xs text-slate-500 font-mono mt-1">
                        {log.requestId.substring(0, 8)}...
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm mt-3">
                  {log.ipAddress && (
                    <div>
                      <span className="text-slate-400">IP:</span>
                      <span className="text-slate-300 ml-2">{log.ipAddress}</span>
                    </div>
                  )}
                  {log.entityType && log.entityId && (
                    <div>
                      <span className="text-slate-400">Entidade:</span>
                      <span className="text-slate-300 ml-2">
                        {log.entityType} ({log.entityId.substring(0, 8)}...)
                      </span>
                    </div>
                  )}
                </div>

                {log.errorMessage && (
                  <div className="mt-2 p-2 bg-red-500/10 border border-red-500/30 rounded text-sm text-red-300">
                    {log.errorMessage}
                  </div>
                )}

                {log.metadata && Object.keys(log.metadata).length > 0 && (
                  <details className="mt-2">
                    <summary className="text-sm text-slate-400 cursor-pointer hover:text-slate-300">
                      Ver detalhes
                    </summary>
                    <pre className="mt-2 p-2 bg-slate-800/50 rounded text-xs text-slate-300 overflow-x-auto">
                      {JSON.stringify(log.metadata, null, 2)}
                    </pre>
                  </details>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
