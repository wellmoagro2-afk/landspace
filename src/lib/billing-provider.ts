/**
 * Camada de abstração para provedores de pagamento
 * MVP: ManualBillingProvider
 * Fase 2: Implementar Banco do Brasil (Pix/Boleto)
 */

import { PaymentMethod, PaymentStatus } from '@prisma/client';

export interface CreateChargeRequest {
  projectId: string;
  amount: number;
  method: PaymentMethod;
  description?: string;
}

export interface CreateChargeResponse {
  chargeId: string;
  qrCode?: string; // Para Pix
  barcode?: string; // Para Boleto
  expirationDate?: Date;
  paymentLink?: string;
}

export interface ConfirmPaymentRequest {
  chargeId: string;
  amount: number;
  method: PaymentMethod;
}

/**
 * Interface do provedor de pagamento
 */
export interface BillingProvider {
  createPixCharge(request: CreateChargeRequest): Promise<CreateChargeResponse>;
  createBoleto(request: CreateChargeRequest): Promise<CreateChargeResponse>;
  confirmPaymentWebhook(payload: unknown): Promise<ConfirmPaymentRequest | null>;
}

/**
 * Provedor manual (MVP)
 * Apenas registra pagamentos manualmente via admin
 */
export class ManualBillingProvider implements BillingProvider {
  async createPixCharge(request: CreateChargeRequest): Promise<CreateChargeResponse> {
    // TODO: Fase 2 - Integrar com API Pix Banco do Brasil
    // Por enquanto, retorna dados mockados
    return {
      chargeId: `manual-${Date.now()}`,
      qrCode: 'MOCK_QR_CODE',
      expirationDate: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24h
    };
  }

  async createBoleto(request: CreateChargeRequest): Promise<CreateChargeResponse> {
    // TODO: Fase 2 - Integrar com API Cobrança Banco do Brasil
    // Por enquanto, retorna dados mockados
    return {
      chargeId: `manual-${Date.now()}`,
      barcode: 'MOCK_BARCODE',
      expirationDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 dias
    };
  }

  async confirmPaymentWebhook(payload: unknown): Promise<ConfirmPaymentRequest | null> {
    // TODO: Fase 2 - Processar webhook do Banco do Brasil
    // Por enquanto, retorna null (confirmação manual)
    return null;
  }
}

// Instância singleton
export const billingProvider = new ManualBillingProvider();
