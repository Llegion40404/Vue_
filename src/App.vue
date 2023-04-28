<script setup>
import { computed, onMounted, ref } from "vue";
import Fav from "./components/Fav.vue";
import axios from "axios";
import Modal from "./components/Modal.vue";
("use strict");
const url = "http://localhost:3000/products";
const url2 = "http://localhost:3000/favorites";
const names = ref([]);
const onDelete = (obj) => {
  let idx = names.value.indexOf(obj.name);
  axios.delete(url2 + "/" + obj.id);
  names.value.splice(idx, 1);
  favs.value.splice(idx, 1);
};
let prds = ref([]);
let favs = ref([]);
let total = computed(() =>
  favs.value.length >= 1
    ? favs.value.reduce((sum, obj) => (sum += obj.price * (obj.amount || 1)), 0)
    : 0
);
let message = ref("");
onMounted(() => getData());

async function getData() {
  const data = (await axios.get(url)).data;
  prds.value = data;
  const favors = (await axios.get(url2)).data;
  favs.value = favors;
  names.value = [];
  favs.value.map((obj) => {
    names.value.push(obj.name);
  });
}

async function postData(obj) {
  if (!names.value.includes(obj.name)) {
    names.value.push(obj.name);
    favs.value.push(obj);
    axios.post(url2, obj);
  } else {
    let idx = names.value.indexOf(obj.name);
    favs.value[idx].amount++;
  }
}
async function save() {
  try {
    favs.value.forEach((el) => {
      axios.put(url2 + "/" + el.id, el);
    });
  } catch (er) {
    alert(er.name);
  }
}
</script>
<template>
  <div class="container">
    <Modal :mess="message" />
    <main class="products">
      <h1>Products</h1>
      <ul class="prds">
        <li class="product" v-for="pr in prds" :key="pr.name">
          <div>
            <h3>{{ pr.name }}</h3>
            <p style="margin: 5px 0">{{ pr.price }}$</p>
          </div>
          <button @click="postData(pr)" class="add">Add to fav</button>
        </li>
      </ul>
    </main>
    <section class="favorites">
      <h1>Favorites</h1>
      <ul class="favs">
        <Fav @delete="onDelete" v-for="fav in favs" :key="fav.id" :fav="fav" />
      </ul>
      <button style="margin-bottom: 10px" @click="save" class="add">
        Save
      </button>
      <h2>Total:{{ total }}$</h2>
    </section>
  </div>
  {{ favs }}
</template>
<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "roboto", sans-serif;
  color: whitesmoke;
  list-style-type: none;
  border-radius: 5px;
  outline: none;
  border: none;
}
body {
  background-color: rgb(37, 33, 33);
}
button {
  cursor: pointer;
}
.container {
  width: 1850px;
  margin: 0 auto;
  padding-top: 40px;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}
.favorites {
  width: 700px;
  background-color: dimgray;
  padding: 20px;
}
.prds {
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.product {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  gap: 40px;
  background-color: lightslategray;
}
.add {
  background-color: darkgreen;
  padding: 10px 20px;
}
.favs {
  margin: 20px 0;
  display: flex;
  flex-direction: column;
  gap: 15px;
}
.fav {
  padding: 20px;
  background-color: slategray;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.btn {
  padding: 5px 10px;
  color: black;
}
.delete {
  padding: 10px 20px;
  background-color: crimson;
}
.modal {
  width: 400px;
  height: 100px;
  background-color: white;
  padding: 20px;
  position: absolute;
  top: 30px;
  right: 100px;
}
</style>

<!-- if (er.name == "AxiosError") {
      message.value = "e";
      setTimeout(() => {
        message.value = "h";
      }, 2000);
    } else {
      message.value = "s";
      setTimeout(() => {
        message.value = "h";
      }, 2000); -->
