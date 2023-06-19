<template>
  <div class="home-8">
    <block-title title="银行贷款利率排名" />
    <v-chart class="bar-line" :option="options" />
  </div>
</template>

<script lang="ts" setup>
import {computed, ref} from "vue";
import BlockTitle from "@/components/home/block-title.vue";

const props = defineProps<{
  list: any[]
}>()

const startIndex = ref(0)
const lastIndex = ref(5)

const XArr = computed(() => {
  return props.list?.slice(startIndex.value, lastIndex.value).map(item => item.deptNAME) || []
});
const XArr1 = computed(() => {
  return props.list?.slice(startIndex.value, lastIndex.value).map(item => item.productName) || []
});
// 第一条数据
let data1 = computed(() => {
  return props.list?.slice(startIndex.value, lastIndex.value).map(item => item.interest) || []
});

setInterval(() => {
  if (lastIndex.value < props.list?.length - 2) {
    startIndex.value = 5
    lastIndex.value = 10
  } else {
    startIndex.value = 0
    lastIndex.value = 5
  }
}, 4000)
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
let barWidth = 28,
  symbolSizeTop = 14;

const commonConfig = computed(() => {
  return {
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
          };"></span>${item.value}%<br/>`
        })
        return str
      }
    },
    xAxis: {
      type: "category",
      data: XArr.value,
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
        nameGap: 25,
        //设置网格线颜色
        splitLine: {
          show: false
        },
        axisLabel: {
          show: false,
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
        name: 'bar1',
        type: "bar",
        barWidth: barWidth,
        stack: "1",
        itemStyle: {
          color: colorsPlan[0],
          borderRadius: 0,
        },
        data: data1.value,
        label: {
          show: true,
          position: [1, -35],
          color: '#A3BECC',
          align: 'center',
          offset: [barWidth/2, -15],
          fontSize: 16,
          lineHeight: 20,
          formatter: (params: any) => {
            const percentInt = params.data.toString()
            return `${XArr1.value[params.dataIndex]}\n${Number(percentInt) + '%'}`
          }
        }
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
        color: "#9AFFF5",
        data: data1.value
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
      }
    ],
  };
})
</script>

<style scoped lang="stylus">
@import "../../assets/common.styl"
.home-8
  margin-top 32px
  bottomBg()
  .bar-line
    height 250px
</style>
