<template>
  <div class="header">
    <img src="./logo@2x.png" alt="">
    <div class="date-time">
      <p>{{ dateTime.time }}</p>
      <div class="date">
        周{{ dateTime.week }}<br>
        {{ dateTime.date }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import dayjs from "dayjs";
import {onUnmounted, ref} from "vue";

const dayHan = ['日', '一', '二', '三', '四', '五', "六"]

const dateTime = ref({
  time: dayjs().format('HH:mm'),
  week: dayHan[dayjs().day()],
  date: dayjs().format('YYYY-MM-DD')
})

const timer = setInterval(() => {
  const day = dayjs()
  dateTime.value = {
    time: day.format('HH:mm'),
    week: dayHan[day.day()],
    date: day.format('YYYY-MM-DD')
  }
}, 1000)

onUnmounted(() => {
  clearInterval(timer)
})
</script>

<style scoped lang="stylus">
.header
  height 78px
  width 100%
  display flex
  justify-content space-between
  &>img
    margin-left 24px
    margin-top 6px
    width 208px
    height 56px
  .date-time
    margin-right 24px
    display flex
    height 36px
    align-items center
    margin-left 47px
    margin-top 22px
    color #fff
    &>p
      margin-right 16px
      font-size 32px
    .date
      line-height 16px
      font-size 12px
</style>
