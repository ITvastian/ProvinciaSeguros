<script setup>
// Importaciones necesarias
import { storeToRefs } from "pinia";
import { useUsersStore } from "@/stores";

// iniciando store y referencias reactivas
const usersStore = useUsersStore();
const { users } = storeToRefs(usersStore);

// Carga de usuarios
usersStore.getAll();

// Delete user
async function deleteUser(userId) {
  try {
    await usersStore.delete(userId);
  } catch (error) {
    console.error("No es posible borrar el usuario:", error);
  }
}
</script>

<template>
  <h1>Usuarios</h1>

  <!-- Nuevo usuario -->
  <router-link to="/users/add" class="btn btn-sm btn-success mb-2"
    >Nuevo usuario</router-link
  >

  <!-- Tabla de usuarios -->
  <table class="table table-striped">
    <thead>
      <tr>
        <th style="width: 30%">Nombre</th>
        <th style="width: 30%">Apellido</th>
        <th style="width: 30%">Nombre de usuario</th>
        <th style="width: 10%"></th>
      </tr>
    </thead>
    <tbody>
      <!-- Mostrar usuarios si existen -->
      <template v-if="users.length">
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.firstName }}</td>
          <td>{{ user.lastName }}</td>
          <td>{{ user.username }}</td>
          <td style="white-space: nowrap">
            <!-- Enlace para editar usuario -->
            <router-link
              :to="`/users/edit/${user.id}`"
              class="btn btn-sm btn-user mr-1"
              >Editar</router-link
            >

            <!-- Botón para eliminar usuario -->
            <button
              @click="deleteUser(user.id)"
              class="btn btn-sm btn-danger btn-delete-user"
              :disabled="user.isDeleting"
            >
              <span>Borrar</span>
            </button>
          </td>
        </tr>
      </template>

      <!-- Mensaje de error -->
      <tr v-if="users.error">
        <td colspan="4">
          <div class="text-danger">
            Error cargando usuarios: {{ users.error }}
          </div>
        </td>
      </tr>
      <!-- Indicador de carga -->
      <tr v-if="users.loading">
        <td colspan="4" class="text-center">
          <span class="spinner-border spinner-border-lg align-center"></span>
        </td>
      </tr>
    </tbody>
  </table>
</template>
