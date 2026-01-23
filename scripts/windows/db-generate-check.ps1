# Script PowerShell wrapper para db-generate-check.cmd
# Compatível com PowerShell 5.1
# Captura resultados resumidos sem vazar segredos

$ErrorActionPreference = "Continue"
# Determinar caminho do script .cmd
$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$scriptPath = Join-Path $scriptDir "db-generate-check.cmd"

if (-not (Test-Path $scriptPath)) {
    Write-Host "[ERRO] Script .cmd nao encontrado: $scriptPath" -ForegroundColor Red
    exit 1
}

$fullPath = Resolve-Path $scriptPath

Write-Host "`n=== Executando db:generate e db:check ===" -ForegroundColor Cyan

# Executar via cmd.exe e capturar output
$output = & cmd.exe /c "`"$fullPath`" 2>&1"
$exitCode = $LASTEXITCODE

# Filtrar e mostrar apenas resultados resumidos (sem segredos)
$inGenerate = $false
$inCheck = $false
$generateOk = $false
$checkOk = $false
$errorSummary = @()

foreach ($line in $output) {
    # Detectar início de cada etapa
    if ($line -match '\[1/2\]') {
        $inGenerate = $true
        $inCheck = $false
    }
    if ($line -match '\[2/2\]') {
        $inGenerate = $false
        $inCheck = $true
    }
    
    # Detectar sucesso
    if ($line -match 'Generated Prisma Client' -or $line -match 'Prisma Client generated') {
        $generateOk = $true
    }
    if ($line -match 'Verificacao concluida' -or $line -match 'Banco de dados esta funcionando') {
        $checkOk = $true
    }
    
    # Capturar erros (filtrar segredos)
    if ($line -match 'ERRO|Error|error|Failed|failed') {
        $cleanLine = $line -replace 'postgresql://[^@]+@', 'postgresql://***@'
        $cleanLine = $cleanLine -replace 'password[=:][^\s]+', 'password=***'
        $cleanLine = $cleanLine -replace 'PASSWORD[=:][^\s]+', 'PASSWORD=***'
        if ($cleanLine -notmatch 'node_modules' -and $cleanLine.Length -lt 200) {
            $errorSummary += $cleanLine
        }
    }
}

# Mostrar resultados resumidos
Write-Host "`n=== Resultados ===" -ForegroundColor Cyan
if ($generateOk) {
    Write-Host "[OK] db:generate OK" -ForegroundColor Green
} else {
    Write-Host "[ERRO] db:generate falhou" -ForegroundColor Red
    if ($errorSummary.Count -gt 0) {
        Write-Host "   Primeiro erro: $($errorSummary[0])" -ForegroundColor Yellow
    }
}

if ($checkOk) {
    Write-Host "[OK] db:check OK" -ForegroundColor Green
} else {
    Write-Host "[ERRO] db:check falhou" -ForegroundColor Red
    if ($errorSummary.Count -gt 0) {
        $checkErrors = $errorSummary | Where-Object { $_ -match 'check|conexao|connection' }
        if ($checkErrors.Count -gt 0) {
            Write-Host "   Erro: $($checkErrors[0])" -ForegroundColor Yellow
        } else {
            Write-Host "   Erro: $($errorSummary[0])" -ForegroundColor Yellow
        }
    }
}

if ($exitCode -ne 0) {
    Write-Host "`n[ERRO] Script falhou com codigo: $exitCode" -ForegroundColor Red
    exit $exitCode
}

Write-Host "`n[OK] Todos os comandos executados com sucesso" -ForegroundColor Green
exit 0
