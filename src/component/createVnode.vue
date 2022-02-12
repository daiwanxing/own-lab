<template>
  <div>
    <h1>vue3 api</h1>
    <div ref="boxVNode"></div>
  </div>
</template>

<script lang="ts" setup>
import { createVNode, render, onMounted, shallowRef } from "vue";
import inlineTitle from "./inline-title.vue";


const vm = createVNode(inlineTitle, { msg: "big-title" });

const boxVNode = shallowRef<HTMLElement>();

onMounted(() => {
  render(vm, boxVNode.value!);
});

</script>