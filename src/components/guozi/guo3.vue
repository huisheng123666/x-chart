<template>
  <div class="guo3">
    <dv-border-box1>
      <div class="charts">
        <v-chart class="chart" :option="option1" />
        <v-chart class="chart" :option="option2" />
        <v-chart class="chart" :option="option3" />
        <v-chart class="chart" :option="option4" />
      </div>
    </dv-border-box1>
  </div>
</template>

<script lang="ts" setup>
import {computed} from "vue";

const props = defineProps<{
  data: any
}>()

const gaugeData = [
  {
    value: 50,
    name: '50%',
    title: {
      offsetCenter: ['0%', '3%'],
      color: '#fff',
      fontSize: 24
    },
    detail: {
      valueAnimation: true,
      offsetCenter: ['0%', '-50%']
    }
  },
];

const commonConfig = {
  type: 'gauge',
  startAngle: 90,
  endAngle: -270,
  pointer: {
    show: false
  },
  center: ['30%', '50%'],
  progress: {
    show: true,
    overlap: false,
    clip: false,
    itemStyle: {
      color: 'orange',
      borderWidth: 0,
    }
  },
  axisLine: {
    lineStyle: {
      width: 15
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
  const rate = props.data.total_profit_rate
  return {
    title: {
      text: '销售利润率',
      textStyle: {
        color: '#fff',
        fontSize: 20
      },
      right: 30,
      top: 'center'
    },
    series: [
      {
        ...commonConfig,
        data: [
          {
            value: rate < 0 ? 0 : rate,
            name: `${rate}%`,
            title: {
              offsetCenter: ['0%', '3%'],
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
  const rate = props.data.net_profit_rate
  return {
    title: {
      text: '净利润率',
      textStyle: {
        color: '#fff',
        fontSize: 20
      },
      right: 60,
      top: 'center'
    },
    series: [
      {
        ...commonConfig,
        data: [
          {
            value: rate < 0 ? 0 : rate,
            name: `${rate}%`,
            title: {
              offsetCenter: ['0%', '3%'],
              color: '#fff',
              fontSize: 24
            },
            detail: {
              valueAnimation: true,
              offsetCenter: ['0%', `-50%`]
            }
          },
        ]
      }
    ]
  }
})

const option3 = computed(() => {
  const rate = props.data.total_profit_cost_rate
  return {
    title: {
      text: '成本费利润率',
      textStyle: {
        color: '#fff',
        fontSize: 20
      },
      right: 16,
      top: 'center'
    },
    series: [
      {
        ...commonConfig,
        data: [
          {
            value: rate < 0 ? 0 : rate,
            name: `${rate}%`,
            title: {
              offsetCenter: ['0%', '3%'],
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

const option4 = computed(() => {
  const rate = props.data.net_assets_profit_rate
  return {
    title: {
      text: '净资产收益率',
      textStyle: {
        color: '#fff',
        fontSize: 20
      },
      right: 20,
      top: 'center'
    },
    series: [
      {
        ...commonConfig,
        data: [
          {
            value: rate < 0 ? 0 : rate,
            name: `${rate}%`,
            title: {
              offsetCenter: ['0%', '3%'],
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
.guo3
  margin-top 10px
  height 320px
  .charts
    display flex
    flex-wrap wrap
    .chart
      width 50%
      height 160px
</style>
