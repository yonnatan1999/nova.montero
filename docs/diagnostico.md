# Diagnóstico del Proyecto - Landing Pages Inmobiliarias

## Problema: "Al darle en ver detalles no pasa nada"

### Causa Común
El JavaScript no se carga correctamente o hay errores en la consola.

### Soluciones

#### 1. Abrir Consola del Navegador
- Presiona `F12` en el navegador
- Ve a la pestaña "Console"
- Busca errores en rojo

#### 2. Verificar Rutas de Archivos
Asegúrate de que la estructura sea:
```
proyecto-paginas-venta-casas/
├── index.html          ← Este archivo
├── assets/
│   ├── js/
│   │   └── main.js     ← JavaScript
│   └── images/         ← Imágenes
├── data/
│   └── properties.json ← Datos
└── propiedades/
    ├── 1/index.html    ← Páginas individuales
    └── 2/index.html
```

#### 3. Probar con Servidor Local
Los navegadores modernos bloquean archivos locales por seguridad.

**Opción A: Python**
```bash
cd "D:\proyectos de travajo\proyecto paginas para venta de casas"
python -m http.server 8000
```
Luego abre: http://localhost:8000

**Opción B: Node.js**
```bash
npx serve .
```

**Opción C: VS Code**
- Instala extensión "Live Server"
- Clic derecho en index.html → "Open with Live Server"

#### 4. Verificar que las Imágenes Existan
Lista de imágenes requeridas:
- `assets/images/propiedad-1.jpg`
- `assets/images/propiedad-2.jpg`
- `assets/images/propiedad-3.jpg`
- `assets/images/propiedad-4.jpg`
- `assets/images/propiedad-5.jpg`
- `assets/images/propiedad-6.jpg`

#### 5. Verificar el Archivo properties.json
Debe estar en `data/properties.json` con formato JSON válido.

### Prueba Rápida
1. Abre `index.html` en el navegador
2. Abre consola (F12)
3. Escribe: `console.log(properties)`
4. Debería mostrar un array con 6 propiedades

### Si el Problema Persiste
1. Limpia la caché del navegador (Ctrl+Shift+R)
2. Prueba en modo incógnito
3. Verifica que no haya errores de CORS en consola

## Archivos Importantes

| Archivo | Función |
|---------|---------|
| `index.html` | Página principal con listado |
| `assets/js/main.js` | Lógica JavaScript |
| `data/properties.json` | Datos de propiedades |
| `propiedades/1/index.html` | Landing page individual |

## Contacto
Si el problema persiste, verifica:
1. Que JavaScript esté habilitado
2. Que no tengas bloqueadores de anuncios
3. Que el archivo properties.json sea válido