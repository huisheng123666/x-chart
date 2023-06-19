<template>
  <div class="kanban-header">
    <img src="./logo@2x.png" alt="">
    <date-time class="date-time"/>
  </div>
</template>

<script lang="ts" setup>
import DateTime from "@/components/date-time/date-time.vue";
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
  .date-time
    margin-top 20px
</style>
