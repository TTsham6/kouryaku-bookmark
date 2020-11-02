// ゲーム追加モーダル
<template>
  <transition name="modal" appear>
    <div class="modal modal__overlay" @click="$emit('close')">
      <div class="modal__window">
        <div class="modal__content">
          <slot />
        </div>
        <footer class="modal__footer">
          <slot name="footer">
            <button @click="$emit('close')">閉じる</button>
          </slot>
        </footer>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";

type Props = {
  userId: number;
  showModal: boolean;
};

export default defineComponent({
  props: {
    userId: {
      type: Number,
      required: true,
      default: 0
    },
    showModal: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  setup(props: Props) {
    console.log(props);
    const state = reactive({ gameName: "" });

    /** ゲームを作成する */
    const createGame = (gameName: string) => {
      console.log(props.userId);
      return gameName;
    };

    /** モーダル画面を閉じる */
    const closeModal = (e: Event) => {
      e.stopPropagation();
    };

    return {
      isShowModal: props.showModal,
      state,
      createGame,
      closeModal
    };
  }
});
</script>

<style lang="scss">
.modal {
  &__overlay {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    z-index: 30;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
  }

  &__window {
    background: white;
    border-radius: 4px;
    overflow: hidden;
  }

  &__content {
    padding: 10px 20px;
  }

  &__footer {
    background: #ccc;
    padding: 10px;
    text-align: right;
  }
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.4s;

  .modal__window {
    transition: opacity 0.4s, transform 0.4s;
  }
}

.modal-leave-active {
  transition: opacity 0.6s, ease 0.4s;
}

.modal-enter,
.modal-leave-to {
  opacity: 0;

  .modal__window {
    opacity: 0;
    transform: translateY(-20px);
  }
}
</style>
