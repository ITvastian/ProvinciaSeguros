// Importamos los componentes necesarios desde la carpeta 'views'.
// Estos componentes serán usados para configurar las rutas relacionadas a usuarios y sucursales.
// 'Layout' define la estructura principal de las vistas relacionadas a usuarios, 
// como un contenedor que incluye elementos comunes como la barra lateral o encabezados.
import { Layout, List, AddEdit } from '@/views/users';
import { Sucursales } from '@/views/sucursales';

export default {
    path: '/users',
    component: Layout,
    children: [
        { path: '', component: List },
        { path: 'add', component: AddEdit },
        { path: 'edit/:id', component: AddEdit }
    ],
    path: '/sucursales',
    component: Sucursales,
};