"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock } from "lucide-react";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        router.push("/strategy/admin");
        router.refresh();
      } else {
        setError(data.error || "Senha incorreta");
      }
    } catch (err) {
      setError("Erro ao fazer login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#05070C] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-[#070B14]/70 backdrop-blur-md border border-[rgba(255,255,255,0.08)] rounded-2xl p-8 shadow-lg">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-[rgba(0,184,107,0.16)] rounded-full mb-4">
              <Lock className="w-8 h-8 text-[#00B86B]" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">Admin Editorial</h1>
            <p className="text-slate-400 text-sm">LandSpace Strategy</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-2">
                Senha
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-[#05070C] border border-[rgba(255,255,255,0.08)] rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-[#00B86B]/50 focus:ring-2 focus:ring-[#00B86B]/20 transition-all"
                placeholder="Digite sua senha"
                required
                autoFocus
              />
            </div>

            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-3 bg-[#00B86B] text-white rounded-xl font-semibold hover:bg-[#00A85F] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Entrando..." : "Entrar"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
