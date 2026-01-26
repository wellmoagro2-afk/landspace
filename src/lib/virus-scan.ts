/**
 * Preparação para vírus scan (ClamAV)
 * Estrutura pronta, mas não obrigatória no MVP
 */

import { exec } from 'child_process';
import { promisify } from 'util';
import { readFile } from 'fs/promises';
import type { ExecException } from 'child_process';

const execAsync = promisify(exec);

const CLAMAV_ENABLED = process.env.CLAMAV_ENABLED === 'true';
const CLAMAV_SOCKET = process.env.CLAMAV_SOCKET || '/var/run/clamav/clamd.ctl';

/**
 * Type guards e helpers para erros
 */
function isObject(x: unknown): x is Record<string, unknown> {
  return typeof x === 'object' && x !== null && !Array.isArray(x);
}

function getErrMsg(e: unknown): string {
  if (e instanceof Error) {
    return e.message;
  }
  if (isObject(e) && typeof e.message === 'string') {
    return e.message;
  }
  return String(e);
}

function getErrCode(e: unknown): string | undefined {
  if (isObject(e) && 'code' in e) {
    const code = e.code;
    if (typeof code === 'string') {
      return code;
    }
    if (typeof code === 'number') {
      return String(code);
    }
  }
  // Verificar se é ExecException do Node.js
  if (e && typeof e === 'object' && 'code' in e) {
    const code = (e as ExecException).code;
    if (code) {
      return typeof code === 'string' ? code : String(code);
    }
  }
  return undefined;
}

function isExecResult(value: unknown): value is { stdout: string; stderr: string } {
  return (
    isObject(value) &&
    typeof value.stdout === 'string' &&
    typeof value.stderr === 'string'
  );
}

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
      const result = await execAsync(
        `clamdscan --fdpass --no-summary "${filePath}"`
      );

      if (!isExecResult(result)) {
        throw new Error('Resultado de exec inválido');
      }

      const { stdout, stderr } = result;

      // ClamAV retorna código 0 se limpo, 1 se infectado
      if (stderr.includes('FOUND')) {
        const virusMatch = stderr.match(/FOUND: (.+)/);
        return {
          clean: false,
          virus: virusMatch ? virusMatch[1] : 'Unknown',
        };
      }

      return { clean: true };
    } catch (clamdError: unknown) {
      // Tentar clamscan como fallback
      try {
        const result = await execAsync(
          `clamscan --no-summary "${filePath}"`
        );

        if (!isExecResult(result)) {
          throw new Error('Resultado de exec inválido');
        }

        const { stdout, stderr } = result;

        if (stderr.includes('FOUND')) {
          const virusMatch = stderr.match(/FOUND: (.+)/);
          return {
            clean: false,
            virus: virusMatch ? virusMatch[1] : 'Unknown',
          };
        }

        return { clean: true };
      } catch (clamscanError: unknown) {
        // Se ambos falharem, aceitar arquivo (fallback)
        console.warn('[Virus Scan] ClamAV não disponível, arquivo aceito sem scan');
        return { clean: true };
      }
    }
  } catch (error: unknown) {
    // Se ClamAV não estiver rodando, aceitar arquivo (fallback)
    const code = getErrCode(error);
    if (code === 'ENOENT' || code === 'ECONNREFUSED') {
      console.warn('[Virus Scan] ClamAV não disponível, arquivo aceito sem scan');
      return { clean: true };
    }

    return {
      clean: false,
      error: getErrMsg(error),
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
