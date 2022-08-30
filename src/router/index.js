import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import TodoListView from "../views/TodoListView.vue";
import ClothesFilteredView from "../views/ClothesFilteredView.vue";
import DayCounterView from "../views/DayCounterView.vue";

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
  {
    path: "/day-counter",
    name: "day-counter",
    component: DayCounterView,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
