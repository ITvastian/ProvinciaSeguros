<script setup>
import { Nav, Alert, Footer } from "@/components";
import Carousel from './components/Carousel.vue';
import { useAuthStore } from "@/stores";
import { useRoute } from "vue-router";

const authStore = useAuthStore();
const route = useRoute();

const hideCarouselRoutes = ["/account/login", "/account/register"];
</script>

<template>
  <div class="app-container">
    <!-- Componente de navegación -->
    <Nav class="nav-bar" />
    
    <!-- Componente de alerta (muestra mensajes de alerta) -->
    <Alert />
    
    <!-- Muestra el carrusel solo si la ruta actual no está en la lista de rutas para ocultarlo -->
    <Carousel v-if="!hideCarouselRoutes.includes(route.path)" />
    
    <!-- Contenedor principal para el contenido de la aplicación -->
    <div class="container pt-5 pb-4" id="container-app">
      <!-- El contenido dinámico de la ruta actual se renderiza aquí -->
      <router-view />
    </div>
    
    <!-- Componente de pie de página -->
    <Footer />
  </div>
</template>

<style>
@import "@/assets/base.css";
</style>
