/**
 * Seed para Portal do Cliente
 * Criar projeto demo para testes
 */

import { PrismaClient } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

// Funções locais (não importar de libs que usam Next.js)
function generateProtocol(): string {
  const year = new Date().getFullYear();
  const random = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
  return `LS-${year}-${random}`;
}

async function hashPin(pin: string): Promise<string> {
  return bcrypt.hash(pin, 10);
}

const DEFAULT_STEPS = [
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

async function createDefaultSteps(projectId: string) {
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

async function main() {
  // Garantir que seed só roda em dev
  if (process.env.NODE_ENV === 'production') {
    console.error('❌ Seed não pode ser executado em produção!');
    process.exit(1);
  }

  console.log('🌱 Iniciando seed do Portal do Cliente...');

  // Criar projeto demo
  const protocol = generateProtocol();
  const pin = '123456'; // PIN demo (em produção, usar generatePin())
  const pinHash = await hashPin(pin);

  const project = await prisma.project.create({
    data: {
      protocol,
      pinHash,
      clientName: 'Cliente Demo',
      clientEmail: 'demo@exemplo.com',
      clientPhone: '(64) 99999-9999',
      serviceType: 'PERICIA_AMBIENTAL',
      status: 'EM_PRODUCAO',
      totalValue: new Decimal('10000.00'),
      entryValue: new Decimal('3000.00'),
      paidValue: new Decimal('3000.00'),
      balanceValue: new Decimal('7000.00'),
      finalRelease: false,
    },
  });

  console.log(`✅ Projeto criado: ${project.protocol}`);
  console.log(`   PIN: ${pin} (apenas para desenvolvimento)`);

  // Criar steps padrão
  await createDefaultSteps(project.id);
  console.log('✅ Steps padrão criados');

  // Marcar alguns steps como concluídos
  const steps = await prisma.projectStep.findMany({
    where: { projectId: project.id },
    orderBy: { order: 'asc' },
  });

  // Marcar primeiros 4 steps como DONE
  for (let i = 0; i < Math.min(4, steps.length); i++) {
    await prisma.projectStep.update({
      where: { id: steps[i].id },
      data: {
        state: 'DONE',
        finishedAt: new Date(),
      },
    });
  }

  // Marcar step 5 como ACTIVE
  if (steps.length > 4) {
    await prisma.projectStep.update({
      where: { id: steps[4].id },
      data: {
        state: 'ACTIVE',
        startedAt: new Date(),
      },
    });
  }

  console.log('✅ Steps atualizados');

  // Criar pagamento de entrada
  await prisma.payment.create({
    data: {
      projectId: project.id,
      method: 'PIX',
      amount: new Decimal('3000.00'),
      status: 'CONFIRMED',
      note: 'Pagamento de entrada - Demo',
      confirmedAt: new Date(),
    },
  });

  console.log('✅ Pagamento de entrada criado');

  console.log('\n📋 Credenciais do Projeto Demo:');
  console.log(`   Protocolo: ${protocol}`);
  console.log(`   PIN: ${pin}`);
  console.log(`   URL: /studio/portal/${protocol}`);
  console.log('\n✨ Seed concluído!');
}

main()
  .catch((e) => {
    console.error('❌ Erro no seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
