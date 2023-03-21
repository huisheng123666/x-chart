<template>
  <div class="home-3">
    <h4 class="tgf-title">贷款额度分布</h4>
    <pie3d style="height: 250px" :grid="{ left: '-22%' }" :legend="{ top: 'center', right: 10, formatter: legendFormatter, textStyle: textStyle }" show-title :values="chartValues" />
  </div>
</template>

<script lang="ts" setup>
import Pie3d from "@/components/Pie-3d/Pie-3d.vue";
import {ref} from "vue";

const chartValues = ref([
  {
    name: "200万以上",
    value: 160,
    percent: '30%'
  },
  {
    name: "200万-100万",
    value: 180,
    percent: '33%'
  },
  {
    name: "100万以下",
    value: 200,
    percent: '37%'
  }
])

const legendFormatter = (name: string) => {
  const index = chartValues.value.findIndex(item => {
    return item.name === name
  })
  return [
    `{a|${chartValues.value[index].name}}`,
    `{b|${chartValues.value[index].percent}}`
  ].join('')
}

const textStyle = {
  color: "#C2DAF2",
    lineHeight: 15,
    rich: {
    a: {
      align: 'left',
        width: 110,
        fontSize: 14,
        lineHeight: 20
    },
    b: {
      color: '#fff',
        align: 'right',
        fontSize: 14,
        fontWeight: 'bold'
    }
  }
}
</script>

<style scoped lang="stylus">
@import "../../assets/common.styl"
.home-3
  margin-top 32px
  bottomBg()
</style>
