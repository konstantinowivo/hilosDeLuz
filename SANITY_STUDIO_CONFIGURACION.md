# ✅ Configuración de Sanity Studio Completada

**Fecha:** 23 de Junio, 2026
**Project ID:** 5h1fblp5
**Dataset:** production
**Studio URL:** http://localhost:3333

---

## 📋 Resumen de Cambios

### ✅ Tareas Completadas

1. ✅ Configuración del Project ID (5h1fblp5) en todos los archivos
2. ✅ Simplificación del Studio para la clienta
3. ✅ Reorganización de archivos a la raíz del proyecto
4. ✅ Configuración de navegación minimalista
5. ✅ Studio funcionando correctamente en localhost:3333

---

## 📁 Estructura de Archivos

### Archivos de Configuración (en la raíz)

```
/
├── sanity.config.js      ← Configuración principal del Studio
├── sanity.cli.js         ← Configuración del CLI de Sanity
├── schemas/              ← Carpeta con los esquemas de datos
│   ├── product.js        ← Esquema de producto
│   └── index.js          ← Export de todos los esquemas
└── .sanity/              ← Carpeta generada automáticamente (ignorada en git)
```

### Por Qué Esta Estructura

Esta es la estructura **estándar y recomendada** por Sanity cuando se usa con otro framework (Vue, React, Next, etc.). Los beneficios:

- ✅ Más simple de mantener
- ✅ Menos configuración
- ✅ Mejor documentación oficial
- ✅ Más fácil para la clienta (si necesita ayuda de otros devs)

---

## 🎨 Configuración del Studio

### sanity.config.js

**Cambios realizados:**

1. **Eliminado `visionTool`**
   - **Motivo:** Es una herramienta para desarrolladores que testea queries GROQ
   - **Beneficio:** Interfaz más limpia para la clienta

2. **Estructura de navegación personalizada**
   ```javascript
   structure: (S) =>
     S.list()
       .title('Contenido')
       .items([
         S.listItem()
           .title('Productos')
           .icon(() => '🏮')  // Icono de lámpara
           .child(...)
       ])
   ```
   - **Motivo:** Solo mostrar "Productos" en el menú
   - **Beneficio:** Interfaz minimalista y sin distracciones

3. **Ordenamiento por defecto**
   ```javascript
   .defaultOrdering([{ field: 'orden', direction: 'asc' }])
   ```
   - **Motivo:** Los productos se muestran ordenados por el campo `orden`
   - **Beneficio:** La clienta controla el orden de aparición

4. **Project ID hardcodeado**
   ```javascript
   projectId: '5h1fblp5',
   dataset: 'production'
   ```
   - **Motivo:** Evitar confusión con variables de entorno
   - **Beneficio:** Más simple, menos propenso a errores

---

## 🚀 Cómo Usar el Studio

### Iniciar el Studio (Desarrollo)

```bash
npm run sanity:dev
```

- Abre automáticamente en: http://localhost:3333
- Hot reload activado (cambios en tiempo real)

### Compilar el Studio (Producción)

```bash
npm run sanity:build
```

- Genera una versión optimizada del Studio

### Publicar el Studio Online

```bash
npm run sanity:deploy
```

- Publica el Studio en una URL pública de Sanity
- La clienta podrá acceder desde cualquier lugar
- URL típica: `https://hilosdeluz.sanity.studio`

---

## 📝 Variables de Entorno

### `.env` (Desarrollo)

```env
VITE_SANITY_PROJECT_ID=5h1fblp5
VITE_SANITY_DATASET=production
VITE_SANITY_API_VERSION=2024-01-01

SANITY_STUDIO_PROJECT_ID=5h1fblp5
SANITY_STUDIO_DATASET=production
```

**Actualizado:** ✅ Project ID configurado correctamente

### `.env.production` (Producción)

```env
VITE_SANITY_PROJECT_ID=5h1fblp5
VITE_SANITY_DATASET=production
VITE_SANITY_API_VERSION=2024-01-01
```

**Actualizado:** ✅ Project ID configurado correctamente

---

## 🎯 Interfaz del Studio

### Navegación

La clienta verá una interfaz super simple:

```
┌─────────────────────────────────┐
│  Hilos de Luz - Catálogo        │
├─────────────────────────────────┤
│  Contenido                      │
│    🏮 Productos                 │
└─────────────────────────────────┘
```

### Al hacer clic en "Productos"

Verá la lista de productos ordenados por el campo `orden`:

```
┌──────────────────────────────────────────┐
│  Productos                               │
│  [+ Crear nuevo producto]                │
├──────────────────────────────────────────┤
│  📦 Equilibrio                           │
│  📦 Brisa                                │
│  📦 Duna                                 │
└──────────────────────────────────────────┘
```

---

## ✨ Características Configuradas

### 1. Minimalismo
- Solo se muestra "Productos" en el menú
- Sin herramientas técnicas (Vision, GraphQL, etc.)
- Interfaz limpia y enfocada

### 2. Ordenamiento Inteligente
- Los productos se ordenan por el campo `orden` (ascendente)
- La clienta puede controlar el orden manualmente

### 3. Icono Personalizado
- Emoji de lámpara (🏮) para "Productos"
- Hace la interfaz más amigable y visual

### 4. Configuración Hardcodeada
- Project ID y dataset hardcodeados
- Menos propenso a errores de configuración
- Más simple para la clienta

---

## 📦 Dependencias Instaladas

```json
{
  "dependencies": {
    "@sanity/client": "^7.23.0",
    "@sanity/image-url": "^2.1.1",
    "react": "^19.2.7",
    "react-dom": "^19.2.7",
    "styled-components": "^6.4.2"
  },
  "devDependencies": {
    "@sanity/cli": "^7.3.0",
    "sanity": "^6.1.0"
  }
}
```

**Nota:** React y styled-components son requeridos por Sanity Studio (peer dependencies).

---

## 🔧 Scripts NPM Disponibles

```json
{
  "sanity:dev": "sanity dev",        // Iniciar Studio en desarrollo
  "sanity:build": "sanity build",    // Compilar Studio
  "sanity:deploy": "sanity deploy"   // Publicar Studio online
}
```

---

## 📌 Próximos Pasos

### ✅ Ya Está Listo Para:

1. **Crear el primer producto de prueba**
   - Ir a http://localhost:3333
   - Hacer login con la cuenta de Sanity
   - Crear un producto de prueba

2. **Integrar con el frontend**
   - El servicio `SanityService` ya está creado
   - El composable `useProducts` ya está configurado
   - Solo falta que haya productos en Sanity

### ⏭️ Siguiente Tarea (NO realizada todavía):

- Crear el schema de "producto" con los campos necesarios
  - **Nota:** El schema actual (`schemas/product.js`) ya existe del refactor anterior
  - Podrías revisarlo/modificarlo según tus necesidades

---

## 🎓 Guía para la Clienta

Cuando le entregues el Studio a tu clienta, explicale:

1. **Cómo iniciar el Studio:**
   ```bash
   npm run sanity:dev
   ```

2. **URL del Studio:**
   - Local: http://localhost:3333
   - Online (después de deploy): https://hilosdeluz.sanity.studio

3. **Cómo crear un producto:**
   - Ir a "Productos"
   - Hacer clic en "+ Crear nuevo producto"
   - Llenar los campos
   - Hacer clic en "Publish"

4. **Cómo editar un producto:**
   - Hacer clic en el producto en la lista
   - Editar los campos
   - Hacer clic en "Publish"

5. **Cómo ocultar un producto (sin eliminarlo):**
   - Editar el producto
   - Desactivar el switch "Disponible"
   - Hacer clic en "Publish"

---

## ✅ Verificación Final

- [x] Project ID configurado (5h1fblp5)
- [x] Dataset configurado (production)
- [x] Studio funcionando en localhost:3333
- [x] Navegación simplificada (solo "Productos")
- [x] Ordenamiento por defecto configurado
- [x] Variables de entorno actualizadas
- [x] Dependencias instaladas correctamente
- [x] .gitignore actualizado (.sanity/)

---

## 📞 Troubleshooting

### Si el Studio no inicia:

```bash
# 1. Verificar que las dependencias estén instaladas
npm install

# 2. Limpiar caché de Sanity
rm -rf .sanity

# 3. Reintentar
npm run sanity:dev
```

### Si hay error de "Project not found":

- Verificar que el Project ID sea correcto: `5h1fblp5`
- Verificar que estés logueado en Sanity: `npx sanity login`

### Si hay error de permisos:

- Verificar que tu cuenta tenga acceso al proyecto en https://www.sanity.io/manage

---

**Estado:** ✅ CONFIGURACIÓN COMPLETADA
**Listo para:** Crear productos y comenzar a usar el Studio
