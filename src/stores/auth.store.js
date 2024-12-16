// Importa 'defineStore' de Pinia para definir un store (almacen de estado)
import { defineStore } from 'pinia';
// Importa un helper para hacer peticiones HTTP
import { fetchWrapper } from '@/helpers';
// Importa el enrutador para navegar entre rutas de la aplicación
import { router } from '@/router';
// Importa el store de alertas para mostrar mensajes de error
import { useAlertStore } from '@/stores';

// URL base para las operaciones con usuarios
const baseUrl = `${import.meta.env.VITE_API_URL}/users`;

// Definición del store para manejar el estado de autenticación
export const useAuthStore = defineStore({
    //ID unico para el store 
    id: 'auth',
    state: () => ({

        user: JSON.parse(localStorage.getItem('user')),
        returnUrl: null
    }),
    actions: {
        //accion para logearse
        async login(username, password) {
            try {
                const user = await fetchWrapper.post(`${baseUrl}/authenticate`, { username, password });
                this.user = user;
                // uso el localStorage para persistir el inicio de sesión entre recargas
                localStorage.setItem('user', JSON.stringify(user));
                router.push(this.returnUrl || '/');
            } catch (error) {
                // Si ocurre un error, muestra un mensaje de error utilizando el store de alertas
                const alertStore = useAlertStore();
                alertStore.error(error);
            }
        },
        //accion para deslogearse
        logout() {
            this.user = null;
            localStorage.removeItem('user');
            router.push('/account/login');
        }
    }
});