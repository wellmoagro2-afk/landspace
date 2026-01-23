import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { HideOnError } from "@/components/shared/HideOnError";

export default function LeadershipSection() {
  return (
    <div className="bg-slate-900/60 backdrop-blur-md border border-purple-500/30 rounded-3xl p-8 md:p-12 shadow-2xl shadow-[0_0_30px_rgba(168,85,247,0.15)] hover:border-purple-500/50 hover:shadow-[0_0_40px_rgba(168,85,247,0.25)] hover:-translate-y-1 transition-all duration-300">
      <div className="text-center mb-8 space-y-4">
        <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
          Liderança Técnica e Científica
        </h2>
        <p className="text-xl text-purple-400 font-semibold">
          Wellmo Alves, PhD - O arquiteto por trás das soluções LandSpace.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8 items-start">
        {/* Foto do Instrutor */}
        <div className="flex-shrink-0 mx-auto md:mx-0">
          <div className="relative w-40 h-40 rounded-full overflow-hidden border-2 border-purple-500/20 ring-2 ring-purple-500/50 ring-offset-2 ring-offset-slate-950 shadow-lg hover:ring-purple-500/80 hover:ring-4 hover:scale-105 transition-all duration-300">
            <HideOnError>
              {({ hidden, onError }) => (
                <Image
                  src="/perfil.jpg"
                  alt="Wellmo Alves, PhD em Geografia e especialista em Análise Ambiental e Automação Geoespacial"
                  fill
                  className={`object-cover ${hidden ? 'hidden' : ''}`}
                  onError={onError}
                />
              )}
            </HideOnError>
          </div>
        </div>

        {/* Bio */}
        <div className="flex-1 space-y-6 text-center md:text-left">
          <div>
            <p className="text-lg text-slate-300 leading-relaxed mb-4">
              Doutor e Mestre em Geografia (UFG), Especialista em Geoprocessamento (UFV) e Perícia Forense - com ênfase em Inteligência Geoespacial (IPOG). Engenheiro Agrônomo (IFGoiano) e Geógrafo (CREA/GO).
            </p>

            {/* Registros Oficiais */}
            <div className="flex items-center gap-2 mb-6 text-sm text-slate-400 justify-center md:justify-start">
              <CheckCircle2 className="w-4 h-4 text-purple-400 flex-shrink-0 drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]" />
              <span>Registro Profissional: CREA 21947/D-GO | RNP 1005596280</span>
            </div>

            <p className="text-lg text-slate-300 leading-relaxed mb-6">
              Cada <strong className="text-white font-semibold">solução, modelo e automação</strong> foi desenvolvida e validada com rigor científico, 
              garantindo que você trabalhe com ferramentas que realmente funcionam no mercado.
            </p>
          </div>

          {/* Grid de Stats - Dark Tech Dashboard */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6 border-t border-white/10">
            <div className="text-center md:text-left">
              <div className="text-3xl font-bold bg-gradient-to-r from-white to-purple-400 bg-clip-text text-transparent mb-1">39+</div>
              <div className="text-sm text-slate-400">Artigos Científicos</div>
            </div>
            <div className="text-center md:text-left">
              <div className="text-3xl font-bold bg-gradient-to-r from-white to-purple-400 bg-clip-text text-transparent mb-1">100+</div>
              <div className="text-sm text-slate-400">Trabalhos em Congressos</div>
            </div>
            <div className="text-center md:text-left">
              <div className="text-3xl font-bold bg-gradient-to-r from-white to-purple-400 bg-clip-text text-transparent mb-1">8</div>
              <div className="text-sm text-slate-400">Prêmios | 3x 1º Lugar</div>
            </div>
            <div className="text-center md:text-left">
              <div className="text-3xl font-bold bg-gradient-to-r from-white to-purple-400 bg-clip-text text-transparent mb-1">18</div>
              <div className="text-sm text-slate-400">Capítulos Técnicos</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
