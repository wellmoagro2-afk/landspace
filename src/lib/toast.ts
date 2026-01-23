import { toast } from "sonner";

/**
 * Helper functions para toasts padronizados no projeto Strategy
 * Usa sonner com tema Big Tech customizado
 */

export const toastSuccess = (message: string, description?: string) => {
  toast.success(message, {
    description,
    duration: 3000,
  });
};

export const toastError = (message: string, description?: string) => {
  toast.error(message, {
    description,
    duration: 4000,
  });
};

export const toastInfo = (message: string, description?: string) => {
  toast.info(message, {
    description,
    duration: 2500,
  });
};

// Mensagens padrão para ações comuns
export const toastMessages = {
  copyLink: {
    success: () => toastSuccess("Link copiado", "Pronto para colar."),
  },
  share: {
    success: () => toastSuccess("Compartilhado"),
    fallback: () => toastSuccess("Link copiado", "Pronto para colar."),
  },
  openPDF: () => toastInfo("Abrindo PDF"),
  downloadPDF: () => toastInfo("Download iniciado"),
  openMap: () => toastInfo("Abrindo mapa"),
  downloadMap: () => toastInfo("Download do mapa iniciado"),
  openCover: () => toastInfo("Abrindo capa"),
  error: (cause?: string) =>
    toastError("Não foi possível concluir", cause || "Tente novamente."),
};
