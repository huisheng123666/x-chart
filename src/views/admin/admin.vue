<script setup lang="ts">
import { useRoute } from "vue-router";

const route = useRoute()
</script>

<template>
  <div class="home">
    <div class="menu">
      <h4>大屏管理系统</h4>
      <el-menu
        background-color="#304156"
        active-text-color="#409eff"
        text-color="#fff"
        router
        :default-active="route.path"
      >
        <el-menu-item-group>
          <el-menu-item index="/admin/kanban">模块管理</el-menu-item>
        </el-menu-item-group>
      </el-menu>
    </div>
    <router-view class="content" />
  </div>
</template>

<style scoped>
.home {
  width: 100vw;
  height: 100vh;
  display: flex;
  background-color: #fff;
}

.menu {
  width: 200px;
  background: #304156;
  color: #fff;
}

.menu>h4 {
  padding: 10px 20px;
  font-size: 20px;
}

.content {
  box-sizing: border-box;
  flex: 1;
  height: 100vh;
  overflow: hidden;
}

:deep(.el-menu) {
  border-right: none;
}
</style>
