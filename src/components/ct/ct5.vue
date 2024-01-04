<template>
  <ct-block title="三重一大会议开展情况" big>
    <div class="list">
      <div class="item">
        <img src="./ct5-1@2x.png" alt="">
        <div class="info">
          <h5>本月会议总数</h5>
          <h6>{{ data.month_meeting_cnt }} <span>次</span></h6>
          <p>同比：<span :style="{color: data.month_meeting_Ratio >= 0 ? '#CC2936' : '#0F996B'}">{{ data.month_meeting_Ratio }}%</span></p>
        </div>
      </div>
      <div class="item">
        <img src="./ct5-2@2x.png" alt="">
        <div class="info">
          <h5>本月议题总数</h5>
          <h6>{{ data.month_topic_cnt }} <span>次</span></h6>
          <p>同比：<span :style="{color: data.month_topic_Ratio >= 0 ? '#CC2936' : '#0F996B'}">{{ data.month_topic_Ratio }}%</span></p>
        </div>
      </div>
      <div class="item">
        <img src="./ct5-1@2x.png" alt="">
        <div class="info">
          <h5>本月组织实施总数</h5>
          <h6>{{ data.implement_cnt }} <span>次</span></h6>
          <p>同比：<span :style="{color: data.implement_Ratio >= 0 ? '#CC2936' : '#0F996B'}">{{ data.implement_Ratio }}%</span></p>
        </div>
      </div>
    </div>
  </ct-block>
</template>

<script lang="ts" setup>
import CtBlock from "@/components/ct/ct-block.vue";

defineProps<{
  data: any
}>()
</script>

<style scoped lang="stylus">
.list
  height 180px
  display flex
  align-items center
  .item
    flex 1
    display flex
    align-items center
    justify-content center
    &>img
      margin-right 20px
      width 100px
      height 100px
    .info
      &>h5
        margin-bottom 10px
        font-size 20px
        color #B6BBBF
      &>h6
        margin-bottom 15px
        font-size 30px
        color #34FFFF
        font-weight bold
        &>span
          font-size 20px
      &>p
        font-size 20px
        color #fff
</style>
