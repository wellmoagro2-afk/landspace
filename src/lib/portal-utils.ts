/**
 * Utilitários do Portal do Cliente
 */

import { prisma } from './prisma';
import { ProjectStatus, StepState, Prisma } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

/**
 * Recalcular valores financeiros do projeto
 */
export async function recalculateProjectBalance(projectId: string) {
  const project = await prisma.project.findUnique({
    where: { id: projectId },
    include: {
      payments: {
        where: {
          status: 'CONFIRMED',
        },
      },
    },
  });

  if (!project) {
    return;
  }

  // Usar Decimal do Prisma - recalcular no backend
  const paidValue = project.payments.reduce(
    (sum, payment) => sum.plus(payment.amount),
    new Decimal(0)
  );
  const balanceValue = project.totalValue.minus(paidValue).isNegative() 
    ? new Decimal(0)
    : project.totalValue.minus(paidValue);

  await prisma.project.update({
    where: { id: projectId },
    data: {
      paidValue,
      balanceValue,
    },
  });
}

/**
 * Steps padrão para criar ao iniciar projeto
 * 
 * REMOVIDOS:
 * - PREVIA_ENTREGUE (Prévia Entregue / Projeto Preview)
 * - AJUSTES
 * 
 * ADICIONADOS:
 * - REVISAO (pode ser renomeado como R1, R2, R3, etc.)
 */
export const DEFAULT_STEPS = [
  { stepKey: 'TRIAGEM_RECEBIDA', title: 'Triagem Recebida', order: 1 },
  { stepKey: 'VALIDACAO_DADOS', title: 'Validação de Dados', order: 2 },
  { stepKey: 'PROPOSTA_E_ASSINATURA', title: 'Proposta e Assinatura', order: 3 },
  { stepKey: 'ENTRADA_CONFIRMADA', title: 'Entrada Confirmada', order: 4 },
  { stepKey: 'PROCESSAMENTO_FASE_1', title: 'Processamento - Fase 1', order: 5 },
  { stepKey: 'PROCESSAMENTO_FASE_2', title: 'Processamento - Fase 2', order: 6 },
  { stepKey: 'QA_INTERNO', title: 'QA Interno', order: 7 },
  { stepKey: 'FINAL_PRONTO', title: 'Final Pronto', order: 8 },
  { stepKey: 'REVISAO', title: 'Revisão', order: 9 },
  { stepKey: 'SALDO_PENDENTE', title: 'Saldo Pendente', order: 10 },
  { stepKey: 'LIBERADO', title: 'Liberado', order: 11 },
];

/**
 * Criar steps padrão para um projeto
 */
export async function createDefaultSteps(projectId: string) {
  await prisma.projectStep.createMany({
    data: DEFAULT_STEPS.map((step) => ({
      projectId,
      stepKey: step.stepKey,
      title: step.title,
      order: step.order,
      state: 'PENDING',
    })),
  });
}

/**
 * Verificar se pode baixar arquivos PREVIEW
 * 
 * DEPRECATED: Não há mais arquivos PREVIEW no sistema.
 * Esta função é mantida apenas para compatibilidade com projetos antigos.
 * 
 * @deprecated Use canDownloadFinal() para todos os arquivos
 */
export function canDownloadPreview(
  project: { paidValue: Decimal | number; entryValue: Decimal | number },
  steps?: Array<{ stepKey: string; state: string }>
): boolean {
  // Sempre retornar false - não há mais arquivos PREVIEW
  return false;
}

/**
 * Verificar se pode baixar arquivos do projeto
 * 
 * Regras (TODAS devem ser atendidas):
 * 1. balanceValue == 0 (saldo quitado) OU finalRelease == true (liberação manual habilitada)
 * 2. finalRelease == true (liberação final ativada pelo admin)
 * 3. Step "FINAL_PRONTO" ou "REVISAO" deve estar "DONE" (concluído)
 * 
 * IMPORTANTE: 
 * - Arquivos só são liberados quando o step correspondente está "Concluído".
 * - Se o step estiver "Pendente" ou "Ativo", os arquivos não são liberados.
 * - O status do projeto não bloqueia mais a liberação se as condições acima forem atendidas.
 * 
 * Para arquivos de revisão (R1, R2, R3, etc.), verifica se step REVISAO está DONE.
 * Para arquivos finais, verifica se step FINAL_PRONTO está DONE.
 */
export function canDownloadFinal(
  project: { balanceValue: Decimal | number; finalRelease: boolean; status: ProjectStatus },
  steps?: Array<{ stepKey: string; state: string }>
): boolean {
  const balance = typeof project.balanceValue === 'number' ? project.balanceValue : project.balanceValue.toNumber();
  
  // CONDIÇÃO 1: finalRelease deve estar habilitado (liberação manual pelo admin)
  if (!project.finalRelease) {
    return false;
  }
  
  // CONDIÇÃO 2: Verificar se step FINAL_PRONTO ou REVISAO está DONE
  if (steps) {
    const finalStep = steps.find(s => s.stepKey === 'FINAL_PRONTO');
    const revisaoStep = steps.find(s => s.stepKey === 'REVISAO');
    
    // Arquivos são liberados se FINAL_PRONTO está DONE OU se REVISAO está DONE
    // Isso permite que revisões (R1, R2, etc.) sejam liberadas independentemente
    const finalDone = finalStep && finalStep.state === 'DONE';
    const revisaoDone = revisaoStep && revisaoStep.state === 'DONE';
    
    if (!finalDone && !revisaoDone) {
      return false; // Nenhum step relevante está concluído - não liberar arquivos
    }
  } else {
    // Se steps não foram fornecidos, não podemos verificar - bloquear por segurança
    return false;
  }
  
  // Se chegou aqui, todas as condições foram atendidas:
  // - finalRelease está habilitado
  // - Pelo menos um step relevante (FINAL_PRONTO ou REVISAO) está DONE
  // O saldo não bloqueia mais (pode ser pago ou não, o admin controla via finalRelease)
  return true;
}

/**
 * Obter progresso do projeto (baseado em steps DONE)
 * REVISAO pode ser renomeada (R1, R2, R3, etc.) e conta como step normal
 */
export async function getProjectProgress(projectId: string): Promise<number> {
  const steps = await prisma.projectStep.findMany({
    where: { 
      projectId,
    },
    orderBy: { order: 'asc' },
  });

  if (steps.length === 0) {
    return 0;
  }

  const doneSteps = steps.filter((s) => s.state === 'DONE').length;
  return Math.round((doneSteps / steps.length) * 100);
}
