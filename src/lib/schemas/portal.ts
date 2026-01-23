import { z } from 'zod';

/**
 * Schema para login do portal
 */
export const portalLoginSchema = z.object({
  protocol: z.string().trim().min(1, 'Protocolo é obrigatório').transform(val => val.toUpperCase()),
  pin: z.string().trim().min(1, 'PIN é obrigatório'),
});

/**
 * Schema para logout do portal (não precisa de body, mas mantém consistência)
 */
export const portalLogoutSchema = z.object({}).optional();
