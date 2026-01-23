@echo off
REM Script para gerar Prisma Client e verificar conexão com banco
REM Compatível com Windows CMD

cd /d D:\landspace

echo [1/2] Gerando Prisma Client...
call npm run db:generate
IF %ERRORLEVEL% NEQ 0 (
    echo [ERRO] db:generate falhou com codigo %ERRORLEVEL%
    EXIT /B %ERRORLEVEL%
)

echo [2/2] Verificando conexao com banco...
call npm run db:check
IF %ERRORLEVEL% NEQ 0 (
    echo [ERRO] db:check falhou com codigo %ERRORLEVEL%
    EXIT /B %ERRORLEVEL%
)

echo [OK] db:generate e db:check concluidos com sucesso
EXIT /B 0
