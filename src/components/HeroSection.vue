<template>
  <section id="inicio" class="hero">
    <div class="hero-content">
      <h2 class="hero-title">Hilos de Luz</h2>
      <p>Lámparas artesanales hechas a mano con amor y dedicación</p>
      <a href="#catalogo" class="btn-primary" @click.prevent="scrollToCatalog">
        Ver Catálogo
      </a>
    </div>
  </section>
</template>

<script setup>
import { useNavigation } from '../composables/useNavigation'

const { scrollToSection } = useNavigation()

const scrollToCatalog = () => {
  scrollToSection('#catalogo')
}
</script>

<style scoped>
/* Los estilos del hero ya están en styles.css global */
</style>
