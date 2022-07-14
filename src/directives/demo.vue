<template>
  <div
    v-focus="{ minWidth: 300, maxWidth: 'auto', ruleColor: 'red' }"
    class="container"
  ></div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

type DragColumnValue = {
    
    // 目标容器最小可调整的宽度， 默认是容器节点的计算后的样式宽度
    minWidth: number;

    // 目标容器最大可调整的宽度， 默认最大调整的阈值是DOM节点的父宽度
    // 注意，如果目标容器有兄弟节点，如果调整到最大宽度为父级宽度，可能会影响其他兄弟节点布局样式
    // 而且不一定会成功设置成父级等宽，具体实际宽度受css布局影响。
    maxWidth: number; 

}

export default defineComponent({
    name: "App",
    directives: {
        focus: {
            mounted(el, binding) {
                const whiteList = ["relative", "absolute", "sticky", "fixed"];
                if (!whiteList.includes(window.getComputedStyle(el, null).position)) el.style.position = "relative";

                const colResizeNode = document.createElement("div");
                colResizeNode.classList.add("col-resize");
                el.append(colResizeNode);


                const colResizeConfigOption = {
                    modifyWidth: 0,
                    minWidth: 0,
                    colResizeOffsetLeft: 0,
                    colResizeWidth: 0,
                };

                const { clientWidth } = el;

                colResizeConfigOption.minWidth = clientWidth;
                colResizeConfigOption.modifyWidth = clientWidth;
                colResizeNode.addEventListener("mousedown", enableDocumentMouseEnterHandle);

                function enableDocumentMouseEnterHandle(this: typeof colResizeNode) {
                    genrateLineHandle.call(this); // TODO 待验证
                    const { left } = this.getBoundingClientRect();
                    colResizeConfigOption.colResizeOffsetLeft = left;
                    document.documentElement.addEventListener("mousemove", moveLine);
                    document.documentElement.addEventListener("mouseup", removeLineHandle);
                }

                let ruleNode: HTMLElement;
                function genrateLineHandle(this: typeof colResizeNode) {
                    ruleNode = document.createElement("div");
                    ruleNode.classList.add("col-ruler");
                    this.append(ruleNode);
                }

                function moveLine(evt: Event) {
                    const mouseEvt = evt as MouseEvent;
                    const pageX = mouseEvt.pageX;
                    const { modifyWidth: clientWidth, colResizeOffsetLeft } = colResizeConfigOption;

                    if (colResizeConfigOption.minWidth < clientWidth + pageX - colResizeOffsetLeft) {
                        colResizeConfigOption.colResizeWidth = pageX - colResizeOffsetLeft;
                        ruleNode.style.transform = `translateX(${colResizeConfigOption.colResizeWidth}px)`;
                    }
                }

                function removeLineHandle() {
                    if (ruleNode) {
                        const { colResizeWidth, modifyWidth } = colResizeConfigOption;
                        el.style.width = modifyWidth + colResizeWidth + "px";
                        colResizeConfigOption.modifyWidth = modifyWidth + colResizeWidth;
                        ruleNode.remove();
                    }

                    colResizeConfigOption.colResizeWidth = 0;
                    document.documentElement.removeEventListener("mousemove", moveLine);
                    document.documentElement.removeEventListener("mouseup", removeLineHandle);
                }
            }
        }
    },
    setup() {
        console.log("app vue has been created");
        const msg = "312";
        return {
            msg
        };
    }
});
</script>

<style>
.container {
    width: 300px;
    height: 300px;
    border: 2px solid red;
    transition: 0.3s linear;
}

.col-resize {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    width: 5px;
    z-index: 1;
    cursor: col-resize;
}

.col-ruler {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: 1px;
    background: red;
}
</style>