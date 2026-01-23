"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";

export default function NewProjectPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    clientName: "",
    clientEmail: "",
    clientPhone: "",
    serviceType: "OUTROS",
    totalValue: "",
    entryValue: "",
  });
  const [createdProject, setCreatedProject] = useState<{ id: string; protocol: string; pin: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/admin/portal/project", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Erro ao criar projeto");
        setLoading(false);
        return;
      }

      setCreatedProject({
        id: data.project.id,
        protocol: data.project.protocol,
        pin: data.project.pin,
      });
    } catch (err) {
      console.error("Erro:", err);
      alert("Erro ao criar projeto");
      setLoading(false);
    }
  };

  if (createdProject) {
    return (
      <div className="min-h-screen bg-[#02040a] flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="bg-slate-900/60 backdrop-blur-md border border-green-500/30 rounded-2xl p-8">
            <h2 className="text-xl font-bold text-white mb-4">Projeto Criado!</h2>
            <div className="space-y-3 mb-6">
              <div>
                <p className="text-sm text-slate-400 mb-1">Protocolo</p>
                <p className="text-lg font-mono font-bold text-white">{createdProject.protocol}</p>
              </div>
              <div>
                <p className="text-sm text-slate-400 mb-1">PIN</p>
                <p className="text-lg font-mono font-bold text-indigo-400">{createdProject.pin}</p>
              </div>
              <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg mt-4">
                <p className="text-xs text-amber-300">
                  ⚠️ Anote o PIN! Ele não será exibido novamente.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <Link
                href="/studio/admin"
                className="flex-1 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-sm font-semibold transition-colors text-center"
              >
                Voltar
              </Link>
              <Link
                href={`/studio/admin/project/${createdProject.id}`}
                className="flex-1 px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg text-sm font-semibold transition-colors text-center"
              >
                Ver Projeto
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#02040a]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          href="/studio/admin"
          className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar
        </Link>

        <div className="bg-slate-900/60 backdrop-blur-md border border-indigo-500/30 rounded-2xl p-8">
          <h1 className="text-2xl font-bold text-white mb-6">Novo Projeto</h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Nome do Cliente *
              </label>
              <input
                type="text"
                value={formData.clientName}
                onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Email do Cliente
              </label>
              <input
                type="email"
                value={formData.clientEmail}
                onChange={(e) => setFormData({ ...formData, clientEmail: e.target.value })}
                className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Telefone do Cliente
              </label>
              <input
                type="tel"
                value={formData.clientPhone}
                onChange={(e) => setFormData({ ...formData, clientPhone: e.target.value })}
                className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Tipo de Serviço *
              </label>
              <select
                value={formData.serviceType}
                onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white focus:outline-none focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                required
              >
                <option value="PERICIA_EVIDENCIAS">Perícia e Evidências</option>
                <option value="PERICIA_AMBIENTAL">Perícia Ambiental</option>
                <option value="AVALIACAO_RURAL">Avaliação Rural</option>
                <option value="CAR">CAR</option>
                <option value="GEOREF">Georreferenciamento</option>
                <option value="OUTROS">Outros</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Valor Total (R$) *
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.totalValue}
                  onChange={(e) => setFormData({ ...formData, totalValue: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Valor de Entrada (R$) *
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.entryValue}
                  onChange={(e) => setFormData({ ...formData, entryValue: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-3 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-indigo-500/30 transition-all duration-200 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                "Criando..."
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Criar Projeto
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
