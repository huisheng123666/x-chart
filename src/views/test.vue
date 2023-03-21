<template>
  <div class="rotate-num">
    <flopper :num="5999" />
  </div>
</template>

<script lang="ts" setup>
import Flopper from "@/components/flopper/flopper.vue";
</script>

<style scoped lang="stylus">
.rotate-num
  min-height 100vh
  background #fff
</style>