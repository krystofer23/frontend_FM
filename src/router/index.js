import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ClientView from '../views/client/ClientView.vue';
import InvoceView from '../views/invoce/InvoceView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/clientes',
      name: 'clientes',
      component: ClientView
    },
    {
      path: '/facturas',
      name: 'facturas',
      component: InvoceView
    }
  ]
})

export default router
