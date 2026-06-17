# Hilos de Luz - Aplicación Vue.js

## 🎉 Nueva Arquitectura Modular con Vue.js

La aplicación ha sido migrada de JavaScript vanilla a **Vue.js 3** con **Vite**, implementando una arquitectura modular y escalable.

---

## 📁 Estructura del Proyecto

```
hilosdeluz/
├── src/
│   ├── components/          # Componentes Vue reutilizables
│   │   ├── AppHeader.vue    # Navbar y navegación
│   │   ├── HeroSection.vue  # Sección hero principal
│   │   ├── ProductCatalog.vue # Catálogo con filtros
│   │   ├── ProductCard.vue  # Tarjeta individual de producto
│   │   ├── Lightbox.vue     # Modal para imágenes
│   │   ├── AboutSection.vue # Sección "Sobre Nosotros"
│   │   ├── ContactSection.vue # Formulario de contacto
│   │   ├── AppFooter.vue    # Footer
│   │   └── WhatsAppButton.vue # Botón flotante de WhatsApp
│   │
│   ├── composables/         # Lógica reutilizable (Composition API)
│   │   ├── useProducts.js   # Manejo de productos y filtros
│   │   ├── useLightbox.js   # Lógica del lightbox
│   │   └── useNavigation.js # Navegación y scroll suave
│   │
│   ├── services/            # Servicios externos
│   │   └── googleSheetsService.js # API de Google Sheets
│   │
│   ├── assets/              # Assets estáticos
│   │   └── styles/
│   │       └── styles.css   # Estilos globales
│   │
│   ├── config.js            # Configuración centralizada
│   ├── App.vue              # Componente raíz
│   └── main.js              # Punto de entrada
│
├── resources/               # Imágenes y recursos
├── index.html               # HTML principal (Vite)
├── vite.config.js           # Configuración de Vite
├── package.json             # Dependencias y scripts
└── .gitignore               # Archivos ignorados por Git
```

---

## 🚀 Comandos Disponibles

### Desarrollo
```bash
npm run dev
```
Inicia el servidor de desarrollo en `http://localhost:5173/hilosDeLuz/`

### Build para Producción
```bash
npm run build
```
Genera la versión optimizada en la carpeta `dist/`

### Preview de Producción
```bash
npm run preview
```
Previsualiza el build de producción localmente

---

## 🧩 Arquitectura de Componentes

### 1. **Componentes Presentacionales**

Componentes que solo muestran UI sin lógica compleja:

- **HeroSection.vue**: Sección de bienvenida
- **AboutSection.vue**: Historia de Hilos de Luz
- **WhatsAppButton.vue**: Botón flotante de contacto
- **AppFooter.vue**: Footer con enlaces

### 2. **Componentes con Lógica**

Componentes que manejan estado y lógica de negocio:

- **ProductCatalog.vue**:
  - Carga productos desde Google Sheets
  - Maneja filtrado por categorías
  - Estados de loading y error

- **ProductCard.vue**:
  - Renderiza un producto individual
  - Maneja click en imagen (lightbox)
  - Genera mensaje de WhatsApp

- **Lightbox.vue**:
  - Modal para visualizar imágenes
  - Maneja eventos de teclado (Escape)
  - Utiliza `provide/inject` para compartir funcionalidad

- **AppHeader.vue**:
  - Navegación responsive
  - Menú hamburguesa móvil
  - Links a redes sociales

- **ContactSection.vue**:
  - Formulario de contacto reactivo
  - Validación de campos

---

## 🎣 Composables (Composition API)

Los composables encapsulan lógica reutilizable:

### **useProducts.js**
```javascript
const {
  allProducts,        // Todos los productos
  filteredProducts,   // Productos filtrados por categoría
  selectedCategory,   // Categoría actual
  isLoading,          // Estado de carga
  error,              // Error si existe
  loadProducts,       // Función para cargar productos
  setCategory         // Función para cambiar categoría
} = useProducts()
```

### **useLightbox.js**
```javascript
const {
  isOpen,            // Si el lightbox está abierto
  currentImage,      // URL de la imagen actual
  currentCaption,    // Título de la imagen
  open,              // Función para abrir lightbox
  close              // Función para cerrar lightbox
} = useLightbox()
```

### **useNavigation.js**
```javascript
const {
  isMenuOpen,        // Estado del menú móvil
  toggleMenu,        // Toggle del menú
  closeMenu,         // Cerrar menú
  scrollToSection    // Scroll suave a sección
} = useNavigation()
```

---

## 🔧 Servicios

### **GoogleSheetsService**

Servicio para interactuar con Google Sheets:

```javascript
import { GoogleSheetsService } from '@/services/googleSheetsService'

// Cargar productos
const products = await GoogleSheetsService.loadProducts()

// Parsear CSV manualmente
const products = GoogleSheetsService.parseCSV(csvText)
```

**Métodos:**
- `loadProducts()`: Carga productos desde el CSV publicado
- `parseCSV(csv)`: Parsea texto CSV a objetos
- `parseCSVLine(line)`: Parsea una línea de CSV
- `createProduct(values)`: Crea objeto producto
- `normalizeCategory(categoria)`: Normaliza categorías

---

## ⚙️ Configuración

Toda la configuración está centralizada en `src/config.js`:

```javascript
export const config = {
  GOOGLE_SHEET_ID: '1YdAMTKVED5UvQ63plsROfZEu8EKcgpfLxY4c4MA2Sxg',
  GOOGLE_SHEET_CSV_URL: '...',
  WHATSAPP_NUMBER: '5493512119851',
  SOCIAL_MEDIA: {
    instagram: 'https://www.instagram.com/hilosdeluz',
    facebook: 'https://www.facebook.com/hilosdeluz'
  },
  CATEGORIES: {
    ALL: 'all',
    CALMA: 'calma',
    NATURAL: 'natural',
    ECOLOGICA: 'ecologica'
  },
  CONTACT_EMAIL: 'contacto@hilosdeluz.com'
}
```

### Para actualizar configuración:
1. Edita `src/config.js`
2. Los cambios se aplicarán automáticamente en toda la app

---

## 🎨 Estilos

Los estilos globales están en `src/assets/styles/styles.css`.

**Características:**
- CSS Variables para temas
- Estilos responsive con media queries
- Animaciones y transiciones
- Componentes con estilos scoped cuando es necesario

---

## 📦 Agregar un Nuevo Componente

### Paso 1: Crear el archivo
```bash
src/components/NuevoComponente.vue
```

### Paso 2: Estructura básica
```vue
<template>
  <div class="nuevo-componente">
    <!-- Tu HTML aquí -->
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Tu lógica aquí
const mensaje = ref('Hola Mundo')
</script>

<style scoped>
/* Estilos específicos del componente */
.nuevo-componente {
  /* ... */
}
</style>
```

### Paso 3: Importar en App.vue
```vue
<script setup>
import NuevoComponente from './components/NuevoComponente.vue'
</script>

<template>
  <NuevoComponente />
</template>
```

---

## 🔄 Flujo de Datos

### Carga de Productos

```
1. ProductCatalog.vue (onMounted)
   ↓
2. useProducts() → loadProducts()
   ↓
3. GoogleSheetsService.loadProducts()
   ↓
4. fetch() → CSV de Google Sheets
   ↓
5. parseCSV() → Array de productos
   ↓
6. allProducts.value = productos
   ↓
7. filteredProducts (computed) → Reactivo al filtro
   ↓
8. ProductCard.vue renderiza cada producto
```

### Filtrado por Categoría

```
1. Usuario cambia select
   ↓
2. v-model actualiza selectedCategory
   ↓
3. filteredProducts (computed) se recalcula
   ↓
4. Vue re-renderiza ProductCard components
   ↓
5. TransitionGroup anima el cambio
```

### Lightbox

```
1. Click en imagen de ProductCard
   ↓
2. ProductCard llama inject('openLightbox')
   ↓
3. Lightbox.vue provide('openLightbox')
   ↓
4. useLightbox() → open(url, caption)
   ↓
5. isOpen = true, Lightbox se muestra
   ↓
6. Usuario presiona Escape o click fuera
   ↓
7. close() → isOpen = false
```

---

## 🌐 Publicación en GitHub Pages

### Paso 1: Build
```bash
npm run build
```

### Paso 2: Verificar `dist/`
La carpeta `dist/` contiene la versión optimizada

### Paso 3: Configurar GitHub Pages
1. Push a GitHub
2. Settings → Pages
3. Source: GitHub Actions (o rama `gh-pages`)

### Nota importante:
El `base` en `vite.config.js` está configurado como `/hilosDeLuz/` para GitHub Pages.

---

## 🔒 Mejores Prácticas

### 1. **Componentes Pequeños y Enfocados**
- Cada componente debe tener una responsabilidad única
- Máximo 200-300 líneas por componente

### 2. **Composables para Lógica Reutilizable**
- Extrae lógica compleja a composables
- Usa nombres descriptivos: `use[Funcionalidad]`

### 3. **Props y Emits Tipados**
```vue
<script setup>
const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['update', 'delete'])
</script>
```

### 4. **Computed para Valores Derivados**
```javascript
const filteredProducts = computed(() => {
  return allProducts.value.filter(/* ... */)
})
```

### 5. **Servicios para Lógica de Negocio**
- Mantén la lógica de API en servicios
- Los componentes solo orquestan

---

## 🐛 Debugging

### Vue DevTools
Instala [Vue DevTools](https://devtools.vuejs.org/) para Chrome/Firefox

### Console Logs
Los servicios ya tienen `console.error` para errores

### Hot Module Replacement (HMR)
Vite recarga automáticamente los cambios sin perder el estado

---

## 📚 Recursos

- [Vue 3 Docs](https://vuejs.org/)
- [Vite Docs](https://vitejs.dev/)
- [Composition API](https://vuejs.org/guide/extras/composition-api-faq.html)
- [Vue Router](https://router.vuejs.org/) (si necesitas rutas en el futuro)
- [Pinia](https://pinia.vuejs.org/) (si necesitas state management global)

---

## 🚀 Próximos Pasos Sugeridos

### Corto Plazo
- [ ] Agregar animaciones más sofisticadas
- [ ] Implementar búsqueda de productos por texto
- [ ] Agregar más filtros (precio, disponibilidad)

### Mediano Plazo
- [ ] Implementar Vue Router para navegación SPA completa
- [ ] Agregar Pinia para estado global
- [ ] Sistema de favoritos (LocalStorage)
- [ ] Modo oscuro

### Largo Plazo
- [ ] Backend propio (Node.js/Express)
- [ ] Autenticación de usuarios
- [ ] Panel de administración
- [ ] Carrito de compras
- [ ] Integración con pasarelas de pago

---

## ✅ Ventajas de la Nueva Arquitectura

1. **Modularidad**: Componentes independientes y reutilizables
2. **Mantenibilidad**: Código organizado y fácil de entender
3. **Escalabilidad**: Fácil agregar nuevas funcionalidades
4. **Performance**: Vite ofrece HMR ultra-rápido
5. **Reactividad**: Vue maneja el estado automáticamente
6. **Testabilidad**: Componentes y composables son fáciles de testear
7. **Developer Experience**: Mejor DX con Vue DevTools y TypeScript (opcional)

---

**¡Disfruta desarrollando con Vue.js!** 🎉
