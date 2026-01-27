"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";

// Serviços conforme organização do MD
const allServiceOptions = [
  { id: 'urbano', title: 'Planejamento Urbano e Plano Diretor' },
  { id: 'zee', title: 'ZEE e Ordenamento Territorial' },
  { id: 'bacias', title: 'Bacias Hidrográficas e Conservação' },
  { id: 'riscos', title: 'Riscos Climáticos e Agroclima' },
  { id: 'aptidao', title: 'Aptidão Agrícola (integrada)' },
  { id: 'precisao', title: 'Agricultura de precisão (zonas de manejo e VRA)' },
  { id: 'florestal', title: 'Florestal e restauração' },
  { id: 'drone', title: 'Drone e fotogrametria' },
  { id: 'lulc', title: 'Monitoramento e Mudanças de Uso e Cobertura do Solo (LULC)' },
  { id: 'zoneamento-ambiental', title: 'Mapeamento de APP, RL e Áreas Protegidas' },
  { id: 'fragilidade', title: 'Análise de Fragilidade Ambiental' },
  { id: 'eia-rima', title: 'Suporte Cartográfico para EIA-RIMA/AIA' },
  { id: 'deslizamentos', title: 'Riscos Geológicos e Suscetibilidade a Deslizamentos' },
  { id: 'areas-degradadas', title: 'Áreas Degradadas e Priorização de Recuperação' },
  { id: 'recursos-hidricos', title: 'Recursos Hídricos: Qualidade e Disponibilidade' },
  { id: 'car', title: 'Cadastro Ambiental Rural (CAR)' },
  { id: 'georreferenciamento', title: 'Georreferenciamento de Imóveis Rurais' },
];
import { CheckCircle2, Upload, FileText, Map, Calendar, Database, Ruler, User, Mail, Building, MessageSquare } from "lucide-react";

export default function OrcamentoPage() {
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState({
    serviceType: '',
    area: '',
    areaFile: null as File | null,
    objective: '',
    desiredDeadline: '',
    limitDeadline: '',
    availableData: [] as string[],
    dataFiles: null as File | null,
    scale: '',
    detailLevel: '',
    name: '',
    email: '',
    institution: '',
    whatsapp: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [areaFilePreview, setAreaFilePreview] = useState<string | null>(null);
  const [dataFilesPreview, setDataFilesPreview] = useState<string | null>(null);

  // Helper para agendar callbacks assíncronos
  const defer = (cb: () => void) => {
    if (typeof queueMicrotask === "function") queueMicrotask(cb);
    else setTimeout(cb, 0);
  };

  // Pré-selecionar serviço via querystring
  useEffect(() => {
    const serviceId = searchParams.get('service');
    if (serviceId) {
      // Verificar se o serviceId existe nas opções
      const service = allServiceOptions.find(s => s.id === serviceId);
      if (service) {
        defer(() => setFormData(prev => ({ ...prev, serviceType: serviceId })));
      }
    }
  }, [searchParams]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      availableData: prev.availableData.includes(value)
        ? prev.availableData.filter(item => item !== value)
        : [...prev.availableData, value]
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'area' | 'data') => {
    const file = e.target.files?.[0];
    if (file) {
      if (type === 'area') {
        setFormData(prev => ({ ...prev, areaFile: file }));
        setAreaFilePreview(file.name);
      } else {
        setFormData(prev => ({ ...prev, dataFiles: file }));
        setDataFilesPreview(file.name);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simular envio (substituir por API real)
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-[#02040a] relative" data-variant="studio">
        <Header variant="studio" />
        <main className="relative z-10 py-24">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Card className="p-12" glass>
              <CheckCircle2 className="w-16 h-16 text-indigo-400 mx-auto mb-6" />
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Protocolo registrado
              </h1>
              <p className="text-lg text-slate-300 mb-8">
                Nossa unidade de inteligência entrará em contato via canais oficiais.
              </p>
              <Button
                onClick={() => window.location.href = '/studio'}
                variant="primary"
                size="lg"
                className="bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600"
              >
                Voltar ao Studio
              </Button>
            </Card>
          </div>
        </main>
        <Footer variant="studio" />
        <WhatsAppButton />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#02040a] relative" data-variant="studio">
      <Header variant="studio" />
      <main className="relative z-10 py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Solicite orçamento com briefing técnico rápido"
            subtitle="Defina área, objetivo e prazo. Nós respondemos com pacote recomendado, cronograma e escopo fechado."
          />

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Tipo de Projeto */}
            <Card className="p-6" glass>
              <div className="flex items-center gap-3 mb-4">
                <Map className="w-5 h-5 text-indigo-400" />
                <label className="text-lg font-semibold text-white">Tipo de Projeto</label>
              </div>
              <select
                name="serviceType"
                value={formData.serviceType}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 bg-slate-900/50 border border-white/10 rounded-xl text-white focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all"
              >
                <option value="">Selecione um serviço</option>
                {allServiceOptions.map(service => (
                  <option key={service.id} value={service.id}>{service.title}</option>
                ))}
              </select>
            </Card>

            {/* Área */}
            <Card className="p-6" glass>
              <div className="flex items-center gap-3 mb-4">
                <Ruler className="w-5 h-5 text-indigo-400" />
                <label className="text-lg font-semibold text-white">Área de Estudo</label>
              </div>
              <div className="space-y-4">
                <textarea
                  name="area"
                  value={formData.area}
                  onChange={handleInputChange}
                  placeholder="Descreva a área ou cole link (Google Maps, KML, etc.)"
                  rows={3}
                  className="w-full px-4 py-3 bg-slate-900/50 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all resize-none"
                />
                <div>
                  <label className="block text-sm text-slate-300 mb-2">Ou faça upload (GeoJSON, KML, Shapefile)</label>
                  <label className="flex items-center gap-3 px-4 py-3 bg-slate-900/50 border border-white/10 rounded-xl cursor-pointer hover:border-indigo-500/50 transition-all">
                    <Upload className="w-5 h-5 text-indigo-400" />
                    <span className="text-slate-300 text-sm">
                      {areaFilePreview || 'Selecionar arquivo'}
                    </span>
                    <input
                      type="file"
                      accept=".geojson,.kml,.kmz,.shp,.zip"
                      onChange={(e) => handleFileChange(e, 'area')}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            </Card>

            {/* Objetivo Decisório */}
            <Card className="p-6" glass>
              <div className="flex items-center gap-3 mb-4">
                <FileText className="w-5 h-5 text-indigo-400" />
                <label className="text-lg font-semibold text-white">Objetivo Decisório</label>
              </div>
              <textarea
                name="objective"
                value={formData.objective}
                onChange={handleInputChange}
                placeholder="Descreva o objetivo do projeto e a decisão que precisa ser tomada com base nos mapas..."
                rows={5}
                required
                className="w-full px-4 py-3 bg-slate-900/50 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all resize-none"
              />
            </Card>

            {/* Prazos */}
            <Card className="p-6" glass>
              <div className="flex items-center gap-3 mb-4">
                <Calendar className="w-5 h-5 text-indigo-400" />
                <label className="text-lg font-semibold text-white">Prazos</label>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-slate-300 mb-2">Prazo Desejado</label>
                  <input
                    type="date"
                    name="desiredDeadline"
                    value={formData.desiredDeadline}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-slate-900/50 border border-white/10 rounded-xl text-white focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm text-slate-300 mb-2">Prazo Limite</label>
                  <input
                    type="date"
                    name="limitDeadline"
                    value={formData.limitDeadline}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-slate-900/50 border border-white/10 rounded-xl text-white focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all"
                  />
                </div>
              </div>
            </Card>

            {/* Dados Disponíveis */}
            <Card className="p-6" glass>
              <div className="flex items-center gap-3 mb-4">
                <Database className="w-5 h-5 text-indigo-400" />
                <label className="text-lg font-semibold text-white">Dados Disponíveis</label>
              </div>
              <div className="space-y-3">
                {[
                  'DEM/MDT',
                  'Uso e Cobertura do Solo',
                  'Dados de Solos',
                  'Dados Climáticos',
                  'Limites Administrativos',
                  'Outros (especificar)'
                ].map(item => (
                  <label key={item} className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.availableData.includes(item)}
                      onChange={() => handleCheckboxChange(item)}
                      className="w-4 h-4 rounded border-white/20 bg-slate-900/50 text-indigo-600 focus:ring-indigo-500/50"
                    />
                    <span className="text-slate-300">{item}</span>
                  </label>
                ))}
                <div className="mt-4">
                  <label className="block text-sm text-slate-300 mb-2">Upload de Dados (opcional)</label>
                  <label className="flex items-center gap-3 px-4 py-3 bg-slate-900/50 border border-white/10 rounded-xl cursor-pointer hover:border-indigo-500/50 transition-all">
                    <Upload className="w-5 h-5 text-indigo-400" />
                    <span className="text-slate-300 text-sm">
                      {dataFilesPreview || 'Selecionar arquivos'}
                    </span>
                    <input
                      type="file"
                      multiple
                      onChange={(e) => handleFileChange(e, 'data')}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            </Card>

            {/* Escala e Nível de Detalhe */}
            <Card className="p-6" glass>
              <div className="flex items-center gap-3 mb-4">
                <Ruler className="w-5 h-5 text-indigo-400" />
                <label className="text-lg font-semibold text-white">Escala e Nível de Detalhe</label>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-slate-300 mb-2">Escala</label>
                  <input
                    type="text"
                    name="scale"
                    value={formData.scale}
                    onChange={handleInputChange}
                    placeholder="Ex: 1:50.000, 1:100.000"
                    className="w-full px-4 py-3 bg-slate-900/50 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm text-slate-300 mb-2">Nível de Detalhe</label>
                  <select
                    name="detailLevel"
                    value={formData.detailLevel}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-slate-900/50 border border-white/10 rounded-xl text-white focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all"
                  >
                    <option value="">Selecione</option>
                    <option value="diagnostico">Diagnóstico</option>
                    <option value="modelagem">Modelagem</option>
                    <option value="diretrizes">Diretrizes</option>
                  </select>
                </div>
              </div>
            </Card>

            {/* Contato */}
            <Card className="p-6" glass>
              <div className="flex items-center gap-3 mb-4">
                <User className="w-5 h-5 text-indigo-400" />
                <label className="text-lg font-semibold text-white">Informações de Contato</label>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-slate-300 mb-2">Nome Completo *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-slate-900/50 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm text-slate-300 mb-2">E-mail *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-slate-900/50 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm text-slate-300 mb-2">Instituição / Empresa *</label>
                  <input
                    type="text"
                    name="institution"
                    value={formData.institution}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-slate-900/50 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm text-slate-300 mb-2">WhatsApp (opcional)</label>
                  <input
                    type="tel"
                    name="whatsapp"
                    value={formData.whatsapp}
                    onChange={handleInputChange}
                    placeholder="(00) 00000-0000"
                    className="w-full px-4 py-3 bg-slate-900/50 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all"
                  />
                </div>
              </div>
            </Card>

            {/* Nota de Escopo */}
            <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-xl p-4">
              <p className="text-sm text-slate-300">
                <strong className="text-indigo-400">Nota:</strong> Sem todos os dados? Sem problema. Podemos compor bases públicas e integrar as suas camadas.
              </p>
            </div>

            {/* Submit */}
            <div className="flex justify-center">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                disabled={isSubmitting}
                className="bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 min-w-[300px]"
              >
                {isSubmitting ? 'Enviando...' : 'Enviar Protocolo de Projeto'}
              </Button>
            </div>
          </form>
        </div>
      </main>
      <Footer variant="studio" />
      <WhatsAppButton />
    </div>
  );
}
