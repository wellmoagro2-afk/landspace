/**
 * Helper para download de arquivos
 * Suporta arquivos locais e remotos com fallback para CORS
 */

export function downloadFile(url: string, filename?: string): void {
  // Se for arquivo local (começa com /), criar link direto
  if (url.startsWith("/")) {
    const link = document.createElement("a");
    link.href = url;
    if (filename) {
      link.download = filename;
    } else {
      // Extrair nome do arquivo da URL
      const urlParts = url.split("/");
      link.download = urlParts[urlParts.length - 1] || "documento.pdf";
    }
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } else {
    // Para URLs externas, tentar download direto
    // Se falhar (CORS), abrir em nova aba
    fetch(url, { method: "HEAD" })
      .then(() => {
        const link = document.createElement("a");
        link.href = url;
        link.download = filename || "documento.pdf";
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch(() => {
        // Se CORS impedir, abrir em nova aba
        window.open(url, "_blank", "noopener,noreferrer");
      });
  }
}
