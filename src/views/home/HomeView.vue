<script setup lang="ts">
import XHeader from "@/components/x-header/x-header.vue";
import Home1 from "@/components/hengtai-home/home-1.vue";
import Home2 from "@/components/hengtai-home/home-2.vue";
import Home3 from "@/components/hengtai-home/home-3.vue";
import Home4 from "@/components/hengtai-home/home-4.vue";
import Home5 from "@/components/hengtai-home/home-5.vue";
import Home6 from "@/components/hengtai-home/home-6.vue";
import News from "@/components/hengtai-home/news.vue";
</script>

<template>
  <div class="home">
    <x-header/>
    <div class="content">
      <div class="left">
        <home-1/>
        <home-2/>
        <home-3/>
      </div>
      <div class="center">
        <home-4/>
        <home-5/>
        <home-6/>
      </div>
      <div class="right">
        <news :tabs="['招标公告', '中标候选人', '中标结果']" title="招标动态" />
        <news :tabs="['董事会', '总经理会', '普通会']" has-center title="决策动态" />
        <news :tabs="['公告', '制度', '媒体']" title="公司动态" />
      </div>
    </div>
  </div>
</template>

<style lang="stylus" scoped>
@keyframes scaleToggle
  0%
    background-size 100% auto, 100% 100%
  50%
    background-size 100% auto, 120% 120%
  100%
    background-size 100% auto, 100% 100%

.home
  background url("./head-bg@2x.png"), url(./home-bg@2x.png)
  background-position top center, center center
  background-size 100% auto, 100% 100%
  background-repeat no-repeat
  animation scaleToggle 10s ease infinite
  .content
    display flex
    .left
      margin-top 36px
      padding-left 24px
      width 480px
      overflow hidden
    .center
      margin 0 24px
      width 864px
    .right
      margin-top 36px
      width 480px
</style>