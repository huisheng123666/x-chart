<template>
  <div class="kanban5 tgf-block">
    <div class="sub-title">
      <img src="../hengtai-home/title-icon@2x.png" alt="">
      重点工作
    </div>

    <TransitionGroup name="list" tag="div" class="list">
      <div class="item" v-for="item in list" :key="item.id">
        <label>{{ item.index }}</label>
        <p class="ellipsis-one" :title="item.title">{{ item.title }}</p>
        <img v-if="item.finished" src="./finished@2x.png" alt="">
      </div>
    </TransitionGroup>
  </div>
</template>

<script lang="ts" setup>
import {computed} from "vue";

const props = defineProps<{
  list: any[]
}>()

const list = computed(() => {
  return props.list.map((item, index) => {
    return {
      index: index + 1 <= 9 ? '0' + (index + 1) : index + 1,
      ...item
    }
  })
})

// function deleteOne() {
//   const item = {
//     ...list.value[0],
//     id: Date.now()
//   }
//   const item2 = {
//     ...list.value[1],
//     id: Date.now() + 1
//   }
//   list.value.push(item, item2)
//   setTimeout(() => {
//     list.value.splice(0, 2)
//     deleteOne()
//   }, 2000)
// }
//
// deleteOne()
</script>

<style scoped lang="stylus">
@import "../../assets/common.styl"

.kanban5
  height 240px
  margin-top 0
  .list
    margin-top 24px
    display flex
    flex-wrap wrap
    justify-content space-between
    align-content flex-start
    padding 0 24px
    height 160px
    position relative
    overflow-y scroll
    &::-webkit-scrollbar
      width 6px !important
      background-color transparent
    &::-webkit-scrollbar-thumb
      border-radius 3px !important
      background-color rgba(255, 255, 255, 0.1)
    .item
      margin-bottom 8px
      box-sizing border-box
      width 48%
      height 48px
      background: linear-gradient(270deg, rgba(0,169,254,0) 0%, rgba(0,169,254,0.1) 100%)
      border-radius: 4px
      border: 1px solid
      border-image: linear-gradient(270deg, rgba(0, 169, 254, 0), rgba(0, 169, 254, 0.2)) 1 1
      display flex
      align-items center
      padding-left 8px
      &:nth-child(1)
        left 24px
      &:nth-child(2)
        right 24px
      &>label
        margin-right 8px
        width 32px
        height 32px
        line-height 32px
        background rgba(38, 147, 255, 0.1)
        text-align center
        font-size 14px
        color #2693FF
        border-radius 4px
      &>p
        width 290px
        font-size 16px
        color #fff
      &>img
        margin-left 6px
        width 43px
        height 36px
</style>
