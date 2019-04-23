<template>
  <div class="goods">
    <div class="menu-wrapper">
        <ul>
            <li v-for="(item,index) in goods" :key="index" class="menu-item">
                <span class="text">
                    <span v-show="item.type > 0" class="icon" :class="classMap[item.type]"></span>
                    {{item.name}}
                </span>
            </li>
        </ul>
    </div>
    <div class="foods-wrapper"></div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            goods: [] 
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
            }
        })
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
</style>
