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

      <!-- 文字 color picker -->
      <select class="ql-color" />

      <!-- 文字超連結 -->
      <button class="ql-link" />

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

      <select
        class="ql-picker ql-color-picker"
        id="custom-theme"
        :class="{ hello: currentTheme === 'blue' }"
      >
        <option selected value="yellow" />
        <option value="green" />
        <option value="blue" />
      </select>
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
import "quill-mention";
import "quill/dist/quill.core.css"; // import styles
import "quill/dist/quill.snow.css"; // for snow theme
import "quill-mention/dist/quill.mention.min.css";

import ImageUploader from "quill-image-uploader";
Quill.register("modules/imageUploader", ImageUploader);

export default {
  name: "Editor",
  components: {
    quillEditor
  },
  props: {
    hashList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      cstomTheme: null,
      content: "",
      currentTheme: "",
      editorOption: {
        modules: {
          // image upload
          imageUploader: {
            upload: file => this.handleImageUpload(file)
          },
          // hashtag
          mention: {
            allowedChars: /^[A-Za-z\sÅÄÖåäö]*$/,
            mentionDenotationChars: ["#"],
            source: this.handleMention
          },
          toolbar: "#toolbar"
        }
      }
    };
  },
  computed: {
    editor() {
      return this.$refs.QuillEditor.quill;
    }
  },
  beforeDestroy() {
    this.removeListenCustomTheme();
  },
  methods: {
    init() {
      this.initCustomTheme();
    },
    onEditorReady() {
      this.init();
    },
    onEditorChange({ quill, html, text }) {
      this.$emit("getContent", html);
    },
    updateThemeColor(el) {
      const isTargetDOM = el.target.classList.contains("ql-selected");
      const color = el.target.dataset.value;
      if (isTargetDOM && color) {
        this.currentTheme = color;
        this.$emit("getCurrentTheme", this.currentTheme);
        document.querySelector("#custom-theme").style.backgroundColor = color;
      }
    },
    removeListenCustomTheme() {
      if (!this.cstomTheme) return;
      this.cstomTheme.removeEventListener("click", this.updateThemeColor);
    },
    initCustomTheme() {
      this.cstomTheme = document.querySelector("#custom-theme");
      // setting event
      if (this.cstomTheme) {
        this.cstomTheme.addEventListener("click", this.updateThemeColor);

        const items = Array.from(
          this.cstomTheme.querySelectorAll("#custom-theme .ql-picker-item")
        );

        // setting picker style
        items.forEach(item => {
          const color = item.dataset.value;
          item.style.backgroundColor = color;
        });
      }
    },
    handleMention(searchTerm, renderList, mentionChar) {
      if (searchTerm.length === 0) {
        renderList(this.hashList, searchTerm);
      } else {
        const matches = [];
        for (let i = 0; i < this.hashList.length; i++)
          if (
            ~this.hashList[i].value
              .toLowerCase()
              .indexOf(searchTerm.toLowerCase())
          )
            matches.push(this.hashList[i]);
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
    }
  }
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
