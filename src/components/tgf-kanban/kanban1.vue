<template>
  <div class="kanban1">
    <div class="sub-title">
      <img src="../hengtai-home/title-icon@2x.png" alt="">
      人员配置

<!--      <ul class="tabs">-->
<!--        <li @click="changeActive(1)" :class="{active: active === 1}">按部门</li>-->
<!--        <li @click="changeActive(2)" :class="{active: active === 2}">按资历</li>-->
<!--      </ul>-->
    </div>

    <v-chart class="chart" :option="option" ref="myChart" />

    <img src="./human@2x.png" alt="" class="human">
  </div>
</template>

<script lang="ts" setup>
import {computed, ref} from "vue";

const myChart = ref<any>()

const active = ref(1)

const props = defineProps<{
  data: any
}>()

const data = [
  { value: 40, name: '技术开发部', color: '#00A9FE' },
  { value: 28, name: '运营管理部' }
]

const data2 = [
  { value: 80, name: '5年以上' },
  { value: 28, name: '10年以上' }
]

const current = ref(data)

function changeActive(val: number) {
  active.value = val
  current.value = val === 1 ? data : data2
}

const option = computed(() => {
  return {
    color: ['#00A9FE', '#61F2A5'],
    series: [
      {
        name: 'Nightingale Chart',
        type: 'pie',
        radius: [58, 80],
        center: ['50%', '40%'],
        roseType: 'radius',
        data: props.data.map((item: { value: any; label: any; }) => ({ value: item.value, name: item.label })),
        labelLine: {
          length: 20,
          length2: 40
        },
        percentPrecision: 0,
        labelLayout: function (params: any) {
          const isLeft = params.labelRect.x < myChart.value?.getWidth() / 2;
          const points = params.labelLinePoints;
          // Update the end point.
          points[2][0] = isLeft
            ? params.labelRect.x
            : params.labelRect.x + params.labelRect.width;
          return {
            labelLinePoints: points,
            y: points[2][1] <= 90 ? points[2][1] + 50 : points[2][1] - 50
          };
        },
        label: {
          position: 'outside',
          formatter: '{b|{b}}\n{c|{c}人}\n{d|{d}%}',
          rich: {
            b: {
              color: '#A3BECC',
              fontSize: 16,
              padding: [0, 0, 8, 0]
            },
            c: {
              color: '#fff',
              fontSize: 24,
              padding: [0, 0, 12, 0],
              fontWeight: 500
            },
            d: {
              color: '#fff',
              fontSize: 16,
            }
          }
        }
      }
    ]
  }
})
</script>

<style scoped lang="stylus">
@import "../../assets/common.styl"

@keyframes bgToggle
  0%
    background-position 60px 185px
  25%
    background-position 60px 175px
  50%
    background-position 60px 185px
  75%
    background-position 60px 175px
  100%
    background-position 60px 185px

.kanban1
  box-sizing border-box
  height 301px
  border: 1px solid rgba(51,187,255,0.15)
  background url(./kanban1-bg@2x.png) no-repeat
  background-position 60px 185px
  background-size 380px 92px
  position relative
  animation bgToggle 4s ease infinite
  .human
    position absolute
    left 215px
    top 120px
    width 48px
    height 36px
  .sub-title
    background-image url(../hengtai-home/news-title-bg@2x.png)
    .tabs
      height 100%
      flex 1
      display flex
      justify-content flex-end
      align-items flex-end
      &>li
        width 74px
        height 28px
        line-height 28px
        text-align center
        border-radius 14px
        border 1px solid transparent
        font-size 14px
        color #FFFFFF
        cursor pointer
        &.active
          border-color #00A9FE
          color #00A9FE
  .chart
    height 260px
</style>
