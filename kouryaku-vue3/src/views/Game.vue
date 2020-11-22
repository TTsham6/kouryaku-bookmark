// ゲームページ
<template>
  <div class="home">
    <Header />
    <BookmarkContainer />
    <Footer />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, watch } from "vue";
import Header from "../components/Header.vue";
import BookmarkContainer from "../components/game/BookmarkContainer.vue";
import Footer from "../components/Footer.vue";
import store from "../store";
import router from "../router";

export default defineComponent({
  name: "Game",
  components: {
    Header,
    BookmarkContainer,
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
