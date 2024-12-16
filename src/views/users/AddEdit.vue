<script setup>
// Importando dependencias y librerías
import { Form, Field } from "vee-validate";
import * as Yup from "yup";
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";

// Importando stores de usuarios y alertas
import { useUsersStore, useAlertStore } from "@/stores";
import { router } from "@/router";

// Iniciando stores y parámetros de ruta
const usersStore = useUsersStore();
const alertStore = useAlertStore();
const route = useRoute();
const { id } = route.params;

// Título y estado inicial del usuario
let title = "Agregar usuario";
let user = null;

if (id) {
  title = "Editar Usuario";
  // Desestructuración para hacer uso de los valores de store
  ({ user } = storeToRefs(usersStore));
  usersStore.getById(id); // Cargar usuario por ID si existe
}

// Definición del esquema de validación con Yup
const schema = Yup.object().shape({
  firstName: Yup.string().required("Nombre requerido"),
  lastName: Yup.string().required("Apellido requerido"),
  username: Yup.string().required("Usuario requerido"),
  password: Yup.string()
    .transform((x) => (x === "" ? undefined : x)) // Transformación de campo vacío
    .concat(user ? null : Yup.string().required("Contraseña requerida"))
    .min(6, "La contraseña debe tener mas de 6 caracteres"),
});

async function onSubmit(values) {
  try {
    let message;
    // Verificar si estamos actualizando o registrando un nuevo usuario
    if (user) {
      await usersStore.update(user.value.id, values);
      message = "Usuario cargado";
    } else {
      await usersStore.register(values);
      message = "Usuario Agregado";
    }
    await router.push("/users");
    alertStore.success(message);
  } catch (error) {
    alertStore.error(error);
  }
}
</script>

<template>
  <h1>{{ title }}</h1>

  <template v-if="!(user?.loading || user?.error)">
    <Form
      @submit="onSubmit"
      :validation-schema="schema"
      :initial-values="user"
      v-slot="{ errors, isSubmitting }"
    >
      <div class="form-row">
        <div class="form-group col">
          <label>Nombre</label>
          <Field
            name="firstName"
            type="text"
            class="form-control"
            :class="{ 'is-invalid': errors.firstName }"
          />
          <div class="invalid-feedback">{{ errors.firstName }}</div>
        </div>
        <div class="form-group col">
          <label>Apellido</label>
          <Field
            name="lastName"
            type="text"
            class="form-control"
            :class="{ 'is-invalid': errors.lastName }"
          />
          <div class="invalid-feedback">{{ errors.lastName }}</div>
        </div>
      </div>

      <!-- Fila de usuario y contraseña -->
      <div class="form-row">
        <div class="form-group col">
          <label>Nombre de usuario</label>
          <Field
            name="username"
            type="text"
            class="form-control"
            :class="{ 'is-invalid': errors.username }"
          />
          <div class="invalid-feedback">{{ errors.username }}</div>
        </div>
        <div class="form-group col">
          <label> Contraseña </label>
          <Field
            name="password"
            type="password"
            class="form-control"
            :class="{ 'is-invalid': errors.password }"
          />
          <div class="invalid-feedback">{{ errors.password }}</div>
        </div>
      </div>

      <!-- Botones de acción -->
      <div class="form-group">
        <button class="btn btn-user" :disabled="isSubmitting">
          <span v-show="isSubmitting"></span>
          Guardar
        </button>
        <router-link to="/users" class="btn btn-link">Cancel</router-link>
      </div>
    </Form>
  </template>

  <!-- Mensaje de error -->
  <template v-if="user?.error">
    <div class="text-center m-5">
      <div class="text-danger">Error cargando al usuario: {{ user.error }}</div>
    </div>
  </template>
</template>