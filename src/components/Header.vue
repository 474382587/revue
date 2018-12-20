<template>
  <div class="header">
    <router-link to="/home" class="image-wrapper">
      <img src="http://bangdna.com/static/logo.svg" alt="company-logo">
    </router-link>
    <nav>
      <div class="left-part">
        <router-link to="/home">首页</router-link>
        <router-link to="/post-archive">论坛</router-link>
        <router-link to="/article-archive">文章</router-link>
        <router-link to="/rewards">更多</router-link>
      </div>
      <div class="right-part">
        <router-link to="/search">Q</router-link>
        <router-link to="/login">登录</router-link>
        <router-link to="/register">注册</router-link>
      </div>
    </nav>
  </div>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
.header {
  display: flex;
  max-width: 1200px;
  margin: 10px auto;
  justify-content: space-between;
  border-bottom: 2px solid #666;
  padding-bottom: 10px;
}
.header > .image-wrapper {
  width: 50px;
}
nav {
  display: flex;
  justify-content: space-between;
  align-items: bottom;
  flex: 1;
}
.left-part, .right-part  {
    display: flex;
    align-items: flex-end;
}
nav {
    margin-left: 5%;
}
nav a {
    font-size: 20px;
    text-decoration: none;
    color: #000;
}
nav a:hover{
    font-weight: bold;
}
.left-part {
    width: 30%;
    justify-content: space-between;
    min-width: 200px;
}
.right-part {
    width: 15%;
    justify-content: space-between;
    min-width: 100px;
}

</style>


<script>
// @ is an alias to /src

export default {
  name: "global-header",
  components: {}
};
</script>