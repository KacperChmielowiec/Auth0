import { createRouter as createVueRouter, createWebHashHistory, Router } from "vue-router";
import Home from "../views/Home.vue";
import Profile from "../views/Profile.vue";
import { createAuthGuard, useAuth0 } from "@auth0/auth0-vue";
import { watch, type App } from "vue";

export function createRouter(app: App): Router {
  const router = createVueRouter({
    history: createWebHashHistory(),
    routes: [
      { path: "/", name: "home", component: Home },
      { path: "/profile", name: "profile", component: Profile, beforeEnter: createAuthGuard(app) },
    ],
  });



  return router
}
