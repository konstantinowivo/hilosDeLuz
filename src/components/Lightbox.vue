<template>
  <Teleport to="body">
    <Transition name="lightbox-fade">
      <div
        v-if="isOpen"
        id="lightbox"
        class="lightbox active"
        @click="handleBackdropClick"
      >
        <span class="lightbox-close" @click="close">&times;</span>
        <img
          class="lightbox-content"
          :src="currentImage"
          :alt="currentCaption"
        >
        <div class="lightbox-caption">{{ currentCaption }}</div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { provide } from 'vue'
import { useLightbox } from '../composables/useLightbox'

const { isOpen, currentImage, currentCaption, open, close } = useLightbox()

const handleBackdropClick = (e) => {
  if (e.target.classList.contains('lightbox') || e.target.classList.contains('lightbox-close')) {
    close()
  }
}

// Proveer la función open a todos los componentes hijos
provide('openLightbox', open)
</script>

<style scoped>
/* Animación de fade para el lightbox */
.lightbox-fade-enter-active,
.lightbox-fade-leave-active {
  transition: opacity 0.3s ease;
}

.lightbox-fade-enter-from,
.lightbox-fade-leave-to {
  opacity: 0;
}

/* Los estilos del lightbox ya están en styles.css global */
</style>
