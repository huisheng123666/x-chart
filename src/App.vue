<script setup lang="ts">
import { RouterView } from 'vue-router'
import {computed, nextTick, onMounted, ref} from "vue";

/* --------------- 滚动 ---------------- */
const size = ref({
  width: document.body.clientWidth,
  height: document.body.clientHeight
})

onMounted(() => {
  setSize()
})

let timer = 0
function setSize() {
  if (timer) {
    return
  }
  timer = setTimeout(() => {
    size.value = {
      width: document.body.clientWidth,
      height: document.body.clientHeight
    }
    timer = 0
  }, 100)
}

window.addEventListener('resize', () => {
  setSize()
})

const pageStyle = computed(() => {
  const scale = Math.floor(size.value.width / 1920 * 100) / 100 - 0.01
  // console.log()
  // const left = ((size.value.width - 1920 * scale) / 2).toFixed(0) + 'px'
  return {
    transform: `scale3d(${scale}, ${scale}, 1)`,
    height: 1080 * scale + 'px'
  }
})


/* --------------- 剧中 ---------------- */
// const size = ref({
//   width: window.innerWidth,
//   height: window.innerHeight
// })
//
// window.addEventListener('resize', () => {
//   size.value.height = window.innerHeight
//   size.value.width = window.innerWidth
// })
//
// const pageStyle = computed(() => {
//   const ratio = size.value.width / size.value.height
//   const scale = ratio > (16 / 9) ? size.value.height / 1080 : size.value.width / 1920
//   // console.log()
//   // const left = ((size.value.width - 1920 * scale) / 2).toFixed(0) + 'px'
//   return {
//     transform: `translate3d(-50%, -50%, 0) scale3d(${scale}, ${scale}, 1)`
//   }
// })
</script>

<template>
  <RouterView class="page" :style="pageStyle" />
</template>

<style scoped lang="stylus">
.page
  width 1920px
  height 1080px
  transform-origin left top
  transition all 0.5s
  // 滚动
  //transform-origin center center
  //position fixed
  //left 50%
  //top 50%
</style>
