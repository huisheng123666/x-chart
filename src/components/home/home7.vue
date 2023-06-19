<template>
  <div class="home-7">
    <block-title title="银行贷款产品排名" />
    <TransitionGroup :name="listName" tag="ul" class="list">
      <li v-for="(item, index) in ranks" :key="item.id">
        <div class="index" :style="{color: item.color}">{{ item.index }}</div>
        <div class="right">
          <div class="top">
            <h6>{{ item.name }}</h6>
            <p :style="{color: item.color}">{{ item.valueStr }} 次</p>
          </div>
          <div class="percent">
            <div class="active" :style="{width: item.percent, background: item.color}" />
          </div>
        </div>
      </li>
    </TransitionGroup>
  </div>
</template>

<script lang="ts" setup>
import {nextTick, onMounted, ref, watch} from "vue";
import { v4 as uuidv4 } from 'uuid';
import BlockTitle from "@/components/home/block-title.vue";

const colors = ['#2693FF', '#80C0FF', '#B3D9FF', '#FFFFFF']

const listName = ref('list')

interface RankItem {
  id: string
  index: string
  name: string
  valueStr: string
  percent: string
  color: string
}

const props = defineProps<{
  list: any[]
}>()

const ranks = ref<RankItem[]>([])
let timer = 0

function genRanks(list: any[]) {
  listName.value = ''
  clearTimeout(timer)
  const first = Number(list[0]?.applyNum.replace(/,/g, '') || 0)
  let big = first + first * 0.27
  const res: RankItem[] = []
  list.forEach((item, index) => {
    const num = Number(item.applyNum.replace(/,/g, '') || 0)
    res.push({
      id: uuidv4(),
      index: '0' + (index + 1),
      name: item.deptName + ' | ' + item.prodName,
      valueStr: item.applyNum,
      percent: (num / big * 100).toFixed(0) + '%',
      color: colors[index]
    })
  })
  ranks.value = res
  nextTick(() => {
    listName.value = 'list'
    deleteOne()
  })
}

function deleteOne() {
  const item = {
    ...ranks.value[0],
    id: uuidv4()
  }
  ranks.value.push(item)
  timer = setTimeout(() => {
    ranks.value.splice(0, 1)
    deleteOne()
  }, 2000)
}

onMounted(() => {
  genRanks(props.list)
})

watch(() => props.list, (newVal) => {
  genRanks(props.list)
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

.home-7
  height 290px
  margin-top 32px
  bottomBg()
  .list
    height 218px
    overflow hidden
    padding-bottom 10px
    position relative
    &>li
      box-sizing border-box
      padding 0 10px
      width 100%
      display flex
      align-items center
      padding-top 24px
      .index
        margin-right 16px
        width 32px
        height 32px
        line-height 32px
        text-align center
        border-right 4px
        background rgba(38, 147, 255, 0.1)
        font-size 14px
        font-weight bold
      .right
        flex 1
        .top
          margin-bottom 10px
          display flex
          justify-content space-between
          font-size 16px
          color #A3BECC
          &>p
            font-weight bold
        .percent
          height 2px
          background rgba(255, 255, 255, 0.1)
          .active
            position relative
            height 100%
            transition all 0.6s
            &:after
              content ''
              position absolute
              right 0
              top -3px
              width 4px
              height 8px
              background inherit
              border-bottom-right-radius 4px
              transform rotateZ(10deg)
</style>
