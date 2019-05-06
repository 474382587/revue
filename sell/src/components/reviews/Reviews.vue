<template>
  <div class="ratings" ref="rating">
      <div class="ratings-content">
          <div class="overview">
              <div class="overview-left">
                  <h1 class="score">
                      {{seller.score}}
                  </h1>
                  <div class="title">
                      综合评分
                  </div>
                  <div class="rank">
                      高于周边商家{{seller.rankRate}}%
                  </div>
              </div>
              <div class="overview-right">
                  <div class="score-wrapper">
                      <span class="title">
                        服务态度    
                      </span>
                      <Star :size="36" :score="seller.serviceScore" />
                      <span class="score">
                          {{seller.serviceScore}}
                      </span>
                  </div>
                  <div class="score-wrapper">
                      <span class="title">
                        商品评分    
                      </span>
                      <Star :size="36" :score="seller.foodScore" />
                      <span class="score">
                          {{seller.foodScore}}
                      </span>
                  </div>
                  <div class="delivery-time">
                      <span class="title">
                          送达时间
                      </span>
                      <span class="time">
                          {{seller.deliveryTime}}分钟
                      </span>
                  </div>
              </div>
          </div>
          <Split />
      <RatingSelect @contentToggle="contentToggle" @ratingTypeChange="ratingTypeChange" :select-type="selectType" :desc="desc" :only-content="onlyContent" :ratings="ratings" />
      <div class="rating-wrapper">
            <ul v-show="ratings && ratings.length">
                <li v-show="needShow(rating.rateType, rating.text)" v-for="(rating, index) in ratings" :key="index" class="rating-item">
                    <div class="avatar">
                        <img class="avatar" :src="rating.avatar" alt="">
                    </div>
                    <div class="content">
                        <h1 class="name"> {{rating.username}} </h1>
                        <div class="star-wrapper">
                            <Star :size="24" :score="rating.score" />
                            <span class="delivery" v-show="rating.deliveryTime">
                                {{rating.deliveryTime}}
                            </span>
                        </div>
                        <p class="text">
                            {{rating.text}}
                        </p>
                        <div class="recommend" v-show="rating.recommend.length">
                            <i class="icon-thumb_up"></i>
                            <span class="item" v-for="(recommend,index) in rating.recommend" :key="index">
                                {{recommend}}
                            </span>
                        </div>
                        <div class="time">
                            {{rating.rateTime | formatDate}}
                        </div>
                    </div>
                </li>
            </ul>
            <div class="no-rating" v-show="!ratings ||!ratings.length">
                    暂无评价
            </div>
        </div>
      </div>
      
  </div>
</template>

<script>

import BScroll from 'better-scroll'
import Split from 'components/split/Split.vue'
import RatingSelect from 'components/ratingSelect/RatingSelect.vue'
import Star from 'components/star/Star.vue'
import {formatDate} from 'common/js/date.js'

const POSITIVE = 0;
const NEGATIVE = 1;
const ALL = 2;


export default {
    filters: {
        formatDate(time) {
            let date = new Date(time)
            return formatDate(date, 'yyyy-MM-dd hh:mm')
        }
    },
    methods: {
        needShow(type, text) {
            if(this.onlyContent && !text) {
                return false
            }
            if(this.selectType === ALL) {
                return true
            } else {
                return type === this.selectType
            }
        },
        contentToggle() {
            this.onlyContent = !this.onlyContent
            this.$nextTick(() => {
                this.scroll.refresh()
            })
        },
        ratingTypeChange(type){
            this.selectType = type
            this.$nextTick(() => {
                this.scroll.refresh()
            })
        },
    },
    components: {
        Star,
        Split,
        RatingSelect
    },
    props: {
        seller: {
            type: Object
        }
    },
    created() {
        this.$http.get('../../data.json').then(res => {
            if(res.status === 200) {
                console.log(res.data)
                this.ratings = res.data.ratings
                this.$nextTick(() => {
                    this.scroll = new BScroll(this.$refs.rating, {
                        click:true
                    })
                })
            }
        })
    },
   
    data() {
        return {
            ratings: [],
            selectType: ALL,
            onlyContent: true,
            desc: {
                all: '全部',
                positive: '推荐',
                negative: '吐槽'
            }
        }
    }
};
</script>

<style lang="stylus" scoped>
.ratings
    position absolute
    top 174px
    bottom 0
    left 0
    width 100%
    overflow hidden
    .rating-wrapper 
            padding 0 18px
            .rating-item 
                display flex
                padding 18px 0
                border-bottom 1px solid rgba(7, 17, 27, .1)
                .avatar
                    flex 0 0 28px
                    width 28px
                    margin-right 12px
                    img
                        border-radius 50%
                .content 
                    flex 1
                    position relative
                    .name
                        margin-bottom 4px
                        line-height 12px
                        font-size 10px
                        color rgb(7, 17, 27)
                    .star-wrapper
                        font-size 0
                        margin-bottom 6px
                        .star 
                            display inline-block
                            vertical-align top
                            margin-right 6px
                        .delivery 
                            display inline-block
                            vertical-align top
                            font-size 10px
                            color rgb(147, 153, 159)
                    .text
                        font-size 12px
                        line-height 18px
                        color rgb(7, 17, 27)
                        margin-bottom  8px
                    .recommend
                        font-size 0px
                        line-height 16px
                        .icon-thumb_up, .item
                            display inline-block
                            vertical-align middle
                            font-size 9px
                            margin 0 8px 4px 0
                        .icon-thumb_up
                            color rgb(0,160,220)
                        .item
                            padding 0 6px
                            border 1px solid rgba(7,17,27,.1)
                            border-radius 1px
                            color rgb(147, 153, 159)
                    .time
                        position absolute
                        top 0
                        right 0 
                        line-height 12px
                        font-size 10px
                        color rgba(7,17,27,.2)
    .overview           
        display flex
        padding 18px 0
        .overview-left
            flex 0 0 137px
            width 137px
            border-right 1px solid rgba(7, 17, 27, .1)
            text-align center
            padding 6px 0
            @media only screen and (max-width 320px) 
                flex 0 0 120px
                width 120px
            .score
                font-size 24px
                line-height 28px
                color rgb(255,153,0)
                margin-bottom 6px
            .title
                line-height 12px
                font-size 12px
                color rgb(7,17,27)
                margin-bottom 8px
            .rank 
                line-height 10px
                font-size 10px
                color rgb(147,153,159)
        .overview-right
            flex 1
            padding 6px 0 6px 24px
            @media only screen and (max-width 320px) 
                padding-left 6px
            .score-wrapper 
                margin-bottom 8px
                font-size 0
                .title 
                    line-height 18px
                    display inline-block
                    font-size 12px
                    color rgb(7,17,27)
                .star 
                    line-height 18px
                    display inline-block
                    margin 0 12px
                    vertical-align top
                .score
                    display inline-block
                    font-size 12px
                    color rgb(255,153,0)
            .delivery-time
                font-size 0
                .title 
                    line-height 18px
                    display inline-block
                    font-size 12px
                    color rgb(7,17,27)
                .time
                    display inline-block
                    font-size 12px
                    color rgb(147,153,159)
                    margin-left 12px
</style>
