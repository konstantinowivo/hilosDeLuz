<template>
  <header class="header">
    <nav class="navbar">
      <div class="container">
        <div class="logo">
          <h1>Hilos de Luz</h1>
        </div>

        <ul class="nav-menu" :class="{ active: isMenuOpen }">
          <li><a href="#inicio" @click.prevent="scrollToSection('#inicio')">Inicio</a></li>
          <li><a href="#catalogo" @click.prevent="scrollToSection('#catalogo')">Catálogo</a></li>
          <li><a href="#sobre-nosotros" @click.prevent="scrollToSection('#sobre-nosotros')">Nosotros</a></li>
          <li><a href="#contacto" @click.prevent="scrollToSection('#contacto')">Contacto</a></li>
        </ul>

        <div class="nav-social">
          <a
            :href="socialMedia.instagram"
            target="_blank"
            aria-label="Instagram"
            class="social-icon"
          >
            <i class="fab fa-instagram"></i>
          </a>
          <a
            :href="socialMedia.facebook"
            target="_blank"
            aria-label="Facebook"
            class="social-icon"
          >
            <i class="fab fa-facebook-f"></i>
          </a>
        </div>

        <div
          class="hamburger"
          :class="{ active: isMenuOpen }"
          @click="toggleMenu"
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'
import { useNavigation } from '../composables/useNavigation'
import { config } from '../config'

const { isMenuOpen, toggleMenu, scrollToSection } = useNavigation()
const socialMedia = config.SOCIAL_MEDIA

// Cambiar estilo del header al hacer scroll
const handleScroll = () => {
  const header = document.querySelector('.header')
  if (header) {
    if (window.scrollY > 100) {
      header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)'
    } else {
      header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)'
    }
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
/* Los estilos del header ya están en styles.css global */
</style>
