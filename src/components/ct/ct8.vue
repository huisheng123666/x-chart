<template>
  <ct-block title="重点项目">
    <TransitionGroup :name="slideName" tag="div" class="list" @mouseover="mouseOver" @mouseout="mouseOut">
      <div class="item" v-for="item in list" :key="item.id">
        <h4>{{ item.name }}</h4>
        <div class="row">
          <div class="desc">
            <h6>{{ item.num2 }}万元</h6>
            <p>总投资</p>
          </div>
          <div class="desc">
            <h6>{{ item.num }}万元</h6>
            <p>当月</p>
          </div>
          <div class="desc">
            <h6 class="ellipsis-one">
              <el-tooltip :content="item.desc">
                {{ item.desc }}
              </el-tooltip>
            </h6>
            <p>汇报情况</p>
          </div>
        </div>
      </div>
    </TransitionGroup>
  </ct-block>
</template>

<script lang="ts" setup>
import CtBlock from "@/components/ct/ct-block.vue";
import {nextTick, onMounted, ref, watch} from "vue";

const slideName = ref('')

const props = defineProps<{
  data: any[]
}>()

const list = ref<any[]>([])

let timer = 0

function genList() {
  slideName.value = ''
  clearTimeout(timer)
  let id = 0
  list.value = props.data.map(item => {
    id++
    return {
      id,
      name: item.pro_name,
      num: item.month_amt,
      num2: item.total_amt,
      desc: item.content
    }
  })
  nextTick(() => {
    slideName.value = 'list'
  })
  if (list.value.length < 3) return;
  deleteOne()
}

function mouseOver() {
  slideName.value = ''
  clearTimeout(timer)
}

function mouseOut() {
  if (list.value.length < 3) return;
  slideName.value = 'list'
  deleteOne()
}

function deleteOne() {
  const item = {
    ...list.value[0],
    id: Date.now()
  }
  list.value.push(item)
  timer = setTimeout(() => {
    list.value.splice(0, 1)
    deleteOne()
  }, 2000)
}

onMounted(() => {
  if (props.data.length) {
    genList()
  }
})

watch(props, () => {
  genList()
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
  top -10px

.list
  box-sizing border-box
  height 346px
  overflow hidden
  padding-top 24px
  position relative
  .item
    margin 0 20px
    width calc(100% - 40px)
    box-sizing border-box
    padding 20px
    margin-bottom 10px
    background: linear-gradient(270deg, rgba(0,169,254,0) 0%, rgba(0,169,254,0.1) 100%);
    border: 1px solid;
    border-image: linear-gradient(270deg, rgba(0, 169, 254, 0), rgba(0, 169, 254, 0.2)) 1 1;
    &>h4
      line-height 24px
      font-size 18px
      color #FFFFFF
      font-weight 500
    .row
      margin-top 20px
      display flex
      .desc
        flex 1
        overflow hidden
        &>h6
          margin-bottom 10px
          font-size 18px
          color #00A9FE
        &>p
          font-size 15px
          color #A3B8CC
</style>
