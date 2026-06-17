# 🚀 Guía de Deploy a GitHub Pages

## Configuración Automática con GitHub Actions

Este proyecto usa GitHub Actions para hacer deploy automático a GitHub Pages cada vez que haces push a `main`.

---

## 📋 Paso 1: Configurar GitHub Pages (Solo una vez)

1. Ve a tu repositorio en GitHub: https://github.com/konstantinowivo/hilosDeLuz

2. Click en **Settings** (⚙️ Configuración)

3. En el menú lateral izquierdo, busca **Pages**

4. En **Source** selecciona:
   - ✅ **GitHub Actions** (NO selecciones "Deploy from a branch")

5. Guarda los cambios

---

## 🎯 Paso 2: Push a GitHub

Cada vez que hagas push a `main`, GitHub Actions automáticamente:

1. Instala las dependencias (`npm ci`)
2. Hace el build de producción (`npm run build`)
3. Despliega a GitHub Pages

```bash
git add .
git commit -m "Tu mensaje"
git push origin main
```

---

## ✅ Paso 3: Verificar el Deploy

1. Ve a la pestaña **Actions** en tu repositorio GitHub

2. Verás un workflow llamado "Deploy to GitHub Pages"

3. Espera a que termine (tarda ~2-3 minutos)

4. Cuando termine, verás un ✅ verde

5. Tu sitio estará disponible en:
   **https://konstantinowivo.github.io/hilosDeLuz/**

---

## 🔧 Variables de Entorno en Producción

**IMPORTANTE**: Las variables de `.env` NO se suben a GitHub.

Para GitHub Pages, las variables ya están en el código porque usamos `VITE_*` que se compilan durante el build.

Si necesitas diferentes valores para producción:

1. Crea `.env.production` con tus valores de producción
2. Git lo ignorará automáticamente
3. El build usará esos valores cuando hagas `npm run build`

---

## 📊 Monitorear Deploys

### Ver el estado del último deploy:

1. Ve a https://github.com/konstantinowivo/hilosDeLuz/actions

2. Click en el workflow más reciente

3. Verás cada paso del proceso

### Si algo falla:

1. Revisa los logs del workflow
2. Común: falta configurar GitHub Pages (ver Paso 1)
3. Verifica que el build funcione localmente: `npm run build`

---

## 🔄 Workflow Completo

```
1. Editas código localmente
   ↓
2. git add . && git commit -m "mensaje"
   ↓
3. git push origin main
   ↓
4. GitHub Actions detecta el push
   ↓
5. Corre npm ci (instala dependencias)
   ↓
6. Corre npm run build (crea dist/)
   ↓
7. Despliega dist/ a GitHub Pages
   ↓
8. Sitio actualizado en https://konstantinowivo.github.io/hilosDeLuz/
```

---

## 🛠️ Comandos Útiles

### Deploy manual (si no quieres usar Actions):

```bash
# Build local
npm run build

# Preview del build
npm run preview
```

### Verificar que el build funciona:

```bash
npm run build
npm run preview
# Abre http://localhost:4173/hilosDeLuz/
```

---

## 🚨 Solución de Problemas

### El sitio muestra 404

**Problema**: La ruta base no es correcta

**Solución**: Verifica que `vite.config.js` tenga:
```javascript
export default defineConfig({
  base: '/hilosDeLuz/',  // Nombre de tu repositorio
})
```

### GitHub Actions falla con "Permission denied"

**Problema**: Permisos de GitHub Pages no configurados

**Solución**:
1. Settings > Actions > General
2. Workflow permissions: "Read and write permissions"
3. Guarda

### Las variables de entorno no funcionan

**Problema**: Las variables no tienen prefijo `VITE_`

**Solución**: Todas las variables deben empezar con `VITE_`:
```env
VITE_WHATSAPP_NUMBER=123456789  # ✅ Correcto
WHATSAPP_NUMBER=123456789        # ❌ No funciona
```

### El CSS o las imágenes no cargan

**Problema**: Rutas absolutas sin considerar el base path

**Solución**: Usa rutas relativas o `/hilosDeLuz/` al principio:
```javascript
// ✅ Correcto
<img src="/hilosDeLuz/resources/imagen.png" />

// ✅ También correcto (el código ya lo hace)
<img src="/resources/imagen.png" />  // Vite agrega el base automáticamente
```

---

## 📝 Checklist de Deploy

Antes de hacer push:

- [ ] El código funciona localmente (`npm run dev`)
- [ ] El build funciona (`npm run build` sin errores)
- [ ] Las variables de entorno están configuradas
- [ ] GitHub Pages está configurado en "GitHub Actions"
- [ ] El archivo `.github/workflows/deploy.yml` existe

---

## 🎉 ¡Listo!

Ahora cada push a `main` actualiza automáticamente tu sitio en producción.

**URL de tu sitio:** https://konstantinowivo.github.io/hilosDeLuz/

**Repositorio:** https://github.com/konstantinowivo/hilosDeLuz

**Actions:** https://github.com/konstantinowivo/hilosDeLuz/actions
