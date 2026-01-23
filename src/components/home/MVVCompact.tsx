import { Target, Eye, CheckCircle2 } from "lucide-react";

const values = [
  "Rigor técnico",
  "Reprodutibilidade",
  "Rastreabilidade",
  "Transparência",
  "Segurança",
  "Educação",
];

export default function MVVCompact() {
  return (
    <section className="py-20 md:py-24 bg-slate-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900/30 backdrop-blur-sm border border-slate-800/50 rounded-2xl p-8 md:p-12 space-y-8">
          {/* Missão */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Target className="w-5 h-5 flex-shrink-0 text-[#9fb7c9]" />
              <h3 className="text-lg font-bold text-white">Missão</h3>
            </div>
            <p className="text-base text-slate-300 leading-relaxed pl-8">
              Acelerar decisões e operações geoespaciais com automação, inteligência e validação contínua.
            </p>
          </div>

          {/* Visão */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Eye className="w-5 h-5 flex-shrink-0 text-[#9fb7c9]" />
              <h3 className="text-lg font-bold text-white">Visão</h3>
            </div>
            <p className="text-base text-slate-300 leading-relaxed pl-8">
              Ser referência em uma plataforma geoespacial escalável — de pesquisa aplicada à entrega — para cenários complexos.
            </p>
          </div>

          {/* Valores */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-[#9fb7c9]" />
              <h3 className="text-lg font-bold text-white">Valores</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pl-8">
              {values.map((value, idx) => (
                <div key={idx} className="flex items-center gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 bg-[#9fb7c9]"></div>
                  <span className="text-sm text-slate-300 leading-relaxed">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
