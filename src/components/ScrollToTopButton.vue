<template>
  <Transition name="scroll-fade">
    <button
      v-if="showButton"
      @click="scrollToTop"
      class="scroll-to-top"
      aria-label="Volver arriba"
    >
      <i class="fas fa-arrow-up"></i>
    </button>
  </Transition>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const showButton = ref(false)

const handleScroll = () => {
  showButton.value = window.scrollY > 300
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
/* Los estilos del scroll-to-top ya están en styles.css global */

.scroll-fade-enter-active,
.scroll-fade-leave-active {
  transition: all 0.3s ease;
}

.scroll-fade-enter-from,
.scroll-fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
