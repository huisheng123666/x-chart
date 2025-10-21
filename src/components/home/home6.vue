<template>
  <div class="home-6">
    <block-title title="活跃统计" />
    <div class="list">
      <div class="item">
        <h6>访问量 <img src="./home-6-1@2x.png" alt=""></h6>
        <div class="total">
          <p>{{ formatNum(data.pageView) }} 次</p>
          <span>历史累计</span>
        </div>
        <div class="total">
          <p>{{ formatNum(data.pageView_day) }} 次</p>
          <span>今日新增</span>
        </div>
      </div>

      <div class="item">
        <h6>注册用户 <img src="./home-6-2@2x.png" alt=""></h6>
        <div class="total">
          <p>{{ formatNum(data.loginUserNum) }} 人</p>
          <span>历史累计</span>
        </div>
        <div class="total">
          <p>{{ formatNum(data.loginUserNum_day) }} 人</p>
          <span>今日新增</span>
        </div>
      </div>

    </div>
  </div>
</template>

<script lang="ts" setup>
import BlockTitle from "@/components/home/block-title.vue";
import {formatNum} from "@/common";

defineProps<{
  data: any
}>()
</script>

<style scoped lang="stylus">
@import "../../assets/common.styl"

@keyframes scaleTo
  0%
    transform scale3d(1, 1, 1)
  50%
    transform scale3d(1.2, 1.2, 1)
  100%
    transform scale3d(1, 1, 1)

.home-6
  height 290px
  bottomBg()
  .list
    padding 0 10px
    margin-top 16px
    display grid
    grid-template-columns repeat(2, 1fr)
    grid-column-gap 16px
    .item
      display grid
      grid-template-rows repeat(3, auto)
      grid-row-gap 24px
      background: linear-gradient( 180deg, rgba(38,147,255,0) 0%, rgba(38,147,255,0.1) 100%)
      border: 1px solid
      border-image: linear-gradient(180deg, rgba(38, 147, 255, 0), rgba(38, 147, 255, 0.2)) 1 1
      padding 14px 24px
      &>h6
        display flex
        justify-content space-between
        align-items center
        font-size 20px
        color #FFFFFF
        &>img
          width 40px
          height 40px
      .total
        &>p
          margin-bottom 8px
          font-size 18px
          color #FFFFFF
          font-weight bold
        &>span
          font-size 14px
          color #A3BECC
</style>
