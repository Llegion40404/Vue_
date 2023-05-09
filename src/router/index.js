import { createRouter, createWebHistory } from "vue-router";
import { routes } from "./routes";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
});
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem("token") || false;
  const userRole = localStorage.getItem("token");

  if (to.matched.some((route) => route.meta.requiresAuth)) {
    if (!isAuthenticated) {
      next({
        path: "/login",
      });
    } else if (
      to.matched.some((route) => route.meta.roles.includes(userRole))
    ) {
      next();
    } else {
      next({ path: "/login" });
    }
  } else {
    next();
  }
});
export default router;
