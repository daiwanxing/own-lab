<template>
  <div>
    <h1>vue3 api</h1>
    <div ref="boxVNode"></div>
  </div>
</template>

<script lang="ts" setup>
import { createVNode, render, onMounted, shallowRef, onBeforeUnmount } from "vue";
import inlineTitle from "./inline-title.vue";

const vm = createVNode(inlineTitle, { msg: "big-title" });

const boxVNode = shallowRef<HTMLElement>();
onBeforeUnmount(() => {
  console.dir((boxVNode.value as any)._vnode);
  render(null, boxVNode.value as Element);
});

onMounted(() => {
  render(vm, boxVNode.value!);
});

</script>