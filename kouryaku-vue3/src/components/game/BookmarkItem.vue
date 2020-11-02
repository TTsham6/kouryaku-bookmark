// ブックマークアイテム
<template>
  <div class="bookmark">
    <a :href="url" target="_blank">
      <span class="bookmark__name">{{ bookmarkName }}</span>
    </a>
    <div class="bookmark__button-area">
      <button
        type="button"
        class="bookmark__button btn-outline-primary"
        @click="openModal"
      >
        編集
      </button>
      <button
        type="button"
        class="bookmark__button btn-outline-primary"
        @click="deleteBookmark"
      >
        削除
      </button>
    </div>

    <!-- ブックマーク編集モーダル -->
    <modal-template @close="closeModal" v-if="state.showUpdateModal">
      <template v-slot:body>
        <p>ブックマーク編集</p>
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
        <button @click="updateBookmark">送信</button>
        <button @click="closeModal">閉じる</button>
      </template>
    </modal-template>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive, SetupContext } from "vue";
import { BookmarkData } from "../../types/bookmark";
import ModalTemplate from "../ModalTemplate.vue";

type Props = {
  bookmarkData: BookmarkData;
};

export default defineComponent({
  components: {
    ModalTemplate
  },
  props: {
    bookmarkData: {
      type: Object as PropType<BookmarkData>,
      required: true
    }
  },
  setup(props: Props, context: SetupContext) {
    const state = reactive<{
      showUpdateModal: boolean;
      newBookmarkName: string;
      newUrl: string;
    }>({
      showUpdateModal: false,
      newBookmarkName: "",
      newUrl: ""
    });

    /** ゲーム編集モーダルを開く */
    const openModal = () => {
      state.showUpdateModal = true;
    };

    /** ゲーム編集モーダルを閉じる */
    const closeModal = () => {
      state.showUpdateModal = false;
    };

    /** ブックマークを編集する */
    const updateBookmark = () => {
      context.emit("update-bookmark", props.bookmarkData);
      closeModal();
    };

    /** ブックマークを削除する */
    const deleteBookmark = () => {
      context.emit("delete-bookmark", props.bookmarkData);
    };

    return {
      state,
      bookmarkId: props.bookmarkData.bookmarkId,
      bookmarkName: props.bookmarkData.bookmarkName,
      url: props.bookmarkData.url,
      openModal,
      closeModal,
      updateBookmark,
      deleteBookmark
    };
  }
});
</script>

<style lang="scss">
.bookmark {
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
