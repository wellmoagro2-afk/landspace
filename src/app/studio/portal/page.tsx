"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Lock, ArrowRight, ArrowLeft } from "lucide-react";

export default function PortalLoginPage() {
  const router = useRouter();
  const [protocol, setProtocol] = useState("");
  const [pin, setPin] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [errorType, setErrorType] = useState<"PROTOCOL_NOT_FOUND" | "INVALID_PIN" | "UNKNOWN_ERROR" | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setErrorType(null);

    try {
      // Normalizar protocol e PIN antes de enviar
      const normalizedProtocol = protocol.trim().toUpperCase();
      const normalizedPin = pin.trim();

      const response = await fetch("/api/portal/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          protocol: normalizedProtocol, 
          pin: normalizedPin 
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        const errorMsg = data.error || "Erro ao fazer login";
        console.error('[Portal Login] Erro na resposta:', {
          status: response.status,
          error: errorMsg,
          errorType: data.errorType,
          data: data,
        });
        
        setError(errorMsg);
        setErrorType(data.errorType || null);
        setLoading(false);
        // Manter o erro visível - não limpar automaticamente
        return;
      }

      // Redirecionar para dashboard do projeto
      router.push(`/studio/portal/${normalizedProtocol}`);
    } catch (err) {
      setError("Erro ao conectar com o servidor. Verifique sua conexão e tente novamente.");
      setErrorType("UNKNOWN_ERROR");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#02040a] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Botão Voltar */}
        <div className="mb-4">
          <Link
            href="/studio"
            className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </Link>
        </div>
        
        <div className="bg-slate-900/60 backdrop-blur-md border border-indigo-500/30 rounded-2xl p-8 shadow-xl">
          {/* Logo/Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-indigo-500/10 border border-indigo-500/20 mb-4">
              <Lock className="w-8 h-8 text-indigo-400" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">
              Portal do Cliente
            </h1>
            <p className="text-sm text-slate-400">
              Acesse seu projeto com Protocolo e PIN
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Protocolo
              </label>
              <input
                type="text"
                value={protocol}
                onChange={(e) => {
                  const value = e.target.value.toUpperCase().trim();
                  setProtocol(value);
                  // Limpar erro apenas quando o usuário começar a digitar novamente
                  if (error && value !== protocol) {
                    setError("");
                    setErrorType(null);
                  }
                }}
                placeholder="LS-2026-000123"
                className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                required
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                PIN
              </label>
              <input
                type="password"
                value={pin}
                onChange={(e) => {
                  const value = e.target.value.trim();
                  setPin(value);
                  // Limpar erro apenas quando o usuário começar a digitar novamente
                  if (error && value !== pin) {
                    setError("");
                    setErrorType(null);
                  }
                }}
                placeholder="••••••"
                className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                required
                disabled={loading}
                maxLength={6}
              />
            </div>

            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-0.5">
                    <svg className="w-5 h-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-red-400 mb-1">{error}</p>
                    {errorType === "PROTOCOL_NOT_FOUND" && (
                      <p className="text-xs text-red-300/80 mt-2">
                        Dica: Verifique se copiou o protocolo completo, incluindo hífens (ex: LS-2026-000123)
                      </p>
                    )}
                    {errorType === "INVALID_PIN" && (
                      <p className="text-xs text-red-300/80 mt-2">
                        Dica: O PIN deve ter exatamente 6 dígitos. Verifique se não há espaços antes ou depois.
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => {
                      setError("");
                      setErrorType(null);
                    }}
                    className="flex-shrink-0 text-red-400/60 hover:text-red-400 transition-colors"
                    aria-label="Fechar erro"
                    type="button"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-3 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-indigo-500/30 transition-all duration-200 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                "Entrando..."
              ) : (
                <>
                  Acessar Portal
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-xs text-slate-500">
              Problemas para acessar? Entre em contato com o suporte.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
