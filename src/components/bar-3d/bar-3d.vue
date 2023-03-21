<template>
  <v-chart class="bar-3d" :option="options" />
</template>

<script lang="ts" setup>
const props = defineProps<{
  unit: string
}>()

// legend
const XArr = ["1#1支架", "2#2支架", "3#3支架", "4#4支架"];
// 第一条数据
let data1 = [25, 12, 13, 12];
// 第二条数据
let data2 = [36, 32, 34, 32];
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
        color: "#EED743",
      },
      {
        offset: 0.5,
        color: "#D6B628",
      },
      {
        offset: 0.5,
        color: "#B59819",
      },
      {
        offset: 1,
        color: "#DABB35",
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
        color: "#68F4EF",
      },
      {
        offset: 0.5,
        color: "#37D6E5",
      },
      {
        offset: 0.5,
        color: "#19A5B5",
      },
      {
        offset: 1,
        color: "#35C2DA",
      },
    ],
  },
];
let barWidth = 16,
  labelXPosition = 1,
  symbolSizeTop = 8,
  symbolOffsetX = 10;
const options = {
  grid: {
    top: 80,
    left: '10%',
    bottom: 15,
    containLabel: true,
  },
  tooltip: {
    show: true,
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    },
    borderColor: 'blue',
    padding: 2,
    backgroundColor: 'blue',
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
        };"></span>${item.value + props.unit}<br/>`
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
      color: "rgba(255,255,255,.9)", //坐标的字体颜色
      fontSize: 12,
    },
    axisTick: {
      //坐标轴刻度颜色
      show: false,
    },
  },
  yAxis: {
    type: "value",
    name: props.unit + '  ',
    nameLocation: 'end',
    nameTextStyle: {
      color: '#ffffff',
      align: 'right'
    },
    //设置网格线颜色
    splitLine: {
      show: false
    },
    axisLabel: {
      color: "rgba(255,255,255,.9)", //坐标的字体颜色
      fontSize: 12,
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
      color: "#37DAE5",
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
      color: "#E5CD37",
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

<style lang="stylus" scoped>
.bar-3d
  width 400px
  height 300px
</style>