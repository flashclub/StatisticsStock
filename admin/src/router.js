import Vue from "vue";
import Router from "vue-router";
import Main from "./views/Main.vue";
import Index from "./views/Index.vue";
import Userlist from "./views/Userlist.vue";
import Catalog from "./views/Catalog.vue";
import EditCatalog from "./views/EditCatalog.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "main",
      component: Main,
      children: [
        {
          path: "",
          component: Index
        },
        {
          path: "/cataloglist",
          component: Catalog
        },
        {
          path: "/userlist",
          component: Userlist
        },
        {
          path: "/editcatalog/:id",
          component: EditCatalog,
          props:true
        },
        {
          path: "/editcatalog",
          component: EditCatalog
        }
      ]
    }
  ]
});
