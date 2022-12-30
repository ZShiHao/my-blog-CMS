import { createRouter, createWebHistory } from 'vue-router'
import BlogManagement  from '../views/blogManagement/BlogManagement.vue'
import AddEditBlog from '../views/blogManagement/AddEditBlog.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path:'/blog',
      component:BlogManagement
    },
    {
      path:'/blog/editBlog',
      component:AddEditBlog
    }
  ]
})

export default router
