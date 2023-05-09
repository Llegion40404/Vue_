<script setup>
import router from "./router";

function logOut() {
  localStorage.removeItem("token");
  location.reload();
}
let token = localStorage.getItem("token");
let roles = ["admin", "moderator"];
let show = roles.includes(token);
</script>
<template>
  <nav v-if="token">
    <RouterLink to="/">Home page</RouterLink>
    <RouterLink v-if="show" to="/catalogs">Catalogs</RouterLink>
    <RouterLink v-if="token == 'admin'" to="/users">Users</RouterLink>
    <p style="cursor: pointer" @click="logOut">Log out</p>
  </nav>
  <RouterView></RouterView>
</template>
<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  border-radius: 5px;
  color: white;
  font-family: "roboto", sans-serif;
  outline: none;
  border: none;
}
body {
  background-color: rgb(20, 19, 19);
}
ul {
  list-style-type: none;
  display: flex;
  gap: 25px;
}
.container {
  padding: 40px 0;
  width: 1700px;
  margin: 0 auto;
}
nav {
  border-radius: 0;
  padding: 20px 50px;
  background-color: royalblue;
  display: flex;
  justify-content: space-between;
}
a {
  text-decoration: none;
}
h1 {
  margin-bottom: 10px;
}
.login {
  background-color: rgb(153, 153, 153);
  padding: 20px;
  width: 30%;
  position: absolute;
  top: 200px;
  left: 650px;
}
form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
}
input {
  color: black;
  padding: 5px 10px;
  font-size: 16px;
}
button,
select {
  cursor: pointer;
}
button {
  font-weight: bold;
  font-size: 16px;
  padding: 10px 20px;
  background-color: rgb(0, 140, 255);
}
select {
  font-weight: 700;
  padding: 5px 10px;
  background-color: rgb(24, 148, 51);
  margin-bottom: 20px;
}
.info {
  text-align: left;
  position: absolute;
  bottom: 270px;
  left: 110px;
  height: 100px;
  width: 400px;
  padding: 20px;
  background-color: white;
}
.user {
  background-color: gray;
  padding: 20px;
}
h3 {
  font-weight: normal;
}
.user__inner {
  display: flex;
  justify-content: space-around;
  padding-top: 20px;
}
.user__btn {
  padding: 5px 10px;
  background-color: darkslategrey;
  font-weight: 400;
}
.create {
  margin-top: 40px;
  background-color: rgb(61, 124, 103);
  width: 300px;
  padding: 20px;
}
.save {
  width: 270px;
}
.class {
  background-color: firebrick;
}
.routes {
  background-color: white;
  padding: 5px 10px;
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
}
</style>
