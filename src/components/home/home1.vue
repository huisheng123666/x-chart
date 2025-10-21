<template>
  <div class="home-1">
    <block-title title="授信放款情况" />
    <ul class="t-head">
      <li>类型</li>
      <li>授信总额(万元)</li>
      <li>放款金额(万元)</li>
    </ul>
    <TransitionGroup :name="slideName" tag="div" class="list">
      <div class="h1-item" v-for="item in list" :key="item.id">
        <div class="col">
<!--          <img :src="item.icon" alt="">-->
          {{ item.prodName }}
        </div>
        <div class="col">{{ formatNum(item.creditAmt) }}</div>
        <div class="col">{{ formatNum(item.signAmt) }}</div>
      </div>
    </TransitionGroup>
  </div>
</template>

<script lang="ts" setup>
import icon1 from './home-1-1@2x.png'
import icon2 from './home-1-2@2x.png'
import icon3 from './home-1-3@2x.png'
import icon4 from './home-1-4.png'
import {nextTick, onMounted, ref, watch} from "vue";
import BlockTitle from "@/components/home/block-title.vue";
import {formatNum} from "@/common";

const props = defineProps<{
  data: any
}>()


const list = ref<any[]>([
  {
    "id": 4,
    "prodName": "企贷通",
    "creditNum": "68,401",
    "creditAmt": "1,352,457",
    "icon": icon4,
    signAmt: 1146016
  },
  {
    "id": 2,
    "prodName": "创业贷",
    "creditNum": "68,401",
    "creditAmt": "1,352,457",
    "icon": icon1,
    signAmt: 1146016
  },
  {
    "id": 3,
    "prodName": "消费贷",
    "creditNum": "58,596",
    "creditAmt": "161,467",
    "icon": icon3,
    signAmt: 6327833
  },
  {
    "id": 1,
    "prodName": "银企专区",
    "creditNum": "2,598",
    "creditAmt": "4,093,789",
    "icon": icon2,
    signAmt: 73670
  }
])

const icons: any = {
  企贷通: icon4,
  创业贷: icon1,
  消费贷: icon3,
  银企专区: icon2
}

const keys = ['创业贷', '消费贷', '银企专区']

let timer = 0

const slideName = ref('')

function genList() {
  slideName.value = ''
  clearTimeout(timer)
  list.value = props.data.map((item: any, index: any) => {
    return {
      id: index,
      ...item
    }
  })
  nextTick(() => {
    slideName.value = 'list'
    deleteOne()
  })
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
  if (props.data.length) {
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
      font-size 15px
      &:first-child
        text-align left
        min-width 100px
      &:nth-child(2)
        flex 1
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
        min-width 100px
        font-size 16px
        color #A3BECC
        &>img
          padding-right 8px
          width 16px
          height 16px
          vertical-align middle
      &:nth-child(2)
        flex 1
      &:nth-child(3)
        flex 1
</style>
