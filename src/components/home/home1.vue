<template>
  <div class="home-1">
    <h4 class="sub-title">授信情况</h4>
    <ul class="t-head">
      <li>类型</li>
      <li>授信笔数(笔)</li>
      <li>授信总额(万元)</li>
    </ul>
    <TransitionGroup name="list" tag="div" class="list">
      <div class="h1-item" v-for="item in list" :key="item.id">
        <div class="col">
          <img :src="item.icon" alt="">
          {{ item.name }}
        </div>
        <div class="col">{{ item.num1 }}</div>
        <div class="col">{{ item.num2 }}</div>
      </div>
    </TransitionGroup>
  </div>
</template>

<script lang="ts" setup>
import icon1 from './home-1-1@2x.png'
import icon2 from './home-1-2@2x.png'
import icon3 from './home-1-3@2x.png'
import {ref} from "vue";

const list = ref([
  {
    id: 1,
    name: '政策类经营贷',
    num1: '20,867',
    num2: '383,112',
    icon: icon1
  },
  {
    id: 2,
    name: '商业类经营贷',
    num1: '1,348',
    num2: '1,278,100',
    icon: icon2
  },
  {
    id: 3,
    name: '消费贷',
    num1: '17,053',
    num2: '123,122',
    icon: icon3
  }
])

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

deleteOne()
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