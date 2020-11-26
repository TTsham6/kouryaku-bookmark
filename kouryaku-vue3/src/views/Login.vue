// ログイン画面
<template>
  <div class="login">
    <Header />
    <LoginContainer />
    <Footer />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, watch } from "vue";
import Header from "../components/Header.vue";
import LoginContainer from "../components/login/LoginContainer.vue";
import Footer from "../components/Footer.vue";
import store from "../store";
import router from "../router";

export default defineComponent({
  name: "Login",
  components: {
    Header,
    LoginContainer,
    Footer
  }
});
</script>

<style lang="scss">
.login {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
