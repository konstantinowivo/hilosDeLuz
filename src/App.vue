<template>
  <div id="app">
    <AppHeader />
    <HeroSection />
    <ProductCatalog />
    <AboutSection />
    <ContactSection />
    <AppFooter />
    <WhatsAppButton />
    <ScrollToTopButton />
    <Lightbox />
  </div>
</template>

<script setup>
import AppHeader from './components/AppHeader.vue'
import HeroSection from './components/HeroSection.vue'
import ProductCatalog from './components/ProductCatalog.vue'
import AboutSection from './components/AboutSection.vue'
import ContactSection from './components/ContactSection.vue'
import AppFooter from './components/AppFooter.vue'
import WhatsAppButton from './components/WhatsAppButton.vue'
import ScrollToTopButton from './components/ScrollToTopButton.vue'
import Lightbox from './components/Lightbox.vue'
</script>

<style scoped>
/* App-specific styles if needed */
</style>
