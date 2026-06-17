import { ref, computed } from 'vue'
import { GoogleSheetsService } from '../services/googleSheetsService'

/**
 * Composable para manejar la carga y filtrado de productos
 */
export function useProducts() {
  const allProducts = ref([])
  const selectedCategory = ref('all')
  const isLoading = ref(false)
  const error = ref(null)

  /**
   * Productos filtrados por categoría
   */
  const filteredProducts = computed(() => {
    if (selectedCategory.value === 'all') {
      return allProducts.value
    }
    return allProducts.value.filter(
      product => product.categoria === selectedCategory.value
    )
  })

  /**
   * Carga los productos desde Google Sheets
   */
  const loadProducts = async () => {
    isLoading.value = true
    error.value = null

    try {
      allProducts.value = await GoogleSheetsService.loadProducts()
    } catch (err) {
      error.value = 'Error al cargar los productos. Por favor, intenta más tarde.'
      console.error('Error loading products:', err)
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Establece la categoría seleccionada
   */
  const setCategory = (category) => {
    selectedCategory.value = category
  }

  return {
    allProducts,
    filteredProducts,
    selectedCategory,
    isLoading,
    error,
    loadProducts,
    setCategory
  }
}
