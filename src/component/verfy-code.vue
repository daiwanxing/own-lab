<template>
  <div
    ref="boxVNode"
    class="box"
  >
    <div
      ref="sliderVNode"
      class="slider-box"
      @mousedown="bindMoveHandler"
      @mouseup="unbindMoveHandler"
    ></div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";

const sliderVNode = ref<HTMLElement>();
const boxVNode = ref<HTMLElement>();

let position = 0;

const mouseMoveHandler = function (this: HTMLElement, evt: MouseEvent) {
    if (boxVNode.value) {
        const distance = evt.clientX - boxVNode.value.offsetLeft;
        const slideWidth = this.clientWidth / 2;
        if (distance - slideWidth > 0 && distance - slideWidth < 300 - 40) {
            if (position >= 0 && position <= 300) {
                // 获取容器自身的宽度 / 2
                position = distance - slideWidth;
                this.style.transform = `translateX(${position}px)`;
            }
        }
    }
};


function bindMoveHandler() {
    const node = sliderVNode.value;
    if (node) {
        node.addEventListener("mousemove", mouseMoveHandler);
    }
}

function unbindMoveHandler() {
    const node = sliderVNode.value;
    position = 0;
    if (node) {
        node.removeEventListener("mousemove", mouseMoveHandler);
        node.style.transform = `translateX(${position}px)`;
    }
}

onMounted(() => {
    //
});
</script>


<style lang="scss">
@use "../styles/var.scss" as var;
@use "sass:color";

.box {
    margin: auto;
    width: 300px;
    height: 40px;
    background-color: var.$primary--color;
    position: relative;

    .slider-box {
        height: 100%;
        width: 40px;
        background-color: rgb(197, 42, 42);
        cursor: pointer;

        &.animateBack {
            transition: .2s linear;
        }
    }
}
</style>