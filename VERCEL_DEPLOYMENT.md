# 🚀 Despliegue en Vercel - Hilos de Luz

Esta guía te ayudará a desplegar el sitio web de Hilos de Luz en Vercel con el dominio www.hilosdeluz.com.ar

---

## 📋 Pre-requisitos

- Cuenta en [Vercel](https://vercel.com)
- Cuenta en GitHub (el proyecto ya está en GitHub)
- Dominio registrado: www.hilosdeluz.com.ar

---

## 🔧 Configuración Inicial

### 1. Importar Proyecto a Vercel

1. Ve a [vercel.com/new](https://vercel.com/new)
2. Conecta tu cuenta de GitHub si aún no lo hiciste
3. Selecciona el repositorio `hilosDeLuz`
4. Vercel detectará automáticamente que es un proyecto Vite
5. **NO hagas click en "Deploy" todavía** - primero configura las variables de entorno

### 2. Configurar Variables de Entorno

En la sección "Environment Variables" de Vercel, agrega las siguientes variables:

#### Variables Requeridas:

```
VITE_SANITY_PROJECT_ID=5h1fblp5
VITE_SANITY_DATASET=production
VITE_SANITY_API_VERSION=2024-01-01
VITE_WHATSAPP_NUMBER=5493512119851
VITE_INSTAGRAM_URL=https://www.instagram.com/hilosdeluz.gla
VITE_FACEBOOK_URL=https://www.facebook.com/hilosdeluz
VITE_CONTACT_EMAIL=juarezgladys10@gmail.com
```

**IMPORTANTE**: Asegúrate de agregar cada variable en todos los ambientes (Production, Preview, Development)

### 3. Configuración de Build

Vercel debería detectar automáticamente la configuración, pero verifica que sea:

- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### 4. Desplegar

Haz click en **Deploy** y espera a que Vercel construya y despliegue tu sitio.

---

## 🌐 Configurar Dominio Personalizado

Una vez que el despliegue inicial esté completo:

### 1. Agregar Dominio

1. Ve a tu proyecto en Vercel
2. Ve a **Settings** → **Domains**
3. Agrega tu dominio: `www.hilosdeluz.com.ar`
4. Vercel te mostrará los registros DNS que necesitas configurar

### 2. Configurar DNS

En tu proveedor de dominios (.com.ar), configura los siguientes registros DNS:

#### Opción A: Usar CNAME (Recomendado)
```
Tipo: CNAME
Nombre: www
Valor: cname.vercel-dns.com
```

#### Opción B: Usar A Record
```
Tipo: A
Nombre: www
Valor: 76.76.21.21
```

### 3. Verificación

- La propagación de DNS puede tardar entre 5 minutos y 48 horas
- Vercel verificará automáticamente el dominio
- Una vez verificado, Vercel emitirá automáticamente un certificado SSL gratuito

### 4. Redirección (Opcional)

Si quieres que `hilosdeluz.com.ar` (sin www) redirija a `www.hilosdeluz.com.ar`:

1. Agrega también `hilosdeluz.com.ar` en Domains
2. En tu DNS, agrega:
```
Tipo: A
Nombre: @
Valor: 76.76.21.21
```
3. Vercel redirigirá automáticamente al dominio www

---

## 🔄 Despliegue Automático

Vercel está configurado para despliegue continuo:

- **Push a `main`**: Se despliega automáticamente a producción
- **Pull Requests**: Genera preview deployments automáticamente
- **Otras ramas**: Puedes crear deployments de preview

---

## 📝 Archivos de Configuración

### `vercel.json`

El archivo `vercel.json` ya está configurado con:

- **Rewrites**: Todas las rutas redirigen a `index.html` (necesario para SPA)
- **Headers**: Cache óptimo para assets estáticos
- **Framework**: Detectado automáticamente como Vite

### `.env.production`

Este archivo contiene los valores por defecto de producción y SÍ se sube a Git (no contiene secretos).

Vercel usará las variables de entorno que configures en su dashboard, que sobrescribirán estos valores.

---

## ✅ Checklist de Despliegue

Antes de desplegar, verifica:

- [ ] Todas las variables de entorno están configuradas en Vercel
- [ ] El archivo `vercel.json` existe en el repositorio
- [ ] El archivo `.env.production` tiene los valores correctos
- [ ] Has hecho commit y push de todos los cambios
- [ ] El proyecto hace build correctamente en local (`npm run build`)

---

## 🧪 Probar antes de Desplegar

Para verificar que el build de producción funciona:

```bash
# Construir para producción
npm run build

# Previsualizar el build
npm run preview
```

Abre http://localhost:4173 y verifica que todo funcione correctamente.

---

## 🔍 Verificar Variables de Entorno

Para verificar que las variables se están cargando correctamente en producción:

1. Abre la consola del navegador en tu sitio desplegado
2. Ejecuta:
```javascript
console.log(import.meta.env)
```
3. Deberías ver todas tus variables `VITE_*`

---

## 🚨 Solución de Problemas

### El sitio muestra página en blanco

**Causa**: Probablemente una ruta mal configurada

**Solución**: Verifica que `vercel.json` tenga la configuración de rewrites

### Las variables de entorno no se cargan

**Causa**: Variables mal configuradas en Vercel

**Solución**:
1. Ve a Settings → Environment Variables
2. Verifica que todas tengan el prefijo `VITE_`
3. Asegúrate de que estén en el ambiente "Production"
4. Redeploy el proyecto

### Error 404 en rutas

**Causa**: Falta configuración de SPA

**Solución**: El `vercel.json` debe tener la configuración de rewrites (ya incluida)

### El dominio no se verifica

**Causa**: DNS no propagado o mal configurado

**Solución**:
1. Espera 24-48 horas para propagación DNS
2. Verifica la configuración DNS con `nslookup www.hilosdeluz.com.ar`
3. Contacta soporte de Vercel si persiste

---

## 📊 Monitoreo

Vercel proporciona:

- **Analytics**: Tráfico y métricas de rendimiento
- **Logs**: Logs de build y runtime
- **Insights**: Web Vitals y performance

Accede a estas herramientas desde el dashboard de tu proyecto.

---

## 🔐 Seguridad

### Variables de Entorno

- ✅ Las variables de entorno están seguras en Vercel
- ✅ Solo personas con acceso al proyecto pueden verlas
- ⚠️ Las variables con prefijo `VITE_` son públicas en el cliente

### SSL/HTTPS

- ✅ Vercel proporciona SSL gratuito automático
- ✅ Se renueva automáticamente
- ✅ HTTPS forzado por defecto

---

## 📚 Recursos Útiles

- [Documentación de Vercel](https://vercel.com/docs)
- [Desplegar Vite en Vercel](https://vercel.com/docs/frameworks/vite)
- [Configurar Dominio Personalizado](https://vercel.com/docs/concepts/projects/custom-domains)
- [Variables de Entorno en Vercel](https://vercel.com/docs/concepts/projects/environment-variables)

---

## 🎯 Próximos Pasos

Después del primer despliegue:

1. **Verifica el sitio**: Revisa que todo funcione correctamente
2. **Configura el dominio**: Sigue los pasos de configuración DNS
3. **Monitorea**: Revisa analytics y performance
4. **Optimiza**: Usa Vercel Insights para mejorar rendimiento

---

**¿Necesitas ayuda?** Contacta al soporte de Vercel o revisa los logs en el dashboard.
