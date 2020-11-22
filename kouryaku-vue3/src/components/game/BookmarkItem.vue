// ブックマークアイテム
<template>
  <div class="bookmark">
    <a :href="bookmark.url" target="_blank">
      <span class="bookmark__name"
        ><u>{{ bookmark.bookmark_name }}</u></span
      >
    </a>
    <div class="bookmark__button-area">
      <button type="button" class="custom-button" @click="openModal">
        編集
      </button>
      <button type="button" class="custom-button" @click="deleteBookmark">
        削除
      </button>
    </div>

    <!-- ブックマーク編集モーダル -->
    <modal-template @close="closeModal" v-if="state.showUpdateModal">
      <template v-slot:body>
        <p>ブックマーク編集</p>
        <input
          type="text"
          v-model="state.newBookmarkName"
          placeholder="ブックマーク名を入力"
        />
        <input type="text" v-model="state.newUrl" placeholder="URLを入力" />
      </template>
      <template v-slot:footer>
        <button class="custom-button" @click="updateBookmark">送信</button>
        <button class="custom-button" @click="closeModal">閉じる</button>
      </template>
    </modal-template>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive, SetupContext } from "vue";
import { BookmarkData } from "../../types/type";
import ModalTemplate from "../ModalTemplate.vue";

type Props = {
  bookmark: BookmarkData;
};

export default defineComponent({
  components: {
    ModalTemplate
  },
  props: {
    bookmark: {
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
      // TODO 空白の場合のバリデーション
      const newBookmark: BookmarkData = {
        id: props.bookmark.id,
        game_id: props.bookmark.game_id,
        bookmark_name: state.newBookmarkName
          ? state.newBookmarkName
          : props.bookmark.bookmark_name,
        url: state.newUrl ? state.newUrl : props.bookmark.url
      };
      context.emit("update-bookmark", newBookmark);
      closeModal();
    };

    /** ブックマークを削除する */
    const deleteBookmark = () => {
      context.emit("delete-bookmark", props.bookmark);
    };

    return {
      state,
      openModal,
      closeModal,
      updateBookmark,
      deleteBookmark
    };
  }
});
</script>

<style lang="scss">
@import url("../../styles/styles.scss");

.bookmark {
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
