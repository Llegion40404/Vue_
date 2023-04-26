<script setup>
const props = defineProps({
  fav: {
    type: Object,
    required: true,
  },
});
function minus() {
  if (props.fav.amount > 1) {
    props.fav.amount--;
  }
}
</script>
<template>
  <div class="fav">
    <div>
      <button @click="minus" class="btn">-</button>
      <span style="margin: 0 10px">{{ props.fav.amount }}</span>
      <button @click="props.fav.amount++" class="btn">+</button>

      <h3>{{ props.fav.name }}</h3>
      <p style="margin: 5px 0">Price: {{ props.fav.price }}$</p>
      <p>Total: {{ props.fav.price * props.fav.amount }}$</p>
    </div>
    <button class="delete" @click="$emit('delete', props.fav)">Delete</button>
  </div>
</template>
