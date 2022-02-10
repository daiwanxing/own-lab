<template>
  <main>
    <h1>{{ msg }}</h1>
  </main>
</template>

<script setup>
import { ref } from "vue";
const msg = ref("Goods Wheel");
</script>

<style scoped lang="scss">

.base--title {
  font-size: 46px;
  font-weight: 900;
}

h1 {

  color: rgb(133, 21, 21);
  @extend .base--title;

  background: {
    image: linear-gradient(45deg, black, transparent);
    size: cover;
    position: center;
  }
}
</style>