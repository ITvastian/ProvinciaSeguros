import { defineStore } from 'pinia';
import { fetchWrapper } from '@/helpers';
import { useAlertStore, useAuthStore } from '@/stores';


// Definimos la URL base de las solicitudes para los usuarios.
const baseUrl = `${import.meta.env.VITE_API_URL}/users`;


// Creamos la store para gestionar usuarios.
export const useUsersStore = defineStore({
    id: 'users',
    state: () => ({
        users: null,
        user: null,
    }),
    actions: {
        //actualizando usuarios
        setUsers(data) {
            this.users = data;
        },
        setUser(data) {
            this.user = data;
        },
        // Manejo de errores y asigno una key estado.
        handleError(error, key) {
            this[key] = { error };
        },
        // Registra un nuevo usuario mediante una solicitud POST.
        async register(user) {
            await fetchWrapper.post(`${baseUrl}/register`, user);
        },
        async getAll() {
            this.setUsers({ loading: true });
            try {
                const users = await fetchWrapper.get(baseUrl);
                this.setUsers(users);
            } catch (error) {
                this.handleError(error, 'users');
            }
        },
        // Obtener un usuario por ID
        async getById(id) {
            this.setUser({ loading: true });
            try {
                const user = await fetchWrapper.get(`${baseUrl}/${id}`);
                this.setUser(user);
            } catch (error) {
                this.handleError(error, 'user');
            }
        },
        // Actualizar un usuario
        async update(id, params) {
            try {

                await fetchWrapper.put(`${baseUrl}/${id}`, params);

                const authStore = useAuthStore();
                // Si el usuario actualizado es el actual, sincronizar los datos
                if (id === authStore.user.id) {
                    const user = { ...authStore.user, ...params };
                    localStorage.setItem('user', JSON.stringify(user));
                    authStore.user = user;
                }
            } catch (error) {
                const alertStore = useAlertStore();
                alertStore.error("Ocurrrio un error al actualizar los datos del usuario");
                console.error(error)
            }
        },
        // Eliminar un usuario
        async delete(id) {
            const index = this.users?.findIndex((x) => x.id === id);
            if (index !== -1) this.users[index] = { ...this.users[index], isDeleting: true };

            try {
                await fetchWrapper.delete(`${baseUrl}/${id}`);
                this.setUsers(this.users.filter((x) => x.id !== id));
            } catch (error) {
                this.handleError(error, 'users');
            }
            // Si el usuario eliminado es el actual, cerrar sesión
            const authStore = useAuthStore();
            if (id === authStore.user.id) authStore.logout();
        }
    }
});