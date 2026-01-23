/**
 * Preparação para vírus scan (ClamAV)
 * Estrutura pronta, mas não obrigatória no MVP
 */

import { exec } from 'child_process';
import { promisify } from 'util';
import { readFile } from 'fs/promises';

const execAsync = promisify(exec);

const CLAMAV_ENABLED = process.env.CLAMAV_ENABLED === 'true';
const CLAMAV_SOCKET = process.env.CLAMAV_SOCKET || '/var/run/clamav/clamd.ctl';

/**
 * Verificar se ClamAV está disponível
 */
export async function isClamAVAvailable(): Promise<boolean> {
  if (!CLAMAV_ENABLED) {
    return false;
  }

  try {
    await execAsync(`clamdscan --version`);
    return true;
  } catch {
    return false;
  }
}

/**
 * Escanear arquivo com ClamAV
 */
export async function scanFile(filePath: string): Promise<{
  clean: boolean;
  virus?: string;
  error?: string;
}> {
  if (!CLAMAV_ENABLED) {
    // Se não estiver habilitado, considerar limpo (MVP)
    return { clean: true };
  }

  try {
    const isAvailable = await isClamAVAvailable();
    
    if (!isAvailable) {
      console.warn('[Virus Scan] ClamAV não disponível, arquivo aceito sem scan');
      return { clean: true };
    }

    // Escanear arquivo usando clamdscan (socket) ou clamscan (fallback)
    try {
      const { stdout, stderr } = await execAsync(
        `clamdscan --fdpass --no-summary "${filePath}"`
      );

      // ClamAV retorna código 0 se limpo, 1 se infectado
      if (stderr.includes('FOUND')) {
        const virusMatch = stderr.match(/FOUND: (.+)/);
        return {
          clean: false,
          virus: virusMatch ? virusMatch[1] : 'Unknown',
        };
      }

      return { clean: true };
    } catch (clamdError: any) {
      // Tentar clamscan como fallback
      try {
        const { stdout, stderr } = await execAsync(
          `clamscan --no-summary "${filePath}"`
        );

        if (stderr.includes('FOUND')) {
          const virusMatch = stderr.match(/FOUND: (.+)/);
          return {
            clean: false,
            virus: virusMatch ? virusMatch[1] : 'Unknown',
          };
        }

        return { clean: true };
      } catch (clamscanError: any) {
        // Se ambos falharem, aceitar arquivo (fallback)
        console.warn('[Virus Scan] ClamAV não disponível, arquivo aceito sem scan');
        return { clean: true };
      }
    }
  } catch (error: any) {
    // Se ClamAV não estiver rodando, aceitar arquivo (fallback)
    if (error.code === 'ENOENT' || error.code === 'ECONNREFUSED') {
      console.warn('[Virus Scan] ClamAV não disponível, arquivo aceito sem scan');
      return { clean: true };
    }

    return {
      clean: false,
      error: error.message,
    };
  }
}

/**
 * Escanear buffer de arquivo (para uploads em memória)
 */
export async function scanBuffer(buffer: Buffer, tempPath: string): Promise<{
  clean: boolean;
  virus?: string;
  error?: string;
}> {
  // Salvar temporariamente e escanear
  const { writeFile } = await import('fs/promises');
  await writeFile(tempPath, buffer);
  
  try {
    const result = await scanFile(tempPath);
    return result;
  } finally {
    // Limpar arquivo temporário
    try {
      const { unlink } = await import('fs/promises');
      await unlink(tempPath);
    } catch {
      // Ignorar erro de limpeza
    }
  }
}
