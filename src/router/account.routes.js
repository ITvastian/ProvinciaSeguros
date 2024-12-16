// Importamos los componentes necesarios desde la carpeta 'views/account'.
import { Layout, Login, Register } from '@/views/account';

export default {
     // Definimos el path base para estas rutas: '/account'.
    path: '/account',
    component: Layout,
    children: [
        { path: '', redirect: 'login' },
        { path: 'login', component: Login },
        { path: 'register', component: Register }
    ]
};