<template>
    <div>
        <template v-for="(item, index) in menuList" :key="item.path">
            <template v-if="!item.children" :index="item.path">
                <el-menu-item v-if="!item.meta.hidden">
                    <template #title>
                        <el-icon>
                            <component :is="item.meta.icon"></component>
                        </el-icon>
                        <span>{{ item.meta.title }}</span>
                    </template>
                </el-menu-item>
            </template>

            <template v-if="item.children && item.children.length == 1">
                <el-menu-item :index="item.children[0].path" v-if="!item.children[0].meta.hidden">
                    <template #title>
                        <el-icon>
                            <component :is="item.children[0].meta.icon"></component>
                        </el-icon>
                        <span>{{ item.children[0].meta.title }}</span>
                    </template>
                </el-menu-item>
            </template>
            <el-sub-menu :index="item.path" v-if="item.children && item.children.length > 1">
                <template #title>
                    <el-icon>
                        <component :is="item.meta.icon"></component>
                    </el-icon>
                    <span>{{ item.meta.title }}</span>
                </template>
                <Menu :menuList="item.children"></Menu>
            </el-sub-menu>
        </template>
    </div>
</template>

<script setup lang="ts">
defineProps(['menuList'])
</script>
<script lang="ts">
export default {
    name: 'Menu',
}
const goRoute = (vc: any) => {
    
}
</script>

<style scoped></style>