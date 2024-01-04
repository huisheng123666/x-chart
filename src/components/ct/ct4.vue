<template>
  <div class="home-4">
    <div class="map-box">
      <img src="./map/map@2x.png" alt="">
      <div
        v-for="item in 9"
        :class="'action' + item"
        @click="openDia(item)"
      ></div>
    </div>
    <el-dialog
      :title="areas[currentIndex] + '所属企业'"
      v-model="showDia"
      @close="showDia = false"
      :width="1200"
      append-to-body
      :close-on-click-modal="false"
    >
      <el-table size="large" :data="list">
        <el-table-column label="单位名称" prop="zh_full_name" width="220" show-overflow-tooltip></el-table-column>
        <el-table-column label="集团名称" prop="group2_name"></el-table-column>
        <el-table-column label="法定代表人" prop="legal_person" width="120" show-overflow-tooltip></el-table-column>
        <el-table-column label="注册资本" prop="registered_assets" width="120"></el-table-column>
        <el-table-column label="成立日期" prop="establish_date" width="120"></el-table-column>
        <el-table-column label="本部党组织" prop="party_name" width="150" show-overflow-tooltip></el-table-column>
        <el-table-column label="上级党组织" prop="high_party_name" show-overflow-tooltip></el-table-column>
      </el-table>
    </el-dialog>

    <div class="float-data">
      <div class="item">
        <img src="./icon@2x.png" alt="">
        <div class="info">
          <h6>{{ data1.cnt }} <span>个</span></h6>
          <p>企业总数</p>
        </div>
      </div>
      <div class="item">
        <img src="./icon@2x.png" alt="">
        <div class="info">
          <h6>{{ data1.assets }} <span>万元</span></h6>
          <p>总资产</p>
        </div>
      </div>
      <div class="item">
        <img src="./icon@2x.png" alt="">
        <div class="info">
          <h6>{{ data1.proCount_x }} <span>个</span></h6>
          <p>当前在建项目数</p>
        </div>
      </div>
      <div class="item">
        <img src="./icon@2x.png" alt="">
        <div class="info">
          <h6>{{ data1.meeting_cnt }} <span>次</span></h6>
          <p>累计开展会议数</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {computed, onMounted, ref, watch} from "vue";

const props = defineProps<{
  data: any,
  data1: any
}>()

const areas = ['宜昌城区', '远安县', '当阳市', '枝江市', '宜都市', '五峰土家族自治县', '长阳土家族自治县', '秭归县', '兴山县']

const positions = [
  {
    left: '490px',
    bottom: '312px',
  },
  {
    left: '620px',
    bottom: '380px',
  },
  {
    left: '660px',
    bottom: '257px',
  },
  {
    left: '579px',
    bottom: '160px',
  },
  {
    left: '460px',
    bottom: '135px',
  },
  {
    left: '186px',
    bottom: '164px'
  },
  {
    left: '302px',
    bottom: '228px'
  },
  {
    left: '296px',
    bottom: '358px'
  },
  {
    left: '378px',
    bottom: '472px'
  },
]

const mapList = computed(() => {
  const data: any = {
    '宜昌城区': []
  }
  Object.keys(props.data).forEach(key => {
    if (key === '夷陵区' || key === '西陵区' || key === '伍家岗区'  || key === '点军区' || key === '猇亭区') {
      data['宜昌城区'] = data['宜昌城区'].concat(props.data[key])
      return
    }
    data[key] = props.data[key]
  })
  return data
})

const showDia = ref(false)
const currentIndex = ref(0)
const list = ref<any[]>([])

function openDia(index: number) {
  currentIndex.value = index - 1
  showDia.value = true
  list.value = mapList.value[areas[currentIndex.value]] || []
}
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


.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.home-4
  height 956px
  position relative
  .float-data
    position absolute
    left 24px
    right 24px
    top 65px
    display flex
    justify-content space-between
    .item
      display flex
      align-items center
      &>img
        margin-right 10px
        width 90px
        height 90px
      .info
        &>h6
          margin-bottom 15px
          font-size 40px
          color #34FFFF
          font-weight bold
          &>span
            font-size 20px
        &>p
          font-size 18px
          color #fff
  .map-box
    position relative
    width 100%
    height 100%
    perspective 2000
    z-index 1
    .action1
      position absolute
      width 220px
      height 190px
      left 525px
      top 435px
      transform rotateZ(60deg)
      border-radius 40px
    .action2
      position absolute
      width 190px
      height 170px
      left 718px
      top 340px
      border-radius 30px
      transform rotateZ(50deg)
    .action3
      position absolute
      width 188px
      height 190px
      left 810px
      top 505px
      border-radius 30px
      transform rotateZ(45deg)
      border-top-left-radius 100px
      border-top-right-radius 100px
    .action4
      position absolute
      width 170px
      height 130px
      left 690px
      top 680px
      border-radius 30px
    .action5
      position absolute
      width 140px
      height 100px
      left 540px
      top 730px
      border-radius 30px
      border-top-left-radius 100px
      transform rotateZ(45deg)
    .action6
      position absolute
      width 370px
      height 140px
      left 160px
      top 720px
      transform rotateZ(25deg)
      border-radius 30px
      border-bottom-right-radius 120px
    .action7
      position absolute
      width 310px
      height 130px
      left 270px
      top 580px
      transform rotateZ(20deg)
      border-radius 30px
      border-bottom-left-radius 100px
      border-bottom-right-radius 100px
    .action8
      position absolute
      width 190px
      height 140px
      left 300px
      top 400px
      transform rotateZ(25deg)
      border-radius 30px
      border-top-right-radius 60px
    .action9
      position absolute
      width 198px
      height 140px
      left 420px
      top 260px
      transform rotateZ(25deg)
      border-radius 30px
      border-top-right-radius 50px
    &>img
      position absolute
      top 125px
      left 69px
      width 1003px
      height 1003px
      transform-style preserve-3d
      &.area
        opacity 0
      &.active
        transform-origin center center
        transition all 0.5s
        animation Test2 2s ease forwards

.dialog
  position fixed
  left 0
  top 0
  width 100vw
  height 100vh
  background rgba(0, 0, 0, 0.4)
  display flex
  justify-content center
  align-items center
  .box
    width 1088px
    height 443px
    background url("./dialog-bg@2x.png") center center no-repeat
    background-size 100% 100%
    position relative
    .close
      position absolute
      right 10px
      top 0
      width 40px
      cursor pointer
    &>h4
      line-height 40px
      text-align center
      font-size 18px
      color #fff
    .table
      padding 0 32px
      color #fff
      .t-head
        padding-left 24px
        display flex
        height 54px
        &>p
          width 20%
          line-height 54px
      .t-body
        height 302px
        overflow-y scroll
        &::-webkit-scrollbar
          display none
        .t-row
          margin-bottom 8px
          display flex
          padding-left 24px
          border 1px solid
          border-image linear-gradient(270deg, rgba(0, 169, 254, 0), rgba(0, 169, 254, 0.2)) 1 1
          background linear-gradient(270deg, rgba(0,169,254,0) 0%, rgba(0,169,254,0.1) 100%)
          &>p
            width 20%
            line-height 54px
            white-space nowrap
            overflow: hidden
            text-overflow ellipsis
</style>
