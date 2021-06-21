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
      <button class="ql-image" :class="{ disable: imgDisable }" />
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
    // 限制圖片上傳張數
    imgLimit: {
      type: Object | false,
      default: () => {
        return {
          count: 3,
          width: 1000,
          height: 1000,
          size: 1024 * 1024 * 10, // 10mb
        };
      },
    },
  },
  data() {
    return {
      content: "",
      imgDisable: false,
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
      const wrapCount = quill.getContents().ops.reduce((acc, it) => {
        if (typeof it.insert === "string") {
          acc += it.insert.split("\n").length - 1 || 0;
        }

        return acc;
      }, 0);
      return wrapCount;
    },
    getRealTextLength(quill) {
      return (
        quill.getLength() - this.getImgCount(quill) - this.getWrapCount(quill)
      );
    },
    getDeleteStartLength(quill) {
      this.getWrapCount(quill) > 1
        ? this.contentLimit +
          this.getWrapCount(quill) +
          this.getImgCount(quill) -
          1
        : this.contentLimit;
    },
    getImgCount(quill) {
      return quill.getContents().ops.reduce((acc, it) => {
        if (typeof it.insert === "object" && it.insert.image) {
          acc++;
        }
        return acc;
      }, 0);
    },
    checkImgDisable(quill) {
      if (this.imgLimit && this.imgLimit.count) {
        if (this.getImgCount(quill) === this.imgLimit.count) {
          this.imgDisable = true;
        } else {
          this.imgDisable = false;
        }
      }
    },
    getImageWidthAndHeight(file) {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = window.URL.createObjectURL(file);
        img.onload = () => {
          resolve({ width: img.width, height: img.height });
        };
      });
    },
    isExceed(quill) {
      return this.getRealTextLength(quill) > this.contentLimit;
    },
    onEditorChange({ quill, html, text }) {
      if (this.isExceed(quill)) {
        quill.deleteText(this.getDeleteStartLength(quill), quill.getLength());
      } else {
        this.$emit("getContent", html);
      }
      this.checkImgDisable(quill);
    },
    async checkImageLimit(file) {
      const result = {
        width: true,
        height: true,
        size: true,
        pass: true,
      };

      if (!this.imgLimit) return result;

      const { width, height } = await this.getImageWidthAndHeight(file);

      if (file.size > this.imgLimit.size) {
        result.size = false;
        result.pass = false;
      }
      if (width > this.imgLimit.width) {
        result.width = false;
        result.pass = false;
      }
      if (height > this.imgLimit.height) {
        result.height = false;
        result.pass = false;
      }

      return result;
    },
    async handleImageUpload(file) {
      const { pass, width, height, size } = await this.checkImageLimit(file);

      if (pass) {
        // api handle
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve(
              "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/JavaScript-logo.png/480px-JavaScript-logo.png"
            );
          }, 3500);
        });
      } else if (!size) {
        alert("圖片檔案大小超出上限");
        return new Promise((resolve, reject) => {
          reject();
        });
      } else if (!width || !height) {
        alert("圖片寬高超出上限");
        return new Promise((resolve, reject) => {
          reject();
        });
      }
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

  .ql-image.disable {
    cursor: not-allowed;
    pointer-events: none;
    opacity: 0.7;
  }
}
</style>
