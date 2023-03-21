<template>
  <TransitionGroup name="list" tag="div" class="list" :style="{height: height + 'px'}">
    <slot/>
  </TransitionGroup>
</template>

<script lang="ts" setup>
const props = defineProps<{
  height: number
  animation?: boolean
}>()

const emit = defineEmits<{
  (e: 'deleteOne'): void
}>()

// function delOne() {
//   const item = list.value.splice(0, 1)[0]
//   nextTick(() => {
//     list.value.push(Math.random())
//   })
//   setTimeout(() => {
//     delOne()
//   }, 3000)
// }

function animation() {
  setTimeout(() => {
    emit('deleteOne')
    console.log(343)
    animation()
  }, 3000)
}

if (props.animation) animation()
</script>

<style scoped lang="stylus">
.list-move, /* 对移动中的元素应用的过渡 */
.list-leave-active {
  transform translate3d(0, 0, 0)
  transition: all 0.5s ease;
}

.list-enter-active
  transform translate3d(0, 0, 0)
  transition all 0.5s ease

.list-enter-from {
  transform translate3d(0, 100%, 0)
}

.list-leave-to {
  transform translate3d(0, -100%, 0)
}

/* 确保将离开的元素从布局流中删除
  以便能够正确地计算移动的动画。 */
.list-leave-active {
  position: absolute;
}
.list
  position relative
  overflow hidden
</style>