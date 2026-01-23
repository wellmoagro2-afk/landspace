import { z } from 'zod';

/**
 * Schema para criar briefing
 */
export const createBriefingSchema = z.object({
  slug: z.string().trim().min(1, 'Slug é obrigatório').max(255),
  title: z.string().trim().min(1, 'Título é obrigatório').max(500),
  subtitle: z.string().trim().max(500).optional().or(z.literal('')),
  summary: z.string().trim().min(1, 'Resumo é obrigatório').max(2000),
  tags: z.array(z.string()).optional().default([]),
  coverImageUrl: z.string().url('URL de imagem inválida').optional().or(z.literal('')),
  readingTime: z.string().trim().max(50).optional().default('5 min'),
  contentMdx: z.string().optional().default(''),
  status: z.enum(['draft', 'published', 'archived'], 'Status inválido').optional().default('draft'),
  publishedAt: z.string().datetime().optional().nullable().or(z.literal('')),
  seoTitle: z.string().trim().max(500).optional().or(z.literal('')),
  seoDescription: z.string().trim().max(1000).optional().or(z.literal('')),
  pdfUrl: z.string().url('URL de PDF inválida').optional().or(z.literal('')),
  youtubeUrl: z.string().url('URL do YouTube inválida').optional().or(z.literal('')),
  relatedMaps: z.array(z.string()).optional().nullable(),
});

/**
 * Schema para atualizar briefing
 */
export const updateBriefingSchema = z.object({
  slug: z.string().trim().min(1, 'Slug é obrigatório').max(255).optional(),
  title: z.string().trim().min(1, 'Título é obrigatório').max(500).optional(),
  subtitle: z.string().trim().max(500).optional().or(z.literal('')),
  summary: z.string().trim().min(1, 'Resumo é obrigatório').max(2000).optional(),
  tags: z.array(z.string()).optional(),
  coverImageUrl: z.string().url('URL de imagem inválida').optional().or(z.literal('')),
  readingTime: z.string().trim().max(50).optional(),
  contentMdx: z.string().optional(),
  status: z.enum(['draft', 'published', 'archived'], 'Status inválido').optional(),
  publishedAt: z.string().datetime().optional().nullable().or(z.literal('')),
  seoTitle: z.string().trim().max(500).optional().or(z.literal('')),
  seoDescription: z.string().trim().max(1000).optional().or(z.literal('')),
  pdfUrl: z.string().url('URL de PDF inválida').optional().or(z.literal('')),
  youtubeUrl: z.string().url('URL do YouTube inválida').optional().or(z.literal('')),
  relatedMaps: z.array(z.string()).optional().nullable(),
});
