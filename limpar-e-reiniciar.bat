@echo off
echo ========================================
echo Limpando cache e reiniciando servidor
echo ========================================
echo.

echo [1/4] Parando processos Node.js...
taskkill /F /IM node.exe >nul 2>&1
if %errorlevel% == 0 (
    echo Processos Node.js finalizados.
) else (
    echo Nenhum processo Node.js encontrado.
)
echo.

echo [2/4] Limpando cache do Next.js (.next)...
if exist .next (
    rmdir /s /q .next
    echo Cache .next removido.
) else (
    echo Pasta .next nao encontrada.
)
echo.

echo [3/4] Limpando cache do Node (node_modules/.cache)...
if exist node_modules\.cache (
    rmdir /s /q node_modules\.cache
    echo Cache do Node removido.
) else (
    echo Cache do Node nao encontrado.
)
echo.

echo [4/4] Iniciando servidor de desenvolvimento...
echo.
echo Servidor iniciando em http://localhost:3000
echo Pressione Ctrl+C para parar o servidor.
echo.
npm run dev
