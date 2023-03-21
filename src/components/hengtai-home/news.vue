<template>
  <div class="news home-block">
    <div class="sub-title">
      <img src="./title-icon@2x.png" alt="">
      {{ title }}
      <div class="tabs">
        <div v-for="item in tabs" @click="changeTab(item)" :key="item" :class="{tab: true, active: active === item}">{{ item }}</div>
      </div>
    </div>
    <div class="list">
      <div class="item" v-for="item in 6" :key="item">
        <img src="./news-icon1@2x.png" alt="">
        <h6 class="ellipsis-one">宜昌市协和医院项目勘察招标公告</h6>
        <p v-if="hasCenter">党委会</p>
        <span>2023-03-11</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {ref} from "vue";

const props = defineProps<{
  tabs: string[]
  hasCenter?: boolean,
  title: string
}>()

const active = ref(props.tabs[0])

function changeTab(item: string) {
  active.value = item
}
</script>

<style scoped lang="stylus">
@import "../../assets/common.styl"
.news
  height 301px
  margin-bottom 24px
.sub-title
  background-image url(./news-title-bg@2x.png)
  .tabs
    flex 1
    display flex
    justify-content flex-end
    .tab
      box-sizing border-box
      width 88px
      height 28px
      line-height 26px
      border-radius 14px
      text-align center
      font-size 14px
      color #FFFFFF
      cursor pointer
      border 1px solid transparent
      &.active
        color #00A9FE
        border 1px solid #00A9FE
.list
  height 267px
  .item
    height calc(100% / 6)
    display flex
    align-items center
    padding 0 16px
    overflow hidden
    cursor pointer
    &>img
      margin-right 8px
      width 16px
      height 16px
    &>h6
      flex 1
      font-size 14px
      color #FFFFFF
      &:hover
        color #00A9FE
    &>p
      width 80px
      font-size 14px
      color #fff
    &>span
      font-size 14px
      color #A3B8CC
</style>