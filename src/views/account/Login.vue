<script setup>
//iportando depencias
import { Form, Field } from "vee-validate";
import * as Yup from "yup";
import { useAuthStore } from "@/stores";

// validacion para el formulario
const schema = Yup.object().shape({
  username: Yup.string().required("Usuario requerido"),
  password: Yup.string().required("Contraseña requerida"),
});

// acceso al estado de autenticacion
const authStore = useAuthStore();

/**
 * Función que maneja el submit del formulario
 * @param {Object} values
 */
async function onSubmit(values) {
  const { username, password } = values;
 // Si el usuario no está autenticado, intenta hacer login con las credenciales proporcionadas
  if (!authStore.isAuthenticated) {
    await authStore.login(username, password);
  }
}
</script>

<template>
  <div class="login-container">
    <h4
      class="card-header"
      style="background-color: transparent; border-bottom: none"
    >
      Inicio de Sesión
    </h4>
    <div class="card-body">
        <!-- Formulario de login, vinculado con la validación -->
      <Form
        @submit="onSubmit"
        :validation-schema="schema"
        v-slot="{ errors, isSubmitting }"
      >
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
            <!-- mensaje de error -->
          <div v-if="errors.password" class="invalid-feedback">
            {{ errors.password }}
          </div>
        </div>

        <div class="form-group">
          <button class="btn btn-user" :disabled="isSubmitting">
            Iniciar Sesión
          </button>
          <router-link to="register" class="btn btn-link"
            >Registrarse</router-link
          >
        </div>
      </Form>
    </div>
      <!-- Footer con imágenes -->
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

<style>
.card-header {
  color: #303030;
  text-align: center;
  line-height: 1em;
  font-family: Encode Sans;
  font-weight: bold;
  padding-top: 10px;
  margin-bottom: 8px;
  padding-bottom: 10px;
}
.login-container {
  max-width: 400px;
  /* margin: 50px auto; */
  margin: auto;
  padding: 20px;
  background-color: #e8e8e8;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.form-control {
  border: 1px solid;
  font: inherit;
  color: #002f87;
  margin: 0;
  display: block;
  min-width: 0;
  font-family: Encode Sans;
  border-radius: 15px;
  -webkit-tap-highlight-color: transparent;
}
label {
  color: #5d5d5d;
  font-size: 12px;
  font-family: Encode Sans;
  padding-left: 12px;
}

.form-control:focus {
  border-color: #002f87;
  box-shadow: none;
}

.error-message {
  color: red;
  font-family: Encode Sans;
  font-size: 12px;
}
.invalid-feedback {
  padding-left: 12px;
}

.password-wrapper {
  position: relative;
}

.toggle-password {
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
}
a.btn.btn-link{
  text-decoration: none;
}
.btn-link{
  color: black;
}
.btn-link:hover {
  color: #3b5998;
}

.btn-user {
  color: #fff;
  width: 120px;
  font-family: Encode Sans;
  border-radius: 20px;
  font-size: 0.875rem;
  background-color: #002f87;
}
.btn-user:hover {
  color: white;
  background-color: rgba(0, 0, 0, 0.08);
}
.btn:focus {
  box-shadow: none;
}
.login-footer {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  border-radius: 10px;
  padding: 9px;
  background-color: #223873;
}

.footer-image-container {
  position: relative;
}

.footer-image {
  max-width: 100px;
  height: auto;
}

.footer-image-container:first-child {
  border-right: 2px solid #ccc;
  padding-right: 20px;
}

@media (max-width: 576px) {
  .card-body {
    padding: 20px;
  }

  .form-group {
    margin-bottom: 0.75rem;
  }

  .btn-user {
    width: 100%;
  }

  .btn-link {
    display: block;
    text-align: center;
  }
}
</style>