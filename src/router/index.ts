import { createRouter, createWebHashHistory } from 'vue-router'
import BlogLayout from '../layout/BlogLayout.vue'
import Home from '../views/Home.vue'
import Post from '../views/Post.vue'
import About from '../views/About.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: BlogLayout,
      children: [
        {
          path: '',
          name: 'home',
          component: Home
        },
        {
          path: 'post/:id',
          name: 'post',
          component: Post
        },
        {
          path: 'about',
          name: 'about',
          component: About
        }
      ]
    }
  ]
})

export default router
