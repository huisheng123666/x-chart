<template>
  <div class="kanban6 tgf-block">
    <div class="sub-title">
      <img src="../hengtai-home/title-icon@2x.png" alt="">
      网上金融服务大厅
    </div>

    <div class="list">
      <div class="item">
        <img src="./kanban6-1@2x.png" alt="">
        <h6>{{ splitNum(data.num1) }}<span> 笔</span></h6>
        <p>申请笔数</p>
      </div>
      <div class="item">
        <img src="./kanban6-2@2x.png" alt="">
        <h6>{{ splitNum(data.num2) }}<span> 万元</span></h6>
        <p>授信金额</p>
      </div>
      <div class="item">
        <img src="./kanban6-3@2x.png" alt="">
        <h6>{{ splitNum(data.num3) }}<span> 笔</span></h6>
        <p>授信笔数</p>
      </div>
      <div class="item">
        <img src="./kanban6-2@2x.png" alt="">
        <h6>{{ splitNum(data.num4) }}<span> 万元</span></h6>
        <p>放款金额</p>
      </div>
      <div class="item">
        <img src="./kanban6-3@2x.png" alt="">
        <h6>{{ splitNum(data.num5) }}<span> 笔</span></h6>
        <p>放款笔数</p>
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
.kanban6
  height 240px
  .list
    display flex
    padding 0 40px
    justify-content space-between
    .item
      margin-top 30px
      text-align center
      &>img
        display block
        width 72px
        height 72px
        margin 0 auto
      &>h6
        margin-top 8px
        font-size 24px
        color #00A9FE
        font-weight bold
        &>span
          font-size 14px
          font-weight 400
      &>p
        width 82px
        margin 0 auto
        height 26px
        line-height 26px
        margin-top 8px
        font-size 12px
        color #fff
        background url(text-bg@2x.png) center center no-repeat
        background-size contain
</style>
