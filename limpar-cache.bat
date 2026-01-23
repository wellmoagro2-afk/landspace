@echo off
echo ========================================
echo   Limpando Cache do Next.js
echo ========================================
echo.

REM Limpar pasta .next
if exist .next (
    echo [1/2] Removendo pasta .next...
    rmdir /s /q .next
    echo ✓ Cache do Next.js limpo!
) else (
    echo [1/2] Pasta .next nao encontrada (ok)
)

REM Limpar node_modules/.cache se existir
if exist node_modules\.cache (
    echo [2/2] Removendo cache do node_modules...
    rmdir /s /q node_modules\.cache
    echo ✓ Cache do node_modules limpo!
) else (
    echo [2/2] Cache do node_modules nao encontrado (ok)
)

echo.
echo ========================================
echo   Cache limpo com sucesso!
echo ========================================
echo.
echo IMPORTANTE: Agora limpe o cache do navegador:
echo   - Chrome/Edge: Ctrl+Shift+Delete
echo   - Ou pressione Ctrl+F5 (Hard Refresh)
echo.
echo Depois reinicie o servidor:
echo   npm run dev
echo.
pause



