<template>
  <teleport to="body">
    <transition name="fade">
      <div class="kanban-dialog" v-if="modelValue" :style="{transform: `scale3d(${indexStore.pageScale}, ${indexStore.pageScale}, 1)`}">
        <h4>{{ title }}</h4>
        <img @click="emit('update:modelValue', false)" class="close" src="../hengtai-home/close@2x.png" alt="">

        <div class="block">
          <h6>基本信息</h6>
          <ul>
            <li v-for="item in detail?.peoples" :key="item.name">
              <label>{{ item.position }}</label>
              <p>{{ item.name }}</p>
            </li>
          </ul>
        </div>

        <div class="block">
          <h6>基本信息</h6>

          <div class="tabs">
            <div
              :class="{tab: true, active: active === i.quarterName}"
              v-for="i in detail.quarters"
              :key="i.quarterName"
              @click="changeActive(i.quarterName)"
            >{{ i.quarterName }}</div>
          </div>

          <div class="list">
            <div class="item" v-for="(item, index) in list" :key="item.personId">
              <div class="index">{{ index + 1 > 9 ? index + 1 : '0' + (index + 1) }}</div>
              <div class="task" v-html="item.content"></div>
<!--              <img v-if="item.finished" src="./finished@2x.png" alt="">-->
              <div class="time">
                <h6>上线截点</h6>
                <p>{{ item.overTime }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script lang="ts" setup>
import {computed, ref, watch} from "vue";
import {useIndexStore} from "@/stores";

const indexStore = useIndexStore()

const props = defineProps<{
  modelValue: boolean
  detail: any
  title: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', val: boolean): void
}>()

const active = ref('Q1')

function changeActive(i: string) {
  active.value = i
}


const list = computed(() => {
  for (let i = 0; i < props.detail.quarters.length; i++) {
    const item = props.detail.quarters[i]
    if (item.quarterName === active.value) {
      return item.quarterPlan || []
    }
  }
  return []
})
//
// let timer = 0
// function deleteOne() {
//   const item = {
//     ...list.value[0],
//     id: Date.now()
//   }
//   list.value.push(item)
//   timer = setTimeout(() => {
//     list.value.splice(0, 1)
//     deleteOne()
//   }, 2000)
// }
//
// watch(() => props.modelValue, (newVal) => {
//   if (newVal) {
//     deleteOne()
//   } else {
//     clearTimeout(timer)
//   }
// })
</script>

<style scoped lang="stylus">
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
  left 0

.fade-enter-active,
.fade-leave-active {
  transform translate3d(0, 0, 0) scale(1)
  transition: all 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform translate3d(100%, -40%, 0) scale(0)
}

.kanban-dialog
  position fixed
  left 50%
  top 50%
  width 1088px
  min-height 682px
  margin-left -544px
  margin-top -330px
  background url(../hengtai-home/info-bg@2x.png) center center no-repeat
  background-size 100% 100%
  .close
    position absolute
    right 8px
    top 0
    width 38px
    height 38px
    cursor pointer
  &>h4
    margin-top 11px
    text-align center
    font-size 16px
    color #fff
  .block
    margin-top 31px
    padding 0 32px
    &>h6
      font-size 16px
      color #00A9FE
    &>ul
      display flex
      flex-wrap wrap
      &>li
        margin-top 16px
        display flex
        width 33%
        font-size 14px
        color #fff
        &>label
          min-width 72px
          margin-right 30px
          color #A3B8CC
    .tabs
      margin-top 16px
      display flex
      .tab
        margin-right 16px
        width 74px
        height 28px
        line-height 28px
        border-radius 14px
        border 1px solid hsla(200, 100%, 50%, 0.2)
        text-align center
        font-size 14px
        color #A3B8CC
        cursor pointer
        &.active
          color #00A9FE
          border-color #00A9FE
    .list
      margin-top 16px
      height 376px
      overflow-y scroll
      position relative
      &::-webkit-scrollbar
        width 6px !important
        background-color transparent
      &::-webkit-scrollbar-thumb
        border-radius 3px !important
        background-color rgba(255, 255, 255, 0.1)
      .item
        width 100%
        display flex
        align-items center
        box-sizing border-box
        margin-bottom 8px
        height 120px
        padding 0 32px 0 16px
        background: linear-gradient(270deg, rgba(0,169,254,0) 0%, rgba(0,169,254,0.1) 100%);
        border-radius: 4px;
        border: 1px solid;
        border-image: linear-gradient(270deg, rgba(0, 169, 254, 0), rgba(0, 169, 254, 0.2)) 1 1;
        .index
          margin-right 16px
          box-sizing border-box
          width 96px
          height 96px
          padding-top 24px
          line-height 24px
          background url(./index-bg.png) center center no-repeat
          background-size contain
          text-indent 49px
          font-size 24px
          color #33BBFF
          font-weight bold
        .task
          flex 1
          font-size 14px
          color #fff
          line-height 20px
        &>img
          width 100px
          height 84px
        .time
          margin-left 24px
          &>h6
            font-size 14px
            color #A3B8CC
          &>p
            margin-top 8px
            font-size 24px
            color #00A9FE
            font-weight 500
</style>
