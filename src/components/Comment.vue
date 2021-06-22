<template>
  <div class="comment">
    <Article :article="article">
      <template #comment>
        <CommentItems
          :items="article.comments"
          @delete="(comment) => handleDelete('article', comment)"
        >
          <template #send>
            <CommentSend
              @send="(value) => updateSend('article-comment', value)"
              :avatar="article.avatar"
            />
          </template>
        </CommentItems>
      </template>
    </Article>

    <Article
      :article="floorComment"
      type="comment"
      v-for="(floorComment, index) in article.floorComments"
      :floor="index + 1"
      :key="floorComment.id"
    >
      <template #comment>
        <CommentItems
          :items="floorComment.comments"
          @delete="(comment) => handleDelete('article', comment)"
        >
          <template #send>
            <CommentSend
              @send="(value) => updateSend('article-comment', value)"
              :avatar="article.avatar"
            />
          </template>
        </CommentItems>
      </template>
    </Article>
    <CommentSend
      @send="(value) => updateSend('article', value)"
      :avatar="userInfo.avatar"
    />
  </div>
</template>

<script>
import CommentSend from "@/components/CommentSend";
import CommentItems from "@/components/CommentItems";
import Article from "@/components/Article";

export default {
  name: "Comment",
  components: {
    CommentSend,
    CommentItems,
    Article,
  },
  data() {
    return {
      userInfo: {
        avatar: "https://image.flaticon.com/icons/png/512/147/147144.png",
      },
      send: "",
      article: {
        id: 0,
        title: "文章標題",
        topic: "攻略",
        author: "Joke",
        tags: ["tag1", "tag2", "tag3"],
        createAt: "Tue Jun 22 2021 13:36:50",
        avatar: "https://image.flaticon.com/icons/png/512/147/147144.png",
        content:
          "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempora, qui? Molestias nesciunt aspernatur, rerum molestiae expedita repellendus tempora quos eligendi accusamus fugiat cum suscipit ut quasi eos debitis quam cupiditate?",
        // 相依在文章底下的留言
        comments: [
          {
            id: 0,
            username: "Jason",
            createAt: "Tue Jun 22 2021 13:36:50",
            avatar: "https://image.flaticon.com/icons/png/512/147/147144.png",
            content:
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis itaque tempore aspernatur nihil suscipit! Qui debitis pariatur excepturi ullam dicta iure ipsa nam, aspernatur fuga a iste incidunt accusamus quos.",
          },
          {
            id: 1,
            username: "Joke",
            createAt: "Tue Jun 22 2021 13:36:50",
            avatar: "https://image.flaticon.com/icons/png/512/147/147144.png",
            content:
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis itaque tempore aspernatur nihil suscipit! Qui debitis pariatur excepturi ullam dicta iure ipsa nam, aspernatur fuga a iste incidunt accusamus quos.",
          },
        ],
        // 開新樓層的留言
        floorComments: [
          {
            id: 0,
            createAt: "Tue Jun 22 2021 13:36:50",
            avatar: "https://image.flaticon.com/icons/png/512/147/147144.png",
            content:
              "第一樓 留言Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempora, qui? Molestias nesciunt aspernatur, rerum molestiae expedita repellendus tempora quos eligendi accusamus fugiat cum suscipit ut quasi eos debitis quam cupiditate?",
            comments: [
              {
                id: 0,
                username: "Jason",
                createAt: "Tue Jun 22 2021 13:36:50",
                avatar:
                  "https://image.flaticon.com/icons/png/512/147/147144.png",
                content:
                  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis itaque tempore aspernatur nihil suscipit! Qui debitis pariatur excepturi ullam dicta iure ipsa nam, aspernatur fuga a iste incidunt accusamus quos.",
              },
              {
                id: 1,
                username: "Joke",
                createAt: "Tue Jun 22 2021 13:36:50",
                avatar:
                  "https://image.flaticon.com/icons/png/512/147/147144.png",
                content:
                  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis itaque tempore aspernatur nihil suscipit! Qui debitis pariatur excepturi ullam dicta iure ipsa nam, aspernatur fuga a iste incidunt accusamus quos.",
              },
            ],
          },
          {
            id: 1,
            createAt: "Tue Jun 22 2021 13:36:50",
            avatar: "https://image.flaticon.com/icons/png/512/147/147144.png",
            content:
              "第二樓 留言Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempora, qui? Molestias nesciunt aspernatur, rerum molestiae expedita repellendus tempora quos eligendi accusamus fugiat cum suscipit ut quasi eos debitis quam cupiditate?",
            comments: [
              {
                id: 0,
                username: "Jason",
                createAt: "Tue Jun 22 2021 13:36:50",
                avatar:
                  "https://image.flaticon.com/icons/png/512/147/147144.png",
                content:
                  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis itaque tempore aspernatur nihil suscipit! Qui debitis pariatur excepturi ullam dicta iure ipsa nam, aspernatur fuga a iste incidunt accusamus quos.",
              },
              {
                id: 1,
                username: "Joke",
                createAt: "Tue Jun 22 2021 13:36:50",
                avatar:
                  "https://image.flaticon.com/icons/png/512/147/147144.png",
                content:
                  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis itaque tempore aspernatur nihil suscipit! Qui debitis pariatur excepturi ullam dicta iure ipsa nam, aspernatur fuga a iste incidunt accusamus quos.",
              },
            ],
          },
        ],
      },
    };
  },
  methods: {
    updateSend(value) {
      console.warn("updateSend", value);

      this.send = value;
    },
    handleDelete(type, value) {
      console.warn("handleDelete", type, value);
    },
  },
};
</script>

<style lang="scss" scoped>
.comment {
  padding: 50px;
  background-color: lighten(gray, 20);
}
</style>
