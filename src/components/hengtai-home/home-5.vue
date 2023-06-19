<template>
  <div class="home-5 home-block">
    <div class="sub-title">
      <img src="./title-icon@2x.png" alt="">
      收入利润趋势
    </div>

    <v-chart class="chart" :option="option" />
  </div>
</template>

<script lang="ts" setup>
import { graphic } from 'echarts'
import {computed, ref} from "vue";

const props = defineProps<{
  data: any
}>()

const months = computed(() => {
  return props.data['母公司'].map((item: any) => item['时间'].slice(5))
})

const data1 = computed(() => {
  return props.data['母公司'].map((item: any) => item['营业收入'])
})
const data2 = computed(() => {
  return props.data['母公司'].map((item: any) => item['营业利润'])
})

const option = computed(() => {
  return {
    animationDurationUpdate: 800,
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(8, 17, 38, 0.8)',
      borderColor: 'rgba(0, 169, 254, 0.40)',
      formatter: tooltipFormatter
    },
    legend: {
      right: 10,
      top: 10,
      icon: 'rect',
      itemWidth: 24,
      itemHeight: 2,
      textStyle: {
        color: '#A1AAB3'
      }
    },
    grid: {
      top: '25%',
      left: '10%',
      right: '3%',
      bottom: '15%'
    },
    xAxis: {
      type: 'category',
      nameLocation: 'middle',
      axisTick: false,
      gridIndex: 0,
      data: months.value,
      boundaryGap: false
    },
    yAxis: {
      name: '',
      splitLine: {
        show: true,
        lineStyle: {
          type: 'dashed',
          color: ['rgba(255, 255, 255, 0.1)']
        }
      },
      axisLabel: {
        formatter: '{value}万元',
      }
    },
    series: [
      {
        name: '营业收入',
        type: 'line',
        datasetId: 'dataset_since_1950_of_germany',
        showSymbol: false,
        data: data1.value,
        smooth: true,
        lineStyle: {
          color: '#3399FF'
        },
        color: '#3399FF',
        areaStyle: {
          color: new graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgba(51, 153, 255, 0.5)'
            },
            {
              offset: 1,
              color: 'rgba(51, 153, 255, 0)'
            }
          ])
        }
      },
      {
        name: '营业利润',
        type: 'line',
        datasetId: 'dataset_since_1950_of_france',
        showSymbol: false,
        data: data2.value,
        smooth: true,
        lineStyle: {
          color: '#00D8C3'
        },
        color: '#00D8C3',
        areaStyle: {
          color: new graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgba(0, 216, 195, 0.5)'
            },
            {
              offset: 1,
              color: 'rgba(0, 216, 195, 0)'
            }
          ])
        }
      }
    ]
  }
})

function genFormatItem(key: string, list: any[]) {
  const copy = JSON.parse(JSON.stringify(list))
  copy.sort((a: any, b: any) => b[key] - a[key])
  return copy.map((item: any, index: number) => {
    return `
      <div class="item">
         <label>No${index + 1}</label>
         <p>${item['公司名称']}</p>
         <span>${item[key]}万元</span>
      </div>
    `
  }).join('')
}

function tooltipFormatter(val: any) {
  const index = val[0].dataIndex
  const parent = props.data['母公司'][index]
  const month = parent['时间']
  const list = props.data[month]
  if (!list) return `
        <div class="line-tooltip">
          <h6 class="title">营业收入&nbsp;&nbsp;&nbsp;&nbsp;${parent['营业收入']}万元</h6>
        </div>
        <div class="line-tooltip" style="margin-top: 10px">
          <h6 class="title">营业利润&nbsp;&nbsp;&nbsp;&nbsp;${parent['营业利润']}万元</h6>
        </div>
      `
  return `
        <div class="line-tooltip">
          <h6 class="title">营业收入&nbsp;&nbsp;&nbsp;&nbsp;${parent['营业收入']}万元</h6>
          ${genFormatItem('营业收入', list)}
        </div>
        <div class="line-tooltip" style="margin-top: 10px">
          <h6 class="title">营业利润&nbsp;&nbsp;&nbsp;&nbsp;${parent['营业利润']}万元</h6>
          ${genFormatItem('营业利润', list)}
        </div>
      `
}
</script>

<style scoped lang="stylus">
@import "../../assets/common.styl"
.home-5
  height 240px
  position relative
  .chart
    position absolute
    left 0
    top 0
    width 100%
    height 100%
</style>
