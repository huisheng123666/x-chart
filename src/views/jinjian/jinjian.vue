<script setup lang="ts">
import axios from "axios";
import {onUnmounted, ref} from "vue";
import { DATA_TEMP } from './data-tem'
import jinjianHeader from "@/components/jinjian/jinjian-header.vue";
import Jinjian4 from "@/components/jinjian/jinjian4.vue";
import Jinjian1 from "@/components/jinjian/jinjian1.vue";
import Jinjian2 from "@/components/jinjian/jinjian2.vue";
import Jinjian3 from "@/components/jinjian/jinjian3.vue";
import Jinjian6 from "@/components/jinjian/jinjian6.vue";
import Jinjian7 from "@/components/jinjian/jinjian7.vue";
import Jinjian8 from "@/components/jinjian/jinjian8.vue";
import Jinjian5 from "@/components/jinjian/jinjian5.vue";

const allData = ref(DATA_TEMP)

function getAllData() {
  axios.get('http://192.168.28.21:8201/jgj/screen')
    .then(({ data }) => {
      if (data.code !== 1) return
      allData.value = data.data
    })
}
getAllData()

const timer = setInterval(() => {
  getAllData()
}, 1000 * 60 * 5)

onUnmounted(() => {
  clearInterval(timer)
})
</script>

<template>
  <div class="home">
    <jinjian-header/>
    <div class="content">
      <div class="left">
        <Jinjian1 :data="allData['规上工业']" />
        <Jinjian2 :data="allData['是否省市重点项目企业']" />
        <Jinjian3 :data="allData['专精特新']" />
      </div>
      <div class="center">
        <Jinjian4 :map-data="allData['地图及统计图']" />
        <Jinjian5 :data="allData['地图及统计图']" />
      </div>
      <div class="right">
        <Jinjian6 :data="allData['是否农业产业化企业']" />
        <Jinjian7 :data="allData['各银行金融服务']" />
        <Jinjian8 :data="allData['各保险金融服务']" />
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
  color #fff
  line-height 1
  .content
    display flex
    padding 0 32px
    .left
      width 480px
      overflow hidden
      display flex
      flex-direction column
      gap 16px
    .center
      // margin 0 32px
      // width 992px
      flex 1
      // width 800px
      margin 0 16px
    .right
      width 480px
      display flex
      flex-direction column
      gap 16px
</style>
