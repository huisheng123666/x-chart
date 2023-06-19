<template>
  <div class="home-1 home-block" @click.stop>
    <div class="sub-title">
      <img src="./title-icon@2x.png" alt="">
      公司架构图
    </div>

    <v-chart class="tree" :option="option" @click="clickChartEvent" />
  </div>
  <teleport to="body">
    <transition name="fade">
      <div class="company-info" @click.stop v-show="showInfo">
        <h4>{{ currentInfo.name }}</h4>
        <h6>{{ currentInfo.title }}</h6>

        <div class="desc" v-html="currentInfo.desc"></div>

<!--        <div class="info-block" v-for="(item, index) in currentInfo" :key="index">-->
<!--          <h6>{{ item.title }}</h6>-->
<!--          <div class="list">-->
<!--            <div :class="['item', row.className || '']" v-for="row in item.list" :key="row.label">-->
<!--              <label>{{ row.label }}</label>-->
<!--              <p :class="row.ellipseClass || ''" :title="row.value">-->
<!--                <a v-if="row.label === '官网'" :href="row.value" target="_blank">{{ row.value }}</a>-->
<!--                <template v-else>{{ row.value }}</template>-->
<!--              </p>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
        <img @click="hideInfo" class="close" src="./close@2x.png" alt="">
      </div>
    </transition>
  </teleport>
</template>

<script lang="ts" setup>
import {onMounted, onUnmounted, ref} from "vue";
import {companyInfo} from "@/common/config";

const data = {
  "name": "宜昌恒泰大数据  \n产业发展有限公司",
  "children": [
    {"name": "宜昌城市大脑运营管理有限公司            ", "value": 5842},
    {"name": "湖北三峡金融科技有限公司                  ", "value": 1041},
    {"name": "奇安国投(湖北)科技有限公司                ", "value": 5176},
    {"name": "宜昌产投大数据产业园运营管理有限公司", "value": 5176},
    {"name": "湖北曙光三峡云大数据中心有限公司      ", "value": 5176},
  ]
}

const showInfo = ref(false)

function hideInfo() {
  showInfo.value = false
}

onMounted(() => {
  document.body.addEventListener('click', hideInfo)
})

onUnmounted(() => {
  document.body.removeEventListener('click', hideInfo)
})

const currentInfo = ref<any>({})

function clickChartEvent(val: any) {
  const name = val.data.name.replace(/\n/g, '').replace(/\s/g, '')
  // console.log(companyInfo[name])
  currentInfo.value = companyInfo[name]
  console.log(currentInfo.value)
  showInfo.value = true
}

const option = {
  series: [
    {
      type: 'tree',
      data: [data],
      top: '6%',
      left: '32%',
      bottom: 20,
      right: '62%',
      symbol: 'roundRect',
      symbolSize: 0,
      label: {
        position: 'left',
        verticalAlign: 'middle',
        align: 'right',
        fontSize: 14,
        color: '#00A9FE',
        // borderColor: '#00A9FE',
        borderWidth: 2,
        padding: [6, 12, 6, 12],
        lineHeight: 16,
        borderRadius: 8,
        backgroundColor: {
          image: 'tree-bg.png',
          width: '100%',
          height: '100%'
        }
      },
      leaves: {
        label: {
          position: 'right',
          verticalAlign: 'middle',
          align: 'left'
        }
      },
      // emphasis: {
      //   focus: 'descendant'
      // },
      expandAndCollapse: false,
      animationDuration: 550,
      animationDurationUpdate: 750,
    }
  ]
}
</script>

<style lang="stylus" scoped>
@import "../../assets/common.styl"

.fade-enter-active,
.fade-leave-active {
  transform translate3d(0, 0, 0) scale(1)
  transition: all 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform translate3d(-100%, -40%, 0) scale(0)
}

.home-1
  height 301px
  .tree
    width 100%
    height 267px

.company-info
  position fixed
  left 50%
  top 50%
  width 800px
  min-height 643px
  margin-left -400px
  margin-top -330px
  background url(./info-bg@2x.png) center center no-repeat
  background-size 100% 100%
  .close
    position absolute
    right 8px
    top 0
    width 38px
    height 38px
    cursor pointer
  &>h4
    margin-top 11px
    text-align center
    font-size 18px
    color #fff
  &>h6
    margin-top 32px
    color yellow
    text-align center
    font-size 16px
  .desc
    margin-top 20px
    padding 0 120px
    line-height 30px
    font-size 16px
    color #fff
    text-indent 2em
  .info-block
    margin-top 32px
    padding-left 32px
    padding-right 54px
    &>h6
      font-size 16px
      color #00A9FE
    .list
      display flex
      flex-wrap wrap
      .item
        display flex
        margin-top 16px
        width 33%
        font-size 14px
        color #fff
        line-height 20px
        &.row1
          width 100%
        &.row2
          width 50%
        &>label
          margin-right 8px
          color #A3B8CC
        &>p
          flex 1
          &>a
            color inherit
          &.el-3
            ellipse-l(3)
</style>
