// ユーザー登録画面
<template>
  <div class="regist-user-body">
    <Header />
    <RegistUserContainer />
    <Footer />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, watch } from "vue";
import Header from "../components/Header.vue";
import RegistUserContainer from "../components/regist-user/RegistUserContainer.vue";
import Footer from "../components/Footer.vue";
import store from "../store";
import router from "../router";

export default defineComponent({
  name: "RegistUser",
  components: {
    Header,
    RegistUserContainer,
    Footer
  },
  setup() {
    // トークンの有無によってログイン状態を判定する
    const token = computed(() => store.getters.getToken);

    // トークン取得済みであれば、ホーム画面に遷移する
    watch(
      token,
      () => {
        if (token.value) {
          router.push("/home");
        }
      },
      // 初期表示時に処理を呼び出すためのオプション
      { immediate: true }
    );

    return { token };
  }
});
</script>

<style lang="scss">
.regist-user-body {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
