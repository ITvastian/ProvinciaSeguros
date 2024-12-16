<script setup>
//iportando depencias
import { Form, Field } from "vee-validate";
import * as Yup from "yup";
import { useUsersStore, useAlertStore } from "@/stores";
import { router } from "@/router";


const schema = Yup.object().shape({
  firstName: Yup.string().required("El campo nombre es obligatorio"),
  lastName: Yup.string().required("El campo apellido es obligatorio"),
  username: Yup.string().required("El nombre de usuario es obligatorio"),
  password: Yup.string()
    .required("El campo contraseña es obligatorio")
    .min(6, "La contraseña tiene que tener al menos 6 caracteres"),
});

async function onSubmit(values) {
  const usersStore = useUsersStore();
  const alertStore = useAlertStore();
  try {
    await usersStore.register(values);
    await router.push("/account/login");
    alertStore.success("Registro exitoso");
  } catch (error) {
    alertStore.error(error);
  }
}
</script>

<template>
  <div class="login-container">
    <h4
      class="card-header"
      style="background-color: transparent; border-bottom: none"
    >
      Registro de usuario
    </h4>
    <div class="card-body">
      <Form
        @submit="onSubmit"
        :validation-schema="schema"
        v-slot="{ errors, isSubmitting }"
      >
        <div class="form-group">
          <label for="firstName">Nombre</label>
          <Field
            id="firstName"
            name="firstName"
            type="text"
            class="form-control"
            :class="{ 'is-invalid': errors.firstName }"
          />
          <div v-if="errors.firstName" class="invalid-feedback">
            {{ errors.firstName }}
          </div>
        </div>

        <div class="form-group">
          <label for="lastName">Apellido</label>
          <Field
            id="lastName"
            name="lastName"
            type="text"
            class="form-control"
            :class="{ 'is-invalid': errors.lastName }"
          />
          <div v-if="errors.lastName" class="invalid-feedback">
            {{ errors.lastName }}
          </div>
        </div>

        <div class="form-group">
          <label for="username">Nombre de usuario</label>
          <Field
            id="username"
            name="username"
            type="text"
            class="form-control"
            :class="{ 'is-invalid': errors.username }"
          />
          <div v-if="errors.username" class="invalid-feedback">
            {{ errors.username }}
          </div>
        </div>

        <div class="form-group">
          <label for="password">Contraseña</label>
          <Field
            id="password"
            name="password"
            type="password"
            class="form-control"
            :class="{ 'is-invalid': errors.password }"
          />
          <div v-if="errors.password" class="invalid-feedback">
            {{ errors.password }}
          </div>
        </div>

        <div class="form-group">
          <button class="btn btn-user" :disabled="isSubmitting">
            Registrarse
          </button>
          <router-link to="login" class="btn btn-link">Cancelar</router-link>
        </div>
      </Form>
    </div>
    <div class="login-footer">
      <div class="footer-image-container">
        <img src="@/assets/gp.png" alt="Imagen 1" class="footer-image" />
      </div>
      <div class="footer-image-container">
        <img
          src="@/assets/ps-logo-blanco.png"
          alt="Imagen 2"
          class="footer-image"
        />
      </div>
    </div>
  </div>
</template>


