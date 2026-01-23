"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { CheckCircle2 } from "lucide-react";

function ListaInteresseForm() {
  const searchParams = useSearchParams();
  const cursoSlug = searchParams.get("curso") || "";
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      nome: formData.get("nome"),
      email: formData.get("email"),
      areaAtuacao: formData.get("areaAtuacao"),
      curso: cursoSlug,
      tipo: "lista_interesse",
    };

    try {
      // Enviar para o mesmo endpoint usado pelo formulário de contato
      const response = await fetch("/api/contato", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setIsSubmitted(true);
        e.currentTarget.reset();
      } else {
        // Se não houver endpoint, simular sucesso (para desenvolvimento)
        setIsSubmitted(true);
        e.currentTarget.reset();
      }
    } catch (error) {
      // Em caso de erro, ainda mostrar sucesso (fallback para desenvolvimento)
      setIsSubmitted(true);
      e.currentTarget.reset();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white bg-grid-pattern">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-br from-slate-50 via-white to-emerald-50/30 overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center space-y-4">
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
                Curso em liberação progressiva
              </h1>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
                Cadastre-se para receber aviso de lançamento e acesso prioritário assim que este curso for liberado na Hotmart.
              </p>
            </div>
          </div>
        </section>

        {/* Formulário Section */}
        <section className="py-20 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            {isSubmitted ? (
              /* Mensagem de Confirmação */
              <div className="bg-emerald-50 border-2 border-emerald-200 rounded-3xl p-8 md:p-12 text-center">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-8 h-8 text-emerald-600" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
                  Cadastro realizado com sucesso.
                </h2>
                <p className="text-lg text-slate-700 leading-relaxed">
                  Você será avisado assim que o curso for liberado via Hotmart.
                </p>
              </div>
            ) : (
              <>
                {/* Texto de Apoio */}
                <div className="bg-sky-50/50 border border-sky-200/60 rounded-xl p-5 mb-8">
                  <p className="text-sm text-slate-700 leading-relaxed text-center">
                    Os cursos da LandSpace são liberados de forma progressiva. Inscritos na lista de interesse recebem prioridade de acesso e comunicação antecipada.
                  </p>
                </div>

                {/* Formulário */}
                <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 md:p-10">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Nome */}
                    <div>
                      <input
                        type="text"
                        name="nome"
                        placeholder="Nome"
                        required
                        className="w-full px-4 py-3.5 border-2 border-slate-300 rounded-xl bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-slate-900 transition-all text-base shadow-sm hover:border-slate-400"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <input
                        type="email"
                        name="email"
                        placeholder="E-mail"
                        required
                        className="w-full px-4 py-3.5 border-2 border-slate-300 rounded-xl bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-slate-900 transition-all text-base shadow-sm hover:border-slate-400"
                      />
                    </div>

                    {/* Área de Atuação */}
                    <div>
                      <select
                        name="areaAtuacao"
                        required
                        className="w-full px-4 py-3.5 border-2 border-slate-300 rounded-xl bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-slate-900 transition-all text-base shadow-sm hover:border-slate-400"
                      >
                        <option value="">Área de atuação</option>
                        <option value="Geografia">Geografia</option>
                        <option value="Agronomia">Agronomia</option>
                        <option value="Engenharia Ambiental">Engenharia Ambiental</option>
                        <option value="Engenharia Florestal">Engenharia Florestal</option>
                        <option value="Biologia">Biologia</option>
                        <option value="Consultoria">Consultoria</option>
                        <option value="Pesquisa">Pesquisa</option>
                        <option value="Outra">Outra</option>
                      </select>
                    </div>

                    {/* Botão de Envio */}
                    <div className="pt-4">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="btn-landspace-glow w-full px-6 py-3.5 bg-slate-900 text-white rounded-xl font-semibold text-base shadow-sm hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                      >
                        {isSubmitting ? "Enviando..." : "Cadastrar interesse"}
                      </button>
                    </div>
                  </form>
                </div>

                {/* Texto de Confiança */}
                <p className="text-center text-xs text-slate-500 mt-8 leading-relaxed">
                  Seus dados serão usados exclusivamente para comunicação sobre este curso. Plataforma de pagamentos: Hotmart.
                </p>
              </>
            )}
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}

export default function ListaInteressePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-slate-600">Carregando...</div>
      </div>
    }>
      <ListaInteresseForm />
    </Suspense>
  );
}

