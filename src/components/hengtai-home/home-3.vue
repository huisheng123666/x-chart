<template>
  <div class="home-3 home-block">
    <div class="sub-title">
      <img src="./title-icon@2x.png" alt="">
      市场动态
    </div>
    <TransitionGroup name="list" tag="div" class="list">
      <div class="item" v-for="item in list" :key="item.id">
        <h6 class="ellipsis-one">《城市大脑建设合同》</h6>
        <p>5000万元</p>
        <span>2023-03-11</span>
      </div>
    </TransitionGroup>
  </div>
</template>

<script lang="ts" setup>
import {onMounted, ref} from "vue";

const list = ref<any[]>([])

onMounted(() => {
  const list1 = []
  for (let i = 0; i < 6; i++) {
    list1.push({
      id: i
    })
  }
  list.value = list1
  deleteOne()
})

function deleteOne() {
  const item = {
    ...list.value[0],
    id: Date.now()
  }
  list.value.push(item)
  setTimeout(() => {
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