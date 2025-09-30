<template>
  <div class="tgf-kanban">
    <kanban-header/>
    <div class="content">
      <div class="left">
        <kanban1 :data="data.personInfo"/>
        <kanban2 :data="data.marketAndEnterprise" />
        <kanban3 :data="data.marketAndEnterprise" />
      </div>
      <div class="center">
        <home4 :data="data.workAndMoney || {}" class="tgf-data" />
        <kanban5 :list="data.workAndMoney?.priorityWork || []" />
        <kanban6 :data="data.netData ? data.netData[0] : {}" />
      </div>
      <div class="right">
        <kanban7 :list="data.projectInfo || []" />
        <kanban8 :data="data" :imgs="data.picList || []" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import KanbanHeader from "@/components/tgf-kanban/kanban-header.vue";
import Kanban1 from "@/components/tgf-kanban/kanban1.vue";
import Kanban2 from "@/components/tgf-kanban/kanban2.vue";
import Kanban3 from "@/components/tgf-kanban/kanban3.vue";
import Home4 from "@/components/hengtai-home/home-4.vue";
import Kanban5 from "@/components/tgf-kanban/kanban5.vue";
import Kanban6 from "@/components/tgf-kanban/kanban6.vue";
import Kanban7 from "@/components/tgf-kanban/kanban7.vue";
import Kanban8 from "@/components/tgf-kanban/kanban8.vue";
import axios from "axios";
import {ref} from "vue";
import {tgfKanbanTem} from "@/common/config";

const data = ref<any>(tgfKanbanTem)

// function getData() {
//   axios.get('/hengtai/api/tgf/kanban')
//     .then(res => {
//       data.value = res.data
//       setTimeout(() => {
//         getData()
//       }, 1000 * 60)
//     })
// }
//
// getData()

function getRemoteData() {
  axios.get('https://api.threegorges-financial.com/erp/statistics/dataView')
    .then(res => {
      data.value = {
        ...data.value,
        ...res.data.data
      }
      console.log(res.data)
    })
}

getRemoteData()
</script>

<style scoped lang="stylus">
@keyframes scaleToggle
  0%
    background-size 100% 100%
  50%
    background-size 120% 120%
  100%
    background-size 100% 100%

.tgf-kanban
  background url(./bg@2x.png) center center no-repeat
  background-size 100% 100%
  animation scaleToggle 10s ease infinite
  .content
    padding 0 24px
    display flex
    .left
      width 480px
    .center
      flex 1
      margin 0 24px
      .tgf-data
        margin-top 35px
    .right
      width 480px
</style>
