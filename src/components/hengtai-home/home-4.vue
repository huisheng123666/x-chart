<template>
  <div class="home-4">
    <div class="title">
      <img src="./left@2x.png" alt="">
      <span>营业总收入(万元)</span>
      <img src="./right@2x.png" alt="">
    </div>

    <div class="row-data">
      <div class="target one">
        <h6>
          <img src="./left@2x.png" alt="">
          营业总收入目标
        </h6>
        <p>8200</p>
        <span>已完成：40%</span>
      </div>
      <div class="num">1829,999,09</div>
      <div class="target two">
        <h6>
          <img src="./left@2x.png" alt="">
          营业总利润目标
        </h6>
        <p>8200</p>
        <span>已完成：40%</span>
      </div>
    </div>

    <div class="title rate-title">
      <img src="./left@2x.png" alt="">
      <span>营业总利润(万元)</span>
      <img src="./right@2x.png" alt="">
    </div>

    <flopper class="num-card" :num="num" />

    <div class="line"></div>
  </div>
</template>

<script lang="ts" setup>
import Flopper from "@/components/flopper/flopper.vue";
import {ref} from "vue";

const num = ref(1829999)

setInterval(() => {
  num.value += 199
}, 5000)
</script>

<style scoped lang="stylus">
.home-4
  margin-top 71px
  height 412px
  background url(./home4-bg@2x.png) center top no-repeat
  background-size 100% auto
  .title
    display flex
    justify-content center
    align-items center
    font-size 24px
    color #fff
    font-weight bold
    &>img
      margin 0 24px
      width 5px
      height 12px
  .row-data
    margin-top 24px
    display flex
    align-items center
    .target
      box-sizing border-box
      height 110px
      width 196px
      border-radius 16px
      padding-left 24px
      padding-top 16px
      &.one
        background url(./border-bg.png) left top no-repeat
        background-size 196px 100%
      &.two
        background url(./border-img2.png) left top no-repeat
        background-size 196px 100%
      &>h6
        margin-bottom 8px
        display flex
        align-items center
        font-size 16px
        color #FFFFFF
        font-weight bold
        &>img
          margin-right 8px
          width 5px
          height 12px
      &>p
        margin-bottom 16px
        padding-left 13px
        font-size 24px
        color #00A9FE
        font-weight bold
        &:after
          content ' 万元'
          vertical-align middle
          font-size 14px
          font-weight 500
      &>span
        display block
        padding-left 13px
        font-size 14px
        color #A1AAB3
    .num
      flex 1
      text-align center
      font-size 80px
      font-weight bold
      color #3398FE
      background: linear-gradient(270deg, #0055FF 0%, #00B4D8 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
  .rate-title
    margin-top 70px
    font-size 20px
  .num-card
    margin-top 27px
  .line
    height 1px
    width 560px
    margin 0 auto
    margin-top 40px
    background: linear-gradient(270deg, rgba(51,186,254,0) 0%, #33BAFE 50%, rgba(51,186,254,0) 100%);
</style>