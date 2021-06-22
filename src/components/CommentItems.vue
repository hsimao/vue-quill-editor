<template>
  <div class="comment-items">
    <div class="comment-items__toggle" @click="toggle">
      <span>還有 {{ remainCount }} 則留言</span>
    </div>

    <transition-group name="list" tag="div">
      <div
        class="comment-item"
        move-class
        v-for="item in formatItems"
        v-bind:key="item.id"
      >
        <img :src="item.avatar" alt="" class="comment-item__avatar" />
        <div class="comment-item__container">
          <div class="comment-item__msg">
            <div class="comment-item__name">{{ item.username }}</div>
            <div class="comment-item__content">{{ item.content }}</div>
          </div>
          <div class="comment-item__date">{{ item.createAt }}</div>
        </div>

        <div class="comment-item__delete" @click="$emit('delete', item)">
          刪除
        </div>
      </div>
    </transition-group>

    <slot name="send" />
  </div>
</template>

<script>
export default {
  name: "CommentItems",
  props: {
    items: {
      type: Array,
      default: () => [],
    },
    // 預覽幾則留言
    previewCount: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      currentPreviewCount: this.previewCount || 3,
    };
  },
  computed: {
    formatItems() {
      return this.items.filter(
        (item, index) => index < this.currentPreviewCount
      );
    },
    remainCount() {
      return this.items.length - this.currentPreviewCount;
    },
  },
  methods: {
    toggle() {
      if (this.currentPreviewCount === this.items.length) {
        this.currentPreviewCount = this.previewCount;
      } else {
        this.currentPreviewCount = this.items.length;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.comment-items {
  padding: 20px;
  overflow: hidden;

  &__toggle {
    text-align: right;
    cursor: pointer;
  }

  .comment-item {
    display: flex;
    align-items: flex-start;
    margin: 12px;

    &__avatar {
      width: 36px;
      margin-right: 8px;
    }

    &__msg {
      border-radius: 10px;
      background-color: lighten(gray, 40);
      padding: 10px;
    }

    &__date {
      color: lighten(gray, 10);
      font-size: 14px;
    }

    &__delete {
      flex-shrink: 0;
      align-self: center;
      margin-left: 12px;
    }
  }
}

.flip-list-move {
  transition: transform 10s;
}

.list-item {
  display: inline-block;
  margin-right: 10px;
}
.list-enter-active,
.list-leave-active {
  transition: all 0.6s;
}
.list-enter, .list-leave-to
/* .list-leave-active for below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(-30px);
}
</style>
