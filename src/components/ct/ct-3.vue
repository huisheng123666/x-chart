<template>
  <ct-block title="销售利润率">
    <div class="charts">
      <v-chart class="chart" :option="option1" />
      <v-chart class="chart" :option="option2" />
      <v-chart class="chart" :option="option3" />
      <v-chart class="chart" :option="option4" />
    </div>
  </ct-block>
</template>

<script lang="ts" setup>
import CtBlock from "@/components/ct/ct-block.vue";
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
      text: '营业\n利润率',
      right: '12%',
      top: 'center',
      textStyle: {
        color: '#FFFFFF',
        fontSize: 18,
        lineHeight: 24
      }
    },
    color: ['#12D9F0', '#132940'],
    series: [
      {
        type: 'pie',
        radius: ['55%', '80%'],
        center: ['35%', '50%'],
        label: {
          show: true,
          position: 'center',
          color: '#fff',
          formatter: () => {
            return rate + '%'
          },
          fontSize: 18,
          fontWeight: '600'
        },
        data: [
          { value: rate, name: '' },
          { value: 100 - rate, name: '' },
        ]
      }
    ]
  }
})

const option2 = computed(() => {
  const rate = props.data.net_profit_rate
  return {
    title: {
      text: '净\n利润率',
      right: '12%',
      top: 'center',
      textStyle: {
        color: '#FFFFFF',
        fontSize: 18,
        lineHeight: 24
      }
    },
    color: ['#27FCAE', '#132940'],
    series: [
      {
        type: 'pie',
        radius: ['55%', '80%'],
        center: ['30%', '50%'],
        label: {
          show: true,
          position: 'center',
          color: '#fff',
          formatter: () => {
            return rate + '%'
          },
          fontSize: 18,
          fontWeight: '600'
        },
        data: [
          { value: rate, name: '' },
          { value: 100 - rate, name: '' },
        ]
      }
    ]
  }
})

const option3 = computed(() => {
  const rate = props.data.total_profit_cost_rate
  return {
    title: {
      text: '成本费\n利润率',
      right: '12%',
      top: 'center',
      textStyle: {
        color: '#FFFFFF',
        fontSize: 18,
        lineHeight: 24
      }
    },
    color: ['#FD8B46', '#132940'],
    series: [
      {
        type: 'pie',
        radius: ['55%', '80%'],
        center: ['35%', '50%'],
        label: {
          show: true,
          position: 'center',
          color: '#fff',
          formatter: () => {
            return rate + '%'
          },
          fontSize: 18,
          fontWeight: '600'
        },
        data: [
          { value: rate, name: '' },
          { value: 100 - rate, name: '' },
        ]
      }
    ]
  }
})

const option4 = computed(() => {
  const rate = props.data.net_assets_profit_rate
  return {
    title: {
      text: '净资产\n收益率',
      right: '12%',
      top: 'center',
      textStyle: {
        color: '#FFFFFF',
        fontSize: 18,
        lineHeight: 24
      }
    },
    color: ['#FF5533', '#132940'],
    series: [
      {
        type: 'pie',
        radius: ['55%', '80%'],
        center: ['30%', '50%'],
        label: {
          show: true,
          position: 'center',
          color: '#fff',
          formatter: () => {
            return rate + '%'
          },
          fontSize: 18,
          fontWeight: '600'
        },
        data: [
          { value: rate, name: '' },
          { value: 100 - rate, name: '' },
        ]
      }
    ]
  }
})
</script>

<style scoped lang="stylus">
.charts
  display flex
  flex-wrap wrap
  .chart
    width 50%
    height 160px
</style>
