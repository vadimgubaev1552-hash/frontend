import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/HomePage/HomePage.vue'
import EstimatePage from '@/views/EstimatePage/EstimatePage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
    },
    {
      path: '/estimate',
      name: 'estimate',
      component: EstimatePage,
    },
  ],
})

export default router
