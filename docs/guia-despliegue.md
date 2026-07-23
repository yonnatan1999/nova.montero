# Guía de Despliegue - Sistema de Landing Pages para Venta de Casas

## Estructura del Proyecto

```
proyecto-paginas-venta-casas/
├── assets/
│   ├── css/
│   │   └── styles.css          # Estilos personalizados
│   ├── js/
│   │   ├── main.js             # JavaScript principal
│   │   └── property.js         # JavaScript para páginas de propiedades
│   └── images/
│       ├── favicon.ico         # Icono del sitio
│       ├── propiedad-1.jpg     # Imágenes de propiedades
│       └── ...
├── data/
│   └── properties.json         # Datos de propiedades
├── propiedades/
│   ├── 1/
│   │   └── index.html          # Landing page propiedad 1
│   ├── 2/
│   │   └── index.html          # Landing page propiedad 2
│   └── ...
├── plantillas/
│   └── index.html              # Plantilla maestra
├── docs/
│   └── guia-despliegue.md      # Esta guía
├── index.html                  # Página principal (listado)
└── especificaciones.txt        # Especificaciones originales
```

## Requisitos Previos

1. **Cuenta en Netlify o GitHub Pages** (gratuitas)
2. **Git instalado** (opcional para Netlify CLI)
3. **Imágenes de propiedades** en formato JPG/WebP

## Paso 1: Preparar Imágenes

### Optimización de Imágenes

Antes de subir las imágenes, optimízalas para web:

1. **Compresión**: Usa herramientas como [TinyPNG](https://tinypng.com/) o [Squoosh](https://squoosh.app/)
2. **Tamaño recomendado**: 
   - Imágenes principales: 1200x800 px
   - Galería: 800x600 px
3. **Formato**: JPG para fotografías, WebP para mejor compresión
4. **Peso máximo**: 200KB por imagen

### Estructura de Imágenes

Coloca las imágenes en `assets/images/` con la siguiente convención:

```
assets/images/
├── propiedad-1.jpg        # Imagen principal propiedad 1
├── propiedad-1-1.jpg      # Galería propiedad 1
├── propiedad-1-2.jpg
└── ...
```

## Paso 2: Configurar Número de WhatsApp

Edita el archivo `assets/js/main.js` y `assets/js/property.js`:

```javascript
const CONFIG = {
    whatsappNumber: '525551234567',  // Tu número con código de país
    defaultMessage: 'Hola, estoy interesado en una propiedad',
    // ...
};
```

**Formato del número**: Código de país + número sin espacios ni guiones
- México: `52` + número
- España: `34` + número
- Colombia: `57` + número

## Paso 3: Agregar Nuevas Propiedades

### 3.1 Crear Carpeta de Propiedad

```bash
mkdir propiedades/3
```

### 3.2 Crear Archivo HTML

Copia la plantilla `plantillas/index.html` a `propiedades/3/index.html`

### 3.3 Reemplazar Placeholders

Busca y reemplaza los siguientes placeholders:

| Placeholder | Descripción | Ejemplo |
|-------------|-------------|---------|
| `[TITULO_PROPIEDAD]` | Nombre de la propiedad | `Casa Moderna en Zona Norte` |
| `[DESCRIPCION_PROPIEDAD]` | Descripción corta | `Hermosa casa con vista al mar` |
| `[TIPO_PROPIEDAD]` | Tipo de inmueble | `casa`, `departamento`, `terreno` |
| `[UBICACION]` | Dirección completa | `Cancún, QROO` |
| `[PRECIO]` | Precio formateado | `$1,500,000 MXN` |
| `[HABITACIONES]` | Número de recámaras | `3` |
| `[BAÑOS]` | Número de baños | `2` |
| `[METROS_CUADRADOS]` | Superficie en m² | `180` |
| `[ESTACIONAMIENTO]` | Lugares de estacionamiento | `1` |
| `[URL_IMAGEN_PRINCIPAL]` | Ruta a imagen principal | `../../assets/images/propiedad-3.jpg` |
| `[URL_WHATSAPP]` | Enlace WhatsApp con mensaje | Ver ejemplo abajo |
| `[NOMBRE_ASESOR]` | Nombre del asesor | `Juan Pérez` |
| `[TELEFONO_ASESOR]` | Teléfono del asesor | `+52 555 123 4567` |
| `[EMAIL_ASESOR]` | Email del asesor | `juan@inmobiliaria.com` |

### Ejemplo de URL WhatsApp

```
https://wa.me/525551234567?text=Hola,%20vi%20la%20Casa%20Moderna%20en%20Zona%20Norte%20y%20estoy%20interesado.%20%C2%BFPodr%C3%ADa%20darme%20m%C3%A1s%20informaci%C3%B3n%3F
```

**Nota**: El mensaje debe estar en formato URL encode (espacios = `%20`).

### 3.4 Actualizar Datos JSON (Opcional)

Si deseas que las propiedades aparezcan en el listado principal, agrega los datos en `data/properties.json`.

## Paso 4: Despliegue en Netlify

### Opción A: Panel de Netlify (Arrastrar y Soltar)

1. Ve a [app.netlify.com](https://app.netlify.com/)
2. Inicia sesión con tu cuenta
3. Arrastra la carpeta del proyecto completa al área de despliegue
4. Espera a que termine la carga
5. ¡Listo! Tu sitio estará disponible en una URL como `https://tu-sitio-12345.netlify.app`

### Opción B: Netlify CLI

1. Instala Netlify CLI:
```bash
npm install -g netlify-cli
```

2. Inicia sesión:
```bash
netlify login
```

3. Inicializa el sitio:
```bash
netlify init
```

4. Despliega:
```bash
netlify deploy --prod
```

### Opción C: Git + Netlify

1. Crea un repositorio en GitHub/GitLab/Bitbucket
2. Sube el código:
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/tu-usuario/tu-repositorio.git
git push -u origin main
```

3. En Netlify, conecta tu repositorio
4. Configura:
   - Build command: (dejar vacío)
   - Publish directory: `.` (punto)

## Paso 5: Despliegue en GitHub Pages

1. Crea un repositorio en GitHub
2. Sube el código
3. Ve a Settings > Pages
4. Selecciona la rama `main`
5. Guarda

## Configuración de Dominio Personalizado

### En Netlify

1. Ve a Domain Settings
2. Agrega tu dominio personalizado
3. Configura los records DNS:
   - Type: `A`, Name: `@`, Value: `75.2.60.5`
   - Type: `CNAME`, Name: `www`, Value: `tu-sitio.netlify.app`

### En GitHub Pages

1. Agrega un archivo `CNAME` en la raíz con tu dominio
2. Configura los DNS con tu proveedor

## Generación de Códigos QR

### Opción 1: API Pública

Usa la API de qrserver.com:

```
https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=TU_URL
```

### Opción 2: Generador Local

Instala una librería como `qrcode` en Node.js:

```bash
npm install qrcode
```

```javascript
const QRCode = require('qrcode');
QRCode.toFile('qr-propiedad-1.png', 'https://tu-sitio.netlify.app/propiedades/1/');
```

## Mantenimiento

### Actualizar Propiedades

1. Edita `data/properties.json`
2. Crea nuevas carpetas en `propiedades/`
3. Sube los cambios a Git o arrastra a Netlify

### Optimización de Rendimiento

- Comprime imágenes regularmente
- Minifica CSS/JS en producción
- Usa CDN de Tailwind (ya incluido)

## Solución de Problemas

### Las imágenes no se cargan

- Verifica las rutas relativas
- Asegúrate de que los archivos existen
- Revisa las mayúsculas/minúsculas en nombres de archivo

### WhatsApp no funciona

- Verifica el formato del número (código de país + número)
- Asegúrate de que el mensaje esté en URL encode
- Prueba el enlace directamente en el navegador

### Estilos no se aplican

- Verifica que la ruta a `styles.css` sea correcta
- Limpia la caché del navegador
- Revisa la consola del navegador para errores

## Contacto

Para soporte o dudas, contacta al equipo de desarrollo.

---

**Versión**: 1.0  
**Última actualización**: Julio 2026