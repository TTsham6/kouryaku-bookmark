<template>
  <div class="game">
    <div class="game__name">
      <router-link
        :to="{
          name: 'Game',
          params: { user_id: userId, gameName: gameName }
        }"
        >{{ gameName }}</router-link
      >
    </div>
    <div class="game__button-area">
      <button
        type="game__button"
        class="button btn-outline-primary"
        @click="openModal"
      >
        編集
      </button>
      <button
        type="game__button"
        class="button btn-outline-primary"
        @click="deleteGame"
      >
        削除
      </button>
    </div>
    <!-- ゲーム編集モーダル -->
    <modal-template @close="closeModal" v-if="state.showUpdateModal">
      <template v-slot:body>
        <p>ゲーム編集</p>
        <div>
          <input
            type="text"
            v-model="state.newGameName"
            placeholder="ゲーム名を入力"
          />
        </div>
      </template>
      <template v-slot:footer>
        <button @click="updateGame">送信</button>
        <button @click="closeModal">閉じる</button>
      </template>
    </modal-template>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive, SetupContext } from "vue";
import { GameData } from "../../types/game";
import ModalTemplate from "../ModalTemplate.vue";

type Props = {
  gameData: GameData;
};

export default defineComponent({
  components: {
    ModalTemplate
  },
  props: {
    gameData: {
      type: Object as PropType<GameData>,
      required: true
    }
  },
  setup(props: Props, context: SetupContext) {
    const state = reactive<{ showUpdateModal: boolean; newGameName: string }>({
      showUpdateModal: false,
      newGameName: ""
    });

    /** ゲーム編集モーダルを開く */
    const openModal = () => {
      state.showUpdateModal = true;
    };

    /** ゲーム編集モーダルを閉じる */
    const closeModal = () => {
      state.showUpdateModal = false;
    };

    /** ゲームデータを編集する */
    const updateGame = () => {
      context.emit("update-game", props.gameData);
      closeModal();
    };

    /** ゲームデータを削除する */
    const deleteGame = () => {
      context.emit("delete-game", props.gameData);
    };

    return {
      state,
      gameId: props.gameData.gameId,
      userId: props.gameData.userId,
      gameName: props.gameData.gameName,
      openModal,
      closeModal,
      updateGame,
      deleteGame
    };
  }
});
</script>

<style lang="scss">
.game {
  &__name {
    text-align: left;
    float: left;
  }

  &__button-area {
    text-align: right;
  }

  &__button {
    margin: 5px;
    padding: 5px;
  }
}
</style>
