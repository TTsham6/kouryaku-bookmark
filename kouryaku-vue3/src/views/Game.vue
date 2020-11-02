// ゲームページ
<template>
  <div class="home">
    <Header />
    <BookmarkContainer />
    <Footer />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Header from "../components/Header.vue";
import BookmarkContainer from "../components/game/BookmarkContainer.vue";
import Footer from "../components/Footer.vue";

export default defineComponent({
  name: "Game",
  components: {
    Header,
    BookmarkContainer,
    Footer
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
