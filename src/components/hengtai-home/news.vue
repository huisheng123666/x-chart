<template>
  <div class="news home-block">
    <div class="sub-title">
      <img src="./title-icon@2x.png" alt="">
      {{ title }}
      <div style="flex: 1"></div>
      <el-select v-model="current">
        <el-option
          v-for="item in options"
          :key="item.key"
          :value="item.key"
          :label="item.label"
        />
      </el-select>
    </div>

    <div class="list">
      <div class="item" v-for="(item, index) in list" :key="index">
        <div class="info">
          <p class="ellipsis-one">名称：{{ item['标题'] || item['会议名称'] || item['合同名称'] }}</p>
          <p v-if="current !== '市场'">类型：{{ item['类型'] }}</p>
          <p v-else>金额：{{ item['合同金额（万元）'] }}万</p>
          <p>时间：{{ item['日期'] }}</p>
        </div>
        <a :href="item['链接']" target="_blank">查看详情</a>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {computed, ref} from "vue";

const options = [
  {
    label: '招标动态',
    key: '招标'
  },
  {
    label: '决策动态',
    key: '决策会议'
  },
  {
    label: '公司动态',
    key: '公司动态'
  },
  {
    label: '合同动态',
    key: '市场'
  }
]

const current = ref('招标')

const props = defineProps<{
  data?: any
}>()

const title = computed(() => {
  let t = ''
  options.some(item => {
    if (item.key === current.value) {
      t = item.label
      return true
    }
    return false
  })
  return t
})


const list = computed(() => {
  return props.data[current.value]
})
</script>

<style scoped lang="stylus">
@import "../../assets/common.styl"
.news
  height 951px
  margin-bottom 24px
.sub-title
  padding-right 16px
  display flex
  align-items center
  background-image url(./news-title-bg@2x.png)
.list
  height 900px
  padding 0 16px
  margin-top 16px
  overflow-y scroll
  &::-webkit-scrollbar
    width 6px !important
    background-color transparent
  &::-webkit-scrollbar-thumb
    border-radius 3px !important
    background-color rgba(255, 255, 255, 0.1)
  .item
    margin-bottom 16px
    box-sizing border-box
    height 104px
    padding 16px
    background: linear-gradient(270deg, rgba(0,169,254,0) 0%, rgba(0,169,254,0.1) 100%);
    border: 1px solid;
    border-image: linear-gradient(270deg, rgba(0, 169, 254, 0), rgba(0, 169, 254, 0.2)) 1 1;
    display flex
    align-items center
    .info
      flex 1
      overflow hidden
      &>p
        margin-bottom 12px
        font-size 16px
        color #fff
        &:last-child
          margin-bottom 0
    &>a
      margin-left 10px
      width 80px
      height 36px
      line-height 36px
      text-align center
      background url(./detail-btn-bg@2x.png) center center no-repeat
      background-size contain
      font-size 14px
      color #fff


::v-deep(.el-input__wrapper)
  margin-top 6px
  width 110px
  background transparent
  box-shadow none
  border 1px solid rgba(255, 255, 255, 0.1)
  border-radius 20px
  .el-input__inner
    color #fff
    font-size 14px
</style>
