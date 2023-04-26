<script setup>
import { defineProps } from "vue";
const props = defineProps({
  mess: { type: String, required: true },
});
</script>
<template>
  <div v-show="props.mess == 's' || props.mess == 'e'" class="modal">
    <h1 style="color: darkred" v-show="props.mess == 'e'">Server error!</h1>
    <h1 style="color: green" v-show="props.mess == 's'">Saved successfuly!</h1>
  </div>
</template>
