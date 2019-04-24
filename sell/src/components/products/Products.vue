<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
        <ul>
            <li v-for="(item,index) in goods" :key="index" class="menu-item">
                <span class="text">
                    <span v-show="item.type > 0" class="icon" :class="classMap[item.type]"></span>
                    {{item.name}}
                </span>
            </li>
        </ul>
    </div>
    <div class="foods-wrapper" ref="foodsWrapper">
        <ul>
            <li v-for="(item, index) in goods" :key="index" class="food-list">
                <h1 class="title"> {{item.name}} </h1>
                <ul>
                    <li v-for="(food, index) in item.foods" :key="index" class="food-item">
                        <div class="icon">
                            <img width="57px" height="57px" :src=food.icon alt="">
                        </div>
                        <div class="content">
                            <h2 class="name">
                                {{food.name}}
                            </h2>
                            <p class="desc">
                                {{food.description}}
                            </p>
                            <div class="extra">
                                <span class="count">
                                    月售{{food.sellCount}}
                                </span><span>好评率{{food.rating}}</span>
                            </div>
                            <div class="price">
                                <span class="now">${{food.price}}</span>
                                <span class="old" v-show="food.oldPrice">${{food.oldPrice}}</span>
                            </div>
                        </div>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import BScroll from 'better-scroll'
export default {
    data() {
        return {
            goods: [],
        }
    },
    props: {
        seller: {
            type:Object
        }
    },
    created() {
        this.classMap = ["decrease", "discount", "special", "invoice", "guarantee"];
        this.$http.get('../../data.json').then(res => {
            if(res.status === 200) {
                this.goods = res.data.goods
                console.log(this.goods)
                this.$nextTick(() => {
                    this._initScroll()
                })
            }
        })
    },
    methods: {
        _initScroll() {
            console.log(this.$refs)
            this.meunScroll = new BScroll(this.$refs.menuWrapper, {});
            this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {});
        }
    }
};
</script>

<style lang="stylus" scoped>
@import '../../common/stylus/mixin'; 
    .goods
        display flex
        position absolute
        top 174px
        bottom 46px
        width 100%
        overflow hidden
        .menu-wrapper
            flex 0 0 80px
            width  80px
            background-color #f3f5f7
            .menu-item 
                display table
                width 56px
                height 54px
                line-height 14px
                padding 0 12px
                .text 
                    display table-cell
                    width 56px
                    vertical-align middle
                    border-bottom  1px solid rgba(7, 17, 27, .1)
                    font-size 12px
                .icon
                    display: inline-block;
                    vertical-align: middle;
                    width: 12px;
                    height: 12px;
                    margin-right: 2px;
                    background-size: cover;
                    &.decrease 
                        bg-image('./decrease_3');
                    &.discount 
                        bg-image('./discount_3');
                    &.guarantee 
                        bg-image('./guarantee_3');
                    &.special 
                        bg-image('./special_3');
                    &.invoice 
                        bg-image('./invoice_3');
        .foods-wrapper
            flex 1
            .title
                padding-left 14px
                height 26px
                line-height 26px
                border-left 2px solid #d9dde1
                font-size 12px
                color rgb(147, 153, 159)
                background-color #f3f5f7
            .food-item 
                display flex
                margin 18px
                padding-bottom 18px
                border-bottom 1px solid #d9dde1
                &:last-child 
                    border-bottom none
                    margin-bottom 0
                .icon
                    flex 0 0 57px
                    margin-right 10px
                .content
                    flex 1
                    .name
                        margin 2px 0 8px 0
                        height 14px
                        line-height 14px
                        font-size 14px
                        color rgb(7,17,27)
                    .desc, .extra
                        line-height 10px
                        font-size 10px
                        color rgb(147, 153, 159)
                    .desc 
                        margin-bottom 8px
                        line-height 12px
                    .extra
                        .count 
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
