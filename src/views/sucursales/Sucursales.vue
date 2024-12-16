<template>
  <div class="card text-center m-3 p-3 mt-5" id="container-sucursales">
    <div v-if="errorMessage" class="error-message">
      <p>{{ errorMessage }}</p>
    </div>
    <div v-else>
      <div>
        <h5 class="card-header">Sedes</h5>
        <ul>
          <p>Conoce nuestras sedes:</p>
          <div v-for="province in filteredSucursales" :key="province.id">
            {{ province.nombre }}
          </div>
        </ul>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref, onMounted } from "vue";

//Estados
const filteredSucursales = ref([]);
const errorMessage = ref(null);

// fetching de datos
onMounted(async () => {
  try {
    const response = await fetch(
      "https://apis.datos.gob.ar/georef/api/provincias"
    );
    const data = await response.json();
    const selectedProvinces = [
      "Neuquén",
      "Buenos Aires",
      "Tierra del Fuego, Antártida e Islas del Atlántico Sur",
      "Córdoba",
      "Misiones",
      "Santa Fe",
    ];

    filteredSucursales.value = data.provincias.filter((province) =>
      selectedProvinces.includes(province.nombre)
    );
    //manejo de errores
  } catch (error) {
    errorMessage.value = "Hubo un error consiguiendo los recursos";
    console.error("There was an error fetching resources", error);
  }
});
</script>

<style>
#container-sucursales {
  font-family: "Encode-SANS";
  bottom: 33rem;
  z-index: 9;
  width: 60%;
  left: 19%;
}
ul {
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0;
}
.error-message {
  color: red;
  font-size: 1.2rem;
}
@media screen and (max-width: 1200px) {
  #container-sucursales {
    bottom: 25rem;
  }
}

@media screen and (max-width: 992px) {
  #container-sucursales {
    bottom: 20rem;
  }
}

@media screen and (max-width: 768px) {
  #container-sucursales {
    bottom: 5rem;
  }
}
</style>