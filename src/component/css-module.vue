<template>
  <div class="fontBold">This is a simple page</div>
</template>

<script lang="ts">
import { useCssModule } from "vue";

export default {
    setup() {
        const cssModule = useCssModule();
        console.log(cssModule);
    }
};
</script>

<style>
.fontBold {
    font-weight: 700;
}

.borderNoraml {
    border: 2px solid #2970ff;
}

.textCenter {
    text-align: center;
}
</style>