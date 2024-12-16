<script setup>
// Importando storeToRefs desde Pinia
import { storeToRefs } from 'pinia';

// Importanto store desde stores
import { useAlertStore } from '@/stores';

// iniciamos el store de alertas usando Pinia. De esta manera podemos interactuar con el estado global de alertas
const alertStore = useAlertStore();

// Usamos storeToRefs para hacer que los valores del store sean reactivos. Esto nos permite acceder a alert de manera reactiva.
const { alert } = storeToRefs(alertStore);
</script>

<template>
    <!-- Usamos una condicional para mostrar el alerta -->
    <div v-if="alert" class="container">
        <div class="m-3">
            <div class="alert alert-dismissable" :class="alert.type">
                <!-- boton para cerrar la alerta con el metodo clear del store -->
                <button @click="alertStore.clear()" class="btn btn-link close">&times;</button>
                <!-- mostrando msj de alerta que viene del store -->
                {{alert.message}}
            </div>
        </div>
    </div>
</template>