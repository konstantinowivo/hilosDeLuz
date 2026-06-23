import { createClient } from '@sanity/client'
import { createImageUrlBuilder } from '@sanity/image-url'

/**
 * Servicio para cargar productos desde Sanity CMS
 *
 * REEMPLAZA: GoogleSheetsService
 * MOTIVO: Migración completa de Google Sheets a Sanity CMS
 *
 * Este servicio:
 * - Se conecta a Sanity usando el cliente oficial
 * - Carga productos con query GROQ
 * - Procesa imágenes usando Sanity Image URL
 * - Filtra productos disponibles
 * - Ordena por campo 'orden'
 * - Retorna productos en el mismo formato que GoogleSheetsService
 *   para mantener compatibilidad con el resto de la app
 */

// Configurar cliente de Sanity
const client = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
  dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
  apiVersion: import.meta.env.VITE_SANITY_API_VERSION || '2024-01-01',
  useCdn: true, // Usar CDN para mejor performance
})

// Builder para URLs de imágenes
const builder = createImageUrlBuilder(client)

/**
 * Helper para generar URL de imagen optimizada
 * @param {Object} source - Source de imagen de Sanity
 * @returns {string} URL de imagen optimizada
 */
function urlFor(source) {
  return builder
    .image(source)
    .width(800) // Max width 800px
    .format('webp') // Formato WebP para mejor compresión
    .url()
}

/**
 * Servicio principal de Sanity
 */
export class SanityService {
  /**
   * Carga los productos desde Sanity CMS
   * @returns {Promise<Array>} Array de productos
   */
  static async loadProducts() {
    try {
      // Query GROQ para obtener productos
      // - Solo productos con disponible = true
      // - Ordenados por campo 'orden' (ascendente)
      // - Si no tienen orden, van al final
      const query = `
        *[_type == "product" && disponible == true] | order(orden asc) {
          _id,
          nombre,
          descripcion,
          precio,
          imagen,
          categoria,
          orden
        }
      `

      const products = await client.fetch(query)

      // Transformar productos al formato esperado por la app
      return products.map(this.transformProduct)
    } catch (error) {
      console.error('Error loading products from Sanity:', error)
      throw error
    }
  }

  /**
   * Transforma un producto de Sanity al formato usado en la app
   * @param {Object} sanityProduct - Producto desde Sanity
   * @returns {Object} Producto transformado
   */
  static transformProduct(sanityProduct) {
    const {
      _id,
      nombre,
      descripcion,
      precio,
      imagen,
      categoria
    } = sanityProduct

    // Generar URL de imagen optimizada
    const imagenUrl = imagen ? urlFor(imagen) : null

    return {
      // ID único de Sanity
      id: _id,

      // Nombre del producto
      nombre: nombre || 'Sin nombre',

      // Precio con fallback a 'Consultar'
      precio: precio || 'Consultar',

      // Descripción
      descripcion: descripcion || '',

      // Categoría normalizada (minúsculas, sin tildes)
      // Ya viene normalizada desde Sanity
      categoria: categoria || 'natural',

      // URL de imagen optimizada
      imagenUrl: imagenUrl
    }
  }

  /**
   * Obtiene un producto por ID
   * @param {string} id - ID del producto
   * @returns {Promise<Object|null>} Producto o null
   */
  static async getProductById(id) {
    try {
      const query = `
        *[_type == "product" && _id == $id][0] {
          _id,
          nombre,
          descripcion,
          precio,
          imagen,
          categoria,
          disponible
        }
      `

      const product = await client.fetch(query, { id })

      if (!product) {
        return null
      }

      return this.transformProduct(product)
    } catch (error) {
      console.error('Error getting product by ID:', error)
      throw error
    }
  }

  /**
   * Obtiene productos por categoría
   * @param {string} categoria - Categoría a filtrar
   * @returns {Promise<Array>} Array de productos
   */
  static async getProductsByCategory(categoria) {
    try {
      const query = `
        *[_type == "product" && categoria == $categoria && disponible == true] | order(orden asc) {
          _id,
          nombre,
          descripcion,
          precio,
          imagen,
          categoria,
          orden
        }
      `

      const products = await client.fetch(query, { categoria })

      return products.map(this.transformProduct)
    } catch (error) {
      console.error('Error getting products by category:', error)
      throw error
    }
  }
}
