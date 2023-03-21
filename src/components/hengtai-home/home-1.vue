<template>
  <div class="home-1 home-block" @click.stop>
    <div class="sub-title">
      <img src="./title-icon@2x.png" alt="">
      公司架构图
    </div>

    <v-chart class="tree" :option="option" @click="clickChartEvent" />
  </div>
  <teleport to="body" v-if="showInfo">
    <div class="company-info" @click.stop>
      <h4>企业信息</h4>

      <div class="info-block">
        <h6>基本信息</h6>
        <div class="list">
          <div class="item">
            <label>单位名称</label>
            <p class="ellipsis-one">宜昌恒泰大数据产业发展有限公司</p>
          </div>
          <div class="item">
            <label>统一社会信用代码</label>
            <p>914205007606873350</p>
          </div>
          <div class="item">
            <label>成立日期</label>
            <p>2003-05-28</p>
          </div>
          <div class="item">
            <label>注册资本</label>
            <p>6870万元</p>
          </div>
          <div class="item">
            <label>联系电话</label>
            <p>18071303171</p>
          </div>
          <div class="item">
            <label>官网</label>
            <p>www.baidu.com</p>
          </div>
        </div>
      </div>

      <div class="info-block">
        <h6>位置信息</h6>
        <div class="list">
          <div class="item row1">
            <label>所属地区</label>
            <p>湖北省宜昌市伍家岗区</p>
          </div>
        </div>
      </div>

      <div class="info-block">
        <h6>经营信息</h6>
        <div class="list">
          <div class="item row2">
            <label>经营状态</label>
            <p>开业</p>
          </div>
          <div class="item row2">
            <label>经营期限自</label>
            <p>2004-05-27</p>
          </div>
          <div class="item row2">
            <label>组织形式</label>
            <p>法人独资公司</p>
          </div>
          <div class="item row2">
            <label>企业类型</label>
            <p>国有全资企业</p>
          </div>
          <div class="item row2">
            <label>企业人数</label>
            <p>30</p>
          </div>
          <div class="item row2">
            <label>经营规模</label>
            <p>小型</p>
          </div>
          <div class="item row2">
            <label>是否上市</label>
            <p>否</p>
          </div>
          <div class="item row2">
            <label>是否纳入结算</label>
            <p>是</p>
          </div>
          <div class="item row1">
            <label>经营范围</label>
            <p>一般项目：大数据服务；互联网数据服务；技术服务、技术开发、技术咨询、技术交流、技术转让、技术推广；信息咨询服务（不含许可类信息咨询服务）；数据处理和存储支持服务；信息系统集成服务；人工智能基础软件开发；企业管理咨询；创业投资（限投资未上市企业）；创业空间服务；云计算装备技术服务；自由资金投资的资产管理服务；以自由资金从事投资活动（除已发须经批准的项目外，平营业执照已发自主开展经营活动）</p>
          </div>
        </div>
      </div>

      <div class="info-block">
        <h6>管理信息</h6>
        <div class="list">
          <div class="item">
            <label>法定代表人</label>
            <p>潘峰</p>
          </div>
          <div class="item">
            <label>上级管理单位</label>
            <p>宜昌产投控股集团有限公司</p>
          </div>
          <div class="item">
            <label>所属机构</label>
            <p>宜昌恒泰大数据产业发展有限公司</p>
          </div>
        </div>
      </div>
      <img @click="hideInfo" class="close" src="./close@2x.png" alt="">
    </div>
  </teleport>
</template>

<script lang="ts" setup>
import {onMounted, onUnmounted, ref} from "vue";

const data = {
  "name": "宜昌恒泰大数据  \n产业发展有限公司",
  "children": [
    {"name": "宜昌大数据产业园运营管理有限公司", "value": 17010},
    {"name": "宜昌城市大脑运营管理有限公司      ", "value": 5842},
    {"name": "湖北三峡金融科技有限公司            ", "value": 1041},
    {"name": "奇安国投(湖北)科技有限公司          ", "value": 5176},
    {"name": "湖北三峡云计算中心有限公司         ", "value": 449},
    {"name": "三峡集团合资公司                        ", "value": 5593},
    {"name": "湖北曙光三峡云有限公司               ", "value": 5534}
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

function clickChartEvent(val: any) {
  showInfo.value = true
}

const option = {
  series: [
    {
      type: 'tree',
      data: [data],
      top: '6%',
      left: '35%',
      bottom: 20,
      right: '60%',
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
        padding: [6, 16, 6, 16],
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
.home-1
  height 301px
  .tree
    width 100%
    height 267px

.company-info
  position fixed
  left 50%
  top 50%
  transform translate3d(-50%, -50%, 0)
  width 1088px
  min-height 643px
  background url(./info-bg@2x.png) center center no-repeat
  background-size contain
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
    font-size 16px
    color #fff
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
</style>
