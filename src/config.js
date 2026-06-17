// ============================================
// CONFIGURACIÓN - Variables de Entorno
// ============================================

/**
 * Configuración centralizada de la aplicación.
 * Los valores se cargan desde el archivo .env
 *
 * Para actualizar la configuración:
 * 1. Edita el archivo .env en la raíz del proyecto
 * 2. Reinicia el servidor de desarrollo (npm run dev)
 *
 * IMPORTANTE: Las variables de entorno en Vite deben tener el prefijo VITE_
 */

export const config = {
  // Google Sheets
  GOOGLE_SHEET_ID: import.meta.env.VITE_GOOGLE_SHEET_ID,
  GOOGLE_SHEET_NAME: import.meta.env.VITE_GOOGLE_SHEET_NAME || 'Productos',
  GOOGLE_SHEET_CSV_URL: import.meta.env.VITE_GOOGLE_SHEET_CSV_URL,

  // WhatsApp
  WHATSAPP_NUMBER: import.meta.env.VITE_WHATSAPP_NUMBER,

  // Redes Sociales
  SOCIAL_MEDIA: {
    instagram: import.meta.env.VITE_INSTAGRAM_URL,
    facebook: import.meta.env.VITE_FACEBOOK_URL
  },

  // Categorías de productos (constantes, no necesitan estar en .env)
  CATEGORIES: {
    ALL: 'all',
    CALMA: 'calma',
    NATURAL: 'natural',
    ECOLOGICA: 'ecologica'
  },

  // Contacto
  CONTACT_EMAIL: import.meta.env.VITE_CONTACT_EMAIL
}

// Validación en desarrollo: avisar si faltan variables de entorno
if (import.meta.env.DEV) {
  const requiredVars = [
    'VITE_GOOGLE_SHEET_ID',
    'VITE_GOOGLE_SHEET_CSV_URL',
    'VITE_WHATSAPP_NUMBER',
    'VITE_INSTAGRAM_URL',
    'VITE_FACEBOOK_URL',
    'VITE_CONTACT_EMAIL'
  ]

  const missing = requiredVars.filter(varName => !import.meta.env[varName])

  if (missing.length > 0) {
    console.warn('⚠️ Variables de entorno faltantes:', missing)
    console.warn('Copia .env.example a .env y completa los valores')
  }
}
