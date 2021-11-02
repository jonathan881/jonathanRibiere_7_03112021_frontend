import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../components/Home.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../components/Login.vue"),
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("../components/Register.vue"),
  },
  {
    path: "/profile",
    name: "Profile",
    component: () => import("../components/Profile.vue"),
  },
  {
    path: "/messages/new",
    name: "NewMessages",
    component: () => import("../components/NewMessages.vue"),
  },
  {
    path: "/messages",
    name: "Messages",
    component: () => import("../components/Home.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
