// ヘッダー
<template>
  <header class="header">
    <div>攻略ブックマーク</div>
  </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Header"
});
</script>

<style lang="scss">
.header {
  height: 100px;
  text-align: center;
  vertical-align: middle;
  background-color: gray;
  font-size: 40px;
  color: #f5f5f5;
}

.header div {
  line-height: 100px;
}
</style>
