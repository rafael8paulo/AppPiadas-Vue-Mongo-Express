import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import NovaPiada from "../components/NovaPiada.vue";
import HomePiadas from "../components/HomePiadas.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomePiadas,
  },
  {
    path: "/about",
    name: "about",    
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/NovaPiada",
    name: "NovaPiada",
    component: NovaPiada,
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
