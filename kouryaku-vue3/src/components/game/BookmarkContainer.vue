// ブックマークコンテナ
<template>
  <div class="bookmark container-fluid bg-1 text-center">
    <div class="bookmark__gamename">
      <p>{{ state.gameName }}</p>
    </div>
    <div class="bookmark__back-home">
      <router-link :to="{ name: 'Home' }" :tag="button"
        >ゲーム一覧に戻る</router-link
      >
    </div>
    <div class="bookmark__create-button">
      <button type="button" class="btn-primary" @click="openModal">
        ブックマークを作成
      </button>
    </div>
    <!-- モーダル -->
    <modal-template v-if="state.showCreateModal" @close="closeModal">
      <template #body>
        <p>ブックマーク作成</p>
        <div>
          <input
            v-model="state.newBookmarkName"
            type="text"
            placeholder="ブックマーク名を入力"
          />
        </div>
        <div>
          <input v-model="state.newUrl" type="text" placeholder="URLを入力" />
        </div>
      </template>
      <template #footer>
        <button class="custom-button" @click="createBookmark">送信</button>
        <button class="custom-button" @click="closeModal">閉じる</button>
      </template>
    </modal-template>

    <!-- ブックマークリスト -->
    <div class="bookmark__list">
      <ul>
        <li
          v-for="bookmarkItem of state.bookmarkList"
          :key="bookmarkItem.bookmarkId"
        >
          <bookmark-item
            :bookmark="bookmarkItem"
            @update-bookmark="updateBookmark"
            @delete-bookmark="deleteBookmark"
          />
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import { useRoute } from "vue-router";
import { BookmarkData } from "../../types/type";
import ModalTemplate from "../ModalTemplate.vue";
import BookmarkItem from "./BookmarkItem.vue";
import { Method } from "axios";
import router from "@/router";
import { createApi, deleteApi, indexApi, updateApi } from "@/api";

export default defineComponent({
  components: {
    ModalTemplate,
    BookmarkItem
  },
  setup() {
    /** URLからパラメータ読み込み */
    const {
      params: { game_id },
      query: { name }
    } = useRoute();

    /** state */
    const state = reactive<{
      bookmarkList: BookmarkData[];
      newBookmarkName: string;
      newUrl: string;
      showCreateModal: boolean;
      gameId: number;
      gameName: string;
    }>({
      bookmarkList: [],
      newBookmarkName: "",
      newUrl: "",
      showCreateModal: false,
      gameId: Number(game_id),
      gameName: String(name)
    });

    // モーダル画面操作関数

    /** ブックマーク作成モーダルを開く */
    const openModal = () => {
      state.showCreateModal = true;
    };

    /** ブックマーク作成モーダルを閉じる */
    const closeModal = () => {
      state.showCreateModal = false;
    };

    // APIアクセス関数

    /**
     * APIへのリクエストメイン処理
     * @param {Method} method
     * @param {BookmarkData} data
     */
    const execRequest = async (method: Method, data?: BookmarkData) => {
      const bookmarkUrl = "bookmarks";
      try {
        // リクエストの種類によって呼び出すAPIを分岐
        if (method === "GET") {
          // ブッマークリスト取得
          const params = {
            game_id: String(state.gameId)
          };
          const result = await indexApi(bookmarkUrl, params);
          state.bookmarkList = result.data as BookmarkData[];
        } else if (method === "POST" && data) {
          // ブックマーク新規作成
          const result = await createApi(bookmarkUrl, data);
          const newBookmark = result.data as BookmarkData;
          state.bookmarkList.unshift(newBookmark);
        } else if (method === "PUT" && data) {
          // ブックマーク更新
          const result = await updateApi(bookmarkUrl, data);
          const updatedBookmark = result.data as BookmarkData;
          // リスト内のブックマークを探索し、対象アイテムを更新する
          state.bookmarkList = state.bookmarkList.map(
            (bookmark: BookmarkData) => {
              if (bookmark.id === updatedBookmark.id) {
                // IDが一致するアイテムを更新する
                return updatedBookmark;
              }
              return bookmark;
            }
          );
        } else if (method === "DELETE" && data) {
          // ブックマーク削除
          const result = await deleteApi(bookmarkUrl, data);
          const deletedBookmark = result.data as BookmarkData;
          // リスト内を探索し、対象アイテムを削除する
          state.bookmarkList = state.bookmarkList.filter(bookmark => {
            // IDが一致するアイテムを除外する
            return bookmark.id !== deletedBookmark.id;
          });
        }
      } catch (e) {
        // 共通エラー処理
        if (e.status && e.status === 401) {
          // 認証エラーの場合、ログイン画面に遷移する
          console.log(e.message);
          await router.push("/login");
        } else if (e.status) {
          console.log(e.message);
        } else {
          console.log(e.message);
        }
      }
    };

    /** ブックマークを新規作成する */
    const createBookmark = () => {
      if (state.newBookmarkName.length <= 0) {
        alert("ブックマーク名を入力してください");
      } else if (state.newUrl.length <= 0) {
        alert("URLを入力してください");
      } else {
        const newBookmark: BookmarkData = {
          game_id: state.gameId,
          bookmark_name: state.newBookmarkName,
          url: state.newUrl
        };
        execRequest("POST", newBookmark);
        closeModal();
      }
    };

    /**
     * ブックマークを更新する
     * @param {BookmarkData} targetBookmark
     */
    const updateBookmark = (targetBookmark: BookmarkData) =>
      execRequest("PUT", targetBookmark);

    /**
     * ブックマークを削除する
     * @param {BookmarkData} targetBookmark
     */
    const deleteBookmark = (targetBookmark: BookmarkData) =>
      execRequest("DELETE", targetBookmark);

    // 初期表示時にブックマークリストの取得を実行
    execRequest("GET");

    return {
      state,
      openModal,
      closeModal,
      createBookmark,
      updateBookmark,
      deleteBookmark
    };
  }
});
</script>

<style lang="scss">
@import url("../../styles/styles.scss");

.bookmark {
  flex: 1;
  text-align: center;
  margin: auto;
  width: 80%;

  &__gamename {
    text-align: center;
    height: 50px;
  }

  &__gamename p {
    font-size: 30px;
  }

  &__create-button {
    height: 50px;
    text-align: left;

    button {
      padding: 5px;
      text-decoration: none;
      background: #668ad8;
      color: #ffffff;
      border-bottom: solid 4px #627295;
      border-radius: 3px;
    }
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
    border-left: solid 8px lightseagreen; /*左側の線*/
    margin-bottom: 20px;
    border-radius: 0 15px 15px 0;
    padding: 1em;
    list-style-type: none;
    text-align: left;
    font-size: 20px;
  }
}
</style>
