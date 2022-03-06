import type { Directive, DirectiveBinding } from "vue";

const vDragColumn: Directive<HTMLElement, DirectiveBinding> = {
    mounted (element, binding: DirectiveBinding) {
        // binding.value; 

        // 1. element 表示指令绑定的节点，如果是组件，就是该组件的根节点，如果组件有多根，则指令被忽略
        // 2. 将节点的
    },
};