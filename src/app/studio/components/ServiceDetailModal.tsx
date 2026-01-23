"use client";

import { X } from "lucide-react";
import { StudioService } from "../studio.data";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";

interface ServiceDetailModalProps {
  service: StudioService | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ServiceDetailModal({ service, isOpen, onClose }: ServiceDetailModalProps) {
  if (!isOpen || !service) return null;

  const packageLevels = [
    { key: 'essential', label: 'Essencial', color: 'bg-slate-700' },
    { key: 'professional', label: 'Profissional', color: 'bg-indigo-600' },
    { key: 'premium', label: 'Premium', color: 'bg-indigo-800' }
  ] as const;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-slate-900 rounded-2xl border border-indigo-500/20 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-slate-900/95 backdrop-blur-sm border-b border-indigo-500/20 p-6 flex items-start justify-between">
          <div className="flex-1">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">{service.title}</h2>
            <p className="text-slate-300">{service.description}</p>
          </div>
          <button
            onClick={onClose}
            className="ml-4 p-2 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
            aria-label="Fechar"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-8">
          {/* Entregáveis principais */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Entregáveis principais</h3>
            <ul className="space-y-2">
              {service.bullets.map((bullet, idx) => (
                <li key={idx} className="flex items-start gap-2 text-slate-300">
                  <span className="text-indigo-400 mt-1">•</span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Pacotes */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Pacotes disponíveis</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {packageLevels.map(({ key, label, color }) => {
                const pkg = service.packages[key as keyof typeof service.packages];
                if (!pkg) return null;

                return (
                  <Card key={key} className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Badge className={`${color} text-white`}>{label}</Badge>
                      </div>
                      
                      <div className="space-y-3 text-sm">
                        <div>
                          <span className="text-slate-400">Mapas:</span>
                          <p className="text-white font-medium">{pkg.maps}</p>
                        </div>
                        <div>
                          <span className="text-slate-400">Relatório:</span>
                          <p className="text-white font-medium">{pkg.report}</p>
                        </div>
                        <div>
                          <span className="text-slate-400">Prazo:</span>
                          <p className="text-white font-medium">{pkg.deadline}</p>
                        </div>
                        <div>
                          <span className="text-slate-400">Revisões:</span>
                          <p className="text-white font-medium">{pkg.revisions}</p>
                        </div>

                        {pkg.deliverables && (
                          <div>
                            <span className="text-slate-400 block mb-2">Entregáveis:</span>
                            <ul className="space-y-1">
                              {pkg.deliverables.map((item, idx) => (
                                <li key={idx} className="text-slate-300 text-xs flex items-start gap-1">
                                  <span className="text-indigo-400 mt-0.5">•</span>
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {pkg.dataRequirements && (
                          <div>
                            <span className="text-slate-400 block mb-2">Dados mínimos:</span>
                            <ul className="space-y-1">
                              {pkg.dataRequirements.map((item, idx) => (
                                <li key={idx} className="text-slate-300 text-xs flex items-start gap-1">
                                  <span className="text-indigo-400 mt-0.5">•</span>
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* FAQ */}
          {service.faq && service.faq.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Perguntas frequentes</h3>
              <div className="space-y-3">
                {service.faq.map((item, idx) => (
                  <Card key={idx} className="p-4">
                    <h4 className="text-white font-medium mb-2">{item.question}</h4>
                    <p className="text-slate-300 text-sm">{item.answer}</p>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-slate-900/95 backdrop-blur-sm border-t border-indigo-500/20 p-6">
          <a
            href={`/studio/orcamento?service=${service.id}`}
            className="block w-full text-center px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold transition-colors"
          >
            Solicitar protocolo de projeto
          </a>
        </div>
      </div>
    </div>
  );
}
