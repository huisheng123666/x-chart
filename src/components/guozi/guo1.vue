<template>
  <div class="guo1">
    <dv-border-box11 title="营业费用">
      <v-chart class="chart" :option="option" />
    </dv-border-box11>
  </div>
</template>

<script lang="ts" setup>
import {computed} from "vue";

const props = defineProps<{
  data: any
}>()

const option = computed(() => {
  const data = props.data
  return {
    series: [
      {
        name: '营业费用',
        type: 'pie',
        radius: ['60%', '80%'],
        top: '16%',
        bottom: 19,
        label: {
          show: true,
          fontSize: 16,
          color: '#fff',
          lineHeight: 24,
          formatter: '{b}\n{c}'
        },
        labelLine: {
          show: true,
          length: 30,
          length2: 50
        },
        data: [
          { value: data.cost, name: '营业成本' },
          { value: data.finance_cost, name: '财务费用' },
          { value: data.selling_cost, name: '销售费用' },
          { value: data.management_cost, name: '管理费用' },
          { value: data.development_cost, name: '研发费用' }
        ]
      }
    ]
  }
})
</script>

<style scoped lang="stylus">
.guo1
  margin-bottom 10px
  height 390px
  .chart
    height 360px
    width 100%
</style>
