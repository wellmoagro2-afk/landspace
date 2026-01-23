# Script para atualizar .env.local com connection strings do Neon
# Compatível com PowerShell 5.1
# NÃO imprime URLs completas em logs

param(
    [Parameter(Mandatory=$true)]
    [string]$DatabaseUrl,
    
    [Parameter(Mandatory=$true)]
    [string]$DirectUrl
)

$ErrorActionPreference = "Stop"
$envPath = "D:\landspace\.env.local"

if (-not (Test-Path $envPath)) {
    Write-Host "[ERRO] .env.local nao encontrado: $envPath" -ForegroundColor Red
    exit 1
}

# Garantir sslmode=require
if ($DatabaseUrl -notmatch '[?&]sslmode=') {
    if ($DatabaseUrl -match '\?') {
        $DatabaseUrl = "$DatabaseUrl&sslmode=require"
    } else {
        $DatabaseUrl = "$DatabaseUrl?sslmode=require"
    }
}

if ($DirectUrl -notmatch '[?&]sslmode=') {
    if ($DirectUrl -match '\?') {
        $DirectUrl = "$DirectUrl&sslmode=require"
    } else {
        $DirectUrl = "$DirectUrl?sslmode=require"
    }
}

# Ler arquivo atual
$content = Get-Content $envPath -Raw
$lines = $content -split "`r?`n"

# Atualizar DATABASE_URL e DIRECT_URL
$newLines = @()
foreach ($line in $lines) {
    if ($line -match '^DATABASE_URL=') {
        $newLines += "DATABASE_URL=`"$DatabaseUrl`""
    } elseif ($line -match '^DIRECT_URL=') {
        $newLines += "DIRECT_URL=`"$DirectUrl`""
    } else {
        $newLines += $line
    }
}

# Salvar arquivo
$newLines | Set-Content $envPath -Encoding UTF8

# Mostrar apenas host e db (sem user/password)
$dbHost = if ($DatabaseUrl -match '@([^:/]+)') { $matches[1] } else { "***" }
$dbName = if ($DatabaseUrl -match '/([^?]+)') { $matches[1] } else { "***" }

Write-Host "[OK] .env.local atualizado" -ForegroundColor Green
Write-Host "   DATABASE_URL: postgresql://***@$dbHost/$dbName?sslmode=require" -ForegroundColor Cyan
Write-Host "   DIRECT_URL: postgresql://***@$dbHost/$dbName?sslmode=require" -ForegroundColor Cyan

exit 0
