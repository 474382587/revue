<template>
    <transition name="move">
        <div v-show="showFlag" class="food" ref="food">
            <div class="food-content">
                <div class="image-header">
                    <img :src="food.image" :alt="food.image">
                    <div @click="hide" class="back">
                        <i class="icon-arrow_lift"></i>
                    </div>
                </div>
                <div class="content">
                    <h1 class="title">
                        {{ food.name }}
                    </h1>
                    <div class="detail">
                        <span class="sell-count">
                            月售{{ food.sellCount }}份
                        </span>
                        <span class="rating">
                            好评率{{ food.rating }}%
                        </span>
                    </div>
                    <div class="price">
                        <span class="now">${{food.price}}</span><span class="old" v-show="food.oldPrice">${{food.oldPrice}}</span>
                    </div>
                </div>
                <div class="cartcontrol-wrapper">
                    <CartControl @add="addFood" :food="food"  />
                </div>
                <transition name="fade">
                    <div class="buy" @click="addFirst" v-show="!food.count || food.count === 0">
                        加入购物车
                    </div>
                </transition>
            </div>
        </div>
    </transition>
</template>

<script>
import BScroll from 'better-scroll'
import CartControl from 'components/cartControl/CartControl.vue'
export default {
    components: {
        CartControl
    },
    props: {
        food: {
            type:Object,
        }
    },
    methods: {
        addFood(target) {
            this.$emit('add', target)
        },
        show() {
            this.showFlag = true;
            this.$nextTick(() => {
                if(!this.scroll) {
                    this.scroll = new BScroll(this.$refs.food, {
                        click:true
                    })
                } else {
                    this.scroll.refresh()
                }
            })
        },
        hide() {
            this.showFlag = false
        },
        addFirst(event) {
            this.$emit('add', event.target)  
            this.$set(this.food, 'count', 1)
        }
        
    },
    data() {
        return {
            showFlag: false
        }
    }
}
</script>

<style lang="stylus" scoped>
.fade-enter-active, .fade-leave-active
    transform translateX(0px)
    transition: all .2s linear;
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ 
    transform translateX(100%)


.move-enter-active, .move-leave-active
    transform translateX(0px)
    transition: all .2s linear;
.move-enter, .move-leave-to /* .fade-leave-active below version 2.1.8 */ 
    transform translateX(100%)
.food
    position fixed
    left 0
    top 0
    bottom 48px
    z-index 30
    width 100%
    background-color #fff
    .food-content
        position relative
        .image-header
            position relative
            width 100%
            height 0
            padding-top 100%
            img 
                position absolute
                top 0 
                left 0
                height 100%
                width 100%
            .back
                position absolute
                top 10px
                left 0
                .icon-arrow_lift 
                    display block
                    padding 18px
                    font-size 20px
                    color #e3e3e3
                    background-color #000
        .cartcontrol-wrapper 
            position absolute
            right 12px
            bottom 12px
        .buy
            position absolute
            right 18px
            bottom 18px
            z-index 10
            height 24px
            line-height 24px
            box-sizing border-box
            font-size 10px
            padding 0 12px
            border-radius 12px
            color #ffffff
            background-color rgb(0, 160, 220)
        .content 
            padding 18px
            .title
                margin-bottom 8px
                line-height 14px
                font-size 14px
                font-weight 700
                color rgb(7,17,27)
            .detail
                margin-bottom 18px
                line-height  10px
                height 10px
                font-size 0
                .sell-count, .rating
                    font-size 10px
                    color rgb(147,153,159)
                .sell-count
                    margin-right 12px
            .price
                font-weight 700
                line-height 24px
                .now 
                    margin-right 8px
                    color rgb(240, 20, 20)
                    font-size: 14px
                .old
                    text-decoration line-through
                    font-size: 10px
                    color: rgb(147, 153, 159)



</style>
