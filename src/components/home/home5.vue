<template>
  <div class="home-5">
    <h4 class="tgf-title">授信金额与户数</h4>
    <v-chart class="bar-line" :option="options" />
    <div class="chart-ct">
      <div class="item">
        <div class="line"/>
        <p>授信金额</p>
      </div>
      <div class="item">
        <div class="box"/>
        <p>授信户数</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
// legend
import {computed, ref} from "vue";

const XArr = ["2020.05", "2020.06", "2020.07", "2020.08", "2020.09", "2020.10", "2020.11", "2020.12", "2021.01", "2021.02", "2021.03", "2021.04"];
// 第一条数据
let data1 = ref(new Array(12).fill(1).map(i => (300000 * Math.random()).toFixed(0)));
// 第二条数据
let data2 = ref(new Array(12).fill(1).map(i => (60000 * Math.random()).toFixed(0)));

setInterval(() => {
  data1.value = new Array(12).fill(1).map(i => (300000 * Math.random()).toFixed(0))
  data2.value = new Array(12).fill(1).map(i => (300000 * Math.random()).toFixed(0))
}, 3000)
// 蓝色
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

const commonConfig = {
  grid: {
    top: 60,
    left: '1%',
    right: '1%',
    bottom: 20,
    containLabel: true,
  },
  animationDuration: 2000,
  animationDurationUpdate: 800,
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
    formatter: (params: any[]) => {
      const arr = []
      for (let i = 0; i < params.length; i+=3) {
        arr.push({
          value: params[i].data,
          color: typeof params[i].color === "string" ? params[i].color : params[i].color.colorStops[0].color
        })
      }
      let str = ''
      arr.forEach((item, index) => {
        str += `<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:${item.color
        };"></span>${item.value + (index === 0 ? '万元' : '户')}<br/>`
      })
      return str
    }
  },
  xAxis: {
    type: "category",
    data: XArr,
    axisLine: {
      //坐标轴线颜色
      lineStyle: {
        color: "#626361",
      },
    },
    axisLabel: {
      margin: 16,
      color: "#919599", //坐标的字体颜色
      fontSize: 14,
    },
    axisTick: {
      //坐标轴刻度颜色
      show: false,
    },
  },
  yAxis: [
    {
      type: "value",
      name: '万元' + '  ',
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
      name: '  户数',
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
const options = computed(() => {
  return {
    ...commonConfig,
    series: [
      // 第一条数据进度柱子
      {
        name: 'bar1',
        type: "bar",
        barWidth: barWidth,
        stack: "1",
        itemStyle: {
          color: colorsPlan[0],
          borderRadius: 0,
        },
        data: data1.value,
      },
      // 第一条数据上面正方形：颜色
      {
        name: 'bar1',
        type: "pictorialBar",
        symbol: "diamond",
        symbolSize: [barWidth, symbolSizeTop],
        symbolOffset: [0, -symbolSizeTop / 2],
        symbolPosition: "end",
        z: 12,
        color: "#9ACDFF",
        data: data1.value,
      },
      //  第一条数据底部正方形：颜色
      {
        name: 'bar1',
        type: "pictorialBar",
        symbol: "diamond",
        symbolSize: [barWidth, symbolSizeTop],
        symbolOffset: [0, symbolSizeTop / 2],
        z: 12,
        color: colorsPlan[0],
        data: data1.value,
      },
      {
        type: 'line',
        data: data2.value,
        smooth: true,
        yAxisIndex: 1,
        zlevel: 100,
        symbol: 'none',
        borderCap: 'round',
        clip: false,
        color: '#61F2A5',
        lineStyle: {
          color: '#61F2A5',
          width: 5,
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
    height 250px
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
