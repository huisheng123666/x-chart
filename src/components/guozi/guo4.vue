<template>
  <div class="guo4">
    <dv-border-box11 title="在建项目">
      <div class="desc">
        <el-descriptions size="large" border :column="1">
          <el-descriptions-item label="当前在建项目数(个)">
            <h6>{{ data.proCount_x }}</h6>
            <p>同比：{{ data.proCountRatio }}%</p>
          </el-descriptions-item>
          <el-descriptions-item label="本年已完成投资(万元)">
            <h6>{{ data.yearAddAmt }}</h6>
            <p>同比：{{ data.yearRatio }}%</p>
          </el-descriptions-item>
          <el-descriptions-item label="本月已完成投资(万元)">
            <h6>{{ data.monthAmt }}</h6>
            <p>同比：{{ data.monthRatio }}%</p>
          </el-descriptions-item>
          <el-descriptions-item label="在建项目累计完成投资(万元)">
            <h6>{{ data.completeAmt_x }}</h6>
            <p>同比：{{ data.completeAmtRatio }}%</p>
          </el-descriptions-item>
        </el-descriptions>
      </div>
    </dv-border-box11>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  data: any
}>()
</script>

<style scoped lang="stylus">
.guo4
  margin-bottom 20px
  height 380px
  .desc
    padding 40px
    padding-top 70px
    ::v-deep(.el-descriptions__cell)
      font-size 18px
</style>
