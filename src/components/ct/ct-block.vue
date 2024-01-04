<template>
  <div :class="{'ct-block': true, big: big}">
    <h4 :class="{big: big}">{{ title }}</h4>
    <slot/>
    <img class="one" src="./j-1@2x.png" alt="">
    <img class="two" src="./j-2@2x.png" alt="">
    <img class="three" src="./j-3@2x.png" alt="">
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  title: string
  big?: boolean
}>()
</script>

<style scoped lang="stylus">
.ct-block
  margin-bottom 10px
  height 386px
  background-color rgba(102, 179, 255, 0.05)
  position relative
  &.big
    height 221px
  &>img
    position absolute
    width 20px
    height 20px
  .one
    right 0
    top 0
  .two
    left 0
    bottom 0
  .three
    right 0
    bottom 0
  &>h4
    height 40px
    line-height 40px
    text-indent 20px
    background url(./title-bg@2x.png) left center no-repeat
    background-size auto 100%
    font-size 20px
    color #fff
    &.big
      background-image url(./big-title@2x.png)
</style>
