"use client";

import { useState } from "react";
import { Shield, ArrowRight, CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ConsultancyPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    nomeCompleto: "",
    cargo: "",
    instituicao: "",
    areaInteresse: "",
    descricaoDemanda: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Enviar para API
      const response = await fetch('/api/strategy/consultancy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Erro ao enviar formulário');
      }

      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // Reset form após 5 segundos
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          nomeCompleto: "",
          cargo: "",
          instituicao: "",
          areaInteresse: "",
          descricaoDemanda: "",
        });
      }, 5000);
    } catch (error) {
      console.error("Erro ao enviar formulário:", error);
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const areasInteresse = [
    "Petróleo e Energia",
    "Água e Recursos Hídricos",
    "Soberania e Fronteiras",
    "Monitoramento de Ativos",
    "Agricultura e Segurança Alimentar",
    "Mudanças Climáticas",
    "Infraestrutura e Logística",
    "Outro",
  ];

  return (
    <div className="min-h-screen bg-[#05070C] relative" data-variant="strategy">
      {/* Grid Pattern Sutil */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-0 grid-pattern-emerald-lg"></div>

      <main className="relative z-10 py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header da Página */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center gap-3 mb-6">
              <Shield className="w-12 h-12 text-[#00B86B] consultancy-icon-glow-lg" />
              <h1 className="text-3xl md:text-4xl font-mono font-semibold tracking-wider text-[#00B86B] consultancy-title-glow">
                CONSULTORIA ESTRATÉGICA
              </h1>
            </div>
            <p className="text-lg text-[rgba(255,255,255,0.75)] max-w-2xl mx-auto consultancy-line-height-relaxed">
              Protocolo de diagnóstico geoespacial customizado. Preencha os campos abaixo para iniciar o processo de qualificação.
            </p>
          </div>

          {/* Formulário */}
          {!isSubmitted ? (
            <form 
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              {/* Card Glassmorphism */}
              <div className="backdrop-blur-xl border rounded-2xl p-8 md:p-12 consultancy-glass-card-simple">
                {/* Nome Completo e Cargo */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label 
                      htmlFor="nomeCompleto"
                      className="block text-sm font-mono font-medium mb-2 text-[#00B86B]"
                    >
                      Nome Completo *
                    </label>
                    <input
                      type="text"
                      id="nomeCompleto"
                      name="nomeCompleto"
                      value={formData.nomeCompleto}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-[#070B14]/60 backdrop-blur-sm border border-[rgba(255,255,255,0.08)] rounded-xl text-[rgba(255,255,255,0.92)] placeholder-[rgba(255,255,255,0.46)] focus:outline-none focus:border-[#00B86B]/50 focus:ring-2 focus:ring-[#00B86B]/20 transition-all duration-300"
                      placeholder="Seu nome completo"
                    />
                  </div>
                  <div>
                    <label 
                      htmlFor="cargo"
                      className="block text-sm font-mono font-medium mb-2 text-[#00B86B]"
                    >
                      Cargo *
                    </label>
                    <input
                      type="text"
                      id="cargo"
                      name="cargo"
                      value={formData.cargo}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-[#070B14]/60 backdrop-blur-sm border border-[rgba(255,255,255,0.08)] rounded-xl text-[rgba(255,255,255,0.92)] placeholder-[rgba(255,255,255,0.46)] focus:outline-none focus:border-[#00B86B]/50 focus:ring-2 focus:ring-[#00B86B]/20 transition-all duration-300"
                      placeholder="Seu cargo/função"
                    />
                  </div>
                </div>

                {/* Instituição / Empresa */}
                <div className="mb-6">
                  <label 
                    htmlFor="instituicao"
                    className="block text-sm font-mono font-medium mb-2 text-[#00B86B]"
                  >
                    Instituição / Empresa *
                  </label>
                  <input
                    type="text"
                    id="instituicao"
                    name="instituicao"
                    value={formData.instituicao}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-[#070B14]/60 backdrop-blur-sm border border-[rgba(255,255,255,0.08)] rounded-xl text-[rgba(255,255,255,0.92)] placeholder-[rgba(255,255,255,0.46)] focus:outline-none focus:border-[#00B86B]/50 focus:ring-2 focus:ring-[#00B86B]/20 transition-all duration-300"
                    placeholder="Nome da instituição ou empresa"
                  />
                </div>

                {/* Área de Interesse */}
                <div className="mb-6">
                  <label 
                    htmlFor="areaInteresse"
                    className="block text-sm font-mono font-medium mb-2 text-[#00B86B]"
                  >
                    Área de Interesse *
                  </label>
                  <select
                    id="areaInteresse"
                    name="areaInteresse"
                    value={formData.areaInteresse}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-[#070B14]/60 backdrop-blur-sm border border-[rgba(255,255,255,0.08)] rounded-xl text-[rgba(255,255,255,0.92)] focus:outline-none focus:border-[#00B86B]/50 focus:ring-2 focus:ring-[#00B86B]/20 transition-all duration-300"
                  >
                    <option value="" className="bg-[#070B14]">Selecione uma área</option>
                    {areasInteresse.map((area) => (
                      <option key={area} value={area} className="bg-[#070B14]">
                        {area}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Descrição da Demanda Estratégica */}
                <div className="mb-8">
                  <label 
                    htmlFor="descricaoDemanda"
                    className="block text-sm font-mono font-medium mb-2 text-[#00B86B]"
                  >
                    Descrição da Demanda Estratégica *
                  </label>
                  <textarea
                    id="descricaoDemanda"
                    name="descricaoDemanda"
                    value={formData.descricaoDemanda}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-[#070B14]/60 backdrop-blur-sm border border-[rgba(255,255,255,0.08)] rounded-xl text-[rgba(255,255,255,0.92)] placeholder-[rgba(255,255,255,0.46)] focus:outline-none focus:border-[#00B86B]/50 focus:ring-2 focus:ring-[#00B86B]/20 transition-all duration-300 resize-none"
                    placeholder="Descreva brevemente sua demanda estratégica, objetivos e contexto..."
                  />
                </div>

                {/* Botão de Envio */}
                <div className="flex justify-center">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group inline-flex items-center gap-3 px-10 py-4 bg-[#00B86B] text-white rounded-xl font-semibold text-base shadow-lg hover:bg-[#00A85F] hover:shadow-[#00B86B]/50 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 consultancy-button-shadow"
                  >
                    {isSubmitting ? (
                      <>
                        <span>Processando...</span>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      </>
                    ) : (
                      <>
                        <span>ENVIAR PROTOCOLO</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          ) : (
            /* Mensagem de Sucesso */
            <div className="backdrop-blur-xl border rounded-2xl p-12 md:p-16 text-center consultancy-glass-card-success">
              <CheckCircle2 className="w-16 h-16 text-[#00B86B] mx-auto mb-6 consultancy-icon-glow-lg" />
              <h2 className="text-2xl md:text-3xl font-mono font-semibold mb-4 text-[#00B86B]">
                PROTOCOLO REGISTRADO
              </h2>
              <p className="text-lg text-[rgba(255,255,255,0.85)] max-w-2xl mx-auto consultancy-line-height-relaxed">
                Nossa unidade de inteligência entrará em contato via canais oficiais.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
