<script lang="ts" setup>
import {ref} from "vue";
import GHeader from "@/components/g-header/g-header.vue";
import Guo1 from "@/components/guozi/guo1.vue";
import Guo2 from "@/components/guozi/guo2.vue";
import Guo3 from "@/components/guozi/guo3.vue";
import Guo4 from "@/components/guozi/guo4.vue";
import Guo5 from "@/components/guozi/guo5.vue";
import Guo6 from "@/components/guozi/guo6.vue";
import axios from "axios";
import {guoziMock} from "@/common/guozi-mock";
import {useRoute} from "vue-router";

const route = useRoute()

const iframe = ref()

const showDia = ref(false)

const diaData = ref<any>({})

const host = location.origin

const detail = ref<any>(guoziMock)

const table = ref<any[]>([])
function getData(name = '产投集团') {
  axios.get(`http://10.27.38.3:8091/api/gzw/zhdp?group_name=${name}`)
    .then(res => {
      detail.value = res.data.data
      iframe.value?.contentWindow.postMessage({ type: 'mapData', data: res.data.data }, '*')
    })
}

getData(route.query.grp as string || '产投集团')
</script>

<template>
  <div class="home">
    <g-header @change="getData" :name="detail.sumList[0].zh_full_name" />
    <div class="content">
      <div class="left">
        <guo1 :data="detail.sumList[0]" />
        <guo2 :data="detail.sumList[0]" />
        <guo3 :data="detail.sumList[0]" />
      </div>
      <div class="right">
        <guo4 :data="detail.sumList[0]" />
        <guo5 :data="detail.sumList[0]" />
        <guo6 :data="detail.zdxmList" />
      </div>
    </div>

    <el-dialog
      :title="diaData.area + '所属企业'"
      v-model="showDia"
      @close="showDia = false"
      :width="1200"
      append-to-body
    >
      <el-table size="large" :data="table">
        <el-table-column label="单位名称" prop="zh_full_name" width="220" show-overflow-tooltip=""></el-table-column>
        <el-table-column label="集团名称" prop="group2_name"></el-table-column>
        <el-table-column label="法定代表人" prop="legal_person" width="120"></el-table-column>
        <el-table-column label="注册资本" prop="registered_assets" width="120"></el-table-column>
        <el-table-column label="成立日期" prop="establish_date" width="120"></el-table-column>
        <el-table-column label="本部党组织" prop="party_name" width="150"></el-table-column>
        <el-table-column label="上级党组织" prop="high_party_name"></el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<style lang="stylus" scoped>
@keyframes scaleToggle
  0%
    background-size 100% 100%
  50%
    background-size 120% 120%
  100%
    background-size 100% 100%

.home
  box-sizing border-box
  padding 10px
  .content
    display flex
    .left
      width 688px
      overflow hidden
    .right
      width 688px
</style>
