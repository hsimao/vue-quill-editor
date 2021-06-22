<template>
  <div class="edit-container">
    <select>
      <option selected="selected">請選擇主題分類</option>
      <option :value="topic.id" v-for="topic in topicList" :key="topic.id">
        {{ topic.name }}
      </option>
    </select>
    <InputCount />
    <div class="edit">
      <Editor
        :hashlist="hashlist"
        placeholder="Vui lòng nhập nội dung"
        @getContent="handleUpdateContent"
        @getCurrentTheme="handleUpdateTheme"
      />
    </div>
    <div class="content">{{ content }}</div>
  </div>
</template>

<script>
import Editor from "@/components/Editor2";
import InputCount from "@/components/InputCount";

export default {
  name: "EditPage",
  components: {
    Editor,
    InputCount,
  },
  data() {
    return {
      send: "",
      topicList: [
        { id: 0, name: "攻略" },
        { id: 1, name: "問題" },
        { id: 2, name: "經驗" },
        { id: 3, name: "分享" },
        { id: 4, name: "閒聊" },
      ],
      content: "",
      hashlist: [
        {
          id: 1,
          value: "apple",
        },
        {
          id: 2,
          value: "orange",
        },
        {
          id: 3,
          value: "mango",
        },
      ],
    };
  },
  methods: {
    handleUpdateContent(content) {
      // console.warn("handleUpdateContent", content);

      this.content = content;
    },
    handleUpdateTheme(theme) {
      this.theme = theme;
      console.log("handleUpdateTheme", theme);
    },
    updateSend(value) {
      this.send = value;
    },
  },
};
</script>

<style lang="scss">
.edit-container {
  padding: 50px;
}
</style>
