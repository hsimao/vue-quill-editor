<template>
  <div class="navbar">
    <router-link class="item" to="/edit">編輯器</router-link>
    <router-link class="item" to="/comment">文章留言</router-link>
  </div>
</template>

<script>
export default {
  name: "navbar",
};
</script>

<style lang="scss" scoped>
.navbar {
  display: flex;

  .item {
    margin: 16px;
    cursor: pointer;
    text-decoration: none;
    color: black;
  }

  .router-link-active {
    color: orange;
    font-weight: bold;
  }
}
</style>
