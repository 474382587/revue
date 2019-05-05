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
                    <transition name="fade">
                        <div class="buy" @click.stop="addFirst" v-show="!food.count || food.count === 0">
                            加入购物车
                        </div>
                    </transition>
                     <div class="cartcontrol-wrapper">
                        <CartControl @add="addFood" :food="food"  />
                    </div>
                </div>
               
                <Split v-show="food.info" />
                <div class="info" v-show="food.info">
                    <h1 class="title">
                        商品信息
                    </h1>
                    <p class="text">
                        {{food.info}}
                    </p>
                </div>
                <Split />
                <div class="rating">
                    <h1 class="title">
                        商品评价
                    </h1>
                    <RatingSelect :select-type="selectType" :desc="desc" :only-content="onlyContent" :ratings="food.ratings" />
                </div>
            </div>
            
        </div>
    </transition>
</template>

<script>
import BScroll from 'better-scroll'
import CartControl from 'components/cartControl/CartControl.vue'
import Split from 'components/split/Split.vue'
import RatingSelect from 'components/ratingSelect/RatingSelect.vue'
const POSITIVE = 0;
const NEGATIVE = 1;
const ALL = 2;
export default {
    components: {
        CartControl,
        Split,
        RatingSelect
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
            
            this.selectType = ALL
            this.onlyContent = true
            
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
            showFlag: false,
            selectType: ALL,
            onlyContent: true,
            desc: {
                all: '全部',
                positive: '推荐',
                negative: '吐槽'
            }
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
                left 10px
                .icon-arrow_lift 
                    display block
                    padding 10px
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
        
        
        
        .info 
            padding 18px
            .title
                line-height 14px
                margin-bottom 6px
                font-size 14px
                color rgb(7,17,27)
            .text
                padding 0 8px
                font-size 12px
                color rgb(77,85,93)
        .rating
            padding-top 18px
            .title
                line-height 14px
                margin-left 18px
                font-size 14px
                color rgb(7,17,27)
            
        .content 
            position relative
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
