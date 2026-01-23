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
 */
export const DEFAULT_STEPS = [
  { stepKey: 'TRIAGEM_RECEBIDA', title: 'Triagem Recebida', order: 1 },
  { stepKey: 'VALIDACAO_DADOS', title: 'Validação de Dados', order: 2 },
  { stepKey: 'PROPOSTA_E_ASSINATURA', title: 'Proposta e Assinatura', order: 3 },
  { stepKey: 'ENTRADA_CONFIRMADA', title: 'Entrada Confirmada', order: 4 },
  { stepKey: 'PROCESSAMENTO_FASE_1', title: 'Processamento - Fase 1', order: 5 },
  { stepKey: 'PROCESSAMENTO_FASE_2', title: 'Processamento - Fase 2', order: 6 },
  { stepKey: 'QA_INTERNO', title: 'QA Interno', order: 7 },
  { stepKey: 'PREVIA_ENTREGUE', title: 'Prévia Entregue', order: 8 },
  { stepKey: 'AJUSTES', title: 'Ajustes', order: 9 },
  { stepKey: 'FINAL_PRONTO', title: 'Final Pronto', order: 10 },
  { stepKey: 'SALDO_PENDENTE', title: 'Saldo Pendente', order: 11 },
  { stepKey: 'LIBERADO', title: 'Liberado', order: 12 },
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
 */
export function canDownloadPreview(project: { paidValue: Decimal | number; entryValue: Decimal | number }): boolean {
  const paid = typeof project.paidValue === 'number' ? project.paidValue : project.paidValue.toNumber();
  const entry = typeof project.entryValue === 'number' ? project.entryValue : project.entryValue.toNumber();
  return paid >= entry;
}

/**
 * Verificar se pode baixar arquivos FINAL
 * Regras: balanceValue == 0 AND finalRelease == true AND status >= FINAL_PRONTO
 */
export function canDownloadFinal(project: { balanceValue: Decimal | number; finalRelease: boolean; status: ProjectStatus }): boolean {
  const balance = typeof project.balanceValue === 'number' ? project.balanceValue : project.balanceValue.toNumber();
  
  // Status que permitem download final (ordem do enum)
  const allowedStatuses: ProjectStatus[] = ['FINAL_PRONTO', 'SALDO_PENDENTE', 'LIBERADO', 'ENCERRADO'];
  
  return balance === 0 
    && project.finalRelease 
    && allowedStatuses.includes(project.status);
}

/**
 * Obter progresso do projeto (baseado em steps DONE)
 * AJUSTES é opcional e não conta como bloqueio
 */
export async function getProjectProgress(projectId: string): Promise<number> {
  const steps = await prisma.projectStep.findMany({
    where: { 
      projectId,
      stepKey: { not: 'AJUSTES' }, // AJUSTES é opcional
    },
    orderBy: { order: 'asc' },
  });

  if (steps.length === 0) {
    return 0;
  }

  const doneSteps = steps.filter((s) => s.state === 'DONE').length;
  return Math.round((doneSteps / steps.length) * 100);
}
