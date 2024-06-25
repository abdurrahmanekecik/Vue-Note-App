import { createRouter, createWebHistory } from 'vue-router'
import NewNote from '@/views/NewNote.vue'
import HomeView from '@/views/HomeView.vue'
import EditNote from '@/views/EditNote.vue'

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
      name: 'new',
      component: NewNote
    },
    {
      path: '/edit/:id',
      name: 'edit',
      component: EditNote
    },

  ]
})

export default router
