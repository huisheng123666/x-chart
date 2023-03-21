<script setup lang="ts">
import Home1 from "@/components/home/home1.vue";
import Home2 from "@/components/home/home2.vue";
import Home3 from "@/components/home/home3.vue";
import Home4 from "@/components/home/home4.vue";
import Home5 from "@/components/home/home5.vue";
import Home6 from "@/components/home/home6.vue";
import Home7 from "@/components/home/home7.vue";
import Home8 from "@/components/home/home8.vue";
import TgfHeader from "@/components/tgf-header/tgf-header.vue";
</script>

<template>
  <div class="home">
    <tgf-header/>
    <div class="content">
      <div class="left">
        <home1/>
        <home2/>
        <home3/>
      </div>
      <div class="center">
        <home4/>
        <home5/>
      </div>
      <div class="right">
        <home6/>
        <home7/>
        <home8/>
      </div>
    </div>
  </div>
</template>

<style lang="stylus" scoped>
@keyframes scaleToggle
  0%
    background-size 1890px 1050px, 100% 100%
  50%
    background-size 1890px 1050px, 120% 120%
  100%
    background-size 1890px 1050px, 100% 100%

.home
  background url("./bg@2x.png"), url(./map-bg@2x.png)
  background-position center center, center center
  background-size 1890px 1050px, 100% 100%
  background-repeat no-repeat
  animation scaleToggle 10s ease infinite
  .content
    display flex
    .left
      padding-left 32px
      width 400px
      overflow hidden
    .center
      margin 0 32px
      width 992px
    .right
      margin-top 26px
      width 400px
</style>