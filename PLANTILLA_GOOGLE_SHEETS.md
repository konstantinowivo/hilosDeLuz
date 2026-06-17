# Plantilla para Google Sheets - Productos Hilos de Luz

## Cómo usar esta plantilla

1. Abre tu Google Sheet "Productos"
2. Copia la tabla de abajo
3. Pégala en tu Google Sheet (fila 1 = encabezados)
4. Reemplaza los datos de ejemplo con tus productos reales
5. Reemplaza las URLs de ejemplo con tus URLs de Google Drive

---

## Estructura de Encabezados (Fila 1)

```
Nombre | Precio | Descripción | Medidas | Categoría | URL Imagen
```

**IMPORTANTE:**
- Los encabezados deben estar exactamente en este orden
- No agregues espacios extras
- No cambies los nombres de las columnas

---

## Datos de Ejemplo

Aquí tienes ejemplos basados en las imágenes que tienes:

### Producto 1: Lámpara Brisa Natural
```
Nombre: Lámpara Brisa Natural
Precio: $35.000
Descripción: Inspirada en la suavidad de la brisa
Medidas: 40cm x 30cm
Categoría: natural
URL Imagen: [PEGAR_TU_URL_DE_GOOGLE_DRIVE_AQUI]
```

### Producto 2: Lámpara Duna Ecológica
```
Nombre: Lámpara Duna Ecológica
Precio: $42.000
Descripción: Materiales sustentables y diseño orgánico
Medidas: 45cm x 35cm
Categoría: ecologica
URL Imagen: [PEGAR_TU_URL_DE_GOOGLE_DRIVE_AQUI]
```

### Producto 3: Lámpara Equilibrio Calma
```
Nombre: Lámpara Equilibrio Calma
Precio: $38.000
Descripción: Armonía y serenidad para tu espacio
Medidas: 35cm x 35cm
Categoría: calma
URL Imagen: [PEGAR_TU_URL_DE_GOOGLE_DRIVE_AQUI]
```

### Producto 4: Lámpara Trigo Ecológica
```
Nombre: Lámpara Trigo Ecológica
Precio: $40.000
Descripción: Inspirada en campos de trigo
Medidas: 50cm x 40cm
Categoría: ecologica
URL Imagen: [PEGAR_TU_URL_DE_GOOGLE_DRIVE_AQUI]
```

---

## Tabla Completa para Copiar y Pegar

Puedes copiar esta tabla completa y pegarla directamente en tu Google Sheet:

```
Nombre	Precio	Descripción	Medidas	Categoría	URL Imagen
Lámpara Brisa Natural	$35.000	Inspirada en la suavidad de la brisa	40cm x 30cm	natural
Lámpara Duna Ecológica	$42.000	Materiales sustentables y diseño orgánico	45cm x 35cm	ecologica
Lámpara Equilibrio Calma	$38.000	Armonía y serenidad para tu espacio	35cm x 35cm	calma
Lámpara Trigo Ecológica	$40.000	Inspirada en campos de trigo	50cm x 40cm	ecologica
```

**NOTA:** La última columna (URL Imagen) está vacía intencionalmente. Debes completarla con las URLs de tus imágenes en Google Drive siguiendo la guía `GUIA_IMAGENES_GOOGLE_DRIVE.md`.

---

## Correspondencia con tus Archivos de Imagen

Estas son las imágenes que tienes en la carpeta `resources/`:

1. `brisa_natural.png` → Lámpara Brisa Natural (categoría: natural)
2. `duna_ecológica.png` → Lámpara Duna Ecológica (categoría: ecologica)
3. `equilibro_calma.png` → Lámpara Equilibrio Calma (categoría: calma)
4. `trigo_ecológica.png` → Lámpara Trigo Ecológica (categoría: ecologica)

**Paso siguiente:** Sube estas 4 imágenes a Google Drive y obtén sus URLs según la guía.

---

## Categorías Disponibles

Solo puedes usar estas tres categorías (en minúsculas, sin tildes):

1. **calma** - Para productos que transmiten tranquilidad, relajación, meditación
2. **natural** - Para productos con materiales naturales, inspirados en la naturaleza
3. **ecologica** - Para productos sustentables, reciclados, eco-friendly (sin tilde en "ecológica")

**⚠️ MUY IMPORTANTE:**
- Escribe `ecologica` (sin tilde), NO `ecológica`
- Siempre en minúsculas
- Si escribes mal la categoría, el producto no se mostrará en el filtro correcto

---

## Checklist de Validación

Antes de publicar tu Google Sheet, verifica:

- [ ] Primera fila tiene los 6 encabezados en el orden correcto
- [ ] Todos los productos tienen nombre
- [ ] Todos los precios tienen formato consistente ($XX.XXX)
- [ ] Todas las descripciones son breves (máximo 2 líneas)
- [ ] Todas las medidas están especificadas
- [ ] Todas las categorías son: `calma`, `natural` o `ecologica` (en minúsculas)
- [ ] Todas las URLs de imágenes están completas y funcionan
- [ ] Probaste cada URL de imagen pegándola en un navegador incógnito

---

## Ejemplo de Cómo se Ve en Google Sheet

```
┌─────────────────────────┬──────────┬──────────────────────────────────────┬─────────────┬───────────┬─────────────────────────────────────────────────┐
│ Nombre                  │ Precio   │ Descripción                          │ Medidas     │ Categoría │ URL Imagen                                      │
├─────────────────────────┼──────────┼──────────────────────────────────────┼─────────────┼───────────┼─────────────────────────────────────────────────┤
│ Lámpara Brisa Natural   │ $35.000  │ Inspirada en la suavidad de la brisa │ 40cm x 30cm │ natural   │ https://drive.google.com/uc?export=view&id=ABC  │
├─────────────────────────┼──────────┼──────────────────────────────────────┼─────────────┼───────────┼─────────────────────────────────────────────────┤
│ Lámpara Duna Ecológica  │ $42.000  │ Materiales sustentables y diseño...  │ 45cm x 35cm │ ecologica │ https://drive.google.com/uc?export=view&id=XYZ  │
└─────────────────────────┴──────────┴──────────────────────────────────────┴─────────────┴───────────┴─────────────────────────────────────────────────┘
```

---

## Próximos Pasos

1. ✅ Sube las 4 imágenes a Google Drive (ver `GUIA_IMAGENES_GOOGLE_DRIVE.md`)
2. ✅ Obtén las URLs en formato correcto
3. ✅ Copia la tabla de arriba a tu Google Sheet
4. ✅ Pega las URLs en la columna "URL Imagen"
5. ✅ Personaliza nombres, precios, descripciones y medidas según tus productos
6. ✅ Publica el Google Sheet como CSV (ver `CONFIGURACION_GOOGLE_SHEETS.md` Paso 5)
7. ✅ Prueba tu sitio web

---

**¿Todo listo?** Una vez que completes estos pasos, tu catálogo estará completamente funcional y podrás agregar o editar productos simplemente editando el Google Sheet, sin tocar código nunca más.
