<script setup>
const token = localStorage.getItem("token");
</script>
<template>
  <div class="welcome">
    <h1>Welcome page</h1>
    <article v-if="!token" class="login">
      <h1 style="display: inline; margin-right: 100px" v-if="!token">
        Please login to see the content
      </h1>
      <RouterLink v-if="!token" class="user__btn" to="/login"
        >Log in</RouterLink
      >
    </article>
  </div>
</template>
<style>
.welcome {
  padding: 20px;
}
.login {
  text-align: center;
  position: absolute;
  padding: 50px 20px;
  display: flex;
  flex-direction: column;
}
</style>
