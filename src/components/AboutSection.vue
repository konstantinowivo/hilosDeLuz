<template>
  <section id="sobre-nosotros" class="about">
    <div class="container">
      <h2 class="section-title">Sobre Nosotros</h2>
      <div class="about-content">
        <div class="about-text" :class="{ 'collapsed': !isExpanded }">
          <p>
            Siempre me gustó crear con mis manos. Hay algo en el proceso de construir,
            de dar forma, que conecta con lo más profundo de uno. Durante un tiempo,
            ese camino quedó en pausa… hasta agosto de 2025.
          </p>
          <p>
            Ese mes marcó un antes y un después. Una invitación simple —aprender a hacer
            una lámpara— despertó algo que estaba dormido. Empecé con un gran desafío:
            una estructura de medio globo de 50 x 60 cm. Al comprarla, el vendedor me dijo:
            "Veo que te gustan los desafíos". Sonreí. Sabía que tenía razón.
          </p>
          <p>
            Cada lazada fue más que una técnica: fue un proceso. Tejer y destejer, intentar
            una y otra vez hasta que salga bien. Como en la vida. Cuando finalmente vi la
            lámpara terminada, entendí que no era solo un objeto. Era una emoción. Y esa
            emoción podía llegar a otros hogares.
          </p>
          <p>
            Así nace Hilos de Luz.<br>
            Desde un "sí" a crear, a sanar y a empezar de nuevo.
          </p>
          <p>
            Cada lámpara es única, porque no es producción en serie: es tiempo, dedicación
            y una historia detrás. Es llevar a tu espacio una pieza hecha a mano, con
            intención y con alma.
          </p>
          <p>
            Si alguna vez creaste algo propio, lo sabés: no es solo un producto. Es una
            parte de vos.
          </p>
          <p>Y eso es exactamente lo que buscamos que llegue a tu hogar.</p>
          <p><em>Gladys</em></p>
        </div>
        <button class="btn-ver-mas" @click="toggleExpanded">
          {{ isExpanded ? 'Ver menos' : 'Ver más' }}
        </button>
        <div class="about-image">
          <img src="/resources/AboutUs_hilos.png" alt="Gladys de Hilos de Luz creando lámparas artesanales en su taller">
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const isExpanded = ref(false)

const toggleExpanded = () => {
  isExpanded.value = !isExpanded.value
}
</script>

<style scoped>
/* Botón "Ver más" - Solo visible en móvil */
.btn-ver-mas {
  display: none;
  background-color: var(--primary-color);
  color: var(--white);
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  margin: 1rem auto;
  transition: var(--transition);
}

.btn-ver-mas:hover {
  background-color: var(--secondary-color);
  transform: translateY(-2px);
}

/* Estilos para móvil */
@media (max-width: 768px) {
  .btn-ver-mas {
    display: block;
  }

  .about-text.collapsed {
    max-height: 300px;
    overflow: hidden;
    position: relative;
  }

  .about-text.collapsed::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 100px;
    background: linear-gradient(transparent, #faf8f5);
  }

  .about-text {
    transition: max-height 0.5s ease;
  }
}
</style>
