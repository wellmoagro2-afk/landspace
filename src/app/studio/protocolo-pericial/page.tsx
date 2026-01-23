"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { 
  User, 
  Mail, 
  Building, 
  MessageSquare, 
  FileText, 
  Map, 
  Calendar, 
  Upload, 
  CheckCircle2,
  Copy,
  Download,
  AlertCircle
} from "lucide-react";

const serviceOptions = [
  { id: 'pericia-evidencias', title: 'Evidências Periciais' },
  { id: 'pericia-ambiental', title: 'Assistência Técnica Pericial' },
  { id: 'avaliacao-rural', title: 'Avaliação Rural' },
];

const contextOptions = [
  { id: 'judicial', title: 'Judicial' },
  { id: 'administrativo', title: 'Administrativo' },
  { id: 'privado', title: 'Privado' },
];

const packageOptions = [
  { id: 'essential', title: 'Essencial' },
  { id: 'professional', title: 'Profissional' },
  { id: 'premium', title: 'Premium' },
];

const formatOptions = [
  { id: 'pdf', title: 'PDF' },
  { id: 'editaveis', title: 'Editáveis' },
  { id: 'geotiff', title: 'GeoTIFF' },
  { id: 'geopackage', title: 'GeoPackage' },
  { id: 'xlsx', title: 'XLSX' },
];

export default function ProtocoloPericialPage() {
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    whatsapp: '',
    city: '',
    state: '',
    demandType: '',
    desiredDeadline: '',
    urgency: '0',
    technicalQuestion: '',
    context: '',
    successCriteria: '',
    aoi: '',
    aoiFile: null as File | null,
    documents: [] as File[],
    period: '',
    needsField: 'nao',
    package: '',
    formats: [] as string[],
    scale: '',
    scopeAccepted: false,
    dataAccepted: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [protocolId, setProtocolId] = useState<string | null>(null);
  const [protocolSummary, setProtocolSummary] = useState<string>('');

  useEffect(() => {
    const serviceId = searchParams.get('service');
    if (serviceId && serviceOptions.find(s => s.id === serviceId)) {
      setFormData(prev => ({ ...prev, demandType: serviceId }));
    }
  }, [searchParams]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (name: string, value: string) => {
    if (name === 'formats') {
      setFormData(prev => ({
        ...prev,
        formats: prev.formats.includes(value)
          ? prev.formats.filter(f => f !== value)
          : [...prev.formats, value]
      }));
    } else if (name === 'scopeAccepted' || name === 'dataAccepted') {
      setFormData(prev => ({ ...prev, [name]: !prev[name as keyof typeof prev] as boolean }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'aoi' | 'documents') => {
    const files = e.target.files;
    if (files) {
      if (type === 'aoi') {
        setFormData(prev => ({ ...prev, aoiFile: files[0] }));
      } else {
        setFormData(prev => ({ ...prev, documents: Array.from(files) }));
      }
    }
  };

  const generateProtocolSummary = () => {
    const id = `PROT-${Date.now()}`;
    const summary = `
PROTOCOLO PERICIAL/AVALIAÇÃO - LANDSPACE STUDIO
===============================================
ID: ${id}
Data: ${new Date().toLocaleString('pt-BR')}

BLOCO A - IDENTIFICAÇÃO
-----------------------
Nome/Empresa: ${formData.name}${formData.company ? ` / ${formData.company}` : ''}
Email: ${formData.email}
WhatsApp: ${formData.whatsapp || 'Não informado'}
Cidade/UF: ${formData.city} / ${formData.state}
Tipo de Demanda: ${serviceOptions.find(s => s.id === formData.demandType)?.title || 'Não selecionado'}
Prazo Desejado: ${formData.desiredDeadline || 'Não informado'}
Urgência: ${formData.urgency}%

BLOCO B - OBJETIVO TÉCNICO
--------------------------
Pergunta Técnica: ${formData.technicalQuestion || 'Não informado'}
Contexto: ${contextOptions.find(c => c.id === formData.context)?.title || 'Não selecionado'}
Critério de Sucesso: ${formData.successCriteria || 'Não informado'}

BLOCO C - ÁREA E DADOS
----------------------
AOI: ${formData.aoi || (formData.aoiFile ? formData.aoiFile.name : 'Não informado')}
Período/Datas: ${formData.period || 'Não informado'}
Necessidade de Campo/Drone: ${formData.needsField === 'sim' ? 'Sim' : 'Não'}
Documentos Anexados: ${formData.documents.length > 0 ? formData.documents.map(d => d.name).join(', ') : 'Nenhum'}

BLOCO D - ENTREGÁVEIS
---------------------
Pacote: ${packageOptions.find(p => p.id === formData.package)?.title || 'Não selecionado'}
Formatos: ${formData.formats.length > 0 ? formData.formats.map(f => formatOptions.find(opt => opt.id === f)?.title).join(', ') : 'Não selecionado'}
Escala: ${formData.scale || 'Não informado'}

BLOCO E - ESCOPO E RESPONSABILIDADE
-----------------------------------
Declaração de Veracidade: ${formData.scopeAccepted ? 'Aceito' : 'Não aceito'}
Autorização de Dados: ${formData.dataAccepted ? 'Autorizado' : 'Não autorizado'}

PRÓXIMOS PASSOS
---------------
1. Análise técnica em 24-48h úteis
2. Retorno com protocolo detalhado (escopo, cronograma, investimento)
3. Aprovação e início do projeto

===============================================
LandSpace Studio - Perícia & Avaliação
    `;
    return { id, summary };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validação
    if (!formData.name || !formData.email || !formData.city || !formData.state || 
        !formData.demandType || !formData.desiredDeadline || !formData.urgency ||
        !formData.technicalQuestion || !formData.context || !formData.successCriteria ||
        (!formData.aoi && !formData.aoiFile) || !formData.package || 
        formData.formats.length === 0 || !formData.scopeAccepted || !formData.dataAccepted) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    setIsSubmitting(true);

    // Simular processamento
    await new Promise(resolve => setTimeout(resolve, 1500));

    const { id, summary } = generateProtocolSummary();
    setProtocolId(id);
    setProtocolSummary(summary);
    setIsSubmitted(true);
    setIsSubmitting(false);
  };

  const handleCopySummary = () => {
    navigator.clipboard.writeText(protocolSummary);
    alert('Resumo copiado para a área de transferência!');
  };

  const handleDownloadSummary = () => {
    const blob = new Blob([protocolSummary], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `protocolo-${protocolId}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-[#02040a] relative" data-variant="studio">
        <Header variant="studio" />
        <main className="relative z-10 py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="p-8" glass>
              <div className="text-center mb-8">
                <CheckCircle2 className="w-16 h-16 text-indigo-400 mx-auto mb-4" />
                <h1 className="text-3xl font-bold text-white mb-2">Protocolo Registrado</h1>
                <p className="text-slate-300">ID: <span className="font-mono text-indigo-400">{protocolId}</span></p>
              </div>

              <div className="mb-6">
                <h2 className="text-xl font-bold text-white mb-4">Resumo do Protocolo</h2>
                <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700 mb-4">
                  <pre className="text-xs text-slate-300 font-mono whitespace-pre-wrap">{protocolSummary}</pre>
                </div>
                <div className="flex gap-3">
                  <Button onClick={handleCopySummary} variant="outline" className="flex-1">
                    <Copy className="w-4 h-4 mr-2" />
                    Copiar Resumo
                  </Button>
                  <Button onClick={handleDownloadSummary} variant="outline" className="flex-1">
                    <Download className="w-4 h-4 mr-2" />
                    Baixar Resumo
                  </Button>
                </div>
              </div>

              <div className="bg-indigo-500/10 border border-indigo-500/30 rounded-lg p-6">
                <h3 className="text-lg font-bold text-white mb-3">Próximos Passos</h3>
                <ul className="space-y-2 text-slate-300">
                  <li className="flex items-start">
                    <span className="text-indigo-400 mr-2">1.</span>
                    <span>Análise técnica em 24-48h úteis</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-indigo-400 mr-2">2.</span>
                    <span>Retorno com protocolo detalhado (escopo, cronograma, investimento)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-indigo-400 mr-2">3.</span>
                    <span>Aprovação e início do projeto</span>
                  </li>
                </ul>
              </div>
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
            title="Protocolo Pericial/Avaliação"
            subtitle="Preencha o formulário para solicitar protocolo detalhado com escopo, cronograma e investimento"
          />

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Bloco A - Identificação */}
            <Card className="p-6" glass>
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <User className="w-6 h-6 mr-2 text-indigo-400" />
                Bloco A — Identificação e Prazos
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Nome/Empresa <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 bg-slate-900/50 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Empresa/Instituição
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-slate-900/50 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Email <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 bg-slate-900/50 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      WhatsApp
                    </label>
                    <input
                      type="tel"
                      name="whatsapp"
                      value={formData.whatsapp}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-slate-900/50 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Cidade <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 bg-slate-900/50 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      UF <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      required
                      maxLength={2}
                      className="w-full px-4 py-2 bg-slate-900/50 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Tipo de Demanda <span className="text-red-400">*</span>
                  </label>
                  <select
                    name="demandType"
                    value={formData.demandType}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 bg-slate-900/50 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="">Selecione...</option>
                    {serviceOptions.map(opt => (
                      <option key={opt.id} value={opt.id}>{opt.title}</option>
                    ))}
                  </select>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Prazo Desejado (Data) <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="date"
                      name="desiredDeadline"
                      value={formData.desiredDeadline}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 bg-slate-900/50 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Urgência (0-100%) <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="number"
                      name="urgency"
                      value={formData.urgency}
                      onChange={handleInputChange}
                      required
                      min="0"
                      max="100"
                      className="w-full px-4 py-2 bg-slate-900/50 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>
              </div>
            </Card>

            {/* Bloco B - Objetivo Técnico */}
            <Card className="p-6" glass>
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <FileText className="w-6 h-6 mr-2 text-indigo-400" />
                Bloco B — Objetivo Técnico
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Pergunta Técnica / Objetivo Principal <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    name="technicalQuestion"
                    value={formData.technicalQuestion}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full px-4 py-2 bg-slate-900/50 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Contexto <span className="text-red-400">*</span>
                  </label>
                  <select
                    name="context"
                    value={formData.context}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 bg-slate-900/50 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="">Selecione...</option>
                    {contextOptions.map(opt => (
                      <option key={opt.id} value={opt.id}>{opt.title}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Critério de Sucesso <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    name="successCriteria"
                    value={formData.successCriteria}
                    onChange={handleInputChange}
                    required
                    rows={3}
                    className="w-full px-4 py-2 bg-slate-900/50 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>
            </Card>

            {/* Bloco C - Área e Dados */}
            <Card className="p-6" glass>
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <Map className="w-6 h-6 mr-2 text-indigo-400" />
                Bloco C — Área e Dados Disponíveis
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    AOI (Link ou Upload KML/SHP/GeoJSON) <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="aoi"
                    value={formData.aoi}
                    onChange={handleInputChange}
                    placeholder="Link ou URL"
                    className="w-full px-4 py-2 bg-slate-900/50 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-2"
                  />
                  <input
                    type="file"
                    accept=".kml,.shp,.geojson,.zip"
                    onChange={(e) => handleFileChange(e, 'aoi')}
                    className="w-full px-4 py-2 bg-slate-900/50 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  {formData.aoiFile && (
                    <p className="text-sm text-slate-400 mt-2">Arquivo: {formData.aoiFile.name}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Documentos (Múltiplos Uploads)
                  </label>
                  <input
                    type="file"
                    multiple
                    onChange={(e) => handleFileChange(e, 'documents')}
                    className="w-full px-4 py-2 bg-slate-900/50 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  {formData.documents.length > 0 && (
                    <p className="text-sm text-slate-400 mt-2">
                      {formData.documents.length} arquivo(s) selecionado(s)
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Período/Datas de Interesse
                  </label>
                  <input
                    type="text"
                    name="period"
                    value={formData.period}
                    onChange={handleInputChange}
                    placeholder="Ex: 2020-2024, ou datas específicas"
                    className="w-full px-4 py-2 bg-slate-900/50 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Necessidade de Campo/Drone?
                  </label>
                  <select
                    name="needsField"
                    value={formData.needsField}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-slate-900/50 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="nao">Não</option>
                    <option value="sim">Sim</option>
                  </select>
                </div>
              </div>
            </Card>

            {/* Bloco D - Entregáveis */}
            <Card className="p-6" glass>
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <CheckCircle2 className="w-6 h-6 mr-2 text-indigo-400" />
                Bloco D — Entregáveis
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Pacote Desejado <span className="text-red-400">*</span>
                  </label>
                  <select
                    name="package"
                    value={formData.package}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 bg-slate-900/50 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="">Selecione...</option>
                    {packageOptions.map(opt => (
                      <option key={opt.id} value={opt.id}>{opt.title}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Formatos (Multiselect) <span className="text-red-400">*</span>
                  </label>
                  <div className="space-y-2">
                    {formatOptions.map(opt => (
                      <label key={opt.id} className="flex items-center text-slate-300">
                        <input
                          type="checkbox"
                          checked={formData.formats.includes(opt.id)}
                          onChange={() => handleCheckboxChange('formats', opt.id)}
                          className="mr-2 w-4 h-4 text-indigo-600 bg-slate-900 border-slate-700 rounded focus:ring-indigo-500"
                        />
                        {opt.title}
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Escala Preferida (Opcional)
                  </label>
                  <input
                    type="text"
                    name="scale"
                    value={formData.scale}
                    onChange={handleInputChange}
                    placeholder="Ex: 1:10.000"
                    className="w-full px-4 py-2 bg-slate-900/50 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>
            </Card>

            {/* Bloco E - Escopo e Responsabilidade */}
            <Card className="p-6" glass>
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <AlertCircle className="w-6 h-6 mr-2 text-amber-400" />
                Bloco E — Escopo e Responsabilidade
              </h2>
              <div className="space-y-4">
                <label className="flex items-start text-slate-300">
                  <input
                    type="checkbox"
                    checked={formData.scopeAccepted}
                    onChange={() => handleCheckboxChange('scopeAccepted', '')}
                    required
                    className="mt-1 mr-3 w-5 h-5 text-indigo-600 bg-slate-900 border-slate-700 rounded focus:ring-indigo-500"
                  />
                  <span>
                    Declaro que as informações fornecidas são verdadeiras e compreendo que mudanças de escopo geram aditivo. <span className="text-red-400">*</span>
                  </span>
                </label>
                <label className="flex items-start text-slate-300">
                  <input
                    type="checkbox"
                    checked={formData.dataAccepted}
                    onChange={() => handleCheckboxChange('dataAccepted', '')}
                    required
                    className="mt-1 mr-3 w-5 h-5 text-indigo-600 bg-slate-900 border-slate-700 rounded focus:ring-indigo-500"
                  />
                  <span>
                    Autorizo o uso de dados públicos e processamento conforme o protocolo. <span className="text-red-400">*</span>
                  </span>
                </label>
              </div>
            </Card>

            <div className="flex justify-end">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3"
              >
                {isSubmitting ? 'Enviando...' : 'Enviar Protocolo'}
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
