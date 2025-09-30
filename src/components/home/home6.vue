<template>
  <div class="home-6">
    <block-title title="活跃统计" />
    <div class="list">
      <div class="item">
        <img src="./home-6-1@2x.png" alt="">
        <div class="info">
          <h6>{{ data.pageView }}<span>次</span></h6>
          <p>浏览量</p>
        </div>
      </div>
<!--      <div class="line"/>-->
<!--      <div class="item">-->
<!--        <img src="./home-6-4@2x.png" alt="">-->
<!--        <div class="info">-->
<!--          <h6>{{ data.visitUserNum }}<span>次</span></h6>-->
<!--          <p>游客流量</p>-->
<!--        </div>-->
<!--      </div>-->
      <div class="item">
        <img src="./home-6-3@2x.png" alt="">
        <div class="info">
          <h6>{{ data.loginUserNum }}<span>次</span></h6>
          <p>申请用户</p>
        </div>
      </div>
<!--      <div class="line"/>-->
<!--      <div class="item">-->
<!--        <img src="./home-6-2@2x.png" alt="">-->
<!--        <div class="info">-->
<!--          <h6>{{ data.totalUserNum }}<span>次</span></h6>-->
<!--          <p>累计用户</p>-->
<!--        </div>-->
<!--      </div>-->

    </div>
  </div>
</template>

<script lang="ts" setup>
import BlockTitle from "@/components/home/block-title.vue";

defineProps<{
  data: any
}>()
</script>

<style scoped lang="stylus">
@import "../../assets/common.styl"

@keyframes scaleTo
  0%
    transform scale3d(1, 1, 1)
  50%
    transform scale3d(1.2, 1.2, 1)
  100%
    transform scale3d(1, 1, 1)

.home-6
  height 290px
  bottomBg()
  .list
    padding 0 10px
    margin-top 56px
    display flex
    flex-wrap wrap
    align-items flex-start
    .line
      width 1px
      height 40px
      background #2693FF
    .item
      box-sizing border-box
      flex 1
      text-align center
      &>img
        margin-right 14px
        width 64px
        height 64px
        animation scaleTo 1.5s ease infinite
      .info
        margin-top 24px
        &>h6
          margin-bottom 12px
          font-size 32px
          font-weight bold
          color #fff
          white-space nowrap
          &>span
            font-size 16px
            font-weight 400
        &>p
          font-size 14px
          color #A3BECC
</style>
