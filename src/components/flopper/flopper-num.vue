<template>
  <div class="wrapper">
    <div class="flopper-num" :style="transformStyle">
      <div class="item" v-for="item in 10" :key="item">{{ item - 1 }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {onMounted, ref} from "vue";

const props = defineProps<{
  num: string
  default?: number
}>()

let current = ref(props.default || 0)


const transformStyle = ref({
  transform: `translate3d(0, ${-current.value * 60}px, 0)`,
  transition: 'none'
})

let timer = 0
let task: number[] = [Number(props.num)]

function genStyle() {
  if (task.length) {
    const num = task[task.length - 1]
    task = []
    const delay = Math.abs(num - current.value) * 0.5
    transformStyle.value = {
      transform: `translate3d(0, ${-num * 60}px, 0)`,
      transition: `all ${delay}s`
    }
    timer = setTimeout(() => {
      current.value = num
      genStyle()
    }, delay * 1000)
  }
}

onMounted(() => {
  setTimeout(() => {
    genStyle()
  }, 200)
})
</script>

<style scoped lang="stylus">
.wrapper
  height 56px
  overflow hidden
  margin 0 2px
.flopper-num
  position relative
  width 40px
  height 56px
  .item
    position absolute
    left 0
    top 0
    width 40px
    height 100%
    background #0055FF
    font-size 40px
    color #fff
    font-weight bold
    text-align center
    line-height 56px
    &:nth-child(1)
      transform translateY(0)
    &:nth-child(2)
      transform translateY(60px)
    &:nth-child(3)
      transform translateY(120px)
    &:nth-child(4)
      transform translateY(180px)
    &:nth-child(5)
      transform translateY(240px)
    &:nth-child(6)
      transform translateY(300px)
    &:nth-child(7)
      transform translateY(360px)
    &:nth-child(8)
      transform translateY(420px)
    &:nth-child(9)
      transform translateY(480px)
    &:nth-child(10)
      transform translateY(540px)
</style>