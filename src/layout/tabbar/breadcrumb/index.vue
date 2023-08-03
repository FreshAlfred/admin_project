<template>
    <el-icon style="margin-right: 10px" @click="changeIcon">
        <component :is="LayoutSettingStore.isFold? 'Fold' : 'Expand'"></component>



    </el-icon>
    <!-- 面包屑 -->

    <el-breadcrumb separator-icon="ArrowRight">
        <el-breadcrumb-item>homepage</el-breadcrumb-item>
        <el-breadcrumb-item>xixi</el-breadcrumb-item>

    </el-breadcrumb>
</template>

<script setup lang="ts">
import useLayoutSettingStore from '@/store/modules/setting'
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