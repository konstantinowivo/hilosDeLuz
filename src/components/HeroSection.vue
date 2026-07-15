<template>
  <section id="inicio" class="hero" :style="{ backgroundImage: heroBackgroundImage }">
    <div class="hero-content">
      <h1 class="hero-title">Hilos de Luz</h1>
      <p>Lámparas artesanales hechas a mano con amor y dedicación</p>
      <a href="#catalogo" class="btn-primary" @click.prevent="scrollToCatalog">
        Ver Catálogo
      </a>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useNavigation } from '../composables/useNavigation'
import heroDesktop from '/resources/hero.png'
import heroMobile from '/resources/taller_hilos.png'

const { scrollToSection } = useNavigation()

const scrollToCatalog = () => {
  scrollToSection('#catalogo')
}

// Reactive window width
const windowWidth = ref(window.innerWidth)

// Update window width on resize
const updateWidth = () => {
  windowWidth.value = window.innerWidth
}

onMounted(() => {
  window.addEventListener('resize', updateWidth)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateWidth)
})

// Computed property for responsive background image
const heroBackgroundImage = computed(() => {
  const isMobile = windowWidth.value <= 768
  const imageUrl = isMobile ? heroMobile : heroDesktop
  return `url('${imageUrl}')`
})
</script>

<style scoped>
/* Los estilos del hero ya están en styles.css global */
</style>
