/**
 * Validação de uploads
 */

const ALLOWED_EXTENSIONS = [
  // Documentos
  'pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx',
  // Imagens
  'jpg', 'jpeg', 'png', 'gif', 'webp', 'tiff', 'tif',
  // Arquivos geoespaciais
  'zip', 'rar', '7z', 'geojson', 'json', 'kml', 'kmz', 'shp', 'dbf', 'shx', 'prj',
  // Outros
  'txt', 'csv', 'xml',
];

const EXECUTABLE_EXTENSIONS = [
  'exe', 'bat', 'cmd', 'com', 'pif', 'scr', 'vbs', 'js', 'jar', 'msi', 'dll',
  'sh', 'bin', 'app', 'deb', 'rpm', 'dmg', 'pkg',
];

const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100 MB

/**
 * Validar extensão do arquivo
 */
export function validateFileExtension(filename: string): { valid: boolean; extension: string | null } {
  const extension = filename.split('.').pop()?.toLowerCase();
  
  if (!extension) {
    return { valid: false, extension: null };
  }

  // Bloquear executáveis
  if (EXECUTABLE_EXTENSIONS.includes(extension)) {
    return { valid: false, extension };
  }

  // Verificar se está na lista permitida
  if (!ALLOWED_EXTENSIONS.includes(extension)) {
    return { valid: false, extension };
  }

  return { valid: true, extension };
}

/**
 * Validar tamanho do arquivo
 */
export function validateFileSize(size: number): boolean {
  return size <= MAX_FILE_SIZE;
}

/**
 * Gerar nome seguro para arquivo (prevenir path traversal)
 */
export function generateSafeFilename(originalFilename: string, version: string, kind: string): string {
  // Remover caracteres perigosos
  const safeName = originalFilename
    .replace(/[^a-zA-Z0-9._-]/g, '_')
    .replace(/\.\./g, '_')
    .replace(/^\./, '_')
    .substring(0, 100); // Limitar tamanho

  const extension = originalFilename.split('.').pop()?.toLowerCase() || '';
  const timestamp = Date.now();
  
  return `${kind}_${version}_${timestamp}_${safeName}.${extension}`;
}
