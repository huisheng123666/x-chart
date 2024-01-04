<template>
  <div class="g-header">
    <el-select class="select" v-model="current" @change="change">
      <el-option
        v-for="item in options"
        :key="item"
        :label="item"
        :value="item"
      />
    </el-select>
    <h4>
      {{ yearMon }}{{ name }}综合信息概览
      <dv-decoration5 class="bg" :dur="5" />
    </h4>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue'
import dayjs from "dayjs";
import {useRoute} from "vue-router";

const route = useRoute()

defineProps<{
  name: string
}>()

const emit = defineEmits<{
  (e: 'change', current: string): void
}>()

const options = ['国资委',
  '宜化集团',
'安琪集团',
'宜粮集团',
'三峡机场',
'产投集团',
'城发集团',
'新疆宜化']

const current = ref(route.query.grp || '产投集团')

function change(val: string) {
  if (val === '国资委') {
    window.location.href = "http://10.27.38.1:8888/sasac-screen/#/core/gi-overview"
    return
  }
  if (val === '产投集团') {
    window.location.href = "/ct"
    return
  }
  emit('change', val)
}

const date = new Date()

date.setDate(0)

const yearMon = dayjs(date).format('YYYY年MM月')
</script>

<style scoped lang="stylus">
.g-header
  box-sizing border-box
  height 90px
  padding-top 20px
  position relative
  overflow hidden
  .select
    padding-top 10px
    position absolute
    left 10px
    top 10px
  &>h4
    line-height 40px
    text-align center
    font-size 36px
    color #fff
    .bg
      width 40%
      height 30px
      margin 0 auto
      margin-top -8px
</style>
