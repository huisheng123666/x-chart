<template>
  <div class="guo5">
    <dv-border-box1>
      <div class="charts">
        <v-chart class="chart" :option="option1" />
        <v-chart class="chart" :option="option2" />
      </div>
    </dv-border-box1>
  </div>
</template>

<script lang="ts" setup>
import {computed} from "vue";

const props = defineProps<{
  data: any
}>()

const commonConfig = {
  type: 'gauge',
  startAngle: 90,
  endAngle: -270,
  pointer: {
    show: false
  },
  center: ['50%', '50%'],
  progress: {
    show: true,
    overlap: false,
    // roundCap: true,
    clip: false,
    itemStyle: {
      color: 'orange',
      borderWidth: 0,
      borderColor: 'orange'
    }
  },
  axisLine: {
    lineStyle: {
      width: 20
    }
  },
  splitLine: {
    show: false,
    distance: 0,
    length: 10
  },
  axisTick: {
    show: false
  },
  axisLabel: {
    show: false,
  },
  title: {
    fontSize: 16
  },
  detail: {
    show: false
  }
}

const option1 = computed(() => {
  const rate = props.data.ratioOfMonth
  return {
    title: {
      text: '当月投资占比',
      textStyle: {
        color: '#fff',
        fontSize: 20
      },
      right: 'center',
      top: '55%'
    },
    series: [
      {
        ...commonConfig,
        data: [
          {
            value: rate < 0 ? 0 : rate,
            name: `${rate}%`,
            title: {
              offsetCenter: ['0%', '-3%'],
              color: '#fff',
              fontSize: 24
            },
            detail: {
              valueAnimation: true,
              offsetCenter: ['0%', '-50%']
            }
          },
        ]
      }
    ]
  }
})

const option2 = computed(() => {
  const rate = props.data.ratioOfYear
  return {
    title: {
      text: '年累计投资占比',
      textStyle: {
        color: '#fff',
        fontSize: 20
      },
      right: 'center',
      top: '55%'
    },
    series: [
      {
        ...commonConfig,
        data: [
          {
            value: rate < 0 ? 0 : rate,
            name: `${rate}%`,
            title: {
              offsetCenter: ['0%', '-3%'],
              color: '#fff',
              fontSize: 24
            },
            detail: {
              valueAnimation: true,
              offsetCenter: ['0%', '-50%']
            }
          },
        ]
      }
    ]
  }
})
</script>

<style scoped lang="stylus">
.guo5
  height 380px
  margin-bottom 20px
  .charts
    display flex
    height 100%
    .chart
      width 50%
      height 100%
</style>
