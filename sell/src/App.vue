<template>
  <div class="app">
    <Header :seller="seller"/>
    <div class="tab">
      <router-link class="tab-item" to="/products">Products</router-link>
      <router-link class="tab-item" to="/reviews">Reviews</router-link>
      <router-link class="tab-item" to="/seller">Seller</router-link>
    </div>
    <keep-alive>

        <router-view keep-alive :seller="seller" class="content"></router-view>
    </keep-alive>
  </div>
</template>

<script>
import Header from "components/header/Header.vue";
import { urlParse } from 'common/js/util.js'
export default {
  components: {
    Header,
  },
  data() {
      return {
          seller: {
              id: (() => {
                  console.log(urlParse().id, '213')
                  let queryParam = urlParse()
                  return queryParam.id
              })()
          }
      }
  },
  
  created() {
    this.$http.get('/data.json?id='+this.seller.id).then(res => {
        if(res.status !== 200) {
            console.log('bad request')
        }
        else {
            console.log(res)
            this.seller = Object.assign({}, this.seller, res.data.seller)
            console.log(this.seller, 'seller')
        }
    })
  }
  
};
</script>



<style lang="stylus" scoped>
.app
    height 100vh
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
