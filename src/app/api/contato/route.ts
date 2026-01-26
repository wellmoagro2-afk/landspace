import { NextRequest } from "next/server";
import { withRateLimit } from '@/lib/security/rateLimit';
import { getOrCreateRequestId, jsonWithRequestId } from '@/lib/http/request-id';

async function handleContato(request: NextRequest) {
  const requestId = getOrCreateRequestId(request);
  
  try {
    const body = await request.json();
    const { nome, email, areaAtuacao, curso, tipo, mensagem, assunto } = body;

    // Validação básica
    if (!nome || !email) {
      return jsonWithRequestId(
        { error: "Nome e email são obrigatórios" },
        { status: 400 },
        requestId
      );
    }

    // Aqui você pode integrar com seu backend existente
    // Por exemplo: enviar para um webhook, salvar em banco de dados, enviar email, etc.
    
    // Por enquanto, retornamos sucesso
    // Em produção, substitua por sua lógica de backend
    console.log("Dados recebidos:", {
      nome,
      email,
      areaAtuacao,
      curso,
      tipo,
      mensagem,
      assunto,
      timestamp: new Date().toISOString(),
    });

    return jsonWithRequestId(
      { message: "Dados recebidos com sucesso" },
      { status: 200 },
      requestId
    );
  } catch (error) {
    console.error("Erro ao processar formulário:", error instanceof Error ? error.message : 'Erro desconhecido', { requestId });
    return jsonWithRequestId(
      { error: "Erro ao processar solicitação" },
      { status: 500 },
      requestId
    );
  }
}

export const POST = withRateLimit(handleContato, {
  scope: 'contato',
  ipLimit: 10,
  ipWindowMs: 60000,
});

