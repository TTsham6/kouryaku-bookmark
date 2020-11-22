// Homeページ
<template>
  <div class="home">
    <Header />
    <GameContainer />
    <Footer />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, watch } from "vue";
import Header from "../components/Header.vue";
import GameContainer from "../components/home/GameContainer.vue";
import Footer from "../components/Footer.vue";
import store from "../store";
import router from "../router";

export default defineComponent({
  name: "Home",
  components: {
    Header,
    GameContainer,
    Footer
  },
  setup() {
    // トークンの有無によってログイン状態を判定する
    const token = computed(() => store.getters.getToken);

    // トークンが無ければ、ログイン画面に遷移する
    watch(
      token,
      () => {
        if (!token.value) {
          console.log(token.value);
          router.push("/login");
        }
      },
      // トークン変更に加え、初期表示時に処理を呼び出すためのオプション
      { immediate: true }
    );

    return { token };
  }
});
</script>

<style lang="scss">
.home {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
