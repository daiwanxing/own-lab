import type { Ref } from "vue";
import { onBeforeUnmount, onMounted, ref, watch } from "vue";

type AnimateOption = {
    start: number; // 起点
    duration: number; // 过渡时长
    formatValue?: <T extends number>(val: T) => T | null; // 格式化方法
};

/**
 * 一个用于数字从起点过渡到终点的方法
 * @param target 终点值
 */
function useAnimateNumber(target: Ref<number>, animateOptions?: Partial<AnimateOption>): Ref<number> {
    const baseOpt: AnimateOption = {
        start: 0, // 起点
        duration: 1000, // 单位ms
    };

    if (animateOptions) Object.assign(baseOpt, animateOptions);

    let animateConfig = {
        isReverse: false,
        realFinalNum: 0,
        realStartNum: 0,
        stepByMillseconds: 0,
    };

    let timer: number;
    let cacluateTime = 0; // 初始⏲为0

    function setAnimateConfig() {
        cacluateTime = 0;
        if (timer) window.cancelAnimationFrame(timer);

        const isReverse = baseOpt.start > target.value;
        const realStartNum = isReverse ? target.value : baseOpt.start; // 32311
        const realFinalNum = isReverse ? baseOpt.start : target.value; // 2311
        console.log(realFinalNum, realStartNum);

        const stepByMillseconds = Math.abs(realStartNum - realFinalNum) / baseOpt.duration; // 步长
        console.log(stepByMillseconds);
        animateConfig =  {
            isReverse,
            realFinalNum,
            realStartNum,
            stepByMillseconds,
        };
    }


    const refTarget = ref(target.value);
    setAnimateConfig();

    function animeNumber(timeStamp: number) {
        if (!cacluateTime) cacluateTime = timeStamp;
        if (animateConfig.isReverse) {
            const current = (timeStamp - cacluateTime) * animateConfig.stepByMillseconds;
            refTarget.value = Math.round(Math.max(animateConfig.realFinalNum - current, animateConfig.realStartNum));
            console.log(refTarget.value);
        } else {
            refTarget.value = Math.round(Math.min((timeStamp - cacluateTime) * animateConfig.stepByMillseconds, animateConfig.realFinalNum));
        }
        if (animateOptions?.formatValue) animateOptions.formatValue(refTarget.value);

        if (timeStamp - cacluateTime >= baseOpt.duration) {
            window.cancelAnimationFrame(timer);
        } else {
            timer = window.requestAnimationFrame(animeNumber);
        }
    }

    onMounted(() => {
        if (baseOpt.duration > 0) timer = window.requestAnimationFrame(animeNumber);
    });

    onBeforeUnmount(() => {
        if (timer) window.cancelAnimationFrame(timer);
    });

    watch(
        () => target.value,
        (newVal, oldVal) => {
            baseOpt.start = oldVal;
            setAnimateConfig();
            timer = window.requestAnimationFrame(animeNumber);
        }
    );

    return refTarget;
}

export default useAnimateNumber;
