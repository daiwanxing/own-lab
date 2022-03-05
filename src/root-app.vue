<template>
  <div
    style="margin: 0 20px;"
    class="root-app"
  >
    <article class="my-article">
      <p class="first">p element 1</p>
      <p>p element 2</p>
      <p>p element 3</p>
    </article>
    <article class="my-article">
      <p class="first"><span>p element 1</span></p>
      <p>p element 2</p>
      <p>p element 3</p>
    </article>
    <Cl-page />
    <VerifyCode />
    <createVnode v-if="isCreateVNodeComponentVisible" />
    <gridGap />

    <div class="flex-container">
      <div class="flex-container-box">
        <div class="flex-container-box-header"></div>
      </div>
      <div class="flex-container-box">
        <div class="flex-container-box-header"></div>
      </div>
    </div>
    <svg
      width="120"
      height="120"
      viewBox="0 0 120 120"
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
    >
      <text
        x="60"
        y="20"
        text-anchor="middle"
      >
        4s
        <animate
          attributeName="x"
          values="0;80"
          dur="1s"
        />
      </text>
      <polygon
        points="12,0 120,0 120,108 108,120 0,120 0,72 0,12"
        stroke="#2ddcd0"
        fill="rgba(45, 220, 208, 0.05)"
      />
    </svg>

    <button @click="isCreateVNodeComponentVisible = !isCreateVNodeComponentVisible">关闭CreateVNode组件</button>
  </div>
</template>

<script lang="ts" setup>
import ClPage from "@/component/page.vue";
import VerifyCode from "@/component/verfy-code.vue";
import "./index.scss";
import createVnode from "@/component/createVnode.vue";
import gridGap from "./component/grid-gap.vue";
import { ref } from "vue";

const isCreateVNodeComponentVisible = ref(false);

</script>

<style scoped lang="scss">
.flex-container {
  display: flex;
  &-box {
    flex: 1;
    &-header {
      height: 120px;
      background-color: orange;
    }
  }
}

// css  is 伪类

:is(.my-article:first-child) p {
  background-color: oldlace;
}

.my-article p:first-child {
  font-weight: bold;
}


:is(p) span {
  font-size: 100px;
}
</style>
