import { createRouter, createWebHistory } from "vue-router";
import authChildren from "./authChildren";
import type { Breadcrumb } from "@/core/dtos/general";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/LoginView.vue"),
      meta: {
        requiresAuth: false,
      },
    },
    {
      path: "/",
      name: "home",
      redirect: { name: "transaction" },
      component: () => import("@/layouts/AuthLayout.vue"),
      meta: {
        requiresAuth: true,
      },
      children: authChildren,
    },

    {
      path: "/:pathMatch(.*)*",
      name: "notFound",
      component: () => import("@/views/NotFoundView.vue"),
      meta: {
        requiresAuth: false,
      },
    },
  ],
});

export default router;
