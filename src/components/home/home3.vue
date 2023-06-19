<template>
  <div class="home-3">
    <block-title title="贷款额度分布" />
    <pie3d style="height: 250px" :grid="{ left: '-22%' }" :legend="{ top: 'center', right: 10, formatter: legendFormatter, textStyle: textStyle }" show-title :values="chartValues" />
  </div>
</template>

<script lang="ts" setup>
import Pie3d from "@/components/Pie-3d/Pie-3d.vue";
import {computed, ref} from "vue";
import BlockTitle from "@/components/home/block-title.vue";

const props = defineProps<{
  data: any
}>()

const mock = [
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
]

const chartValues = computed(() => {
  if (Object.keys(props.data).length === 0) return mock
  const list: any[] = []
  for (let i = 1; i < 4; i++) {
    const item = props.data[i]
    list.push({
      name: item.typeName,
      value: item.proportion,
      percent: (item.proportion * 100).toFixed(0) + '%'
    })
  }
  return list
})

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
