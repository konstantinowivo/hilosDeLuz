<template>
  <section id="contacto" class="contact">
    <div class="container">
      <h2 class="section-title">Contáctanos</h2>
      <p class="section-subtitle">¿Tienes alguna pregunta? ¡Escríbenos!</p>

      <div class="contact-content">
        <div class="contact-info">
          <div class="info-item">
            <h4>📧 Email</h4>
            <p>{{ contactEmail }}</p>
          </div>
        </div>

        <form class="contact-form" @submit.prevent="handleSubmit">
          <input
            v-model="formData.nombre"
            type="text"
            placeholder="Nombre"
            required
          >
          <input
            v-model="formData.email"
            type="email"
            placeholder="Email"
            required
          >
          <input
            v-model="formData.telefono"
            type="tel"
            placeholder="Teléfono"
          >
          <textarea
            v-model="formData.mensaje"
            placeholder="Mensaje"
            rows="5"
            required
          ></textarea>
          <button type="submit" class="btn-primary">Enviar Mensaje</button>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup>
import { reactive } from 'vue'
import { config } from '../config'

const contactEmail = config.CONTACT_EMAIL

const formData = reactive({
  nombre: '',
  email: '',
  telefono: '',
  mensaje: ''
})

const handleSubmit = () => {
  alert('Gracias por tu mensaje. Te contactaremos pronto!')
  // Reset form
  formData.nombre = ''
  formData.email = ''
  formData.telefono = ''
  formData.mensaje = ''
}
</script>

<style scoped>
/* Los estilos de contact ya están en styles.css global */
</style>
