<template>
  <div class="comment-send">
    <img class="comment-send__avatar" :src="avatar" />
    <div class="comment-send__input">
      <input
        type="text"
        :value="value"
        @input="handleInput"
        @keypress.enter="handleSend"
      />
      <img
        class="comment-send__input-icon"
        src="@/assets/icon-send.png"
        @click="handleSend"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "CommentSend",
  props: {
    avatar: {
      type: String,
      default: "https://image.flaticon.com/icons/png/512/147/147144.png",
    },
    max: {
      type: Number,
      default: 10,
    },
  },
  data() {
    return {
      value: "",
    };
  },
  methods: {
    handleSend() {
      this.$emit("send", this.value);
    },
    handleInput(el) {
      if (el.target.value.length >= this.max) {
        el.target.value = el.target.value.slice(0, this.max);
      }
      this.value = el.target.value;
    },
  },
};
</script>

<style lang="scss" scoped>
.comment-send {
  display: flex;
  align-items: center;
  padding: 8px 16px;
  background-color: white;

  &__avatar {
    width: 60px;
  }

  &__input {
    border: solid 1px gray;
    display: flex;
    width: 100%;
    margin-left: 8px;
    overflow: hidden;
    border-radius: 6px;
    padding: 0 8px;
    height: 40px;

    input {
      outline: none;
      width: 100%;
      border: none;
    }

    &-icon {
      width: 30px;
      cursor: pointer;
    }
  }
}
</style>
