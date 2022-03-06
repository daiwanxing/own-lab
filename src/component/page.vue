<template>
  <main>
    <h1>{{ msg }}</h1>
    <div class="flex-box">
      <div class="flex-item"></div>
      <div class="flex-item"></div>
    </div>
    <animateNumber />
  </main> 
</template>

<script setup>
import animateNumber from "./animate-numer.vue";
import { ref } from "vue";
const msg = ref("Goods Wheel");
</script>

<style scoped lang="scss">

.flex-box {
  display: flex;
  width: 1000px;
  height: 200px;
}

.flex-item:nth-child(1) {
  width: 300px;
  flex-shrink: .5;
  background-color: orange;
}

.flex-item:nth-child(2) {
  width: 800px;
  flex-shrink: .5;
  background-color: tomato;
}

.base--title {
  font-size: 46px;
  font-weight: 900;
}

h1 {
  font-size: 88px;
  font-weight: 800;
  color: rgb(133, 21, 21);
  @extend .base--title;

  background: {
    image: linear-gradient(45deg, black, transparent);
    size: cover;
    position: center;
  }
}
</style>