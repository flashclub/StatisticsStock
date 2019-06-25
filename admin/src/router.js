import Vue from "vue";
import Router from "vue-router";
import Main from "./views/Main.vue";
import Index from "./views/Index.vue";
import Userlist from "./views/Userlist.vue";
import Catalog from "./views/Catalog.vue";
import EditCatalog from "./views/EditCatalog.vue";
import Item from "./views/Item.vue";
import EditItem from "./views/EditItem.vue";
import AdminUser from "./views/AdminUser.vue";
import EdigAdmin from "./views/EdigAdmin.vue";

import Login from "./views/Login.vue";
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "main",
      component: Main,
      children: [
        {
          path: "/index",
          component: Index
        },
        {
          path: "/userlist",
          component: Userlist
        },
        {
          path: "/cataloglist",
          component: Catalog
        },
        {
          path: "/editcatalog/:id",
          component: EditCatalog,
          props: true
        },
        {
          path: "/editcatalog",
          component: EditCatalog
        },
        {
          path: "/itemslist",
          component: Item
        },
        {
          path: "/edititems",
          component: EditItem
        },
        {
          path: "/admin_users/edit",
          component: EdigAdmin
        },
        {
          path: "/admin_users/edit/:id",
          component: EdigAdmin,
          props:true
        },
        {
          path: "/admin_users/list",
          component: AdminUser
        }
      ]
    },
    {
      path: "/login",
      component: Login
    }
  ]
});
