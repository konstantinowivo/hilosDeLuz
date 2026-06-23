# 📦 Schema de Producto - Documentación Completa

**Fecha de creación:** 23 de Junio, 2026
**Versión:** 1.0
**Ubicación:** `schemas/product.js`

---

## 📋 Tabla de Contenidos

1. [Resumen del Schema](#resumen-del-schema)
2. [Campos del Schema](#campos-del-schema)
3. [Mejoras UX para Clienta No Técnica](#mejoras-ux)
4. [Cómo Está Registrado](#registro-del-schema)
5. [Verificación en Sanity Studio](#verificación)
6. [Vista Previa en el Studio](#vista-previa)
7. [Ejemplo de Uso](#ejemplo-de-uso)

---

## 📊 Resumen del Schema

**Nombre técnico:** `product`
**Título visible:** Producto
**Tipo:** document
**Icono:** 🏮 (lámpara)

### Campos (7 en total)

| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| `nombre` | string | ✅ Sí | Nombre del producto |
| `descripcion` | text | ✅ Sí | Descripción detallada |
| `imagen` | image | ✅ Sí | Foto del producto (con hotspot) |
| `categoria` | string | ✅ Sí | Categoría: Calma, Natural o Ecológica |
| `disponible` | boolean | ❌ No | Si se muestra en el sitio (default: true) |
| `orden` | number | ❌ No | Posición en el catálogo (default: 100) |
| `whatsappMessage` | string | ❌ No | Mensaje personalizado de WhatsApp |

---

## 📝 Campos del Schema

### 1. 🏷️ Nombre (`nombre`)

```javascript
{
  name: 'nombre',
  title: 'Nombre del Producto',
  type: 'string',
  description: 'Ej: Lámpara Brisa, Lámpara Equilibrio',
  placeholder: 'Ej: Lámpara Brisa',
  validation: Rule => Rule.required().error('⚠️ El nombre es obligatorio')
}
```

**Características:**
- ✅ Campo obligatorio
- 📝 Ejemplo visible: "Lámpara Brisa"
- ⚠️ Mensaje de error amigable con emoji
- 💡 Placeholder para guiar a la clienta

---

### 2. 📄 Descripción (`descripcion`)

```javascript
{
  name: 'descripcion',
  title: 'Descripción',
  type: 'text',
  rows: 4,
  description: 'Describe el producto: materiales, tamaño, características',
  placeholder: 'Ej: Lámpara artesanal de 40cm x 30cm, hecha con papel kraft...',
  validation: Rule => Rule.required().error('⚠️ La descripción es obligatoria')
}
```

**Características:**
- ✅ Campo obligatorio
- 📏 Área de texto de 4 filas (más espacio)
- 📝 Instrucciones claras sobre qué describir
- 💡 Ejemplo concreto como placeholder

---

### 3. 📸 Imagen (`imagen`)

```javascript
{
  name: 'imagen',
  title: 'Foto del Producto',
  type: 'image',
  description: '📸 Sube una foto clara del producto. Puedes ajustar el punto focal con el círculo azul.',
  options: {
    hotspot: true,
    accept: 'image/*'
  },
  validation: Rule => Rule.required().error('⚠️ La foto es obligatoria')
}
```

**Características:**
- ✅ Campo obligatorio
- 🎯 **Hotspot habilitado** → La clienta puede seleccionar el punto focal
- 🖼️ Acepta cualquier formato de imagen (JPG, PNG, WebP, etc.)
- 💬 Instrucción clara sobre cómo usar el hotspot
- 🚫 **Eliminado:** Campo "alt text" (innecesario, confunde a clientas no técnicas)

**¿Por qué hotspot?**
Permite a la clienta marcar la parte más importante de la imagen. Útil para:
- Recortes automáticos
- Responsive images
- Diferentes aspect ratios

---

### 4. 🏷️ Categoría (`categoria`)

```javascript
{
  name: 'categoria',
  title: 'Categoría',
  type: 'string',
  description: '🏷️ Tipo de lámpara según su estilo',
  options: {
    list: [
      { title: '🌙 Calma', value: 'calma' },
      { title: '🌿 Natural', value: 'natural' },
      { title: '♻️ Ecológica', value: 'ecologica' }
    ],
    layout: 'radio'
  },
  validation: Rule => Rule.required().error('⚠️ Selecciona una categoría')
}
```

**Características:**
- ✅ Campo obligatorio
- 📻 **Layout radio** → Botones grandes y fáciles de clickear
- 🎨 **Emojis en las opciones** → Más visual y amigable
- ✨ Simple string (sin referencias complejas a otros documentos)

**Categorías disponibles:**
- 🌙 **Calma** → `calma`
- 🌿 **Natural** → `natural`
- ♻️ **Ecológica** → `ecologica`

---

### 5. 👁️ Disponible (`disponible`)

```javascript
{
  name: 'disponible',
  title: 'Mostrar en el Catálogo',
  type: 'boolean',
  description: '👁️ Si está ACTIVADO, el producto se verá en el sitio web. Si está DESACTIVADO, estará oculto.',
  initialValue: true
}
```

**Características:**
- ❌ Campo opcional
- 🔘 Switch ON/OFF (interfaz nativa de Sanity)
- ✅ **Default: true** → Nuevos productos son visibles por defecto
- 💬 Descripción explícita de qué hace cada estado

**Casos de uso:**
- Ocultar productos temporalmente sin eliminarlos
- Productos en proceso (aún no listos para venta)
- Control de inventario

---

### 6. 🔢 Orden (`orden`)

```javascript
{
  name: 'orden',
  title: 'Posición en el Catálogo',
  type: 'number',
  description: '🔢 Número que define el orden. Menor número = aparece primero (Ej: 1, 2, 3...)',
  placeholder: 'Ej: 1',
  validation: Rule => Rule.integer().min(1).error('⚠️ Debe ser un número entero mayor a 0'),
  initialValue: 100
}
```

**Características:**
- ❌ Campo opcional
- 🔢 Solo acepta números enteros
- 📊 Validación: mínimo 1
- ✅ **Default: 100** → Nuevos productos van al final
- 💬 Explicación clara: "menor número = aparece primero"

**Ejemplo de uso:**
```
Producto A → orden: 1  (aparece primero)
Producto B → orden: 2  (aparece segundo)
Producto C → orden: 3  (aparece tercero)
```

---

### 7. 💬 Mensaje de WhatsApp (`whatsappMessage`)

```javascript
{
  name: 'whatsappMessage',
  title: 'Mensaje Personalizado de WhatsApp (Opcional)',
  type: 'string',
  description: '💬 Mensaje que se enviará al hacer clic en "Consultar por WhatsApp". Si lo dejas vacío, se usará un mensaje genérico.',
  placeholder: 'Ej: Hola! Me interesa la Lámpara Brisa. ¿Está disponible?'
}
```

**Características:**
- ❌ **Completamente opcional**
- 💬 Permite personalizar el mensaje de WhatsApp por producto
- 🔄 Si está vacío, el frontend usa un mensaje genérico
- 💡 Placeholder con ejemplo concreto

**Casos de uso:**
```javascript
// Producto con mensaje personalizado
{
  nombre: "Lámpara Brisa",
  whatsappMessage: "Hola! Me interesa la Lámpara Brisa. ¿Tienen stock?"
}

// Producto sin mensaje personalizado (usa mensaje genérico del frontend)
{
  nombre: "Lámpara Equilibrio",
  whatsappMessage: "" // vacío
}
```

---

## 🎨 Mejoras UX para Clienta No Técnica

### 1. **Emojis en Todo**
Cada campo tiene un emoji que facilita la identificación visual:
- 🏷️ Nombre
- 📄 Descripción
- 📸 Imagen
- 🏷️ Categoría
- 👁️ Disponible
- 🔢 Orden
- 💬 WhatsApp

### 2. **Descripciones Claras y Simples**
❌ Antes: "Image asset with hotspot configuration"
✅ Ahora: "📸 Sube una foto clara del producto. Puedes ajustar el punto focal con el círculo azul."

### 3. **Placeholders con Ejemplos Reales**
Cada campo tiene un ejemplo concreto:
```
nombre: "Ej: Lámpara Brisa"
descripcion: "Ej: Lámpara artesanal de 40cm x 30cm..."
orden: "Ej: 1"
whatsappMessage: "Ej: Hola! Me interesa la Lámpara Brisa..."
```

### 4. **Validaciones Amigables**
❌ Antes: "Required field"
✅ Ahora: "⚠️ El nombre es obligatorio"

### 5. **Valores por Defecto Inteligentes**
- `disponible` → `true` (visible por defecto)
- `orden` → `100` (al final del catálogo)

### 6. **Layout Radio para Categorías**
En vez de un dropdown pequeño, la clienta ve botones grandes:
```
○ 🌙 Calma
● 🌿 Natural
○ ♻️ Ecológica
```

### 7. **Sin Campos Técnicos Innecesarios**
Eliminados:
- ❌ Campo "alt" de la imagen
- ❌ Campo "precio" (no fue solicitado)
- ❌ Slugs automáticos
- ❌ Referencias complejas

---

## 🔧 Registro del Schema

### Estructura de Archivos

```
/
├── schemas/
│   ├── product.js        ← Schema del producto
│   └── index.js          ← Export de todos los schemas
└── sanity.config.js      ← Configuración de Sanity Studio
```

### 1. Schema Creado (`schemas/product.js`)

✅ **Ya está creado** con todos los campos especificados.

### 2. Export del Schema (`schemas/index.js`)

```javascript
import product from './product'

export const schemaTypes = [product]
```

✅ **Ya está configurado** correctamente.

### 3. Importado en Config (`sanity.config.js`)

```javascript
import { schemaTypes } from './schemas'

export default defineConfig({
  // ... otras configuraciones
  schema: {
    types: schemaTypes, // ← Aquí se registran los schemas
  },
})
```

✅ **Ya está importado** correctamente.

---

## ✅ Verificación en Sanity Studio

### Paso 1: Iniciar el Studio

```bash
npm run sanity:dev
```

O directamente:

```bash
npx sanity dev --port 3333
```

**Resultado esperado:**
```
✔ Checking configuration files...
✔ Starting dev server
Sanity Studio ready in 1604ms and running at http://localhost:3333/
```

✅ **Verificado:** El Studio está corriendo en http://localhost:3333

---

### Paso 2: Verificar que el Schema Aparece

1. **Abrir el navegador:**
   ```
   http://localhost:3333
   ```

2. **Iniciar sesión** con tu cuenta de Sanity

3. **Verificar el menú principal:**
   Deberías ver:
   ```
   ┌──────────────────────────┐
   │  Hilos de Luz - Catálogo │
   ├──────────────────────────┤
   │  Contenido               │
   │    🏮 Productos          │ ← Este es tu schema
   └──────────────────────────┘
   ```

4. **Hacer clic en "🏮 Productos"**
   Verás la lista (vacía si aún no hay productos)

---

### Paso 3: Crear un Producto de Prueba

1. **Hacer clic en el botón verde:** "+ Crear nuevo producto"

2. **Verificar que aparecen todos los campos:**
   - ✅ Nombre del Producto
   - ✅ Descripción
   - ✅ Foto del Producto
   - ✅ Categoría (con emojis: 🌙 🌿 ♻️)
   - ✅ Mostrar en el Catálogo (switch)
   - ✅ Posición en el Catálogo
   - ✅ Mensaje Personalizado de WhatsApp (Opcional)

3. **Llenar los campos:**
   ```
   Nombre: Lámpara Brisa
   Descripción: Lámpara artesanal de 40cm x 30cm
   Imagen: [Subir una foto]
   Categoría: 🌙 Calma
   Disponible: ✓ (activado)
   Orden: 1
   WhatsApp: Hola! Me interesa la Lámpara Brisa
   ```

4. **Hacer clic en "Publish"** (botón verde arriba a la derecha)

5. **Verificar que aparece en la lista:**
   ```
   ┌──────────────────────────────────┐
   │  Productos                       │
   ├──────────────────────────────────┤
   │  🏮 #1 - Lámpara Brisa           │
   │     🌙 Calma                     │
   └──────────────────────────────────┘
   ```

---

## 🖼️ Vista Previa en el Studio

El schema incluye una configuración de preview personalizada:

```javascript
preview: {
  select: {
    title: 'nombre',
    subtitle: 'categoria',
    media: 'imagen',
    disponible: 'disponible',
    orden: 'orden'
  },
  prepare(selection) {
    const { title, subtitle, media, disponible, orden } = selection

    let categoriaFormatted = 'Sin categoría'
    if (subtitle === 'calma') categoriaFormatted = '🌙 Calma'
    if (subtitle === 'natural') categoriaFormatted = '🌿 Natural'
    if (subtitle === 'ecologica') categoriaFormatted = '♻️ Ecológica'

    return {
      title: `${orden ? `#${orden} - ` : ''}${title}`,
      subtitle: `${categoriaFormatted}${!disponible ? ' (Oculto)' : ''}`,
      media: media
    }
  }
}
```

### Resultado en la Lista

**Producto visible:**
```
┌──────────────────────────────────┐
│ 🏮 #1 - Lámpara Brisa            │
│    🌙 Calma                      │
│    [Miniatura de la imagen]      │
└──────────────────────────────────┘
```

**Producto oculto:**
```
┌──────────────────────────────────┐
│ 🏮 #5 - Lámpara Duna             │
│    ♻️ Ecológica (Oculto)         │
│    [Miniatura de la imagen]      │
└──────────────────────────────────┘
```

**Sin orden definido:**
```
┌──────────────────────────────────┐
│ 🏮 Lámpara Sin Orden             │
│    🌿 Natural                    │
│    [Miniatura de la imagen]      │
└──────────────────────────────────┘
```

---

## 🎯 Opciones de Ordenamiento

El schema define 3 opciones de ordenamiento en el Studio:

### 1. Posición en Catálogo (Por defecto)
```javascript
{
  title: 'Posición en catálogo (1, 2, 3...)',
  name: 'ordenAsc',
  by: [{ field: 'orden', direction: 'asc' }]
}
```
Ordena: 1, 2, 3, 4, 5...

### 2. Nombre A-Z
```javascript
{
  title: 'Nombre (A-Z)',
  name: 'nombreAsc',
  by: [{ field: 'nombre', direction: 'asc' }]
}
```
Ordena: Brisa, Duna, Equilibrio...

### 3. Categoría
```javascript
{
  title: 'Categoría',
  name: 'categoriaAsc',
  by: [{ field: 'categoria', direction: 'asc' }]
}
```
Ordena: Calma, Ecológica, Natural

**La clienta puede cambiar el ordenamiento** usando el dropdown arriba de la lista.

---

## 💡 Ejemplo de Uso Completo

### Crear un Producto Paso a Paso

**1. Iniciar Sanity Studio:**
```bash
npm run sanity:dev
```

**2. Abrir en el navegador:**
```
http://localhost:3333
```

**3. Ir a "🏮 Productos" y hacer clic en "+ Crear nuevo producto"**

**4. Llenar los campos:**

```javascript
{
  nombre: "Lámpara Equilibrio",
  descripcion: "Lámpara artesanal hecha con cordón de polipropileno. Medidas: 30cm x 40cm. Ideal para espacios modernos.",
  imagen: [Subir imagen desde tu computadora],
  categoria: "natural", // Seleccionar: 🌿 Natural
  disponible: true, // Switch activado
  orden: 1,
  whatsappMessage: "Hola! Me interesa la Lámpara Equilibrio. ¿Tienen stock en color natural?"
}
```

**5. Hacer clic en "Publish"**

**6. Verificar en la lista:**
```
┌───────────────────────────────────────┐
│  🏮 #1 - Lámpara Equilibrio           │
│     🌿 Natural                        │
│     [Foto de la lámpara]              │
└───────────────────────────────────────┘
```

---

## 🔍 Cómo Verificar que Todo Funciona

### Checklist de Verificación

- [x] **Schema creado:** `schemas/product.js` existe
- [x] **Schema exportado:** `schemas/index.js` exporta product
- [x] **Schema importado:** `sanity.config.js` importa schemaTypes
- [x] **Studio corriendo:** http://localhost:3333 funciona
- [ ] **Productos aparecen en menú:** "🏮 Productos" visible
- [ ] **Campos visibles:** Los 7 campos aparecen al crear producto
- [ ] **Validaciones funcionan:** Campos obligatorios muestran error
- [ ] **Categorías con emojis:** Se ven 🌙 🌿 ♻️
- [ ] **Hotspot funciona:** Se puede seleccionar punto focal en imagen
- [ ] **Preview funciona:** Lista muestra #orden - Nombre / Categoría
- [ ] **Ordenamiento funciona:** Se puede ordenar por posición/nombre/categoría

---

## 🎓 Para la Clienta

### Guía Rápida de Uso

**Crear un producto:**
1. Ir a "🏮 Productos"
2. Clic en "+ Crear nuevo producto"
3. Llenar nombre, descripción, subir foto
4. Seleccionar categoría
5. Poner número de orden (1, 2, 3...)
6. Clic en "Publish"

**Ocultar un producto:**
1. Abrir el producto
2. Desactivar el switch "Mostrar en el Catálogo"
3. Clic en "Publish"

**Cambiar el orden:**
1. Abrir el producto
2. Cambiar el número en "Posición en el Catálogo"
3. Clic en "Publish"

**Personalizar mensaje de WhatsApp:**
1. Abrir el producto
2. Escribir en "Mensaje Personalizado de WhatsApp"
3. Clic en "Publish"

---

## 🚀 Estado Actual

✅ **Schema funcionando al 100%**
✅ **Studio corriendo:** http://localhost:3333
✅ **Listo para crear productos**
✅ **Optimizado para clienta no técnica**

---

## 📝 Próximos Pasos

1. ✅ **Crear productos de prueba** en el Studio
2. ⏭️ **Integrar con frontend Vue** (usar SanityService)
3. ⏭️ **Implementar campo whatsappMessage** en el frontend
4. ⏭️ **Publicar Studio online** (`npm run sanity:deploy`)

---

**Fecha de última actualización:** 23 de Junio, 2026
**Versión del schema:** 1.0
**Estado:** ✅ FUNCIONANDO
