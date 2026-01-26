"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Card } from "@/components/ui/Card";
import { ButtonLink } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import {
  MessageSquare,
  FileText,
  HelpCircle,
  Mail,
  Phone,
  Clock,
  CheckCircle2,
  ArrowRight,
  BookOpen,
  Video,
  Download,
  Users,
} from "lucide-react";

const faqItems = [
  {
    question: "Como funciona o processo de orçamento?",
    answer: "Após preencher o formulário de orçamento, nossa equipe analisa sua demanda e retorna em até 48h com um pacote recomendado, cronograma e escopo fechado. Você recebe uma proposta detalhada com todos os entregáveis e prazos.",
  },
  {
    question: "Quais formatos de dados vocês aceitam?",
    answer: "Aceitamos os principais formatos geoespaciais: Shapefile, GeoPackage, GeoTIFF, KML/KMZ, CSV com coordenadas, e bases públicas (MapBiomas, IBGE, etc.). Se você não tiver todos os dados, podemos compor com bases públicas e integrar dados do cliente.",
  },
  {
    question: "Quanto tempo leva para entregar um projeto?",
    answer: "Depende do pacote escolhido: Essencial (10-20 dias úteis), Profissional (20-45 dias úteis) ou Premium (30-90 dias úteis). Prazos podem variar conforme complexidade e disponibilidade de dados.",
  },
  {
    question: "Vocês fazem revisões?",
    answer: "Sim! Todos os pacotes incluem 2 revisões inclusas (layout/simbologia/texto e ajustes pontuais). Mudanças de escopo (nova área, período, indicadores) são tratadas como aditivos.",
  },
  {
    question: "Posso usar os mapas em publicações?",
    answer: "Sim! Os mapas são entregues com licença de uso para o propósito contratado. Incluímos metadados completos e simbologia (QML/SLD) para facilitar a publicação e apresentação.",
  },
  {
    question: "Vocês entregam só PDF?",
    answer: "Não! Entregamos atlas PDF + base geoespacial organizada (GeoPackage/FGDB) + metadados + simbologia (QML/SLD). Tudo pronto para uso em GIS e publicação.",
  },
];

const supportChannels = [
  {
    icon: MessageSquare,
    title: "WhatsApp",
    description: "Resposta rápida para dúvidas técnicas",
    action: "Abrir conversa",
    href: "https://wa.me/5562999999999",
    color: "green",
  },
  {
    icon: Mail,
    title: "E-mail",
    description: "Suporte detalhado e documentação",
    action: "Enviar e-mail",
    href: "mailto:studio@landspace.com.br",
    color: "indigo",
  },
  {
    icon: FileText,
    title: "Formulário",
    description: "Solicite suporte estruturado",
    action: "Preencher formulário",
    href: "/studio/orcamento",
    color: "cyan",
  },
];

const resources = [
  {
    icon: BookOpen,
    title: "Documentação",
    description: "Guias técnicos e manuais",
    href: "/studio/como-funciona",
  },
  {
    icon: Video,
    title: "Tutoriais",
    description: "Vídeos explicativos",
    href: "#",
  },
  {
    icon: Download,
    title: "Downloads",
    description: "Templates e exemplos",
    href: "#",
  },
  {
    icon: Users,
    title: "Comunidade",
    description: "Fórum e discussões",
    href: "#",
  },
];

export default function SuportePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-[#02040a] relative" data-variant="studio">
      <Header variant="studio" />

      <main className="relative z-10">
        {/* Hero */}
        <section className="py-24 bg-[#02040a] relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-0 grid-pattern-indigo-lg"></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16">
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                <span className="bg-gradient-to-r from-indigo-400 via-blue-400 to-white bg-clip-text text-transparent">
                  {/* SUPORTE TÉCNICO */}
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto">
                Suporte especializado para seus projetos cartográficos
              </p>
            </div>
          </div>
        </section>

        {/* Canais de Suporte */}
        <section className="py-12 bg-[#02040a] relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader
              title="Canais de Atendimento"
              subtitle="Escolha o canal mais adequado para sua necessidade"
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
              {supportChannels.map((channel, idx) => {
                const Icon = channel.icon;
                return (
                  <Card key={idx} className="p-6" glass hover>
                    <div className="space-y-4">
                      <div className={`p-3 rounded-xl ${
                        channel.color === 'green' ? 'bg-green-500/10 border-green-500/20' :
                        channel.color === 'cyan' ? 'bg-cyan-500/10 border-cyan-500/20' :
                        'bg-indigo-500/10 border-indigo-500/20'
                      } w-fit`}>
                        <Icon className={`w-6 h-6 ${
                          channel.color === 'green' ? 'text-green-400' :
                          channel.color === 'cyan' ? 'text-cyan-400' :
                          'text-indigo-400'
                        }`} />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white mb-2">{channel.title}</h3>
                        <p className="text-slate-300 text-sm mb-4">{channel.description}</p>
                        <ButtonLink
                          href={channel.href}
                          variant="secondary"
                          size="md"
                          accentColor="indigo"
                          className="w-full"
                        >
                          {channel.action}
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </ButtonLink>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-12 bg-[#02040a] relative">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader
              title="Perguntas Frequentes"
              subtitle="Respostas rápidas para as dúvidas mais comuns"
            />

            <div className="space-y-4">
              {faqItems.map((item, idx) => (
                <Card key={idx} className="p-6" glass>
                  <details className="group">
                    <summary className="flex items-center justify-between cursor-pointer list-none">
                      <h3 className="text-lg font-semibold text-white pr-4">{item.question}</h3>
                      <HelpCircle className="w-5 h-5 text-indigo-400 flex-shrink-0 transition-transform group-open:rotate-180" />
                    </summary>
                    <div className="mt-4 pt-4 border-t border-white/10">
                      <p className="text-slate-300 leading-relaxed">{item.answer}</p>
                    </div>
                  </details>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Recursos */}
        <section className="py-12 bg-[#02040a] relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader
              title="Recursos e Documentação"
              subtitle="Acesse guias, tutoriais e materiais de apoio"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {resources.map((resource, idx) => {
                const Icon = resource.icon;
                return (
                  <Card key={idx} className="p-6" glass hover>
                    <Link href={resource.href} className="block">
                      <div className="space-y-4">
                        <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 w-fit">
                          <Icon className="w-6 h-6 text-indigo-400" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-white mb-2">{resource.title}</h3>
                          <p className="text-slate-300 text-sm">{resource.description}</p>
                        </div>
                      </div>
                    </Link>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Horários */}
        <section className="py-12 bg-[#02040a] relative">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="p-8" glass>
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
                  <Clock className="w-6 h-6 text-indigo-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-4">Horário de Atendimento</h3>
                  <div className="space-y-2 text-slate-300">
                    <p><strong className="text-white">Segunda a Sexta:</strong> 8h às 18h (horário de Brasília)</p>
                    <p><strong className="text-white">Sábado:</strong> 9h às 13h</p>
                    <p><strong className="text-white">Domingo:</strong> Fechado</p>
                    <p className="text-sm text-slate-400 mt-4">Respostas por e-mail em até 24h úteis</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* CTA Final */}
        <section className="py-12 bg-[#02040a] relative">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="p-8 text-center" glass>
              <h3 className="text-2xl font-bold text-white mb-4">
                Não encontrou o que procura?
              </h3>
              <p className="text-slate-300 mb-6">
                Entre em contato conosco e nossa equipe técnica responderá suas dúvidas
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <ButtonLink
                  href="/studio/orcamento"
                  variant="primary"
                  size="lg"
                  accentColor="indigo"
                  className="bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600"
                >
                  Solicitar Orçamento
                </ButtonLink>
                <ButtonLink
                  href="https://wa.me/5562999999999"
                  variant="secondary"
                  size="lg"
                  accentColor="indigo"
                >
                  Falar no WhatsApp
                </ButtonLink>
              </div>
            </Card>
          </div>
        </section>
      </main>

      <Footer variant="studio" />
      <WhatsAppButton />
    </div>
  );
}
