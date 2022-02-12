<template>
  <div>
    <h1>dsahdasdasijodsa</h1>
    <Cl-page />
    <VerifyCode />
    <createVnode />
  </div>
</template>

<script lang="ts" setup>
import ClPage from "@/component/page.vue";
import VerifyCode from "@/component/verfy-code.vue";
import "./index.scss";
import createVnode from "@/component/createVnode.vue";

</script>

<style lang="scss">
@use "./styles/var.scss";
@use "./styles/base.scss";

.example {
  color: orange;
}
</style>