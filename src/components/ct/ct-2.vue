<template>
  <ct-block title="资产情况">
    <div style="height: 20px"></div>
    <div class="item" v-for="item in scrollData" :key="item.name">
      <div class="top">
        <span>{{ item.name }}</span>
        <span>{{ item.value }}%</span>
      </div>
      <div class="percent">
        <div class="active" :style="{width: item.value >= 0 ? item.value + '%' : 0}"></div>
      </div>
    </div>
  </ct-block>
</template>

<script lang="ts" setup>
import CtBlock from "@/components/ct/ct-block.vue";
import {computed} from "vue";

const props = defineProps<{
  data: any
}>()

const scrollData = computed(() => {
  const data = props.data
  return [
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
  ]
})
</script>

<style scoped lang="stylus">
.item
  padding 0 30px
  margin-top 30px
  .top
    display flex
    justify-content space-between
    font-size 20px
    color #A1AAB3
    span:last-child
      color #fff
  .percent
    margin-top 10px
    height 10px
    background rgba(255, 255, 255, 0.05)
    .active
      height 100%
      background linear-gradient(270deg, #34FFFF 0%, #030E1A 100%)
      transition all 0.3s
</style>
