<template>
  <div class="home-1">
    <block-title title="规上企业支持情况">
      <span>单位：万元</span>
    </block-title>

    <div class="total">
      <div class="item">
        <img src="./money@2x.png" alt="" />
        <h6>{{ formatNum(data['汇总']['全市总贷款余额(万元)']) }}</h6>
        <p>全市总贷款余额(万元)</p>
      </div>
      <div class="line"></div>
      <div class="item">
        <img src="./building@2x.png" alt="" />
        <h6>{{ formatNum(data['汇总']['全市服务家数(家)']) }}</h6>
        <p>全市服务家数(家)</p>
      </div>
    </div>
    <ul class="t-head">
      <li>企业名称</li>
      <li>贷款总余额</li>
      <li>不良贷款余额</li>
    </ul>
    <TransitionGroup :name="slideName" tag="div" class="list">
      <div class="h1-item" v-for="item in list" :key="item.id">
        <div class="col ellipsis-one">
          {{ item['企业名称'] }}
        </div>
        <div class="col">{{ formatNum(item['贷款总余额']) }}</div>
        <div class="col">{{ formatNum(item['不良贷款余额']) }}</div>
      </div>
    </TransitionGroup>
  </div>
</template>

<script lang="ts" setup>
import { nextTick, onMounted, ref, watch } from 'vue';
import BlockTitle from '@/components/home/block-title.vue';
import { formatNum } from '@/common';

const props = defineProps<{
  data: any;
}>();

const list = ref<any[]>([
  {
    id: 4,
    prodName: '企贷通',
    creditNum: '68,401',
    creditAmt: '1,352,457',
    signAmt: 1146016,
  },
  {
    id: 2,
    prodName: '创业贷',
    creditNum: '68,401',
    creditAmt: '1,352,457',
    signAmt: 1146016,
  },
  {
    id: 3,
    prodName: '消费贷',
    creditNum: '58,596',
    creditAmt: '161,467',
    signAmt: 6327833,
  },
  {
    id: 1,
    prodName: '银企专区',
    creditNum: '2,598',
    creditAmt: '4,093,789',
    signAmt: 73670,
  },
]);
let timer = 0;

const slideName = ref('');

function genList() {
  slideName.value = '';
  clearTimeout(timer);
  list.value = props.data['明细'].map((item: any, index: any) => {
    return {
      id: index,
      ...item,
    };
  });
  nextTick(() => {
    slideName.value = 'list';
    deleteOne();
  });
}

function deleteOne() {
  const item = {
    ...list.value[0],
    id: Date.now(),
  };
  list.value.push(item);
  timer = setTimeout(() => {
    list.value.splice(0, 1);
    deleteOne();
  }, 2000);
}

onMounted(() => {
  if (props.data.length) {
    genList();
  }
});

watch(
  () => props.data,
  () => {
    genList();
  },
);
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

.home-1
  height 310px
  background url(@/assets/img/block-bottom@2x.png) left bottom no-repeat
  background-size 100% auto
  .total
    display: grid;
    grid-template-columns 1fr 1px 1fr
    align-items center
    padding-top 16px
    .line {
      background rgba(255, 255, 255, 0.1)
      height 40px
    }
    .item {
      display grid
      grid-template-columns 48px 1fr
      grid-template-areas 'a b' 'a c'
      grid-column-gap 8px
      &:last-child {
        padding-left 48px
      }
      &>img {
        width 48px
        height 48px
        grid-area a
      }
      &>h6 {
        font-weight: bold;
        font-size: 20px;
        color: #FFFFFF;
        line-height: 24px;
      }
      &>p {
        font-size: 14px;
        color: #FFFFFF;
        line-height: 24px;
      }
    }
  .t-head
    display grid
    grid-template-columns 1fr 135px 102px
    gap 5px
    height 30px
    align-items center
    border-bottom 1px solid rgba(255, 255, 255, 0.1)
    &>li
      color #A3BECC
      font-size 13px
      &:first-child
        padding-left 8px
  .list
    margin-top 8px
    height 140px
    overflow hidden
    position relative
    border-bottom 1px solid rgba(255, 255, 255, 0.1)
  .h1-item
    margin-bottom 4px
    box-sizing border-box
    width 100%
    padding-left 8px
    display grid
    grid-template-columns 1fr 135px 102px
    gap 5px
    height 32px
    line-height 30px
    font-size: 13px;
    color: #FFFFFF;
    background: linear-gradient( 90deg, rgba(153,204,255,0) 0%, rgba(153,204,255,0.1) 100%);
    border: 1px solid rgba(153,204,255,0.1);
</style>
