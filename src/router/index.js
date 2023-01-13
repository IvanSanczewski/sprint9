import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import Books from '../pages/Books.vue'
import Movies from '../pages/Movies.vue'
import User from '../pages/User.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/books',
      name: 'Books',
      component: Books
    },
    {
      path: '/movies',
      name: 'Movies',
      component: Movies
    },
    {
      path: '/user',
      name: 'User',
      component: User
    },
   
  ]
})


export default router