<template>
  <div :class="['wrapper', big ? 'big' : '']">
    <h4 class="tgf-title">{{ title }}</h4>
    <canvas ref="titleRef" />
  </div>
</template>

<script lang="ts" setup>
import {onMounted, onUnmounted, ref} from "vue";
import {Parser, Player} from "svga";
import type { Player as PlayerType, Parser as ParserType } from "svga";

const props = withDefaults(defineProps<{
  title: string
  big?: boolean
}>(), {
  big: false
})

const titleRef = ref()

let player: PlayerType | null = null
let parser: ParserType | null = null

onMounted(async () => {
  if (props.big) return

  parser = new Parser()
  const base = import.meta.env.BASE_URL
  const svga = await parser.load( base === '/' ? '' : base + '/block-title-bg.svga')


  player = new Player(titleRef.value)
  await player.mount(svga)
  player.start()
})

onUnmounted(() => {
  parser?.destroy()
  player?.destroy()
})
</script>

<style scoped lang="stylus">
@import "../../assets/common.styl"
.wrapper
  position relative
  &.big
    background url(./big-title@2x.png) left top no-repeat
    background-size 100% auto
  &>canvas
    position absolute
    left 0
    top 0
    width 100%
    height 100%
</style>
