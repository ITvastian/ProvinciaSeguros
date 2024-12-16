<script setup>
// Importando hooks y store
import { useAuthStore } from "@/stores";
import { computed, ref } from "vue";

// Obtenemos el store
const authStore = useAuthStore();

// propiedad computada que obtiene datos del usuario
const user = computed(() => authStore.user);

// func cerrar sesión, llama al método logout del store
const logout = () => {
  authStore.logout();
};

// Con ref gestionamos el estado reactivo del menu.
const isMenuOpen = ref(false);

// funcion para abrir y cerrar el menu
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};
</script>

<template>
  <!-- contenedor se muestra si user esta autenticado -->
  <nav v-show="user">
    <div class="header">
      <div class="logo-container">
        <router-link to="/" class="link">
          <img
            class="logo"
            src="/p-seguros-logo.jpg"
            alt="Provincia Seguros Logo"
          />
        </router-link>
      </div>

      <button class="hamburger" @click="toggleMenu">☰</button>
      <div :class="['nav-items', { open: isMenuOpen }]">
        <router-link to="/" class="link">
          <div class="header-item">Inicio</div>
        </router-link>
        <router-link to="/" class="link">
          <div class="header-item">Seguros Personas</div>
        </router-link>
        <router-link to="/" class="link">
          <div class="header-item">Seguros Empresas</div>
        </router-link>
        <router-link to="/" class="link">
          <div class="header-item">Proveedoras/es</div>
        </router-link>
        <router-link to="/sucursales" class="link header-item">
          Nuestras Sedes
        </router-link>

        <!-- Si el usuario está autenticado, muestra el nombre del usuario -->
        <div v-if="user" id="container-user" class="user-info">
          <h1 class="login-user header-item">
            <i class="fa fa-user m-1" aria-hidden="true"></i>
            <span class="user-name">{{ user.firstName + "!" }}</span>
          </h1>
        </div>
        <button @click="logout" class="btn-logout header-item">Salir</button>
      </div>
    </div>
  </nav>
</template>



<style>
button:focus,
.link:focus {
  outline: none;
}
.home-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

#container-user {
  text-align: center;
  font-family: "Encode Sans", sans-serif;
}

.login-user {
  color: #333;
  font-size: 15px;
  margin: inherit;
  display: flex;
  align-items: center;
}
.login-user:hover {
  color: #3b5998;
}

.user-name {
  margin-left: 3px;
  display: flex;
  align-items: center;
  font-size: 20px;
  color: #002f87;
  font-weight: bold;
}

nav {
  font-size: 15px;
}

.container-nav {
  display: block;
  float: right;
  height: 100%;
}

.header {
  padding-inline: 90px;
  min-height: 70px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  color: black;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
  width: 100%;
  height: 70px;
}

.logo-container {
  flex-shrink: 0;
}

.logo {
  width: 130px;
  height: auto;
}

.link {
  font-family: "Encode Sans", sans-serif;
  color: black;
  text-decoration: none;
}

.link:hover {
  text-decoration: none;
}
button.btn-logout {
  padding: none !important;
}
.btn-logout {
  font-family: "Encode Sans", sans-serif;
  background-color: transparent;
  border: none;
  font-size: 16px;
}

.btn-logout:hover {
  color: #3b5998;
}

.hamburger {
  display: none;
  font-size: 24px;
  background: none;
  border: none;
  cursor: pointer;
}

.nav-items {
  padding-inline: 15px;
  display: flex;
  align-items: center;
  gap: 15px;
}

.nav-items.open {
  display: flex;
}

.header-item:hover {
  color: #3b5998;
}

@media (max-width: 900px) {
  .nav-items {
    gap: 7px;
  }
}
@media (max-width: 800px) {
  .header {
    font-size: 15px;
  }

  .logo {
    width: 100px;
    height: 100px;
  }

  .hamburger {
    display: block;
  }

  .nav-items {
    flex-direction: column;
    position: absolute;
    top: 70px;
    right: 0;
    background: white;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
    width: 100%;
    display: none;
    padding: 10px;
  }

  .nav-items.open {
    display: flex;
    width: 100%;
    align-items: flex-start;
  }

  .header-item {
    width: 100%;
  }
  .btn-logout {
    border-top: 1px solid;
  }
}
</style>