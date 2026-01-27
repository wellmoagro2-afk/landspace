import { z } from 'zod';

/**
 * Schema para login admin
 */
export const adminLoginSchema = z.object({
  adminKey: z.string().min(1, 'Senha é obrigatória'),
});

/**
 * Schema para definir/atualizar senha admin
 */
export const adminPasswordSchema = z.object({
  password: z.string().min(24, 'Senha deve ter no mínimo 24 caracteres'),
});

/**
 * Schema para criar projeto
 */
export const createProjectSchema = z.object({
  title: z.string().trim().max(500).optional().or(z.literal('')), // Título descritivo do projeto
  clientName: z.string().trim().min(1, 'Nome do cliente é obrigatório').max(255),
  clientEmail: z.string().email('Email inválido').optional().or(z.literal('')),
  clientPhone: z.string().trim().max(50).optional().or(z.literal('')),
  serviceType: z.enum([
    'PERICIA_EVIDENCIAS',
    'PERICIA_AMBIENTAL',
    'AVALIACAO_RURAL',
    'CAR',
    'GEOREF',
    'OUTROS',
  ]),
  totalValue: z.number().positive('Valor total deve ser positivo').or(z.string().transform(val => {
    const num = parseFloat(val);
    if (isNaN(num) || num <= 0) throw new Error('Valor total inválido');
    return num;
  })),
  entryValue: z.number().nonnegative('Valor de entrada não pode ser negativo').or(z.string().transform(val => {
    const num = parseFloat(val);
    if (isNaN(num) || num < 0) throw new Error('Valor de entrada inválido');
    return num;
  })),
}).refine(data => data.entryValue <= data.totalValue, {
  message: 'Valor de entrada não pode ser maior que valor total',
  path: ['entryValue'],
});

/**
 * Schema para atualizar projeto
 */
export const updateProjectSchema = z.object({
  title: z.string().trim().max(500).optional().or(z.literal('')), // Título descritivo do projeto
  clientName: z.string().trim().min(1).max(255).optional(),
  clientEmail: z.string().email().optional().or(z.literal('')),
  clientPhone: z.string().trim().max(50).optional().or(z.literal('')),
  serviceType: z.enum([
    'PERICIA_EVIDENCIAS',
    'PERICIA_AMBIENTAL',
    'AVALIACAO_RURAL',
    'CAR',
    'GEOREF',
    'OUTROS',
  ]).optional(),
  status: z.enum([
    'TRIAGEM',
    'VALIDACAO_DADOS',
    'PROPOSTA',
    'ENTRADA_PAGA',
    'EM_PRODUCAO',
    'QA_INTERNO',
    'FINAL_PRONTO',
    'SALDO_PENDENTE',
    'LIBERADO',
    'ENCERRADO',
    // REMOVIDOS: 'PREVIA_ENTREGUE', 'AJUSTES'
    // ADICIONADO: REVISAO (gerenciado via steps, não via status do projeto)
  ]).optional(),
  totalValue: z.number().positive().optional().or(z.string().transform(val => {
    const num = parseFloat(val);
    if (isNaN(num) || num <= 0) throw new Error('Valor total inválido');
    return num;
  }).optional()),
  entryValue: z.number().nonnegative().optional().or(z.string().transform(val => {
    const num = parseFloat(val);
    if (isNaN(num) || num < 0) throw new Error('Valor de entrada inválido');
    return num;
  }).optional()),
  finalRelease: z.boolean().optional(),
  resetPin: z.boolean().optional(),
}).refine(data => {
  if (data.entryValue !== undefined && data.totalValue !== undefined) {
    return data.entryValue <= data.totalValue;
  }
  return true;
}, {
  message: 'Valor de entrada não pode ser maior que valor total',
  path: ['entryValue'],
});

/**
 * Schema para atualizar steps do projeto
 */
export const updateStepsSchema = z.object({
  steps: z.array(z.object({
    id: z.string(),
    state: z.enum(['PENDING', 'ACTIVE', 'DONE']),
    startedAt: z.string().datetime().nullable().optional(),
    finishedAt: z.string().datetime().nullable().optional(),
  })),
});

/**
 * Schema para registrar pagamento
 */
export const createPaymentSchema = z.object({
  method: z.enum(['PIX', 'BOLETO', 'CARTAO', 'AJUSTE']),
  amount: z.number().positive('Valor deve ser positivo').or(z.string().transform(val => {
    const num = parseFloat(val);
    if (isNaN(num) || num <= 0) throw new Error('Valor inválido');
    return num;
  })),
  note: z.string().trim().max(1000).optional().or(z.literal('')),
  status: z.enum(['PENDING', 'CONFIRMED', 'CANCELED']).default('CONFIRMED'),
});

/**
 * Schema para atualizar pagamento
 */
export const updatePaymentSchema = z.object({
  method: z.enum(['PIX', 'BOLETO', 'CARTAO', 'AJUSTE']).optional(),
  amount: z.number().positive('Valor deve ser positivo').or(z.string().transform(val => {
    const num = parseFloat(val);
    if (isNaN(num) || num <= 0) throw new Error('Valor inválido');
    return num;
  })).optional(),
  note: z.string().trim().max(1000).optional().or(z.literal('')),
  status: z.enum(['PENDING', 'CONFIRMED', 'CANCELED']).optional(),
});

/**
 * Schema para upload de arquivo
 */
import { FileKind } from '@prisma/client';

export const uploadFileSchema = z.object({
  kind: z.nativeEnum(FileKind),
  version: z.string().trim().min(1, 'Versão é obrigatória').max(50),
});
