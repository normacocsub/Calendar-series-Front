
import { createRouter, createWebHistory } from 'vue-router';



const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('./views/HomeApp.vue')
    },
    {
        path: '/Consulta',
        name: 'Consulta',
        component: () => import('./views/ConsultaActivity.vue')
    }, 
    {
        path: '/Registro',
        name: 'Registro',
        component: () => import('./views/RegisterActivity.vue')
    }
];

const router = new createRouter({
    history: createWebHistory(),
    routes,
})

export default router;


