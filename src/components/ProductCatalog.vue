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
      <div v-else class="catalog-grid">
        <TransitionGroup name="product-fade">
          <ProductCard
            v-for="product in filteredProducts"
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
    </div>
  </section>
</template>

<script setup>
import { onMounted } from 'vue'
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

const handleCategoryChange = () => {
  setCategory(selectedCategory.value)
}

onMounted(async () => {
  await loadProducts()
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
