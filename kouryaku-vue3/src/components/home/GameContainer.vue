<template>
  <div class="game container-fluid bg-1 text-center">
    <div class="game__title">
      <p>ゲーム一覧</p>
    </div>
    <div class="game__create-button">
      <button type="button" class="btn-primary" @click="openModal">
        ゲームページを作成
      </button>
    </div>

    <!-- モーダル -->
    <modal-template @close="closeModal" v-if="state.showCreateModal">
      <template v-slot:body>
        <p>新規ゲーム作成</p>
        <div>
          <input
            type="text"
            v-model="state.newGameName"
            placeholder="ゲーム名を入力"
          />
        </div>
      </template>
      <template v-slot:footer>
        <button @click="createGame">送信</button>
        <button @click="closeModal">閉じる</button>
      </template>
    </modal-template>
    <!-- モーダルここまで -->

    <!-- ゲームページ一覧 -->
    <div class="game__list">
      <ul>
        <li v-for="gameItem of state.gameList" :key="gameItem.gameId">
          <game-item
            :game-data="gameItem"
            @update-game="updateGame"
            @deleteGame="deleteGame"
          />
        </li>
      </ul>
    </div>
    <!-- ゲームページ一覧ここまで -->
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import { GameData } from "../../types/game";
import ModalTemplate from "../ModalTemplate.vue";
import GameItem from "./GameItem.vue";

export default defineComponent({
  components: {
    ModalTemplate,
    GameItem
  },
  setup() {
    /** テストデータ */
    const testData1: GameData = {
      gameId: 1,
      userId: 1,
      gameName: "hoge"
    };

    const state = reactive<{
      gameList: GameData[];
      newGameName: string;
      showCreateModal: boolean;
    }>({
      gameList: [testData1],
      newGameName: "",
      showCreateModal: false
    });

    const userId = state.gameList[0].userId;

    /** ゲーム作成モーダルを開く */
    const openModal = () => {
      state.showCreateModal = true;
    };

    /** ゲーム作成モーダルを閉じる */
    const closeModal = () => {
      state.showCreateModal = false;
    };

    /** ゲームを新規作成する */
    const createGame = () => {
      if (state.newGameName.length > 0) {
        alert(state.newGameName);
        // TODO APIから新しいアイテムを取得する
        const newGame: GameData = {
          gameId: 12,
          gameName: "ゼルダの伝説ムジュラの仮面"
        };
        state.gameList.push(newGame);
        closeModal();
      } else {
        alert("メッセージを入力してください");
      }
    };

    /**
     * ゲームを更新する
     * @param {GameData} targetGame
     */
    const updateGame = (targetGame: GameData) => {
      console.log(targetGame);
      // TODO APIから更新済みのゲームを取得
      const updatedGame = targetGame;
      // リスト内のゲームを探索し、対象アイテムを更新する
      state.gameList = state.gameList.map(game => {
        if (game.gameId === updatedGame.gameId) {
          // IDが一致するアイテムを更新する
          return updatedGame;
        }
        return game;
      });
    };

    /**
     * ゲームを削除する
     * @param {GameData} targetGame
     */
    const deleteGame = (targetGame: GameData) => {
      // TODO APIから削除済みのゲームを取得
      const deletedGame = targetGame;
      // リスト内を探索し、対象ゲームを削除する
      state.gameList = state.gameList.filter(game => {
        // IDが一致するアイテムを除外する
        return game.gameId !== deletedGame.gameId;
      });
    };

    return {
      state,
      userId,
      openModal,
      closeModal,
      createGame,
      updateGame,
      deleteGame
    };
  }
});
</script>

<style lang="scss">
.game {
  flex: 1;
  text-align: center;
  margin: auto;
  width: 80%;

  &__title {
    text-align: center;
    height: 50px;
  }

  &__title p {
    font-size: 30px;
  }

  &__create-button {
    height: 50px;
    text-align: left;
  }

  &__list {
    display: flex;
    justify-content: center;
  }

  &__list ul {
    padding: 0;
    position: relative;
    width: 100%;
  }

  &__list ul li {
    width: 100%;
    color: black;
    background: #f5f5f5;
    border-left: solid 8px orange; /*左側の線*/
    margin-bottom: 20px;
    line-height: 2;
    border-radius: 0 15px 15px 0;
    padding: 1em;
    list-style-type: none;
    text-align: left;
    font-size: 20px;
  }
}
</style>
