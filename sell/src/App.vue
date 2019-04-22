<template>
  <div class="app">
    <Header :seller="seller"/>
    <div class="tab">
      <router-link class="tab-item" to="/products">Products</router-link>
      <router-link class="tab-item" to="/reviews">Reviews</router-link>
      <router-link class="tab-item" to="/seller">Seller</router-link>
    </div>
    <router-view class="content"></router-view>
  </div>
</template>

<script>
import Header from "components/header/Header.vue";
export default {
  components: {
    Header,
  },
  data() {
      return {
          seller: {}
      }
  },
  created() {
    this.$http.get('/data.json').then(res => {
        if(res.status !== 200) {
            console.log('bad request')
        }
        else {
            console.log(res)
            this.seller = Object.assign({}, res.data.seller)
            console.log(this.seller)
        }
    })
  }
  
};
</script>



<style lang="stylus" scoped>
.app
  .tab
    display: flex;
    width: 100%;
    height: 40px;
    line-height: 40px;
    .tab-item 
      flex: 1;
      text-align: center;
      display block
      font-size 14px
      color rgb(77,85,93)
      &.active 
        color rgb(240, 20, 20)
</style>
