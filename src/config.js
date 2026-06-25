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
  // Sanity CMS
  // MODIFICADO: Reemplazadas variables de Google Sheets por Sanity
  SANITY_PROJECT_ID: import.meta.env.VITE_SANITY_PROJECT_ID,
  SANITY_DATASET: import.meta.env.VITE_SANITY_DATASET || 'production',
  SANITY_API_VERSION: import.meta.env.VITE_SANITY_API_VERSION || '2024-01-01',

  // WhatsApp
  WHATSAPP_NUMBER: import.meta.env.VITE_WHATSAPP_NUMBER,

  // Redes Sociales
  SOCIAL_MEDIA: {
    instagram: import.meta.env.VITE_INSTAGRAM_URL,
    facebook: import.meta.env.VITE_FACEBOOK_URL,
    whatsapp: `https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER}`
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
// MODIFICADO: Actualizadas variables requeridas (Sanity en vez de Google Sheets)
if (import.meta.env.DEV) {
  const requiredVars = [
    'VITE_SANITY_PROJECT_ID',
    'VITE_SANITY_DATASET',
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
