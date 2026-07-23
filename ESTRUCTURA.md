# Estructura del Proyecto - Sistema de Landing Pages para Venta de Casas

```
proyecto-paginas-venta-casas/
│
├── 📁 assets/
│   ├── 📁 css/
│   │   └── styles.css              # Estilos personalizados CSS
│   │
│   ├── 📁 js/
│   │   ├── main.js                 # JavaScript principal (listado)
│   │   └── property.js             # JavaScript para páginas individuales
│   │
│   └── 📁 images/
│       ├── favicon.ico             # Icono del sitio web
│       ├── propiedad-1.jpg         # Imagen principal propiedad 1
│       ├── propiedad-1-1.jpg       # Galería propiedad 1
│       ├── propiedad-1-2.jpg
│       ├── propiedad-2.jpg         # Imagen principal propiedad 2
│       ├── propiedad-2-1.jpg       # Galería propiedad 2
│       └── ...                     # Más imágenes de propiedades
│
├── 📁 data/
│   └── properties.json             # Datos de todas las propiedades
│
├── 📁 propiedades/
│   ├── 📁 1/
│   │   └── index.html              # Landing page propiedad 1
│   │
│   ├── 📁 2/
│   │   └── index.html              # Landing page propiedad 2
│   │
│   ├── 📁 3/
│   │   └── index.html              # Landing page propiedad 3
│   │
│   └── ...                         # Más propiedades
│
├── 📁 plantillas/
│   └── index.html                  # Plantilla maestra para nuevas propiedades
│
├── 📁 docs/
│   └── guia-despliegue.md          # Guía completa de despliegue
│
├── index.html                      # Página principal (listado de propiedades)
├── package.json                    # Configuración del proyecto
├── netlify.toml                    # Configuración de Netlify
├── CNAME                           # Dominio personalizado (opcional)
├── .gitignore                      # Archivos ignorados por Git
├── README.md                       # Documentación principal
└── especificaciones.txt            # Especificaciones originales del proyecto
```

## Descripción de Carpetas

### 📁 assets/
Contiene todos los recursos estáticos del proyecto:
- **css/**: Estilos personalizados que complementan Tailwind CSS
- **js/**: Lógica JavaScript para interactividad
- **images/**: Imágenes de propiedades y recursos visuales

### 📁 data/
Almacena datos en formato JSON que alimentan las páginas:
- **properties.json**: Información de todas las propiedades (título, precio, características, etc.)

### 📁 propiedades/
Contiene una carpeta para cada propiedad con su landing page individual:
- Cada carpeta tiene un número de ID
- Dentro está el archivo `index.html` con la página de la propiedad

### 📁 plantillas/
Plantilla maestra para crear nuevas landing pages:
- Copiar esta plantilla a `propiedades/[nuevo-id]/`
- Reemplazar los placeholders con datos reales

### 📁 docs/
Documentación del proyecto:
- **guia-despliegue.md**: Instrucciones detalladas para desplegar

## Archivos Principales

| Archivo | Descripción |
|---------|-------------|
| `index.html` | Página principal con listado de propiedades |
| `package.json` | Configuración y scripts del proyecto |
| `netlify.toml` | Configuración de despliegue en Netlify |
| `CNAME` | Dominio personalizado para GitHub Pages |
| `.gitignore` | Archivos que Git debe ignorar |
| `README.md` | Documentación principal del proyecto |
| `especificaciones.txt` | Requisitos originales del proyecto |

## Flujo de Trabajo

1. **Editar datos**: Modificar `data/properties.json`
2. **Agregar imágenes**: Colocar en `assets/images/`
3. **Crear propiedad**: Copiar plantilla a `propiedades/[id]/`
4. **Personalizar**: Reemplazar placeholders en HTML
5. **Desplegar**: Subir a Netlify o GitHub Pages

## Comandos Útiles

```bash
# Iniciar servidor local
npm start

# Desplegar en Netlify
npm run deploy

# Ver en navegador
# Abrir http://localhost:8000
```