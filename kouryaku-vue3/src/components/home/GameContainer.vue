// ゲームコンテナ
<template>
  <div class="game container-fluid bg-1 text-center">
    <div class="game__title">
      <p>ゲーム一覧</p>
    </div>
    <div class="game__create-button">
      <button type="button" class="custom-button" @click="openModal">
        ゲームページを作成
      </button>
    </div>

    <!-- 新規作成モーダル -->
    <modal-template @close="closeModal" v-if="state.showCreateModal">
      <template v-slot:body>
        <p>新規ゲーム作成</p>
        <input
          type="text"
          v-model="state.newGameName"
          placeholder="ゲーム名を入力"
        />
      </template>
      <template v-slot:footer>
        <button class="custom-button" @click="createGame">送信</button>
        <button class="custom-button" @click="closeModal">閉じる</button>
      </template>
    </modal-template>
    <!-- モーダルここまで -->

    <!-- ゲームページ一覧 -->
    <div class="game__list">
      <ul>
        <li v-for="gameItem in state.gameList" :key="gameItem.id">
          <GameItem
            :game="gameItem"
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
import { computed, defineComponent, reactive, watch } from "vue";
import { GameData } from "../../types/type";
import ModalTemplate from "../ModalTemplate.vue";
import GameItem from "./GameItem.vue";
import store from "../../store/index";
import {
  getGamesApi,
  createGameApi,
  updateGameApi,
  deleteGameApi
} from "../../api/game-api";

export default defineComponent({
  components: {
    ModalTemplate,
    GameItem
  },
  setup() {
    /** テストデータ */
    const testData1: GameData = {
      id: 1,
      user_id: 1,
      game_name: "hoge"
    };

    const userId = store.getters.getUserId;
    const token = store.getters.getToken;

    const state = reactive<{
      gameList: GameData[];
      newGameName: string;
      showCreateModal: boolean;
    }>({
      gameList: [testData1],
      newGameName: "",
      showCreateModal: false
    });

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
        const newGame: GameData = {
          user_id: userId,
          game_name: state.newGameName
        };
        createGameApi(newGame)
          .then(res => state.gameList.unshift(res.data.data))
          .catch(err => err);
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
      updateGameApi(targetGame)
        .then(res => {
          const updatedGame = res.data.data;
          // リスト内のゲームを探索し、対象アイテムを更新する
          state.gameList = state.gameList.map(game => {
            if (game.id === updatedGame.id) {
              // IDが一致するアイテムを更新する
              return updatedGame;
            }
            return game;
          });
        })
        .catch(err => err);
    };

    /**
     * ゲームを削除する
     * @param {GameData} targetGame
     */
    const deleteGame = (targetGame: GameData) => {
      deleteGameApi(targetGame)
        .then(res => {
          const deletedGame = res.data.data;
          // リスト内を探索し、対象ゲームを削除する
          state.gameList = state.gameList.filter(game => {
            // IDが一致するアイテムを除外する
            return game.id !== deletedGame.id;
          });
        })
        .catch(err => err);
    };

    // 初期表示時の処理
    getGamesApi(userId, token)
      .then(res => (state.gameList = res.data.data))
      .catch(err => err);

    return {
      state,
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
@import url("../../styles/styles.scss");

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
    border-radius: 0 15px 15px 0;
    padding: 1em;
    list-style-type: none;
    text-align: left;
    font-size: 20px;
  }
}
</style>
