import type { Directive, DirectiveBinding } from "vue";
import style from "./v-drag-column.module.scss";
import { isObject } from "lodash-es";
import { generateNanoId } from "@/utils/nano";

type DragProps = {
    // 目标容器最小可调整的宽度， 默认是容器节点的计算后的样式宽度
    minWidth: number;
    // 目标容器最大可调整的宽度， 默认值是表示最大调整的阈值是DOM节点的父宽度
    // 注意，如果目标容器有兄弟节点，如果调整到最大宽度为父级宽度，可能会影响其他兄弟节点布局样式
    // 而且不一定会成功设置成父级等宽，具体实际宽度受css布局影响。
    maxWidth: number; 

}

export const vDragColumn: Directive<HTMLElement> = {
    mounted(el, binding: DirectiveBinding<DragProps>) {
        const props = isObject(binding.value) ? binding.value : {  } as DragProps;
        const positionPropertyWhiteList = ["relative", "absolute", "sticky", "fixed"];
        if (!positionPropertyWhiteList.includes(window.getComputedStyle(el, null).position)) el.style.position = "relative";

        const colResizeNode = document.createElement("div");
        colResizeNode.classList.add(style["col-resize"]);
        colResizeNode.setAttribute("data-colKey", generateNanoId());
        el.append(colResizeNode);

        const colResizeConfigOption = {
            modifyWidth: 0,
            minWidth: 0,
            maxWidth: 0,
            colResizeOffsetLeft: 0,
            colResizeWidth: 0,
        };

        const { clientWidth } = el;

        Object.assign(colResizeConfigOption, {
            minWidth: props.minWidth || clientWidth,
            maxWidth: props.maxWidth || el.parentElement?.clientWidth || clientWidth,
            modifyWidth: clientWidth,
        });

        colResizeConfigOption.minWidth = props.minWidth || clientWidth;
        colResizeConfigOption.modifyWidth = clientWidth;
        colResizeNode.addEventListener("mousedown", enableDocumentMouseEnterHandle);

        function enableDocumentMouseEnterHandle(this: typeof colResizeNode) {
            genrateLineHandle.call(this);
            const { left } = this.getBoundingClientRect();
            colResizeConfigOption.colResizeOffsetLeft = left;
            document.documentElement.addEventListener("mousemove", moveLine);
            document.documentElement.addEventListener("mouseup", removeLineHandle);
        }

        let ruleNode: HTMLElement;
        function genrateLineHandle(this: typeof colResizeNode) {
            ruleNode = document.createElement("div");
            ruleNode.classList.add(style["rule-line"]);
            this.append(ruleNode);
        }

        function moveLine(evt: Event) {
            const mouseEvt = evt as MouseEvent;
            const pageX = mouseEvt.pageX;
            const { modifyWidth: clientWidth, colResizeOffsetLeft } = colResizeConfigOption;

            const currentPosition = pageX - colResizeOffsetLeft;
            const willUpdateWidth = clientWidth + currentPosition;
            // 往左拖动，只需要关注拖动的距离是否小于minWidth， 往右拖动， 只需要关注拖动的距离是否大于maxWidth
            if (colResizeConfigOption.minWidth < willUpdateWidth && willUpdateWidth <= colResizeConfigOption.maxWidth) {
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
    },
    unmounted (el) {
        const children = el.children;
        for (let idx = 0; idx < children.length; idx++) {
            const child = children[idx];
            if (child.getAttribute("data-colKey")) el.removeChild(child);
        }
    }
};
