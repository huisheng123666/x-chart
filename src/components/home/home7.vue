<template>
  <div class="home-7">
    <block-title title="实时放款动态" />
    <TransitionGroup :name="listName" tag="ul" class="list">
      <li v-for="(item, index) in ranks" :key="item.id">
        <div class="content">
          <div class="top">
            <p class="ellipsis-one">{{ item.company_type }}</p>
            <span>放款 {{ item.SIGN_AMOUNT }}万元</span>
          </div>
          <div class="bottom">
            <p>{{ item.YHLB }}</p>
            <span>{{ item.fk_time }}</span>
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

const colors = ['#2693FF', '#80C0FF', '#B3D9FF', '#FFFFFF', '#FFFFFF']

const listName = ref('list')

const props = defineProps<{
  list: any[]
}>()

const ranks = ref<any[]>([])
let timer = 0

function genRanks(list: any[]) {
  listName.value = ''
  clearTimeout(timer)
  const res: any[] = []
  list.forEach((item, index) => {
    res.push({
      id: uuidv4(),
      ...item
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
    margin-top 12px
    height 218px
    overflow hidden
    padding-bottom 10px
    position relative
    &>li
      width 100%
      padding-bottom 8px
      .content
        width 100%
        box-sizing border-box
        padding 14px 16px
        background: linear-gradient( 180deg, rgba(38,147,255,0) 0%, rgba(38,147,255,0.1) 100%)
        border: 1px solid
        border-image: linear-gradient(180deg, rgba(38, 147, 255, 0), rgba(38, 147, 255, 0.2)) 1 1
        .top
          display grid
          grid-template-columns 1fr auto
          grid-column-gap 10px
          font-size 16px
          font-weight 500
          &>p
            color #fff
          &>span
            color #2693FF
        .bottom
          margin-top 8px
          display flex
          justify-content space-between
          font-size 14px
          color rgba(255, 255, 255, .5)
</style>
