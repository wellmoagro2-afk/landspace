#!/usr/bin/env node
/**
 * Garante que assets de imagem essenciais existam em public/
 * Cria placeholders mínimos (1x1px) quando arquivos estão faltando
 * 
 * Uso: node scripts/ensure-placeholder-assets.mjs
 */

import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');
const publicDir = join(projectRoot, 'public');

// PNG 1x1 transparente (base64)
const PNG_1X1_BASE64 = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';

// JPEG 1x1 (base64) - pixel preto (JPEG mínimo válido)
// JPEG válido mínimo 1x1px (bytes hex: FF D8 FF E0 00 10 4A 46 49 46 00 01 01 01 00 48 00 48 00 00 FF DB 00 43 00 08 06 06 07 06 05 08 07 07 07 09 09 08 0A 0C 14 0D 0C 0B 0B 0C 19 12 13 0F 14 1D 1A 1F 1E 1D 1A 1C 1C 20 24 2E 27 20 22 2C 23 1C 1C 28 37 29 2C 30 31 34 34 34 1F 27 39 3D 38 32 3C 2E 33 34 32 FF C0 00 0B 08 00 01 00 01 01 01 11 00 FF C4 00 14 00 01 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 08 FF C4 00 14 10 01 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 FF DA 00 08 01 01 00 00 3F 00 D9)
const JPEG_1X1_BASE64 = '/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/2wBDAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwA/wA==';

// Lista de arquivos a garantir
const REQUIRED_ASSETS = [
  'courses/modelagem-perda-solos-rusle.png',
  'courses/potencial-uso-conservacionista.png',
  'images/strategy/map-agua.jpg',
  'images/strategy/briefing-petroleo.jpg',
  'images/strategy/briefing-agua.jpg',
  'images/strategy/briefing-ucrania.jpg',
  'images/strategy/briefing-amazonia.jpg',
  'images/strategy/map-petroleo.jpg',
  'images/strategy/map-clima.jpg',
  'images/strategy/map-rotas.jpg',
  'images/strategy/map-minerais.jpg',
];

/**
 * Garante que um diretório existe
 */
function ensureDirectory(dirPath) {
  if (!existsSync(dirPath)) {
    mkdirSync(dirPath, { recursive: true });
  }
}

/**
 * Cria um placeholder PNG
 */
function createPNGPlaceholder(filePath) {
  const buffer = Buffer.from(PNG_1X1_BASE64, 'base64');
  writeFileSync(filePath, buffer);
}

/**
 * Cria um placeholder JPEG
 */
function createJPEGPlaceholder(filePath) {
  const buffer = Buffer.from(JPEG_1X1_BASE64, 'base64');
  writeFileSync(filePath, buffer);
}

/**
 * Garante que um arquivo existe, criando placeholder se necessário
 */
function ensureAsset(relativePath) {
  const fullPath = join(publicDir, relativePath);
  
  if (existsSync(fullPath)) {
    return { created: false, path: relativePath };
  }
  
  // Garantir que o diretório existe
  const assetDir = dirname(fullPath);
  ensureDirectory(assetDir);
  
  // Criar placeholder baseado na extensão
  if (relativePath.endsWith('.png')) {
    createPNGPlaceholder(fullPath);
  } else if (relativePath.endsWith('.jpg') || relativePath.endsWith('.jpeg')) {
    createJPEGPlaceholder(fullPath);
  } else {
    throw new Error(`Tipo de arquivo não suportado: ${relativePath}`);
  }
  
  return { created: true, path: relativePath };
}

/**
 * Main
 * Retorna JSON via stdout com a lista de arquivos criados (para integração com qa-csp.mjs)
 */
function main() {
  console.log('\n[Ensure Placeholders] Garantindo que assets de imagem existam...');
  
  let createdCount = 0;
  let existingCount = 0;
  const created = [];
  const createdFiles = []; // Lista de paths completos para cleanup
  const existing = [];
  
  for (const asset of REQUIRED_ASSETS) {
    const result = ensureAsset(asset);
    
    if (result.created) {
      createdCount++;
      created.push(asset);
      createdFiles.push(join(publicDir, asset));
    } else {
      existingCount++;
      existing.push(asset);
    }
  }
  
  console.log(`   ✓ Criados: ${createdCount} placeholder(s)`);
  if (created.length > 0) {
    created.forEach(asset => {
      console.log(`      - ${asset}`);
    });
  }
  
  console.log(`   ✓ Já existiam: ${existingCount} arquivo(s)`);
  
  if (createdCount === 0) {
    console.log('   → Todos os assets já existem, nenhum placeholder criado.');
  } else {
    console.log(`   → ${createdCount} placeholder(s) criado(s) com sucesso.`);
  }
  
  // Retornar JSON via stdout para integração com qa-csp.mjs
  const result = {
    createdCount,
    existingCount,
    createdFiles, // Paths completos dos arquivos criados
  };
  
  // Escrever JSON em linha especial no final que pode ser parseada
  // Usar delimitadores únicos para facilitar parsing
  console.log(`\n[PLACEHOLDER_RESULT]${JSON.stringify(result)}[/PLACEHOLDER_RESULT]`);
  
  return result;
}

// Executar
try {
  main();
  process.exitCode = 0;
} catch (error) {
  console.error('❌ Erro ao garantir placeholders:', error.message);
  if (error.stack) {
    console.error(error.stack);
  }
  process.exitCode = 1;
}
