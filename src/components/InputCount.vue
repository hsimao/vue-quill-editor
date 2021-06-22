<template>
  <div class="input-count">
    <input class="input-count__input" :value="value" @input="handleInput" />
    <div class="input-count__count">
      <span>{{ length }}</span>
      <span>/</span>
      <span>{{ max }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "InputCount",
  props: {
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
  computed: {
    length() {
      return this.value ? this.value.length : 0;
    },
  },
  methods: {
    handleInput(el) {
      if (this.length >= this.max) {
        el.target.value = el.target.value.slice(0, this.max);
      }
      this.value = el.target.value;
    },
  },
};
</script>

<style lang="scss" scoped>
.input-count {
  position: relative;
  border-radius: 5px;
  border: solid 1px gray;
  margin: 10px;
  height: 40px;
  overflow: hidden;
  display: flex;
  align-items: center;
  padding: 0 8px;

  &__input {
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
  }
}
</style>
