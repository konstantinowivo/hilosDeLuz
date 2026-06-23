import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './schemas'

/**
 * Configuración de Sanity Studio - Hilos de Luz
 *
 * Este es el panel de administración del catálogo de productos.
 * Configuración simplificada y amigable para la clienta.
 *
 * Para iniciar el Studio:
 * npm run sanity:dev → Abre en http://localhost:3333
 *
 * Para publicar el Studio:
 * npm run sanity:deploy
 */

export default defineConfig({
  name: 'default',
  title: 'Hilos de Luz - Catálogo',

  // Configuración del proyecto
  projectId: '5h1fblp5',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Contenido')
          .items([
            // Solo mostrar "Productos" en el menú principal
            S.listItem()
              .title('Productos')
              .icon(() => '🏮')
              .child(
                S.documentTypeList('product')
                  .title('Productos')
                  .defaultOrdering([{ field: 'orden', direction: 'asc' }])
              ),
          ]),
    }),
  ],

  schema: {
    types: schemaTypes,
  },

  // Configuración de la interfaz
  document: {
    // Ocultar botones innecesarios para la clienta
    productionUrl: async (prev, context) => {
      // Aquí podrías agregar una URL de preview del producto
      return prev
    },
  },
})
