import Layout from "@/views/layout/layout";
export const constantRouterMap = [
  {
    path: "/",
    name: "home",
    component: Layout
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login/login.vue")
  },
  {
    path: "/404",
    component: () => import("@/views/errorPage/404"),
    hidden: true
  }
]
export const asyncRouterMap = [
  
]