# Guía: Cómo Configurar Imágenes en Google Drive

Esta guía te muestra paso a paso cómo subir las imágenes de tus productos a Google Drive y obtener las URLs correctas para usar en tu Google Sheet.

## Paso 1: Crear la Carpeta en Google Drive

1. Ve a [Google Drive](https://drive.google.com)
2. Haz click en **"Nuevo"** (arriba a la izquierda)
3. Selecciona **"Nueva carpeta"**
4. Nombra la carpeta: **"Hilos de Luz - Imágenes Productos"**
5. Haz click en **"Crear"**

## Paso 2: Subir tus Imágenes

1. Abre la carpeta que acabas de crear
2. Arrastra y suelta todas las imágenes de tus productos dentro de la carpeta
   - O haz click en **"Nuevo"** → **"Subir archivos"**
3. Espera a que todas las imágenes se suban completamente

**Imágenes actuales que tienes:**
- `brisa_natural.png`
- `duna_ecológica.png`
- `equilibro_calma.png`
- `trigo_ecológica.png`

## Paso 3: Hacer las Imágenes Públicas

**IMPORTANTE:** Debes hacer esto para CADA imagen, una por una.

### Para cada imagen:

1. **Click derecho** en la imagen
2. Selecciona **"Compartir"**
3. En la ventana que se abre, haz click en **"Cambiar"** (al lado de "Restringido")
4. Selecciona **"Cualquier persona con el enlace"**
5. Asegúrate que diga **"Lector"** (no necesitan editar)
6. Haz click en **"Listo"**
7. Ahora haz click en **"Copiar enlace"**
8. Pega el enlace en un archivo de texto temporal (Notepad, Word, etc.)

Repite esto para cada imagen. Al final tendrás algo así:

```
brisa_natural.png → https://drive.google.com/file/d/1AbC123XyZ456/view?usp=sharing
duna_ecológica.png → https://drive.google.com/file/d/1DeF789UvW012/view?usp=sharing
equilibro_calma.png → https://drive.google.com/file/d/1GhI345StU678/view?usp=sharing
trigo_ecológica.png → https://drive.google.com/file/d/1JkL901QrS234/view?usp=sharing
```

## Paso 4: Convertir las URLs al Formato Correcto

Google Drive te da URLs como esta:
```
https://drive.google.com/file/d/1AbC123XyZ456/view?usp=sharing
```

Pero necesitas convertirlas a este formato para que funcionen en tu sitio:
```
https://drive.google.com/uc?export=view&id=1AbC123XyZ456
```

### Cómo convertir:

1. Toma el **ID** que está entre `/d/` y `/view`
   - En el ejemplo: `1AbC123XyZ456`

2. Crea la nueva URL con este formato:
   ```
   https://drive.google.com/uc?export=view&id=ID_AQUI
   ```

3. Reemplaza `ID_AQUI` con el ID que copiaste

### Ejemplos prácticos:

**ANTES (URL original de Drive):**
```
https://drive.google.com/file/d/1AbC123XyZ456/view?usp=sharing
```

**DESPUÉS (URL para usar en tu sitio):**
```
https://drive.google.com/uc?export=view&id=1AbC123XyZ456
```

---

**ANTES:**
```
https://drive.google.com/file/d/1XyZ789AbC123/view?usp=drive_link
```

**DESPUÉS:**
```
https://drive.google.com/uc?export=view&id=1XyZ789AbC123
```

## Paso 5: Usar las URLs en Google Sheets

1. Abre tu Google Sheet de productos
2. En la columna **"URL Imagen"** (columna F), pega las URLs convertidas
3. Cada producto debe tener su URL correspondiente

### Ejemplo:

| Nombre | Precio | Descripción | Medidas | Categoría | URL Imagen |
|--------|--------|-------------|---------|-----------|------------|
| Lámpara Brisa Natural | $35.000 | Inspirada en la naturaleza | 40cm x 30cm | natural | https://drive.google.com/uc?export=view&id=1AbC123 |
| Lámpara Duna Ecológica | $42.000 | Materiales reciclados | 45cm x 35cm | ecologica | https://drive.google.com/uc?export=view&id=1DeF789 |

## Paso 6: Verificar que Funciona

### Método 1: Probar la URL directamente
1. Copia la URL convertida
2. Pégala en una ventana de navegador nueva (incógnito/privado)
3. Deberías ver la imagen directamente
4. Si ves la imagen, ¡funciona! ✅

### Método 2: Verificar en tu sitio web
1. Guarda los cambios en tu Google Sheet
2. Espera 2-3 minutos
3. Abre tu `index.html` en el navegador
4. Refresca la página (Ctrl + F5 o Cmd + Shift + R)
5. Las imágenes deberían cargarse

## Solución de Problemas

### ❌ La imagen no se ve
**Posibles causas:**
1. No configuraste el enlace como "Cualquier persona con el enlace"
   - **Solución:** Ve a Drive, click derecho en la imagen → Compartir → verifica que diga "Cualquier persona con el enlace"

2. El ID está mal copiado
   - **Solución:** Verifica que copiaste solo el ID (sin `/view`, sin `?usp=`, etc.)

3. El formato de la URL está incorrecto
   - **Solución:** Debe ser exactamente: `https://drive.google.com/uc?export=view&id=TU_ID`

### ❌ Veo un error "No tienes permiso"
**Causa:** La imagen no está configurada como pública
- **Solución:** Regresa al Paso 3 y asegúrate de cambiar a "Cualquier persona con el enlace"

### ❌ La URL no carga, sale error 404
**Causa:** El ID está incorrecto
- **Solución:** Vuelve a Drive, obtén el enlace de nuevo y copia cuidadosamente el ID

## Herramienta Rápida: Convertidor de URLs

Para convertir rápidamente:

1. **Encuentra el ID:** Busca lo que está entre `/d/` y `/view` en tu URL original
2. **Crea la nueva URL:** `https://drive.google.com/uc?export=view&id=` + EL_ID

### Ejemplo completo paso a paso:

```
URL Original:
https://drive.google.com/file/d/1a2B3c4D5e6F7g8H9i0J/view?usp=sharing
                              ↑
                    Este es tu ID: 1a2B3c4D5e6F7g8H9i0J

URL Convertida:
https://drive.google.com/uc?export=view&id=1a2B3c4D5e6F7g8H9i0J
```

## Consejos para Organización

1. **Nombra tus archivos claramente** antes de subirlos:
   - ✅ Bueno: `lampara_brisa_natural.jpg`
   - ❌ Malo: `IMG_1234.jpg`

2. **Mantén un archivo de texto** con la correspondencia:
   ```
   Lámpara Brisa Natural = https://drive.google.com/uc?export=view&id=1AbC123
   Lámpara Duna Ecológica = https://drive.google.com/uc?export=view&id=1DeF789
   ```

3. **Usa imágenes optimizadas:**
   - Tamaño recomendado: 800x800 px o 1000x1000 px
   - Formato: JPG (mejor para fotos) o PNG (si necesitas transparencia)
   - Peso máximo: 500 KB por imagen

## Próximos Pasos

Una vez que tengas todas las URLs:

1. ✅ Pégalas en la columna "URL Imagen" de tu Google Sheet
2. ✅ Guarda el Google Sheet
3. ✅ Espera 2-3 minutos
4. ✅ Abre tu sitio web y verifica que las imágenes se vean
5. ✅ Prueba el lightbox haciendo click en las imágenes

---

**¿Necesitas ayuda?**

Revisa los puntos de Solución de Problemas arriba. La mayoría de los problemas se deben a:
- Permisos incorrectos (no público)
- ID mal copiado
- Formato de URL incorrecto

¡Una vez configurado, podrás agregar nuevas imágenes fácilmente siguiendo estos mismos pasos!
