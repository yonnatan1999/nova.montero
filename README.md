# Sistema de Landing Pages para Venta de Casas

Sistema profesional de páginas de aterrizaje (landing pages) dinámicas para la venta de propiedades inmobiliarias.

## Características Principales

- **Diseño Responsivo**: Se adapta a dispositivos móviles, tablets y escritorio
- **Integración WhatsApp**: Botón flotante con mensaje preconfigurado para cada propiedad
- **Optimizado para SEO**: Meta tags optimizados para buscadores
- **Carga Rápida**: Sin frameworks pesados, usando Tailwind CSS vía CDN
- **Fácil Mantenimiento**: Estructura modular y archivos de configuración

## Estructura del Proyecto

```
├── assets/
│   ├── css/           # Estilos personalizados
│   ├── js/            # JavaScript functionality
│   └── images/        # Imágenes de propiedades
├── data/              # Datos de propiedades (JSON)
├── propiedades/       # Landing pages individuales
├── plantillas/        # Plantillas maestras
├── docs/              # Documentación
└── index.html         # Página principal (listado)
```

## Inicio Rápido

### 1. Configurar Número de WhatsApp

Edita `assets/js/main.js` y `assets/js/property.js`:

```javascript
const CONFIG = {
    whatsappNumber: '525551234567', // Tu número con código de país
    // ...
};
```

### 2. Agregar Imágenes

Coloca las imágenes de las propiedades en `assets/images/`:

- Imágenes principales: 1200x800 px
- Galería: 800x600 px
- Formato: JPG o WebP
- Peso máximo: 200KB por imagen

### 3. Crear Nueva Propiedad

1. Copia `plantillas/index.html` a `propiedades/[id]/index.html`
2. Reemplaza los placeholders con los datos de la propiedad
3. Agrega las imágenes correspondientes

### 4. Desplegar

**Opción rápida (Netlify):**
1. Ve a [app.netlify.com](https://app.netlify.com/)
2. Arrastra la carpeta del proyecto
3. ¡Listo!

**Opción Git:**
```bash
git init
git add .
git commit -m "Inicial"
git remote add origin https://github.com/tu-usuario/tu-repo.git
git push -u origin main
```

## Personalización

### Cambiar Colores

Edita las variables CSS en `assets/css/styles.css`:

```css
:root {
    --primary-color: #2563eb;      /* Color principal */
    --primary-hover: #1d4ed8;      /* Color hover */
    --secondary-color: #10b981;    /* Color secundario */
}
```

### Agregar Propiedades al Listado

Edita `data/properties.json` para agregar nuevas propiedades al listado principal.

## Tecnologías Utilizadas

- **HTML5**: Estructura semántica
- **CSS3**: Tailwind CSS vía CDN
- **JavaScript**: Vanilla JS (sin dependencias)
- **JSON**: Almacenamiento de datos

## Rendimiento

- **Carga inicial**: < 2 segundos en 3G
- **Imágenes optimizadas**: Compresión automática
- **Sin frameworks pesados**: Vanilla JavaScript

## Navegación

- [Página Principal](index.html) - Listado de propiedades
- [Propiedad 1](propiedades/1/index.html) - Ejemplo landing page
- [Guía de Despliegue](docs/guia-despliegue.md) - Instrucciones detalladas

## Licencia

Uso exclusivo para el proyecto inmobiliario.

## Soporte

Para soporte técnico, consulta la guía de despliegue o contacta al equipo de desarrollo.