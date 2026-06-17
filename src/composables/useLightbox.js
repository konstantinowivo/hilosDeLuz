import { ref, onMounted, onUnmounted } from 'vue'

/**
 * Composable para manejar el lightbox de imágenes
 */
export function useLightbox() {
  const isOpen = ref(false)
  const currentImage = ref('')
  const currentCaption = ref('')

  /**
   * Abre el lightbox con una imagen
   */
  const open = (imageSrc, caption = '') => {
    currentImage.value = imageSrc
    currentCaption.value = caption
    isOpen.value = true
    document.body.style.overflow = 'hidden'
  }

  /**
   * Cierra el lightbox
   */
  const close = () => {
    isOpen.value = false
    currentImage.value = ''
    currentCaption.value = ''
    document.body.style.overflow = 'auto'
  }

  /**
   * Maneja la tecla Escape para cerrar
   */
  const handleKeydown = (e) => {
    if (e.key === 'Escape' && isOpen.value) {
      close()
    }
  }

  // Agregar listener de teclado cuando se monta
  onMounted(() => {
    document.addEventListener('keydown', handleKeydown)
  })

  // Remover listener cuando se desmonta
  onUnmounted(() => {
    document.removeEventListener('keydown', handleKeydown)
    document.body.style.overflow = 'auto' // Asegurar que el scroll se restaure
  })

  return {
    isOpen,
    currentImage,
    currentCaption,
    open,
    close
  }
}
