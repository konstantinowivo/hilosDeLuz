# ⚠️ Error: GitHub Pages no carga los archivos compilados

## Problema
GitHub Pages está intentando cargar `/src/main.js` en lugar de los archivos compilados de `/dist/`.

Error: `GET https://konstantinowivo.github.io/src/main.js net::ERR_ABORTED 404 (Not Found)`

---

## ✅ Solución: Configurar GitHub Pages correctamente

### Paso 1: Ve a la configuración de GitHub Pages

1. Abre: https://github.com/konstantinowivo/hilosDeLuz/settings/pages

2. En la sección **"Source"** (Fuente):

   **Actualmente dice:** Deploy from a branch

   **Debe decir:** GitHub Actions

3. Si NO dice "GitHub Actions":
   - Haz click en el dropdown de "Source"
   - Selecciona **"GitHub Actions"**
   - La página se guardará automáticamente

---

### Paso 2: Verificar que el workflow se ejecutó

1. Ve a: https://github.com/konstantinowivo/hilosDeLuz/actions

2. Busca el workflow más reciente "Deploy to GitHub Pages"

3. Debe mostrar:
   - ✅ Verde = Exitoso
   - ❌ Rojo = Falló (ve los logs para ver el error)
   - 🟡 Amarillo = Ejecutándose

4. Si falló:
   - Click en el workflow
   - Click en "build" o "deploy"
   - Lee el log de error
   - Puede ser un problema de permisos (ver Paso 3)

---

### Paso 3: Verificar permisos de GitHub Actions

1. Ve a: https://github.com/konstantinowivo/hilosDeLuz/settings/actions

2. En la sección **"Workflow permissions"**:

3. Debe estar seleccionado:
   - ✅ **"Read and write permissions"**

4. Si NO está seleccionado:
   - Selecciona "Read and write permissions"
   - Click "Save"

5. Vuelve a ejecutar el workflow:
   - Ve a: https://github.com/konstantinowivo/hilosDeLuz/actions
   - Click en el workflow fallido
   - Click en "Re-run all jobs"

---

## 🔍 Verificar que todo funciona

Una vez configurado:

1. Haz un cambio pequeño (ej: espacio en blanco en README)
2. Haz commit y push:
   ```bash
   git add .
   git commit -m "Test deploy"
   git push origin main
   ```

3. Ve a Actions y espera que termine

4. Abre: https://konstantinowivo.github.io/hilosDeLuz/

5. Debe cargar correctamente (sin errores 404)

---

## 📋 Checklist de Configuración

Verifica que TODO esté configurado:

- [ ] GitHub Pages Source = "GitHub Actions" (NO "Deploy from a branch")
- [ ] Workflow permissions = "Read and write permissions"
- [ ] El archivo `.github/workflows/deploy.yml` existe en el repo
- [ ] El workflow se ejecutó sin errores (✅ verde en Actions)
- [ ] El sitio carga en https://konstantinowivo.github.io/hilosDeLuz/

---

## 🆘 Si sigue sin funcionar

### Opción A: Re-ejecutar el workflow

1. Ve a: https://github.com/konstantinowivo/hilosDeLuz/actions
2. Click en el workflow más reciente
3. Click en "Re-run all jobs"

### Opción B: Hacer un push nuevo

```bash
# Hacer un cambio mínimo
echo " " >> README_VUE.md
git add .
git commit -m "Trigger deploy"
git push origin main
```

### Opción C: Verificar los logs del workflow

1. Ve a: https://github.com/konstantinowivo/hilosDeLuz/actions
2. Click en el workflow
3. Click en "build" y luego en "deploy"
4. Lee los logs en busca de errores

Los errores comunes son:
- Permisos insuficientes
- GitHub Pages no habilitado
- Source configurado incorrectamente

---

## ✨ Configuración correcta esperada

En https://github.com/konstantinowivo/hilosDeLuz/settings/pages debes ver:

```
GitHub Pages

✅ Your site is live at https://konstantinowivo.github.io/hilosDeLuz/

Build and deployment

Source: GitHub Actions

Deployments
✅ Active
```

---

¡Sigue estos pasos y el sitio debería funcionar correctamente!
