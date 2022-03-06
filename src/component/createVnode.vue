<template>
  <div>
    <h1 :class="module.red">vue3 api</h1>
    <div ref="boxVNode"></div>
  </div>
</template>

<script lang="ts" setup>
import { createVNode, render, onMounted, shallowRef, onBeforeUnmount } from "vue";
import inlineTitle from "./inline-title.vue";

const vm = createVNode(inlineTitle, { msg: "big-title" });

const boxVNode = shallowRef<HTMLElement>();
onBeforeUnmount(() => {
  render(null, boxVNode.value as Element);
});

onMounted(() => {
  render(vm, boxVNode.value!);
});

</script>

<style module="module">
.red {
  color: #2970ff;
}
</style>