<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'
import { computed, onMounted, ref } from 'vue'
import { useIndexStore } from '@/stores'
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

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

const routeWidth: any = {
  '/': 2408,
  '/min': 1376,
  '/ct': 2408,
  '/ct/min': 1376
}

const pageStyle = computed(() => {
  const path = route.path

  if (path.indexOf('map') >= 0) {
    return {
      height: '100%'
    }
  }

  const scale = Number((size.value.width / routeWidth[path]).toString().slice(0, 9))
  changeScale(scale)
  // console.log()
  // const left = ((size.value.width - 1920 * scale) / 2).toFixed(0) + 'px'
  return {
    transform: `scale3d(${scale}, ${scale}, 1)`,
    height: parseInt((1290 * scale).toString()) + 'px'
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

const isHomePath = computed(() => route.path === '/' || route.path === '/ct')
</script>

<template>
  <el-config-provider :locale="zhCn">
    <RouterView />
  </el-config-provider>
</template>

<style scoped lang="stylus"></style>
