<template>
  <div id="app">
    <Header/>
    <div id="nav">
      <router-link to="/">Home</router-link>|
      <router-link to="/register">register</router-link>|
      <router-link to="/application">application</router-link>|
      <router-link to="/article-archive">article-archive</router-link>|
      <router-link to="/article">article</router-link>|
      <router-link to="/post-archive">post-archive</router-link>|
      <router-link to="/post-detail">post-detail</router-link>
      <router-link to="/publish-article">publish-article</router-link>|
      <router-link to="/rewards">rewards</router-link>|
      <router-link to="/dashboard">dashboard</router-link>|
      <router-link to="/login">login</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style>
    #nav > * {
        margin: 0 10px;
    }
</style>

<script>
import Header from "./components/Header";
export default {
  name: "app",
  components: {
    Header
  }
};
</script>

