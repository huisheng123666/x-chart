<template>
  <div class="home-6 home-block">
    <div class="sub-title">
      <img src="./title-icon@2x.png" alt="">
      资产负载分布
    </div>

    <div class="pies">
      <pie3d style="height: 166px; width: 520px; margin: 0 auto;" :grid="{ left: '-30%' }" :values="chartValues" :legend="legend1" />
<!--      <div class="line"></div>-->
<!--      <pie3d style="height: 166px; width: 430px" :grid="{ left: '-30%' }" :values="chartValues2" :legend="legend2" />-->
    </div>
    <div class="name">
      <span>资产结构分布</span>
      <span>资产总额：{{ data['资产总额'] }}万元</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Pie3d from "@/components/Pie-3d/Pie-3d.vue";
import {computed} from "vue";

const props = defineProps<{
  data: any
}>()

const chartValues = computed(() => {
  const value1 = +props.data['所有者权益'] || 0
  const value2 = +props.data['负债'] || 0
  const total = value1 + value2
  const percent1 = (value1 / total * 100).toFixed(0)

  return [
    {
      name: "所有者权益",
      value: value1,
      percent: percent1 + '%'
    },
    {
      name: "负债",
      value: value2,
      percent: 100 - Number(percent1) + '%',
      loan: props.data['贷款']
    }
  ]
})

const chartValues2 = computed(() => {
  const value1 = +props.data['贷款'] || 0
  const value2 = +props.data['债券'] || 0
  const value3 = +props.data['其他'] || 0
  const total = value1 + value2 + value3
  const percent1 = (value1 / total * 100).toFixed(0)
  const percent2 = (value2 / total * 100).toFixed(0)

  return [
    {
      name: "贷款",
      value: value1,
      percent: percent1 + '%'
    },
    {
      name: "债券",
      value: value2,
      percent: percent2 + '%'
    },
    {
      name: "其他",
      value: value3,
      percent: 100 - +percent1 - +percent2 + '%'
    }
  ]
})

const legendFormatter = (name: string) => {
  const index = chartValues.value.findIndex(item => {
    return item.name === name
  })
  return [
    `{a|${chartValues.value[index].name}}`,
    `{c|${chartValues.value[index].value}万元}`,
    `{b|${chartValues.value[index].percent}}     ${index === 1 ? '贷款：' + chartValues.value[index].loan : ''}`
  ].join('')
}

const legend1 = {
  top: '25%',
  right: -1,
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
    margin-top -20px
    font-size 16px
    color #FFFFFF
    text-align center
    &>span
      display block
      margin-top 8px
      text-align center
</style>
