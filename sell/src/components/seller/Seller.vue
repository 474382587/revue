<template>
  <div class="seller" ref="seller">
      <div class="seller-content">
          <div class="overview">
              <h1 class="title">
                  {{seller.name}}
              </h1>
              <div class="desc">
                  <Star :size="36" :score="seller.score" />
                  <span class="text">({{seller.ratingCount}})</span>
                  <span class="text">月售{{seller.sellCount}}单</span>
              </div>
              <ul class="remark">
                  <li class="block">
                      <h2>
                          起送价
                      </h2>
                      <div class="content">
                          <span class="stress">
                              {{seller.minPrice}}
                          </span>
                          元起
                      </div>
                  </li>
                  <li class="block">
                      <h2>
                          商家配送
                      </h2>
                      <div class="content">
                          <span class="stress">
                              {{seller.deliveryPrice}}
                          </span>
                          元起
                      </div>
                  </li>
                  <li class="block">
                      <h2>
                          配送时间
                      </h2>
                      <div class="content">
                          <span class="stress">
                              {{seller.deliveryTime}}
                          </span>
                          分钟
                      </div>
                  </li>
              </ul>
              <div class="favorite" @click="toggleFavorite">
                  <i class="icon-favorite" :class="{'active': favorite}">
                  </i>
                  <span class="text">{{favorite ? '已收藏' : '收藏' }}</span>
              </div>
          </div>
          <Split />
          <div class="bulletin">
              <h1 class="title">
                  公告与活动
              </h1>
              <div class="content-wrapper">
                  <p class="content">
                      {{seller.bulletin}}
                  </p>
              </div>
               <ul class="supports" v-if="seller.supports">
                    <li class="support-item" v-for="(item, index) in seller.supports" :key="index">
                        <span class="icon" :class="classMap[seller.supports[index].type]"></span>
                        <span class="text">
                            {{ seller.supports[index].description }}
                        </span>
                    </li>
                </ul>
          </div>
          <Split />
          <div class="pics">
              <h1 class="title">
                商家实景
              </h1>
              <div class="pic-wrapper" ref="pics">
                  <ul class="pic-list" ref="picList">
                      <li class="pic-item" v-for="(pic, index) in seller.pics" :key="index">
                          <img :src="pic" alt="" width="120px" height="90px">
                      </li>
                  </ul>
              </div>
          </div>
          <Split />
          <div class="info">
              <h1 class="title">
                  商家信息
              </h1>
              <ul>
                  <li class="info-item" v-for="(info, index) in seller.infos" :key="index">
                      {{info}}
                  </li>
              </ul>
          </div>
      </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
import Star from 'components/star/Star.vue'
import Split from 'components/split/Split.vue'
import { saveToLocal, loadFromLocal } from 'common/js/store.js'
export default {
    data() {
        return {
            favorite: false
        }
    },
    created() {
        this.classMap = ["decrease", "discount", "special", "invoice", "guarantee"];
    },
    mounted() {
        this.scroll = new BScroll(this.$refs.seller, {
            click:true
        })
        if(this.pics) {
            let picWidth = 120
            let margin = 6
            let width = (picWidth + margin) * this.seller.pics.length - margin
            this.$refs.picList.style.width = width + 'px'
            this.$nextTick(() => {
                this.picScroll = new BScroll(this.$refs.pics, {
                    scrollX: true,
                    eventPassThrough:'vertical'
                })
            })
        }
        this.favorite = loadFromLocal(this.seller.id, 'favorite', false)
    },
    methods: {
        toggleFavorite() {
            this.favorite = !this.favorite
            saveToLocal(this.seller.id, 'favorite', this.favorite)
        }
    },
    components: {
        Star,
        Split
    },
    props: {
        seller: {
            type: Object
        }
    }
};
</script>

<style lang="stylus" scoped>
@import '../../common/stylus/mixin'; 

.seller 
    position absolute
    top 174px
    bottom 0
    left 0
    width 100%
    overflow hidden
    .info
        padding 18px
        color rgb(7,17,27)
        .title
            font-size 14px
            padding-bottom 12px
            color rgb(7, 17, 27)
            line-height 14px
            border-bottom 1px solid rgba(7,17,27,.1)
        .info-item
            font-size 12px
            padding 16px 12px
            line-height 16px
            border-bottom 1px solid rgba(7,17,27,.1)
            &:last-child
                border-bottom none
    .pics
        padding 18px
        .title
            font-size 14px
            margin-bottom 12px
            color rgb(7, 17, 27)
            line-height 14px
        .pic-wrapper
            overflow-x hidden
            width 100%
            white-space nowrap
            .pic-list
                font-size 0
                .pic-item
                    display inline-block
                    margin-right 6px
                    width 120px
                    height 90px
                    &:last-child 
                        margin-right 0
    .bulletin
        padding 18px 18px 0
        .title
            font-size 14px
            margin-bottom 8px
            color rgb(7, 17, 27)
            line-height 14px
        .content-wrapper
            padding 0 12px 16px 12px
            border-bottom 1px solid rgba(7,17,27,.1)
            .content
                line-height 24px
                font-size 12px
                color rgb(240, 20, 20)
        .supports
            .support-item
                padding 16px 12px
                font-size 0
                border-bottom 1px solid rgba(7,17,27,.1)
                .icon
                    display: inline-block;
                    vertical-align: middle;
                    width: 16px;
                    height: 16px;
                    margin-right: 6px;
                    background-size: cover;
                    &.decrease 
                        bg-image('./decrease_4');
                    &.discount 
                        bg-image('./discount_4');
                    &.guarantee 
                        bg-image('./guarantee_4');
                    &.special 
                        bg-image('./special_4');
                    &.invoice 
                        bg-image('./invoice_4');
                .text
                    font-size 12px
                    line-height 16px
                    display inline-block
                    vertical-align middle
    .overview
        padding 18px
        .title
            font-size 14px
            margin-bottom 8px
            color rgb(7, 17, 27)
        .desc
            padding-bottom 18px
            
            font-size 0
            border-bottom 1px solid rgba(7,17,27,.1)
            .star 
                display inline-block
                margin-right 8px 
                vertical-align top
            .text 
                display inline-block
                vertical-align top 
                line-height 18px
                margin-right 12px
                font-size 10px
                color rgb(77,85,93)
        .favorite
            position absolute 
            top 18px
            right 16px
            text-align center
            width 40px
            .icon-favorite
                font-size 24px
                line-height 24px
                display block
                color rgba(7,17,27, 0.2)
                margin-bottom 4px
                &.active
                    color rgb(240, 20, 20)
            .text 
                font-size 10px
                line-height 10px
                color rgb(77, 85, 93)
                
        .remark
            display flex
            padding 18px
            .block
                flex 1
                text-align center        
                border-right 1px solid rgba(7,17,27,.1)
                &:last-child 
                    border none
                h2
                    font-size 10px
                    margin-bottom 4px
                    line-height 10px
                    color rgb(147,153,159)
                .content
                    line-height 24px
                    font-size 10px
                    color rgb(7,17,27)
                    .stress
                        font-size 24px
    
</style>
