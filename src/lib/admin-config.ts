/**
 * Configurações do Admin (senha, etc)
 * Permite definir senha diretamente no portal
 */

import { prisma } from './prisma';
import { hashPin, verifyPin } from './portal-auth';
import { ENV } from './env';

const ADMIN_PASSWORD_KEY = 'admin_password';

/**
 * Hash bcrypt dummy para mitigação de timing attack
 * Hash válido de "dummy" gerado com bcrypt (cost 10)
 * Usado quando credencial é inválida para manter tempo de execução constante
 */
const DUMMY_BCRYPT_HASH = '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy';

/**
 * Executa comparação dummy para mitigar timing attack
 * Sempre retorna false após executar bcrypt.compare com hash dummy
 */
async function constantTimeFail(password: string): Promise<boolean> {
  try {
    // Executar comparação dummy para manter tempo de execução similar
    await verifyPin(password, DUMMY_BCRYPT_HASH);
  } catch {
    // Ignorar erros da comparação dummy
  }
  return false;
}

/**
 * Verificar se senha admin está configurada
 */
export async function hasAdminPassword(): Promise<boolean> {
  const config = await prisma.adminConfig.findUnique({
    where: { key: ADMIN_PASSWORD_KEY },
  });
  return !!config;
}

/**
 * Verificar senha admin
 * Retorna false para credenciais inválidas (sem lançar exceção)
 * Lança exceção apenas para erros reais de DB/conexão
 */
/**
 * Verificar senha admin
 * Retorna false para credenciais inválidas (sem lançar exceção)
 * Lança exceção apenas para erros reais de DB/conexão
 * 
 * Mitigação de timing attack: executa comparação dummy quando credencial é inválida
 */
/**
 * Verificar senha admin
 * Retorna false para credenciais inválidas (sem lançar exceção)
 * Lança exceção apenas para erros reais de DB/conexão
 * 
 * Mitigação de timing attack: executa comparação dummy quando credencial é inválida
 * 
 * Classificação de erros:
 * - "Tabela inexistente" (table missing) -> tratar como config não encontrada (fallback para ENV)
 * - Erros de inicialização/coneção do Prisma -> erro interno real (500)
 */
export async function verifyAdminPassword(password: string): Promise<boolean> {
  try {
    // Primeiro, tentar senha do banco
    const config = await prisma.adminConfig.findUnique({
      where: { key: ADMIN_PASSWORD_KEY },
    });

    if (config && config.value) {
      // Senha configurada no banco - verificar com bcrypt
      // Guard clause: garantir que config.value existe e é string válida
      if (!config.value || typeof config.value !== 'string') {
        // Hash ausente ou inválido - tratar como credencial inválida
        console.error('[verifyAdminPassword] Hash ausente ou inválido no banco');
        return await constantTimeFail(password);
      }

      try {
        const isValid = await verifyPin(password, config.value);
        if (!isValid) {
          // Senha não bate - retornar false (caso esperado)
          return false;
        }
        // Senha válida
        return true;
      } catch (bcryptError) {
        // Hash malformado ou erro no bcrypt - tratar como credencial inválida
        // Logar erro mas retornar false (não revelar ao cliente)
        console.error('[verifyAdminPassword] Erro ao verificar hash bcrypt:', {
          error: bcryptError instanceof Error ? bcryptError.message : 'Unknown error',
        });
        // Executar comparação dummy para mitigar timing attack
        return await constantTimeFail(password);
      }
    }

    // Fallback: usar ADMIN_KEY do env (com fallback para ADMIN_PASSWORD legacy)
    const secret = process.env.ADMIN_KEY ?? process.env.ADMIN_PASSWORD;
    if (!secret) {
      // Sem senha no banco e sem ADMIN_KEY/ADMIN_PASSWORD, acesso negado
      // Executar comparação dummy para mitigar timing attack
      return await constantTimeFail(password);
    }
    
    // Comparar com secret do env (comparação em memória, não precisa dummy)
    const isValid = password === secret;
    if (!isValid) {
      // Senha não bate com secret - executar comparação dummy para timing
      await constantTimeFail(password);
      return false;
    }
    return true;
  } catch (dbError) {
    // Classificar o erro: tabela inexistente vs erro real de DB
    
    // Verificar se é erro de "tabela inexistente" (ambiente não migrado)
    // Classificação: table missing = fallback para ENV, não é erro interno
    const isTableMissing = dbError instanceof Error && (
      dbError.message.includes('no such table') || // SQLite
      dbError.message.includes('does not exist') || // PostgreSQL (pode ser table ou column)
      (dbError.message.includes('Table') && dbError.message.includes('doesn\'t exist')) || // MySQL
      dbError.message.includes('P2021') || // Prisma: table does not exist
      (dbError.message.includes('P2025') && dbError.message.includes('table')) // Prisma: record not found em contexto de table
    );
    
    if (isTableMissing) {
      // Tabela inexistente = ambiente não migrado ou config não criada ainda
      // Tratar como "config não encontrada" e seguir para fallback do ENV (não é erro interno)
      console.warn('[verifyAdminPassword] Tabela AdminConfig não encontrada, usando fallback ADMIN_KEY/ADMIN_PASSWORD');
      
      // Fallback para ADMIN_KEY (com fallback para ADMIN_PASSWORD legacy)
      const secret = process.env.ADMIN_KEY ?? process.env.ADMIN_PASSWORD;
      if (!secret) {
        // Sem tabela e sem ADMIN_KEY/ADMIN_PASSWORD, acesso negado
        return await constantTimeFail(password);
      }
      
      // Comparar com secret do env
      const isValid = password === secret;
      if (!isValid) {
        await constantTimeFail(password);
        return false;
      }
      return true;
    }
    
    // NOVO: Verificar se é erro de configuração (DATABASE_URL incompatível)
    // Classificação: erro de configuração = 503 Service Unavailable (não 500)
    const isConfigError = dbError instanceof Error && (
      dbError.message.includes('Error validating datasource') ||
      dbError.message.includes('the URL must start with the protocol') ||
      (dbError.constructor.name === 'PrismaClientInitializationError' &&
       (dbError.message.includes('protocol') || dbError.message.includes('datasource')))
    );
    
    if (isConfigError) {
      // Erro de configuração = 503 Service Unavailable (não 500)
      // Logar erro claro e relançar com contexto
      console.error('[verifyAdminPassword] Erro de configuração do Prisma:', {
        error: dbError.message,
        constructor: dbError.constructor.name,
      });
      
      // Criar erro mais descritivo
      const configError = new Error(
        'Erro de configuração do banco de dados. ' +
        'Verifique se DATABASE_URL é compatível com o provider configurado em prisma/schema.prisma'
      );
      // Preservar causa original para diagnóstico
      (configError as Error & { cause?: Error }).cause = dbError;
      throw configError; // Será tratado como 503 no handler
    }
    
    // Verificar se é erro de conexão/DB real (unreachable, timeout, etc.)
    // Classificação: erros de DB unreachable = 503, outros erros internos = 500
    const isDbUnreachable = dbError instanceof Error && (
      dbError.message.includes('Can\'t reach database server') ||
      dbError.message.includes('Can not reach database server') ||
      dbError.message.includes('ECONNREFUSED') ||
      dbError.message.includes('P1001') || // Prisma connection error
      dbError.message.includes('P1002') || // Prisma connection timeout
      dbError.message.includes('P1017')    // Prisma server closed connection
    );
    
    if (isDbUnreachable) {
      // DB unreachable = 503 Service Unavailable (não 500)
      // Criar erro mais descritivo
      const unavailableError = new Error('Serviço indisponível');
      (unavailableError as Error & { cause?: Error; statusCode?: number }).cause = dbError;
      (unavailableError as Error & { statusCode?: number }).statusCode = 503;
      throw unavailableError;
    }
    
    // Outros erros de DB (não unreachable) = 500
    const isDbError = dbError instanceof Error && (
      dbError.message.includes('connection') ||
      dbError.message.includes('timeout')
    );
    
    if (isDbError) {
      // Erro real de DB - relançar para ser tratado como 500
      throw dbError;
    }
    
    // Outros erros inesperados do Prisma - também relançar (erro interno)
    throw dbError;
  }
}

/**
 * Definir/atualizar senha admin
 */
export async function setAdminPassword(password: string, updatedBy?: string): Promise<void> {
  const hash = await hashPin(password);

  await prisma.adminConfig.upsert({
    where: { key: ADMIN_PASSWORD_KEY },
    update: {
      value: hash,
      updatedBy,
    },
    create: {
      key: ADMIN_PASSWORD_KEY,
      value: hash,
      updatedBy,
    },
  });
}

/**
 * Verificar se é primeira configuração (sem senha no banco)
 */
export async function isFirstTimeSetup(): Promise<boolean> {
  return !(await hasAdminPassword());
}
