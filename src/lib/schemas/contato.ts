import { z } from 'zod';

/**
 * Schema para formulário de contato
 */
export const contatoSchema = z.object({
  name: z.string().trim().min(1, 'Nome é obrigatório').max(255),
  email: z.string().email('Email inválido'),
  phone: z.string().trim().max(50).optional().or(z.literal('')),
  message: z.string().trim().min(1, 'Mensagem é obrigatória').max(5000),
});
