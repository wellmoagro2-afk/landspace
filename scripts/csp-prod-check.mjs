/* eslint-disable no-console */
import { spawn } from 'child_process';

const BASE_URL = process.env.BASE_URL || 'http://localhost:3001';

async function runCommand(command, args, env = {}) {
  return new Promise((resolve, reject) => {
    const proc = spawn(command, args, {
      stdio: 'inherit',
      shell: true,
      env: { ...process.env, ...env },
    });

    proc.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Command failed with exit code ${code}`));
      }
    });

    proc.on('error', reject);
  });
}

async function main() {
  try {
    console.log('=== CSP Production Check ===');
    console.log('BASE_URL:', BASE_URL);
    console.log('');

    // Rodar check:csp-routes
    console.log('1/2: Rodando check:csp-routes...');
    await runCommand('node', ['scripts/csp-routes-check.mjs'], { BASE_URL });
    console.log('');

    // Rodar check:csp-console
    console.log('2/2: Rodando check:csp-console...');
    await runCommand('node', ['scripts/csp-console-check.mjs'], { BASE_URL });
    console.log('');

    console.log('RESULT: ✅ Todos os checks CSP passaram');
    process.exitCode = 0;
  } catch (error) {
    console.error('ERROR:', error?.message || error);
    process.exitCode = 1;
  }
}

main();
