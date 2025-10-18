import { createRouter as createVueRouter, createWebHashHistory, Router } from "vue-router";
import Home from "../views/Home.vue";
import Profile from "../views/Profile.vue";
import { createAuthGuard, useAuth0 } from "@auth0/auth0-vue";
import { type App } from "vue";
import Posts from "../views/Posts.vue";
import Docs from "../views/Docs.vue";

export function createRouter(app: App): Router {
  const router = createVueRouter({
    history: createWebHashHistory(),
    routes: [
      { path: "/", name: "home", component: Home },
      { path: "/profile", name: "profile", component: Profile, beforeEnter: createAuthGuard(app) },
      { path: "/posts", name: "posts", component: Posts, beforeEnter: createAuthGuard(app)},
      { path: "/docs", name: "docs", component: Docs, beforeEnter: createAuthGuard(app)}
    ],
  });



  return router
}
