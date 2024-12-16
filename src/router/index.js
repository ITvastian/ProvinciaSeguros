// Importamos funciones para crear un router y manejar el historial de navegación.
import { createRouter, createWebHistory } from 'vue-router';
// Importamos los (manejadores de estado) necesarias para autenticación y alertas.
import { useAuthStore, useAlertStore } from '@/stores';
// Importando funcion para componentes asíncronos.
import { defineAsyncComponent } from 'vue';
// Importamos las configuraciones de rutas para cuentas y usuarios desde archivos externos.
import accountRoutes from './account.routes';
import usersRoutes from './users.routes';

export const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    // Clase CSS que se aplica a los enlaces activos en la navegación.
    linkActiveClass: 'active',
    routes: [
        { 
            path: '/', 
            component: defineAsyncComponent(() => import('@/views/Home.vue')) 
        },
        { ...accountRoutes },
        { ...usersRoutes },
        { path: '/:pathMatch(.*)*', redirect: '/' }
    ]
});

router.beforeEach(async (to) => {
    // limpiando alertas activas
    const alertStore = useAlertStore();
    alertStore.clear();

    // Redirigimos al login si el usuario intenta acceder a una página restringida sin estar autenticado.
    const publicPages = ['/account/login', '/account/register'];
    const authRequired = !publicPages.includes(to.path);
    const authStore = useAuthStore();

    if (authRequired && !authStore.user) {
        authStore.returnUrl = to.fullPath;
        return '/account/login';
    }
});