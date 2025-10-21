<template>
  <div class="home-4">
    <div class="top-data">
      <div class="item">
        <img src="./top1@2x.png" alt="">
        <p>
          <span>历史累计</span>
          {{ detail.totalCreditNum }} 笔
        </p>
        <p>
          <span>今年新增</span>
          {{ detail.CreditNum }} 笔
        </p>
      </div>
      <div class="item">
        <img src="./top3@2x.png" alt="">
        <p>
          <span>历史累计</span>
          {{ detail.totalCreditAmt }} 万元
        </p>
        <p>
          <span>今年新增</span>
          {{ detail.CreditAmt }} 万元
        </p>
      </div>
      <div class="item">
        <img src="./top2@2x.png" alt="">
        <p>
          <span>历史累计</span>
          {{ detail.allLoanNum }} 笔
        </p>
        <p>
          <span>今年新增</span>
          {{ detail.LoanNum }} 笔
        </p>
      </div>
      <div class="item">
        <img src="./top4@2x.png" alt="">
        <p>
          <span>历史累计</span>
          {{ detail.allLoanAmt }} 万元
        </p>
        <p>
          <span>今年新增</span>
          {{ detail.LoanAmt }} 万元
        </p>
      </div>
    </div>
    <div class="map-box">
      <img src="./map/new-map@2x.png" alt="">
      <img :class="['area', current === index ? 'active' : '']" v-for="(item, index) in imgs" :key="item" :src="item" alt="">
      <div class="bar" v-for="(item, index) in percents" :key="index" :style="{...positions[index], height: item}">
        <img class="top" src="./map/bar-top.png"  alt=""/>
      </div>

      <div class="float-data" :style="floatDataStyle[current]">
        <h6>{{ areas[current] }}</h6>
        <ul style="padding-bottom: 0">
          <li>
            <h6>授信金额</h6>
            <p>{{ formatNum(currentData?.allCreditAmt) }} <span>万元</span></p>
          </li>
          <li>
            <h6>授信户数</h6>
            <p>{{ formatNum(currentData?.allCreditNum) }} <span>户</span></p>
          </li>
        </ul>
        <ul>
          <li>
            <h6>放款金额</h6>
            <p>{{ formatNum(currentData?.allLoanAmt) }} <span>万元</span></p>
          </li>
          <li>
            <h6>放款户数</h6>
            <p>{{ formatNum(currentData?.allLoanNum) }} <span>户</span></p>
          </li>
        </ul>
      </div>
    </div>

    <div class="float-total">
      <h6>金融机构</h6>
      <p>{{ productData.financialInstitutionNum }} <span>家</span></p>
      <div class="space"></div>
      <h6>产品数量</h6>
      <p>{{ productData.financialProductNum }} <span>款</span></p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import map1 from './map/1@2x.png'
import ylq from './map/ylq@2x.png'
import map2 from './map/2@2x.png'
import map3 from './map/3@2x.png'
import map4 from './map/4@2x.png'
import map5 from './map/5@2x.png'
import map6 from './map/6@2x.png'
import map7 from './map/7@2x.png'
import map8 from './map/8@2x.png'
import map9 from './map/9@2x.png'
import {computed, onUnmounted, ref} from "vue";
import axios from "axios";
import {formatNum} from "@/common";

const props = defineProps<{
  mapData: any[]
  topData: any
}>()

const host = 'https://api.threegorges-financial.com'

const imgs = [map1, ylq, map2, map3, map4, map5, map6, map7, map8, map9]

const areas = ['宜昌城区', '夷陵区', '远安县', '当阳市', '枝江市', '宜都市', '五峰土家族自治县', '长阳土家族自治县', '秭归县', '兴山县']

const positions = [
  {
    left: '500px',
    bottom: '260px',
  },
  {
    left: '520px',
    bottom: '342px',
  },
  {
    left: '676px',
    bottom: '383px',
  },
  {
    left: '746px',
    bottom: '257px',
  },
  {
    left: '646px',
    bottom: '170px',
  },
  {
    left: '540px',
    bottom: '135px',
  },
  {
    left: '231px',
    bottom: '166px'
  },
  {
    left: '360px',
    bottom: '230px'
  },
  {
    left: '342px',
    bottom: '358px'
  },
  {
    left: '447px',
    bottom: '477px'
  },
]

const floatDataStyle = computed(() => {
  return positions.map(item => {
    const num = Number(item.bottom.split('px')[0])
    return `transform: translate3d(${item.left}, ${670 - 173 - num}px, 0)`
  })
})

const current = ref(0)

function animation() {
  const index = current.value >= imgs.length - 1 ? 0 : current.value + 1
  setTimeout(() => {
    current.value = index
    animation()
  }, 5000)
}

animation()

const detail = computed(() => {
  const data: any = {}
  Object.keys(props.topData).map((key) => {
    data[key] = formatNum(props.topData[key])
  })
  return data
})

const cityData = computed(() => {
  const listMap: any = {}
  props.mapData.map((item: { cityName: string; }) => {
    if (!item.cityName) return
    listMap[item.cityName] = item
  })
  return listMap
})

const data = computed(() => {
  return areas.map(item => Number(cityData.value[item].allCreditAmt))
})

const percents = computed(() => {
  let big = 0
  data.value.forEach(item => {
    if (item > big) big = item
  })
  return data.value.map(item => {
    return (item / big * 210).toFixed(0) + 'px'
  })
})

const currentData = computed(() => {
  const name = areas[current.value]
  return cityData.value[name]
})

const productData = ref<any>({})

function getProductNum() {
  axios.get('https://api.threegorges-financial.com/yxr/home')
    .then(res => {
      productData.value = res.data.data.initData
    })
}

getProductNum()

const timer = setInterval(() => {
  getProductNum()
}, 1000 * 60 * 5)

onUnmounted(() => {
  // clearInterval(timer)
})
</script>

<style scoped lang="stylus">
@keyframes Test
  0%
    transform translateZ(100px) scale(0.5)
    opacity 0
  100%
    opacity 1
    transform translateZ(0) scale(1)


@keyframes Test2
  0%
    transform translate3d(0, 0, 100px) scale(0.5)
    opacity 0
  100%
    transform translate3d(0, 0, 0) scale(1)
    opacity 1

.home-4
  height 670px
  position relative
  .top-data
    box-sizing border-box
    position absolute
    left 0
    top 24px
    width 100%
    display grid
    grid-template-columns repeat(4, auto)
    justify-content space-between
    .item
      display grid
      grid-template-areas 'a b' 'a c'
      grid-template-columns 50px auto
      grid-column-gap 12px
      &>img
        margin-right 8px
        width 50px
        height 44px
        grid-area a
      &>p
        font-size 16px
        color #2693FF
        &>span
          font-size 14px
          color rgba(255, 255, 255, 0.6)
  .map-box
    position relative
    width 100%
    height 100%
    perspective 2000
    &>img
      position absolute
      top 44px
      left 96px
      width 800px
      height 800px
      transform-style preserve-3d
      &.area
        opacity 0
      &.active
        transform-origin center center
        transition all 0.5s
        animation Test2 2s ease forwards
    .bar
      position absolute
      width 16px
      background: linear-gradient(360deg, rgba(255,252,34,0.2) 0%, #FFFC22 100%)
      transition all 0.6s
      .top
        display block
        margin-top -3px
        width 16px
        height 6px
    .float-data
      position absolute
      left 0
      top 0
      background: rgba(0,17,26,0.8)
      border 1px solid
      border-image: linear-gradient(180deg, rgba(38, 147, 255, 1), rgba(38, 147, 255, 0)) 1 1
      transition all 2s ease
      &>h6
        padding-left 16px
        height 40px
        line-height 40px
        background: linear-gradient(270deg, rgba(38,147,255,0) 0%, rgba(38,147,255,0.6) 100%)
        font-size 16px
        color #FFFFFF
      &>ul
        padding 16px
        white-space nowrap
        &>li
          display inline-block
          padding-right 22px
          &>h6
            margin-bottom 8px
            color #fff
            font-size 14px
          &>p
            font-size 20px
            color #2693FF
            font-weight bold
            &>span
              font-size 14px
              font-weight 400
  .float-total
    box-sizing border-box
    position absolute
    left 49px
    top 174px
    width 88px
    height 140px
    background url(./map/angle1@2x.png), url(./map/angle2@2x.png), url(./map/angle3@2x.png), url(./map/angle4@2x.png)
    background-repeat no-repeat
    background-position left top, right top, left bottom, right bottom
    background-size 8px 8px
    padding 16px
    padding-right 0
    &>h6
      margin-bottom 8px
      font-size 14px
      color #999999
    &>p
      font-size 20px
      color #FFFFFF
      font-weight bold
      &>span
        font-size 14px
        font-weight 400
    .space
      height 24px
</style>
