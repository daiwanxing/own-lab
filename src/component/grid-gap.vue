<template>
  <div class="grid-container">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
</template>

<script lang="ts" setup>
</script>

<style scoped lang="scss">
.grid-container {
  height: 300px;
  display: grid;
  padding: 22px;
  gap: 12px;
  grid: 1fr 1fr 1fr / repeat(2, 170px);

  div {
    background-color: orange;
  }
}
</style>