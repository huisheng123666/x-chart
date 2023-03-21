<template>
  <div class="home-2">
    <h4 class="tgf-title">授信放款占比</h4>
    <v-chart class="bar-3d" :option="options" />
    <div class="chart-ct">
      <div class="item">
        <div class="icon one"/>
        <p>授信金额</p>
      </div>
      <div class="item">
        <div class="icon two"/>
        <p>放款金额</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
// legend
const XArr = ["创业贷", "企贷通", "消费贷"];
// 第一条数据
let data1 = [300000, 100000, 150000];
// 第二条数据
let data2 = [200000, 300000, 250000];
// 黄色
const colors = [
  {
    type: "linear",
    x: 1,
    y: 0,
    x2: 0,
    y2: 0,
    colorStops: [
      {
        offset: 0,
        color: "#61E6F2",
      },
      {
        offset: 0.5,
        color: "#00C6D8",
      },
      {
        offset: 0.5,
        color: "#61E6F2",
      },
      {
        offset: 1,
        color: "#00C6D8",
      },
    ],
  },
];
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
  symbolSizeTop = 14,
  symbolOffsetX = 16.8;
const options = {
  grid: {
    top: 60,
    left: '1%',
    right: 0,
    bottom: 20,
    containLabel: true,
  },
  animationDuration: 2000,
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
          color: params[i].color.colorStops[0].color
        })
      }
      let str = ''
      arr.forEach(item => {
        str += `<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:${item.color
        };"></span>${item.value + '万元'}<br/>`
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
  yAxis: {
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
      data: data1,
    },
    // 第一条数据上面正方形：颜色
    {
      name: 'bar1',
      type: "pictorialBar",
      symbol: "diamond",
      symbolSize: [barWidth, symbolSizeTop],
      symbolOffset: [-symbolOffsetX, -symbolSizeTop / 2],
      symbolPosition: "end",
      z: 12,
      color: "#9ACDFF",
      data: data1,
    },
    //  第一条数据底部正方形：颜色
    {
      name: 'bar1',
      type: "pictorialBar",
      symbol: "diamond",
      symbolSize: [barWidth, symbolSizeTop],
      symbolOffset: [-symbolOffsetX, symbolSizeTop / 2],
      z: 12,
      color: colorsPlan[0],
      data: data1,
    },
    // 第二条数据进度柱子
    {
      name: 'bar2',
      type: "bar",
      stack: "2",
      barWidth: barWidth,
      itemStyle: {
        color: colors[0],
      },
      data: data2,
    },
    // 第二条数据中间正方形:颜色
    {
      name: 'bar2',
      type: "pictorialBar",
      symbol: "diamond",
      symbolSize: [barWidth, symbolSizeTop],
      symbolOffset: [symbolOffsetX, -symbolSizeTop / 2],
      symbolPosition: "end",
      z: 12,
      color: "#9AFFF5",
      data: data2,
    },
    // 第二条数据底部正方形
    {
      name: 'bar2',
      type: "pictorialBar",
      symbol: "diamond",
      symbolSize: [barWidth, symbolSizeTop],
      symbolOffset: [symbolOffsetX, symbolSizeTop / 2],
      color: colors[0],
      z: 12,
      data: data2,
    }
  ],
};
</script>

<style scoped lang="stylus">
@import "../../assets/common.styl"
.home-2
  margin-top 32px
  bottomBg()
  position relative
  .bar-3d
    height 250px
  .chart-ct
    position absolute
    left 0
    top 60px
    width 100%
    display flex
    justify-content center
    color #A1AAB3
    font-size 14px
    .item
      display flex
      align-items center
      &:first-child
        margin-right 24px
      .icon
        margin-right 8px
        width 14px
        height 14px
        &.one
          background #2693FF
        &.two
          background #00C6D8
</style>
