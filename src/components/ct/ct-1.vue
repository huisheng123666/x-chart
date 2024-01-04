<template>
  <ct-block title="营业费用分布">
    <v-chart class="chart" :option="option" />
  </ct-block>
</template>

<script lang="ts" setup>
import CtBlock from "@/components/ct/ct-block.vue";
import {computed} from "vue";

const props = defineProps<{
  data: any
}>()

const option = computed(() => {
  const data = props.data
  return {
    tooltip: {
      trigger: 'item'
    },
    series: [
      {
        type: 'pie',
        radius: ['20%', '50%'],
        avoidLabelOverlap: true,
        label: {
          show: true,
          formatter: '{b}\n¥{c}   {d}%',
          lineHeight: 20,
          fontSize: 14,
          color: '#33BBFF',
          alignTo: 'labelLine'
        },
        labelLine: {
          show: true,
          length: 50,
          lineStyle: {
            color: '#38414B'
          }
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
.chart
  height 346px
</style>
