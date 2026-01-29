/**
 * Helper functions para toasts padronizados (CSP-safe)
 * Dispara eventos "ls:toast" consumidos por ToastViewport (sem inline styles)
 */

type ToastType = "success" | "error" | "info";

function dispatchToast(type: ToastType, message: string, description?: string, durationMs?: number) {
  if (typeof window === "undefined") return;

  const defaultDuration =
    type === "success" ? 3000 : type === "error" ? 4000 : 2500;

  window.dispatchEvent(
    new CustomEvent("ls:toast", {
      detail: {
        type,
        message,
        description,
        durationMs: durationMs ?? defaultDuration,
      },
    })
  );
}

export const toastSuccess = (message: string, description?: string) => {
  dispatchToast("success", message, description, 3000);
};

export const toastError = (message: string, description?: string) => {
  dispatchToast("error", message, description, 4000);
};

export const toastInfo = (message: string, description?: string) => {
  dispatchToast("info", message, description, 2500);
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
