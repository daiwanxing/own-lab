<template>
  <main>
    <div
      ref="containerNode"
      v-drag-column="{ minWidth: 300, maxWidth: 800 }"
      class="box"
    >
    </div>
    <div class="another"></div>
  </main>
</template>

<script lang="ts">
import "./index.scss";
import { defineComponent } from "vue";
import { vDragColumn } from "@/directives/v-drag-column";

export default defineComponent({
  name: "RootApp",
  directives: {
    dragColumn: vDragColumn
  },
  setup() {
    //
  }
});

</script>

<style lang="scss">
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
}
</style>

