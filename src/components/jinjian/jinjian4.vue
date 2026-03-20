<template>
  <div class="home-4">
     <div class="map-box">
      <img src="../home/map/new-map@2x.png" alt="">
      <img :class="['area', current === index ? 'active' : '']" v-for="(item, index) in imgs" :key="item" :src="item" alt="">
      <div class="float-data" :style="floatDataStyle[current]">
        <h6>{{ areas[current] }}</h6>
        <ul style="padding-bottom: 0">
          <li>
            <h6>规上企业贷款余额</h6>
            <p>{{ formatNum(currentData?.gs_amount) }} <span>万元</span></p>
          </li>
          <li>
            <h6>小微企业贷款余额</h6>
            <p>{{ formatNum(currentData?.xw_amount) }} <span>户</span></p>
          </li>
        </ul>
        <ul style="padding-bottom: 0">
          <li>
            <h6>涉农贷款余额</h6>
            <p>{{ formatNum(currentData?.sn_amount) }} <span>万元</span></p>
          </li>
          <li>
            <h6>保费余额</h6>
            <p>{{ formatNum(currentData?.['保险金额']) }} <span>户</span></p>
          </li>
        </ul>
        <ul>
          <li>
            <h6>重点项目贷款余额</h6>
            <p>{{ formatNum(currentData?.zd_amount) }} <span>万元</span></p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import map1 from '../home/map/1@2x.png'
import ylq from '../home/map/ylq@2x.png'
import map2 from '../home/map/2@2x.png'
import map3 from '../home/map/3@2x.png'
import map4 from '../home/map/4@2x.png'
import map5 from '../home/map/5@2x.png'
import map6 from '../home/map/6@2x.png'
import map7 from '../home/map/7@2x.png'
import map8 from '../home/map/8@2x.png'
import map9 from '../home/map/9@2x.png'
import {computed, onUnmounted, ref} from "vue";
import {formatNum} from "@/common";

const props = defineProps<{
  mapData: any[]
}>()


const imgs = [map1, ylq, map2, map3, map4, map5, map6, map7, map8, map9]

const areas = ['宜昌城区', '夷陵区', '远安县', '当阳市', '枝江市', '宜都市', '五峰土家族自治县', '长阳土家族自治县', '秭归县', '兴山县']

const positions = [
  {
    left: '404px',
    bottom: '304px',
  },
  {
    left: '424px',
    bottom: '386px',
  },
  {
    left: '580px',
    bottom: '427px',
  },
  {
    left: '650px',
    bottom: '301px',
  },
  {
    left: '550px',
    bottom: '214px',
  },
  {
    left: '444px',
    bottom: '179px',
  },
  {
    left: '135px',
    bottom: '210px'
  },
  {
    left: '264px',
    bottom: '274px'
  },
  {
    left: '246px',
    bottom: '402px'
  },
  {
    left: '351px',
    bottom: '521px'
  },
]

const floatDataStyle = computed(() => {
  return positions.map(item => {
    const num = Number(item.bottom.split('px')[0])
    return `transform: translate3d(${item.left}, ${670 - 227 - num}px, 0)`
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
const cityData = computed(() => {
  const listMap: any = {}
  props.mapData.map((item: any) => {
    if (!item['注册地区（分县域）']) return
    listMap[item['注册地区（分县域）']] = item
  })
  return listMap
})

const currentData = computed(() => {
  const name = areas[current.value]
  return cityData.value[name]
})
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
  height 652px
  padding 0 32px
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
      top 0
      left 0
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
      z-index 99
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
