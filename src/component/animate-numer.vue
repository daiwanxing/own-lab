<template>
  <h1>{{ animateTotal }}</h1>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";
import useAnimateNumber from "./hook";
const total = ref(0);
// 模拟请求接口

const animateTotal = useAnimateNumber(total);

setTimeout(() => {
    total.value = 329103;

}, 3200);


watch(() => total.value, val => {
    console.log(val);
});

</script>