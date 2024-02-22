import { createRouter, createWebHistory } from "vue-router";

const routes = [{
  path: "/Login",
  component: () =>
    import("../pages/Login.vue")
},
{
  path: "/",
  component: () =>
    import("../pages/Home.vue")
}
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;