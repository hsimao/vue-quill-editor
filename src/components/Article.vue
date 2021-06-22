<template>
  <div class="article">
    <img class="article__avatar" v-if="article.avatar" :src="article.avatar" />
    <div class="article__right">
      <div class="article__head" v-if="showHead">
        <h1 class="article__title">
          「{{ article.topic }}」 {{ article.title }}
        </h1>
        <div class="article__action">
          <button @click="$emit('edit', article)">編輯</button>
          <button @click="$emit('delete', article)">刪除</button>
        </div>
      </div>

      <div class="article__info">
        <div class="article__row">
          <span class="article__floor">{{ formatFloor }}</span>
          <span class="article__username">{{ article.author }}</span>
        </div>
        <div class="article__row">
          <span class="article__date">{{ article.createAt }}</span>
          <template v-if="showTag">
            <span
              class="article__tag"
              v-for="(tag, index) in article.tags"
              :key="index"
              @click="$emit('tag', tag)"
            >
              #{{ tag }}
            </span>
          </template>
        </div>
        <p class="article__content">
          {{ article.content }}
        </p>
      </div>

      <!-- comment -->
      <slot name="comment" />
    </div>
  </div>
</template>

<script>
export default {
  name: "Article",
  props: {
    article: {
      type: Object,
      required: true,
    },
    type: {
      type: String,
      default: "article",
    },
    floor: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    showHead() {
      return this.type === "article";
    },
    showTag() {
      return this.type === "article";
    },
    formatFloor() {
      return this.floor > 0 ? `${this.floor}樓` : "樓主";
    },
  },
};
</script>

<style lang="scss" scoped>
.article + .article {
  margin-top: 16px;
}

.article {
  display: flex;
  align-items: flex-start;
  background-color: white;
  border-radius: 10px;
  padding: 16px;

  &__avatar {
    width: 80px;
    border-radius: 50%;
    margin-right: 20px;
  }

  &__right {
    display: flex;
    flex-flow: column nowrap;
  }

  &__head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: solid 1px gray;
  }

  &__title {
    font-size: 24px;
  }

  &__action {
    margin-left: 20px;

    button + button {
      margin-left: 10px;
    }
  }

  &__info {
    margin-top: 10px;
  }

  &__row {
    display: flex;
    align-items: flex-start;
  }

  &__floor {
    border-radius: 100px;
    background-color: orange;
    font-size: 12px;
    color: white;
    padding: 3px 10px;
    margin-right: 10px;
  }

  &__date {
    font-size: 12px;
    color: lighten(gray, 10);
    line-height: 2;
    margin-right: 10px;
  }

  &__tag {
    font-size: 13px;
    color: lighten(blue, 20);
    cursor: pointer;
  }

  &__tag + &__tag {
    margin-left: 5px;
  }
}
</style>
