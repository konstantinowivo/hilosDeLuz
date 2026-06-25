<template>
  <section id="catalogo" class="catalog">
    <div class="container">
      <h2 class="section-title">Nuestro Catálogo</h2>
      <p class="section-subtitle">Descubre nuestras colecciones únicas</p>

      <!-- Category Filter -->
      <div class="category-filter">
        <label for="category-select">Línea de productos:</label>
        <select
          id="category-select"
          class="category-dropdown"
          v-model="selectedCategory"
          @change="handleCategoryChange"
        >
          <option value="all">Todas las líneas</option>
          <option value="calma">Calma</option>
          <option value="natural">Natural</option>
          <option value="ecologica">Ecológica</option>
        </select>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading" class="catalog-loading">
        <p>Cargando productos...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="catalog-error">
        <p>{{ error }}</p>
      </div>

      <!-- Products Grid -->
      <div v-else>
        <div class="catalog-grid">
          <TransitionGroup name="product-fade">
            <ProductCard
              v-for="product in displayedProducts"
              :key="product.id"
              :product="product"
            />
          </TransitionGroup>

          <!-- Empty State -->
          <div
            v-if="filteredProducts.length === 0 && !isLoading"
            style="grid-column: 1/-1; text-align: center; padding: 3rem; color: var(--gray);"
          >
            <p>No hay productos en esta categoría.</p>
          </div>
        </div>

        <!-- Ver más button (solo móvil) -->
        <button
          v-if="showExpandButton"
          class="btn-ver-mas-productos"
          @click="toggleExpanded"
        >
          {{ isExpanded ? 'Ver menos' : 'Ver más' }}
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import ProductCard from './ProductCard.vue'
import { useProducts } from '../composables/useProducts'

const {
  filteredProducts,
  selectedCategory,
  isLoading,
  error,
  loadProducts,
  setCategory
} = useProducts()

const isExpanded = ref(false)
const isMobile = ref(false)
const MOBILE_PRODUCT_LIMIT = 3

// Detectar si es móvil
const checkMobile = () => {
  isMobile.value = window.innerWidth <= 768
}

// Productos a mostrar (limitados en móvil si está colapsado)
const displayedProducts = computed(() => {
  if (!isMobile.value || isExpanded.value) {
    return filteredProducts.value
  }
  return filteredProducts.value.slice(0, MOBILE_PRODUCT_LIMIT)
})

// Mostrar botón solo si es móvil y hay más de 3 productos
const showExpandButton = computed(() => {
  return isMobile.value && filteredProducts.value.length > MOBILE_PRODUCT_LIMIT
})

const toggleExpanded = () => {
  isExpanded.value = !isExpanded.value
}

const handleCategoryChange = () => {
  setCategory(selectedCategory.value)
  isExpanded.value = false // Reset al cambiar categoría
}

onMounted(async () => {
  await loadProducts()
  checkMobile()
  window.addEventListener('resize', checkMobile)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile)
})
</script>

<style scoped>
/* Animaciones para transiciones de productos */
.product-fade-enter-active,
.product-fade-leave-active {
  transition: all 0.5s ease;
}

.product-fade-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.product-fade-leave-to {
  opacity: 0;
  transform: scale(0.9);
}
</style>
