import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LandscapesView from '../views/LandscapesView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/landscapes',
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/landscapes',
      name: 'landscapes',
      component: LandscapesView,
    },
  ],
})

export default router
