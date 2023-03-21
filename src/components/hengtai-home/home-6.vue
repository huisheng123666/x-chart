<template>
  <div class="home-6 home-block">
    <div class="sub-title">
      <img src="./title-icon@2x.png" alt="">
      资产负载分布
    </div>

    <div class="pies">
      <pie3d style="height: 166px; width: 432px" :grid="{ left: '-30%' }" :values="chartValues" :legend="legend1" />
      <div class="line"></div>
      <pie3d style="height: 166px; width: 430px" :grid="{ left: '-30%' }" :values="chartValues2" :legend="legend2" />
    </div>
    <div class="name">
      <span>资产结构分布</span>
      <span>负债分布</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Pie3d from "@/components/Pie-3d/Pie-3d.vue";
import {ref} from "vue";

const chartValues = ref([
  {
    name: "所有者权益",
    value: 160,
    percent: '47%'
  },
  {
    name: "负债",
    value: 180,
    percent: '53%'
  }
])

const chartValues2 = ref([
  {
    name: "贷款",
    value: 160,
    percent: '47%'
  },
  {
    name: "债券",
    value: 180,
    percent: '27%'
  },
  {
    name: "其他",
    value: 180,
    percent: '26%'
  }
])

const legendFormatter = (name: string) => {
  const index = chartValues.value.findIndex(item => {
    return item.name === name
  })
  return [
    `{a|${chartValues.value[index].name}}`,
    `{c|${chartValues.value[index].value}万元}`,
    `{b|${chartValues.value[index].percent}}`
  ].join('')
}

const legend1 = {
  top: '25%',
  formatter: legendFormatter
}

const legendFormatter1 = (name: string) => {
  const index = chartValues2.value.findIndex(item => {
    return item.name === name
  })
  return [
    `{a|${chartValues2.value[index].name}}`,
    `{c|${chartValues2.value[index].value}万元}`,
    `{b|${chartValues2.value[index].percent}}`
  ].join('')
}

const legend2 = {
  top: '15%',
  formatter: legendFormatter1
}
</script>

<style scoped lang="stylus">
@import "../../assets/common.styl"
.home-6
  margin-top 24px
  height 240px
  .pies
    display flex
  .line
    width 1px
    height 160px
    background rgba(255, 255, 255, 0.1)
  .name
    margin-top -10px
    display flex
    font-size 16px
    color #FFFFFF
    &>span
      flex 1
      text-align center
</style>