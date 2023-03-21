<template>
  <div class="home-6">
    <h4 class="sub-title">活跃统计</h4>
    <div class="list">
      <div class="item">
        <img src="./home-6-1@2x.png" alt="">
        <div class="info">
          <h6>1,256,139<span>人</span></h6>
          <p>浏览量</p>
        </div>
      </div>
      <div class="line"/>
      <div class="item">
        <img src="./home-6-2@2x.png" alt="">
        <div class="info">
          <h6>2,349,721<span>次</span></h6>
          <p>累计用户</p>
        </div>
      </div>
      <div class="item">
        <img src="./home-6-3@2x.png" alt="">
        <div class="info">
          <h6>88,394<span>人</span></h6>
          <p>注册用户</p>
        </div>
      </div>
      <div class="line"/>
      <div class="item">
        <img src="./home-6-4@2x.png" alt="">
        <div class="info">
          <h6>48,327<span>次</span></h6>
          <p>游客流量</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
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
      display flex
      align-items center
      &:nth-child(1)
        min-width 180px
        margin-bottom 48px
      &:nth-child(3)
        padding-left 30px
        margin-bottom 48px
      &:nth-child(4)
        min-width 180px
      &:nth-child(6)
        padding-left 30px
      &>img
        margin-right 14px
        width 40px
        height 40px
        animation scaleTo 1.5s ease infinite
      .info
        flex 1
        &>h6
          margin-bottom 8px
          font-size 20px
          font-weight bold
          color #fff
          white-space nowrap
          &>span
            font-size 12px
            font-weight 400
        &>p
          font-size 12px
          color #A3BECC
</style>