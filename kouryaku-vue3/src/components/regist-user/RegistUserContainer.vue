// ユーザー作成コンテンツ
<template>
  <div class="regist-user container-fluid bg-1 text-center">
    <div class="regist-user__content">
      <!-- Eメール入力欄 -->
      <h3>ユーザー登録</h3>
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
import { createApi } from "@/api";
import { UserData } from "@/types/type";

export default defineComponent({
  setup() {
    const state = reactive<{ email: string; password: string }>({
      email: "",
      password: ""
    });

    // ユーザー登録する
    const registUser = async (email: string, password: string) => {
      const newUser: UserData = { email, password };
      try {
        const result = await createApi("users", newUser);
        if (result) {
          // ユーザー登録に成功したら、ログインを実行し、Storeにトークンを保存する
          await store.dispatch("fetchAuth", { email, password });
        }
      } catch (e) {
        console.log(e.message);
      }
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
