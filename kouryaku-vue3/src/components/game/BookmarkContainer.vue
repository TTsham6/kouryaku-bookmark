// ブックマークコンテナ
<template>
  <div class="bookmark container-fluid bg-1 text-center">
    <div class="bookmark__gamename">
      <p>{{ gameName }}</p>
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
        <button @click="createBookmark">送信</button>
        <button @click="closeModal">閉じる</button>
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
            :bookmark-data="bookmarkItem"
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
import { BookmarkData } from "../../types/bookmark";
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
      params: { gameName }
    } = useRoute();

    /** テストデータ */
    const testData: BookmarkData = {
      bookmarkId: 1,
      gameId: 1,
      bookmarkName: "時の神殿攻略",
      url: "hoge.com"
    };

    /** state */
    const state = reactive<{
      bookmarkList: BookmarkData[];
      newBookmarkName: string;
      newUrl: string;
      showCreateModal: boolean;
    }>({
      bookmarkList: [testData],
      newBookmarkName: "",
      newUrl: "",
      showCreateModal: false
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
        // TODO APIから新しいアイテムを取得する
        const newBookmark: BookmarkData = {
          bookmarkId: 12,
          bookmarkName: "デスマウンテン攻略",
          url: "fuji.com"
        };
        state.bookmarkList.push(newBookmark);
        closeModal();
      }
    };

    /**
     * ブックマークを更新する
     * @param {BookmarkData} targetBookmark
     */
    const updateBookmark = (targetBookmark: BookmarkData) => {
      console.log(targetBookmark);
      // TODO APIから更新済みブックマークを取得
      const updatedBookmark = targetBookmark;
      // リスト内のブックマークを探索し、対象アイテムを更新する
      state.bookmarkList = state.bookmarkList.map(bookmark => {
        if (bookmark.bookmarkId === updatedBookmark.bookmarkId) {
          // IDが一致するアイテムを更新する
          return updatedBookmark;
        }
        return bookmark;
      });
    };

    /**
     * ブックマークを削除する
     * @param {BookmarkData} targetBookmark
     */
    const deleteBookmark = (targetBookmark: BookmarkData) => {
      // TODO APIから削除済みブックマークを取得
      const deletedBookmark = targetBookmark;
      // リスト内を探索し、対象アイテムを削除する
      state.bookmarkList = state.bookmarkList.filter(bookmark => {
        // IDが一致するアイテムを除外する
        return bookmark.bookmarkId !== deletedBookmark.bookmarkId;
      });
    };

    return {
      gameName,
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
