<template>
  <ct-block title="投资进度统计">
    <div class="item" v-for="item in scrollData" :key="item.name">
      <div class="top">
        <p class="ellipsis-one">
          <el-tooltip :content="item.pro_name">
            {{ item.pro_name }}
          </el-tooltip>
        </p>
        <p><span>￥{{ item.total_amt }}</span>&nbsp;&nbsp;&nbsp;&nbsp;{{ item.total_complete_rate }}%</p>
      </div>
      <div class="percent">
        <div class="active" :style="{width: item.width}"></div>
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
  return data?.map((item: { total_complete_rate: string | number; }) => {
    return {
      ...item,
      width: item.total_complete_rate >= 0 ? item.total_complete_rate + '%' : 0
    }
  })
})
</script>

<style scoped lang="stylus">
@import "../../assets/common.styl"

.item
  padding 0 30px
  margin-top 25px
  .top
    display flex
    justify-content space-between
    font-size 20px
    color #A1AAB3
    p:last-child
      margin-left 10px
      color #fff
      &>span
        color #34FFFF
        font-weight bold
  .percent
    margin-top 10px
    height 10px
    background rgba(255, 255, 255, 0.05)
    .active
      height 100%
      background linear-gradient(270deg, #34FFFF 0%, #030E1A 100%)
      transition all 0.3s
</style>
