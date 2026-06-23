# 🔧 Solución: Error de CORS en Sanity

**Problema:** Los productos no se cargan en el frontend debido a error de CORS.

**Error en consola:**
```
Access to XMLHttpRequest at 'https://5h1fblp5.apicdn.sanity.io/...'
from origin 'http://localhost:5173' has been blocked by CORS policy:
No 'Access-Control-Allow-Origin' header is present on the requested resource.
```

---

## 🎯 ¿Qué es CORS?

CORS (Cross-Origin Resource Sharing) es una medida de seguridad que impide que sitios web accedan a recursos de otros dominios sin permiso explícito.

En este caso:
- **Frontend:** http://localhost:5173 (Vue/Vite)
- **API de Sanity:** https://5h1fblp5.apicdn.sanity.io

Sanity necesita que le **digas explícitamente** que el frontend puede acceder a su API.

---

## ✅ Solución: Configurar CORS en Sanity

### Opción 1: Configuración Manual (Recomendada)

**Paso 1:** Ve al panel de administración de Sanity
```
https://www.sanity.io/manage
```

**Paso 2:** Selecciona tu proyecto
- Busca: "Hilos de Luz"
- O busca por Project ID: `5h1fblp5`

**Paso 3:** Ve a la sección API
- En el menú lateral, haz clic en **"API"**

**Paso 4:** Ve a CORS Origins
- Dentro de API, haz clic en **"CORS Origins"**

**Paso 5:** Agrega un nuevo origen
- Haz clic en el botón **"+ Add CORS origin"**

**Paso 6:** Configura el origen de desarrollo
```
Origin: http://localhost:5173
Allow credentials: ✓ (activado)
```

**Paso 7:** Agrega también el puerto de GitHub Pages (para producción)
```
Origin: https://tu-usuario.github.io
Allow credentials: ✓ (activado)
```

**Paso 8:** Guarda los cambios
- Haz clic en **"Save"** o **"Add origin"**

---

### Opción 2: Usando Sanity CLI (Más Rápida)

**Paso 1:** Haz login en Sanity
```bash
npx sanity login
```
Esto abrirá tu navegador para autenticarte.

**Paso 2:** Agrega localhost:5173
```bash
npx sanity cors add http://localhost:5173 --credentials
```

**Paso 3 (Opcional):** Agrega tu dominio de producción
```bash
npx sanity cors add https://tu-usuario.github.io --credentials
```

**Paso 4:** Verifica que se agregó
```bash
npx sanity cors list
```

Deberías ver algo como:
```
CORS origins for project 5h1fblp5:
┌──────────────────────────────┬─────────────┐
│ Origin                       │ Credentials │
├──────────────────────────────┼─────────────┤
│ http://localhost:5173        │ true        │
│ https://tu-usuario.github.io │ true        │
└──────────────────────────────┴─────────────┘
```

---

## 🔄 Después de Configurar CORS

### 1. Refresca el Frontend

Una vez que hayas configurado CORS:

1. Ve a: http://localhost:5173/hilosDeLuz/
2. **Refresca la página** (F5)
3. Abre las DevTools (F12) → Pestaña "Console"
4. Verifica que NO haya errores de CORS

### 2. Verifica que los Productos Cargan

Deberías ver en la consola:
```javascript
✅ Products loaded: 1  // (o el número de productos que creaste)
```

Y en la página deberías ver:
- ✅ Las cards de productos
- ✅ Las imágenes cargando
- ✅ Los filtros de categoría funcionando

---

## 🔍 Verificación de Errores

### Si Sigues Viendo el Error de CORS

**1. Verifica que el origen esté correcto:**
- Debe ser exactamente: `http://localhost:5173`
- NO debe tener `/` al final
- NO debe tener rutas adicionales

**2. Verifica que "Credentials" esté activado:**
- El checkbox "Allow credentials" debe estar marcado

**3. Limpia la caché del navegador:**
```
Chrome/Edge: Ctrl + Shift + Delete
Firefox: Ctrl + Shift + Delete
Safari: Cmd + Option + E
```

**4. Reinicia el servidor de desarrollo:**
```bash
# Detén el servidor (Ctrl + C)
# Vuelve a iniciarlo
npm run dev
```

**5. Verifica que el Project ID es correcto:**
```bash
# En .env debe decir:
VITE_SANITY_PROJECT_ID=5h1fblp5
```

---

## 📋 Configuración para Producción

Cuando publiques tu sitio en GitHub Pages, necesitarás agregar ese dominio también.

**Ejemplo:**
Si tu sitio está en: `https://tu-usuario.github.io/hilosdeluz`

**Agrega el origen:**
```bash
npx sanity cors add https://tu-usuario.github.io --credentials
```

**O manualmente en el panel:**
```
Origin: https://tu-usuario.github.io
Allow credentials: ✓
```

**IMPORTANTE:** Solo agrega el dominio base, NO la ruta completa:
- ✅ Correcto: `https://tu-usuario.github.io`
- ❌ Incorrecto: `https://tu-usuario.github.io/hilosdeluz`

---

## 🎯 Checklist de Verificación

Después de configurar CORS, verifica:

- [ ] **Login en Sanity realizado** (si usaste CLI)
- [ ] **Origen agregado:** http://localhost:5173
- [ ] **Credentials activado:** ✓
- [ ] **Frontend refrescado:** F5
- [ ] **Sin errores en consola**
- [ ] **Productos visibles en el sitio**
- [ ] **Imágenes cargando correctamente**
- [ ] **Filtros funcionando**

---

## 🐛 Troubleshooting

### Error: "You must login first"
```bash
npx sanity login
```

### Error: "Project not found"
Verifica que el Project ID sea correcto en `.env`:
```env
VITE_SANITY_PROJECT_ID=5h1fblp5
```

### Error: "Failed to fetch"
1. Verifica tu conexión a internet
2. Verifica que el dataset sea correcto: `production`
3. Verifica que el producto esté publicado en Sanity Studio

### Los productos no aparecen después de agregar CORS
1. Refresca el navegador (F5)
2. Limpia la caché del navegador
3. Verifica que el producto esté:
   - ✅ Publicado (botón verde en Sanity)
   - ✅ "Mostrar en Catálogo" activado
   - ✅ Con imagen subida

---

## ✅ Estado Actual

### Cambios Realizados

1. ✅ **Arreglado warning de deprecación:**
   - Cambiado: `imageUrlBuilder` → `createImageUrlBuilder`
   - No más warnings en consola sobre `@sanity/image-url`

2. ⏳ **Pendiente: Configurar CORS**
   - Debes agregar `http://localhost:5173` a los orígenes permitidos
   - Usa una de las dos opciones de arriba

---

## 📞 Ayuda Adicional

Si después de seguir estos pasos sigues teniendo problemas:

1. **Verifica la configuración en Sanity:**
   - https://www.sanity.io/manage
   - Project: Hilos de Luz (5h1fblp5)
   - API → CORS Origins

2. **Verifica la consola del navegador:**
   - F12 → Console
   - Busca errores en rojo

3. **Verifica el Network tab:**
   - F12 → Network
   - Filtra por "Fetch/XHR"
   - Busca la petición a `5h1fblp5.apicdn.sanity.io`
   - Verifica el status code (debería ser 200)

---

**Fecha:** 23 de Junio, 2026
**Estado:** ⏳ Pendiente configurar CORS
**Próximo paso:** Agregar http://localhost:5173 a CORS origins en Sanity
