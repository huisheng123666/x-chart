<template>
  <div class="guo6">
    <dv-border-box1>
      <h4>重点项目</h4>
      <dv-scroll-board ref="scrollBoard" :config="config" class="scroll" />
    </dv-border-box1>
  </div>
</template>

<script lang="ts" setup>
import {computed} from 'vue';

const props = defineProps<{
  data: any[]
}>()

const config = computed(() => {
  const list = props.data.map((item, index) => {
    return [item.pro_name, item.total_amt, item.month_amt, `<span class="x-tooltip${index}" title="${item.content}">${item.content}</span>`]
  })

  return {
    header: ['项目名称', '总投资', '当月投资', '汇报情况'],
    data: list,
    index: false,
    columnWidth: [380, 100, 100],
    align: ['center']
  }
})
</script>

<style scoped lang="stylus">
.guo6
  height 380px
  h4
    margin-bottom 10px
    padding-top 20px
    padding-left 40px
    font-size 18px
    text-align left
  .scroll
    box-sizing border-box
    width 100%
    padding 10px 40px
    height 300px
</style>
