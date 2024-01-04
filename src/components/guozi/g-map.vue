<template>
  <div class="map">
    <div class="statistic">
      <el-statistic title="企业总数" :value="detail.cnt" style="color: #fff;">
        <template #suffix>个</template>
      </el-statistic>
      <el-statistic title="总资产" :value="detail.assets" style="color: #fff;">
        <template #suffix>万元</template>
      </el-statistic>
      <el-statistic title="当前在建项目数" :value="detail.proCount_x" style="color: #fff;">
        <template #suffix>个</template>
      </el-statistic>
      <el-statistic title="累计开展会议数" :value="detail.meeting_cnt" style="color: #fff;">
        <template #suffix>次</template>
      </el-statistic>
    </div>
    <x-map/>

    <div class="meeting">
      <dv-border-box11 title="三重一大会议开展情况">
        <div class="desc">
          <el-descriptions size="large" border :column="3">
            <el-descriptions-item label="本月会议总数">{{ detail.month_meeting_cnt }}</el-descriptions-item>
            <el-descriptions-item label="本月议题总数">{{ detail.month_topic_cnt }}</el-descriptions-item>
            <el-descriptions-item label="本月组织实施总数">{{ detail.implement_cnt }}</el-descriptions-item>
            <el-descriptions-item label="同比">{{ detail.month_meeting_Ratio }}%</el-descriptions-item>
            <el-descriptions-item label="同比">{{ detail.month_topic_Ratio }}%</el-descriptions-item>
            <el-descriptions-item label="同比">{{ detail.implement_Ratio }}%</el-descriptions-item>
          </el-descriptions>
        </div>
      </dv-border-box11>
    </div>
  </div>
</template>

<script lang="ts" setup>
import XMap from '../map/map.vue'
import {onMounted, ref} from "vue";
import {guoziMock} from "@/common/guozi-mock";

const detail = ref<any>(guoziMock.sumList[0])

onMounted(() => {
  window.parent.postMessage({ type: 'needData' }, '*')
  window.addEventListener('message', ({ data }) => {
    if (data.type === 'mapData') {
      detail.value = data.data.sumList[0]
    }
  }, false)
})
</script>

<style scoped lang="stylus">
.map
  width 1032px
  height 1200px
  position relative
  #map-container
    height 100%
  .statistic
    box-sizing border-box
    padding 20px 50px
    position absolute
    left 0
    top 0
    width 100%
    z-index 999
    color #fff
    display flex
    justify-content space-between
  ::v-deep(.el-statistic)
    --el-statistic-title-font-size: 24px
    --el-statistic-content-font-size: 36px
    .el-statistic__head
      line-height 50px
  .meeting
    box-sizing border-box
    position absolute
    left 0
    bottom 20px
    width 1010px
    height 300px
    overflow hidden
    z-index 999
    .desc
      padding 40px
      padding-top 110px
      ::v-deep(.el-descriptions__cell)
        font-size 24px
</style>
