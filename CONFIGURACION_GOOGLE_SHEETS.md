# Configuración de Google Sheets para Hilos de Luz

Este documento te guiará paso a paso para configurar la planilla de Google Sheets y conectarla con tu sitio web.

## Paso 1: Crear la Planilla de Google Sheets

1. Ve a [Google Sheets](https://sheets.google.com)
2. Crea una nueva hoja de cálculo
3. Nómbrala como quieras (ejemplo: "Hilos de Luz - Productos")
4. Renombra la primera pestaña (hoja) como **"Productos"** (sin las comillas)

## Paso 2: Estructura de la Planilla

La primera fila debe contener los siguientes encabezados (exactamente como se muestran):

| Nombre | Precio | Descripción | Medidas | Categoría | URL Imagen |
|--------|--------|-------------|---------|-----------|------------|

**Descripción de las columnas:**

- **Nombre**: Nombre del producto (ej: "Lámpara Colgante Artesanal")
- **Precio**: Precio con formato (ej: "$45.000" o "$45,000")
- **Descripción**: Descripción breve del producto (ej: "Diseño minimalista perfecto para comedores")
- **Medidas**: Dimensiones del producto (ej: "40cm x 30cm" o "Diámetro 35cm")
- **Categoría**: Debe ser **exactamente** una de estas tres opciones:
  - `calma` (en minúsculas)
  - `natural` (en minúsculas)
  - `ecologica` (en minúsculas, sin tilde)
- **URL Imagen**: Link completo de la imagen del producto (ver Paso 3)

## Paso 3: Subir las Imágenes

Para que las imágenes funcionen, necesitas subirlas a un servicio en línea y obtener sus URLs:

### Opción A: Google Drive (Recomendado)

**📖 Guía detallada:** Lee el archivo `GUIA_IMAGENES_GOOGLE_DRIVE.md` para instrucciones completas paso a paso.

**Resumen rápido:**
1. Crea una carpeta en Google Drive llamada "Imagenes Productos Hilos de Luz"
2. Sube todas tus fotos de productos a esa carpeta
3. Para cada imagen:
   - Click derecho > "Compartir"
   - Cambiar a "Cualquier persona con el enlace"
   - Copiar el enlace
   - Transformar el enlace de este formato:
     ```
     https://drive.google.com/file/d/ABC123XYZ/view?usp=sharing
     ```
     A este formato:
     ```
     https://drive.google.com/uc?export=view&id=ABC123XYZ
     ```
   - Pegar este enlace en la columna "URL Imagen"

### Opción B: Imgur

1. Ve a [Imgur](https://imgur.com)
2. Crea una cuenta (gratis)
3. Sube tus imágenes
4. Click derecho en cada imagen > "Copiar enlace de imagen"
5. Pegar ese enlace en la columna "URL Imagen"

### Opción C: Otro servicio de hosting
Puedes usar cualquier servicio de hosting de imágenes que te dé URLs directas (Cloudinary, imgbb, etc.)

## Paso 4: Ejemplo de Datos

Aquí un ejemplo de cómo llenar tu planilla:

| Nombre | Precio | Descripción | Medidas | Categoría | URL Imagen |
|--------|--------|-------------|---------|-----------|------------|
| Lámpara Colgante Sol | $45.000 | Diseño minimalista perfecto para comedores | 50cm x 40cm | calma | https://drive.google.com/uc?export=view&id=ABC123 |
| Lámpara de Mesa Bambú | $32.000 | Hecha con materiales naturales | 30cm x 25cm | natural | https://drive.google.com/uc?export=view&id=XYZ789 |
| Lámpara Ecológica LED | $38.000 | Bajo consumo energético | Diámetro 35cm | ecologica | https://i.imgur.com/ejemplo.jpg |
| Lámpara Meditación | $52.000 | Luz tenue para espacios de relajación | 40cm x 35cm | calma | https://drive.google.com/uc?export=view&id=DEF456 |

## Paso 5: Publicar la Planilla

1. En Google Sheets, ve a **Archivo > Compartir > Publicar en la web**
2. En "Vínculos", selecciona:
   - **Hoja específica**: "Productos" (la que creaste)
   - **Formato**: CSV (Valores separados por comas)
3. Click en **Publicar**
4. Confirmar en el mensaje que aparece

## Paso 6: Obtener el ID de la Planilla

1. Mira la URL de tu Google Sheet en el navegador
2. La URL se ve así:
   ```
   https://docs.google.com/spreadsheets/d/1ABC123XYZ456DEF789/edit#gid=0
   ```
3. El ID es la parte entre `/d/` y `/edit`:
   ```
   1ABC123XYZ456DEF789
   ```
4. Copia este ID

## Paso 7: Configurar el Sitio Web

1. Abre el archivo `script.js` en tu editor de código
2. Busca las primeras líneas (líneas 1-6):
   ```javascript
   const GOOGLE_SHEET_ID = 'TU_ID_DE_GOOGLE_SHEETS_AQUI';
   const GOOGLE_SHEET_NAME = 'Productos';
   const WHATSAPP_NUMBER = '5491234567890';
   ```
3. Reemplaza:
   - `TU_ID_DE_GOOGLE_SHEETS_AQUI` por el ID que copiaste en el Paso 6
   - `Productos` debe coincidir con el nombre de tu hoja (si le pusiste otro nombre)
   - `5491234567890` por tu número de WhatsApp real (formato: código país + área + número, sin espacios ni símbolos)

### Ejemplo final:
```javascript
const GOOGLE_SHEET_ID = '1ABC123XYZ456DEF789';
const GOOGLE_SHEET_NAME = 'Productos';
const WHATSAPP_NUMBER = '5491112345678';
```

## Paso 8: Probar el Sitio

1. Abre tu archivo `index.html` en un navegador
2. Deberías ver tus productos cargados desde Google Sheets
3. Prueba el filtro de categorías
4. Verifica que las imágenes se vean correctamente
5. Prueba hacer click en una imagen (debería abrir el lightbox)
6. Prueba el botón "Consultar" (debería abrir WhatsApp)

## Agregar o Editar Productos

Para agregar o editar productos en el futuro:

1. Simplemente edita la planilla de Google Sheets
2. Los cambios se reflejarán automáticamente en el sitio web
3. **No necesitas tocar el código nunca más**
4. Puedes agregar tantos productos como quieras
5. Para eliminar un producto, simplemente borra su fila

## Consejos y Mejores Prácticas

### Imágenes
- Usa imágenes de buena calidad (mínimo 800x800 px)
- Mantén un formato consistente (todas cuadradas o todas rectangulares)
- Optimiza el tamaño de las imágenes (no más de 500KB cada una)
- Usa formato JPG o PNG

### Precios
- Mantén el mismo formato en todos (ej: "$45.000" o "$45,000")
- Sé consistente con el separador de miles

### Descripciones
- Mantén descripciones breves (máximo 2 líneas)
- Enfócate en el beneficio o uso principal del producto

### Categorías
- Usa **siempre** minúsculas: `calma`, `natural`, `ecologica`
- **No uses tildes** en "ecológica" → escribe `ecologica`
- Si escribes mal la categoría, el producto no se mostrará en el filtro correcto

## Solución de Problemas

### Los productos no se cargan
1. Verifica que publicaste la planilla (Paso 5)
2. Verifica que el ID en `script.js` sea correcto
3. Verifica que el nombre de la hoja sea "Productos"
4. Abre la consola del navegador (F12) y busca errores

### Las imágenes no se ven
1. Verifica que las URLs de las imágenes sean públicas
2. Copia la URL y pégala en un navegador incógnito - ¿se ve la imagen?
3. Si usas Google Drive, verifica que el formato de URL sea correcto (Paso 3)

### Los productos no se filtran correctamente
1. Verifica que las categorías estén en minúsculas
2. Verifica que no haya espacios al inicio o final
3. Las únicas categorías válidas son: `calma`, `natural`, `ecologica`

### El botón de WhatsApp no funciona
1. Verifica que el número en `script.js` esté en formato internacional
2. Ejemplo correcto: `5491112345678` (Argentina)
3. Ejemplo incorrecto: `011-1234-5678` o `+54 9 11 1234-5678`

## Contacto

Si tienes problemas con la configuración, revisa cada paso cuidadosamente. La mayoría de los problemas se solucionan verificando:
- El ID de Google Sheets
- Que la planilla esté publicada
- Que las URLs de las imágenes sean públicas
- Que las categorías estén bien escritas

---

**¡Listo!** Ahora puedes administrar tu catálogo de productos fácilmente desde Google Sheets sin necesidad de tocar código. 🎉
