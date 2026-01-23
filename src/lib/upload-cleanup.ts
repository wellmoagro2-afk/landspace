/**
 * Limpeza de uploads antigos
 * Remove arquivos e registros de projetos encerrados há mais de 12 meses
 */

import { prisma } from './prisma';
import { unlink, stat } from 'fs/promises';
import { join, resolve } from 'path';
import { auditLog, AuditActions } from './audit';

const RETENTION_MONTHS = 12;
const RETENTION_MS = RETENTION_MONTHS * 30 * 24 * 60 * 60 * 1000;

/**
 * Limpar uploads de projetos encerrados
 */
export async function cleanupOldUploads(): Promise<{
  projectsChecked: number;
  filesDeleted: number;
  errors: number;
}> {
  const cutoffDate = new Date(Date.now() - RETENTION_MS);
  let projectsChecked = 0;
  let filesDeleted = 0;
  let errors = 0;

  try {
    // Buscar projetos encerrados há mais de 12 meses
    const oldProjects = await prisma.project.findMany({
      where: {
        status: 'ENCERRADO',
        updatedAt: {
          lt: cutoffDate,
        },
      },
      include: {
        files: true,
      },
    });

    projectsChecked = oldProjects.length;

    for (const project of oldProjects) {
      for (const file of project.files) {
        try {
          const filePath = resolve(process.cwd(), file.storagePath);
          
          // Verificar se arquivo existe
          try {
            await stat(filePath);
            
            // Deletar arquivo
            await unlink(filePath);
            filesDeleted++;
          } catch (statError: any) {
            // Arquivo já não existe, apenas remover do banco
            if (statError.code !== 'ENOENT') {
              throw statError;
            }
          }

          // Remover registro do banco
          await prisma.projectFile.delete({
            where: { id: file.id },
          });
        } catch (error) {
          console.error(`[Cleanup] Erro ao deletar arquivo ${file.id}:`, error);
          errors++;
        }
      }

      // Registrar auditoria
      await auditLog({
        action: AuditActions.UPLOAD_CLEANUP,
        protocol: project.protocol,
        entityType: 'Project',
        entityId: project.id,
        metadata: {
          filesDeleted: project.files.length,
          projectStatus: project.status,
          projectUpdatedAt: project.updatedAt.toISOString(),
        },
        success: true,
      });
    }

    return {
      projectsChecked,
      filesDeleted,
      errors,
    };
  } catch (error) {
    console.error('[Cleanup] Erro geral:', error);
    throw error;
  }
}

/**
 * Verificar tamanho total de uploads
 */
export async function getUploadsStats(): Promise<{
  totalFiles: number;
  totalSizeBytes: number;
  projectsWithFiles: number;
}> {
  const files = await prisma.projectFile.findMany({
    include: {
      project: true,
    },
  });

  let totalSizeBytes = 0;
  const projectsWithFiles = new Set<string>();

  for (const file of files) {
    try {
      const filePath = resolve(process.cwd(), file.storagePath);
      const stats = await stat(filePath);
      totalSizeBytes += stats.size;
      projectsWithFiles.add(file.projectId);
    } catch {
      // Arquivo não existe, ignorar
    }
  }

  return {
    totalFiles: files.length,
    totalSizeBytes,
    projectsWithFiles: projectsWithFiles.size,
  };
}
