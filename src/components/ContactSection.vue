<template>
  <section id="contacto" class="contact">
    <div class="container">
      <h2 class="section-title">Contáctanos</h2>
      <p class="section-subtitle">¿Tenés alguna consulta? ¡Escribinos!</p>

      <div class="contact-content">
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
  // Construir el asunto y cuerpo del correo
  const asunto = encodeURIComponent(`Consulta de ${formData.nombre}`)
  const cuerpo = encodeURIComponent(
    `Nombre: ${formData.nombre}\n` +
    `Email: ${formData.email}\n` +
    `Teléfono: ${formData.telefono || 'No proporcionado'}\n\n` +
    `Mensaje:\n${formData.mensaje}`
  )

  // Abrir el cliente de correo con los datos prellenados
  window.location.href = `mailto:${contactEmail}?subject=${asunto}&body=${cuerpo}`

  // Reset form después de un breve delay
  setTimeout(() => {
    formData.nombre = ''
    formData.email = ''
    formData.telefono = ''
    formData.mensaje = ''
  }, 500)
}
</script>

<style scoped>
/* Los estilos de contact ya están en styles.css global */
</style>
