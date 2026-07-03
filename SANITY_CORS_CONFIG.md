# 🔒 Configuración de CORS en Sanity

## ⚠️ Problema: Error 403 - CORS Bloqueado

Si ves este error en la consola:
```
Access to XMLHttpRequest at 'https://5h1fblp5.apicdn.sanity.io/...' from origin 'https://hilos-de-luz.vercel.app'
has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
```

Esto significa que Sanity no permite que tu dominio de Vercel acceda a la API.

---

## ✅ Solución: Configurar CORS en Sanity

### Paso 1: Acceder a la Configuración de CORS

1. Ve a [sanity.io/manage](https://sanity.io/manage)
2. Inicia sesión con tu cuenta
3. Selecciona tu proyecto **"Hilos de Luz"** (Project ID: `5h1fblp5`)
4. En el menú lateral, ve a **Settings** → **API**
5. Busca la sección **CORS Origins**

### Paso 2: Agregar los Dominios Permitidos

Haz click en **"Add CORS origin"** y agrega los siguientes dominios:

#### 1. Dominio de Vercel (Preview)
```
https://hilos-de-luz.vercel.app
```
- **Allow credentials**: ✅ Activado

#### 2. Dominio de Vercel (Otros previews)
```
https://*.vercel.app
```
- **Allow credentials**: ✅ Activado

#### 3. Dominio personalizado (cuando lo configures)
```
https://www.hilosdeluz.com.ar
```
- **Allow credentials**: ✅ Activado

#### 4. Dominio sin www (opcional)
```
https://hilosdeluz.com.ar
```
- **Allow credentials**: ✅ Activado

#### 5. Localhost (para desarrollo)
```
http://localhost:5173
```
- **Allow credentials**: ✅ Activado

### Paso 3: Verificar la Configuración

Después de agregar los dominios:
1. Espera 1-2 minutos para que los cambios se propaguen
2. Recarga tu sitio en Vercel
3. Los productos deberían cargarse correctamente

---

## 📋 Lista Completa de CORS Origins

Tu configuración de CORS debería verse así:

| Origin | Allow Credentials |
|--------|-------------------|
| `https://hilos-de-luz.vercel.app` | ✅ |
| `https://*.vercel.app` | ✅ |
| `https://www.hilosdeluz.com.ar` | ✅ |
| `https://hilosdeluz.com.ar` | ✅ |
| `http://localhost:5173` | ✅ |

---

## 🔍 Verificar que Funciona

### Método 1: Consola del Navegador

1. Abre tu sitio en Vercel
2. Abre las DevTools (F12)
3. Ve a la pestaña **Console**
4. No deberías ver errores de CORS
5. Los productos deberían cargarse correctamente

### Método 2: Network Tab

1. Abre las DevTools (F12)
2. Ve a la pestaña **Network**
3. Recarga la página
4. Busca las peticiones a `5h1fblp5.apicdn.sanity.io`
5. El status code debería ser **200 OK** (no 403)

---

## 🎯 Captura de Pantalla Guía

La configuración debería verse similar a esto:

```
CORS Origins
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
┌─────────────────────────────────────────┐
│ https://hilos-de-luz.vercel.app     [✅] │
│ https://*.vercel.app                [✅] │
│ https://www.hilosdeluz.com.ar       [✅] │
│ https://hilosdeluz.com.ar           [✅] │
│ http://localhost:5173               [✅] │
│                                          │
│ [+ Add CORS origin]                      │
└─────────────────────────────────────────┘
```

---

## ⚠️ Importante

### Wildcards (*)
- `https://*.vercel.app` permite TODOS los subdominios de vercel.app
- Útil para preview deployments automáticos
- Si quieres más seguridad, agrega solo los dominios específicos

### Allow Credentials
- Debe estar **activado (✅)** para que las peticiones funcionen correctamente
- Permite que las cookies y credenciales se envíen con las peticiones

### HTTP vs HTTPS
- **Producción**: Siempre usa `https://` (más seguro)
- **Desarrollo local**: Usa `http://localhost:5173`
- NUNCA uses `http://` en producción

---

## 🚨 Solución de Problemas

### Los productos aún no cargan después de configurar CORS

**Solución 1**: Espera más tiempo
- Los cambios de CORS pueden tardar hasta 5 minutos en propagarse

**Solución 2**: Limpia la caché
1. Abre DevTools (F12)
2. Click derecho en el botón de recargar
3. Selecciona **"Empty Cache and Hard Reload"**

**Solución 3**: Verifica el dominio exacto
1. Copia la URL exacta de tu sitio en Vercel
2. Asegúrate de que coincida EXACTAMENTE con lo configurado en Sanity
3. Incluye `https://` al principio

**Solución 4**: Verifica las variables de entorno
- Asegúrate de que las variables de entorno en Vercel estén correctas:
  - `VITE_SANITY_PROJECT_ID=5h1fblp5`
  - `VITE_SANITY_DATASET=production`

### Error: "Invalid project ID"

**Solución**: Verifica que el Project ID sea correcto
1. Ve a [sanity.io/manage](https://sanity.io/manage)
2. Selecciona tu proyecto
3. El Project ID aparece en la esquina superior derecha
4. Debe ser: `5h1fblp5`

---

## 📚 Recursos

- [Documentación oficial de CORS en Sanity](https://www.sanity.io/docs/cors)
- [Guía de seguridad de Sanity](https://www.sanity.io/docs/security)
- [API Settings en Sanity](https://www.sanity.io/docs/http-api-overview)

---

## 📞 Ayuda

Si sigues teniendo problemas después de seguir esta guía:

1. Verifica que hayas agregado TODOS los dominios listados
2. Espera 5-10 minutos después de hacer cambios
3. Limpia la caché del navegador completamente
4. Prueba en modo incógnito
5. Contacta al soporte de Sanity si el problema persiste

---

**Última actualización**: 2026-07-03
