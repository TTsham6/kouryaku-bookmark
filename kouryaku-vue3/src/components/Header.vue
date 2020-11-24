// ヘッダー
<template>
  <header>
    <div class="content">
      <div></div>
      <h1 class="title">攻略ブックマーク</h1>
      <nav class="nav">
        <button type="button" @click="doLogout">ログアウト</button>
      </nav>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import store from "../store";

export default defineComponent({
  name: "Header",
  setup() {
    const doLogout = () => {
      store.dispatch("resetAuth");
    };

    return{
      doLogout
    }
  }
});
</script>

<style lang="scss">
header {
  display: flex;
  width: 100%;
  height: 100px;
  background-color: gray;

  .content {
    width: 100%;
    display: grid;
    grid-template-columns: 15% 70% 15%;

    .title {
      margin: auto;
      color: #f5f5f5;
    }

    .nav {
      margin: auto;
      padding: 10px;
    }
  }
}
</style>
