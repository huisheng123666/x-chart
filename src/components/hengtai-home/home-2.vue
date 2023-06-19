<template>
  <div class="home-2 home-block">
    <div class="sub-title">
      <img src="./title-icon@2x.png" alt="">
      投资项目播报
<!--      <p>总投资：{{ data['汇总']['总投资(万元)'] }}万元<br>累计投资：{{ data['汇总']['累计投资（万元）'] }}万元</p>-->
    </div>

    <TransitionGroup :name="aniName" tag="div" class="list">
      <div
        class="item"
        v-for="item in list"
        :key="item.id"
        @click="changeCurrent(true, item)"
        @mouseover="hoverList"
        @mouseleave="deleteOne"
      >
        <div class="content">
          <div class="col">
            <h6 class="ellipsis-one">{{ item['项目名称'] }}</h6>
<!--            <p class="ellipsis-one">{{ item['项目简介'] }}</p>-->
          </div>
          <div class="col">
            <h6 class="ellipsis-one blue">{{ item['总投资(万元)'] }}万元</h6>
            <p class="ellipsis-one">总投资</p>
          </div>
          <div class="col">
            <h6 class="ellipsis-one blue">{{ item['累计投资（万元）'] }}万元</h6>
            <p class="ellipsis-one">累计投资</p>
          </div>
        </div>
      </div>
    </TransitionGroup>

    <div class="chart">
      <v-chart class="chart-box" :option="option" />
      <div class="total">
        <h6>总投资额</h6>
        <p>{{data['汇总']['总投资(万元)']}}万</p>
      </div>
    </div>

    <div class="project-alert" v-if="showAlert">
      <img src="./close@2x.png" alt="" @click="changeCurrent(false)">
      <h4>项目信息</h4>
      <h5>基本信息</h5>
      <div class="project-desc">
        <div class="item col1">
          <label>项目名称</label>
          <p>{{ current['项目名称'] }}</p>
        </div>
        <div class="item col2">
          <label>所属企业</label>
          <p>{{ current['公司名称'] }}</p>
        </div>
        <div class="item col3">
          <label>项目简介</label>
          <p :title="current['项目简介']">{{ current['项目简介'] }}</p>
        </div>
        <div class="item col1">
          <label>总投资</label>
          <p>{{ current['总投资(万元)'] }}万元</p>
        </div>
        <div class="item col2">
          <label>累计投资</label>
          <p>{{ current['累计投资（万元）'] }}万元</p>
        </div>
      </div>
      <h5>项目进度</h5>
      <div class="project-percent">
        <div class="active" :style="{width: currentProjectPer}"></div>
        <div class="tip" :style="{left: currentProjectPer}">{{ currentProjectPer }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {computed, nextTick, onMounted, ref, watch} from "vue";
import { v4 } from 'uuid'

const props = defineProps<{
  data: any
}>()

const list = ref<any[]>([])

let timer = 0

const aniName = ref('')

function init() {
  list.value = props.data['明细'].map((item: any) => {
    return {
      ...item,
      id: v4()
    }
  })
  clearTimeout(timer)
  if (list.value.length < 4) {
    return
  }
  nextTick(() => {
    aniName.value = 'list'
  })
  deleteOne()
}

init()

watch(() => props.data, (newVal) => {
  aniName.value = ''
  init()
})

function deleteOne() {
  const item = {
    ...list.value[0],
    id: Date.now()
  }
  timer = setTimeout(() => {
    list.value.push(item)
    list.value.splice(0, 1)
    deleteOne()
  }, 2000)
}

const current = ref<any>({})

const showAlert = ref(false)

const currentProjectPer = computed(() => {
  return +(current.value['累计投资（万元）'] / current.value['总投资(万元)']).toFixed(2) * 100 + '%'
})

function changeCurrent(show: boolean, curr: any = {}) {
  showAlert.value = show
  nextTick(() => {
    current.value = curr
  })
}

function hoverList() {
  clearTimeout(timer)
}

const option = computed(() => {
  const per = (props.data['汇总']['累计投资（万元）'] / props.data['汇总']['总投资(万元)']).toFixed(4)

  return {
    title: {
      text: props.data['汇总']['累计投资（万元）'] + '万',
      subtext: '累计完成投资额',
      left: 'center',
      top: '40%',
      textStyle: {
        color: '#FFFFFF',
        fontSize: 24,
        fontWeight: 600
      },
      subtextStyle: {
        color: '#A3B8CC',
        fontSize: 16
      }
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: ['70%', '85%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10
        },
        label: {
          show: false,
        },
        data: [
          {
            value: Number(per),
            name: 'Search Engine',
            itemStyle: {
              color: '#33BBFF'
            }
          },
          { value: 1 - Number(per), name: 'Direct', itemStyle: { color: 'transparent' } }
        ]
      }
    ]
  }
})
</script>

<style scoped lang="stylus">
@import "../../assets/common.styl"
.list-move, /* 对移动中的元素应用的过渡 */
.list-leave-active
  transform translate3d(0, 0, 0)
  transition all 0.6s linear

.list-enter-active
  transform translate3d(0, 0, 0)
  transition all 0.6s linear

.list-enter-from
  transform translate3d(0, 100%, 0)

.list-leave-to
  transform translate3d(0, -100%, 0)

/* 确保将离开的元素从布局流中删除
  以便能够正确地计算移动的动画。 */
.list-leave-active
  position: absolute

.home-2
  height 626px
  margin-top 24px
  .sub-title
    &>p
      padding-top 5px
      padding-right 10px
      flex 1
      line-height 16px
      text-align right
      font-size 13px
      font-weight 400
  .list
    margin-top 19px
    margin-bottom 16px
    box-sizing border-box
    height 232px
    overflow hidden
    position relative
    .item
      width 100%
      padding-bottom 8px
      overflow: hidden
      cursor pointer
      .content
        box-sizing border-box
        display flex
        align-items center
        height 52px
        border: 1px solid
        border-image: linear-gradient(270deg, rgba(0, 169, 254, 0), rgba(0, 169, 254, 0.2)) 1 1
        .col
          flex 1
          overflow: hidden;
          &:nth-child(1)
            margin-right 10px
            flex 2
            padding-left 16px
          &>h6
            font-size 14px
            color #fff
            font-weight 500
            &.blue
              color #00A9FE
          &>p
            margin-top 7px
            font-size 12px
            color #A3B8CC
  .chart
    display flex
    align-items center
    margin-top 53px
    .chart-box
      margin-left 32px
      width 240px
      height 240px
      background url(./chart-bg@2x.png) center center no-repeat
      background-size cover
    .total
      margin-left 44px
      &>h6
        margin-bottom 10px
        font-size 16px
        color #A3B8CC
      &>p
        font-size 24px
        color #FFFFFF
        font-weight bold
  .project-alert
    box-sizing border-box
    padding 0 32px
    position fixed
    left 50%
    top 50%
    width 1088px
    height 443px
    margin-left -544px
    margin-top -220px
    background url(./project-bg@2x.png) center center no-repeat
    background-size contain
    z-index 999
    &>img
      width 38px
      height 38px
      position absolute
      right 8px
      top 0
      cursor pointer
    &>h4
      margin-bottom 31px
      padding-top 11px
      text-align center
      font-size 16px
      color #FFFFFF
    &>h5
      font-size 16px
      color #00A9FE
    .project-desc
      display flex
      flex-wrap wrap
      padding-bottom 40px
      .item
        margin-top 16px
        display flex
        line-height 20px
        &>label
          min-width 64px
          font-size 14px
          color #A3B8CC
        &>p
          font-size 14px
          color #fff
          ellipse-l(6)
        &.col1
          width 354px
        &.col2
          width calc(100% - 354px)
        &.col3
          width 100%
    .project-percent
      margin-top 24px
      height 8px
      background rgba(255, 255, 255, 0.1)
      position relative
      .active
        height 100%
        background-image repeating-linear-gradient(-70deg, #00D4FF 0, #00A9FE 2px, transparent 2px, transparent 4px)
        border-top-left-radius 4px
        border-bottom-right-radius 8px
        overflow hidden
      .tip
        position absolute
        top 10px
        margin-left -24px
        width 48px
        height 36px
        line-height 36px
        border 1px solid rgba(0, 169, 254, 1)
        border-radius 4px
        text-align center
        font-size 14px
        color rgba(0, 169, 254, 1)
        &:after
          content ''
          position absolute
          top -10px
          left 20px
          width 0
          height 0
          border 5px solid transparent
          border-bottom-color rgba(0, 169, 254, 1)
</style>
