@echo off
echo Limpando cache do Next.js...
if exist .next rmdir /s /q .next
echo Cache limpo!
echo.
echo Parando processos Node.js...
taskkill /F /IM node.exe 2>nul
echo.
echo Iniciando servidor (Webpack, sem Turbopack)...
npm run dev
