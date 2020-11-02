// Homeページ
<template>
  <div class="home">
    <Header />
    <GameContainer />
    <Footer />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Header from "../components/Header.vue";
import GameContainer from "../components/home/GameContainer.vue";
import Footer from "../components/Footer.vue";

export default defineComponent({
  name: "Home",
  components: {
    Header,
    GameContainer,
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
