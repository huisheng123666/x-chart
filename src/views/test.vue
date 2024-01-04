<template>
  <div class="rotate-num">
  </div>
  <img v-show="false" @load="genImgs" :src="svgUrl" alt="" ref="imgRef">
</template>

<script lang="ts" setup>
import {onMounted, ref} from "vue";

const width = 14524
const height = 11905

const svgUrl = '/floor/1.svg'

const imgRef = ref()

function genImgs() {
  const singleW = Math.floor(width / 4)
  const singleH = Math.floor(height / 4)
  for (let i = 0; i < 4; i++) {
    createCanvas(i, singleW, singleH)
  }
}

// genImgs()

function createCanvas(index: number, singleW: number, singleH: number) {
  for (let i = 0; i < 4; i++) {
    const canvas = document.createElement('canvas')
    canvas.width = singleW
    canvas.height = singleH
    const ctx = canvas.getContext('2d')
    ctx!.rect(0, 0, canvas.width, canvas.height)
    ctx!.fillStyle = '#fff'
    ctx!.fill()
    ctx!.drawImage(imgRef.value, i * singleW, index * singleH, canvas.width * (i + 1), canvas.height * (index + 1), 0, 0, canvas.width * (i + 1), canvas.height * (index + 1))
    document.body.append(canvas)
    const base64 = canvas.toDataURL("image/jpeg", 0.75)
    const a = document.createElement('a')
    a.href = base64
    a.download = 'map' + (index * 4 + i + 1)
    a.innerHTML = 'can' + (index * 4 + i + 1)
    a.className = 'a1'
    document.querySelector('.rotate-num')?.append(a)
  }
}

onMounted(() => {
  // createCanvas()
})
</script>

<style lang="stylus">
//a
  //position fixed
  //color red
  //top 0
  //&.a1
  //  left 0
  //&.a2
  //  left 40px
  //&.a3
  //  left 80px
  //&.a4
  //  left 120px

canvas
  display inline-block
  width 25%

.rotate-num
  position fixed
  left 0
  top 0
  width 300px
  height 300px
  word-break break-all
  &>a
    display inline-block
    margin-right 10px
</style>
