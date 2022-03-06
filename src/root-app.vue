<template>
  <main>
    <div
      ref="containerNode"
      class="box"
    >
      <div
        ref="colResizeNode"
        class="col-resize"
      ></div>
    </div>
    <div class="another"></div>
  </main>
</template>

<script lang="ts">
import "./index.scss";
import type { VNode, RendererElement } from "vue";
import { onMounted, shallowRef, onUnmounted, createVNode, defineComponent, render } from "vue";

export default defineComponent({
  name: "RootApp",
  setup() {
    const colResizeNode = shallowRef<HTMLElement>();
    const containerNode = shallowRef<HTMLElement>();
    let lineVnode: RendererElement | VNode;

    const colResizeConfigOption: {
      minWidth: number;
      modifyWidth: number;
      colResizeOffsetLeft: number;
      colResizeWidth: number;
    } = {
      minWidth: 0, // 要拖拽宽度的目标容器最初的宽度,
      modifyWidth: 0, // 目标容器拖拽后的宽度
      colResizeOffsetLeft: 0, // 要拖拽的线条距离视口左侧的距离
      colResizeWidth: 0, // 拖拽的线条实际偏移了的宽度（从拖拽前 到 拖拽完毕后中间这段距离的宽）
    };


    function genrateLineHandle(this: HTMLElement) {
      lineVnode = createVNode("div", { class: "line" });
      render(lineVnode as VNode, this);
    }

    function removeLineHandle(this: HTMLElement) {
      const el = lineVnode.el as HTMLElement;
      if (el && containerNode.value) {
        const { colResizeWidth, modifyWidth } = colResizeConfigOption;
        containerNode.value.style.width = modifyWidth + colResizeWidth + "px";
        colResizeConfigOption.modifyWidth = modifyWidth + colResizeWidth;
      }

      colResizeConfigOption.colResizeWidth = 0;
      if (lineVnode) render(null, colResizeNode.value!);
      document.documentElement.removeEventListener("mousemove", moveLine);
      document.documentElement.removeEventListener("mouseup", removeLineHandle);
    }

    // 移动那根线
    function moveLine(evt: Event) {
      const mouseEvt = evt as MouseEvent;
      const pageX = mouseEvt.pageX;
      const { modifyWidth: clientWidth, colResizeOffsetLeft } = colResizeConfigOption;
      const el = lineVnode.el as HTMLElement;
      // 拖拽不能改变容器的最小宽度 （最小宽度默认是容器挂载到DOM的初始宽度）
      if (colResizeConfigOption.minWidth < clientWidth + pageX - colResizeOffsetLeft) {
        colResizeConfigOption.colResizeWidth = pageX - colResizeOffsetLeft;
        el.style.transform = `translateX(${colResizeConfigOption.colResizeWidth}px)`;
      }
    }

    function enableDocumentMouseEnterHandle(this: HTMLElement) {
      genrateLineHandle.call(this);
      const { left } = this.getBoundingClientRect();
      colResizeConfigOption.colResizeOffsetLeft = left;
      document.documentElement.addEventListener("mousemove", moveLine);
      document.documentElement.addEventListener("mouseup", removeLineHandle);
    }

    onMounted(() => {
      const colResizeElement = colResizeNode.value;
      const containerElement = containerNode.value;
      if (colResizeElement && containerElement) {
        const { clientWidth } = containerElement;
        colResizeConfigOption.minWidth = clientWidth;
        colResizeConfigOption.modifyWidth = clientWidth;
        colResizeElement.addEventListener("mousedown", enableDocumentMouseEnterHandle);
      }
    });

    onUnmounted(() => {
      if (colResizeNode.value) colResizeNode.value.removeEventListener("mousedown", enableDocumentMouseEnterHandle);
    });

    return {
      colResizeNode,
      containerNode,
    };
  }
});

</script>

<style lang="scss">
.line {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  border: 2px solid orange;
}

body {
  padding: 10px 30px;
}

main {
  display: flex;
  justify-content: space-between;
  margin: 100px 0;

  .another {
    flex: 0.95;
    background-color: #2970ff;
  }
}

.box {
  position: relative;
  width: 300px;
  height: 300px;
  border: 2px solid orange;
  transition: all 0.25s;
  // background-color: #2970ff;

  .col-resize {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    width: 5px;
    z-index: 1;
    // background-color: #2970ff;
    cursor: col-resize;
  }
}
</style>

