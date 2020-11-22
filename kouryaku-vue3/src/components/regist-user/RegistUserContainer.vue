// ユーザー作成コンテンツ
<template>
  <div class="regist-user container-fluid bg-1 text-center">
    <div class="regist-user__content">
      <!-- Eメール入力欄 -->
      <h3>ユーザー登録</h3>
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
      <!-- ユーザー登録ボタン -->
      <button
        class="button is-block"
        @click="registUser(state.email, state.password)"
      >
        登録
      </button>
      <button @click="router.push({ name: 'login' })">
        ログイン画面に戻る
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import store from "../../store";
import { createUser } from "../../api/user-api";

export default defineComponent({
  setup() {
    const state = reactive<{ email: string; password: string }>({
      email: "",
      password: ""
    });

    // ユーザー登録する
    const registUser = (email: string, password: string) => {
      createUser({ email, password }).then(res => {
        // ユーザー登録に成功したら、ログインを実行し、Storeにトークンを保存する
        store.dispatch("fetchAuth", { email, password });
      });
    };

    return {
      state,
      registUser
    };
  }
});
</script>

<style lang="scss">
.regist-user {
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
