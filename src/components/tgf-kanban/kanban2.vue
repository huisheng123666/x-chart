<template>
  <div class="kanban2 tgf-block">
    <div class="sub-title">
      <img src="../hengtai-home/title-icon@2x.png" alt="">
      市场推广
    </div>

    <div class="list">
      <div class="wrap">
        <div class="item">
          <img src="./kanban2-1@2x.png" alt="">
          <div class="info">
            <h6>{{ splitNum(data.num1) }} <span>万元</span></h6>
            <p>服务费收入</p>
          </div>
        </div>
        <div class="item">
          <img src="./kanban2-2@2x.png" alt="">
          <div class="info">
            <h6>{{ splitNum(data.num2) }} <span>万元</span></h6>
            <p>合同签约金额</p>
          </div>
        </div>
      </div>

      <div class="wrap">
        <div class="item">
          <img src="./kanban2-3@2x.png" alt="">
          <div class="info">
            <h6>{{ splitNum(data.num3) }} <span>万元</span></h6>
            <p>项目建设收入</p>
          </div>
        </div>
        <div class="item">
          <img src="./kanban2-4@2x.png" alt="">
          <div class="info">
            <h6>{{ splitNum(data.num4) }} <span>万元</span></h6>
            <p>奖补资金</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {splitNum} from "@/common";

defineProps<{
  data: any
}>()
</script>

<style scoped lang="stylus">
@import "../../assets/common.styl"
.kanban2
  .list
    padding-top 49px
    .wrap
      width calc(100% - 48px)
      margin 0 24px
      padding-bottom 13px
      display flex
      justify-content space-between
      background url(./icon-data-bg@2x.png) center bottom no-repeat
      background-size 100% auto
      &:first-child
        margin-bottom 50px
      .item
        flex 1
        display flex
        align-items center
        margin-left 26px
        &:first-child
          border-right 1px solid rgba(38, 147, 255, 0.3)
        &>img
          width 40px
          height 40px
        .info
          margin-left 16px
          &>h6
            color #FFFFFF
            font-size 20px
            font-weight bold
            &>span
              font-size 12px
              font-weight 400
          &>p
            margin-top 8px
            font-size 12px
            color #A3BECC
</style>
