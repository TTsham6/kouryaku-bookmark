<template>
  <div>
    <div class="modal" :aria-hidden="isOpen ? 'false' : 'true'">
      <div class="modal__content">
        <div class="modal__error-message"></div>
        <div class="modal__form">
          <textarea
            v-model="state.gameName"
            placeholder="ゲーム名を入力"
          ></textarea>
          <small :class="{ 'is-hide': validation.gameName }"></small>
        </div>
      </div>
      <div class="modal__holder">
        <button @click="createGame(state.gameName)"></button>
        <button @click="close()">閉じる</button>
      </div>
    </div>
    <button @click="open()">開く</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";

type Props = {
  userId: string;
};

export default defineComponent({
  setup(props: Props) {
    const state = reactive<{ gameName: string }>({ gameName: "" });

    /**
     * ゲーム作成
     */
    const createGame = (gameName: string) => {
      console.log(props.userId);
      return gameName;
    };

    const errorMessage = {
      gameName: "ゲーム名を入力してください"
    };

    return { state, createGame, errorMessage };
  }
});
</script>
