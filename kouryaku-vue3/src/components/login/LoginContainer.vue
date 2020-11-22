// ログイン画面メインコンテンツ
<template>
  <div class="login-body container-fluid bg-1 text-center">
    <!-- エラーメッセージ -->
    <!-- <article v-show="errorMessage" class="message is-warning">
        <div class="error-body">
          {{ $t(errorMessage) }}
        </div>
      </article> -->
    <div class="login-body__content">
      <h3>ユーザーログイン</h3>
      <!-- Eメール入力欄 -->
      <div class="field">
        <div class="control">
          <input
            class="input is-large"
            type="email"
            placeholder="Eメール"
            v-model="state.email"
            autofocus=""
            name="email"
          />
        </div>
      </div>
      <!-- パスワード入力欄 -->
      <div class="field">
        <div class="control">
          <input
            class="input is-large"
            type="password"
            placeholder="パスワード"
            v-model="state.password"
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
      <button @click="router.push({ name: 'regist-user' })">
        ユーザー登録
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, watch } from "vue";
import store from "../../store";
import router from "vue-router";

export default defineComponent({
  setup() {
    const state = reactive<{
      email: string;
      password: string;
    }>({
      email: "",
      password: ""
    });

    /** ログインを実行する */
    const doLogin = (email: string, password: string) => {
      store.dispatch("fetchAuth", { email, password });
    };

    return {
      state,
      doLogin
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
