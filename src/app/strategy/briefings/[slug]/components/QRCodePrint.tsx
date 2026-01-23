"use client";

/**
 * QR Code para impressão - Aparece apenas no print
 * Gera QR Code apontando para a URL do briefing
 */
interface QRCodePrintProps {
  url: string;
}

export default function QRCodePrint({ url }: QRCodePrintProps) {
  // Usar API pública para gerar QR Code
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(url)}`;
  
  return (
    <div className="hidden print:block print-qrcode">
      <img 
        src={qrCodeUrl} 
        alt={`QR Code para ${url}`}
        className="print-qrcode-image"
      />
      <div className="print-qrcode-label">
        Acesse a versão interativa
      </div>
    </div>
  );
}
