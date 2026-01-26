import { NextRequest } from "next/server";
import { withRateLimit } from '@/lib/security/rateLimit';
import { getOrCreateRequestId, jsonWithRequestId } from '@/lib/http/request-id';

/**
 * API Route para processar submissão do formulário de Consultoria Estratégica
 * POST /api/strategy/consultancy
 */
async function handleConsultancy(request: NextRequest) {
  const requestId = getOrCreateRequestId(request);
  
  try {
    const body = await request.json();
    const { nomeCompleto, cargo, instituicao, areaInteresse, descricaoDemanda } = body;

    // Validação básica
    if (!nomeCompleto || !cargo || !instituicao || !areaInteresse || !descricaoDemanda) {
      return jsonWithRequestId(
        { error: "Todos os campos são obrigatórios" },
        { status: 400 },
        requestId
      );
    }

    // Aqui você pode integrar com seu backend existente
    // Por exemplo: 
    // - Enviar para um webhook (Zapier, Make, etc.)
    // - Salvar em banco de dados (Prisma)
    // - Enviar email via Resend, SendGrid, etc.
    // - Integrar com CRM (HubSpot, Salesforce, etc.)
    
    // Por enquanto, logamos os dados e retornamos sucesso
    // Em produção, substitua por sua lógica de backend
    console.log("📋 [Consultoria] Novo protocolo recebido:", {
      nomeCompleto,
      cargo,
      instituicao,
      areaInteresse,
      descricaoDemanda,
      timestamp: new Date().toISOString(),
      ip: request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown",
      userAgent: request.headers.get("user-agent") || "unknown",
    });

    // TODO: Implementar integração real
    // Exemplo com Prisma:
    // await prisma.consultancyLead.create({
    //   data: {
    //     nomeCompleto,
    //     cargo,
    //     instituicao,
    //     areaInteresse,
    //     descricaoDemanda,
    //     status: 'pending',
    //   },
    // });

    // Exemplo com webhook:
    // await fetch(process.env.CONSULTANCY_WEBHOOK_URL, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     nomeCompleto,
    //     cargo,
    //     instituicao,
    //     areaInteresse,
    //     descricaoDemanda,
    //   }),
    // });

    return jsonWithRequestId(
      { 
        success: true,
        message: "Protocolo registrado com sucesso" 
      },
      { status: 200 },
      requestId
    );
  } catch (error) {
    console.error("❌ [Consultoria] Erro ao processar formulário:", error instanceof Error ? error.message : 'Erro desconhecido', { requestId });
    return jsonWithRequestId(
      { error: "Erro ao processar solicitação" },
      { status: 500 },
      requestId
    );
  }
}

export const POST = withRateLimit(handleConsultancy, {
  scope: 'consultancy',
  ipLimit: 10,
  ipWindowMs: 60000,
});
