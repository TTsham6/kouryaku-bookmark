import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";
import Game from "../views/Game.vue";
import Login from "../views/Login.vue";
import RegistUser from "../views/RegistUser.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/:user_id?",
    name: "Home",
    component: Home
  },
  {
    path: "/game/:game_id?",
    name: "Game",
    component: Game
  },
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: {
      isPublic: true
    }
  },
  {
    path: "/regist-user",
    name: "registUser",
    component: RegistUser
  }
];

const router = createRouter({
  history: createWebHistory(process.env.VUE_APP_HOST),
  routes
});

export default router;
