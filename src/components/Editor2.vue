<template>
  <div class="editor">
    <!-- 自定義 toolbar -->
    <div id="toolbar">
      <!-- 文字 size -->
      <select class="ql-size">
        <option value="small">小</option>
        <option selected>中</option>
        <option value="huge">大</option>
      </select>

      <select class="ql-color" />
      <button class="ql-bold" />
      <button class="ql-italic" />
      <button class="ql-underline" />

      <!-- 文字對齊方向 -->
      <select class="ql-align">
        <option selected />
        <option value="center" />
        <option value="right" />
      </select>

      <!-- 圖片上傳 -->
      <button class="ql-image" />
    </div>

    <!-- 編輯區 -->
    <quillEditor
      class="editor-content"
      ref="QuillEditor"
      v-model="content"
      :options="editorOption"
      @change="onEditorChange"
      @ready="onEditorReady"
    />
  </div>
</template>

<script>
import Quill from "quill";
import { quillEditor } from "vue-quill-editor";
import "quill/dist/quill.core.css"; // import styles
import "quill/dist/quill.snow.css"; // for snow theme

import ImageUploader from "quill-image-uploader";
Quill.register("modules/imageUploader", ImageUploader);

export default {
  name: "Editor",
  components: {
    quillEditor,
  },
  props: {
    placeholder: {
      type: String,
      default: "請輸入內容...",
    },
    // 內容長度限制
    contentLimit: {
      type: Number,
      default: 10,
    },
  },
  data() {
    return {
      cstomTheme: null,
      content: "",
      currentTheme: "",
      editorOption: {
        placeholder: this.placeholder,
        modules: {
          // image upload
          imageUploader: {
            upload: (file) => this.handleImageUpload(file),
          },
          toolbar: "#toolbar",
        },
      },
    };
  },
  methods: {
    onEditorReady() {},
    getWrapCount(quill) {
      return quill.getContents().ops[0].insert.split("\n").length - 1 || 0;
    },
    getDeleteStartLength(quill) {
      return this.getWrapCount(quill) > 1
        ? this.contentLimit + this.getWrapCount(quill) - 1
        : this.contentLimit;
    },
    isExceed(quill) {
      const realTextLength = quill.getLength() - this.getWrapCount(quill);
      return realTextLength < this.contentLimit;
    },
    onEditorChange({ quill, html, text }) {
      const realContentLength = quill.getLength() - this.getWrapCount(quill);
      if (this.isExceed(quill)) {
        this.$emit("getContent", html);
      } else {
        quill.deleteText(this.getDeleteStartLength(quill), realContentLength);
      }
    },
    handleMention(searchTerm, renderList, mentionChar) {
      if (searchTerm.length === 0) {
        renderList(this.hashlist, searchTerm);
      } else {
        const matches = [];
        for (let i = 0; i < this.hashlist.length; i++)
          if (
            ~this.hashlist[i].value
              .toLowerCase()
              .indexOf(searchTerm.toLowerCase())
          )
            matches.push(this.hashlist[i]);
        renderList(matches, searchTerm);
      }
    },
    handleImageUpload(file) {
      // api handle
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(
            "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/JavaScript-logo.png/480px-JavaScript-logo.png"
          );
        }, 3500);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.editor {
  &-content {
    height: 300px;
  }

  #toolbar {
    .ql-size {
      width: 70px;
    }
  }

  #custom-theme {
    margin-left: 10px;
    width: 24px;
    border: solid 3px black;
    background-color: gray;

    .ql-picker-label {
      opacity: 0;
    }

    &.ql-expanded {
      .ql-picker-options {
        display: flex;
        width: auto;
      }
    }
  }
}
</style>
