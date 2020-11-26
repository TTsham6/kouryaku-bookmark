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
    <modal-template v-if="state.showCreateModal" @close="closeModal">
      <template #body>
        <p>新規ゲーム作成</p>
        <input
          v-model="state.newGameName"
          type="text"
          placeholder="ゲーム名を入力"
        />
      </template>
      <template #footer>
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
import { defineComponent, reactive } from "vue";
import { GameData } from "../../types/type";
import ModalTemplate from "../ModalTemplate.vue";
import GameItem from "./GameItem.vue";
import store from "../../store/index";
import { useRouter } from "vue-router";
import { Method } from "axios";
import { createApi, deleteApi, indexApi, updateApi } from "@/api";

export default defineComponent({
  components: {
    ModalTemplate,
    GameItem
  },
  setup: function() {
    const state = reactive<{
      gameList: GameData[];
      newGameName: string;
      showCreateModal: boolean;
    }>({
      gameList: [],
      newGameName: "",
      showCreateModal: false
    });

    const router = useRouter();

    // モーダル画面操作関数

    /** ゲーム作成モーダルを開く */
    const openModal = () => {
      state.showCreateModal = true;
    };

    /** ゲーム作成モーダルを閉じる */
    const closeModal = () => {
      state.showCreateModal = false;
    };

    // APIリクエスト関数

    /**
     * APIへのリクエストメイン処理
     * @param {Method} method
     * @param {GameData} data
     */
    const execRequest = async (method: Method, data?: GameData) => {
      const gameUrl = "games";
      try {
        // リクエストの種類によって呼び出すAPIを分岐
        if (method === "GET") {
          // ゲームリスト取得
          const params = {
            user_id: String(store.getters.getUserId)
          };
          const result = await indexApi(gameUrl, params);
          state.gameList = result as GameData[];
        } else if (method === "POST" && data) {
          // ゲーム新規作成
          const result = await createApi(gameUrl, data);
          const newGame = result as GameData;
          state.gameList.unshift(newGame);
        } else if (method === "PUT" && data) {
          // ゲーム更新
          const result = await updateApi(gameUrl, data);
          const updatedGame = result as GameData;
          // リスト内のゲームを探索し、対象アイテムを更新する
          state.gameList = state.gameList.map(game => {
            if (game.id === updatedGame.id) {
              // IDが一致するアイテムを更新する
              return updatedGame;
            }
            return game;
          });
        } else if (method === "DELETE" && data) {
          // ゲーム削除
          const result = await deleteApi(gameUrl, data);
          const deletedGame = result as GameData;
          // リスト内を探索し、対象ゲームを削除する
          state.gameList = state.gameList.filter(game => {
            // IDが一致するアイテムを除外する
            return game.id !== deletedGame.id;
          });
        }
      } catch (e) {
        // 共通エラー処理
        if (e.status && e.status === 401) {
          // 認証エラーの場合、ログイン画面に遷移する
          console.log(e.message);
          await router.push({ name: "login" });
        } else if (e.status) {
          console.log(e.message);
        } else {
          console.log(e.message);
        }
      }
    };

    /**
     * ゲームを新規作成する
     */
    const createGame = () => {
      if (state.newGameName.length > 0) {
        const newGame: GameData = {
          user_id: store.getters.getUserId,
          game_name: state.newGameName
        };
        execRequest("POST", newGame);
        closeModal();
      } else {
        alert("メッセージを入力してください");
      }
    };

    /**
     * ゲームを更新する
     * @param {GameData} targetGame
     */
    const updateGame = (targetGame: GameData) => execRequest("PUT", targetGame);

    /**
     * ゲームを削除する
     * @param {GameData} targetGame
     */
    const deleteGame = (targetGame: GameData) =>
      execRequest("DELETE", targetGame);

    // 初期表示時にゲームリスト取得を実行
    execRequest("GET");

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
