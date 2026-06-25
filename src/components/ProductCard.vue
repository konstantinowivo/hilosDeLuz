<template>
  <div class="product-card" :data-category="product.categoria">
    <div class="product-image" @click="handleImageClick">
      <img
        :src="product.imagenUrl"
        :alt="`Lámpara artesanal ${product.nombre} - ${product.categoria}`"
        loading="lazy"
      >
    </div>
    <div class="product-info">
      <h3>{{ product.nombre }}</h3>
      <p class="product-description">{{ product.descripcion }}</p>
      <button
        class="btn-secondary btn-consultar"
        @click="handleConsultar"
      >
        Consultar
      </button>
    </div>
  </div>
</template>

<script setup>
import { inject } from 'vue'
import { config } from '../config'

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

// Inyectar la función para abrir el lightbox
const openLightbox = inject('openLightbox')

const handleImageClick = () => {
  if (openLightbox) {
    openLightbox(props.product.imagenUrl, props.product.nombre)
  }
}

const handleConsultar = () => {
  const message = `Hola! Me interesa consultar por *${props.product.nombre}*. ¿Podrías darme más información? Gracias!`
  const encodedMessage = encodeURIComponent(message)
  const whatsappUrl = `https://wa.me/${config.WHATSAPP_NUMBER}?text=${encodedMessage}`
  window.open(whatsappUrl, '_blank')
}
</script>

<style scoped>
/* Los estilos de product-card ya están en styles.css global */
</style>
