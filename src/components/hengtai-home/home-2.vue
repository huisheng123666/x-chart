<template>
  <div class="home-2 home-block">
    <div class="sub-title">
      <img src="./title-icon@2x.png" alt="">
      投资项目播报
    </div>

    <TransitionGroup name="list" tag="div" class="list">
      <div class="item" v-for="item in list" :key="item.id">
        <div class="content">
          <div class="col">
            <h6 class="ellipsis-one">城市大脑APP建设</h6>
            <p class="ellipsis-one">描述文字描述文字</p>
          </div>
          <div class="col">
            <h6 class="ellipsis-one blue">5000万元</h6>
            <p class="ellipsis-one">总投资</p>
          </div>
          <div class="col">
            <h6 class="ellipsis-one blue">3289.28万元</h6>
            <p class="ellipsis-one">累计投资</p>
          </div>
        </div>
      </div>
    </TransitionGroup>
  </div>
</template>

<script lang="ts" setup>
import {onMounted, ref} from "vue";

const list = ref<any[]>([])

onMounted(() => {
  const list1 = []
  for (let i = 0; i < 4; i++) {
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

.home-2
  margin-top 24px
  .list
    margin-top 19px
    margin-bottom 16px
    box-sizing border-box
    height 232px
    overflow hidden
    position relative
    .item
      width 100%
      padding-bottom 8px
      overflow: hidden
      .content
        box-sizing border-box
        display flex
        align-items center
        height 52px
        border: 1px solid
        border-image: linear-gradient(270deg, rgba(0, 169, 254, 0), rgba(0, 169, 254, 0.2)) 1 1
        .col
          flex 1
          overflow: hidden;
          &:nth-child(1)
            flex 2
            padding-left 16px
          &>h6
            font-size 14px
            color #fff
            font-weight 500
            &.blue
              color #00A9FE
          &>p
            margin-top 7px
            font-size 12px
            color #A3B8CC
</style>