import { createRouter, createWebHistory } from 'vue-router'
import BlogManagement  from '../views/blogManagement/BlogManagement.vue'
import AddBlog from '../views/blogManagement/AddBlog.vue'
import SettingBlog from "../views/blogManagement/SettingBlog.vue"
import BookManagement from '../views/BookManagement/BookManagement.vue'
import AddBook from '../views/BookManagement/AddBook.vue'

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
    },
    {
      path:'/blog/settingBlog',
      component:SettingBlog
    },
    {
      path:'/books',
      component:BookManagement
    },
    {
      path:'/books/addBook',
      component:AddBook
    }
  ]
})

export default router
