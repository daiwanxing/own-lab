import type { Directive, DirectiveBinding } from "vue";
import style from "./v-drag-column.module.scss";
import { isObject } from "lodash-es";
import { generateNanoId } from "@/utils/nano";

type DragProps = {
    // 目标容器最小可调整到的宽度， 默认是容器节点的计算后的宽度
    minWidth: number;
    // 目标容器最大可调整到的宽度（受父容器的CSS布局影响，不一定能成功设置到指定的最大宽度）
    maxWidth: number; 
    // 标线的颜色
    indexColor: string;
}

export const vDragColumn: Directive<HTMLElement & { colResizeHandler?: ((this: HTMLDivElement , evt: Event) => void) | null }> = {
    mounted(el , binding: DirectiveBinding<DragProps>) {
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
        // 只是便于解绑事件，而不得已为之的操作...
        el.colResizeHandler = enableDocumentMouseEnterHandle;

        function enableDocumentMouseEnterHandle(this: typeof colResizeNode) {
            genrateIndexLine.call(this);
            const { left } = this.getBoundingClientRect();
            colResizeConfigOption.colResizeOffsetLeft = left;
            document.documentElement.addEventListener("mousemove", moveIndexLine);
            document.documentElement.addEventListener("mouseup", removeIndexLine);
        }

        let indexLineNode: HTMLElement; // 标线的dom节点
        function genrateIndexLine(this: typeof colResizeNode) {
            indexLineNode = document.createElement("div");
            indexLineNode.classList.add(style["index-line"]);
            if (props.indexColor) indexLineNode.style.backgroundColor = props.indexColor;
            this.append(indexLineNode);
        }

        function moveIndexLine(evt: Event) {
            const mouseEvt = evt as MouseEvent;
            const pageX = mouseEvt.pageX;
            const { modifyWidth: clientWidth, colResizeOffsetLeft } = colResizeConfigOption;

            const currentPosition = pageX - colResizeOffsetLeft;
            const willUpdateWidth = clientWidth + currentPosition;
            // 往左拖动，只需要关注拖动的距离是否小于minWidth， 往右拖动， 只需要关注拖动的距离是否大于maxWidth
            if (colResizeConfigOption.minWidth < willUpdateWidth && willUpdateWidth <= colResizeConfigOption.maxWidth) {
                colResizeConfigOption.colResizeWidth = pageX - colResizeOffsetLeft;
                indexLineNode.style.transform = `translateX(${colResizeConfigOption.colResizeWidth}px)`;
            }
        }

        function removeIndexLine() {
            if (indexLineNode) {
                const { colResizeWidth, modifyWidth } = colResizeConfigOption;
                el.style.width = modifyWidth + colResizeWidth + "px";
                colResizeConfigOption.modifyWidth = modifyWidth + colResizeWidth;
                indexLineNode.remove();
            }

            colResizeConfigOption.colResizeWidth = 0;
            document.documentElement.removeEventListener("mousemove", moveIndexLine);
            document.documentElement.removeEventListener("mouseup", removeIndexLine);
        }
    },
    unmounted (el) {
        const children = el.children;
        const len = children.length;
        for (let idx = 0; idx < len; idx++) {
            const child = children[idx];
            if (child.getAttribute("data-colKey")) {
                el.removeEventListener("mousedown", el.colResizeHandler!);
                break;
            }
        }
        el.colResizeHandler = null;
    }
};
