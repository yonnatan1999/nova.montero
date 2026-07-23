@echo off
echo ========================================
echo  PROYECTO DE LANDING PAGES INMOBILIARIAS
echo ========================================
echo.
echo Abriendo el proyecto en el navegador...
echo.

REM Abrir el archivo index.html en el navegador predeterminado
start "" "%~dp0index.html"

echo.
echo ========================================
echo  INSTRUCCIONES:
echo ========================================
echo 1. Se abrirá el navegador con el proyecto
echo 2. Si hay problemas, ejecuta:
echo    python -m http.server 8000
echo 3. Luego abre: http://localhost:8000
echo.
echo ========================================
echo.

pause