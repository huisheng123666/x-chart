<template>
  <div class="home-8">
    <block-title title="市场主体分部" />
    <v-chart ref="pieRef" class="bar-line" :option="options" />
  </div>
</template>

<script lang="ts" setup>
import {computed, onMounted, onUnmounted, ref} from "vue";
import BlockTitle from "@/components/home/block-title.vue";

const props = defineProps<{
  list: any[]
}>()

const pieRef = ref()

const options = computed(() => {
  return {
    title: {
      text: (props.list[0].rate * 100).toFixed(2) + '%',
      left: '24%',
      top: '40%',
      textAlign: 'center',
      subtext: props.list[0].company_type,
      textStyle: {
        fontSize: 24,
        color: '#fff',
        fontWeight: 600
      },
      subtextStyle: {
        fontSize: 12,
        color: 'rgba(255, 255, 255, 0.6)',
      }
    },
    tooltip: {
      formatter: '{b}'
    },
    color: ['#7733FF', '#00FFE6', '#2F85FF'],
    grid: {
      bottom: '3%',
    },
    legend: {
      itemWidth: 12,
      itemHeight: 12,
      top: 'center',
      right: 0,
      left: '55%',
      itemGap: 20,
      formatter: (name:string) => {
        const arr = name.split(',')
        return `{a|${arr[0]}}{b|${arr[1]}}`
      },
      textStyle: {
        color: '#fff',
        rich: {
          a: {
            width: 80,
            fontSize: 14,
          },
          b: {
            fontSize: 14,
            width: 60,
            align: 'right',
          }
        }
      }
    },
    series: [
      {
        type: 'pie',
        radius: ['42%', '60%'],
        center: ['26%', '50%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderWidth: 5,
          borderColor: '#00121B'
        },
        label: {
          show: false,
        },
        labelLine: {
          show: false
        },
        data: props.list.map((item, _) => {
          return {
            name: item.company_type + ',' + (item.rate * 100).toFixed(2) + '%',
            value: item.cnt
          }
        })
      }
    ]
  }
})

let titleTimer = 0

onMounted(() => {
  const echarts = pieRef.value
  let index = 0
  echarts.dispatchAction({
    type: 'highlight',
    dataIndex: index
  })
  titleTimer = setInterval(() => {
    if (index >= props.list.length) index = 0;
    const current = props.list[index]
    props.list.forEach((_, i) => {
      if (i !== index) {
        echarts.dispatchAction({
          type: 'downplay',
          dataIndex: i
        })
      }
    })
    echarts.dispatchAction({
      type: 'highlight',
      dataIndex: index
    })
    echarts.setOption({
      title: {
        text: (current.rate * 100).toFixed(2) + '%',
        subtext: current.company_type,
      },
    })
    index++
  }, 3000)
})

onUnmounted(() => {
  clearInterval(titleTimer)
})
</script>

<style scoped lang="stylus">
@import "../../assets/common.styl"
.home-8
  margin-top 32px
  bottomBg()
  .bar-line
    height 250px
    background: url("./pie-bg@2x.png") 40px 65px no-repeat,
      linear-gradient(
        180deg,
        rgba(153, 204, 255, 0) 0%,
        rgba(153, 204, 255, 0.08) 100%
      );
    background-size: 124px 124px, auto;
</style>
