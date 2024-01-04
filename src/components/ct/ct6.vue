<template>
  <ct-block title="在建项目投资情况">
    <div class="list">
      <div class="item">
        <h5>当前在建项目数(个)</h5>
        <h6>{{ data.proCount_x }}</h6>
        <p>同比：<span :style="{ color: data.proCountRatio >= 0 ? '#CC2936' : '#0F996B' }">{{ data.proCountRatio }}%</span></p>
      </div>
      <div class="item">
        <h5>本年已完成投资(万元)</h5>
        <h6>{{ data.yearAddAmt }}</h6>
        <p>同比：<span :style="{ color: data.yearRatio >= 0 ? '#CC2936' : '#0F996B' }">{{ data.yearRatio }}%</span></p>
      </div>
      <div class="item">
        <h5>本月已完成投资(万元)</h5>
        <h6>{{ data.monthAmt }}</h6>
        <p>同比：<span :style="{ color: data.monthRatio >= 0 ? '#CC2936' : '#0F996B' }">{{ data.monthRatio }}%</span></p>
      </div>
      <div class="item">
        <h5>在建项目累计投资(万元)</h5>
        <h6>{{ data.completeAmt_x }}</h6>
        <p>同比：<span :style="{ color: data.completeAmtRatio >= 0 ? '#CC2936' : '#0F996B' }">{{ data.completeAmtRatio }}%</span></p>
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
  padding 25px 30px
  height 292px
  display flex
  flex-wrap wrap
  justify-content space-between
  align-content space-between
  .item
    box-sizing border-box
    height 133px
    width 237px
    border 1px solid #0A3866
    padding 20px 0 0 30px
    &>h5
      margin-bottom 10px
      font-size 18px
      color #fff
    &>h6
      margin-bottom 10px
      font-size 30px
      color #0073E6
      font-weight bold
    &>p
      font-size 20px
      color #fff
      &>span
        color #CC2936
</style>
