<template>
    <div class="cartcontrol">
        <transition name="move">
            <div class="cart-remove icon-remove_circle_outline" v-show="food.count > 0" @click="removeCart"></div>
        </transition>
        <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
        <div class="cart-add icon-add_circle" @click="addCart"></div>
    </div>
</template>

<script>
import Vue from 'vue'
export default {
    props: {
        food: {
            type: Object
        }
    },
    created() {
        // console.log(this.food)
    
    },
    methods: {
      addCart() {
          if(!this.food.count) {
              this.$set(this.food, 'count', 1)
          }
          else {
              this.food.count += 1
          }
          this.$emit('add', event.target)  
      },
      removeCart() {
          this.food.count -= 1
      }
    }
}
</script>

<style lang="stylus" scoped>
    
.move-enter-active
  transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
.move-leave-active 
  transition: all .3s ease-in-out;
.move-enter, .move-leave-to
  transform: translateX(30px) rotate(180deg);
  opacity: 0;
.cartcontrol
    font-size 0
    .cart-remove,
    .cart-add,
    .cart-count
        display inline-block
        padding 6px
        font-size 24px
        line-height 24px
        color rgb(0, 160, 220)
    .cart-count
        vertical-align top
        width 12px
        padding-top 6px
        line-height 24px
        font-size 10px
        text-align center
        color rgb(147,153, 159)
</style>
