<template>
  <div class="flopper">
    <template v-for="(item, index) in currentArr" :key="item.id">
      <flopper-num v-if="item.value !== ',' && item.value !== '.' && item.value !== '-'" :num="item.value" :default="prevArr[index]?.value || 0" />
      <span v-else>{{ item.value }}</span>
    </template>
  </div>
</template>

<script lang="ts" setup>
import FlopperNum from "@/components/flopper/flopper-num.vue";
import {ref, watch} from "vue";
import {splitNum} from "@/common";
import { v4 } from 'uuid'

const props = defineProps<{
  num: number
}>()

function genArr() {
  return splitNum(props.num).split('').map(item => {
    return {
      id: v4(),
      value: item
    }
  })
}

const currentArr = ref(genArr())
const prevArr = ref(new Array(currentArr.value.length).fill({ id: 0, value: 0 }))

watch(() => props.num, (newVal) => {
  prevArr.value = {
    ...currentArr.value
  }
  currentArr.value = genArr()
})
</script>

<style scoped lang="stylus">
.flopper
  display flex
  justify-content center
  align-items center
  font-size 40px
  color #FFFFFF
  font-weight bold
</style>
