<template>
  <div class="layout_container">
    <div
      class="layout_slider"
      :class="{ fold: LayOutSettingStore.isFold ? true : false }"
    >
      <Logo></Logo>
      <el-scrollbar class="scrollbar">
        <el-menu
          :collapsed="LayOutSettingStore.isFold ? true : false"
          :collapse="LayOutSettingStore.isFold ? true : false"
          background-color="#001529"
          text-color="white"
          :default-active="$route.path"
          active-text-color="yellowgreen"
        >
          <Menu :menuList="userStore.menuRoutes"></Menu>
        </el-menu>
      </el-scrollbar>
    </div>
    <div
      class="layout_tabbar"
      :class="{ fold: LayOutSettingStore.isFold ? true : false }"
    >
      <Tabbar></Tabbar>
    </div>
    <div
      class="layout_main"
      :class="{ fold: LayOutSettingStore.isFold ? true : false }"
    >
      <Main></Main>
    </div>
  </div>
</template>

<script setup lang="ts">
import Logo from './logo/index.vue'
import Menu from './menu/index.vue'
// 获取用户相关的小仓库
import useUserStore from '@/store/modules/user'
import useLayoutSettingStore from '@/store/modules/setting'
import Main from '@/layout/main/index.vue'
import { useRoute } from 'vue-router'
import Tabbar from './tabbar/index.vue'
let $route = useRoute()
let userStore = useUserStore()
let LayOutSettingStore = useLayoutSettingStore()
</script>
<script lang="ts">
export default {
  name: 'Layout',
}
</script>

<style scoped lang="scss">
.layout_container {
  width: 100%;
  height: 100vh;

  .layout_slider {
    color: white;
    width: $base-menu-width;
    height: 100vh;
    background: $base-menu-background;
    transition: all 0.3s;

    .scrollbar {
      width: 100%;
      height: calc(100vh - $base-tabbar-height);

      .el-menu {
        border-right: none;
      }
    }

    &.fold {
      width: $base-menu-min-width;
    }
  }

  .layout_tabbar {
    position: fixed;
    width: calc(100% - $base-menu-width);
    height: $base-tabbar-height;
    transition: all 0.3s;
    top: 0;
    left: $base-menu-width;

    &.fold {
      width: calc(100vw - $base-menu-min-width);
      left: $base-menu-min-width;
    }
  }

  .layout_main {
    position: absolute;
    width: calc(100% - $base-menu-width);
    height: calc(100vh - $base-tabbar-height);
    background: yellowgreen;
    left: $base-menu-width;
    top: $base-tabbar-height;
    padding: 20px;
    overflow: auto;
    transition: all 0.3s;
    &.fold {
      left: $base-menu-min-width;
      width: calc(100vw - $base-menu-min-width);
    }
  }
}
</style>
