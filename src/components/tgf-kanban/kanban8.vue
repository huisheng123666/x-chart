<template>
  <div class="kanban8 tgf-block">
    <div class="sub-title">
      <img src="../hengtai-home/title-icon@2x.png" alt="">
      获得资质
    </div>

    <el-tooltip :content="data.desc" raw-content placement="top">
      <div class="info" v-html="data.desc"></div>
    </el-tooltip>

    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="item in data.imgs" :key="item">
          <img :src="item.url" alt="">
          <div class="cover" v-if="active !== item"></div>
        </div>
      </div>

      <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>
    </div>

    <p class="index">{{ active }} / {{ data.imgs.length }}</p>
  </div>
</template>

<script lang="ts" setup>
import {nextTick, onMounted, ref, watch} from "vue";

const props = defineProps<{
  data: {
    desc: string
    imgs: any[]
  }
}>()

const active = ref(1)

let swiper: any = null

onMounted(() => {
  createSwiper()
})

function createSwiper() {
  if (!props.data.imgs.length) return
  /* @ts-ignore */
  swiper = new window.Swiper('.swiper-container', {
    watchSlidesProgress: true,
    slidesPerView: 'auto',
    centeredSlides: true,
    loop: true,
    loopedSlides: props.data.imgs.length,
    autoplay: true,
    speed: 500,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    on: {
      slideChange() {
        /* @ts-ignore */
        active.value = this.realIndex + 1
      },
      progress: function(progress: any) {
        /* @ts-ignore */
        for (let i = 0; i < this.slides.length; i++) {
          /* @ts-ignore */
          const slide = this.slides.eq(i);
          /* @ts-ignore */
          const slideProgress = this.slides[i].progress;
          let modify = 1;
          if (Math.abs(slideProgress) > 1) {
            modify = (Math.abs(slideProgress) - 1) * 0.3 + 1;
          }
          let translate = slideProgress * modify * 74 + 'px';
          let scale = 1 - Math.abs(slideProgress) / 5;
          let zIndex = 999 - Math.abs(Math.round(10 * slideProgress));
          slide.transform('translateX(' + translate + ') scale(' + scale + ')');
          slide.css('zIndex', zIndex);
          slide.css('opacity', 1);
          if (Math.abs(slideProgress) > 3) {
            slide.css('opacity', 0);
          }
        }
      },
      setTransition: function(transition: any) {
        /* @ts-ignore */
        for (let i = 0; i < this.slides.length; i++) {
          /* @ts-ignore */
          const slide = this.slides.eq(i);
          slide.transition(transition);
        }
      }
    }
  })
}

watch(() => props.data, () => {
  swiper?.destroy()
  nextTick(() => {
    createSwiper()
  })
})
</script>

<style lang="stylus" scoped>
@import "../../assets/common.styl"
.kanban8
  height 464px
  .info
    height 75px
    box-sizing border-box
    margin 16px 24px 6px
    padding 11px 16px
    background: linear-gradient(360deg, rgba(0,169,254,0) 0%, rgba(0,169,254,0.1) 100%);
    border-radius: 4px;
    border: 1px solid;
    border-image: linear-gradient(360deg, rgba(0, 169, 254, 0), rgba(0, 169, 254, 0.2)) 1 1;
    font-size 14px
    line-height 20px
    color #fff
    ellipse-l(3)
    ::v-deep(span)
      color #00A9FE
  .index
    margin-top 8px
    text-align center
    font-size 16px
    color #FFFFFF
::v-deep(.swiper-container)
  width 432px
  .swiper-slide
    width 208px
    height 280px
    position relative
    &>img
      display block
      width 100%
      height 100%
      object-fit contain
    .cover
      position absolute
      left 0
      top 0
      width 100%
      height 100%
      background-color rgba(0, 0, 0, 0.1)

::v-deep(.swiper-button-prev)
  background-image url(./swiper-left@2x.png) !important
  width 48px !important
  height 48px !important
  background-size contain !important
  background-color rgba(255, 255, 255, 0.3)
  border-radius 50%

::v-deep(.swiper-button-next)
  background-image url(./swiper-right@2x.png) !important
  width 48px !important
  height 48px !important
  background-size contain !important
  background-color rgba(255, 255, 255, 0.3)
  border-radius 50%
</style>
