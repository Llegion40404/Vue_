<script setup>
import axios from "axios";
import { computed, onMounted, reactive, ref } from "vue";
import router from "../router";
import { routes } from "../router/routes";
let tken = localStorage.getItem("token") || false;
if (tken) {
  router.push("/");
}
onMounted(async () => {
  resUsers = (await axios.get(usersLink)).data;
});
let resUsers = reactive([]);
const usersLink = "http://localhost:3000/users";
const role = ref("");
const login = ref("");
const password = ref("");
const isSuccess = ref(false);
const show = ref(false);
const mess = ref("");
const onLog = () => {
  if (isSuccess.value) {
    mess.value = `Logged in as ${role.value}
    Redirecting...`;
    setTimeout(() => {
      show.value = false;
      window.location.reload();
    }, 2000);
  } else {
    mess.value = "Incorrect email or password";
    setTimeout(() => {
      show.value = false;
    }, 2000);
  }
};

async function onSubmit() {
  let found = computed(() =>
    resUsers.filter(
      (el) => el.uName == login.value && el.pass == password.value
    )
  );

  if (found.value.length === 1) {
    role.value = found.value[0].class;
    show.value = true;
    isSuccess.value = true;
    localStorage.setItem("token", found.value[0]?.class);
    onLog();
  } else {
    show.value = true;
    isSuccess.value = false;
    onLog();
  }
}
</script>

<template>
  <section class="login">
    <h1
      :style="{ color: isSuccess ? 'green' : 'red' }"
      class="info"
      v-show="show"
    >
      {{ mess }}
    </h1>
    <h1>Login</h1>
    <form @submit.prevent="onSubmit">
      <label for="login"
        >Login:
        <input
          autocomplete="username"
          required
          v-model="login"
          type="text"
          id="login"
        />
      </label>
      <label for="pass"
        >Password:
        <input
          required
          autocomplete="current-password"
          v-model="password"
          type="password"
          id="pass"
        />
      </label>
      <button type="submit">login</button>
    </form>
  </section>
</template>
