/**
 * Auditoria persistente
 */

import { prisma } from './prisma';
import { LogContext } from './observability';

export interface AuditLogData {
  requestId?: string;
  userId?: string;
  protocol?: string;
  action: string;
  entityType?: string;
  entityId?: string;
  metadata?: Record<string, any>;
  ipAddress?: string;
  userAgent?: string;
  success?: boolean;
  errorMessage?: string;
}

/**
 * Registrar evento de auditoria
 */
export async function auditLog(data: AuditLogData): Promise<void> {
  try {
    await prisma.auditLog.create({
      data: {
        requestId: data.requestId,
        userId: data.userId,
        protocol: data.protocol,
        action: data.action,
        entityType: data.entityType,
        entityId: data.entityId,
        metadata: data.metadata ? JSON.stringify(data.metadata) : null,
        ipAddress: data.ipAddress,
        userAgent: data.userAgent,
        success: data.success ?? true,
        errorMessage: data.errorMessage,
      },
    });
  } catch (error) {
    // Não quebrar o fluxo se a auditoria falhar
    console.error('[Audit] Erro ao registrar log:', error);
  }
}

/**
 * Ações de auditoria padronizadas
 */
export const AuditActions = {
  // Portal
  PORTAL_LOGIN_SUCCESS: 'portal_login_success',
  PORTAL_LOGIN_FAILED: 'portal_login_failed',
  PORTAL_LOGOUT: 'portal_logout',
  PORTAL_FILE_DOWNLOAD: 'portal_file_download',
  PORTAL_FILE_DOWNLOAD_BLOCKED: 'portal_file_download_blocked',
  
  // Admin
  ADMIN_LOGIN_SUCCESS: 'admin_login_success',
  ADMIN_LOGIN_FAILED: 'admin_login_failed',
  ADMIN_LOGOUT: 'admin_logout',
  ADMIN_PROJECT_CREATE: 'admin_project_create',
  ADMIN_PROJECT_UPDATE: 'admin_project_update',
  ADMIN_PROJECT_DELETE: 'admin_project_delete',
  ADMIN_PIN_RESET: 'admin_pin_reset',
  ADMIN_PAYMENT_CREATE: 'admin_payment_create',
  ADMIN_FILE_UPLOAD: 'admin_file_upload',
  ADMIN_FINAL_RELEASE: 'admin_final_release',
  
  // Sistema
  RATE_LIMIT_EXCEEDED: 'rate_limit_exceeded',
  UPLOAD_CLEANUP: 'upload_cleanup',
} as const;
