import { ref } from 'vue'

/**
 * Composable para manejar la navegación y el menú móvil
 */
export function useNavigation() {
  const isMenuOpen = ref(false)

  /**
   * Toggle del menú hamburguesa
   */
  const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value
  }

  /**
   * Cierra el menú
   */
  const closeMenu = () => {
    isMenuOpen.value = false
  }

  /**
   * Scroll suave a una sección
   */
  const scrollToSection = (sectionId) => {
    const target = document.querySelector(sectionId)
    if (target) {
      const headerOffset = 70
      const elementPosition = target.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
    closeMenu()
  }

  return {
    isMenuOpen,
    toggleMenu,
    closeMenu,
    scrollToSection
  }
}
