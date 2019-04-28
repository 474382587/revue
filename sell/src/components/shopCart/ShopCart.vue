<template>
  <div class="shopcart">
    <div class="content">
      <div class="content-left">
          <div class="logo-wrapper">
              <div class="logo" :class="{'highlight': totalCount > 0}">
                  <i class="icon-shopping_cart"></i>
              </div>
              <div class="num" v-if="totalCount > 0">
                  {{totalCount}}
              </div>
          </div>
          <div class="price" :class="{'highlight': totalPrice > 0}">{{totalPrice}}元</div>
          <div class="desc">另需配送费{{deliveryPrice}}元</div>
      </div>
      <div class="content-right">
          <div class="pay" :class="payClass">
              {{payDesc}}
          </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    computed: {
        payClass() {
            if(this.totalPrice < this.minPrice) {
                return 'not-enough'
            } else {
                return 'enough'
            }
        },
        payDesc() {
            if(this.totalPrice === 0) {
                return `$${this.minPrice}元起送` 
            }
            else if(this.totalPrice < this.minPrice){
                let diff = this.minPrice - this.totalPrice
                return `还差$${diff}元起送`
            } else {
                return '去结算'
            }
        },
        totalCount() {
            let count = 0
            this.selectFoods.forEach(food => {
                count += food.count
            })
            return count
        },
        totalPrice() {
            let total = 0
            console.log(this)
            this.selectFoods.forEach(food => {
                total += food.price * food.count
            })
            return total
        }
    },
    props: {
        deliveryPrice: {
            type: Number,
            default: 0
        },
        minPrice: {
            type: Number,
            default: 0
        },
        selectFoods: {
            type: Array,
            default(){
                return [{
                    price: 110,
                    count: 1
                }]
            }
        }
    }
};
</script>

<style lang="stylus" scoped>
.shopcart
    position fixed
    left 0
    bottom 0
    z-index 50
    width 100%
    height 48px
    .content 
        display flex
        background-color #141d27
        font-size 0
        height 100%
        .content-left
            flex 1
            .logo-wrapper,
            .price,
            .desc
                display inline-block
                vertical-align top
            .desc
                line-height 24px
                margin 12px 0 0 12px
                font-size 12px
                color rgba(255,255,255,.4)
            .price
                line-height 24px
                margin-top 12px
                box-sizing border-box
                padding-right 12px
                border-right 1px solid rgba(255,255,255,.1)
                font-size 16px
                font-weight 700
                color rgba(255,255,255,0.4)
                &.highlight
                    color #ffffff
            .logo-wrapper
                .num 
                    position absolute
                    top 0
                    right 0
                    width 24px
                    height 16px
                    line-height 16px
                    text-align center
                    border-radius 16px
                    font-size 9px
                    font-weight 700
                    color #ffffff
                    background-color rgb(240,20,20)
                    box-shadow 0 4px 8px 0 rgba(0,0,0,0.4)
                position relative
                top -10px
                margin 0 12px
                padding 6px
                width 56px
                height 56px
                box-sizing border-box
                border-radius 50%
                background-color #141d27
                .logo
                    &.highlight
                        background-color rgb(0, 160, 220)
                    width 100%
                    height 100%
                    border-radius 50%
                    background-color #2b343c
                    text-align center
                    .icon-shopping_cart
                        font-size 24px
                        color #80858a
                        line-height 44px
                    &.highlight .icon-shopping_cart
                        color #ffffff
        .content-right
            flex 0 0 105px
            width 105px
            .pay
                text-align center
                font-size 12px
                font-weight 700
                height 48px
                color rgba(255,255,255,.4)
                line-height 48px
                background-color #2b333b
                &.not-enough
                    background-color #2b333b
                &.enough
                    background-color #00b43c
                    color #ffffff
</style>
