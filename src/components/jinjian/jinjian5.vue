<template>
  <div class="home-5">
    <block-title title="各区县金融服务对比" big />
    <v-chart class="bar-line" :option="options" />
  </div>
</template>

<script lang="ts" setup>
// legend
import {computed, ref} from "vue";
import BlockTitle from "@/components/home/block-title.vue";
import {formatNum} from "@/common";

const props = defineProps<{
  data: any
}>()

const colorsPlan = [
  {
    type: "linear",
    x: 1,
    y: 0,
    x2: 0,
    y2: 0,
    colorStops: [
      {
        offset: 0,
        color: "#66CCFF",
      },
      {
        offset: 0.5,
        color: "#2693FF",
      },
      {
        offset: 0.5,
        color: "#66CCFF",
      },
      {
        offset: 1,
        color: "#2693FF",
      },
    ],
  },
];
let barWidth = 28,
  symbolSizeTop = 14;

const commonConfig = computed(() => {
  return  {
    legend: {
      top: '3%',
      textStyle: {
        color: '#fff',
        fontSize: 18,
      }
    },
    grid: {
      top: 70,
      left: '4%',
      right: '8%',
      bottom: 50,
      containLabel: true,
    },
    animationDuration: 2000,
    animationDurationUpdate: 1000,
    tooltip: {
      show: true,
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      },
      borderColor: '#2693FF',
      padding: 5,
      backgroundColor: '#00111A',
      textStyle: {
        color: '#fff'
      },
    },
    xAxis: {
      type: "category",
      data: props.data.map((item: any) => item['注册地区（分县域）']),
      axisLine: {
        //坐标轴线颜色
        lineStyle: {
          color: "#626361",
        },
      },
      axisLabel: {
        interval: 0,
        margin: 14,
        color: "#919599", //坐标的字体颜色
        fontSize: 13,
        width: 60,
        overflow: 'breakAll',
        lineHeight: 20
      },
      axisTick: {
        //坐标轴刻度颜色
        show: false,
      },
    },
    yAxis: [
      {
        type: "value",
        name: '万元',
        nameLocation: 'end',
        nameTextStyle: {
          color: '#919599',
          align: 'right',
          fontSize: 14
        },
        nameGap: 25,
        //设置网格线颜色
        splitLine: {
          show: false
        },
        axisLabel: {
          color: "#919599", //坐标的字体颜色
          fontSize: 14,
        },
      },
      {
        type: "value",
        name: '  服务企业数',
        nameLocation: 'end',
        nameTextStyle: {
          color: '#919599',
          align: 'left',
          fontSize: 14
        },
        nameGap: 25,
        //设置网格线颜色
        splitLine: {
          show: false
        },
        axisLabel: {
          color: "#919599", //坐标的字体颜色
          fontSize: 14,
        },
      }
    ]
  }
})
const options = computed(() => {
  return {
    ...commonConfig.value,
    series: [
      // 第一条数据进度柱子
      {
        name: '贷款余额',
        type: "bar",
        barWidth: 20,
        stack: "1",
        itemStyle: {
          color: '#2693FF',
          borderRadius: 4,
        },
        data: props.data.map((item: any) => item['贷款余额']),
      },
      {
        name: '服务企业数',
        type: 'line',
        data: props.data.map((item: any) => item['服务企业数']),
        smooth: true,
        yAxisIndex: 1,
        zlevel: 100,
        symbol: 'none',
        borderCap: 'round',
        clip: false,
        areaStyle: {
          origin: 'start',
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0, color: '#00D8C3' // 0% 处的颜色
            }, {
              offset: 1, color: 'rgba(0, 216, 195, 0)' // 100% 处的颜色
            }],
            global: false // 缺省为 false
          }
        },
        lineStyle: {
          color: '#00D8C3',
          width: 2,
          cap: 'round'
        },
      }
    ],
  };
})
</script>

<style scoped lang="stylus">
@import "../../assets/common.styl"

.home-5
  position relative
  &>h4
    background url(./big-title@2x.png) left top no-repeat
    background-size contain
  .bar-line
    height 310px
  .chart-ct
    position absolute
    left 0
    top 60px
    width 100%
    display flex
    justify-content center
    .item
      display flex
      align-items center
      color #A1AAB3
      font-size 14px
      &:first-child
        margin-right 56px
      .line
        margin-right 8px
        width 24px
        height 2px
        background #61F2A5
      .box
        margin-right 8px
        width 24px
        height 14px
        background #2693FF
</style>
