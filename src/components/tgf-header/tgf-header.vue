<template>
  <div class="header">
    <img src="./logo@2x.png" alt="">
<!--    <router-link to="/tgf" style="margin-right: 32px">大厅概况</router-link>-->
<!--    <router-link to="/pion">创业贷</router-link>-->
    <div style="flex: 1"></div>
<!--    <router-link to="/pion" style="margin-right: 32px">运行数据</router-link>-->
<!--    <router-link to="/pion">信用贷</router-link>-->
    <date-time style="margin-right: 30px" />
  </div>
</template>

<script lang="ts" setup>
import DateTime from "@/components/date-time/date-time.vue";
</script>

<style scoped lang="stylus">
.header
  height 80px
  width 100%
  background url(./bg@2x.png) left top no-repeat
  background-size 100% 100%
  display flex
  &>img
    margin-left 44px
    margin-top 38px
    margin-right 49px
    width 151px
    height 40px
  &>a
    margin-top 34px
    width 162px
    height 48px
    text-align center
    line-height 48px
    font-size 18px
    font-weight bold
    color #fff
    background url(./btn@2x.png) center center no-repeat
    background-size contain
    &.router-link-exact-active
      position relative
      background-image url(./btn-active@2x.png)
      &:after
        content ""
        position absolute
        left 50%
        top 100%
        transform translateX(-50%)
        width 8px
        height 5px
        background url(./triangle@2x.png) center center no-repeat
        background-size contain
        box-shadow 0 2px 8px 1px #FFBB32
</style>
