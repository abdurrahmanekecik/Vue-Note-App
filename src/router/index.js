import { createRouter, createWebHistory } from 'vue-router'
import NewNote from '@/views/NewNote.vue'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/new',
      name: 'NEW',
      component: NewNote
    },

  ]
})

export default router
