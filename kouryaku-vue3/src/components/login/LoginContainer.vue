// ログイン画面メインコンテンツ
<template>
  <div class="login-body container-fluid bg-1 text-center">
    <div class="login-body__content">
      <h3>ユーザーログイン</h3>
      <!-- Eメール入力欄 -->
      <div class="field">
        <div class="control">
          <input
            v-model="state.email"
            class="input is-large"
            type="email"
            placeholder="Eメール"
            autofocus=""
            name="email"
          />
        </div>
      </div>
      <!-- パスワード入力欄 -->
      <div class="field">
        <div class="control">
          <input
            v-model="state.password"
            class="input is-large"
            type="password"
            placeholder="パスワード"
            maxlength="20"
            name="password"
          />
        </div>
      </div>
      <!-- ログインボタン -->
      <button
        class="button is-block"
        @click="doLogin(state.email, state.password)"
      >
        ログイン
      </button>
      <button @click="router.push({ name: 'registUser' })">
        ユーザー登録
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, watch } from "vue";
import store from "../../store";
import { useRouter } from "vue-router";

export default defineComponent({
  setup() {
    const state = reactive<{
      email: string;
      password: string;
    }>({
      email: "",
      password: ""
    });

    const router = useRouter();

    /** ログインを実行する */
    const doLogin = (email: string, password: string) => {
      store.dispatch("fetchAuth", { email, password });
    };

    /** */
    const toRegistUser = () => router.push({ name: "regist-user" });

    return {
      state,
      doLogin,
      router
    };
  }
});
</script>

<style lang="scss">
.login-body {
  flex: 1;
  text-align: center;
  margin: auto;
  width: 80%;

  &__content {
    margin-top: 15%;

    .field {
      margin: 10px;
    }

    button {
      margin: 5px;
    }
  }
}
</style>
