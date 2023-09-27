import { createRouter, createWebHistory } from "vue-router";
import BlogManagement from "../views/BlogManagement/BlogManagement.vue";

import BookManagement from "../views/BookManagement/BookManagement.vue";
import AddBook from "../views/BookManagement/components/AddBook.vue";
import Home from "../views/Home/Home.vue";
import Login from "../views/login.vue";
import MainView from "../views/mainView.vue";
import CategoryManagement from "../views/CategoryManagement/CategoryManagement.vue";
import PDFBookManagement from "../views/PDFBookManagement/PDFBookManagement.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      // redirect:'/home',
      component: MainView,
      children: [
        {
          path: "home",
          component: Home,
        },
        // {
        //   path: "blog",
        //   component: BlogManagement,
        // },
        // {
        //   path: "blog/addBlog",
        //   component: AddBlog,
        // },
        // {
        //   path: "blog/settingBlog",
        //   component: SettingBlog,
        // },
        {
          path: "books",
          component: BookManagement,
        },
        {
          path: "pdfbooks",
          component: PDFBookManagement,
        },
        {
          path: "books/addBook",
          component: AddBook,
        },
        {
          path: "category",
          component: CategoryManagement,
        },
      ],
    },
    {
      path: "/login",
      name: "login",
      component: Login,
    },
  ],
});

// router.beforeEach((to, from) => {
//   const token = window.localStorage.getItem("access_token");
//   if (to.name !== "login") {
//     if (token === null) {
//       return {
//         name: "login",
//       };
//     }
//   } else {
//     if (token !== null) {
//       return {
//         path: "/",
//       };
//     } else {
//       return true;
//     }
//   }
// });

export default router;
