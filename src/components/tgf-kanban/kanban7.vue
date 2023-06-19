<template>
  <div class="kanban7 tgf-block">
    <div class="sub-title">
      <img src="../hengtai-home/title-icon@2x.png" alt="">
      项目完成情况
    </div>

    <div class="list">
      <div class="item" v-for="item in list" :key="item.id">
        <div class="percent">
          <h6>{{ item.name }} <span>{{ item.percent }}</span></h6>
          <div class="line">
            <div class="active" :style="{width: item.percent }"></div>
          </div>
        </div>
        <div class="btn" @click="changeCurrent(item.detail, item.name)">查看详情</div>
      </div>
      <div style="height: 20px"></div>
    </div>

    <kanban-dialog v-model="showDialog" :detail="current" :title="currentTitle" />
  </div>
</template>

<script lang="ts" setup>
import {computed, ref} from "vue";
import KanbanDialog from "@/components/tgf-kanban/kanban-dialog.vue";

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
//   list.value.push(item)
//   setTimeout(() => {
//     list.value.splice(0, 1)
//     deleteOne()
//   }, 2000)
// }
//
// deleteOne()

const showDialog = ref(false)
const current = ref<any>({})
const currentTitle = ref('')

function changeCurrent(item: any, title: string) {
  current.value = item
  showDialog.value = true
  currentTitle.value = title
}
</script>

<style scoped lang="stylus">
@import "../../assets/common.styl"

.list-move, /* 对移动中的元素应用的过渡 */
.list-leave-active
  transform translate3d(0, 0, 0)
  transition all 0.6s linear

.list-enter-active
  transform translate3d(0, 0, 0)
  transition all 0.6s linear

.list-enter-from
  transform translate3d(0, 100%, 0)

.list-leave-to
  transform translate3d(0, -100%, 0)

/* 确保将离开的元素从布局流中删除
  以便能够正确地计算移动的动画。 */
.list-leave-active
  position: absolute
  left 24px


.kanban7
  margin-top 0
  height 463px
  .list
    box-sizing border-box
    padding 0 24px
    height 429px
    overflow-y scroll
    position relative
    &::-webkit-scrollbar
      width 6px !important
      background-color transparent
    &::-webkit-scrollbar-thumb
      border-radius 3px !important
      background-color rgba(255, 255, 255, 0.1)
    .item
      width 422px
      padding 0 16px
      margin-top 15px
      box-sizing border-box
      height: 68px;
      background: linear-gradient(270deg, rgba(0,169,254,0) 0%, rgba(0,169,254,0.1) 100%);
      border-radius: 4px;
      border: 1px solid;
      border-image: linear-gradient(270deg, rgba(0, 169, 254, 0), rgba(0, 169, 254, 0.2)) 1 1;
      display flex
      align-items center
      .percent
        flex 1
        &>h6
          margin-bottom 12px
          display flex
          justify-content space-between
          font-size 14px
          color #fff
          &>span
            color #00A9FE
            font-weight bold
        .line
          height 8px
          background rgba(255, 255, 255, 0.1)
          overflow hidden
          .active
            height 100%
            background-image repeating-linear-gradient(-70deg, #00D4FF 0, #00A9FE 2px, transparent 2px, transparent 4px)
            border-top-left-radius 4px
            border-bottom-right-radius 8px
            overflow hidden
      .btn
        margin-left 16px
        width 80px
        height 36px
        line-height 36px
        text-align center
        font-size 14px
        color #FFFFFF
        background url(./btn@2x.png) center center no-repeat
        background-size contain
        cursor pointer
</style>
