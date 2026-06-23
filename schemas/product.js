/**
 * Schema de Producto - Hilos de Luz
 *
 * Schema optimizado para una clienta no técnica.
 * Administrado desde Sanity Studio (interfaz React interna del CMS).
 *
 * Campos:
 * - nombre: Nombre del producto
 * - descripcion: Descripción detallada
 * - imagen: Foto del producto (con hotspot para enfoque)
 * - categoria: Tipo de lámpara (simple string, sin referencias)
 * - disponible: Si se muestra en el sitio o no
 * - orden: Posición en el catálogo (número)
 * - whatsappMessage: Mensaje personalizado para WhatsApp (opcional)
 */

export default {
  name: 'product',
  title: 'Producto',
  type: 'document',

  // Icono para el tipo de documento en Sanity Studio
  icon: () => '🏮',

  fields: [
    // ========================================
    // 1. NOMBRE
    // ========================================
    {
      name: 'nombre',
      title: 'Nombre del Producto',
      type: 'string',
      description: 'Ej: Lámpara Brisa, Lámpara Equilibrio',
      placeholder: 'Ej: Lámpara Brisa',
      validation: Rule => Rule.required().error('⚠️ El nombre es obligatorio')
    },

    // ========================================
    // 2. DESCRIPCIÓN
    // ========================================
    {
      name: 'descripcion',
      title: 'Descripción',
      type: 'text',
      rows: 4,
      description: 'Describe el producto: materiales, tamaño, características',
      placeholder: 'Ej: Lámpara artesanal de 40cm x 30cm, hecha con papel kraft...',
      validation: Rule => Rule.required().error('⚠️ La descripción es obligatoria')
    },

    // ========================================
    // 3. IMAGEN
    // ========================================
    {
      name: 'imagen',
      title: 'Foto del Producto',
      type: 'image',
      description: '📸 Sube una foto clara del producto. Puedes ajustar el punto focal con el círculo azul.',
      options: {
        hotspot: true, // Permite seleccionar el área importante de la imagen
        accept: 'image/*' // Acepta todos los formatos de imagen
      },
      validation: Rule => Rule.required().error('⚠️ La foto es obligatoria')
    },

    // ========================================
    // 4. CATEGORÍA
    // ========================================
    {
      name: 'categoria',
      title: 'Categoría',
      type: 'string',
      description: '🏷️ Tipo de lámpara según su estilo',
      options: {
        list: [
          { title: '🌙 Calma', value: 'calma' },
          { title: '🌿 Natural', value: 'natural' },
          { title: '♻️ Ecológica', value: 'ecologica' }
        ],
        layout: 'radio' // Muestra como opciones de radio (más visual)
      },
      validation: Rule => Rule.required().error('⚠️ Selecciona una categoría')
    },

    // ========================================
    // 5. DISPONIBLE
    // ========================================
    {
      name: 'disponible',
      title: 'Mostrar en el Catálogo',
      type: 'boolean',
      description: '👁️ Si está ACTIVADO, el producto se verá en el sitio web. Si está DESACTIVADO, estará oculto.',
      initialValue: true // Por defecto, los productos están visibles
    },

    // ========================================
    // 6. ORDEN
    // ========================================
    {
      name: 'orden',
      title: 'Posición en el Catálogo',
      type: 'number',
      description: '🔢 Número que define el orden. Menor número = aparece primero (Ej: 1, 2, 3...)',
      placeholder: 'Ej: 1',
      validation: Rule => Rule.integer().min(1).error('⚠️ Debe ser un número entero mayor a 0'),
      initialValue: 100 // Por defecto, nuevos productos van al final
    },

    // ========================================
    // 7. MENSAJE DE WHATSAPP (Opcional)
    // ========================================
    {
      name: 'whatsappMessage',
      title: 'Mensaje Personalizado de WhatsApp (Opcional)',
      type: 'string',
      description: '💬 Mensaje que se enviará al hacer clic en "Consultar por WhatsApp". Si lo dejas vacío, se usará un mensaje genérico.',
      placeholder: 'Ej: Hola! Me interesa la Lámpara Brisa. ¿Está disponible?',
      // Este campo es opcional, no lleva validación required
    }
  ],

  // ========================================
  // VISTA PREVIA EN SANITY STUDIO
  // ========================================
  preview: {
    select: {
      title: 'nombre',
      subtitle: 'categoria',
      media: 'imagen',
      disponible: 'disponible',
      orden: 'orden'
    },
    prepare(selection) {
      const { title, subtitle, media, disponible, orden } = selection

      // Formatear la categoría con emoji
      let categoriaFormatted = 'Sin categoría'
      if (subtitle === 'calma') categoriaFormatted = '🌙 Calma'
      if (subtitle === 'natural') categoriaFormatted = '🌿 Natural'
      if (subtitle === 'ecologica') categoriaFormatted = '♻️ Ecológica'

      return {
        title: `${orden ? `#${orden} - ` : ''}${title}`,
        subtitle: `${categoriaFormatted}${!disponible ? ' (Oculto)' : ''}`,
        media: media
      }
    }
  },

  // ========================================
  // OPCIONES DE ORDENAMIENTO EN STUDIO
  // ========================================
  orderings: [
    {
      title: 'Posición en catálogo (1, 2, 3...)',
      name: 'ordenAsc',
      by: [
        { field: 'orden', direction: 'asc' }
      ]
    },
    {
      title: 'Nombre (A-Z)',
      name: 'nombreAsc',
      by: [
        { field: 'nombre', direction: 'asc' }
      ]
    },
    {
      title: 'Categoría',
      name: 'categoriaAsc',
      by: [
        { field: 'categoria', direction: 'asc' }
      ]
    }
  ]
}
