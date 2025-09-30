<template>
  <div class="kanban-header">
    <img src="./logo@2x.png" alt="">
    <div class="last-time">
      <span>距离今年结束还剩</span>
      {{ lastTime }}
      <date-time class="date-time"/>
    </div>
  </div>
</template>

<script lang="ts" setup>
import DateTime from "@/components/date-time/date-time.vue";
import {onUnmounted, ref} from "vue";

const lastTime = ref('')

function genLastTime() {
  const nowDate = new Date()

  const lastDate = new Date(nowDate.getFullYear(), 11, 31, 23, 59, 59)

  let distance = lastDate.getTime() - nowDate.getTime()
  const msPerMinute = 1000 * 60
  const msPerHour = msPerMinute * 60
  const msPerDay = msPerHour * 24

  const day = Math.floor(distance / msPerDay)
  distance -= day * msPerDay
  const hour = Math.floor(distance / msPerHour)
  distance -= hour * msPerHour
  const minute = Math.floor(distance / msPerMinute)

  lastTime.value = `${day}天${hour > 9 ? hour : '0' + hour}小时${minute > 9 ? minute : '0' + minute}分`
}

genLastTime()

const timer = setInterval(() => {
  genLastTime()
}, 1000 * 60)

onUnmounted(() => {
  clearInterval(timer)
})
</script>

<style scoped lang="stylus">
.kanban-header
  padding 0 24px
  height 104px
  background url("./header-bg@2x.png") center top no-repeat
  background-size 100% auto
  display flex
  justify-content space-between
  &>img
    margin-top 16px
    width 150px
    height 40px
  .last-time
    padding-bottom 30px
    display flex
    align-items center
    font-size 24px
    color #00A9FE
    &>span
      margin-right 8px
      font-size 14px
      color rgba(255, 255, 255, 0.8)
  .date-time
    margin-top 0
</style>
