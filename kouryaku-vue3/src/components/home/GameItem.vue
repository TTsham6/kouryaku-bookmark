<template>
  <div class="game">
    <div class="game__name">
      <router-link
        :to="{
          name: 'Game',
          params: {
            game_id: game.id
          },
          query: {
            name: game.game_name
          }
        }"
        ><span>{{ game.game_name }}</span></router-link
      >
    </div>
    <div class="game__button-area">
      <button type="button" class="custom-button" @click="openModal">
        編集
      </button>
      <button type="button" class="custom-button" @click="deleteGame">
        削除
      </button>
    </div>
    <!-- ゲーム編集モーダル -->
    <modal-template @close="closeModal" v-if="state.showUpdateModal">
      <template v-slot:body>
        <p>ゲーム編集</p>
        <input
          type="text"
          v-model="state.newGameName"
          placeholder="ゲーム名を入力"
        />
      </template>
      <template v-slot:footer>
        <button class="custom-button" @click="updateGame">送信</button>
        <button class="custom-button" @click="closeModal">閉じる</button>
      </template>
    </modal-template>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  PropType,
  reactive,
  SetupContext
} from "vue";
import { GameData } from "../../types/type";
import ModalTemplate from "../ModalTemplate.vue";

type Props = {
  game: GameData;
};

export default defineComponent({
  components: {
    ModalTemplate
  },
  props: {
    game: {
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
      const newGame: GameData = {
        id: props.game.id,
        user_id: props.game.user_id,
        game_name: state.newGameName
      };
      context.emit("update-game", newGame);
      closeModal();
    };

    /** ゲームデータを削除する */
    const deleteGame = () => {
      context.emit("delete-game", props.game);
    };

    return {
      state,
      openModal,
      closeModal,
      updateGame,
      deleteGame
    };
  }
});
</script>

<style lang="scss">
@import url("../../styles/styles.scss");

.game {
  &__name {
    text-align: left;
    float: left;
    font-size: 25px;
  }

  &__button-area {
    text-align: right;
  }
}
</style>
