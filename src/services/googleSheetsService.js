import { config } from '../config'

/**
 * Servicio para cargar y parsear productos desde Google Sheets
 */
export class GoogleSheetsService {
  /**
   * Carga los productos desde Google Sheets
   * @returns {Promise<Array>} Array de productos
   */
  static async loadProducts() {
    try {
      const response = await fetch(config.GOOGLE_SHEET_CSV_URL)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const csvText = await response.text()
      return this.parseCSV(csvText)
    } catch (error) {
      console.error('Error loading products from Google Sheets:', error)
      throw error
    }
  }

  /**
   * Parsea el CSV de Google Sheets a objetos de producto
   * @param {string} csv - Texto CSV
   * @returns {Array} Array de productos parseados
   */
  static parseCSV(csv) {
    const lines = csv.split('\n')
    const products = []

    // Omitir la primera línea (encabezados)
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim()
      if (!line) continue

      const values = this.parseCSVLine(line)

      // Formato esperado: Nombre, Precio, Descripción, Medidas, Categoría, URL Imagen
      if (values.length >= 6) {
        const product = this.createProduct(values)
        if (product) {
          products.push(product)
        }
      }
    }

    return products
  }

  /**
   * Parsea una línea de CSV teniendo en cuenta comillas
   * @param {string} line - Línea de CSV
   * @returns {Array} Array de valores
   */
  static parseCSVLine(line) {
    const values = []
    let currentValue = ''
    let insideQuotes = false

    for (let char of line) {
      if (char === '"') {
        insideQuotes = !insideQuotes
      } else if (char === ',' && !insideQuotes) {
        values.push(currentValue.replace(/^"|"$/g, '').trim())
        currentValue = ''
      } else {
        currentValue += char
      }
    }
    values.push(currentValue.replace(/^"|"$/g, '').trim())

    return values
  }

  /**
   * Crea un objeto producto desde los valores del CSV
   * @param {Array} values - Valores del CSV
   * @returns {Object|null} Objeto producto o null si es inválido
   */
  static createProduct(values) {
    const [nombre, precio, descripcion, medidas, categoria, imagenUrl] = values

    if (!nombre || !categoria) {
      return null
    }

    // Combinar descripción y medidas
    const descripcionCompleta = descripcion
      ? `${descripcion} - ${medidas}`
      : medidas

    // Procesar URL de imagen
    let finalImagenUrl = imagenUrl

    // Si no es una URL completa, asumimos que está en resources/
    if (finalImagenUrl && !finalImagenUrl.startsWith('http')) {
      finalImagenUrl = `/resources/${finalImagenUrl}`
    }

    return {
      id: `${nombre.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`,
      nombre: nombre,
      precio: precio || 'Consultar',
      descripcion: descripcionCompleta,
      categoria: this.normalizeCategory(categoria),
      imagenUrl: finalImagenUrl
    }
  }

  /**
   * Normaliza la categoría (minúsculas, sin tildes)
   * @param {string} categoria - Categoría original
   * @returns {string} Categoría normalizada
   */
  static normalizeCategory(categoria) {
    return categoria
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
  }
}
