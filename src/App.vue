<template>
  <div id="app">
    <div class="edit">
      <Editor
        :hashList="hashList"
        @getContent="handleUpdateContent"
        @getCurrentTheme="handleUpdateTheme"
      />
    </div>
    <div class="content">{{ content }}</div>
    <div class="theme">theme: {{theme}}</div>
  </div>
</template>

<script>
import Editor from "@/components/Editor";

export default {
  name: "App",
  components: {
    Editor
  },
  data() {
    return {
      content: "",
      theme: "",
      hashList: [
        {
          id: 1,
          value: "apple"
        },
        {
          id: 2,
          value: "orange"
        },
        {
          id: 3,
          value: "mango"
        }
      ]
    };
  },
  methods: {
    handleUpdateContent(content) {
      this.content = content;
    },
    handleUpdateTheme(theme) {
      this.theme = theme;
      console.log("handleUpdateTheme", theme);
    }
  }
};
</script>

<style lang="scss">
#app {
  width: 100%;
  height: 100vh;
}
</style>
