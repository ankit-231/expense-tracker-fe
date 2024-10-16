import type { RouteRecordRaw } from "vue-router";
import type { Breadcrumb } from "@/core/dtos/general";
const authChildren: Array<RouteRecordRaw> = [
  {
    path: "transaction",
    name: "transaction",
    component: () => import("@/views/general/TransactionView.vue"),
    meta: {
      // breadcrumbs: [
      //   { label: "Home", url: "/" },
      //   { label: "Dashboard" },
      // ] as Breadcrumb[],
    },
  },
  {
    path: "calendar",
    name: "calendar",
    component: () => import("@/views/general/CalendarView.vue"),
    meta: {
      // breadcrumbs: [
      //   { label: "Home", url: "/" },
      //   { label: "Dashboard" },
      // ] as Breadcrumb[],
    },
  },
  {
    path: "statistics",
    name: "statistics",
    component: () => import("@/views/general/StatisticsView.vue"),
    meta: {
      // breadcrumbs: [
      //   { label: "Home", url: "/" },
      //   { label: "Dashboard" },
      // ] as Breadcrumb[],
    },
  },
  {
    path: "wallet",
    name: "wallet",
    component: () => import("@/views/general/WalletView.vue"),
    meta: {
      // breadcrumbs: [
      //   { label: "Home", url: "/" },
      //   { label: "Dashboard" },
      // ] as Breadcrumb[],
    },
  },
  {
    path: "settings",
    name: "settings",
    component: () => import("@/views/general/WalletView.vue"),
    meta: {
      // breadcrumbs: [
      //   { label: "Home", url: "/" },
      //   { label: "Dashboard" },
      // ] as Breadcrumb[],
    },
  },
];

export default authChildren;
