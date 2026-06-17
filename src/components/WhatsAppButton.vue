<template>
  <a
    :href="whatsappUrl"
    target="_blank"
    class="whatsapp-float"
    aria-label="Contactar por WhatsApp"
  >
    <i class="fab fa-whatsapp"></i>
  </a>
</template>

<script setup>
import { computed } from 'vue'
import { config } from '../config'

const whatsappUrl = computed(() => `https://wa.me/${config.WHATSAPP_NUMBER}`)
</script>

<style scoped>
/* Los estilos del whatsapp-float ya están en styles.css global */
</style>
