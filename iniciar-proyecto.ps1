# ========================================
#  PROYECTO DE LANDING PAGES INMOBILIARIAS
# ========================================

Write-Host "========================================" -ForegroundColor Cyan
Write-Host " PROYECTO DE LANDING PAGES INMOBILIARIAS" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Abrir el archivo index.html en el navegador predeterminado
$indexPath = Join-Path $PSScriptRoot "index.html"
if (Test-Path $indexPath) {
    Write-Host "Abriendo el proyecto en el navegador..." -ForegroundColor Green
    Start-Process $indexPath
} else {
    Write-Host "Error: No se encontró index.html" -ForegroundColor Red
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Yellow
Write-Host " INSTRUCCIONES:" -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Yellow
Write-Host "1. Se abrirá el navegador con el proyecto"
Write-Host "2. Si hay problemas, ejecuta:"
Write-Host "   python -m http.server 8000" -ForegroundColor Green
Write-Host "3. Luego abre: http://localhost:8000"
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan

Read-Host "Presiona Enter para continuar"