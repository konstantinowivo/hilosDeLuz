# 🔄 Refactor: Migración de Google Sheets a Sanity CMS

## 📅 Fecha del Refactor
**Fecha:** 22 de Junio, 2026

## 🎯 Objetivo
Reemplazar completamente el sistema de administración del catálogo basado en Google Sheets por Sanity CMS Headless.

## ❌ Sistema Anterior (Google Sheets)

### Limitaciones
- ✗ Administración manual en CSV
- ✗ Sin validación de datos
- ✗ Imágenes alojadas externamente
- ✗ Sin control de versiones de contenido
- ✗ Parsing manual de CSV propenso a errores
- ✗ No escalable

### Arquitectura Anterior
```
Google Sheets (CSV)
    ↓ fetch()
GoogleSheetsService
    ↓ parseCSV()
useProducts (composable)
    ↓
ProductCatalog → ProductCard
```

---

## ✅ Nuevo Sistema (Sanity CMS)

### Ventajas
- ✓ CMS profesional con interfaz gráfica
- ✓ Validación de datos en el esquema
- ✓ Almacenamiento de imágenes incluido
- ✓ CDN global optimizado
- ✓ Versionamiento de contenido
- ✓ API GraphQL y GROQ
- ✓ Totalmente escalable
- ✓ Real-time updates (opcional)

### Nueva Arquitectura
```
Sanity CMS (Cloud)
    ↓ GROQ Query
SanityService
    ↓
useProducts (composable)
    ↓
ProductCatalog → ProductCard
```

---

## 📦 Dependencias Instaladas

```json
{
  "dependencies": {
    "@sanity/client": "^7.23.0",
    "@sanity/image-url": "^2.1.1"
  },
  "devDependencies": {
    "@sanity/cli": "^7.3.0",
    "sanity": "^6.1.0"
  }
}
```

---

## 📁 Archivos CREADOS

### 1. `sanity/schemas/product.js`
**Motivo:** Define el esquema de datos para los productos en Sanity CMS.

**Campos incluidos:**
- `nombre` (string, required)
- `descripcion` (text, required)
- `precio` (string, optional)
- `imagen` (image, required con hotspot)
- `categoria` (string con opciones: calma | natural | ecologica)
- `disponible` (boolean, default: true)
- `orden` (number, para ordenamiento manual)

**Características:**
- Validación de datos en el esquema
- Vista previa personalizada en Sanity Studio
- Ordenamientos predefinidos

### 2. `sanity/schemas/index.js`
**Motivo:** Exporta todos los esquemas para la configuración de Sanity.

### 3. `sanity/sanity.config.js`
**Motivo:** Configuración principal de Sanity Studio.

**Características:**
- Plugins: structureTool, visionTool
- Configuración de project ID y dataset desde variables de entorno
- Schema types importados

### 4. `sanity/sanity.cli.js`
**Motivo:** Configuración del CLI de Sanity para comandos de terminal.

### 5. `src/services/sanityService.js`
**Motivo:** Servicio principal que reemplaza GoogleSheetsService.

**Métodos:**
- `loadProducts()` - Carga productos disponibles ordenados
- `transformProduct()` - Transforma productos de Sanity al formato de la app
- `getProductById()` - Obtiene un producto específico
- `getProductsByCategory()` - Filtra por categoría

**Características importantes:**
- Query GROQ optimizado
- Filtrado automático por `disponible = true`
- Ordenamiento por campo `orden`
- Generación de URLs de imagen optimizadas (WebP, 800px max width)
- Mismo formato de retorno que GoogleSheetsService (compatibilidad)

---

## 🔧 Archivos MODIFICADOS

### 1. `src/composables/useProducts.js`

**Cambios:**
```diff
- import { GoogleSheetsService } from '../services/googleSheetsService'
+ import { SanityService } from '../services/sanityService'

- allProducts.value = await GoogleSheetsService.loadProducts()
+ allProducts.value = await SanityService.loadProducts()
```

**Motivo:** Cambiar la fuente de datos de Google Sheets a Sanity.

**Importante:** La interfaz pública del composable NO cambió, por lo que los componentes que lo usan siguen funcionando sin modificaciones.

### 2. `src/config.js`

**Cambios:**
```diff
- // Google Sheets
- GOOGLE_SHEET_ID: import.meta.env.VITE_GOOGLE_SHEET_ID,
- GOOGLE_SHEET_NAME: import.meta.env.VITE_GOOGLE_SHEET_NAME,
- GOOGLE_SHEET_CSV_URL: import.meta.env.VITE_GOOGLE_SHEET_CSV_URL,
+ // Sanity CMS
+ SANITY_PROJECT_ID: import.meta.env.VITE_SANITY_PROJECT_ID,
+ SANITY_DATASET: import.meta.env.VITE_SANITY_DATASET,
+ SANITY_API_VERSION: import.meta.env.VITE_SANITY_API_VERSION,
```

**Motivo:** Actualizar configuración para usar Sanity en lugar de Google Sheets.

**Validación actualizada:**
```diff
- 'VITE_GOOGLE_SHEET_ID',
- 'VITE_GOOGLE_SHEET_CSV_URL',
+ 'VITE_SANITY_PROJECT_ID',
+ 'VITE_SANITY_DATASET',
```

### 3. `.env.example`

**Cambios:** Reemplazadas todas las variables de Google Sheets por variables de Sanity.

**Variables nuevas:**
```env
VITE_SANITY_PROJECT_ID=tu_project_id_aqui
VITE_SANITY_DATASET=production
VITE_SANITY_API_VERSION=2024-01-01
SANITY_STUDIO_PROJECT_ID=tu_project_id_aqui
SANITY_STUDIO_DATASET=production
```

**Motivo:** Documentar las nuevas variables de entorno necesarias.

### 4. `.env.production`

**Cambios:** Actualizadas variables de Google Sheets a Sanity.

**Importante:** El valor `VITE_SANITY_PROJECT_ID` debe ser reemplazado con el Project ID real de Sanity.

### 5. `package.json`

**Scripts agregados:**
```json
{
  "sanity:dev": "sanity dev",
  "sanity:build": "sanity build",
  "sanity:deploy": "sanity deploy"
}
```

**Motivo:** Facilitar el desarrollo y deploy de Sanity Studio.

---

## 🗑️ Archivos ELIMINADOS

### 1. `src/services/googleSheetsService.js`

**Motivo:** Ya no se usa Google Sheets como fuente de datos.

**Contenido eliminado:**
- Clase `GoogleSheetsService`
- Método `loadProducts()`
- Método `parseCSV()`
- Método `parseCSVLine()`
- Método `createProduct()`
- Método `normalizeCategory()`

**Total:** ~127 líneas de código eliminadas.

---

## 🔄 Archivos SIN CAMBIOS

Los siguientes archivos NO fueron modificados porque el refactor respeta la arquitectura existente:

- ✓ `src/components/ProductCatalog.vue` - Usa el composable sin cambios
- ✓ `src/components/ProductCard.vue` - Recibe productos con el mismo formato
- ✓ `src/components/Lightbox.vue` - No interactúa con productos
- ✓ `src/components/AppHeader.vue` - No interactúa con productos
- ✓ `src/components/HeroSection.vue` - No interactúa con productos
- ✓ `src/components/AboutSection.vue` - No interactúa con productos
- ✓ `src/components/ContactSection.vue` - No interactúa con productos
- ✓ `src/components/AppFooter.vue` - No interactúa con productos
- ✓ `src/components/WhatsAppButton.vue` - No interactúa con productos
- ✓ `src/assets/styles/styles.css` - Estilos no afectados
- ✓ `src/composables/useLightbox.js` - No interactúa con productos
- ✓ `src/composables/useNavigation.js` - No interactúa con productos

---

## 📋 Formato de Producto

El formato de producto se mantiene **idéntico** para preservar compatibilidad:

```javascript
{
  id: string,              // Ahora viene de Sanity (_id)
  nombre: string,          // Campo directo de Sanity
  precio: string,          // Campo directo de Sanity
  descripcion: string,     // Campo directo de Sanity
  categoria: string,       // Campo directo de Sanity
  imagenUrl: string        // Generado por Sanity Image URL Builder
}
```

**Mejoras en el nuevo formato:**
- `id` ahora es un ID único y estable de Sanity (no timestamp)
- `imagenUrl` es una URL optimizada del CDN de Sanity (WebP, resize automático)
- Garantía de que `disponible = true` (filtrado en el query)

---

## 🚀 Comandos Nuevos

### Frontend (Vue)
```bash
npm run dev          # Desarrollo del frontend (sin cambios)
npm run build        # Build de producción (sin cambios)
npm run preview      # Preview del build (sin cambios)
```

### Sanity Studio
```bash
npm run sanity:dev     # Levantar Sanity Studio en http://localhost:3333
npm run sanity:build   # Build de Sanity Studio
npm run sanity:deploy  # Deploy de Sanity Studio a Sanity Cloud
```

---

## ⚙️ Configuración Requerida

### 1. Crear Proyecto en Sanity

1. Ve a https://www.sanity.io/
2. Crea una cuenta (gratis)
3. Crea un nuevo proyecto
4. Obtén el **Project ID**
5. Configura el **Dataset** (generalmente "production")

### 2. Configurar Variables de Entorno

Crea/actualiza el archivo `.env` con:

```env
VITE_SANITY_PROJECT_ID=tu_project_id_real_aqui
VITE_SANITY_DATASET=production
VITE_SANITY_API_VERSION=2024-01-01

SANITY_STUDIO_PROJECT_ID=tu_project_id_real_aqui
SANITY_STUDIO_DATASET=production
```

### 3. Levantar Sanity Studio

```bash
cd sanity
npm run sanity:dev
```

Esto abrirá Sanity Studio en `http://localhost:3333`

### 4. Crear Productos

1. Accede a Sanity Studio
2. Click en "Product"
3. Click en "Create"
4. Completa los campos:
   - Nombre
   - Descripción
   - Precio (ej: $45.000)
   - Imagen (subir desde tu computadora)
   - Categoría (seleccionar: calma, natural o ecológica)
   - Disponible (checked por defecto)
   - Orden (número para ordenamiento)
5. Click en "Publish"

### 5. Verificar en el Frontend

```bash
npm run dev
```

Los productos creados en Sanity aparecerán automáticamente en el catálogo.

---

## 🎨 Características Mantenidas

El refactor preserva **todas** las características existentes:

- ✓ Filtrado por categoría (calma, natural, ecológica)
- ✓ Estados de loading/error/lista vacía
- ✓ Diseño responsive
- ✓ Lightbox para imágenes
- ✓ Botón de consulta por WhatsApp
- ✓ Animaciones de entrada de productos
- ✓ Mismo look and feel

---

## 🆕 Características Nuevas

Gracias a Sanity, ahora tienes:

- ✅ **Interfaz gráfica profesional** para administrar productos
- ✅ **Almacenamiento de imágenes en CDN** (no necesitas Google Drive)
- ✅ **Optimización automática de imágenes** (WebP, resize, lazy loading)
- ✅ **Validación de datos** (no puedes publicar productos incompletos)
- ✅ **Control de disponibilidad** (ocultar productos sin eliminarlos)
- ✅ **Ordenamiento manual** con el campo `orden`
- ✅ **Versionamiento** (historial de cambios en cada producto)
- ✅ **Preview en tiempo real** en Sanity Studio
- ✅ **Búsqueda y filtros** en el panel de administración
- ✅ **Múltiples usuarios** (puedes dar acceso a más personas)

---

## 📊 Comparativa

| Característica | Google Sheets | Sanity CMS |
|----------------|---------------|------------|
| Interfaz | CSV manual | GUI profesional |
| Imágenes | URL externa | CDN incluido |
| Validación | Manual | Automática |
| Performance | Fetch CSV | API optimizada |
| Escalabilidad | Limitada | Ilimitada |
| Versionamiento | No | Sí |
| Real-time | No | Sí (opcional) |
| Costo | Gratis | Gratis (tier gratuito) |

---

## 🔐 Seguridad y Mejores Prácticas

### Variables de Entorno
- ✓ `VITE_SANITY_PROJECT_ID` es público (OK para Git)
- ✓ `VITE_SANITY_DATASET` es público (OK para Git)
- ✓ No hay tokens secretos en el cliente
- ✓ Las queries están filtradas (solo productos disponibles)

### Sanity CMS
- ✓ API pública de solo lectura (los usuarios no pueden editar)
- ✓ Admin protegido por autenticación de Sanity
- ✓ Permisos granulares por usuario

---

## 🧪 Testing

### Validaciones a Realizar

1. **Carga de productos:**
   ```bash
   npm run dev
   # Verificar que los productos se cargan desde Sanity
   ```

2. **Filtrado por categoría:**
   - Seleccionar cada categoría
   - Verificar que solo se muestran productos de esa categoría

3. **Estados:**
   - Loading: Debe mostrarse mientras carga
   - Error: Probar sin conexión
   - Vacío: Crear categoría sin productos

4. **Imágenes:**
   - Verificar que las URLs de Sanity funcionan
   - Verificar formato WebP
   - Verificar optimización (max 800px)

5. **Lightbox:**
   - Click en imagen abre modal
   - ESC cierra modal

6. **WhatsApp:**
   - Click en "Consultar" abre WhatsApp
   - Mensaje incluye nombre y precio

---

## 📖 Guía para la Clienta

### Cómo Agregar un Producto

1. Abre Sanity Studio (https://tu-proyecto.sanity.studio o localmente)
2. Click en "Product" en el menú lateral
3. Click en "+ Create new Product"
4. Completa el formulario:
   - **Nombre:** Nombre del producto
   - **Descripción:** Descripción breve
   - **Precio:** Formato $XX.XXX
   - **Imagen:** Arrastra y suelta o selecciona archivo
   - **Categoría:** Selecciona una opción
   - **Disponible:** Deja marcado
   - **Orden:** Número (productos con menor número aparecen primero)
5. Click en "Publish"

El producto aparecerá **automáticamente** en el sitio web en segundos.

### Cómo Editar un Producto

1. En Sanity Studio, busca el producto
2. Click en el producto
3. Edita los campos que necesites
4. Click en "Publish"

Los cambios se reflejan **inmediatamente** en el sitio.

### Cómo Ocultar un Producto (sin eliminarlo)

1. Edita el producto
2. Desmarca "Disponible"
3. Click en "Publish"

El producto desaparece del sitio pero permanece en Sanity.

---

## 🐛 Troubleshooting

### Error: "Cannot connect to Sanity"

**Causa:** Project ID incorrecto o falta en `.env`

**Solución:**
```env
VITE_SANITY_PROJECT_ID=tu_project_id_correcto
```

### Error: "No products found"

**Causa:** No hay productos con `disponible = true` en Sanity

**Solución:**
1. Ve a Sanity Studio
2. Crea al menos un producto
3. Asegúrate que "Disponible" esté marcado
4. Publica el producto

### Imágenes no cargan

**Causa:** Imagen no subida correctamente a Sanity

**Solución:**
1. Edita el producto en Sanity Studio
2. Re-sube la imagen
3. Publica

### Build falla en producción

**Causa:** Variables de entorno faltantes en `.env.production`

**Solución:**
Verifica que `.env.production` tenga:
```env
VITE_SANITY_PROJECT_ID=tu_project_id_real
VITE_SANITY_DATASET=production
```

---

## ✅ Checklist de Migración

- [x] Instalar dependencias de Sanity
- [x] Crear esquemas de producto
- [x] Crear servicio de Sanity
- [x] Actualizar composable useProducts
- [x] Eliminar GoogleSheetsService
- [x] Actualizar variables de entorno
- [x] Actualizar documentación
- [ ] Configurar proyecto en Sanity.io
- [ ] Actualizar `.env` con Project ID real
- [ ] Levantar Sanity Studio
- [ ] Crear productos de prueba
- [ ] Verificar funcionamiento en desarrollo
- [ ] Hacer build de producción
- [ ] Deploy a producción

---

## 📞 Soporte

Para más información sobre Sanity CMS:
- Documentación: https://www.sanity.io/docs
- Tutoriales: https://www.sanity.io/guides
- Community: https://www.sanity.io/community

---

**Refactor completado exitosamente** ✅

La aplicación ahora usa Sanity CMS como fuente de datos única para el catálogo de productos, eliminando completamente la dependencia de Google Sheets.
