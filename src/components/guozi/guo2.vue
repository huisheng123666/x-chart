<template>
  <div class="guo2">
    <dv-border-box1>
      <div class="charts">
        <v-chart class="chart" :option="option1" />
        <v-chart class="chart" :option="option2" />
      </div>
      <dv-scroll-ranking-board
        :config="scrollData"
        style="height:250px; padding: 0 20px; box-sizing: border-box"
        :rowNum="4"
        :sort="false"
      />
    </dv-border-box1>
  </div>
</template>

<script lang="ts" setup>
import {computed} from "vue";

const props = defineProps<{
  data: any
}>()

const option1 = computed(() => {
  const data = props.data
  return {
    title: {
      text: '资产结构分布',
      left: 20,
      top: 15,
      textStyle: {
        color: '#fff',
        fontSize: 18
      }
    },
    tooltip: {
      trigger: 'item'
    },
    series: [
      {
        type: 'pie',
        radius: '55%',
        top: '10%',
        bottom: 0,
        left: -30,
        label: {
          show: true,
          fontSize: 15,
          color: '#fff',
          lineHeight: 20,
          formatter: '{b}\n{d}%'
        },
        data: [
          { value: data.owner_equity_rate, name: '所有者权益' },
          { value: data.total_liabilities_rate, name: '负债' },
        ]
      }
    ]
  }
})

const option2 = computed(() => {
  const data = props.data
  return {
    title: {
      text: '负债分布',
      left: 0,
      top: 10,
      textStyle: {
        color: '#fff',
        fontSize: 18
      }
    },
    tooltip: {
      trigger: 'item'
    },
    series: [
      {
        type: 'pie',
        radius: '55%',
        top: '10%',
        bottom: 0,
        left: -30,
        label: {
          show: true,
          fontSize: 15,
          color: '#fff',
          lineHeight: 20,
          formatter: '{b}\n{d}%'
        },
        data: [
          { value: data.bonds_payable_rate, name: '债券' },
          { value: data.bank_loan_rate, name: '贷款' },
          { value: data.other_rate, name: '其他' },
        ]
      }
    ]
  }
})

const scrollData = computed(() => {
  const data = props.data
  return {
    data: [
      {
        name: '资产增长率',
        value: data.assets_rate,
      },
      {
        name: '净资产增长率',
        value: data.net_assets_rate,
      },
      {
        name: '资产负债率',
        value: data.total_liabilities_rate,
      },
      {
        name: '带息负债率',
        value: data.total_interest_liabilities_rate,
      },
    ],
    unit: '%',
  }
})
</script>

<style scoped lang="stylus">
.guo2
  height 450px
  .charts
    display flex
    .chart
      flex 1
      height 230px
  ::v-deep(.row-item)
    .rank
      display none
</style>
