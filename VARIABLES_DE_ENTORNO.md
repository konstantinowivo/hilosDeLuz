# 🔐 Variables de Entorno - Guía Completa

## ¿Qué son las Variables de Entorno?

Las variables de entorno son valores de configuración que se almacenan fuera del código fuente. Esto permite:

1. **Seguridad**: Credenciales y claves no se suben a Git
2. **Flexibilidad**: Diferentes configuraciones para desarrollo/producción
3. **Colaboración**: Cada desarrollador puede tener sus propias credenciales
4. **Despliegue**: Configuración diferente en cada ambiente sin cambiar código

---

## 📁 Archivos de Variables de Entorno

### `.env`
- Contiene tus credenciales reales
- **NUNCA se sube a Git** (está en .gitignore)
- Cada desarrollador tiene su propio archivo

### `.env.example`
- Plantilla de ejemplo sin credenciales reales
- **SÍ se sube a Git**
- Sirve como documentación de qué variables necesitas

---

## 🚀 Configuración Inicial

### Paso 1: Copiar la plantilla

Si eres un nuevo desarrollador o clonaste el repositorio:

```bash
# Copiar .env.example a .env
cp .env.example .env
```

En Windows:
```cmd
copy .env.example .env
```

### Paso 2: Completar tus credenciales

Abre el archivo `.env` y completa con tus valores reales:

```env
# Google Sheets Configuration
VITE_GOOGLE_SHEET_ID=1YdAMTKVED5UvQ63plsROfZEu8EKcgpfLxY4c4MA2Sxg
VITE_GOOGLE_SHEET_NAME=Productos
VITE_GOOGLE_SHEET_CSV_URL=https://docs.google.com/spreadsheets/d/e/2PACX-1vR.../pub?output=csv

# WhatsApp
VITE_WHATSAPP_NUMBER=5493512119851

# Social Media
VITE_INSTAGRAM_URL=https://www.instagram.com/hilosdeluz
VITE_FACEBOOK_URL=https://www.facebook.com/hilosdeluz

# Contact
VITE_CONTACT_EMAIL=contacto@hilosdeluz.com
```

### Paso 3: Reiniciar el servidor

Después de editar `.env`, **DEBES reiniciar** el servidor de desarrollo:

```bash
# Detener el servidor (Ctrl + C)
# Volver a iniciarlo
npm run dev
```

---

## 📝 Variables Disponibles

### `VITE_GOOGLE_SHEET_ID`
- **Qué es**: ID único de tu Google Sheet
- **Dónde obtenerlo**: URL de tu Google Sheet entre `/d/` y `/edit`
- **Ejemplo**: `1YdAMTKVED5UvQ63plsROfZEu8EKcgpfLxY4c4MA2Sxg`

### `VITE_GOOGLE_SHEET_NAME`
- **Qué es**: Nombre de la pestaña/hoja que contiene los productos
- **Valor por defecto**: `Productos`
- **Ejemplo**: `Productos`

### `VITE_GOOGLE_SHEET_CSV_URL`
- **Qué es**: URL pública del CSV de tu Google Sheet
- **Cómo obtenerlo**:
  1. Archivo → Compartir → Publicar en la web
  2. Seleccionar la hoja "Productos"
  3. Formato: CSV
  4. Copiar la URL generada
- **Ejemplo**: `https://docs.google.com/spreadsheets/d/e/2PACX-1vR.../pub?output=csv`

### `VITE_WHATSAPP_NUMBER`
- **Qué es**: Tu número de WhatsApp en formato internacional
- **Formato**: Código país + área + número (sin espacios, sin + ni -)
- **Ejemplo**: `5493512119851` (Argentina)
  - `54` = Argentina
  - `9` = Código para celular
  - `3512` = Código de área
  - `119851` = Número

### `VITE_INSTAGRAM_URL`
- **Qué es**: URL de tu perfil de Instagram
- **Ejemplo**: `https://www.instagram.com/hilosdeluz`

### `VITE_FACEBOOK_URL`
- **Qué es**: URL de tu página de Facebook
- **Ejemplo**: `https://www.facebook.com/hilosdeluz`

### `VITE_CONTACT_EMAIL`
- **Qué es**: Email de contacto para formularios
- **Ejemplo**: `contacto@hilosdeluz.com`

---

## ⚙️ Cómo Funcionan en Vite

### Prefijo `VITE_`

**IMPORTANTE**: En Vite, las variables de entorno que quieres usar en el cliente (navegador) **DEBEN tener el prefijo `VITE_`**.

```env
# ✅ Correcto - será visible en el cliente
VITE_WHATSAPP_NUMBER=123456789

# ❌ Incorrecto - NO estará disponible
WHATSAPP_NUMBER=123456789
```

### Acceder a las variables

En tu código JavaScript/Vue:

```javascript
// Acceder a una variable de entorno
const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER

// Verificar en qué modo estás
if (import.meta.env.DEV) {
  console.log('Modo desarrollo')
}

if (import.meta.env.PROD) {
  console.log('Modo producción')
}
```

### Variables especiales de Vite

Vite proporciona algunas variables automáticamente:

- `import.meta.env.MODE`: `development` o `production`
- `import.meta.env.DEV`: `true` en desarrollo
- `import.meta.env.PROD`: `true` en producción
- `import.meta.env.BASE_URL`: URL base de la app

---

## 🔒 Seguridad

### ✅ Buenas Prácticas

1. **NUNCA** subas el archivo `.env` a Git
2. **SIEMPRE** actualiza `.env.example` cuando agregues nuevas variables
3. **NO** pongas información sensible en variables sin prefijo `VITE_`
4. Rota credenciales si accidentalmente las subiste a Git

### ⚠️ Variables Públicas vs Privadas

**IMPORTANTE**: Las variables con prefijo `VITE_` son **públicas** - estarán visibles en el código compilado del navegador.

**NO uses variables de entorno para:**
- ❌ Claves de API secretas
- ❌ Contraseñas
- ❌ Tokens de autenticación privados

**SÍ usa variables de entorno para:**
- ✅ URLs públicas
- ✅ Identificadores públicos (como Google Sheet ID)
- ✅ Números de teléfono
- ✅ Configuraciones que cambian entre ambientes

Para secretos reales, necesitas un backend.

---

## 🌍 Diferentes Ambientes

### Archivo `.env` (Base)
Se carga en todos los ambientes:

```env
VITE_APP_TITLE=Hilos de Luz
```

### Archivo `.env.local` (Local)
Sobrescribe `.env` en tu máquina local:

```env
VITE_WHATSAPP_NUMBER=111111111  # Número de prueba
```

### Archivo `.env.production` (Producción)
Se usa solo en build de producción:

```env
VITE_GOOGLE_SHEET_CSV_URL=https://...produccion...
```

### Orden de precedencia

Vite carga los archivos en este orden (el último sobrescribe):

1. `.env` (base)
2. `.env.local` (ignorado por Git)
3. `.env.[mode]` (ej: `.env.production`)
4. `.env.[mode].local` (ignorado por Git)

---

## 🚨 Solución de Problemas

### Las variables no se cargan

**Problema**: `import.meta.env.VITE_MI_VARIABLE` es `undefined`

**Soluciones**:
1. Verifica que la variable tenga el prefijo `VITE_`
2. Reinicia el servidor de desarrollo
3. Verifica que el archivo `.env` esté en la raíz del proyecto
4. No uses comillas en los valores (a menos que sean parte del valor)

```env
# ✅ Correcto
VITE_EMAIL=contacto@ejemplo.com

# ❌ Incorrecto
VITE_EMAIL="contacto@ejemplo.com"
```

### Error: "Cannot find .env file"

**Solución**: Crea el archivo `.env` copiando `.env.example`

```bash
cp .env.example .env
```

### Las variables muestran valores viejos

**Solución**: Reinicia el servidor completamente

```bash
# Ctrl + C para detener
npm run dev
```

### Quiero usar variables sin prefijo VITE_

**No es posible en el cliente**. Las variables sin prefijo solo están disponibles en:
- Archivos de configuración de Vite (`vite.config.js`)
- Scripts de Node.js
- No en componentes Vue

---

## 📚 Recursos

- [Vite - Variables de Entorno](https://vitejs.dev/guide/env-and-mode.html)
- [dotenv Documentation](https://github.com/motdotla/dotenv)

---

## 🎯 Checklist

Antes de empezar a desarrollar:

- [ ] Existe el archivo `.env` en la raíz del proyecto
- [ ] `.env` está en `.gitignore`
- [ ] Todas las variables de `.env.example` están en tu `.env`
- [ ] Las variables tienen el prefijo `VITE_`
- [ ] Has reiniciado el servidor después de crear/editar `.env`
- [ ] Puedes ver tus valores en la consola del navegador (si es necesario para debug)

---

**Recuerda**: Cada vez que edites `.env`, reinicia el servidor de desarrollo.
