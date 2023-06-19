<script setup lang="ts">
import {RouterView, useRoute} from 'vue-router'
import {computed, onMounted, ref} from "vue";
import {useIndexStore} from "@/stores";

const { changeScale } = useIndexStore()

const route = useRoute()

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

let resizeTimer = 0

window.addEventListener('resize', () => {
  if (resizeTimer) clearTimeout(resizeTimer)
  resizeTimer = setTimeout(() => {
    setSize()
  }, 100)
})

const pageStyle = computed(() => {
  const scale = Number((size.value.width / 1920).toString().slice(0, 9))
  changeScale(scale)
  // console.log()
  // const left = ((size.value.width - 1920 * scale) / 2).toFixed(0) + 'px'
  return {
    transform: `scale3d(${scale}, ${scale}, 1)`,
    height: parseInt((1080 * scale).toString()) + 'px'
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

const isAdminPath = computed(() => route.path.indexOf('admin') >= 0)
</script>

<template>
  <div :style="{height: pageStyle.height, overflow: 'hidden'}">
    <RouterView :class="!isAdminPath ? 'page' : ''" :style="!isAdminPath ? { transform: pageStyle.transform } : {}" />
  </div>
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
