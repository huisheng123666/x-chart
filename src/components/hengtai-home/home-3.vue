<template>
  <div class="home-3 home-block">
    <div class="sub-title">
      <img src="./title-icon@2x.png" alt="">
      市场动态
      <p>合同总额：{{ data['汇总']['合同金额（万元）'] }}万元</p>
    </div>
    <TransitionGroup :name="aniName" tag="div" class="list">
      <div class="item" v-for="item in list" :key="item.id">
        <h6 class="ellipsis-one">《{{ item['合同名称'] }}》</h6>
        <p>{{ item['合同金额（万元）'] }}万元</p>
        <span>{{ item['日期'].slice(0, 10) }}</span>
      </div>
    </TransitionGroup>
  </div>
</template>

<script lang="ts" setup>
import {nextTick, onMounted, ref, watch} from "vue";
import {v4} from "uuid";

const props = defineProps<{
  data: any
}>()

const list = ref<any[]>([])

let timer = 0
const aniName = ref('')
function init() {
  list.value = props.data['明细'].map((item: any) => {
    return {
      ...item,
      id: v4()
    }
  })
  clearTimeout(timer)
  if (list.value.length < 6) {
    return
  }
  nextTick(() => {
    aniName.value = 'list'
  })
  deleteOne()
}

init()

watch(() => props.data, () => {
  aniName.value = ''
  init()
})

function deleteOne() {
  const item = {
    ...list.value[0],
    id: v4()
  }
  list.value.push(item)
  timer = setTimeout(() => {
    list.value.splice(0, 1)
    deleteOne()
  }, 2000)
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

.home-3
  margin-top 24px
  height 301px
  .sub-title
    &>p
      padding-right 10px
      flex 1
      text-align right
      font-size 14px
      font-weight 400
  .list
    height 267px
    overflow hidden
    position relative
    .item
      box-sizing border-box
      width 100%
      padding 0 16px
      height calc(100% / 6)
      display flex
      align-items center
      overflow hidden
      &>h6
        flex 2
        font-size 14px
        color #fff
        font-weight 500
      &>p
        flex 1
        font-size 14px
        color #00A9FE
        font-weight bold
      &>span
        flex 1
        font-size 14px
        color #A3B8CC
</style>
