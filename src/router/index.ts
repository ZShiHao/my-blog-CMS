import { createRouter, createWebHistory } from 'vue-router'
import BlogManagement  from '../views/BlogManagement/BlogManagement.vue'
import AddBlog from '../views/BlogManagement/AddBlog.vue'
import SettingBlog from "../views/BlogManagement/SettingBlog.vue"
import BookManagement from '../views/BookManagement/BookManagement.vue'
import AddBook from '../views/BookManagement/AddBook.vue'
import Home from '../views/Home/Home.vue'
import CategoryManagement from '../views/CategoryManagement/CategoryManagement.vue'
import PDFBookManagement from  '../views/PDFBookManagement/PDFBookManagement.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path:'/home',
      component:Home
    },
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
      path:'/pdfbooks',
      component:PDFBookManagement
    },
    {
      path:'/books/addBook',
      component:AddBook
    },
    {
      path:'/category',
      component:CategoryManagement
    }
  ]
})

export default router
