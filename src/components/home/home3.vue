<template>
  <div class="home-3">
    <h4 class="sub-title">贷款额度分布</h4>
    <pie3d style="height: 250px" :grid="{ left: '-22%' }" show-title :values="chartValues" />
  </div>
</template>

<script lang="ts" setup>
import Pie3d from "@/components/Pie-3d/Pie-3d.vue";
import {ref} from "vue";

const chartValues = ref([
  {
    name: "200万以上",
    value: 160,
  },
  {
    name: "200万-100万",
    value: 180,
  },
  {
    name: "100万以下",
    value: 200,
  }
])
</script>

<style scoped lang="stylus">
@import "../../assets/common.styl"
.home-3
  margin-top 32px
  bottomBg()
</style>