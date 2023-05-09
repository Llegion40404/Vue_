import axios from "axios";
import { reactive } from "vue";
const url = "http://localhost:3000/users";

let users = reactive([]);
async function getusers() {
  let res = axios.get(url);
  users = (await res).data;
}
getusers();
export let routes = [
  {
    path: "/",
    name: "home",
    component: () => import("../views/home.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/login.vue"),
  },
  {
    path: "/catalogs",
    name: "catalogs",
    component: () => import("../views/catalogs.vue"),
    meta: {
      requiresAuth: true,
      roles: [],
    },
  },
  {
    path: "/users",
    name: "users",
    component: () => import("../views/users.vue"),
    meta: {
      requiresAuth: true,
      roles: [],
    },
  },
];
