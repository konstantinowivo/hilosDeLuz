<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-section">
          <h3>Hilos de Luz</h3>
          <p>Iluminando espacios, creando experiencias</p>
        </div>
        <div class="footer-section">
          <h4>Enlaces</h4>
          <ul>
            <li><a href="#inicio" @click.prevent="scrollToSection('#inicio')">Inicio</a></li>
            <li><a href="#catalogo" @click.prevent="scrollToSection('#catalogo')">Catálogo</a></li>
            <li><a href="#sobre-nosotros" @click.prevent="scrollToSection('#sobre-nosotros')">Nosotros</a></li>
            <li><a href="#contacto" @click.prevent="scrollToSection('#contacto')">Contacto</a></li>
          </ul>
        </div>
        <div class="footer-section">
          <h4>Síguenos</h4>
          <div class="social-links">
            <a :href="socialMedia.instagram" target="_blank" class="social-icon" aria-label="Instagram">
              <i class="fab fa-instagram"></i>
            </a>
            <a :href="socialMedia.facebook" target="_blank" class="social-icon" aria-label="Facebook">
              <i class="fab fa-facebook-f"></i>
            </a>
            <a :href="socialMedia.whatsapp" target="_blank" class="social-icon" aria-label="WhatsApp">
              <i class="fab fa-whatsapp"></i>
            </a>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; {{ currentYear }} Hilos de Luz. Todos los derechos reservados.</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue'
import { useNavigation } from '../composables/useNavigation'
import { config } from '../config'

const { scrollToSection } = useNavigation()
const socialMedia = config.SOCIAL_MEDIA

const currentYear = computed(() => new Date().getFullYear())
</script>

<style scoped>
/* Los estilos del footer ya están en styles.css global */
</style>
