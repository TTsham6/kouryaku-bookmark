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
    <modal-template @close="closeModal" v-if="state.showCreateModal">
      <template v-slot:body>
        <p>ブックマーク作成</p>
        <div>
          <input
            type="text"
            v-model="state.newBookmarkName"
            placeholder="ブックマーク名を入力"
          />
        </div>
        <div>
          <input type="text" v-model="state.newUrl" placeholder="URLを入力" />
        </div>
      </template>
      <template v-slot:footer>
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
import {
  getBookmarksApi,
  createBookmarkApi,
  updateBookmarkApi,
  deleteBookmarkApi
} from "../../api/bookmark-api";
import { BookmarkData } from "../../types/type";
import ModalTemplate from "../ModalTemplate.vue";
import BookmarkItem from "./BookmarkItem.vue";

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

    /** テストデータ */
    const testData: BookmarkData = {
      id: 1,
      game_id: 1,
      bookmark_name: "時の神殿攻略",
      url: "hoge.com"
    };

    /** state */
    const state = reactive<{
      bookmarkList: BookmarkData[];
      newBookmarkName: string;
      newUrl: string;
      showCreateModal: boolean;
      gameId: number;
      gameName: string;
    }>({
      bookmarkList: [testData],
      newBookmarkName: "",
      newUrl: "",
      showCreateModal: false,
      gameId: Number(game_id),
      gameName: String(name)
    });

    /** ブックマーク作成モーダルを開く */
    const openModal = () => {
      state.showCreateModal = true;
    };

    /** ブックマーク作成モーダルを閉じる */
    const closeModal = () => {
      state.showCreateModal = false;
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
        createBookmarkApi(newBookmark)
          .then(res => state.bookmarkList.unshift(res.data.data))
          .catch(err => err);
        closeModal();
      }
    };

    /**
     * ブックマークを更新する
     * @param {BookmarkData} targetBookmark
     */
    const updateBookmark = (targetBookmark: BookmarkData) => {
      updateBookmarkApi(targetBookmark)
        .then(res => {
          const updateBookmark = res.data.data;
          // リスト内のブックマークを探索し、対象アイテムを更新する
          state.bookmarkList = state.bookmarkList.map((bookmark:BookmarkData) => {
            if (bookmark.id === updateBookmark.id) {
              // IDが一致するアイテムを更新する
              return updateBookmark;
            }
            return bookmark;
          });
        })
        .catch(err => err);
    };

    /**
     * ブックマークを削除する
     * @param {BookmarkData} targetBookmark
     */
    const deleteBookmark = (targetBookmark: BookmarkData) => {
      deleteBookmarkApi(targetBookmark)
        .then(res => {
          const deletedBookmark = res.data.data;
          console.log(res);
          // リスト内を探索し、対象アイテムを削除する
          state.bookmarkList = state.bookmarkList.filter(bookmark => {
            // IDが一致するアイテムを除外する
            return bookmark.id !== deletedBookmark.id;
          });
        })
        .catch(err => err);
    };

    // 初期表示時の処理
    getBookmarksApi(state.gameId)
      .then(res => (state.bookmarkList = res.data.data))
      .catch(err => err);

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
