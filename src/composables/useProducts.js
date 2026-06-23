import { ref, computed } from 'vue'
import { SanityService } from '../services/sanityService'

/**
 * Composable para manejar la carga y filtrado de productos
 *
 * MODIFICADO: Cambiado de GoogleSheetsService a SanityService
 * MOTIVO: Migración completa a Sanity CMS
 * CAMBIOS: Solo el import del servicio, la interfaz pública se mantiene igual
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
   * Carga los productos desde Sanity CMS
   *
   * MODIFICADO: Cambiado GoogleSheetsService a SanityService
   */
  const loadProducts = async () => {
    isLoading.value = true
    error.value = null

    try {
      allProducts.value = await SanityService.loadProducts()
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
