// Importamos `defineStore` de Pinia para crear una store.
import { defineStore } from 'pinia';

export const useAlertStore = defineStore({
    id: 'alert',
    state: () => ({
        alert: null // estado inicial sin alerta activa
    }),
    actions: {
        // Configura una alerta de éxito con un mensaje.
        success(message) {
            this.alert = { message, type: 'alert-success' };
        },
        // Configura una alerta de error con un mensaje.
        error(message) {
            this.alert = { message, type: 'alert-danger' };
        },
        //limpiando alertas activas
        clear() {
            this.alert = null;
        }
    }
});