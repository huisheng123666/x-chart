<template>
  <div class="home-1">
    <block-title title="授信情况" />
    <ul class="t-head">
      <li>类型</li>
      <li>授信笔数(笔)</li>
      <li>授信总额(万元)</li>
    </ul>
    <TransitionGroup :name="slideName" tag="div" class="list">
      <div class="h1-item" v-for="item in list" :key="item.id">
        <div class="col">
          <img :src="item.icon" alt="">
          {{ item.prodName }}
        </div>
        <div class="col">{{ item.creditNum }}</div>
        <div class="col">{{ item.creditAmt }}</div>
      </div>
    </TransitionGroup>
  </div>
</template>

<script lang="ts" setup>
import icon1 from './home-1-1@2x.png'
import icon2 from './home-1-2@2x.png'
import icon3 from './home-1-3@2x.png'
import {nextTick, onMounted, ref, watch} from "vue";
import BlockTitle from "@/components/home/block-title.vue";

const props = defineProps<{
  data: any
}>()

const list = ref<any[]>([
  {
    "id": 1,
    "prodName": "商业类经营贷",
    "creditNum": "2,598",
    "creditAmt": "4,093,789",
    "icon": icon2
  },
  {
    "id": 2,
    "prodName": "政策类经营贷",
    "creditNum": "68,401",
    "creditAmt": "1,352,457",
    "icon": icon1
  },
  {
    "id": 3,
    "prodName": "消费贷",
    "creditNum": "58,596",
    "creditAmt": "161,467",
    "icon": icon3
  }
])

let timer = 0

const slideName = ref('')

function genList() {
  slideName.value = ''
  clearTimeout(timer)
  const listTm = []
  let id = 0
  for (const key in props.data) {
    id++
    listTm.push({
      id,
      ...props.data[key],
      icon: key === '政策类经营贷' ? icon1 : key === '商业类经营贷' ? icon2 : icon3
    })
  }
  list.value = listTm
  nextTick(() => {
    slideName.value = 'list'
  })
  deleteOne()
}

function deleteOne() {
  const item = {
    ...list.value[0],
    id: Date.now()
  }
  list.value.push(item)
  timer = setTimeout(() => {
    list.value.splice(0, 1)
    deleteOne()
  }, 2000)
}

onMounted(() => {
  if (Object.keys(props.data).length) {
    genList()
  }
})

watch(() => props.data, () => {
  genList()
})
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

.home-1
  height 290px
  margin-top 26px
  background url(@/assets/img/block-bottom@2x.png) left bottom no-repeat
  background-size 100% auto
  .t-head
    padding-right 24px
    padding-left 16px
    display flex
    height 50px
    align-items center
    border-bottom 1px solid rgba(255, 255, 255, 0.1)
    &>li
      color #A3BECC
      text-align right
      &:first-child
        text-align left
        min-width 146px
      &:nth-child(2)
        min-width 80px
      &:nth-child(3)
        flex 1
  .list
    height 165px
    overflow hidden
    position relative
    border-bottom 1px solid rgba(255, 255, 255, 0.1)
  .h1-item
    box-sizing border-box
    width 100%
    padding-left 16px
    padding-right 24px
    display flex
    height 55px
    align-items center
    .col
      font-size 20px
      color #fff
      font-weight bold
      text-align right
      &:first-child
        text-align left
        min-width 146px
        font-size 16px
        color #A3BECC
        &>img
          padding-right 8px
          width 16px
          height 16px
          vertical-align middle
      &:nth-child(2)
        min-width 80px
      &:nth-child(3)
        flex 1
</style>
