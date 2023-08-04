<template>
  <el-button 
  @click="updateRefresh"
  size="small" circle icon="Refresh"></el-button>
  <el-button 
  @click="fullScreen"
  size="small" circle icon="FullScreen"></el-button>

  <el-button size="small" circle icon="Setting"></el-button>
  <img
    :src="userStore.avatar"
    style="width: 24px; height: 24px; margin: 0 10px; border-radius: 50%;"
    alt=""
  />
  <el-dropdown>
    <el-button size="small">
      {{ userStore.username }}
      <el-icon class="el-icon--right"><arrow-down /></el-icon>
    </el-button>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import useLayoutSettingStore from '@/store/modules/setting'
import useUserStore from '@/store/modules/user';
import { useRouter,useRoute } from 'vue-router'
let $router = useRouter()
let $route = useRoute()
let userStore = useUserStore();
const layOutSettingStore = useLayoutSettingStore()

const updateRefresh = () => {
  layOutSettingStore.refresh = !layOutSettingStore.refresh
}
const fullScreen = () => {
  let full = document.fullscreenElement;
  if(!full) {
    document.documentElement.requestFullscreen()
  } else {
    document.exitFullscreen()
  }
}
const logout = () => {
  userStore.userLogout();
  $router.push({path: '/login', query: {redirect: $route.path}})
}
</script>

<style scoped></style>
