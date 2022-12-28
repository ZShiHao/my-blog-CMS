import { createRouter, createWebHistory } from 'vue-router'
import BlogManagement  from '../views/blogManagement/BlogManagement.vue'
import AddBlog from '../views/blogManagement/AddBlog.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path:'/blog',
      component:BlogManagement
    },
    {
      path:'/blog/addBlog',
      component:AddBlog
    }
  ]
})

export default router
