<template>
  <div>
    <h1>dsahdasdasijodsa</h1>
    <Cl-page />
    <VerifyCode />
  </div>
</template>

<script lang="ts" setup>
import ClPage from "@/component/page.vue";
import VerifyCode from "@/component/verfy-code.vue";
import "./index.scss";

defineProps({
  name: {
    type: String,
    default: ""
  }
});

console.log("哈哈哈");
</script>

<style lang="scss">
@use "./styles/var.scss";
@use "./styles/base.scss";

.example {
  color: orange;
}
</style>