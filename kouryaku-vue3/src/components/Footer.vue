<template>
  <footer class="footer"></footer>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "Footer"
});
</script>

<style lang="scss">
.footer {
  height: 70px;
  text-align: center;
  vertical-align: middle;
  background-color: gray;
  font-size: 40px;
  color: #f5f5f5;
}
</style>
