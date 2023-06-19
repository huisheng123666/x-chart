<script setup lang="ts">
import XHeader from "@/components/x-header/x-header.vue";
import Home1 from "@/components/hengtai-home/home-1.vue";
import Home2 from "@/components/hengtai-home/home-2.vue";
import Home3 from "@/components/hengtai-home/home-3.vue";
import Home4 from "@/components/hengtai-home/home-4.vue";
import Home5 from "@/components/hengtai-home/home-5.vue";
import Home6 from "@/components/hengtai-home/home-6.vue";
import News from "@/components/hengtai-home/news.vue";
import axios from "axios";
import {onMounted, onUnmounted, reactive} from "vue";
import {hentaiTemplate} from "@/common/config";

const homeData = reactive<any>({
  data2: [],
  data3: [],
  data4: {},
  data5: {},
  news: {
    '公司动态': [],
    '决策会议': [],
    '招标': [],
    '市场': []
  }
})

function genData(data: any) {
  homeData.data2 = data['项目']
  homeData.data3 = data['市场']
  const realData4 = data['财务概况'][0]
  if (realData4) {
    homeData.data4 = realData4
  }
  if (data['利润趋势']) {
    homeData.data5 = data['利润趋势']
  }
  if (data['公司动态']) {
    homeData.news['公司动态'] = data['公司动态']
  }
  if (data['决策会议']) {
    homeData.news['决策会议'] = data['决策会议']
  }
  if (data['招标']) {
    homeData.news['招标'] = data['招标']
  }
  if (data['市场']) {
    homeData.news['市场'] = data['市场']['明细']
  }
}

genData(hentaiTemplate)

function getData() {
  const base = import.meta.env.DEV ? '' : '/htdp'
  axios.get(base + '/api/gzw/yqyp/htmh')
    .then(res => {
      if (res.data.code === 1) {
        genData(res.data.data)
      }
    })
}

let timer = 0

onMounted(() => {
  getData()

  timer = setInterval(() => {
    getData()
  }, 1000 * 60)
})

onUnmounted(() => {
  clearInterval(timer)
})
</script>

<template>
  <div class="home">
    <x-header/>
    <div class="content">
      <div class="left">
        <home-1/>
        <home-2 :data="homeData.data2" />
<!--        <home-3 :data="homeData.data3" />-->
      </div>
      <div class="center">
        <home-4 :data="homeData.data4" />
        <home-5 :data="homeData.data5" />
        <home-6 :data="homeData.data4" />
      </div>
      <div class="right">
        <news :data="homeData.news" />
<!--        <news :tabs="['董事会', '总经理会', '普通会']" has-center title="决策动态" :data="homeData.news['决策会议']" />-->
<!--        <news :tabs="['公告', '制度', '新闻']" title="公司动态" :data="homeData.news['公司动态']" />-->
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
