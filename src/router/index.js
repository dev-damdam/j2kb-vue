import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import TodoListView from "../views/TodoListView.vue";
import ClothesFilteredView from "../views/ClothesFilteredView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/todo-list",
    name: "todo-list",
    component: TodoListView,
  },
  {
    path: "/clothes-filtered",
    name: "clothes-filtered",
    component: ClothesFilteredView,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
