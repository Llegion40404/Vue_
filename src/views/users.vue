<script setup>
import axios from "axios";
import { onMounted, reactive, ref } from "vue";
import { routes } from "../router/routes";

const users = ref([]);
const name = ref("");
const password = ref("");
const userClass = ref("");
const added = reactive([]);
const url = "http://localhost:3000/users";

onMounted(() => getUsers());

async function getUsers() {
  let res = await axios.get(url);
  users.value = res.data;
}

function deleteUser(id) {
  try {
    axios.delete(url + `/${id}`);
  } catch (er) {
    console.log(er);
  }
}

function addRoute(route) {
  if (!added.includes(route)) {
    added.push(route);
  }
}
function deleteRoute(name) {
  let idx = added.indexOf(name);
  added.splice(idx, 1);
}
</script>

<template>
  <section class="users container">
    <h1>Users</h1>
    <main>
      <ul class="users__list">
        <li class="user" v-for="user in users" :key="user.id">
          <h3>Username: {{ user.uName }}</h3>
          <h3 style="margin: 10px 0">Password: {{ user.pass }}</h3>
          <h3>Access: {{ user.class }}</h3>
          <div class="user__inner">
            <h4
              style="color: rgb(140, 199, 125); font-size: 20px"
              v-if="user?.class?.includes('admin')"
            >
              You can't edit other admins
            </h4>
            <button
              v-if="!user?.class?.includes('admin')"
              @click="deleteUser(user.id), getUsers"
            >
              Delete
            </button>
          </div>
        </li>
      </ul>
    </main>
    <section class="create">
      <h1>Create user</h1>
      <form @submit.prevent="getUsers">
        <label for="name"
          >Username: <input required v-model="name" id="name" type="text"
        /></label>
        <label for="pass"
          >Password: <input required v-model="password" id="pass" type="text"
        /></label>
        <label for="class"
          >User:
          <input required type="text" id="class" v-model="userClass" />
        </label>
        Can access:
        <div class="routes">
          <button v-for="route in added" @click="deleteRoute(route)">
            {{ route }}
          </button>
        </div>
        <button
          class="user__btn"
          v-for="route in routes.filter(
            (e) => e.name != 'home' && e.name != 'login'
          )"
          :key="route.name"
          @click="addRoute(route.name)"
        >
          {{ route.name }}
        </button>
        <button class="save" @click="getUsers" type="submit">Save</button>
      </form>
    </section>
  </section>
</template>
