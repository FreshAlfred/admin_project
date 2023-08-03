<template>
    <el-button size="small" circle icon="Refresh"></el-button>
    <el-button size="small" circle icon="FullScreen"></el-button>

    <el-button size="small" circle icon="Setting"></el-button>
    <img src="../../../../public/logooo.jpg" style="width: 24px; height: 24px; margin: 0 10px" alt="">
    <el-dropdown>
        <el-button size="small">
            admin<el-icon class="el-icon--right"><arrow-down /></el-icon>
        </el-button>
        <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item>退出登录</el-dropdown-item>
            </el-dropdown-menu>
        </template>
    </el-dropdown>
</template>

<script setup lang="ts">

</script>

<style scoped></style>