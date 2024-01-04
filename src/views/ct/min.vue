<template>
  <div class="ct">
    <div class="header">
      <el-select class="select" v-model="current" @change="getData">
        <el-option
          v-for="item in options"
          :key="item"
          :label="item"
          :value="item"
        />
      </el-select>
      <p>{{ month }}宜昌产投集团综合信息概览</p>
    </div>
    <div class="content">
      <div class="left">
        <ct1 :data="detail.sumList[0]" />
        <ct2 :data="detail.sumList[0]" />
        <ct3 :data="detail.sumList[0]" />
      </div>
      <div class="center">
      </div>
      <div class="right">
        <ct6 :data="detail.sumList[0]" />
        <ct7 :data="detail.xmList" />
        <ct8 :data="detail.zdxmList" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {ref} from "vue";
import dayjs from "dayjs";
import Ct1 from "@/components/ct/ct-1.vue";
import axios from "axios";
import {guoziMock} from "@/common/guozi-mock";
import Ct2 from "@/components/ct/ct-2.vue";
import Ct3 from "@/components/ct/ct-3.vue";
import Ct6 from "@/components/ct/ct6.vue";
import Ct7 from "@/components/ct/ct7.vue";
import Ct8 from "@/components/ct/ct8.vue";
import Ct4 from "@/components/ct/ct4.vue";
import Ct5 from "@/components/ct/ct5.vue";

const options = [
  '国资委',
  '宜化集团',
  '安琪集团',
  '宜粮集团',
  '三峡机场',
  '产投集团',
  '城发集团',
  '新疆宜化'
]

const current = ref('产投集团')

function change() {}

const month = dayjs().format('YYYY年MM月')

const detail = ref(guoziMock)

let timer = 0

function getData() {
  if (current.value === '国资委') {
    window.location.href = "http://10.27.38.1:8888/sasac-screen/#/core/gi-overview"
    return
  }
  if (current.value !== '产投集团') {
    window.location.href = "/?grp=" + current.value
    return
  }
  clearTimeout(timer)
  axios.get(`http://10.27.38.3:8091/api/gzw/zhdp?group_name=${current.value}`)
    .then(res => {
      detail.value = res.data.data
      timer = setTimeout(() => {
        getData()
      }, 1000 * 60 * 5)
    })
}

getData()
</script>

<style scoped lang="stylus">
.ct
  background url(./map-bg@2x.png) center center no-repeat
  background-size cover
  background-color #030E1A
  .header
    margin-bottom 10px
    height 90px
    padding-left 100px
    padding-right 120px
    display flex
    align-items center
    justify-content space-between
    background url(./h-bg-2@2x.png), url(./h-bg1@2x.png)
    background-position right top, top center
    background-size auto 100%, 100% auto
    background-repeat no-repeat
    &>p
      font-size 40px
      color #fff
      font-weight bold
  .content
    display flex
    padding 0 20px
    .left, .right
      flex 1
      overflow hidden
    .center
      width 20px
</style>
