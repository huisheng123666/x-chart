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
import axios from "axios";
import {onUnmounted, ref} from "vue";
import {data7Tem, data8Tem} from "@/common/tgf-mock";
import { DATA_TEMP } from './data-tem'

const host = 'https://api.threegorges-financial.com'

const data1 = ref<any>({})
const data3 = ref<any>({})
const data5 = ref<any>({})
const data6 = ref({
  loginUserNum: '25,303',
  pageView: '8,520,642',
  totalUserNum: '280,066',
  visitUserNum: '3,557,230'
})
const data7 = ref<any[]>(data7Tem)
const data8 = ref<any[]>(data8Tem)

function getDataLeft() {
  axios.post(host + '/sulac/queryCreditToLeft')
    .then(({ data: { data } }) => {
      data1.value = data.creditTypeMap
      data3.value = data.distbon
    })
}

getDataLeft()

function getData5() {
  axios.post(host + '/sulac/queryAllCreditForUserNum')
    .then(({ data: { data } }) => {
      data5.value = data
    })
}

getData5()

function getRight() {
  axios.post( host + '/sulac/queryAllProdForApp')
    .then(({ data: { data } }) => {
      data6.value = {
        loginUserNum: data.loginUserNum,
        pageView: data.pageView,
        totalUserNum: data.totalUserNum,
        visitUserNum: data.visitUserNum
      }
      data7.value = data.prodList
      data8.value = data.rateList
    })
}

getRight()

const timer = setInterval(() => {
  getDataLeft()
  getData5()
  getRight()
}, 1000 * 60 * 5)

const allData = ref(DATA_TEMP)

function getAllData() {
  axios.get('https://www.threegorges-financial.com//sulac/queryAll')
    .then(({ data }) => {
      if (data.code !== 1) return
      allData.value = data.data
    })
}
getAllData()


onUnmounted(() => {
  clearInterval(timer)
})
</script>

<template>
  <div class="home">
    <tgf-header/>
    <div class="content">
      <div class="left">
        <home1 :data="allData.left1" />
        <home2 :list="allData.left2" />
        <home3 :data="allData.left3" />
      </div>
      <div class="center">
        <home4 :map-data="allData.mid5" :top-data="allData.mid4?.[0] || {}" />
        <home5 :data="allData.mid6" />
      </div>
      <div class="right">
        <home6 :data="allData.right7?.[0] || {}" />
        <home7 :list="allData.right8" />
        <home8 :list="allData.right9" />
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
