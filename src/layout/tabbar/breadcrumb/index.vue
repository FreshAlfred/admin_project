<template>
  <el-icon style="margin-right: 10px" @click="changeIcon">
    <component :is="LayoutSettingStore.isFold ? 'Fold' : 'Expand'"></component>
  </el-icon>
  <!-- 面包屑 -->

  <el-breadcrumb separator-icon="ArrowRight">
    <el-breadcrumb-item
      v-for="(item, index) in $route.matched"
      :key="index"
      v-show="!item.meta.hidden"
      :to="item.path"
    >
      <el-icon style="margin: 0 5px" v-if="item.meta.icon">
        <component :is="item.meta.icon"></component>
      </el-icon>
      <span>{{ item.meta.title }}</span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import useLayoutSettingStore from '@/store/modules/setting'
import { useRoute } from 'vue-router'
let $route = useRoute()
let LayoutSettingStore = useLayoutSettingStore()

const changeIcon = () => {
  LayoutSettingStore.isFold = !LayoutSettingStore.isFold
}
</script>

<script lang="ts">
export default {
  name: 'Breadcrumb',
}
</script>

<style scoped></style>
