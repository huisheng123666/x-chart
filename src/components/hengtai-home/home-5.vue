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

const data1 = ref([2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3])
const data2 = ref([3.9, 5.9, 11.1, 18.7, 48.3, 69.2, 231.6, 46.6, 55.4, 18.4, 10.3, 0.7])

const option = computed(() => {
  return {
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
      left: '8%',
      right: '5%',
      bottom: '15%'
    },
    xAxis: {
      type: 'category',
      nameLocation: 'middle',
      axisTick: false,
      gridIndex: 0,
      data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
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
        formatter: '{value}万元'
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

function tooltipFormatter(val: any) {
  return `
        <div class="line-tooltip">
          <h6 class="title">营业收入&nbsp;&nbsp;&nbsp;&nbsp;200万元</h6>
          <div class="item">
             <label>No1</label>
             <p>宜昌大数据产业园运营管理有限公司</p>
             <span>50万元</span>
          </div>
          <div class="item">
             <label>No2</label>
             <p>宜昌城市大脑运营管理有限公司</p>
             <span>30万元</span>
          </div>
          <div class="item">
             <label>No3</label>
             <p>湖北三峡金融科技有限公司</p>
             <span>20万元</span>
          </div>
          <div class="item">
             <label>No4</label>
             <p>奇安国投(湖北)科技有限公司</p>
             <span>10万元</span>
          </div>
        </div>
      `
}
function setOptions() {
  setTimeout(() => {
    data1.value = data1.value.map(item => {
      return Number((Math.random() * 300).toFixed(0))
    })
    data2.value = data2.value.map(item => {
      return Number((Math.random() * 300).toFixed(0))
    })
    setOptions()
  }, 5000)
}

setOptions()
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